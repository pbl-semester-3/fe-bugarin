"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { LANDING_NAV } from "@/lib/landing-content";
import { cn } from "cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-white/10 bg-landing-footer/95 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1320px] 2xl:max-w-[1380px] items-center justify-between px-5 lg:px-9">
        <a href="#beranda" className="flex items-center gap-2.5">
          <Image
            src="/bugarin-logo.png"
            alt="Logo Bugarin"
            width={514}
            height={486}
            priority
            className="h-10 w-auto"
          />
          <span className="text-xl font-extrabold tracking-tight text-white">
            Bugarin
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {LANDING_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/75 transition-colors hover:text-landing-orange"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-white/10 bg-landing-footer/95 backdrop-blur transition-all lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-0"
        )}
      >
        <div className="min-h-0">
          <nav className="mx-auto flex max-w-[1320px] 2xl:max-w-[1380px] flex-col gap-1 px-5 py-4">
            {LANDING_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
