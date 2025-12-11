import { Marquee } from "@/components/ui/marquee";
// TODO: @aliimam/logos has ES module compatibility issues - replace with alternative or SVGs
// import {
//   ClaudeAI,
//   Cursor,
//   Gemini,
//   Github,
//   Google,
//   Grok,
//   OpenAI,
//   Replicate,
// } from "@aliimam/logos";

export default function Logos03() {
  return (
    <div className="py-20 flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-10 px-20 text-muted-foreground text-center text-sm font-medium">
        Trusted by the world's most creative companies.
      </h1>
      <div className="mx-auto flex h-full w-full max-w-3xl items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-size:100%_100%] [mask-repeat:no-repeat] px-6">
        <div>
          <Marquee className="[--gap:80px]">
            {/* Placeholder - replace with actual logo SVGs or images */}
            <span className="text-muted-foreground">OpenAI</span>
            <span className="text-muted-foreground">Claude</span>
            <span className="text-muted-foreground">Replicate</span>
            <span className="text-muted-foreground">Cursor</span>
            <span className="text-muted-foreground">Gemini</span>
            <span className="text-muted-foreground">Github</span>
            <span className="text-muted-foreground">Grok</span>
            <span className="text-muted-foreground">Google</span>
          </Marquee>
        </div>
      </div>
    </div>
  );
}
