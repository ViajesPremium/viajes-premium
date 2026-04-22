import styles from "./japon-premium.module.css";
import Hero from "@/layout/hero/hero";
import Snapshot from "@/layout/snapshot/snapshot";
import FirstForm from "@/layout/first-form/first-form";
import Highlights from "@/layout/highlights/highlights";
import Itineraries from "@/layout/itineraries/itineraries";
import Includes from "@/layout/includes/includes";
import Testimonials from "@/layout/testimonials/testimonials";
import Interlude from "@/layout/interlude/interlude";
import Faqs from "@/layout/faqs/faqs";
import CTAForm from "@/layout/form/ctaForm";
import MarqueeSection from "@/layout/marquee/marquee-section";
import Footer from "@/layout/footer/footer";

export default function JaponPremium() {
  return (
    <main className={styles.main}>
      <Hero />
      <Snapshot />
      <FirstForm />
      <section id="highlights" className={styles.highlightsLayer}>
        <Highlights />
      </section>
      <section id="itinerarios" className={styles.itinerariesLayer}>
        <Itineraries />
      </section>
      <section id="includes" className={styles.includesLayer}>
        <Includes />
      </section>
      <section id="testimonials" className={styles.testimonialsLayer}>
        <Testimonials />
      </section>
      <section id="interlude">
        <Interlude />
      </section>
      <section id="faqs">
        <Faqs />
      </section>
      <section id="form">
        <CTAForm />
      </section>
      <section id="marquee">
        <MarqueeSection />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </main>
  );
}
