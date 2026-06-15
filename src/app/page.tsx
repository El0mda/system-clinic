"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Features } from "@/components/sections/features";
import { LiveDemo } from "@/components/sections/live-demo";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { CTAFinal } from "@/components/sections/cta-final";

const ScrollProgressBar = dynamic(() =>
  import("@/components/effects/scroll-progress").then((m) => ({ default: m.ScrollProgressBar }))
);
const BackToTop = dynamic(() =>
  import("@/components/effects/back-to-top").then((m) => ({ default: m.BackToTop }))
);
const PageLoader = dynamic(() =>
  import("@/components/effects/page-loader").then((m) => ({ default: m.PageLoader }))
);
const SectionParallaxBg = dynamic(() =>
  import("@/components/effects/section-parallax-bg").then((m) => ({ default: m.SectionParallaxBg }))
);

export default function Home() {
  return (
    <>
      <PageLoader />
      <ScrollProgressBar />
      <SectionParallaxBg />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <LiveDemo />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <CTAFinal />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
