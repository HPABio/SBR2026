import LiquidChrome from '@/components/LiquidChrome';

export function LiquidChromeCircle() {
  return (
    <div className="size-64 sm:size-80 md:size-96 rounded-full overflow-hidden mx-auto">
      <div className="relative w-full h-full">
        <LiquidChrome
          baseColor={[1, 118 / 255, 26 / 255]}
          speed={0.15}
          amplitude={0.4}
          frequencyX={1.5}
          frequencyY={3.5}
          interactive={false}
        />
      </div>
    </div>
  );
}
