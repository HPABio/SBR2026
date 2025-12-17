import type { SocialTemplate, TemplateComponentProps, ImageFieldData } from './types';
import { ASPECT_RATIOS, createDefaultImageData } from './types';

// Import assets - Vite will handle the paths
import templateBgSrc from '@/assets/Other/socialMedia/I_am_attending_SBR2026.png';
import sbrLogoSrc from '@/assets/SBR2026-Favicon-lg.png';

// Get the src property from Astro's image imports
const TEMPLATE_BG = typeof templateBgSrc === 'object' && 'src' in templateBgSrc 
  ? templateBgSrc.src 
  : templateBgSrc;
const SBR_LOGO = typeof sbrLogoSrc === 'object' && 'src' in sbrLogoSrc 
  ? sbrLogoSrc.src 
  : sbrLogoSrc;

/**
 * "I'm Attending SBR2026" template component
 */
function ImAttendingComponent({ data, stageWidth }: TemplateComponentProps) {
  const firstName = (data.firstName as string) || '';
  const lastName = (data.lastName as string) || '';
  const affiliation = (data.affiliation as string) || '';
  const slogan = (data.slogan as string) || "i'm attending";
  const website = (data.website as string) || 'www.synbioreactor.de';
  const quote = (data.quote as string) || '';
  const showLogo = data.showLogo !== false;
  const uppercase = data.uppercase !== false;
  const portrait = data.portrait as ImageFieldData | undefined;

  const displayFirstName = uppercase ? firstName.toUpperCase() : firstName;
  const displayLastName = uppercase ? lastName.toUpperCase() : lastName;
  const displayAffiliation = uppercase ? affiliation.toUpperCase() : affiliation;

  // Calculate responsive font sizes based on container query units (cqw)
  // Since we're in React, we use inline styles with viewport-relative sizing
  // The container has @container, so we use percentage-based sizing
  const baseFontSize = stageWidth / 100;

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ fontFamily: "'Anton', 'Quicksand', sans-serif" }}
    >
      {/* Background template image */}
      <img
        src={TEMPLATE_BG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        crossOrigin="anonymous"
      />

      {/* Slogan Text - top left */}
      <div
        className="absolute z-10"
        style={{
          top: '3.3%',
          left: '3.5%',
          width: '66.667%',
        }}
      >
        <h1
          style={{
            fontSize: `${baseFontSize * 13}px`,
            fontFamily: "'Anton', sans-serif",
            fontWeight: 700,
            color: '#0b0b0b',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {slogan}
        </h1>
      </div>

      {/* Name Tag Block - center-right area */}
      <div
        className="absolute z-10"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(30%, -115%)',
          width: '33.333%',
        }}
      >
        {/* Last Name - gradient text */}
        <h1
          style={{
            fontSize: `${baseFontSize * 5}px`,
            fontFamily: "'Anton', sans-serif",
            fontWeight: 700,
            background: 'linear-gradient(90deg, #e11d48 0%, #facc15 50%, #e11d48 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.05em',
            lineHeight: 1,
            margin: 0,
          }}
        >
          {displayLastName || 'LAST NAME'}
        </h1>
        {/* First Name */}
        <h2
          style={{
            fontSize: `${baseFontSize * 2.85}px`,
            fontFamily: "'Anton', sans-serif",
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '0.02em',
            lineHeight: 1,
            margin: 0,
            marginTop: '-0.5em',
          }}
        >
          {displayFirstName || 'FIRST NAME'}
        </h2>
        {/* Affiliation */}
        <p
          style={{
            fontSize: `${baseFontSize * 2.05}px`,
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 300,
            color: '#ffffff',
            letterSpacing: '0.02em',
            lineHeight: 1.2,
            margin: 0,
            marginTop: '-0.25em',
          }}
        >
          {displayAffiliation || 'AFFILIATION'}
        </p>
      </div>

      {/* Portrait */}
      <div
        className="absolute z-10 overflow-hidden rounded-md"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(127%, -30%)',
          width: '17.5%',
          height: '26.833%',
          backgroundColor: 'rgba(255,255,255,0.05)',
        }}
      >
        {portrait?.src && (
          <img
            src={portrait.src}
            alt="Portrait"
            crossOrigin="anonymous"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: `${50 + portrait.offsetX}% ${50 + portrait.offsetY}%`,
              transform: `scale(${portrait.zoom})`,
              filter: portrait.grayscale ? 'grayscale(100%)' : 'none',
            }}
          />
        )}
      </div>

      {/* SBR Logo Sticker */}
      {showLogo && (
        <div
          className="absolute z-10"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(140%, 80%)',
            width: '11.667%',
            height: '11.667%',
          }}
        >
          <img
            src={SBR_LOGO}
            alt="SBR Logo"
            className="w-full h-full object-contain"
            crossOrigin="anonymous"
          />
        </div>
      )}

      {/* Website */}
      <div
        className="absolute z-10"
        style={{
          bottom: '5.5%',
          left: '4.2%',
        }}
      >
        <p
          style={{
            fontSize: `${baseFontSize * 2.3}px`,
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 300,
            color: '#f8fafc',
            letterSpacing: '0.05em',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {website}
        </p>
      </div>

      {/* Quote */}
      <p
        className="absolute z-10"
        style={{
          bottom: '9.5%',
          left: '22%',
          width: '43.333%',
          fontSize: `${baseFontSize * 2.05}px`,
          fontFamily: 'monospace',
          fontWeight: 600,
          color: '#6b7280',
          letterSpacing: '0.05em',
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        {quote ||
          '"I\'m attending the SBR2026 to learn more about the latest trends in the industry and to network with other professionals."'}
      </p>
    </div>
  );
}

/**
 * Template definition
 */
export const ImAttendingTemplate: SocialTemplate = {
  id: 'im-attending-sbr2026',
  name: "I'm Attending SBR2026",
  description: 'Classic announcement post for SBR2026 attendees',
  Component: ImAttendingComponent,
  defaultAspectRatio: ASPECT_RATIOS[0], // 1:1 square
  supportedAspectRatios: [ASPECT_RATIOS[0], ASPECT_RATIOS[1]], // 1:1 and 4:5
  exportWidth: 1080,
  schema: [
    {
      id: 'portrait',
      label: 'Your Photo',
      type: 'image',
      aspectHint: '3:4',
      maxSize: 10 * 1024 * 1024, // 10MB
    },
    {
      id: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'First name',
      defaultValue: '',
      maxLength: 50,
    },
    {
      id: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Last name',
      defaultValue: '',
      maxLength: 50,
    },
    {
      id: 'affiliation',
      label: 'Affiliation',
      type: 'text',
      placeholder: 'Company / University / Team',
      defaultValue: '',
      maxLength: 100,
    },
    {
      id: 'slogan',
      label: 'Headline',
      type: 'text',
      placeholder: "i'm attending",
      defaultValue: "i'm attending",
      maxLength: 30,
    },
    {
      id: 'website',
      label: 'Website',
      type: 'link',
      placeholder: 'www.synbioreactor.de',
      defaultValue: 'www.synbioreactor.de',
      maxLength: 100,
    },
    {
      id: 'quote',
      label: 'Quote / Message',
      type: 'textarea',
      placeholder: 'Your personal message...',
      defaultValue:
        '"I\'m attending the SBR2026 to learn more about the latest trends in the industry and to network with other professionals."',
      maxLength: 300,
    },
    {
      id: 'showLogo',
      label: 'Show SBR logo sticker',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      id: 'uppercase',
      label: 'Uppercase name & affiliation',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};

export default ImAttendingTemplate;
