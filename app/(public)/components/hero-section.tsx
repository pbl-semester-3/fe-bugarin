import { ArrowRight } from "lucide-react";
import { HERO } from "@/lib/landing-content";
import { HeroBackground } from "./hero-background";

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-svh overflow-hidden bg-landing-ink"
    >
      <HeroBackground images={HERO.images} />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-[1320px] 2xl:max-w-[1380px] items-center px-5 pt-32 pb-20 sm:pb-24 lg:px-9 lg:pt-36 lg:pb-28">
        <div className="max-w-[720px]">
          <p className="text-[11px] font-bold tracking-[0.22em] text-landing-orange uppercase">
            {HERO.eyebrow}
          </p>
          <h1 className="mt-4 text-[42px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[64px]">
            <span className="block">{HERO.titleLead}</span>
            <span className="block text-landing-orange">
              {HERO.titleHighlight}
            </span>
            <span className="block">{HERO.titleTail}</span>
            <span className="block">{HERO.titleTailLast}</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-base leading-relaxed text-white/80 sm:text-lg">
            {HERO.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={HERO.ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-landing-orange px-6 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(244,107,60,0.28)] transition-transform hover:-translate-y-0.5"
            >
              {HERO.ctaLabel}
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
