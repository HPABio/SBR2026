import express from 'express';
import multer from 'multer';
import { z } from 'zod';
import { chromium } from 'playwright';
import archiver from 'archiver';
import { renderSocialPng } from './social-render.js';

const app = express();
app.use(express.json({ limit: '50mb' }));

// Keep it simple: multipart form-data only for single renders.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// Web render origin (Astro app) for Playwright to load
const WEB_RENDER_ORIGIN = process.env.WEB_RENDER_ORIGIN || 'http://localhost:4321';

// Browser instance (lazy-initialized)
let browserInstance = null;

async function getBrowser() {
  if (!browserInstance) {
    browserInstance = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
  }
  return browserInstance;
}

// Cleanup browser on shutdown
process.on('SIGTERM', async () => {
  if (browserInstance) {
    await browserInstance.close();
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  if (browserInstance) {
    await browserInstance.close();
  }
  process.exit(0);
});

app.get('/healthz', (_req, res) => {
  res.status(200).json({ ok: true });
});

// Schema for single render (legacy Sharp-based)
const RenderBodySchema = z.object({
  firstName: z.string().optional().default(''),
  lastName: z.string().optional().default(''),
  affiliation: z.string().optional().default(''),
  slogan: z.string().optional().default("i'm attending"),
  website: z.string().optional().default('www.synbioreactor.de'),
  quote: z.string().optional().default(''),
  showLogo: z
    .union([z.literal('true'), z.literal('false'), z.boolean()])
    .optional()
    .default('true')
    .transform((v) => (typeof v === 'boolean' ? v : v === 'true')),
  uppercase: z
    .union([z.literal('true'), z.literal('false'), z.boolean()])
    .optional()
    .default('true')
    .transform((v) => (typeof v === 'boolean' ? v : v === 'true')),
  tuning: z
    .string()
    .optional()
    .transform((s) => {
      if (!s) return undefined;
      try {
        const parsed = JSON.parse(s);
        return parsed;
      } catch {
        return undefined;
      }
    }),
});

// Legacy single render endpoint (Sharp-based)
app.post('/render', upload.single('portrait'), async (req, res) => {
  try {
    const parsed = RenderBodySchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      res.status(400).json({ error: 'invalid_request', details: parsed.error.flatten() });
      return;
    }

    const png = await renderSocialPng({
      ...parsed.data,
      portrait: req.file
        ? {
            buffer: req.file.buffer,
            mimeType: req.file.mimetype,
          }
        : undefined,
    });

    res.status(200);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-store');
    res.send(png);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'render_failed' });
  }
});

// Schema for bulk render items
const BulkItemSchema = z.object({
  fileName: z.string().min(1).max(200),
  templateId: z.string().min(1),
  data: z.record(z.unknown()),
});

const BulkRequestSchema = z.object({
  format: z.enum(['png', 'jpeg']).default('png'),
  quality: z.number().min(0.1).max(1).optional().default(0.92),
  items: z.array(BulkItemSchema).min(1).max(100),
});

/**
 * Bulk render endpoint
 * 
 * Accepts JSON with multiple items, renders each using Playwright,
 * and returns a ZIP file containing all images.
 * 
 * POST /bulk
 * {
 *   "format": "png" | "jpeg",
 *   "quality": 0.92,
 *   "items": [
 *     { "fileName": "image1.png", "templateId": "im-attending-sbr2026", "data": {...} },
 *     ...
 *   ]
 * }
 */
app.post('/bulk', async (req, res) => {
  const parsed = BulkRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'invalid_request', details: parsed.error.flatten() });
    return;
  }

  const { format, quality, items } = parsed.data;
  const ext = format === 'jpeg' ? 'jpg' : 'png';

  let browser;
  let page;

  try {
    browser = await getBrowser();
    page = await browser.newPage();

    // Navigate to the render page
    const renderUrl = `${WEB_RENDER_ORIGIN}/render/social-card`;
    console.log(`Loading render page: ${renderUrl}`);

    await page.goto(renderUrl, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for the page to be ready
    await page.waitForFunction(() => window.__socialCardReady === true, { timeout: 30000 });

    // Set up response headers for ZIP streaming
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="social-cards-${Date.now()}.zip"`);
    res.setHeader('Cache-Control', 'no-store');

    // Create ZIP archive
    const archive = archiver('zip', { zlib: { level: 6 } });
    archive.pipe(res);

    // Track results for manifest
    const manifest = {
      generatedAt: new Date().toISOString(),
      format,
      totalItems: items.length,
      items: [],
    };

    // Render each item
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemFileName = item.fileName.endsWith(`.${ext}`)
        ? item.fileName
        : `${item.fileName}.${ext}`;

      console.log(`Rendering ${i + 1}/${items.length}: ${itemFileName}`);

      try {
        // Call the render function in the page
        const dataUrl = await page.evaluate(
          async ({ templateId, data, format, quality }) => {
            if (typeof window.__renderSocialCard !== 'function') {
              throw new Error('Render function not available');
            }
            return window.__renderSocialCard({ templateId, data, format, quality });
          },
          { templateId: item.templateId, data: item.data, format, quality }
        );

        // Convert data URL to buffer
        const base64Data = dataUrl.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');

        // Add to ZIP
        archive.append(buffer, { name: itemFileName });

        manifest.items.push({
          fileName: itemFileName,
          templateId: item.templateId,
          status: 'success',
        });
      } catch (itemError) {
        console.error(`Failed to render ${itemFileName}:`, itemError);
        manifest.items.push({
          fileName: itemFileName,
          templateId: item.templateId,
          status: 'failed',
          error: itemError.message,
        });
      }
    }

    // Add manifest to ZIP
    archive.append(JSON.stringify(manifest, null, 2), { name: 'manifest.json' });

    // Finalize the archive
    await archive.finalize();
  } catch (err) {
    console.error('Bulk render error:', err);
    
    // If headers haven't been sent yet, send error JSON
    if (!res.headersSent) {
      res.status(500).json({ error: 'bulk_render_failed', message: err.message });
    }
  } finally {
    if (page) {
      await page.close().catch(() => {});
    }
  }
});

/**
 * Single render via Playwright (new style)
 * 
 * POST /render-playwright
 * {
 *   "templateId": "im-attending-sbr2026",
 *   "data": {...},
 *   "format": "png" | "jpeg",
 *   "quality": 0.92
 * }
 */
const SinglePlaywrightSchema = z.object({
  templateId: z.string().min(1),
  data: z.record(z.unknown()),
  format: z.enum(['png', 'jpeg']).default('png'),
  quality: z.number().min(0.1).max(1).optional().default(0.92),
});

app.post('/render-playwright', async (req, res) => {
  const parsed = SinglePlaywrightSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'invalid_request', details: parsed.error.flatten() });
    return;
  }

  const { templateId, data, format, quality } = parsed.data;
  let browser;
  let page;

  try {
    browser = await getBrowser();
    page = await browser.newPage();

    const renderUrl = `${WEB_RENDER_ORIGIN}/render/social-card`;
    await page.goto(renderUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForFunction(() => window.__socialCardReady === true, { timeout: 30000 });

    const dataUrl = await page.evaluate(
      async ({ templateId, data, format, quality }) => {
        return window.__renderSocialCard({ templateId, data, format, quality });
      },
      { templateId, data, format, quality }
    );

    const base64Data = dataUrl.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

    res.setHeader('Content-Type', format === 'jpeg' ? 'image/jpeg' : 'image/png');
    res.setHeader('Cache-Control', 'no-store');
    res.send(buffer);
  } catch (err) {
    console.error('Playwright render error:', err);
    res.status(500).json({ error: 'render_failed', message: err.message });
  } finally {
    if (page) {
      await page.close().catch(() => {});
    }
  }
});

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
  console.log(`render-service listening on :${port}`);
  console.log(`Web render origin: ${WEB_RENDER_ORIGIN}`);
});
