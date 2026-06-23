import { StarsBackground } from "@/components/ui/stars-background";

const headlineClassName =
  "text-5xl font-anton font-black uppercase leading-none tracking-tight text-white sm:text-7xl lg:text-9xl";

export default function LookingBackHeadline() {
  return (
    <div className="relative isolate my-10 inline-block overflow-visible pb-8 text-left">
      <h2 className={headlineClassName}>Looking back at</h2>
      <div
        className="pointer-events-none absolute -inset-[0.08em] z-10 overflow-hidden mix-blend-multiply"
        aria-hidden="true"
      >
        <StarsBackground
          compact
          speed={40}
          particleSize={2}
          starColor="#E46B08"
          bgColor="bg-[radial-gradient(ellipse_at_bottom,#F49B2B_0%,#ff7700_70%,#ff7700_100%)]"
          className="bg-transparent"
        />
      </div>
    </div>
  );
}
