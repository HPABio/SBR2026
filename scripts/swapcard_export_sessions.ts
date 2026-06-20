/**
 * swapcard_export_sessions.ts
 *
 * Exports Swapcard sessions (plannings) for a given communityId + eventId into:
 *  - sessions.json (Astro format)
 *  - speaker_sessions.json (flattened speaker-per-session format)
 *
 * Run (bun):
 *   bun run swapcard_export_sessions.ts
 *
 * Env:
 *   SWAPCARD_API_KEY=...
 *   SWAPCARD_COMMUNITY_ID=...
 *   SWAPCARD_EVENT_ID=...
 *   TZ=Europe/Berlin   (optional; affects time formatting)
 */

 


import { writeFile } from "node:fs/promises";

const ENDPOINT = "https://developer.swapcard.com/event-admin/graphql"; // Organizer Content API endpoint shown in docs.  [oai_citation:3‡swapcard.dev](https://swapcard.dev/organizer/authentication)

const API_KEY = process.env.SWAPCARD_API_KEY;
const COMMUNITY_ID = process.env.SWAPCARD_COMMUNITY_ID;
const EVENT_ID = process.env.SWAPCARD_EVENT_ID;

if (!API_KEY || !COMMUNITY_ID || !EVENT_ID) {
  throw new Error(
    "Missing env vars. Set SWAPCARD_API_KEY, SWAPCARD_COMMUNITY_ID, SWAPCARD_EVENT_ID.",
  );
}

// --- Types for outputs (match your intended shapes) ---
type AstroSpeaker = {
  name: string;
  role: string;
  company: string;
  avatar: string;
  linkedIn?: string;
};

type AstroSessionFormat =
  | "keynote"
  | "presentation"
  | "workshop"
  | "panel"
  | "discussion"
  | "networking";

type AstroSession = {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  description?: string;
  speakers?: AstroSpeaker[];
  topic?: string;
  format: AstroSessionFormat;
  room: string;
  isBreak?: boolean;
  sponsors?: string[];
};

type SpeakerSessionFlat = {
  name: string;
  role: "SPEAKER";
  dateTime: string; // start time HH:mm
  room: string;
  category: string;
  title: string; // session title
  company: string; // speaker org
  sessionId: string; // prefer clientId if present, else planning id
  sessionDescription: string;
  sessionType: string; // planning.type or planning.format
};

// --- GraphQL helpers ---
async function gql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      // Docs require Authorization header for Content API requests.  [oai_citation:4‡swapcard.dev](https://swapcard.dev/organizer/authentication)
      Authorization: API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`GraphQL error: ${JSON.stringify(json.errors, null, 2)}`);
  }
  return json.data as T;
}

// --- Formatting helpers ---
function hhmmFromISO(iso: string): string {
  // Uses the runtime TZ (set TZ=Europe/Berlin if you want deterministic output)
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function pickBestString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

/**
 * Swapcard planning.type / planning.format enums vary by configuration.
 * This mapping is a “best effort” so your Astro UI renders nicely.
 * Adjust as needed once you see real values in your exported JSON.
 */
function mapToAstroFormat(planningType: string, planningFormat: string): AstroSessionFormat {
  const t = (planningType || "").toLowerCase();
  const f = (planningFormat || "").toLowerCase();

  if (t.includes("keynote")) return "keynote";
  if (t.includes("workshop")) return "workshop";
  if (t.includes("panel")) return "panel";
  if (t.includes("discussion") || t.includes("roundtable")) return "discussion";
  if (t.includes("network") || t.includes("break")) return "networking";

  // Some setups expose “format” like PHYSICAL/LIVE_STREAM/ON_DEMAND etc.  [oai_citation:5‡swapcard.dev](https://swapcard.dev/content-api/examples/sessions)
  if (f.includes("on_demand") || f.includes("live_stream") || f.includes("pre_recorded") || f.includes("physical")) {
    return "presentation";
  }

  return "presentation";
}

// --- The query (planningsV2 with cursor pagination is shown in docs)  [oai_citation:6‡swapcard.dev](https://swapcard.dev/content-api/examples/sessions) ---
const QUERY = /* GraphQL */ `
query PlanningsV2($communityId: ID!, $cursor: CursorPaginationInput, $filter: EventPlanningFilterInput) {
  planningsV2(communityId: $communityId, cursor: $cursor, filter: $filter) {
    pageInfo { endCursor hasNextPage }
    totalCount
    nodes {
      id
      clientIds
      title
      description
      beginsAt
      endsAt
      place
      type
      format
      categories
      speakers {
        id
        firstName
        lastName
        jobTitle
        organization
        photoUrl
      }
    }
  }
}
`;

type PlanningsV2Response = {
  planningsV2: {
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
    totalCount: number;
    nodes: Array<{
      id: string;
      clientIds: string[] | null;
      title: string;
      description?: string | null;
      beginsAt: string;
      endsAt: string;
      place?: string | null;     // docs show "place" in fragments.  [oai_citation:7‡swapcard.dev](https://swapcard.dev/content-api/examples/sessions)
      type?: string | null;
      format?: string | null;
      categories?: string[] | null; // categories exist on planning inputs and are commonly surfaced.  [oai_citation:8‡swapcard.dev](https://swapcard.dev/organizer/content-api/graphql-event-api-schema/types/inputs/upsert-event-planning-input?utm_source=chatgpt.com)
      speakers?: Array<{
        id: string;
        firstName?: string | null;
        lastName?: string | null;
        jobTitle?: string | null;
        organization?: string | null;
        photoUrl?: string | null;
      }> | null;
    }>;
  };
};

async function fetchAllPlannings(): Promise<PlanningsV2Response["planningsV2"]["nodes"]> {
  const all: PlanningsV2Response["planningsV2"]["nodes"] = [];
  let after: string | null = null;

  while (true) {
    const data = await gql<PlanningsV2Response>(QUERY, {
      communityId: COMMUNITY_ID,
      cursor: { first: 100, after },
      filter: { eventIds: [EVENT_ID] }, // “filtered by event ids” pattern from docs.  [oai_citation:9‡swapcard.dev](https://swapcard.dev/content-api/examples/sessions)
    });

    all.push(...data.planningsV2.nodes);

    if (!data.planningsV2.pageInfo.hasNextPage) break;
    after = data.planningsV2.pageInfo.endCursor;
  }

  return all;
}

async function main() {
  const plannings = await fetchAllPlannings();

  // --- Build sessions.json (Astro format) ---
  const sessions: AstroSession[] = plannings.map((p) => {
    const startTime = hhmmFromISO(p.beginsAt);
    const endTime = hhmmFromISO(p.endsAt);

    const speakers: AstroSpeaker[] =
      (p.speakers || []).map((s) => {
        const fullName = [s.firstName, s.lastName].filter(Boolean).join(" ").trim();
        return {
          name: fullName || "TBA",
          role: pickBestString(s.jobTitle) || "Speaker",
          company: pickBestString(s.organization),
          avatar: pickBestString(s.photoUrl) || "/placeholder.svg",
          // Swapcard speaker social links aren’t guaranteed in the planning node;
          // you can extend query later if your schema exposes them.
        };
      });

    const topic = (p.categories && p.categories.length ? p.categories[0] : undefined) ?? undefined;
    const format = mapToAstroFormat(p.type ?? "", p.format ?? "");

    return {
      id: p.clientIds?.[0] ?? p.id,
      startTime,
      endTime,
      title: p.title,
      description: p.description ?? "",
      speakers: speakers.length ? speakers : undefined,
      topic,
      format,
      room: pickBestString(p.place) || "",
      // If you mark breaks in Swapcard using categories/type, you can flip isBreak here.
    };
  });

  // --- Build speaker_sessions.json (flattened per speaker) ---
  const speakerSessions: SpeakerSessionFlat[] = [];
  for (const p of plannings) {
    const startTime = hhmmFromISO(p.beginsAt);
    const room = pickBestString(p.place) || "";
    const category = (p.categories && p.categories.length ? p.categories.join(", ") : "") || "";
    const sessionId = p.clientIds?.[0] ?? p.id;
    const sessionType = p.type ?? p.format ?? "";

    for (const s of p.speakers || []) {
      const fullName = [s.firstName, s.lastName].filter(Boolean).join(" ").trim();
      speakerSessions.push({
        name: fullName || "TBA",
        role: "SPEAKER",
        dateTime: startTime,
        room,
        category,
        title: p.title,
        company: pickBestString(s.organization),
        sessionId,
        sessionDescription: p.description ?? "",
        sessionType,
      });
    }
  }

  await writeFile("sessions.json", JSON.stringify(sessions, null, 2), "utf8");
  await writeFile("speaker_sessions.json", JSON.stringify(speakerSessions, null, 2), "utf8");

  console.log(`Exported ${sessions.length} sessions to sessions.json`);
  console.log(`Exported ${speakerSessions.length} speaker-session rows to speaker_sessions.json`);
}

await main();
