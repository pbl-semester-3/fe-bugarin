"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { APP_SCREENS } from "@/lib/landing-content";
import { PhoneFrame } from "./phone-frame";
import { SectionHeading } from "./section-heading";
import { cn } from "cn";

export function AppPreview() {
  const [active, setActive] = useState(0);
  const total = APP_SCREENS.length;
  const current = APP_SCREENS[active];
  const previous = APP_SCREENS[(active - 1 + total) % total];
  const next = APP_SCREENS[(active + 1) % total];

  function go(direction: -1 | 1) {
    setActive((index) => (index + direction + total) % total);
  }

  return (
    <section
      id="prototype"
      className="scroll-mt-24 overflow-hidden bg-landing-bg py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1320px] 2xl:max-w-[1380px] px-5 lg:px-9">
        <SectionHeading
          eyebrow="SEKILAS APLIKASI"
          title={
            <>
              Intip <span className="text-landing-orange">aplikasinya.</span>
            </>
          }
          description="Gambaran singkat bagaimana Bugarin membantu Anda menjalani program, berkomunikasi dengan PT, dan melihat progres."
          align="center"
        />

        <div
          className="relative mt-12"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") go(-1);
            if (event.key === "ArrowRight") go(1);
          }}
          aria-label="Carousel tampilan aplikasi Bugarin"
        >
          <div className="relative mx-auto flex h-[560px] max-w-[720px] items-start justify-center sm:h-[590px]">
            <div className="absolute top-16 left-0 hidden w-[190px] -rotate-6 opacity-60 blur-[1px] lg:block">
              <PhoneFrame label={previous.label} imageSrc={previous.imageSrc} />
            </div>
            <div className="absolute top-16 right-0 hidden w-[190px] rotate-6 opacity-60 blur-[1px] lg:block">
              <PhoneFrame label={next.label} imageSrc={next.imageSrc} />
            </div>
            <div className="relative z-10 w-[230px] sm:w-[250px]">
              <PhoneFrame
                label={current.label}
                imageSrc={current.imageSrc}
              />
            </div>
          </div>

          <button
            type="button"
            aria-label="Tampilan sebelumnya"
            onClick={() => go(-1)}
            className="absolute top-1/2 left-0 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-landing-line bg-white text-landing-ink shadow-sm transition-colors hover:border-landing-orange hover:text-landing-orange sm:left-4"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Tampilan berikutnya"
            onClick={() => go(1)}
            className="absolute top-1/2 right-0 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-landing-line bg-white text-landing-ink shadow-sm transition-colors hover:border-landing-orange hover:text-landing-orange sm:right-4"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {APP_SCREENS.map((screen, index) => (
            <button
              key={screen.key}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={index === active}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                index === active
                  ? "border-landing-orange bg-landing-orange text-white"
                  : "border-landing-line bg-white text-landing-muted hover:border-landing-orange/50 hover:text-landing-orange"
              )}
            >
              {screen.tab}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
