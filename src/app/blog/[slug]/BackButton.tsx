"use client";

import { usePageTransition } from "@/components/page-transition/TransitionProvider";
import { Button } from "@/components/ui/button/button";
import styles from "./page.module.css";

export default function BackButton() {
  const { triggerTransition } = usePageTransition();

  return (
    <Button
      type="button"
      variant="outline"
      className={styles.backButton}
      onClick={() => triggerTransition("/blog")}
    >
      Regresar
    </Button>
  );
}
