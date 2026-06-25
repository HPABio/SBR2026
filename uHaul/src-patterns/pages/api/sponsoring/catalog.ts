import type { APIRoute } from "astro";
import { fetchServiceJson, jsonResult } from "../../../lib/backend/server-fetch";

export const GET: APIRoute = async () => {
  const result = await fetchServiceJson("sponsor", "/api/sponsoring-catalog");
  return jsonResult(result);
};
