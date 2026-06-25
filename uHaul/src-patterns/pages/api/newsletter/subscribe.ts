import type { APIRoute } from "astro";
import { getMauticConfig } from "../../../lib/backend/config";
import { fetchJsonUrl } from "../../../lib/backend/server-fetch";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  let email = "";

  try {
    const body = await request.json();
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!emailPattern.test(email)) {
    return new Response(JSON.stringify({ error: "Please provide a valid email address" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const mautic = getMauticConfig();

  if (!mautic) {
    return new Response(JSON.stringify({ error: "Newsletter signup is not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = await fetchJsonUrl(`${mautic.baseUrl}/api/contacts/new`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${mautic.authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      tags: "sbr-2026-archive",
    }),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Newsletter signup failed" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
