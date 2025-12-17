import type { ImageFieldData, SocialTemplate, TemplateComponentProps } from './types';
import { ASPECT_RATIOS } from './types';

import sbrLogoSrc from '@/assets/SBR2026-Favicon-lg.png';

const SBR_LOGO = typeof sbrLogoSrc === 'object' && 'src' in sbrLogoSrc ? sbrLogoSrc.src : sbrLogoSrc;

function TicketDropComponent({ data, stageWidth }: TemplateComponentProps) {
  const headline = (data.headline as string) || 'Tickets are live';
  const subhead = (data.subhead as string) || 'Early bird available for a limited time';
  const price = (data.price as string) || 'from €99';
  const cta = (data.cta as string) || 'Get yours now';
  const url = (data.url as string) || 'synbioreactor.de';
  const showLogo = data.showLogo !== false;
  const bg = data.background as ImageFieldData | undefined;

  const base = stageWidth / 100;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        fontFamily: "'Anton', 'Quicksand', sans-serif",
        background: 'linear-gradient(135deg, #000000 0%, #111827 55%, #000000 100%)',
      }}
    >
      {/* background photo */}
      {bg?.src && (
        <img
          src={bg.src}
          alt="Background"
          crossOrigin="anonymous"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `translate(${bg.offsetX}%, ${bg.offsetY}%) scale(${bg.zoom})`,
            transformOrigin: '50% 50%',
            filter: bg.grayscale ? 'grayscale(100%)' : 'none',
            opacity: 0.85,
          }}
        />
      )}

      {/* overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.25) 100%), radial-gradient(120% 120% at 10% 20%, rgba(225,29,72,0.18), transparent 55%), radial-gradient(120% 120% at 80% 70%, rgba(250,204,21,0.18), transparent 55%)',
        }}
      />

      {/* content */}
      <div className="absolute" style={{ left: '7%', top: '10%', right: '7%', bottom: '10%' }}>
        <div
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: `${base * 8.0}px`,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#ffffff',
            maxWidth: '70%',
          }}
        >
          {headline}
        </div>

        <div
          style={{
            marginTop: `${base * 1.6}px`,
            fontFamily: "'Quicksand', sans-serif",
            fontSize: `${base * 2.6}px`,
            fontWeight: 600,
            color: 'rgba(229,231,235,0.9)',
            maxWidth: '70%',
            lineHeight: 1.25,
          }}
        >
          {subhead}
        </div>

        {/* price pill */}
        <div
          style={{
            marginTop: `${base * 3.0}px`,
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: `${base * 1.2}px`,
            padding: `${base * 1.2}px ${base * 2.0}px`,
            borderRadius: 999,
            background: 'rgba(250,204,21,0.14)',
            border: '1px solid rgba(250,204,21,0.35)',
          }}
        >
          <div
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: `${base * 3.0}px`,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(250,204,21,0.95)',
            }}
          >
            PRICE
          </div>
          <div
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: `${base * 4.2}px`,
              letterSpacing: '-0.01em',
              color: '#ffffff',
            }}
          >
            {price}
          </div>
        </div>

        {/* bottom row */}
        <div
          className="absolute flex items-end justify-between"
          style={{ left: 0, right: 0, bottom: 0 }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: `${base * 3.4}px`,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#ffffff',
              }}
            >
              {cta}
            </div>
            <div
              style={{
                marginTop: `${base * 0.8}px`,
                fontFamily: "'Quicksand', sans-serif",
                fontSize: `${base * 2.1}px`,
                letterSpacing: '0.06em',
                color: 'rgba(156,163,175,1)',
              }}
            >
              {url}
            </div>
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

      {/* top-right badge */}
      <div
        className="absolute"
        style={{
          top: '6%',
          right: '6%',
          padding: `${base * 1.0}px ${base * 1.6}px`,
          borderRadius: 14,
          background: 'rgba(225,29,72,0.18)',
          border: '1px solid rgba(225,29,72,0.35)',
          color: 'rgba(255,255,255,0.95)',
          fontFamily: "'Anton', sans-serif",
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          fontSize: `${base * 2.0}px`,
        }}
      >
        TICKET DROP
      </div>
    </div>
  );
}

export const TicketDropTemplate: SocialTemplate = {
  id: 'ticket-drop',
  name: 'Ticket Drop',
  description: 'High-contrast ticket announcement with background photo',
  Component: TicketDropComponent,
  defaultAspectRatio: ASPECT_RATIOS[0],
  supportedAspectRatios: [ASPECT_RATIOS[0], ASPECT_RATIOS[1], ASPECT_RATIOS[2]],
  exportWidth: 1080,
  schema: [
    {
      id: 'background',
      label: 'Background Image (optional)',
      type: 'image',
      aspectHint: '16:9',
      // Background fills the whole stage; match the currently selected stage ratio.
      useStageAspectForInitialCrop: true,
      maxSize: 10 * 1024 * 1024,
    },
    {
      id: 'headline',
      label: 'Headline',
      type: 'text',
      placeholder: 'Tickets are live',
      defaultValue: 'Tickets are live',
      maxLength: 50,
    },
    {
      id: 'subhead',
      label: 'Subheadline',
      type: 'text',
      placeholder: 'Early bird available…',
      defaultValue: 'Early bird available for a limited time',
      maxLength: 80,
    },
    {
      id: 'price',
      label: 'Price',
      type: 'text',
      placeholder: 'from €99',
      defaultValue: 'from €99',
      maxLength: 20,
    },
    {
      id: 'cta',
      label: 'CTA',
      type: 'text',
      placeholder: 'Get yours now',
      defaultValue: 'Get yours now',
      maxLength: 30,
    },
    {
      id: 'url',
      label: 'URL',
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

export default TicketDropTemplate;
