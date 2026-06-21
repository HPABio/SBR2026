import React, { useState } from 'react';
import './lab1-system.css';

/* ── Sidebar icons ── */

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function WidgetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="8.5" y="2" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="2" y="8.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 12V7l3-3 3 3 3-4 3 3v6H2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 5.5v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H8L6.5 3.5H3a1 1 0 0 0-1 1.5V5.5z"
        stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"
      />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 2h5l7 7-5 5L2 7V2z"
        stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"
      />
      <circle cx="5" cy="5" r="1" fill="currentColor" />
    </svg>
  );
}

function BrushIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 13c0-1.1.9-2 2-2s2 .9 2 2a2 2 0 0 1-4 0z"
        stroke="currentColor" strokeWidth="1.3"
      />
      <path
        d="M5 11L11 5l2.5 2.5L7.5 13.5"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Sidebar nav data ── */

type NavItem = {
  id: string;
  Icon: () => React.ReactElement;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'timeline', Icon: ListIcon,   label: 'Timeline' },
  { id: 'widgets',  Icon: WidgetIcon, label: 'Widgets'  },
  { id: 'charts',   Icon: ChartIcon,  label: 'Charts'   },
  { id: 'files',    Icon: FolderIcon, label: 'Files'    },
  { id: 'tags',     Icon: TagIcon,    label: 'Tags'     },
  { id: 'design',   Icon: BrushIcon,  label: 'Design'   },
];

/* ── Timeline data ── */

type TimelineGroup = {
  label: string;
  accent?: boolean;
  items: string[];
};

const TIMELINE_GROUPS: TimelineGroup[] = [
  {
    label: 'Today',
    accent: true,
    items: [
      'Asked for a high-protein meal plan',
      'Worked on the b402 dashboard UX',
      'Brainstormed side projects',
    ],
  },
  {
    label: 'Yesterday',
    items: [
      'Researched ETF investing strategies',
      'Drafted a polite client email',
      'Asked about improving sleep quality',
      'Generated tagline ideas for a landing page',
    ],
  },
  {
    label: 'Feb 8, 2026',
    items: [
      'Explained a TypeScript generic error',
      'Helped rewrite a LinkedIn profile summary',
      'Reviewed PR for auth middleware',
    ],
  },
];

/* ── Component ── */

type Tab = 'day' | 'week' | 'month';

interface Lab1TimelineProps {
  activeNav?: string;
  onNavChange?: (id: string) => void;
}

export function Lab1Timeline({ activeNav: initialNav = 'timeline', onNavChange }: Lab1TimelineProps) {
  const [activeNav, setActiveNav] = useState(initialNav);
  const [activeTab, setActiveTab] = useState<Tab>('day');

  function handleNav(id: string) {
    setActiveNav(id);
    onNavChange?.(id);
  }

  return (
    <div
      className="lab1-card"
      style={{ width: 560, height: 420, display: 'flex', overflow: 'hidden', borderRadius: 20 }}
    >
      {/* ── Left sidebar ── */}
      <div
        style={{
          width: 52,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 14,
          paddingBottom: 14,
          gap: 4,
          /* Subtle separator — darker panel */
          borderRight: '1px solid rgb(255 255 255 / 0.055)',
          background:
            'linear-gradient(180deg, rgb(255 255 255 / 0.025), rgb(255 255 255 / 0.005)), rgb(12 12 12 / 0.50)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Groove on the right edge */}
        <div style={{
          position: 'absolute', right: -1, top: 0, bottom: 0, width: 1,
          background: 'rgb(0 0 0 / 0.45)',
        }} />

        {NAV_ITEMS.map(({ id, Icon, label }) => (
          <button
            key={id}
            className={`lab1-nav-icon${activeNav === id ? ' lab1-nav-active' : ''}`}
            onClick={() => handleNav(id)}
            title={label}
            aria-label={label}
            aria-pressed={activeNav === id}
          >
            <Icon />
          </button>
        ))}
      </div>

      {/* ── Main panel ── */}
      <div className="lab1-card-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 18px 12px',
          flexShrink: 0,
        }}>
          <span style={{
            fontSize: 15,
            fontWeight: 600,
            color: 'white',
            letterSpacing: '-0.025em',
          }}>
            Timeline
          </span>

          <div className="lab1-tab-group">
            {(['day', 'week', 'month'] as Tab[]).map(t => (
              <button
                key={t}
                className={`lab1-tab${activeTab === t ? ' lab1-tab-active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="lab1-divider" />

        {/* Scrollable timeline content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '14px 18px 14px',
            /* Custom thin scrollbar */
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgb(255 255 255 / 0.10) transparent',
          }}
        >
          {TIMELINE_GROUPS.map((group, gIdx) => (
            <div
              key={group.label}
              style={{ marginBottom: gIdx < TIMELINE_GROUPS.length - 1 ? 22 : 0 }}
            >
              {/* Date header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 9,
                marginBottom: 8,
              }}>
                <div
                  className={`lab1-timeline-dot${group.accent ? ' lab1-dot-accent' : ''}`}
                  style={{ marginTop: 3 }}
                />
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: group.accent ? 'white' : 'rgb(255 255 255 / 0.50)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.4,
                }}>
                  {group.label}
                </span>
              </div>

              {/* Items */}
              <div style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {group.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 9,
                      cursor: 'default',
                    }}
                  >
                    {/* Small bullet dot */}
                    <div style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: 'rgb(255 255 255 / 0.20)',
                      flexShrink: 0,
                      marginTop: 5,
                    }} />
                    <span style={{
                      fontSize: 12.5,
                      color: 'rgb(255 255 255 / 0.52)',
                      lineHeight: 1.5,
                      fontWeight: 400,
                      letterSpacing: '-0.005em',
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ── Scene demo ── */

export default function Lab1TimelineScene() {
  return (
    <div className="lab1-scene" style={{ minHeight: '100vh' }}>
      <Lab1Timeline />
    </div>
  );
}
