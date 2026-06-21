import type { ReactNode } from 'react';
import BorderGlow from '@/components/BorderGlow';
import { Lab1AppearanceModal } from '@/components/ui/lab1-appearance-modal';
import { Lab1ActionMenu } from '@/components/ui/lab1-action-menu';
import { Lab1ContextMenu } from '@/components/ui/lab1-context-menu';
import { Lab1Timeline } from '@/components/ui/lab1-timeline';
import { Lab1Clock } from '@/components/ui/lab1-clock';
import '@/components/ui/lab1-system.css';

function CompareLabel({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'rgb(255 255 255 / 0.38)',
        marginBottom: 4,
      }}>
        {subtitle}
      </div>
      <div style={{
        fontSize: 15,
        fontWeight: 600,
        color: 'white',
        letterSpacing: '-0.02em',
      }}>
        {title}
      </div>
    </div>
  );
}

function CompareCell({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: 0,
    }}>
      {children}
    </div>
  );
}

export default function UICompareShowcase() {
  return (
    <div className="lab1-scene" style={{
      minHeight: 'auto',
      padding: '48px 24px 64px',
      alignItems: 'stretch',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 1280,
        margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{
            fontSize: 28,
            fontWeight: 700,
            color: 'white',
            letterSpacing: '-0.03em',
            margin: '0 0 8px',
          }}>
            UI Style Comparison
          </h2>
          <p style={{
            fontSize: 14,
            color: 'rgb(255 255 255 / 0.42)',
            margin: 0,
            maxWidth: 560,
            marginInline: 'auto',
            lineHeight: 1.6,
          }}>
            BorderGlow (mesh gradient + cursor-reactive glow) vs Lab01 components
            (glass, bevel borders, shadow ladders, film grain).
          </p>
        </div>

        {/* BorderGlow — full width hero row */}
        <div style={{ marginBottom: 48 }}>
          <CompareLabel title="BorderGlow" subtitle="Mesh gradient border" />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BorderGlow
              className="w-full max-w-[560px] min-h-[320px]"
              borderRadius={28}
            >
              <div style={{
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                minHeight: 320,
                justifyContent: 'center',
              }}>
                <span style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '-0.025em',
                }}>
                  Hover the edges
                </span>
                <p style={{
                  fontSize: 14,
                  color: 'rgb(255 255 255 / 0.55)',
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: 380,
                }}>
                  Conic-gradient mesh border follows the cursor. Animated sweep on load.
                  Soft-light fill near edges. Plus-lighter outer glow stack.
                </p>
              </div>
            </BorderGlow>
          </div>
        </div>

        {/* Lab01 grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 40,
          alignItems: 'start',
        }}>
          <CompareCell>
            <CompareLabel title="Appearance Modal" subtitle="Lab01 · #008" />
            <Lab1AppearanceModal />
          </CompareCell>

          <CompareCell>
            <CompareLabel title="Action Menu" subtitle="Lab01 · #010" />
            <Lab1ActionMenu />
          </CompareCell>

          <CompareCell>
            <CompareLabel title="Context Menu" subtitle="Lab01 · #004" />
            <Lab1ContextMenu />
          </CompareCell>

          <CompareCell>
            <CompareLabel title="Timeline" subtitle="Lab01 · #003" />
            <Lab1Timeline />
          </CompareCell>

          <CompareCell>
            <CompareLabel title="Clock" subtitle="Lab01 · #012" />
            <Lab1Clock />
          </CompareCell>
        </div>
      </div>
    </div>
  );
}
