import express from 'express';
import multer from 'multer';
import { z } from 'zod';
import { renderSocialPng } from './social-render.js';

const app = express();

// Keep it simple: multipart form-data only.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

app.get('/healthz', (_req, res) => {
  res.status(200).json({ ok: true });
});

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
  // JSON string: { name:{xPct,yPct}, portrait:{...}, ... }
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
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: 'render_failed' });
  }
});

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`render-service listening on :${port}`);
});
