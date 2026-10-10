import Image from "next/image";

import { LotusModel } from "./lotus-model";
import { VizagClock } from "./vizag-clock";
import styles from "./stack-preview.module.css";

export function StackPreview() {
  return (
    <main className={styles.hero} id="about">
      <h1 className="sr-only">Meghana BSS — UI/UX Designer and Frontend Developer</h1>

      <div className={styles.chromeHeading} aria-hidden="true">
        <Image
          className={styles.headingDesigner}
          src="/uiux-chrome-ai.png"
          alt=""
          width={2172}
          height={724}
          unoptimized
          priority
        />
        <div className={styles.headingSecondLine}>
          <Image
            className={styles.headingIcon}
            src="/chrome-asterisk.png"
            alt=""
            width={1322}
            height={1190}
            sizes="(max-width: 800px) 17vw, 9vw"
            quality={100}
            priority
          />
          <Image
            className={styles.headingDeveloper}
            src="/developer-chrome-ai.png"
            alt=""
            width={2170}
            height={725}
            unoptimized
            priority
          />
        </div>
      </div>

      <div className={styles.heroNarrative}>
        <div className={styles.introCopy}>
          <p>Hey, I&apos;m Meghana.</p>
          <p>I&apos;m a UI/UX designer and frontend developer who turns complex ideas into clear, welcoming digital experiences. I bring structure to tricky problems, sweat the small interactions, and carry ideas from the first sketch through to the final build.</p>
          <a className={styles.copyLink} href="/about">More about me <span aria-hidden="true">↗</span></a>
        </div>
        <div className={styles.designCopy}>
          <p>Design meets development.</p>
          <p>Good interfaces make complicated things feel simple. I pair thoughtful visual design with accessible, responsive code to turn early sketches into polished, interactive experiences.</p>
          <a className={styles.copyLink} href="#work">Explore selected work <span aria-hidden="true">↓</span></a>
        </div>
      </div>

      <section className={styles.objectStage} aria-label="Lotus flower">
        <div className={styles.lotus}>
          <LotusModel />
        </div>
      </section>

      <div className={styles.bottomDetails}>
        <p><VizagClock /> GMT +5:30</p>
        <p className={styles.locationStatus}>
          <span>VIZAG, INDIA</span>
          <span className={styles.availability}>
            <span className={styles.availabilityDot} aria-hidden="true" />
            AVAILABLE FOR WORK
          </span>
        </p>
      </div>
    </main>
  );
}
