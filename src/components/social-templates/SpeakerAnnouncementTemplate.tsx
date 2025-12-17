import type { SocialTemplate, TemplateComponentProps, ImageFieldData } from './types';
import { ASPECT_RATIOS } from './types';

// Import assets - Vite will handle the paths
import sbrLogoSrc from '@/assets/SBR2026-Favicon-lg.png';

// Get the src property from Astro's image imports
const SBR_LOGO = typeof sbrLogoSrc === 'object' && 'src' in sbrLogoSrc 
  ? sbrLogoSrc.src 
  : sbrLogoSrc;

/**
 * Speaker Announcement template component
 * A cleaner design for announcing speakers with larger photo prominence
 */
function SpeakerAnnouncementComponent({ data, stageWidth }: TemplateComponentProps) {
  const name = (data.name as string) || '';
  const title = (data.title as string) || '';
  const organization = (data.organization as string) || '';
  const talkTitle = (data.talkTitle as string) || '';
  const date = (data.date as string) || 'June 11-12, 2026';
  const photo = data.photo as ImageFieldData | undefined;

  const baseFontSize = stageWidth / 100;

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
        fontFamily: "'Anton', 'Quicksand', sans-serif",
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: '4%',
          background: 'linear-gradient(90deg, #e11d48 0%, #f97316 50%, #facc15 100%)',
        }}
      />

      {/* "SPEAKER" badge */}
      <div
        className="absolute z-20"
        style={{
          top: '8%',
          left: '5%',
        }}
      >
        <span
          style={{
            fontSize: `${baseFontSize * 3}px`,
            fontFamily: "'Anton', sans-serif",
            fontWeight: 700,
            color: '#facc15',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          SPEAKER
        </span>
      </div>

      {/* Large circular photo */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{
          top: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '45%',
          paddingBottom: '45%', // Makes it square
          borderRadius: '50%',
          border: '4px solid rgba(250, 204, 21, 0.3)',
          backgroundColor: 'rgba(255,255,255,0.05)',
        }}
      >
        {photo?.src && (
          <img
            src={photo.src}
            alt="Speaker"
            crossOrigin="anonymous"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
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

      {/* Name */}
      <div
        className="absolute z-10 text-center"
        style={{
          top: '66%',
          left: '5%',
          right: '5%',
        }}
      >
        <h1
          style={{
            fontSize: `${baseFontSize * 6}px`,
            fontFamily: "'Anton', sans-serif",
            fontWeight: 700,
            background: 'linear-gradient(90deg, #ffffff 0%, #e0e0e0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.02em',
            lineHeight: 1.1,
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          {name || 'SPEAKER NAME'}
        </h1>
      </div>

      {/* Title & Organization */}
      <div
        className="absolute z-10 text-center"
        style={{
          top: '76%',
          left: '5%',
          right: '5%',
        }}
      >
        <p
          style={{
            fontSize: `${baseFontSize * 2.5}px`,
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 500,
            color: '#d1d5db',
            letterSpacing: '0.02em',
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {title && organization ? `${title} • ${organization}` : title || organization || 'Title • Organization'}
        </p>
      </div>

      {/* Talk title */}
      {talkTitle && (
        <div
          className="absolute z-10 text-center"
          style={{
            top: '82%',
            left: '8%',
            right: '8%',
          }}
        >
          <p
            style={{
              fontSize: `${baseFontSize * 2}px`,
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 400,
              color: '#9ca3af',
              fontStyle: 'italic',
              letterSpacing: '0.01em',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            "{talkTitle}"
          </p>
        </div>
      )}

      {/* Bottom bar with logo and date */}
      <div
        className="absolute z-10 flex items-center justify-between"
        style={{
          bottom: '4%',
          left: '5%',
          right: '5%',
        }}
      >
        {/* SBR Logo */}
        <div
          style={{
            width: '12%',
            height: 'auto',
          }}
        >
          <img
            src={SBR_LOGO}
            alt="SBR2026"
            className="w-full h-auto object-contain"
            crossOrigin="anonymous"
          />
        </div>

        {/* Date */}
        <div>
          <p
            style={{
              fontSize: `${baseFontSize * 2.2}px`,
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 600,
              color: '#facc15',
              letterSpacing: '0.05em',
              margin: 0,
            }}
          >
            {date}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Template definition
 */
export const SpeakerAnnouncementTemplate: SocialTemplate = {
  id: 'speaker-announcement',
  name: 'Speaker Announcement',
  description: 'Announce a speaker with prominent photo and details',
  Component: SpeakerAnnouncementComponent,
  defaultAspectRatio: ASPECT_RATIOS[0], // 1:1 square
  supportedAspectRatios: [ASPECT_RATIOS[0], ASPECT_RATIOS[1]], // 1:1 and 4:5
  exportWidth: 1080,
  schema: [
    {
      id: 'photo',
      label: 'Speaker Photo',
      type: 'image',
      aspectHint: '1:1',
      initialCropAspectRatio: 1,
      defaultCropShape: 'circle',
      maxSize: 10 * 1024 * 1024,
    },
    {
      id: 'name',
      label: 'Speaker Name',
      type: 'text',
      placeholder: 'Full name',
      defaultValue: '',
      maxLength: 60,
    },
    {
      id: 'title',
      label: 'Title / Role',
      type: 'text',
      placeholder: 'CEO, Professor, etc.',
      defaultValue: '',
      maxLength: 80,
    },
    {
      id: 'organization',
      label: 'Organization',
      type: 'text',
      placeholder: 'Company or institution',
      defaultValue: '',
      maxLength: 80,
    },
    {
      id: 'talkTitle',
      label: 'Talk Title (optional)',
      type: 'text',
      placeholder: 'Topic of the presentation',
      defaultValue: '',
      maxLength: 120,
    },
    {
      id: 'date',
      label: 'Event Date',
      type: 'text',
      placeholder: 'June 11-12, 2026',
      defaultValue: 'June 11-12, 2026',
      maxLength: 50,
    },
  ],
};

export default SpeakerAnnouncementTemplate;
