import type { APIRoute } from "astro";
import { fetchServiceJson, jsonResult, type JsonValue } from "../../../lib/backend/server-fetch";

export const POST: APIRoute = async ({ request }) => {
  let body: JsonValue;

  try {
    body = (await request.json()) as JsonValue;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const result = await fetchServiceJson("sponsor", "/api/store-sponsor-email", {
    method: "POST",
    body,
  });

  return jsonResult(result);
};
