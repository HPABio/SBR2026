/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BACKEND_SPONSOR_API_URL?: string;
  readonly MAUTIC_AUTH_TOKEN?: string;
  readonly MAUTIC_BASE_URL?: string;
  readonly PUBLIC_EXPORT_COMPONENT_PNGS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
