import { Linkedin, Twitter, Instagram, Youtube, Figma, Github } from "lucide-react";

export default function OtherSponsors() {
  return (
    <section className="py-20 flex min-h-screen flex-col items-center justify-center rounded-xl border-b border-white/10">
      <div className="space-y-6">
        <div className="relative z-10 space-y-3 text-left flex flex-col items-center justify-center">
          <h2 className="w-fit text-3xl font-anton font-medium md:text-6xl lg:text-7xl tracking-tight uppercase ">Join our <br/>
          <span className="text-8xl text-primary">sponsors</span>
          <p className="font-quicksand text-muted-foreground max-w-3xl font-light text-sm md:text-md text-left tracking-widest">
            and help us make the summit a success.
          </p>
          </h2>
        </div>
        <div className="mx-auto max-w-4xl [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)]">
          <div className="bg-background gap-x-6 grid md:grid-cols-2 dark:bg-muted/50 rounded-xl border px-6 pb-10 pt-3 shadow-xl">
            <Integration
              icon={<Twitter className="size-6" />}
              name="X"
              links="https://x.com/aliimam_in"
              description="Follow me for design insights, tech updates, and creative content."
            />
            <Integration
              icon={<Linkedin className="size-6" />}
              name="LinkedIn"
              links="https://www.linkedin.com/in/aliimam-in/"
              description="Connect with me professionally and explore my career journey."
            />
            <Integration
              icon={<Instagram className="size-6" />}
              name="Instagram"
              links="https://www.instagram.com/aliimam.in/"
              description="Visual stories, behind-the-scenes, and creative inspiration."
            />
            <Integration
              icon={<Github className="size-6" />}
              name="Github"
              links="https://github.com/aliimam-in"
              description="Explore my open-source projects and code repositories."
            />
            <Integration
              icon={<Youtube className="size-6" />}
              name="Youtube"
              links="https://www.youtube.com/@aliimam_in"
              description="Watch tutorials, design processes, and creative content."
            />
            <Integration
              icon={<Figma className="size-6" />}
              name="Figma"
              links="https://www.figma.com/@aliimam_in"
              description="Check out my design files, UI kits, and design resources."
            /> 
          </div>
        </div> 
          <p className="text-muted-foreground max-w-lg mx-auto text-center font-light text-sm md:text-md">
            For partnerships, collaborations, sponsorships, commissions, events,
            you can reach out to me at{" "}
            <a className="hover:underline text-primary font-semibold" href="mailto:sbr@ga-sb.de">sbr@ga-sb.de</a>
          </p> 
      </div>
    </section>
  );
}

const Integration = ({
  icon,
  name,
  links,
  description,
}: {
  icon: React.ReactNode;
  name: string;
  links: string;
  description: string;
}) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={links}
      className="grid hover:bg-secondary hover:rounded-xl grid-cols-[auto_1fr_auto] items-center rounded-b-none gap-3 border-b border-dashed p-3 last:border-b-0"
    >
      <div className="bg-muted border-foreground/5 flex size-12 items-center justify-center rounded-lg border">
        {icon}
      </div>
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium">{name}</h3>
        <p className="text-muted-foreground line-clamp-1 text-sm">
          {description}
        </p>
      </div>
    </a>
  );
};