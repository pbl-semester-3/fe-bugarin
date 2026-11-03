import type { Metadata } from "next";
import { AboutSection } from "@/components/landing/about-section";
import { AppPreview } from "@/components/landing/app-preview";
import { FaqSection } from "@/components/landing/faq-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

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
