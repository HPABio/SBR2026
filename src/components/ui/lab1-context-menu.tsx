import React, { useState } from 'react';
import './lab1-system.css';

/* ── Icons ── */

function RotateIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M11.5 4A5 5 0 1 0 12.5 7"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"
      />
      <path
        d="M9 4h2.5V1.5"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function BringToFrontIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="3.5" width="8" height="8" rx="1.4" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.45" />
      <rect x="4.5" y="1.5" width="8" height="8" rx="1.4" fill="rgb(0 0 0 / 0.55)" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function ReplaceLayerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M1.5 5.5C1.5 4.5 2.5 1.5 7 1.5"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
      />
      <path d="M5 3l2-1.5L5 0" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12.5 8.5C12.5 9.5 11.5 12.5 7 12.5"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
      />
      <path d="M9 11l-2 1.5L9 14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PrototypeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="1.5" width="8.5" height="11" rx="1.4" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M10 5.5h1.2a1.3 1.3 0 0 1 1.3 1.3v.4a1.3 1.3 0 0 1-1.3 1.3H10"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
      />
      <path d="M4.5 5h4M4.5 7.5h4M4.5 10h2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function HotkeysIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="3.5" width="12" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <rect x="2.5" y="5" width="2" height="2" rx="0.6" fill="currentColor" opacity="0.55" />
      <rect x="6" y="5" width="2" height="2" rx="0.6" fill="currentColor" opacity="0.55" />
      <rect x="9.5" y="5" width="2" height="2" rx="0.6" fill="currentColor" opacity="0.55" />
      <rect x="4" y="8.5" width="6" height="1.2" rx="0.6" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

/* ── Data ── */

type ContextItem = {
  id: string;
  label: string;
  kbd: string;
  Icon: () => React.ReactElement;
};

const CONTEXT_ITEMS: ContextItem[] = [
  { id: 'rotate',    label: 'Rotate Layer',   kbd: 'R',  Icon: RotateIcon       },
  { id: 'front',     label: 'Bring to Front', kbd: ']',  Icon: BringToFrontIcon },
  { id: 'replace',   label: 'Replace Layer',  kbd: '⇧R', Icon: ReplaceLayerIcon },
  { id: 'prototype', label: 'Open Prototype', kbd: '⇧P', Icon: PrototypeIcon    },
  { id: 'hotkeys',   label: 'View Hotkeys',   kbd: '⇧H', Icon: HotkeysIcon      },
];

/* ── Component ── */

interface Lab1ContextMenuProps {
  onSelect?: (id: string) => void;
}

export function Lab1ContextMenu({ onSelect }: Lab1ContextMenuProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    /*
      The context menu uses a smaller border-radius (16px) and tighter
      padding to feel like a native OS context menu rather than a modal.
    */
    <div
      className="lab1-card"
      style={{ borderRadius: 16 }}
    >
      <div className="lab1-card-inner" style={{ padding: '5px' }}>
        {CONTEXT_ITEMS.map(item => (
          <div
            key={item.id}
            className="lab1-menu-item"
            style={{
              padding: '7px 10px',
              gap: 10,
              background: hovered === item.id ? 'rgb(255 255 255 / 0.07)' : 'transparent',
            }}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect?.(item.id)}
            role="menuitem"
          >
            {/* Icon — no 3D wrapper on context menu; simpler, flatter */}
            <span style={{ color: 'rgb(255 255 255 / 0.50)', width: 16, display: 'flex', flexShrink: 0 }}>
              <item.Icon />
            </span>

            <span style={{ flex: 1, fontSize: 13, color: 'rgb(255 255 255 / 0.82)' }}>
              {item.label}
            </span>

            {/* Shortcut rendered in grey monospace */}
            <span className="lab1-kbd" style={{ fontSize: 12 }}>
              {item.kbd}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Scene demo ── */

export default function Lab1ContextMenuScene() {
  const [last, setLast] = useState<string | null>(null);

  return (
    <div className="lab1-scene" style={{ minHeight: '100vh', flexDirection: 'column', gap: 16 }}>
      <Lab1ContextMenu onSelect={id => setLast(id)} />
      {last && (
        <div style={{
          fontSize: 11,
          color: 'rgb(255 255 255 / 0.30)',
          fontFamily: "'SF Mono', monospace",
          letterSpacing: '0.04em',
        }}>
          Selected: {last}
        </div>
      )}
    </div>
  );
}
