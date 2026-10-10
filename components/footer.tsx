import { VizagClock } from "@/components/vizag-clock";

import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.panel}>
        <div className={styles.callout}>
          <p className={styles.eyebrow}>Have a project in mind?</p>
          <p className={styles.message}>
            <span>Let&apos;s <em>CREATE</em></span>
            <span> <em> GREAT </em> things together.</span>
          </p>
          <a className={styles.contactPill} href="mailto:meghana.bantubilli@gmail.com">
            meghana.bantubilli@gmail.com
          </a>
        </div>
        <div className={styles.footerBar}>
          <div className={styles.time}><VizagClock /> GMT +5:30</div>
          <div className={styles.footerMeta}>
            <a
              className={styles.social}
              href="https://www.linkedin.com/in/bantubilli-sai-siva-meghana"
              target="_blank"
              rel="noreferrer"
            >
              LINKEDIN
            </a>
            <a
              className={styles.social}
              href="https://github.com/BSSMeghana"
              target="_blank"
              rel="noreferrer"
            >
              GITHUB
            </a>
            <div className={styles.location}>VIZAG, INDIA</div>
            <a className={styles.backToTop} href="#" aria-label="Back to top">↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
