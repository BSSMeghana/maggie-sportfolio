"use client";

import Image from "next/image";
import { useState } from "react";

import { AutoplayVideo } from "@/components/autoplay-video";
import styles from "@/app/work/[slug]/project.module.css";

type LaptopScreen = {
  src: string;
  alt: string;
  type?: "image" | "video";
  poster?: string;
};

const reciScreens: readonly LaptopScreen[] = [
  { src: "/reci/reci1.jpeg", alt: "Reci recipe discovery homepage" },
  {
    src: "/reci/recirecomvideo.mp4",
    alt: "Reci recipe recommendation experience",
    type: "video",
    poster: "/reci/recirecomvideo-poster.jpg",
  },
  {
    src: "/reci/reciabtvideo.mp4",
    alt: "Reci project overview",
    type: "video",
    poster: "/reci/reciabtvideo-poster.jpg",
  },
];

const gibberLinkScreens: readonly LaptopScreen[] = [
  {
    src: "/Gibberlink/GLhomevideo.mp4",
    alt: "GibberLink home page walkthrough",
    type: "video",
    poster: "/Gibberlink/GLhomevideo-poster.jpg",
  },
  { src: "/Gibberlink/GL11.png", alt: "GibberLink live multi-agent discussion" },
  { src: "/Gibberlink/GL12.png", alt: "GibberLink decision summary and action plan" },
];

export function CaseStudyLaptopCarousel({ project = "reci" }: { project?: "reci" | "gibberlink" }) {
  const screens = project === "gibberlink" ? gibberLinkScreens : reciScreens;
  // Open Reci on its first video so the case study starts with the product in motion.
  const [selected, setSelected] = useState(() => (project === "reci" ? 1 : 0));
  const positions = [
    (selected + screens.length - 1) % screens.length,
    selected,
    (selected + 1) % screens.length,
  ];

  return (
    <>
      <section className={styles.laptopCarousel} aria-label={`${project === "gibberlink" ? "GibberLink" : "Reci"} website screens`}>
        {positions.map((screenIndex, positionIndex) => {
        const screen = screens[screenIndex];
        const isSelected = screenIndex === selected;

        return (
          <button
            aria-label={`${screen.alt}${isSelected ? ", selected" : ", select to enlarge"}`}
            aria-pressed={isSelected}
            className={`${styles.laptop} ${isSelected ? styles.laptopSelected : ""} ${positionIndex === 0 ? styles.laptopLeft : styles.laptopRight}`}
            key={screen.src}
            onClick={() => setSelected(screenIndex)}
            type="button"
          >
            <span className={styles.laptopScreen}>
              <span className={styles.laptopCamera} aria-hidden="true" />
              {screen.type === "video" ? (
                <AutoplayVideo
                  src={screen.src}
                  poster={screen.poster}
                  label={screen.alt}
                  autoPlay={isSelected}
                  decorative
                />
              ) : (
                <Image src={screen.src} alt="" fill sizes="(max-width: 700px) 78vw, 58vw" />
              )}
            </span>
            <span className={styles.laptopBase} aria-hidden="true"><span /></span>
          </button>
        );
        })}
        {!(project === "gibberlink" && selected === 0) && (
          <p className={styles.laptopHint}>Select a screen to bring it forward</p>
        )}
      </section>
      {project === "gibberlink" && selected === 0 && (
        <section className={styles.reciOverview} aria-labelledby="gibberlink-dashboard-title">
          <h2 id="gibberlink-dashboard-title">The GibberLink Dashboard</h2>
          <div className={styles.reciOverviewCopy}>
            <p>Designed to give founders an at-a-glance overview of their AI advisory team and task activity.</p>
            <ul className={styles.dashboardFeatureList}>
              <li><strong>Overview cards</strong> display agent counts, active tasks, completed and failed jobs, revenue, and users.</li>
              <li><strong>Task Performance</strong> compares completed and failed tasks across the week.</li>
              <li><strong>Agent Usage Distribution</strong> shows activity across executive roles such as CTO, CMO, CFO, and Legal.</li>
              <li><strong>Sidebar navigation</strong> connects the dashboard to idea onboarding, live discussions, and decision summaries.</li>
            </ul>
            <p>The layout places key metrics first, followed by detailed charts, making information easy to scan. Orange accents highlight navigation and controls, while the dark sidebar separates navigation from the main workspace.</p>
          </div>
        </section>
      )}
    </>
  );
}
