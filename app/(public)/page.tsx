import type { Metadata } from "next";
import { AboutSection } from "@/app/(public)/components/about-section";
import { AppPreview } from "@/app/(public)/components/app-preview";
import { FaqSection } from "@/app/(public)/components/faq-section";
import { HeroSection } from "@/app/(public)/components/hero-section";
import { HowItWorks } from "@/app/(public)/components/how-it-works";
import { ProblemSolution } from "@/app/(public)/components/problem-solution";
import { SiteFooter } from "@/app/(public)/components/site-footer";
import { SiteHeader } from "@/app/(public)/components/site-header";

export const metadata: Metadata = {
  title: "Bugarin — Latihan Terarah, Progres Terukur",
  description:
    "Bugarin menghubungkan Anda dengan personal trainer nyata untuk program latihan, nutrisi, dan pendampingan yang lebih terarah.",
};

// Landing page publik. Login PT/Admin tetap diakses manual melalui /login.
export default function LandingPage() {
  return (
    <div className="min-h-screen scroll-smooth bg-landing-bg text-landing-ink">
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <HowItWorks />
        <ProblemSolution />
        <AppPreview />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}
