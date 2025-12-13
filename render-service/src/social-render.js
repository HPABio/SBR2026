import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

/**
 * @typedef {{ buffer: Buffer, mimeType: string }} UploadedImage
 * @typedef {{ xPct?: number, yPct?: number }} TuningEntry
 * @typedef {Record<string, TuningEntry>} Tuning
 * @typedef {{
 *  firstName: string,
 *  lastName: string,
 *  affiliation: string,
 *  slogan: string,
 *  website: string,
 *  quote: string,
 *  showLogo: boolean,
 *  uppercase: boolean,
 *  tuning?: unknown,
 *  portrait?: UploadedImage
 * }} RenderInput
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ASSETS_DIR = path.resolve(__dirname, '..', 'assets');
const TEMPLATE_PATH = path.join(ASSETS_DIR, 'template.png');
const LOGO_PATH = path.join(ASSETS_DIR, 'logo.png');

// Font embedding: ensures backend render matches browser preview more closely.
// We fetch TTFs once per process and embed them into the SVG via @font-face.
const ANTON_TTF_URL =
  process.env.ANTON_TTF_URL ||
  'https://raw.githubusercontent.com/google/fonts/main/ofl/anton/Anton-Regular.ttf';
const QUICKSAND_TTF_URL =
  process.env.QUICKSAND_TTF_URL ||
  'https://raw.githubusercontent.com/google/fonts/main/ofl/quicksand/Quicksand%5Bwght%5D.ttf';

/** @type {Promise<{ antonBase64?: string, quicksandBase64?: string }> | null} */
let fontCachePromise = null;

function toBase64(buf) {
  return Buffer.from(buf).toString('base64');
}

async function fetchAsBase64(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Failed to fetch font: ${url} (${resp.status})`);
  const ab = await resp.arrayBuffer();
  return toBase64(Buffer.from(ab));
}

async function getEmbeddedFonts() {
  if (fontCachePromise) return fontCachePromise;
  fontCachePromise = (async () => {
    /** @type {{ antonBase64?: string, quicksandBase64?: string }} */
    const out = {};
    try {
      out.antonBase64 = await fetchAsBase64(ANTON_TTF_URL);
    } catch {
      // If network/font fetch fails, we fall back to system fonts.
    }
    try {
      out.quicksandBase64 = await fetchAsBase64(QUICKSAND_TTF_URL);
    } catch {
      // ignore
    }
    return out;
  })();
  return fontCachePromise;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/** @type {Tuning} */
const DEFAULT_TUNING = {
  name: { xPct: 11.0, yPct: -14.0 },
  portrait: { xPct: 22.0, yPct: -8.0 },
  logo: { xPct: 14.5, yPct: 9.5 },
  slogan: { xPct: 0.0, yPct: 0.0 },
  website: { xPct: 5.5, yPct: -24.5 },
  quote: { xPct: -12.5, yPct: -30.0 },
};

/** @param {unknown} maybe */
function normalizeTuning(maybe) {
  /** @type {Tuning} */
  const out = { ...DEFAULT_TUNING };
  if (!maybe || typeof maybe !== 'object') return out;
  for (const [k, v] of Object.entries(maybe)) {
    if (!v || typeof v !== 'object') continue;
    const xPct = typeof v.xPct === 'number' ? clamp(v.xPct, -30, 30) : 0;
    const yPct = typeof v.yPct === 'number' ? clamp(v.yPct, -30, 30) : 0;
    out[k] = { xPct, yPct };
  }
  return out;
}

function normText(s, uppercase) {
  const t = String(s || '').trim();
  return uppercase ? t.toUpperCase() : t;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapTextSimple(text, maxCharsPerLine, maxLines) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (test.length <= maxCharsPerLine) {
      line = test;
    } else {
      if (line) lines.push(line);
      line = w;
      if (lines.length >= maxLines) break;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

/**
 * Server-side renderer.
 * This intentionally mirrors the *layout intent* of the current frontend,
 * while staying stable for headless container rendering.
 *
 * The client can send `tuning` offsets (percent-of-width/height) to nudge blocks.
 *
 * @param {RenderInput} input
 */
export async function renderSocialPng(input) {
  const templateBuf = await fs.readFile(TEMPLATE_PATH);
  const logoBuf = await fs.readFile(LOGO_PATH);

  const base = sharp(templateBuf, { failOn: 'none' });
  const meta = await base.metadata();
  const W = meta.width ?? 1024;
  const H = meta.height ?? 1024;

  const { antonBase64, quicksandBase64 } = await getEmbeddedFonts();

  const tuning = normalizeTuning(input.tuning);
  const dx = (key) => ((tuning[key]?.xPct ?? 0) / 100) * W;
  const dy = (key) => ((tuning[key]?.yPct ?? 0) / 100) * H;

  // Base layout: mirror the exact CSS used in `src/pages/social-media.astro`.
  // Stage is square (template is square), and percentages are relative to stage width/height.
  const photoRect = {
    // left: 50%, top: 50%, translateX(127% of own width), translateY(-30% of own height)
    w: W * 0.175,
    h: H * 0.26833,
    x: W * 0.5 + (W * 0.175) * 1.27 + dx('portrait'),
    y: H * 0.5 - (H * 0.26833) * 0.3 + dy('portrait'),
  };
  const logoRect = {
    // left: 50%, top: 50%, translateX(140% of own width), translateY(80% of own height)
    w: W * 0.11667,
    h: H * 0.11667,
    x: W * 0.5 + (W * 0.11667) * 1.4 + dx('logo'),
    y: H * 0.5 + (H * 0.11667) * 0.8 + dy('logo'),
  };
  const sloganPos = {
    x: W * 0.035 + dx('slogan'),
    y: H * 0.033 + dy('slogan'),
  };
  const quoteBox = {
    x: W * 0.22 + dx('quote'),
    // y is computed after wrapping (because the preview anchors via `bottom: 9.5%`)
    y: 0,
    w: W * 0.43333,
    bottom: H * (1 - 0.095) + dy('quote'),
  };

  // Portrait (cover crop)
  /** @type {Array<sharp.OverlayOptions>} */
  const overlays = [];

  if (input.portrait?.buffer) {
    const portrait = sharp(input.portrait.buffer, { failOn: 'none' })
      .rotate()
      .resize({
        width: Math.round(photoRect.w),
        height: Math.round(photoRect.h),
        fit: 'cover',
        position: 'centre',
      })
      .png();

    overlays.push({
      input: await portrait.toBuffer(),
      left: Math.round(photoRect.x),
      top: Math.round(photoRect.y),
    });
  }

  // Logo
  if (input.showLogo) {
    const logo = sharp(logoBuf, { failOn: 'none' })
      .resize({ width: Math.round(logoRect.w), height: Math.round(logoRect.h), fit: 'contain' })
      .png();

    overlays.push({
      input: await logo.toBuffer(),
      left: Math.round(logoRect.x),
      top: Math.round(logoRect.y),
    });
  }

  // Text via SVG overlay (Sharp supports compositing SVG)
  const firstName = normText(input.firstName, input.uppercase);
  const lastName = normText(input.lastName, input.uppercase);
  const affiliation = normText(input.affiliation, input.uppercase);

  const slogan = String(input.slogan || "i'm attending").trim();
  const website = String(input.website || '').trim();
  const quote = String(input.quote || '').trim();

  // Match preview cqw sizes
  const lastSize = Math.round(W * 0.05); // 5.0cqw
  const firstSize = Math.round(W * 0.0285); // 2.85cqw
  const affSize = Math.round(W * 0.0205); // 2.05cqw
  const sloganSize = Math.round(W * 0.13); // 13cqw
  const websiteSize = Math.round(W * 0.023); // 2.3cqw
  const quoteSize = Math.round(W * 0.0205); // 2.05cqw

  // Quote in preview uses monospace + fixed width. Estimate wrap by character width (~0.62em for monospace).
  const quoteMaxChars = Math.max(10, Math.floor(quoteBox.w / (quoteSize * 0.62)));
  const quoteLines = quote ? wrapTextSimple(quote, quoteMaxChars, 6) : [];
  const quoteLineH = Math.round(quoteSize * 1.6); // leading-relaxed-ish
  const quoteHeight = quoteLines.length * quoteLineH;
  quoteBox.y = quoteBox.bottom - quoteHeight;

  // Website is anchored by `bottom: 5.5%` in preview.
  const websiteBottom = H * (1 - 0.055) + dy('website');
  const websiteY = websiteBottom - Math.round(websiteSize * 1.25);
  const websiteX = W * 0.042 + dx('website');

  // Name tag block: centered + translated by percent of its own box.
  // left: 50% + translateX(30% of block width), top: 50% + translateY(-115% of block height)
  const nameX = W * 0.5 + (W * 0.33333) * 0.3 + dx('name');
  const nameBlockHeight =
    Math.round(lastSize * 0.85) + Math.round(firstSize * 0.75) + Math.round(affSize * 1.2);
  const nameTop = H * 0.5 - nameBlockHeight * 1.15 + dy('name');
  const nameLastY = nameTop;
  const nameFirstY = nameTop + Math.round(lastSize * 0.85);
  const nameAffY = nameFirstY + Math.round(firstSize * 0.75);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <style>
    ${antonBase64 ? `@font-face{font-family:'Anton';src:url(data:font/ttf;base64,${antonBase64}) format('truetype');font-weight:400;font-style:normal;}` : ''}
    ${quicksandBase64 ? `@font-face{font-family:'Quicksand';src:url(data:font/ttf;base64,${quicksandBase64}) format('truetype');font-weight:100 900;font-style:normal;}` : ''}
  </style>

  ${lastName ? `<text x="${nameX}" y="${nameLastY}" dominant-baseline="text-before-edge" font-size="${lastSize}" font-family="${antonBase64 ? 'Anton' : 'DejaVu Sans'}" font-weight="800" fill="#F08A22">${escapeXml(lastName)}</text>` : ''}
  ${firstName ? `<text x="${nameX}" y="${nameFirstY}" dominant-baseline="text-before-edge" font-size="${firstSize}" font-family="${antonBase64 ? 'Anton' : 'DejaVu Sans'}" font-weight="800" fill="#ffffff">${escapeXml(firstName)}</text>` : ''}
  ${affiliation ? `<text x="${nameX}" y="${nameAffY}" dominant-baseline="text-before-edge" font-size="${affSize}" font-family="${quicksandBase64 ? 'Quicksand' : 'DejaVu Sans'}" font-weight="300" fill="#ffffff">${escapeXml(affiliation)}</text>` : ''}

  ${slogan ? `<text x="${sloganPos.x}" y="${sloganPos.y}" dominant-baseline="text-before-edge" font-size="${sloganSize}" font-family="${antonBase64 ? 'Anton' : 'DejaVu Sans'}" font-weight="700" fill="#0b0b0b">${escapeXml(slogan)}</text>` : ''}

  ${website ? `<text x="${websiteX}" y="${websiteY}" dominant-baseline="text-before-edge" font-size="${websiteSize}" font-family="${quicksandBase64 ? 'Quicksand' : 'DejaVu Sans'}" font-weight="300" fill="#111111">${escapeXml(website)}</text>` : ''}

  ${quoteLines
    .map((line, i) => {
      const y = quoteBox.y + i * quoteLineH;
      return `<text x="${quoteBox.x}" y="${y}" dominant-baseline="text-before-edge" font-size="${quoteSize}" font-family="monospace" font-weight="600" fill="#6b7280">${escapeXml(line)}</text>`;
    })
    .join('\n')}
</svg>`;

  overlays.push({ input: Buffer.from(svg), left: 0, top: 0 });

  const out = await sharp(templateBuf, { failOn: 'none' })
    .composite(overlays)
    .png({ compressionLevel: 9 })
    .toBuffer();

  return out;
}
