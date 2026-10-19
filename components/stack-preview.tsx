import { Press_Start_2P } from "next/font/google";

import { LotusModel } from "./lotus-model";
import { VizagClock } from "./vizag-clock";
import styles from "./stack-preview.module.css";

const retropix = Press_Start_2P({ subsets: ["latin"], weight: "400", display: "swap" });

export function StackPreview() {
  return (
    <main className={styles.hero} id="about">
      <h1 className="sr-only">Meghana BSS — UI/UX Designer and Frontend Developer</h1>

      <p className={`${styles.pixelHeading} ${retropix.className}`} aria-hidden="true">
        <span className={styles.headingPrefix}>UI UX</span>{" "}
        <span className={styles.headingDesigner}>DESIGNER</span>
      </p>

      <div className={styles.heroIntro}>
        <h2>
          <span>I notice the details, use AI to explore</span>
          <span>possibilities faster, and bring the best</span>
          <span>ideas to life through thoughtful design and code.</span>
        </h2>
        <p>
          I&apos;m <a className={styles.nameHighlight} href="/about">BSS Meghana</a>, a UI/UX designer and frontend developer. I turn complex workflows into clear, responsive experiences. I use AI to explore ideas and iterate faster, then bring care and judgment to the design and details that make a product useful. To connect, <a className={styles.contactLink} href="#contact">let&apos;s talk</a>. I&apos;d love to hear what you&apos;re working on.
        </p>
        <a className={styles.projectsScroll} href="#work">
          <span>Scroll to explore</span>
          <span className={styles.projectsScrollArrow} aria-hidden="true">↓</span>
        </a>
      </div>

      <section className={styles.objectStage} aria-label="Lotus flower">
        <span className={styles.lotusDotField} aria-hidden="true" />
        <div className={styles.lotus}>
          <LotusModel />
        </div>
      </section>

      <div className={styles.bottomDetails}>
        <div className={styles.statusGroup}>
          <p className={styles.time}><VizagClock /> GMT +5:30</p>
          <p className={styles.country}>INDIA</p>
          <p className={styles.availability}>
            <span className={styles.availabilityDot} aria-hidden="true" />
            AVAILABLE FOR WORK
          </p>
        </div>
      </div>
    </main>
  );
}
