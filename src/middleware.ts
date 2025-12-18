import type { MiddlewareHandler } from 'astro';

const REQUIRED_IMG_SRC = [
  "'self'",
  'https://img.logo.dev',
  'https://www.google-analytics.com',
  'https://www.googletagmanager.com',
  'https://www.google.com',
  'https://www.google.de',
  'https://stats.g.doubleclick.net',
  'data:',
];

function upsertImgSrcDirective(csp: string | null): string {
  const directive = `img-src ${REQUIRED_IMG_SRC.join(' ')};`;
  if (!csp || !csp.trim()) return directive;

  const parts = csp
    .split(';')
    .map((p) => p.trim())
    .filter(Boolean);

  let foundImgSrc = false;

  const updated = parts.map((p) => {
    const tokens = p.split(/\s+/).filter(Boolean);
    const name = tokens[0]?.toLowerCase();

    if (name !== 'img-src') return p;

    foundImgSrc = true;
    const existing = tokens.slice(1);
    const existingSet = new Set(existing);

    for (const src of REQUIRED_IMG_SRC) {
      if (!existingSet.has(src)) existing.push(src);
    }

    return `img-src ${existing.join(' ')}`;
  });

  if (!foundImgSrc) updated.push(directive.replace(/;$/, '').trim());

  return `${updated.join('; ')};`;
}

export const onRequest: MiddlewareHandler = async (_context, next) => {
  const response = await next();

  // Merge/append required img-src sources for GA/GTM/DoubleClick beacons.
  const existing = response.headers.get('Content-Security-Policy');
  response.headers.set('Content-Security-Policy', upsertImgSrcDirective(existing));

  return response;
};

