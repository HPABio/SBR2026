'use client';
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Users, TrendingUp, Award, Microscope, Rocket, MapPin, Calendar } from "lucide-react"
import video from "@/assets/pitching_session/PitchingVideo_Example_SBR2026.mp4"
import SBROrangeWaveBG from "@/assets/ExportWP/bgImages/SBR_OrangeWave_BG.png";
import { LaurelWreath } from '@/components/ui/laurel-wreath';

export function HeroSection() {
  return (
    <section className="pt-44 pb-20 px-4 lg:px-8 relative">
      {/* Absolute inset image for background */}
      {/* 
        We use a wrapper div with animation classes to fade the video in and out.
        This approach uses Tailwind CSS (or your CSS-in-JS approach) for fading,
        or, if Tailwind is not available, you should implement your own fading CSS animation.
      */}
      <div className="fade-video-wrapper absolute w-full h-full -z-10">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover no-repeat scale-[1.75] fade-in"
          aria-hidden="true"
          draggable="false"
        />
      </div>
      {/* 
        CSS (add in your global CSS for fade effect):

        .fade-in {
          opacity: 0;
          animation: fadeInVideo 2s ease-in forwards;
        }
        @keyframes fadeInVideo {
          to { opacity: 1; }
        }
        // For fade out, apply a class with animation reversing opacity to 0.
      */}
      {/* <img
        src="@/assets/ExportWP/Betonhalle-Welcome-SBR2026-AI-Nano-Banana.jpeg"
        alt=""
        className="absolute w-full h-full object-cover no-repeat -z-10 scale-[1.75]"
        aria-hidden="true"
        draggable="false"
      /> */}
      {/* Gradient overlay from bottom (background) to top (transparent) */}
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background pointer-events-none" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-0">
          <div className="">
            <LaurelWreath color="#F49B2B" classes="w-14"/> 
          </div>
          <div className="-mt-2">
            <span className="text-xs text-muted-foreground font-quicksand font-light uppercase tracking-widest">StartUp x Investor Summit</span>
          </div>
          <h1 className="font-bold  uppercase text-balance leading-none mt-2">
            <span className="font-background text-8xl md:text-9xl text-foregroundinline-block tracking-widest">
              SYNBIO
            </span>
          </h1>
          <h1 className="text-[2.5rem] md:text-7xl font-bold  uppercase text-balance leading-none -mt-2 md:-mt-4">
              STARTUP {''}
            <span className="font-background font-black  text-primary">
              PITCHES</span>
          </h1>
          <p className="text-[0.7rem] md:text-sm font-quicksand font-medium text-muted-foreground max-w-2xl md:max-w-3xl mx-auto text-balance leading-4 md:leading-4.5 tracking-wide">
            Present your groundbreaking synthetic biology innovation to leading investors and industry experts at
            Berlin's premier biotech summit
          </p>
          <div className="flex flex-row items-center justify-center gap-4 pt-4 mt-6">
            <Button
              size="lg"
              onClick={() => window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSf3tJKhQo14tXnFDYWuHBFJ8qulqv55lQZBlpq7G1ZvB4ukLg/viewform?pli=1"}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8"
            >
              Apply Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-border hover:bg-card font-semibold text-lg px-8 bg-transparent"
            >
              Contact Us
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Silent Green, Berlin, Germany</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Jan 19th-20th, 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function StatsSection() {
  return (
    <section className="py-16 px-4 lg:px-8 bg-background">
      <div className="container mx-auto max-w-2xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center relative">
            <div className="hidden md:block absolute h-[40%] top-1/2 right-0 -translate-y-1/2
            rounded-full bg-primary border-r  border-muted-foreground"/>
            <div className="text-[10rem] font-anton font-bold text-primary">2</div>
            <div className="text-xl -mt-10 font-quicksand  text-foreground font-light">sessions</div>
            <div className="text-[0.7rem] font-quicksand uppercase font-mono text-muted-foreground -mt-1">back2back pitches</div>
          </div>

          <div className="text-center relative">
            <div className="md:hidden block absolute w-[50px] h-0 top-0 bg-red-400/10 left-1/2 -translate-x-1/2
            rounded-full  border-t border-muted-foreground"/>
            <div className="text-[10rem] font-anton font-bold text-primary"> 5</div>
            <div className="text-xl -mt-10 font-quicksand  text-foreground font-light">minute pitches</div>
            <div className="text-[0.7rem] font-quicksand uppercase font-mono text-muted-foreground -mt-1">Followed by Q&A</div>
            <div className="md:hidden block absolute w-[50px] h-0 -bottom-10 bg-red-400/10 left-1/2 -translate-x-1/2
            rounded-full  border-b border-muted-foreground"/>
          </div>

          <div className="text-center relative">
            <div className="hidden md:block absolute h-[40%] top-1/2 -translate-y-1/2
            rounded-full  border-r border-muted-foreground"/>
            <div className="text-[10rem] font-anton font-bold text-primary">7</div>
            <div className="text-xl -mt-10 font-quicksand  text-foreground font-light">expert judges</div>
            <div className="text-[0.7rem] font-quicksand uppercase font-mono text-muted-foreground -mt-1">from VC & Industry</div>
          </div>
        </div>
      </div>
      <div className="md:text-center space-y-1 mb-16 mt-10">
          <h2 className="text-7xl md:text-6xl lg:text-[5rem] font-bold font-anton uppercase text-balance">
            Pitch at<br className="md:hidden"/> <span className="text-primary">SynBio</span>{" "}Reactor!
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl md:max-w-4xl mx-auto text-balance">
            Join the fast-growing synthetic biology startup ecosystem 
            
          <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196 260" className="w-6 h-6 mx-2 inline-block stroke-[13px] stroke-muted-foreground">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M186.695,112.9l-3.258-34.73l-11.126-8.64l4.586-16.532l-4.682-20.129l-14.746-5.623l-12.212-10.475l-7.434-0.603 l-20.249,19.525l-10.981-1.762l3.113-7.506L89.119,14.237l-2.003-8.302L62.786,2l2.679,29.059l6.65,5.93l-11.96-0.041l-1.424,8.061 l0.796,3.306l-11.898-7.168l-14.553,1.279l-4.417,7.072l2.486,16.436l-4.344,24.304l-14.047,13.129l-9.509,0.145l5.02,14.409 l-6.203,20.056l7.651,15.905l-5.068,3.379l3.041,23.363l10.064,11.174l11.778,2.003l19.96,5.985l-10.957,12.936l-7.723,31.52 l18.825,3.669l12.623-2.076l15.953,2.582L94.065,258l5.02-7.603l16.774,4.199l8.182-6.468l25.921-3.186l-0.845-15.253l21.287-14.312 l1.834-8.327l-23.218-18.005L134.374,160.3l10.173,0.075l35.777-24.884l9.22,1.762l4.393-14.553L186.695,112.9z"></path> </g></svg>
          
          at the heart of Europe
          </p>
      </div>
    </section>
  )
}

export function BenefitsSection() {
  return (
    <section className="relative py-20 px-4 lg:px-8 bg-background z-0 overflow-hidden 2xl:-mt-32">
      <img src={`${SBROrangeWaveBG.src}`} alt="Orange Wave Background" className="absolute top-0 left-0 w-full h-full object-cover object-top" />
      <div className="container mx-auto max-w-6xl relative z-10 mt-32 ">
        <div className="hidden 2xl:block relative w-full h-[1vw]"/>
        {/* <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold font-anton uppercase text-balance">
            Pitch at <span className="text-primary">SynBio Reactor</span>{" "}!
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl md:max-w-4xl mx-auto text-balance">
            Join the fast-growing synthetic biology startup ecosystem 
            
          <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196 260" className="w-6 h-6 mx-2 inline-block stroke-[13px] stroke-muted-foreground">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M186.695,112.9l-3.258-34.73l-11.126-8.64l4.586-16.532l-4.682-20.129l-14.746-5.623l-12.212-10.475l-7.434-0.603 l-20.249,19.525l-10.981-1.762l3.113-7.506L89.119,14.237l-2.003-8.302L62.786,2l2.679,29.059l6.65,5.93l-11.96-0.041l-1.424,8.061 l0.796,3.306l-11.898-7.168l-14.553,1.279l-4.417,7.072l2.486,16.436l-4.344,24.304l-14.047,13.129l-9.509,0.145l5.02,14.409 l-6.203,20.056l7.651,15.905l-5.068,3.379l3.041,23.363l10.064,11.174l11.778,2.003l19.96,5.985l-10.957,12.936l-7.723,31.52 l18.825,3.669l12.623-2.076l15.953,2.582L94.065,258l5.02-7.603l16.774,4.199l8.182-6.468l25.921-3.186l-0.845-15.253l21.287-14.312 l1.834-8.327l-23.218-18.005L134.374,160.3l10.173,0.075l35.777-24.884l9.22,1.762l4.393-14.553L186.695,112.9z"></path> </g></svg>
          
          at the heart of Europe
          </p>
        </div> */}



        

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-44 sm:mt-44">
          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Direct Investor Access</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with top-tier VCs actively investing in synthetic biology and biotech startups
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Prize & Recognition</h3>
              <p className="text-muted-foreground leading-relaxed">
                Win cash prizes, mentorship packages, and media coverage for your startup
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Microscope className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Expert Feedback</h3>
              <p className="text-muted-foreground leading-relaxed">
                Receive actionable insights from industry veterans and successful biotech founders
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Media Exposure</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get featured in leading biotech publications and industry newsletters
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Partnership Opportunities</h3>
              <p className="text-muted-foreground leading-relaxed">
                Network with potential co-founders, advisors, and strategic partners
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Community Access</h3>
              <p className="text-muted-foreground leading-relaxed">
                Join GASB network and connect with Europe's synthetic biology community
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export function JudgesSection() {
  const judges = [
    {
      name: "Dr. Sarah Chen",
      role: "Partner, BioVentures Capital",
      expertise: "Synthetic Biology Investments",
    },
    {
      name: "Prof. Michael Weber",
      role: "Director, Max Planck Institute",
      expertise: "Metabolic Engineering",
    },
    { name: "Anna Kowalski", role: "CEO, GeneTech Solutions", expertise: "Biotech Scale-up" },
    {
      name: "Dr. James Morrison",
      role: "Managing Director, DeepTech Fund",
      expertise: "Early-stage Biotech",
    },
    { name: "Lisa Andersson", role: "Founder, BioCircular", expertise: "Green Chemistry" },
    { name: "Dr. Raj Patel", role: "VP Innovation, Novozymes", expertise: "Industrial Biotechnology" },
  ]

  return (
    <section className="py-20 px-4 lg:px-8 bg-card/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Meet the <span className="text-primary">Expert Judges</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Your pitch will be evaluated by leading investors and industry pioneers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 z-10">
          {judges.map((judge, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="pt-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto" />
                <div className="text-center space-y-1">
                  <h3 className="font-bold text-lg">{judge.name}</h3>
                  <p className="text-sm text-muted-foreground">{judge.role}</p>
                  <p className="text-xs text-primary font-medium">{judge.expertise}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTASection() {
  return (
    <section className="py-20 px-4 lg:px-8 bg-primary/10">
      <div className="container mx-auto max-w-4xl text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-balance">Questions About the Pitching Contest?</h2>
        <p className="text-lg text-muted-foreground text-balance">
          Contact our team for more information about the application process, judging criteria, and event details.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold bg-transparent"
          >
            Contact Us
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-border hover:bg-card font-semibold bg-transparent"
          >
            View FAQ
          </Button>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="py-12 px-4 lg:px-8 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary" />
            </div>
            <span className="font-bold">SynBio Reactor Summit 2026</span>
          </div>
          <div className="text-sm text-muted-foreground">© 2026 GASB - German Association for Synthetic Biology</div>
        </div>
      </div>
    </footer>
  )
}

