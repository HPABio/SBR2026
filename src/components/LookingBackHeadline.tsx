import { StarsBackground } from "@/components/ui/stars-background";

export default function LookingBackHeadline() {
  return (
    <div className="relative isolate my-10 flex w-full flex-col items-center justify-center bg-black">
      <h2 className="relative w-fit text-5xl font-anton font-black uppercase leading-none tracking-tight text-white sm:text-7xl lg:text-9xl">
        <span className="relative inline-block px-5 py-3 sm:px-7 sm:py-4 w-full">
            <span className="">Looking back at

            <StarsBackground
              speed={30}
              particleSize={8}
              starColor="orange"
              bgColor="bg-[radial-gradient(ellipse_at_bottom,#F49B2B_0%,#ff7700_70%,#ff7700_100%)]"
              className="absolute inset-0 mx-auto w-full mix-blend-multiply"
            />
            </span>
        </span>
      </h2>
    </div>
  );
}
