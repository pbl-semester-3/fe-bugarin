import Image from "next/image";
import {
  ChartNoAxesCombined,
  HeartHandshake,
  Target,
} from "lucide-react";
import { ABOUT, VALUES, type LandingIconKey } from "@/lib/landing-content";

const VALUE_ICONS: Record<LandingIconKey, typeof Target> = {
  target: Target,
  heart: HeartHandshake,
  chart: ChartNoAxesCombined,
  profile: Target,
  trainer: HeartHandshake,
  meal: ChartNoAxesCombined,
  evaluate: ChartNoAxesCombined,
};

export function AboutSection() {
  return (
    <section className="bg-landing-cream py-20 sm:py-24">
      <div className="mx-auto max-w-[1320px] 2xl:max-w-[1380px] px-5 lg:px-9">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-landing-orange uppercase">
              {ABOUT.eyebrow}
            </p>
            <h2 className="mt-3 max-w-[520px] text-3xl font-extrabold leading-tight tracking-tight text-landing-ink sm:text-4xl">
              {ABOUT.titleLead}{" "}
              <span className="text-landing-orange">{ABOUT.titleHighlight}</span>{" "}
              {ABOUT.titleTail}
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-landing-ink sm:text-base">
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[32px]">
              <Image
                src="/landing/tentang-bugarin.webp"
                alt="Personal trainer mendampingi klien berlatih"
                fill
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div
          id="layanan"
          className="mt-16 grid scroll-mt-24 gap-4 md:grid-cols-3"
        >
          {VALUES.map((value) => {
            const Icon = VALUE_ICONS[value.icon];
            return (
              <article
                key={value.title}
                className="rounded-[28px] bg-white p-6 transition-transform hover:-translate-y-1"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-landing-orange-soft text-landing-orange">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-landing-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-landing-ink">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
