"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "@/app/work/[slug]/project.module.css";

const slides = [
  { src: "/Gibberlink/GL5.png", alt: "GibberLink idea onboarding screen" },
  { src: "/Gibberlink/GL6.png", alt: "GibberLink guided idea setup screen" },
  { src: "/Gibberlink/GL7.png", alt: "GibberLink startup details screen" },
  { src: "/Gibberlink/GL8.png", alt: "GibberLink AI executive selection screen" },
  { src: "/Gibberlink/GL9.png", alt: "GibberLink advisory team screen" },
] as const;

export function GibberLinkImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section className={styles.gibberImageCarousel} aria-label="GibberLink product flow">
      <div className={styles.gibberCarouselViewport} aria-live="polite">
        <Image
          key={activeSlide.src}
          src={activeSlide.src}
          alt={activeSlide.alt}
          width={2880}
          height={1692}
          sizes="100vw"
          priority={activeIndex === 0}
        />
        <button className={`${styles.gibberCarouselArrow} ${styles.gibberCarouselPrevious}`} onClick={showPrevious} type="button" aria-label="Show previous screen">
          <span aria-hidden="true">←</span>
        </button>
        <button className={`${styles.gibberCarouselArrow} ${styles.gibberCarouselNext}`} onClick={showNext} type="button" aria-label="Show next screen">
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div className={styles.gibberCarouselStatus}>
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <div aria-label={`Slide ${activeIndex + 1} of ${slides.length}`}>
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              className={index === activeIndex ? styles.gibberCarouselDotActive : ""}
              onClick={() => setActiveIndex(index)}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
      <article className={styles.gibberCarouselDescription}>
        <p className={styles.gibberCarouselIntroduction}>
          GibberLink&apos;s onboarding flow guides founders through turning a business idea into a structured startup profile and selecting an AI advisory team. These five screens cover four stages—<strong>Basic, Type, Market, and Strategy</strong>—with the final screen showing agent selection within the Strategy stage.
        </p>
        <ol>
          <li>
            <h3>Startup basics</h3>
            <p>Founders introduce their business by entering details such as its name, location, budget, and target market. They select whether the business is technology-based, non-technology, hybrid, or still undefined, then describe the problem they want to solve and how their solution differs from existing options.</p>
          </li>
          <li>
            <h3>Business type and operations</h3>
            <p>The next stage adapts to the selected business type. The non-technology example shown explores what the business offers, whether it provides products or services, and how it operates through physical or online channels. Grouped selection buttons help founders describe their operations without writing lengthy responses.</p>
          </li>
          <li>
            <h3>Market and business model</h3>
            <p>Founders define their ideal customers, geographic reach, and competitors. They also specify their revenue model, growth objective, and expected return timeline. This step connects the idea to the audience it serves and the way the business intends to generate value.</p>
          </li>
          <li>
            <h3>Strategy and priorities</h3>
            <p>Sliders let users express the importance of launch speed, product quality, and cost efficiency. Additional inputs capture their biggest constraint, risk appetite, and experience level, helping them articulate the priorities and limitations surrounding their decisions.</p>
          </li>
          <li>
            <h3>AI advisory team selection</h3>
            <p>Founders choose the executive perspectives they want in their discussion, such as operations, marketing, finance, and legal. Each role appears as a selectable card, with orange borders and checkmarks making the selected team easy to identify. The <strong>Start Simulation</strong> button completes setup and leads into the advisory experience.</p>
          </li>
        </ol>
        <p className={styles.gibberCarouselSummary}>
          The design breaks a detailed questionnaire into focused stages, using a persistent progress indicator to show where users are in the process. Consistent layouts, grouped fields, and orange highlights establish a clear visual hierarchy, helping founders work through their business context one decision at a time.
        </p>
      </article>
    </section>
  );
}
