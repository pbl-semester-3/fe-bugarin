import {
  ClipboardList,
  LineChart,
  UserRoundCheck,
  UserRoundPlus,
  UtensilsCrossed,
} from "lucide-react";
import { STEPS, type LandingIconKey } from "@/lib/landing-content";
import { SectionHeading } from "./section-heading";

const STEP_ICONS: Record<LandingIconKey, typeof ClipboardList> = {
  target: ClipboardList,
  heart: UserRoundCheck,
  chart: LineChart,
  profile: ClipboardList,
  trainer: UserRoundPlus,
  meal: UtensilsCrossed,
  evaluate: LineChart,
};

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1320px] 2xl:max-w-[1380px] px-5 lg:px-9">
        <SectionHeading
          eyebrow="LANGKAH AWAL"
          title="Cara Kerja Bugarin"
          description={"Empat langkah sederhana untuk memulai perjalanan yang lebih terarah bersama personal\u00A0trainer."}
          align="center"
          className="max-w-3xl"
        />

        <div className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-10 right-[12%] left-[12%] hidden h-px bg-landing-line lg:block" />
          {STEPS.map((step, index) => {
            const Icon = STEP_ICONS[step.icon];
            return (
              <article
                key={step.title}
                className="relative rounded-[28px] border border-landing-line bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-landing-orange text-white">
                    <Icon className="size-5" />
                  </span>
                  <span className="flex size-8 items-center justify-center rounded-full bg-landing-cream text-xs font-extrabold text-landing-orange">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold text-landing-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-landing-muted">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
