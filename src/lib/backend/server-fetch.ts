import { getServiceEnvVar, getServiceUrl, type BackendServiceName } from "./config";

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type ServerFetchOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | JsonValue;
  timeoutMs?: number;
};

export type ServerFetchResult<T = unknown> =
  | {
      ok: true;
      status: number;
      data: T;
    }
  | {
      ok: false;
      status: number;
      error: string;
      serviceUnavailable?: boolean;
    };

function jsonResponseBody(body: ServerFetchOptions["body"]): BodyInit | undefined {
  if (body === undefined) return undefined;
  if (
    typeof body === "string" ||
    body instanceof Blob ||
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof ArrayBuffer
  ) {
    return body;
  }

  return JSON.stringify(body);
}

function mergeHeaders(headers: HeadersInit | undefined, body: ServerFetchOptions["body"]): Headers {
  const merged = new Headers(headers);
  if (body !== undefined && !merged.has("Content-Type") && typeof body !== "string") {
    merged.set("Content-Type", "application/json");
  }
  return merged;
}

async function readResponseBody<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || "";
  if (contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  return (await response.text()) as T;
}

export async function fetchServiceJson<T = unknown>(
  serviceName: BackendServiceName,
  path: string,
  options: ServerFetchOptions = {},
): Promise<ServerFetchResult<T>> {
  const baseUrl = getServiceUrl(serviceName);

  if (!baseUrl) {
    return {
      ok: false,
      status: 503,
      error: `${getServiceEnvVar(serviceName)} is not configured`,
      serviceUnavailable: true,
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 8000);
  const pathname = path.startsWith("/") ? path : `/${path}`;

  try {
    const response = await fetch(`${baseUrl}${pathname}`, {
      ...options,
      body: jsonResponseBody(options.body),
      headers: mergeHeaders(options.headers, options.body),
      signal: controller.signal,
    });
    const data = await readResponseBody<T | { error?: unknown }>(response);

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error:
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            : `Request to ${serviceName} failed`,
      };
    }

    return {
      ok: true,
      status: response.status,
      data: data as T,
    };
  } catch (error) {
    return {
      ok: false,
      status: 503,
      error:
        error instanceof DOMException && error.name === "AbortError"
          ? `Request to ${serviceName} timed out`
          : `Unable to reach ${serviceName}`,
      serviceUnavailable: true,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchJsonUrl<T = unknown>(
  url: string,
  options: ServerFetchOptions = {},
): Promise<ServerFetchResult<T>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 8000);

  try {
    const response = await fetch(url, {
      ...options,
      body: jsonResponseBody(options.body),
      headers: mergeHeaders(options.headers, options.body),
      signal: controller.signal,
    });
    const data = await readResponseBody<T | { error?: unknown }>(response);

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error:
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            : "Request failed",
      };
    }

    return {
      ok: true,
      status: response.status,
      data: data as T,
    };
  } catch (error) {
    return {
      ok: false,
      status: 503,
      error:
        error instanceof DOMException && error.name === "AbortError"
          ? "Request timed out"
          : "Unable to reach upstream service",
      serviceUnavailable: true,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export function jsonResult(result: ServerFetchResult): Response {
  if (result.ok) {
    return new Response(JSON.stringify(result.data), {
      status: result.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: result.error }), {
    status: result.status,
    headers: { "Content-Type": "application/json" },
  });
}
