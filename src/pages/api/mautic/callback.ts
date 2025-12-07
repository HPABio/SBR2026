import type { APIRoute } from 'astro';

const MAUTIC_BASE_URL = import.meta.env.MAUTIC_BASE_URL ?? 'https://mautic.synbioreactor.de';
const CLIENT_ID = import.meta.env.MAUTIC_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.MAUTIC_CLIENT_SECRET;
const REDIRECT_URI =
  import.meta.env.MAUTIC_REDIRECT_URI ?? 'https://dev.synbioreactor.de/api/mautic/callback';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    return new Response(`Mautic auth error: ${error}`, { status: 400 });
  }

  if (!code) {
    return new Response('Missing "code" parameter from Mautic', { status: 400 });
  }

  // Exchange code for access token
  const tokenRes = await fetch(`${MAUTIC_BASE_URL}/oauth/v2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code,
    }),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    return new Response(`Token request failed:\n${text}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  const tokenData = await tokenRes.json();

  // TODO: Replace this with real token storage (DB, KV, etc.)
  // For now, just show it on screen for debugging.
  return new Response(
    `Mautic access token received:\n${JSON.stringify(tokenData, null, 2)}`,
    {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    }
  );
};

