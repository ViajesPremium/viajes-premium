import "@/vision/vision.css";
import VisionLandingPage from "@/vision/VisionLandingPage";
import styles from "./page.module.css";
import Hero from "@/home/hero";

export default function Home() {
  // return <VisionLandingPage />;
  return (
    <div className={styles.page}>
      <Hero />
    </div>
  );
}
