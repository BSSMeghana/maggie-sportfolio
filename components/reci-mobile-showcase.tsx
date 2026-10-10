import Image from "next/image";

import styles from "@/app/work/[slug]/project.module.css";

const screens = [
  { src: "/reci/recimbl2.jpeg", alt: "Reci mobile recipe results" },
  { src: "/reci/recimbl1.jpeg", alt: "Reci mobile landing and filter experience" },
  { src: "/reci/recimbl3.jpeg", alt: "Reci mobile project information" },
] as const;

export function ReciMobileShowcase() {
  return (
    <section className={styles.mobileShowcase} aria-label="Reci mobile experience">
      <div className={styles.mobileShowcaseDevices}>
        {screens.map((screen) => (
          <div className={styles.mobileDevice} key={screen.src}>
            <span className={styles.mobileDeviceScreen}>
              <Image src={screen.src} alt={screen.alt} fill sizes="(max-width: 700px) 36vw, 16vw" />
            </span>
          </div>
        ))}
      </div>
      <div className={styles.mobileShowcaseCopy}>
        <h2>Responsive across devices</h2>
        <p>Reci adapts across screen sizes, keeping recipe discovery, filters, and cooking details clear and easy to use on mobile.</p>
      </div>
    </section>
  );
}
