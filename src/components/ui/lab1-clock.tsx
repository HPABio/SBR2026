import React, { useState, useEffect } from 'react';
import './lab1-system.css';

/* ── Clock face SVG ── */

interface ClockFaceProps {
  hours: number;    /* 1–12 */
  minutes: number;  /* 0–59 */
  seconds: number;  /* 0–59 */
}

function ClockFace({ hours, minutes, seconds }: ClockFaceProps) {
  const cx = 74;
  const cy = 74;
  const r  = 72;

  /* Angle helpers: 0° = 12 o'clock, clockwise */
  const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);

  const hourAngle   = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  const handEnd = (angle: number, length: number) => ({
    x: cx + length * Math.cos(toRad(angle)),
    y: cy + length * Math.sin(toRad(angle)),
  });

  const hourEnd   = handEnd(hourAngle, 40);
  const minuteEnd = handEnd(minuteAngle, 55);
  const secondEnd = handEnd(secondAngle, 60);

  /* Generate tick marks */
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const angle  = i * 6;
    const rad    = toRad(angle);
    const isHour = i % 5 === 0;
    const inner  = r - (isHour ? 12 : 7);
    const outer  = r - 3;
    return {
      x1: cx + inner * Math.cos(rad),
      y1: cy + inner * Math.sin(rad),
      x2: cx + outer * Math.cos(rad),
      y2: cy + outer * Math.sin(rad),
      isHour,
    };
  });

  return (
    <svg
      width={r * 2 + 4}
      height={r * 2 + 4}
      viewBox={`0 0 ${r * 2 + 4} ${r * 2 + 4}`}
      fill="none"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* Tick marks */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1 + 2} y1={t.y1 + 2}
          x2={t.x2 + 2} y2={t.y2 + 2}
          stroke={t.isHour ? 'rgb(255 255 255 / 0.30)' : 'rgb(255 255 255 / 0.10)'}
          strokeWidth={t.isHour ? 1.4 : 0.8}
          strokeLinecap="round"
        />
      ))}

      {/* Second hand — thin, warm red */}
      <line
        x1={cx + 2} y1={cy + 2}
        x2={secondEnd.x + 2} y2={secondEnd.y + 2}
        stroke="#c49b40"
        strokeWidth={0.8}
        strokeLinecap="round"
        opacity={0.65}
      />

      {/* Minute hand */}
      <line
        x1={cx + 2} y1={cy + 2}
        x2={minuteEnd.x + 2} y2={minuteEnd.y + 2}
        stroke="rgb(255 255 255 / 0.72)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      {/* Hour hand — thicker, slightly shorter */}
      <line
        x1={cx + 2} y1={cy + 2}
        x2={hourEnd.x + 2} y2={hourEnd.y + 2}
        stroke="white"
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      {/* Center cap */}
      <circle cx={cx + 2} cy={cy + 2} r={3.5} fill="white" opacity={0.85} />
      <circle cx={cx + 2} cy={cy + 2} r={1.8} fill="#c49b40" />
    </svg>
  );
}

/* ── Number display ── */

function Digit({ value }: { value: number }) {
  return (
    <div className="lab1-digit">
      {String(value).padStart(2, '0')}
    </div>
  );
}

/* ── Component ── */

interface Lab1ClockProps {
  /** Controlled time (Date). If omitted, the clock shows live time. */
  value?: Date;
  onChange?: (date: Date) => void;
}

export function Lab1Clock({ value, onChange }: Lab1ClockProps) {
  const [now, setNow] = useState<Date>(value ?? new Date());

  /* Live tick when uncontrolled */
  useEffect(() => {
    if (value) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [value]);

  /* Sync when controlled prop changes */
  useEffect(() => {
    if (value) setNow(value);
  }, [value]);

  const h24    = now.getHours();
  const mins   = now.getMinutes();
  const secs   = now.getSeconds();
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12    = h24 % 12 === 0 ? 12 : h24 % 12;

  /* Nudge hour / minute for demo mode */
  function nudge(field: 'hour' | 'minute', delta: number) {
    const next = new Date(now);
    if (field === 'hour')   next.setHours(next.getHours() + delta);
    if (field === 'minute') next.setMinutes(next.getMinutes() + delta);
    setNow(next);
    onChange?.(next);
  }

  function togglePeriod() {
    const next = new Date(now);
    next.setHours((h24 + 12) % 24);
    setNow(next);
    onChange?.(next);
  }

  return (
    <div className="lab1-card" style={{ width: 280, padding: '24px 22px 20px' }}>
      <div className="lab1-card-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>

        {/* AM / PM toggle */}
        <div className="lab1-period-group">
          <button
            className={`lab1-period-btn ${period === 'AM' ? 'lab1-period-active' : 'lab1-period-inactive'}`}
            onClick={() => period === 'PM' && togglePeriod()}
            aria-pressed={period === 'AM'}
          >
            AM
          </button>
          <button
            className={`lab1-period-btn ${period === 'PM' ? 'lab1-period-active' : 'lab1-period-inactive'}`}
            onClick={() => period === 'AM' && togglePeriod()}
            aria-pressed={period === 'PM'}
          >
            PM
          </button>
        </div>

        {/* HH : MM digit display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Hour — click to nudge */}
          <div
            style={{ cursor: 'ns-resize' }}
            onWheel={e => nudge('hour', e.deltaY < 0 ? 1 : -1)}
            title="Scroll or click to change hour"
            onClick={() => nudge('hour', 1)}
          >
            <Digit value={h12} />
          </div>

          {/* Colon separator */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            paddingBottom: 2,
          }}>
            {[0, 1].map(i => (
              <div key={i} style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'rgb(255 255 255 / 0.30)',
                boxShadow: '0 0 4px rgb(255 255 255 / 0.15)',
              }} />
            ))}
          </div>

          {/* Minute */}
          <div
            style={{ cursor: 'ns-resize' }}
            onWheel={e => nudge('minute', e.deltaY < 0 ? 1 : -1)}
            title="Scroll or click to change minute"
            onClick={() => nudge('minute', 1)}
          >
            <Digit value={mins} />
          </div>
        </div>

        {/* Analog clock face */}
        <div className="lab1-clock-face">
          <ClockFace hours={h12} minutes={mins} seconds={secs} />
        </div>

        {/* Footer label */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 2,
        }}>
          <div>
            <div style={{
              fontSize: 11,
              fontWeight: 500,
              color: 'rgb(255 255 255 / 0.55)',
              letterSpacing: '0.02em',
              lineHeight: 1.6,
            }}>
              UI Experiment #12
            </div>
            <div style={{
              fontSize: 10,
              color: 'rgb(255 255 255 / 0.28)',
              fontFamily: "'SF Mono', 'Geist Mono', monospace",
              letterSpacing: '0.04em',
            }}>
              {period} · {String(h12).padStart(2, '0')}:{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </div>
          </div>

          {/* Color swatches */}
          <div style={{ display: 'flex', gap: 4 }}>
            {['#1a1a1a', '#c49b40', '#f75151'].map(c => (
              <div key={c} style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: c,
                boxShadow: `0 0 0 1px rgb(255 255 255 / 0.10), 0 2px 4px rgb(0 0 0 / 0.40)`,
              }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Scene demo ── */

export default function Lab1ClockScene() {
  return (
    <div className="lab1-scene" style={{ minHeight: '100vh', flexDirection: 'column', gap: 16 }}>
      <Lab1Clock />
      <p style={{
        fontSize: 11,
        color: 'rgb(255 255 255 / 0.22)',
        fontFamily: "'SF Mono', monospace",
        letterSpacing: '0.04em',
        margin: 0,
      }}>
        Scroll over digits or click to advance · Live clock
      </p>
    </div>
  );
}
