# main.py
import os
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
import httpx

SWAPCARD_API_URL = os.getenv("SWAPCARD_API_URL", "https://developer.swapcard.com/event-admin/graphql")
SWAPCARD_ACCESS_TOKEN = os.getenv("SWAPCARD_ACCESS_TOKEN")
SWAPCARD_EVENT_ID = os.getenv("SWAPCARD_EVENT_ID")
SWAPCARD_DEFAULT_GROUP_ID = os.getenv("SWAPCARD_DEFAULT_GROUP_ID")

TICKETTAILOR_WEBHOOK_SECRET = os.getenv("TICKETTAILOR_WEBHOOK_SECRET")

app = FastAPI(title="TicketTailor → Swapcard Bridge")


# ---- GraphQL mutation template (from docs) ----

IMPORT_EVENT_PEOPLE_MUTATION = """
mutation importEventPeople($eventId: ID!, $data: [ImportEventPersonInput!]!) {
  importEventPeople(eventId: $eventId, validateOnly: false, data: $data) {
    errors {
      inputId
      errorCode
      message
    }
    results {
      inputId
      eventPerson {
        id
        email
      }
    }
    eventPeopleCreated
    eventPeopleUpdated
  }
}
"""


# ---- Helper: extract custom question answer by label from Ticket Tailor ----

def get_custom_answer(buyer_details: Dict[str, Any], question_label: str) -> Optional[str]:
    for q in buyer_details.get("custom_questions", []):
        if (q.get("question") or "").strip() == question_label.strip():
            return q.get("answer")
    return None


# ---- Helper: build Swapcard "data" array from TT payload ----

def build_swapcard_people_data(payload: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Map Ticket Tailor order payload to Swapcard ImportEventPersonInput[]
    One record per issued_ticket.
    """
    buyer = payload.get("buyer_details", {})
    issued_tickets = payload.get("issued_tickets", [])

    buyer_first_name = buyer.get("first_name")
    buyer_last_name = buyer.get("last_name")
    buyer_email = buyer.get("email")
    organization = get_custom_answer(buyer, "Associated Company/Institution")

    data: List[Dict[str, Any]] = []

    for ticket in issued_tickets:
        # Unique clientId per attendee (can be ticket id, or order+ticket, etc.)
        client_id = ticket.get("id")

        first_name = ticket.get("first_name") or buyer_first_name
        last_name = ticket.get("last_name") or buyer_last_name
        email = ticket.get("email") or buyer_email
        full_name = ticket.get("full_name") or buyer.get("name")

        # fallback: derive first/last from full_name if needed
        if not first_name and full_name:
            parts = full_name.split()
            if len(parts) >= 2:
                first_name = parts[0]
                last_name = " ".join(parts[1:])
            else:
                first_name = full_name
                last_name = "Attendee"

        if not first_name or not last_name:
            # you can decide to skip or raise; here we raise
            raise ValueError("Missing first/last name for attendee")

        # Minimal "create" payload (user with account) – expand later as needed
        create_block: Dict[str, Any] = {
            "isUser": True,
            "isVisible": True,
            "email": email,
            "firstName": first_name,
            "lastName": last_name,
        }

        # You can enrich with jobTitle, organization, phone, etc.
        if organization:
            create_block["organization"] = organization

        # Example: attach QR/barcode from Ticket Tailor to Swapcard barcodes
        barcode_value = ticket.get("barcode")
        actions_block: Dict[str, Any] = {}
        if SWAPCARD_DEFAULT_GROUP_ID:
            actions_block["updateGroups"] = {
                "action": "ADD",
                "groupIds": [SWAPCARD_DEFAULT_GROUP_ID],
            }
        if barcode_value:
            actions_block["updateBarcodes"] = {
                "action": "ADD",
                "barcodes": [
                    {"type": "QR_CODE", "value": barcode_value}
                ]
            }

        # Optional: mirror the same fields into "update" so repeated imports update profile
        update_block = {
            "isUser": True,
            "isVisible": True,
            "email": email,
            "firstName": first_name,
            "lastName": last_name,
        }
        if organization:
            update_block["organization"] = organization

        person_input: Dict[str, Any] = {
            "clientId": client_id,
            "create": create_block,
            "update": update_block,
            "actions": actions_block or None,
        }

        # Remove None to keep payload clean
        person_input = {k: v for k, v in person_input.items() if v is not None}

        data.append(person_input)

    return data


# ---- Helper: call Swapcard GraphQL ----

async def call_swapcard_import_event_people(data: List[Dict[str, Any]]) -> Dict[str, Any]:
    if not SWAPCARD_ACCESS_TOKEN or not SWAPCARD_EVENT_ID:
        raise RuntimeError("SWAPCARD_ACCESS_TOKEN or SWAPCARD_EVENT_ID not configured")

    headers = {
        "Authorization": SWAPCARD_ACCESS_TOKEN,
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    body = {
        "query": IMPORT_EVENT_PEOPLE_MUTATION,
        "variables": {
            "eventId": SWAPCARD_EVENT_ID,
            "data": data,
        },
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.post(SWAPCARD_API_URL, json=body, headers=headers)
        resp.raise_for_status()
        return resp.json()


# ---- Ticket Tailor webhook endpoint ----

@app.post("/ticket-tailor/webhook")
async def ticket_tailor_webhook(request: Request):
    # TODO: verify webhook signature if you configure TICKETTAILOR_WEBHOOK_SECRET
    # For now we just trust the payload.
    try:
        body = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON")

    event_type = body.get("event")
    payload = body.get("payload")

    if event_type not in ("ORDER.CREATED", "ORDER.UPDATED"):
        # You can accept others or just ignore
        return JSONResponse({"status": "ignored", "reason": "unsupported_event"}, status_code=200)

    if not isinstance(payload, dict):
        raise HTTPException(status_code=400, detail="Missing payload")

    try:
        people_data = build_swapcard_people_data(payload)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    try:
        result = await call_swapcard_import_event_people(people_data)
    except httpx.HTTPStatusError as e:
        # Log full error in real deployment
        raise HTTPException(status_code=502, detail=f"Swapcard API error: {e.response.text}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

    return {"status": "ok", "swapcard_response": result}


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "healthy", "service": "ticket-tailor-swapcard-bridge"}

