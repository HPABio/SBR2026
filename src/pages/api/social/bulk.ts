import type { APIRoute } from 'astro';

/**
 * Proxy endpoint for bulk social card rendering
 * 
 * POST /api/social/bulk
 * Content-Type: application/json
 * 
 * {
 *   "format": "png" | "jpeg",
 *   "quality": 0.92,
 *   "items": [
 *     { "fileName": "image1", "templateId": "im-attending-sbr2026", "data": {...} },
 *     ...
 *   ]
 * }
 * 
 * Returns: application/zip with all rendered images + manifest.json
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Expected application/json' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();

    // Validate basic structure
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'items array is required and must not be empty' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (body.items.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Maximum 100 items per request' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Internal service URL (docker-compose service name)
    const renderServiceUrl = import.meta.env.RENDER_SERVICE_URL || 'http://render-service:8080';
    
    const upstream = await fetch(`${renderServiceUrl}/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!upstream.ok) {
      const ct = upstream.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        const errorBody = await upstream.text();
        return new Response(errorBody, {
          status: upstream.status,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(
        JSON.stringify({ error: 'Bulk render failed', details: await upstream.text() }),
        { status: upstream.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Stream the ZIP response
    const zipBuffer = await upstream.arrayBuffer();
    
    return new Response(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': upstream.headers.get('Content-Disposition') || 
          `attachment; filename="social-cards-${Date.now()}.zip"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Bulk proxy error:', error);
    return new Response(
      JSON.stringify({ error: 'Bulk proxy failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
