import type { APIRoute } from "astro";
import { fetchServiceJson } from "../../lib/backend/server-fetch";

type SponsorHealth = {
  status: string;
  service: string;
};

export const GET: APIRoute = async () => {
  const sponsor = await fetchServiceJson<SponsorHealth>("sponsor", "/health", {
    timeoutMs: 3000,
  });

  return new Response(
    JSON.stringify({
      status: "ok",
      service: "astro",
      backend: {
        sponsor: sponsor.ok
          ? "ok"
          : sponsor.serviceUnavailable
            ? sponsor.status === 503 && sponsor.error.includes("not configured")
              ? "unconfigured"
              : "unreachable"
            : "error",
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
};
