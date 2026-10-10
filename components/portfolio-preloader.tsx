"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { subscribeToLotusLoading } from "./lotus-loading";
import styles from "./portfolio-preloader.module.css";

const MINIMUM_DISPLAY_MS = 2000;
const EXIT_DURATION_MS = 520;

export function PortfolioPreloader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(pathname === "/");
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(false);
      return;
    }

    setVisible(true);
    setLeaving(false);
    setProgress(0);

    const startedAt = Date.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumDisplay = reducedMotion ? 150 : MINIMUM_DISPLAY_MS;
    const exitDuration = reducedMotion ? 80 : EXIT_DURATION_MS;
    const progressRampDuration = Math.max(1, minimumDisplay - exitDuration);
    let complete = false;
    let loadedProgress = 0;
    let exitTimer = 0;
    let progressTimer = 0;

    const unsubscribe = subscribeToLotusLoading((state) => {
      loadedProgress = state.progress;
      if (state.complete && !complete) {
        complete = true;
      }
    });

    progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const timeProgress = Math.min(96, (elapsed / progressRampDuration) * 96);
      setProgress(Math.min(loadedProgress, timeProgress));

      if (complete && elapsed >= progressRampDuration) {
        window.clearInterval(progressTimer);
        setProgress(100);
        setLeaving(true);
        exitTimer = window.setTimeout(() => setVisible(false), exitDuration);
      }
    }, 50);

    return () => {
      unsubscribe();
      window.clearTimeout(exitTimer);
      window.clearInterval(progressTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  const formattedProgress = progress.toFixed(2);

  return (
    <div
      className={`${styles.preloader} ${leaving ? styles.leaving : ""}`}
      role="status"
      aria-label={`Loading portfolio, ${formattedProgress}%`}
      aria-live="polite"
    >
      <div className={styles.loaderContent}>
        <Image className={styles.brand} src="/MBicon.svg" alt="" width={100} height={100} priority unoptimized />
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-label="Loading portfolio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <p className={styles.percentage}>{formattedProgress}%</p>
      </div>
    </div>
  );
}
