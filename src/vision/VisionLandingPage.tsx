"use client";

import { Nav } from "@/vision/components/sections/Nav";
import { Hero } from "@/vision/components/sections/Hero";
import { TrustStrip } from "@/vision/components/sections/TrustStrip";
import { Promise } from "@/vision/components/sections/Promise";
import { Destinations } from "@/vision/components/sections/Destinations";
import { WhyPremium } from "@/vision/components/sections/WhyPremium";
import { Process } from "@/vision/components/sections/Process";
import { Benefits } from "@/vision/components/sections/Benefits";
import { Profiles } from "@/vision/components/sections/Profiles";
import { Testimonials } from "@/vision/components/sections/Testimonials";
import { Objections } from "@/vision/components/sections/Objections";
import { FAQ } from "@/vision/components/sections/FAQ";
import { Journal } from "@/vision/components/sections/Journal";
import { CTAForm } from "@/vision/components/sections/CTAForm";
import { Footer } from "@/vision/components/sections/Footer";

const Index = () => {
  return (
    <main className="vp-vision min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <TrustStrip />
      <Promise />
      <Destinations />
      <WhyPremium />
      <Process />
      <Benefits />
      <Profiles />
      <Testimonials />
      <Objections />
      <FAQ />
      <Journal />
      <CTAForm />
      <Footer />
    </main>
  );
};

export default Index;
