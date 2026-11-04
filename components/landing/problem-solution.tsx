import Image from "next/image";
import { Check, X } from "lucide-react";
import { PROBLEMS } from "@/lib/landing-content";
import { SectionHeading } from "./section-heading";

export function ProblemSolution() {
  return (
    <section
      id="masalah-solusi"
      className="scroll-mt-24 bg-landing-cream py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1320px] 2xl:max-w-[1380px] px-5 lg:px-9">
        <SectionHeading
          title="Kenapa banyak orang berhenti di tengah jalan?"
          description="Bukan karena kurang niat. Sering kali karena tidak ada arah, pendamping, dan cara mengukur progres yang jelas."
          align="center"
          className="max-w-[1100px]"
        />

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[28px] border border-landing-line bg-white">
            <div className="relative aspect-[4/3]">
              <Image
                src="/landing/ilustrasi-masalah.webp"
                alt="Latihan tanpa arah dan pendampingan"
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-[11px] font-bold tracking-[0.18em] text-landing-muted uppercase">
                Masalah umum
              </p>
              <div className="mt-4 space-y-3">
                {PROBLEMS.map((item) => (
                  <div
                    key={item.problem}
                    className="flex items-start gap-3 rounded-2xl bg-landing-bg p-3"
                  >
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f3ded7] text-landing-orange">
                      <X className="size-3.5" />
                    </span>
                    <p className="text-sm leading-relaxed text-landing-muted">
                      {item.problem}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-landing-green/30 bg-white">
            <div className="relative aspect-[4/3]">
              <Image
                src="/landing/ilustrasi-solusi.webp"
                alt="Latihan terarah bersama personal trainer"
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-[11px] font-bold tracking-[0.18em] text-landing-green uppercase">
                Solusi Bugarin
              </p>
              <div className="mt-4 space-y-3">
                {PROBLEMS.map((item) => (
                  <div
                    key={item.solution}
                    className="flex items-start gap-3 rounded-2xl bg-landing-green-soft p-3"
                  >
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-landing-green text-white">
                      <Check className="size-3.5" />
                    </span>
                    <p className="text-sm leading-relaxed text-landing-ink">
                      {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
