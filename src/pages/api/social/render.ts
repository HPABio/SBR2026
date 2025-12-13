import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('multipart/form-data')) {
      return new Response(
        JSON.stringify({ error: 'Expected multipart/form-data' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const formData = await request.formData();

    // Internal service URL (docker-compose service name).
    const renderServiceUrl = import.meta.env.RENDER_SERVICE_URL || 'http://render-service:8080';
    const upstream = await fetch(`${renderServiceUrl}/render`, {
      method: 'POST',
      body: formData,
    });

    if (!upstream.ok) {
      // Try to forward JSON errors, fall back to text.
      const ct = upstream.headers.get('content-type') || '';
      const body = ct.includes('application/json')
        ? await upstream.text()
        : JSON.stringify({ error: 'Render failed', details: await upstream.text() });

      return new Response(body, {
        status: upstream.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const png = await upstream.arrayBuffer();
    return new Response(png, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Proxy render error:', error);
    return new Response(
      JSON.stringify({ error: 'Proxy render failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
