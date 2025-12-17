import type { ImageFieldData, SocialTemplate, TemplateComponentProps } from './types';
import { ASPECT_RATIOS } from './types';

import sbrLogoSrc from '@/assets/SBR2026-Favicon-lg.png';

const SBR_LOGO = typeof sbrLogoSrc === 'object' && 'src' in sbrLogoSrc ? sbrLogoSrc.src : sbrLogoSrc;

function SessionPromoComponent({ data, stageWidth }: TemplateComponentProps) {
  const tag = (data.tag as string) || 'SESSION';
  const headline = (data.headline as string) || 'Build • Learn • Connect';
  const speaker = (data.speaker as string) || 'Speaker Name';
  const time = (data.time as string) || 'Day 1 • 14:00';
  const location = (data.location as string) || 'Main Hall';
  const showLogo = data.showLogo !== false;
  const photo = data.photo as ImageFieldData | undefined;

  const base = stageWidth / 100;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        fontFamily: "'Anton', 'Quicksand', sans-serif",
        background: 'linear-gradient(135deg, #0b0b0b 0%, #111827 50%, #0b0b0b 100%)',
      }}
    >
      {/* diagonal accent */}
      <div
        className="absolute"
        style={{
          left: '-20%',
          top: '-20%',
          width: '80%',
          height: '160%',
          transform: 'rotate(18deg)',
          background: 'linear-gradient(180deg, rgba(225,29,72,0.85), rgba(250,204,21,0.65))',
          opacity: 0.35,
        }}
      />

      {/* photo cutout */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: '12%',
          right: '6%',
          width: '38%',
          height: '58%',
          borderRadius: 28,
          border: '1px solid rgba(255,255,255,0.14)',
          background: 'rgba(255,255,255,0.06)',
          boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
        }}
      >
        {photo?.src && (
          <img
            src={photo.src}
            alt="Session photo"
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
      </div>

      {/* text block */}
      <div
        className="absolute"
        style={{
          left: '7%',
          top: '12%',
          right: '48%',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: `${base * 0.8}px ${base * 1.4}px`,
            borderRadius: 999,
            background: 'rgba(250,204,21,0.12)',
            border: '1px solid rgba(250,204,21,0.35)',
            color: 'rgba(250,204,21,0.95)',
            fontFamily: "'Anton', sans-serif",
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontSize: `${base * 2.1}px`,
          }}
        >
          {tag}
        </div>

        <div
          style={{
            marginTop: `${base * 2.0}px`,
            fontFamily: "'Anton', sans-serif",
            fontSize: `${base * 7.0}px`,
            lineHeight: 0.95,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            color: '#ffffff',
          }}
        >
          {headline}
        </div>

        <div
          style={{
            marginTop: `${base * 1.8}px`,
            fontFamily: "'Quicksand', sans-serif",
            fontSize: `${base * 2.6}px`,
            fontWeight: 600,
            color: 'rgba(229,231,235,0.92)',
          }}
        >
          {speaker}
        </div>

        <div
          style={{
            marginTop: `${base * 1.0}px`,
            fontFamily: "'Quicksand', sans-serif",
            fontSize: `${base * 2.1}px`,
            fontWeight: 500,
            color: 'rgba(156,163,175,1)',
            letterSpacing: '0.03em',
          }}
        >
          {time} • {location}
        </div>
      </div>

      {/* footer */}
      <div
        className="absolute flex items-center justify-between"
        style={{ left: '7%', right: '7%', bottom: '6%' }}
      >
        <div
          style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: `${base * 2.0}px`,
            letterSpacing: '0.08em',
            color: 'rgba(209,213,219,0.85)',
          }}
        >
          SYNBIOREACTOR 2026
        </div>
        {showLogo && (
          <img
            src={SBR_LOGO}
            alt="SBR"
            crossOrigin="anonymous"
            style={{ width: '9%', height: 'auto', objectFit: 'contain', opacity: 0.95 }}
          />
        )}
      </div>
    </div>
  );
}

export const SessionPromoTemplate: SocialTemplate = {
  id: 'session-promo',
  name: 'Session Promo',
  description: 'Headline + speaker + time/location with photo card',
  Component: SessionPromoComponent,
  defaultAspectRatio: ASPECT_RATIOS[0],
  supportedAspectRatios: [ASPECT_RATIOS[0], ASPECT_RATIOS[1], ASPECT_RATIOS[2]],
  exportWidth: 1080,
  schema: [
    {
      id: 'photo',
      label: 'Photo',
      type: 'image',
      aspectHint: '4:3',
      // Container is ~38% wide by ~58% tall in this layout.
      initialCropAspectRatio: 38 / 58,
      maxSize: 10 * 1024 * 1024,
    },
    {
      id: 'tag',
      label: 'Tag',
      type: 'text',
      placeholder: 'SESSION / WORKSHOP / PANEL',
      defaultValue: 'SESSION',
      maxLength: 18,
    },
    {
      id: 'headline',
      label: 'Headline',
      type: 'text',
      placeholder: 'Session title',
      defaultValue: 'Build • Learn • Connect',
      maxLength: 60,
    },
    {
      id: 'speaker',
      label: 'Speaker',
      type: 'text',
      placeholder: 'Speaker name',
      defaultValue: '',
      maxLength: 80,
    },
    {
      id: 'time',
      label: 'Time',
      type: 'text',
      placeholder: 'Day 1 • 14:00',
      defaultValue: 'Day 1 • 14:00',
      maxLength: 40,
    },
    {
      id: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'Main Hall',
      defaultValue: 'Main Hall',
      maxLength: 40,
    },
    {
      id: 'showLogo',
      label: 'Show SBR logo',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};

export default SessionPromoTemplate;
