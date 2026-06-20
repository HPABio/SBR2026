import BorderGlow from '@/components/ui/border-glow';
import SwapCardMockup from '@/assets/SwapCard/SwapCardMockUp2_noBG.png';
import SwapCardLogo from '@/assets/SwapCard/swapcard_LogoWhite.png';

export function SwapCardGlowSection() {
  return (
    <section className="relative w-full px-6 sm:px-12 2xl:mt-16 max-w-6xl mx-auto">
      <BorderGlow
        edgeSensitivity={29}
        glowColor="30 90 55"
        backgroundColor="#191717"
        borderRadius={28}
        glowRadius={79}
        glowIntensity={0.7}
        coneSpread={21}
        animated
        colors={['#F49B2B', '#35CB85', '#38bdf8']}
        className="w-full"
      >
        <div className="p-6 sm:p-10 lg:p-12">
          <div className="w-full flex justify-center">
            <div className="mx-auto flex flex-col items-start justify-center">
              <h3 className="text-sm text-center text-muted-foreground font-quicksand font-medium leading-tight uppercase w-full">
                check out our Event Platform
              </h3>
              <img
                src={SwapCardLogo.src}
                alt="SwapCard Logo"
                className="w-[60vw] max-w-md object-cover -mt-[20px] sm:-mt-[40px] mx-auto"
              />
            </div>
          </div>

          <div className="max-w-5xl mx-auto flex items-center justify-center gap-6 sm:gap-10 lg:gap-x-20 mt-4">
            <div className="max-w-44 sm:max-w-100 w-full shrink-0">
              <img src={SwapCardMockup.src} alt="SwapCard Mockup" className="w-full object-cover" />
            </div>
            <div className="gap-y-2 flex flex-col w-[70%]">
              <div className="border-t-4 border-[#35CB85] w-10 sm:w-18 rounded-full my-2" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-anton font-black uppercase leading-tight">
                Connect with attendees <br className="hidden sm:block" />
                and speakers
              </h2>
              <p className="hidden lg:block lg:w-[60%] text-[0.7rem] md:text-[0.8rem] text-muted-foreground font-quicksand font-light leading-tight mb-4">
                Favorite sessions, book on site meetings, <br />
                research attendees and speakers, and more <br />
                — all in one place.
              </p>
              <a
                href="https://app.swapcard.com/event/synbioreactor-summit-sbr2026"
                className="w-full flex justify-start"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-flex items-center justify-center rounded-md mt-4 px-4 py-2 bg-[#35CB85] text-black font-anton font-bold text-base sm:text-xl lg:text-3xl uppercase tracking-tight hover:brightness-110 transition-all">
                  Look Around
                </span>
              </a>
            </div>
          </div>
        </div>
      </BorderGlow>
    </section>
  );
}
