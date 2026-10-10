"use client";

import { useEffect, useState } from "react";

import styles from "./portfolio-preloader.module.css";

const SESSION_KEY = "meghana-portfolio-intro-seen";

export function PortfolioPreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) {
        setVisible(false);
        return;
      }
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Keep the intro working when browser storage is unavailable.
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => setVisible(false), reducedMotion ? 150 : 1250);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.preloader} role="status" aria-label="Loading portfolio">
      <span className={styles.name}>MEGHANA BSS</span>
      <div className={styles.center}>
        <span className={styles.mark} aria-hidden="true">m</span>
        <span className={styles.message}>A little care in every detail.</span>
      </div>
      <div className={styles.footer}>
        <span>PORTFOLIO</span>
        <span className={styles.progress} aria-hidden="true"><span /></span>
        <span>LOADING</span>
      </div>
    </div>
  );
}
