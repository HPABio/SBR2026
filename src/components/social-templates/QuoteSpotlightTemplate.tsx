import type { ImageFieldData, SocialTemplate, TemplateComponentProps } from './types';
import { ASPECT_RATIOS } from './types';

import sbrLogoSrc from '@/assets/SBR2026-Favicon-lg.png';

const SBR_LOGO = typeof sbrLogoSrc === 'object' && 'src' in sbrLogoSrc ? sbrLogoSrc.src : sbrLogoSrc;

function QuoteSpotlightComponent({ data, stageWidth }: TemplateComponentProps) {
  const quote = (data.quote as string) || '"Synthetic biology is built by builders."';
  const name = (data.name as string) || 'Your Name';
  const role = (data.role as string) || 'Role / Org';
  const website = (data.website as string) || 'synbioreactor.de';
  const showLogo = data.showLogo !== false;
  const photo = data.photo as ImageFieldData | undefined;

  const base = stageWidth / 100;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        fontFamily: "'Anton', 'Quicksand', sans-serif",
        background: 'radial-gradient(120% 120% at 0% 0%, #1f2937 0%, #0b0b0b 55%, #000000 100%)',
      }}
    >
      {/* Accent blobs */}
      <div
        className="absolute"
        style={{
          inset: '-30%',
          background:
            'radial-gradient(closest-side at 20% 30%, rgba(250,204,21,0.25), transparent 60%), radial-gradient(closest-side at 80% 70%, rgba(225,29,72,0.22), transparent 60%)',
          filter: 'blur(2px)',
        }}
      />

      {/* Left photo column */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: '8%',
          left: '6%',
          width: '38%',
          height: '84%',
          borderRadius: 24,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        {photo?.src && (
          <img
            src={photo.src}
            alt="Portrait"
            crossOrigin="anonymous"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `translate(${photo.offsetX}%, ${photo.offsetY}%) scale(${photo.zoom})`,
              transformOrigin: '50% 50%',
              filter: photo.grayscale ? 'grayscale(100%)' : 'none',
            }}
          />
        )}

        {/* subtle overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.35))',
          }}
        />
      </div>

      {/* Right quote */}
      <div
        className="absolute"
        style={{
          top: '10%',
          left: '48%',
          right: '6%',
          bottom: '10%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontSize: `${base * 2.3}px`,
              fontFamily: "'Anton', sans-serif",
              letterSpacing: '0.22em',
              color: 'rgba(250,204,21,0.95)',
              textTransform: 'uppercase',
            }}
          >
            QUOTE SPOTLIGHT
          </div>

          <div
            style={{
              marginTop: `${base * 2}px`,
              fontSize: `${base * 4.4}px`,
              lineHeight: 1.08,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.01em',
            }}
          >
            {quote}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: `${base * 3.2}px`,
              fontFamily: "'Anton', sans-serif",
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
            }}
          >
            {name}
          </div>
          <div
            style={{
              marginTop: `${base * 0.6}px`,
              fontSize: `${base * 2.2}px`,
              fontFamily: "'Quicksand', sans-serif",
              color: 'rgba(229,231,235,0.9)',
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            {role}
          </div>

          <div
            className="mt-4 flex items-center justify-between"
            style={{ marginTop: `${base * 2.0}px` }}
          >
            <div
              style={{
                fontSize: `${base * 2.0}px`,
                fontFamily: "'Quicksand', sans-serif",
                color: 'rgba(156,163,175,1)',
                letterSpacing: '0.06em',
              }}
            >
              {website}
            </div>

            {showLogo && (
              <img
                src={SBR_LOGO}
                alt="SBR"
                crossOrigin="anonymous"
                style={{ width: '10%', height: 'auto', objectFit: 'contain', opacity: 0.95 }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const QuoteSpotlightTemplate: SocialTemplate = {
  id: 'quote-spotlight',
  name: 'Quote Spotlight',
  description: 'Portrait + bold quote layout (great for speaker quotes)',
  Component: QuoteSpotlightComponent,
  defaultAspectRatio: ASPECT_RATIOS[0],
  supportedAspectRatios: [ASPECT_RATIOS[0], ASPECT_RATIOS[1]],
  exportWidth: 1080,
  schema: [
    {
      id: 'photo',
      label: 'Portrait Photo',
      type: 'image',
      aspectHint: '3:4',
      // Container is ~38% wide by ~84% tall in this layout.
      initialCropAspectRatio: 38 / 84,
      maxSize: 10 * 1024 * 1024,
    },
    {
      id: 'quote',
      label: 'Quote',
      type: 'textarea',
      placeholder: 'Add your quote…',
      defaultValue: '"Synthetic biology is built by builders."',
      maxLength: 220,
    },
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Full name',
      defaultValue: '',
      maxLength: 60,
    },
    {
      id: 'role',
      label: 'Role / Organization',
      type: 'text',
      placeholder: 'e.g. Researcher • Uni',
      defaultValue: '',
      maxLength: 80,
    },
    {
      id: 'website',
      label: 'Website',
      type: 'link',
      placeholder: 'synbioreactor.de',
      defaultValue: 'synbioreactor.de',
      maxLength: 100,
    },
    {
      id: 'showLogo',
      label: 'Show SBR logo',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};

export default QuoteSpotlightTemplate;
