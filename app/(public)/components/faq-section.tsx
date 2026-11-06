"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQS } from "@/lib/landing-content";
import { cn } from "cn";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1320px] 2xl:max-w-[1380px] gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-9">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-landing-orange uppercase">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-landing-ink sm:text-4xl">
            Ketahui lebih banyak seputar Bugarin.
          </h2>

          <div className="mt-8 divide-y divide-landing-line border-y border-landing-line">
            {FAQS.map((faq, index) => {
              const isOpen = open === index;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-landing-ink sm:text-base">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors",
                        isOpen
                          ? "border-landing-orange bg-landing-orange text-white"
                          : "border-landing-line text-landing-muted"
                      )}
                    >
                      {isOpen ? (
                        <ChevronUp className="size-3.5" />
                      ) : (
                        <ChevronDown className="size-3.5" />
                      )}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-4 pr-10 text-sm leading-relaxed text-landing-muted">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24 overflow-hidden rounded-[32px] border border-landing-line shadow-[0_20px_50px_rgba(31,41,51,0.10)]">
            <div className="relative aspect-[5/6]">
              <Image
                src="/landing/faq.webp"
                alt="Dumbbell dan botol minum di gym Bugarin"
                fill
                sizes="(max-width: 1024px) 0vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
