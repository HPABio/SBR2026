export type BackendServiceName = "sponsor";

type BackendServiceConfig = {
  envVar: string;
  baseUrl: string | undefined;
};

const backendServices = {
  sponsor: {
    envVar: "BACKEND_SPONSOR_API_URL",
    baseUrl: import.meta.env.BACKEND_SPONSOR_API_URL,
  },
} satisfies Record<BackendServiceName, BackendServiceConfig>;

export function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, "");
}

export function getServiceUrl(serviceName: BackendServiceName): string | undefined {
  const baseUrl = backendServices[serviceName].baseUrl?.trim();
  return baseUrl ? normalizeBaseUrl(baseUrl) : undefined;
}

export function isServiceConfigured(serviceName: BackendServiceName): boolean {
  return getServiceUrl(serviceName) !== undefined;
}

export function getServiceEnvVar(serviceName: BackendServiceName): string {
  return backendServices[serviceName].envVar;
}

export function getMauticConfig(): { baseUrl: string; authToken: string } | undefined {
  const baseUrl = import.meta.env.MAUTIC_BASE_URL?.trim();
  const authToken = import.meta.env.MAUTIC_AUTH_TOKEN?.trim();

  if (!baseUrl || !authToken) return undefined;

  return {
    baseUrl: normalizeBaseUrl(baseUrl),
    authToken,
  };
}
