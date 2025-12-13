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

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/** @param {unknown} maybe */
function normalizeTuning(maybe) {
  /** @type {Tuning} */
  const out = {};
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

  const tuning = normalizeTuning(input.tuning);
  const dx = (key) => ((tuning[key]?.xPct ?? 0) / 100) * W;
  const dy = (key) => ((tuning[key]?.yPct ?? 0) / 100) * H;

  // Base layout (fractions match earlier frontend ratios)
  const photoRect = {
    x: W * 0.735 + dx('portrait'),
    y: H * 0.395 + dy('portrait'),
    w: W * 0.165,
    h: H * 0.255,
  };
  const logoRect = {
    x: W * 0.755 + dx('logo'),
    y: H * 0.675 + dy('logo'),
    w: W * 0.11,
    h: W * 0.11,
  };
  const namePos = {
    x: W * 0.62 + dx('name'),
    y: H * 0.30 + dy('name'),
  };
  const sloganPos = {
    x: W * 0.075 + dx('slogan'),
    y: H * 0.155 + dy('slogan'),
  };
  const websitePos = {
    x: W * 0.10 + dx('website'),
    y: H * 0.88 + dy('website'),
  };
  const quoteBox = {
    x: W * 0.36 + dx('quote'),
    y: H * 0.80 + dy('quote'),
    w: W * 0.36,
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

  const lastSize = Math.round(W * 0.055);
  const firstSize = Math.round(W * 0.034);
  const affSize = Math.round(W * 0.022);
  const sloganSize = Math.round(W * 0.08);
  const websiteSize = Math.round(W * 0.022);
  const quoteSize = Math.round(W * 0.02);

  const quoteLines = quote ? wrapTextSimple(quote, 44, 6) : [];

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="nameGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#e11d48"/>
      <stop offset="0.5" stop-color="#facc15"/>
      <stop offset="1" stop-color="#e11d48"/>
    </linearGradient>
  </defs>

  ${lastName ? `<text x="${namePos.x}" y="${namePos.y}" font-size="${lastSize}" font-family="Anton, Impact, Arial" font-weight="800" fill="url(#nameGrad)">${escapeXml(lastName)}</text>` : ''}
  ${firstName ? `<text x="${namePos.x}" y="${namePos.y + Math.round(H * 0.035)}" font-size="${firstSize}" font-family="Anton, Impact, Arial" font-weight="800" fill="#ffffff">${escapeXml(firstName)}</text>` : ''}
  ${affiliation ? `<text x="${namePos.x}" y="${namePos.y + Math.round(H * 0.062)}" font-size="${affSize}" font-family="Arial" font-weight="500" fill="#ffffff">${escapeXml(affiliation)}</text>` : ''}

  ${slogan ? `<text x="${sloganPos.x}" y="${sloganPos.y}" font-size="${sloganSize}" font-family="Anton, Impact, Arial" font-weight="700" fill="#0b0b0b">${escapeXml(slogan)}</text>` : ''}

  ${website ? `<text x="${websitePos.x}" y="${websitePos.y}" font-size="${websiteSize}" font-family="Arial" font-weight="400" fill="#111111">${escapeXml(website)}</text>` : ''}

  ${quoteLines
    .map((line, i) => {
      const y = quoteBox.y + i * Math.round(W * 0.028);
      return `<text x="${quoteBox.x}" y="${y}" font-size="${quoteSize}" font-family="monospace" font-weight="600" fill="#6b7280">${escapeXml(line)}</text>`;
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
