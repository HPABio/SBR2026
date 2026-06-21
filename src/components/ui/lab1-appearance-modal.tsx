import React, { useState } from 'react';
import './lab1-system.css';

type Theme = 'dark' | 'light' | 'warm';

/* ── Mini theme previews ── */

function DarkPreview() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0f0f0f', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%',
        background: '#181818', borderRight: '1px solid rgb(255 255 255 / 0.06)',
      }}>
        {[38, 60, 48, 72].map((w, i) => (
          <div key={i} style={{
            margin: i === 0 ? '10px 8px 0' : '6px 8px 0',
            height: 4, borderRadius: 2, background: '#2a2a2a', width: `${w}%`,
          }} />
        ))}
      </div>
      {/* Main content */}
      <div style={{ marginLeft: '30%', padding: '8px 8px 0' }}>
        <div style={{
          height: 10, borderRadius: 4, background: '#1a1a1a',
          marginBottom: 5, display: 'flex', alignItems: 'center', padding: '0 5px', gap: 3,
        }}>
          <div style={{ flex: 1, height: 2, background: '#282828', borderRadius: 1 }} />
          <div style={{ width: 14, height: 2, background: '#2a2a2a', borderRadius: 1 }} />
        </div>
        {[1, 2].map(i => (
          <div key={i} style={{
            height: 13, borderRadius: 3, background: '#161616',
            marginBottom: 4, display: 'flex', gap: 4, padding: 4, alignItems: 'center',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: '#222', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ height: 2, background: '#282828', borderRadius: 1, marginBottom: 3 }} />
              <div style={{ height: 2, width: '55%', background: '#202020', borderRadius: 1 }} />
            </div>
          </div>
        ))}
      </div>
      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: '30%', right: 0, height: 9,
        background: '#111', borderTop: '1px solid rgb(255 255 255 / 0.04)',
        display: 'flex', alignItems: 'center', gap: 4, padding: '0 8px',
      }}>
        {[18, 10, 14].map((w, i) => (
          <div key={i} style={{ width: w, height: 3, borderRadius: 1, background: '#282828' }} />
        ))}
      </div>
    </div>
  );
}

function LightPreview() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#f4f4f4', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%',
        background: '#ebebeb', borderRight: '1px solid #ddd',
      }}>
        {[38, 60, 48, 72].map((w, i) => (
          <div key={i} style={{
            margin: i === 0 ? '10px 8px 0' : '6px 8px 0',
            height: 4, borderRadius: 2, background: '#d0d0d0', width: `${w}%`,
          }} />
        ))}
      </div>
      <div style={{ marginLeft: '30%', padding: '8px 8px 0' }}>
        <div style={{
          height: 10, borderRadius: 4, background: '#e4e4e4',
          marginBottom: 5, display: 'flex', alignItems: 'center', padding: '0 5px', gap: 3,
        }}>
          <div style={{ flex: 1, height: 2, background: '#d0d0d0', borderRadius: 1 }} />
          <div style={{ width: 14, height: 2, background: '#c4c4c4', borderRadius: 1 }} />
        </div>
        {[1, 2].map(i => (
          <div key={i} style={{
            height: 13, borderRadius: 3, background: '#e9e9e9',
            marginBottom: 4, display: 'flex', gap: 4, padding: 4, alignItems: 'center',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: '#ddd', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ height: 2, background: '#ccc', borderRadius: 1, marginBottom: 3 }} />
              <div style={{ height: 2, width: '55%', background: '#d8d8d8', borderRadius: 1 }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{
        position: 'absolute', bottom: 0, left: '30%', right: 0, height: 9,
        background: '#eee', borderTop: '1px solid #ddd',
        display: 'flex', alignItems: 'center', gap: 4, padding: '0 8px',
      }}>
        {[18, 10, 14].map((w, i) => (
          <div key={i} style={{ width: w, height: 3, borderRadius: 1, background: '#ccc' }} />
        ))}
      </div>
    </div>
  );
}

function WarmPreview() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#19120a', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%',
        background: '#221a0f', borderRight: '1px solid rgb(196 155 64 / 0.12)',
      }}>
        {[38, 60, 48, 72].map((w, i) => (
          <div key={i} style={{
            margin: i === 0 ? '10px 8px 0' : '6px 8px 0',
            height: 4, borderRadius: 2, background: '#382c1c', width: `${w}%`,
          }} />
        ))}
      </div>
      <div style={{ marginLeft: '30%', padding: '8px 8px 0' }}>
        <div style={{
          height: 10, borderRadius: 4, background: '#261e12',
          marginBottom: 5, display: 'flex', alignItems: 'center', padding: '0 5px', gap: 3,
        }}>
          <div style={{ flex: 1, height: 2, background: '#382c1c', borderRadius: 1 }} />
          <div style={{ width: 14, height: 3, borderRadius: 1, background: '#c49b40' }} />
        </div>
        {[1, 2].map(i => (
          <div key={i} style={{
            height: 13, borderRadius: 3, background: '#1e1609',
            marginBottom: 4, display: 'flex', gap: 4, padding: 4, alignItems: 'center',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: '#2c2212', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ height: 2, background: '#382c1c', borderRadius: 1, marginBottom: 3 }} />
              <div style={{ height: 2, width: '55%', background: '#c49b40', borderRadius: 1, opacity: 0.6 }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{
        position: 'absolute', bottom: 0, left: '30%', right: 0, height: 9,
        background: '#141008', borderTop: '1px solid rgb(196 155 64 / 0.08)',
        display: 'flex', alignItems: 'center', gap: 4, padding: '0 8px',
      }}>
        {[18, 10, 14].map((w, i) => (
          <div key={i} style={{ width: w, height: 3, borderRadius: 1, background: '#382c1c' }} />
        ))}
      </div>
    </div>
  );
}

/* ── Icons ── */

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1.5 1.5L10.5 10.5M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

/* ── Component ── */

interface Lab1AppearanceModalProps {
  onClose?: () => void;
  onSave?: (theme: Theme, sidebarTransparent: boolean) => void;
}

export function Lab1AppearanceModal({ onClose, onSave }: Lab1AppearanceModalProps) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [sidebarTransparent, setSidebarTransparent] = useState(false);

  const themes: { id: Theme; label: string; Preview: () => React.ReactElement }[] = [
    { id: 'dark',  label: 'Dark',  Preview: DarkPreview  },
    { id: 'light', label: 'Light', Preview: LightPreview },
    { id: 'warm',  label: 'Warm',  Preview: WarmPreview  },
  ];

  return (
    <div className="lab1-card" style={{ width: 444 }}>
      <div className="lab1-card-inner" style={{ padding: '24px' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: 'white', letterSpacing: '-0.025em', lineHeight: 1 }}>
            Appearance
          </span>
          <button
            onClick={onClose}
            className="lab1-icon-wrap"
            style={{
              width: 30, height: 30, border: 'none', cursor: 'pointer',
              color: 'rgb(255 255 255 / 0.44)', flexShrink: 0,
            }}
            aria-label="Close"
          >
            <XIcon />
          </button>
        </div>

        {/* ── Theme picker ── */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: 'white',
              marginBottom: 3, letterSpacing: '-0.01em',
            }}>
              Theme
            </div>
            <div style={{
              fontSize: 12, color: 'rgb(255 255 255 / 0.36)',
              fontFamily: "'SF Mono', 'Geist Mono', monospace", letterSpacing: '0.01em',
            }}>
              Customize UI colors
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {themes.map(({ id, Preview }) => (
              <button
                key={id}
                onClick={() => setTheme(id)}
                className={`lab1-theme-card${theme === id ? ' lab1-theme-selected' : ''}`}
                aria-label={`${id} theme`}
                aria-pressed={theme === id}
              >
                <Preview />
              </button>
            ))}
          </div>
        </div>

        {/* ── Sidebar toggle ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 0 14px',
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 3, letterSpacing: '-0.01em' }}>
              Sidebar
            </div>
            <div style={{
              fontSize: 12, color: 'rgb(255 255 255 / 0.36)',
              fontFamily: "'SF Mono', 'Geist Mono', monospace", letterSpacing: '0.01em',
            }}>
              Make the sidebar transparent
            </div>
          </div>
          <button
            className={`lab1-toggle-track${sidebarTransparent ? ' lab1-toggle-on' : ''}`}
            onClick={() => setSidebarTransparent(v => !v)}
            role="switch"
            aria-checked={sidebarTransparent}
          >
            <div className="lab1-toggle-handle" />
          </button>
        </div>

        {/* ── Divider ── */}
        <div className="lab1-divider" style={{ margin: '2px 0 20px' }} />

        {/* ── Actions ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button className="lab1-btn lab1-btn-default" style={{ padding: '12px 0' }} onClick={onClose}>
            Cancel
          </button>
          <button
            className="lab1-btn lab1-btn-primary"
            style={{ padding: '12px 0' }}
            onClick={() => onSave?.(theme, sidebarTransparent)}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}

/* ── Scene demo ── */

export default function Lab1AppearanceScene() {
  const [open, setOpen] = useState(true);
  return (
    <div className="lab1-scene" style={{ minHeight: '100vh' }}>
      {open ? (
        <Lab1AppearanceModal
          onClose={() => setOpen(false)}
          onSave={() => setOpen(false)}
        />
      ) : (
        <button
          className="lab1-btn lab1-btn-primary"
          style={{ padding: '12px 24px' }}
          onClick={() => setOpen(true)}
        >
          Open Appearance
        </button>
      )}
    </div>
  );
}
