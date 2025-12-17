# Social Media Generator

A template-driven social media image generator for SBR2026. Users can select templates, customize content, upload and edit images, and export high-quality PNG/JPEG graphics for social media.

## Features

- **Template System**: Modular React templates with schema-driven forms
- **Real-time Preview**: Live preview updates as users edit content
- **Image Editing**: Crop, zoom, grayscale filter, and position controls via `react-image-crop`
- **Client-side Export**: PNG/JPEG export using `html-to-image`
- **Bulk API**: Generate multiple images via JSON and receive a ZIP file
- **Aspect Ratio Controls**: Support for multiple aspect ratios (1:1, 4:5, 9:16, etc.)

## Usage

### Web Interface

Navigate to `/social-media` on the site to access the generator:

1. **Select a Template** - Choose from available templates in the dropdown
2. **Customize Content** - Fill in the form fields (text, images, etc.)
3. **Edit Images** - Upload photos and adjust crop, zoom, position, and filters
4. **Preview** - See real-time preview of your social card
5. **Export** - Click "Download PNG" or "Download JPEG" to save

### Available Templates

| Template | Description | Fields |
|----------|-------------|--------|
| Speaker Announcement | Speaker spotlight card | Photo, Name, Title, Organization, Talk Title, Date |
| Quote Spotlight | Portrait + bold quote layout | Photo, Quote, Name, Role, Website |
| Session Promo | Headline + speaker + time/location | Photo, Tag, Headline, Speaker, Time, Location |
| Ticket Drop | High-contrast ticket announcement | Background image, Headline, Subheadline, Price, CTA, URL |

## API Reference

### Single Render (Legacy)

```http
POST /api/social/render
Content-Type: multipart/form-data
```

Form fields:
- `portrait` (file) - Image file
- `firstName`, `lastName`, `affiliation` (string)
- `slogan`, `website`, `quote` (string)
- `showLogo`, `uppercase` (boolean as string)
- `tuning` (JSON string for position offsets)

Returns: `image/png`

### Bulk Render

Generate multiple images in one request and receive a ZIP file.

```http
POST /api/social/bulk
Content-Type: application/json
```

**Request Body:**

```json
{
  "format": "png",
  "quality": 0.92,
  "items": [
    {
      "fileName": "speaker-jane-doe",
      "templateId": "speaker-announcement",
      "data": {
        "name": "Dr. Jane Doe",
        "title": "Professor",
        "organization": "MIT",
        "talkTitle": "The Future of Synthetic Biology",
        "date": "June 11-12, 2026"
      }
    },
    {
      "fileName": "attendee-john",
      "templateId": "ticket-drop",
      "data": {
        "headline": "Tickets are live",
        "subhead": "Early bird available for a limited time",
        "price": "from €99",
        "cta": "Get yours now",
        "url": "synbioreactor.de",
        "showLogo": true
      }
    }
  ]
}
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `format` | `"png"` \| `"jpeg"` | No | Output format (default: `"png"`) |
| `quality` | number | No | JPEG quality 0.1-1.0 (default: `0.92`) |
| `items` | array | Yes | Array of render items (max 100) |
| `items[].fileName` | string | Yes | Output filename (extension auto-added) |
| `items[].templateId` | string | Yes | Template ID to use |
| `items[].data` | object | Yes | Template field values |

**Response:**

Returns `application/zip` containing:
- All rendered images
- `manifest.json` with render status for each item

**Example manifest.json:**

```json
{
  "generatedAt": "2025-12-17T04:00:00.000Z",
  "format": "png",
  "totalItems": 2,
  "items": [
    { "fileName": "speaker-jane-doe.png", "templateId": "speaker-announcement", "status": "success" },
    { "fileName": "ticket-drop.png", "templateId": "ticket-drop", "status": "success" }
  ]
}
```

## Creating New Templates

1. Create a new file in `src/components/social-templates/` (e.g., `MyTemplate.tsx`)

2. Define your template component and schema:

```tsx
import type { SocialTemplate, TemplateComponentProps } from './types';
import { ASPECT_RATIOS } from './types';

function MyTemplateComponent({ data, stageWidth }: TemplateComponentProps) {
  const title = (data.title as string) || 'Default Title';
  const baseFontSize = stageWidth / 100;
  
  return (
    <div className="relative w-full h-full">
      <h1 style={{ fontSize: `${baseFontSize * 8}px` }}>
        {title}
      </h1>
    </div>
  );
}

export const MyTemplate: SocialTemplate = {
  id: 'my-template',
  name: 'My Custom Template',
  description: 'A custom template for...',
  Component: MyTemplateComponent,
  defaultAspectRatio: ASPECT_RATIOS[0], // 1:1
  exportWidth: 1080,
  schema: [
    {
      id: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Enter title',
      defaultValue: 'Hello World',
      maxLength: 100,
    },
    // Add more fields...
  ],
};
```

3. Register in `src/components/social-templates/index.ts`:

```ts
import { MyTemplate } from './MyTemplate';

export const templates: SocialTemplate[] = [
  SpeakerAnnouncementTemplate,
  MyTemplate, // Add here
];
```

### Field Types

| Type | Description | Extra Props |
|------|-------------|-------------|
| `text` | Single-line text input | `placeholder`, `maxLength` |
| `textarea` | Multi-line text input | `placeholder`, `maxLength` |
| `link` | URL input | `placeholder`, `maxLength` |
| `image` | Image upload with editing | `aspectHint`, `maxSize` |
| `checkbox` | Boolean toggle | - |

### Image Field Data Structure

When a user uploads an image, the field value becomes:

```ts
interface ImageFieldData {
  src: string;           // Base64 data URL
  fileName?: string;     // Original file name
  crop: {                // Crop region (percentages)
    x: number;
    y: number;
    width: number;
    height: number;
  };
  zoom: number;          // Zoom level (1 = 100%)
  grayscale: boolean;    // Apply grayscale filter
  offsetX: number;       // Position offset X (%)
  offsetY: number;       // Position offset Y (%)
}
```

## Architecture

```
src/
├── components/
│   ├── social-media/
│   │   ├── SocialMediaBuilder.tsx   # Main builder component
│   │   ├── EditableImageFrame.tsx   # Image editing controls
│   │   └── index.ts
│   └── social-templates/
│       ├── types.ts                 # TypeScript definitions
│       ├── SpeakerAnnouncementTemplate.tsx # Template 1
│       ├── QuoteSpotlightTemplate.tsx      # Template 2
│       ├── SessionPromoTemplate.tsx        # Template 3
│       ├── TicketDropTemplate.tsx          # Template 4
│       └── index.ts                 # Template registry
├── pages/
│   ├── social-media.astro           # Public UI page
│   ├── render/
│   │   └── social-card.astro        # Headless render route
│   └── api/
│       └── social/
│           ├── render.ts            # Single render proxy
│           └── bulk.ts              # Bulk render proxy

render-service/
├── src/
│   ├── server.js                    # Express server with /bulk endpoint
│   └── social-render.js             # Legacy Sharp-based renderer
├── Dockerfile                       # Playwright-based container
└── docker-compose.yml
```

## Docker Setup

The bulk render endpoint requires the render-service container running with Playwright.

### Development

```bash
# Start Astro dev server
bun dev --host

# In another terminal, start render-service
cd render-service
docker-compose up --build
```

### Production

```bash
# Build and run all services
docker-compose up --build
```

**Environment Variables:**

| Variable | Service | Description |
|----------|---------|-------------|
| `RENDER_SERVICE_URL` | web | URL to render-service (default: `http://render-service:8080`) |
| `WEB_RENDER_ORIGIN` | render-service | URL to Astro app for Playwright (default: `http://web:4321`) |

## Dependencies

### Root Project
- `html-to-image` - Client-side DOM to image conversion
- `react-image-crop` - Image cropping UI

### Render Service
- `playwright` - Headless browser for server-side rendering
- `archiver` - ZIP file creation
- `sharp` - Image processing (legacy renderer)

## Files Changed

| File | Change |
|------|--------|
| `package.json` | Added html-to-image, react-image-crop |
| `render-service/package.json` | Added playwright, archiver |
| `render-service/Dockerfile` | Updated to Playwright base image |
| `docker-compose.yml` | Added WEB_RENDER_ORIGIN, shm_size |
| `src/pages/social-media.astro` | Replaced with SocialMediaBuilder |
| `src/pages/api/social/bulk.ts` | New bulk render proxy |
| `src/pages/render/social-card.astro` | New headless render route |
