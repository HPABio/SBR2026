import React, { useState, useRef, useEffect } from 'react';
import './lab1-system.css';

/* ── Icons ── */

function CommentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1.5C4.24 1.5 2 3.52 2 6c0 1.43.68 2.70 1.75 3.55L3.2 12l2.46-1.23C6.07 10.91 6.53 11 7 11c2.76 0 5-2.02 5-4.5S9.76 1.5 7 1.5z"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function AskAIIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1.5l1.1 3.1L11.5 6l-3.4 1.4L7 10.5 5.9 7.4 2.5 6l3.4-1.4L7 1.5z"
        stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"
      />
      <circle cx="11.5" cy="11" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="3" cy="11.5" r="0.7" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 3.5h10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path
        d="M5.5 3.5V2.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1M6 6v4M8 6v4"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
      />
      <rect x="3" y="3.5" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function DuplicateIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="4" width="7.5" height="8.5" rx="1.4" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M5 3.2V2.5A1.4 1.4 0 0 1 6.4 1.1h5.1A1.4 1.4 0 0 1 12.9 2.5v5.1A1.4 1.4 0 0 1 11.5 9H10.5"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
      />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M5.9 8.1A2.9 2.9 0 0 0 10 4.05L8.8 2.85a2.9 2.9 0 0 0-4.1 4.1l.8.8"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
      />
      <path
        d="M8.1 5.9A2.9 2.9 0 0 0 4 9.95l1.2 1.2a2.9 2.9 0 0 0 4.1-4.1l-.8-.8"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Data ── */

type MenuItem = {
  id: string;
  label: string;
  kbd: string;
  Icon: () => React.ReactElement;
  destructive?: boolean;
  dividerBefore?: boolean;
};

const MENU_ITEMS: MenuItem[] = [
  { id: 'comment',   label: 'Comment',           kbd: '⌘⇧M', Icon: CommentIcon   },
  { id: 'ask-ai',    label: 'Ask AI',             kbd: '⌘J',  Icon: AskAIIcon     },
  { id: 'delete',    label: 'Delete',             kbd: 'Del', Icon: DeleteIcon, destructive: true },
  { id: 'duplicate', label: 'Duplicate',          kbd: '⌘D',  Icon: DuplicateIcon },
  { id: 'copy-link', label: 'Copy link to block', kbd: '⌥⇧L', Icon: LinkIcon, dividerBefore: true },
];

/* ── Component ── */

interface Lab1ActionMenuProps {
  onSelect?: (id: string) => void;
  onClose?: () => void;
}

export function Lab1ActionMenu({ onSelect, onClose: _onClose }: Lab1ActionMenuProps) {
  const [search, setSearch] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = search.trim()
    ? MENU_ITEMS.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase())
      )
    : MENU_ITEMS;

  return (
    <div className="lab1-card" style={{ width: 320 }}>
      <div className="lab1-card-inner" style={{ padding: '10px 10px 8px' }}>

        {/* ── Search ── */}
        <input
          ref={inputRef}
          className="lab1-search"
          type="text"
          placeholder="Search actions…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 6 }}
        />

        {/* ── Items ── */}
        <div>
          {filtered.map((item, idx) => {
            const showDivider = item.dividerBefore && !search.trim() && idx > 0;
            const isHovered = hovered === item.id;
            return (
              <React.Fragment key={item.id}>
                {showDivider && (
                  <div className="lab1-divider" style={{ margin: '5px 0' }} />
                )}
                <div
                  className={`lab1-menu-item${item.destructive ? ' lab1-destructive' : ''}`}
                  style={{
                    background: isHovered
                      ? item.destructive
                        ? 'rgb(247 81 81 / 0.10)'
                        : 'rgb(255 255 255 / 0.06)'
                      : 'transparent',
                  }}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onSelect?.(item.id)}
                  role="menuitem"
                >
                  {/* 3D icon */}
                  <div
                    className="lab1-icon-wrap"
                    style={{ color: item.destructive ? '#f75151' : 'rgb(255 255 255 / 0.55)' }}
                  >
                    <item.Icon />
                  </div>

                  <span style={{ flex: 1 }}>{item.label}</span>

                  <span className="lab1-kbd">{item.kbd}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div className="lab1-divider" style={{ margin: '7px 0 5px' }} />
        <div style={{
          fontSize: 11,
          color: 'rgb(255 255 255 / 0.22)',
          padding: '0 8px 3px',
          fontFamily: "'SF Mono', 'Geist Mono', monospace",
          letterSpacing: '0.005em',
        }}>
          Last edited by Seb today at 12:25 PM
        </div>

      </div>
    </div>
  );
}

/* ── Scene demo ── */

export default function Lab1ActionMenuScene() {
  return (
    <div className="lab1-scene" style={{ minHeight: '100vh' }}>
      <Lab1ActionMenu />
    </div>
  );
}
