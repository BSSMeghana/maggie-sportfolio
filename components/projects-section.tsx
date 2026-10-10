import Image from "next/image";
import Link from "next/link";

import { projects } from "@/lib/projects";

import styles from "./projects-section.module.css";

export function ProjectsSection() {
  return (
    <section className={styles.projects} id="work" aria-labelledby="work-title">
      <div className={styles.headingRow}>
        <h2 id="work-title">Selected work</h2>
      </div>

      <div className={styles.list}>
        {projects.map((project) => (
          <Link className={styles.project} href={`/work/${project.slug}`} key={project.slug}>
            <div className={styles.visual} style={{ backgroundColor: project.accent }}>
              {project.slug === "drushti" ? (
                <div className={styles.phoneComposition}>
                  <Image
                    className={`${styles.phone} ${styles.phoneBack}`}
                    src="/drushti/eye11.jpeg"
                    alt="Drushti retina upload screen"
                    width={856}
                    height={1852}
                    sizes="(max-width: 700px) 32vw, 18vw"
                  />
                  <Image
                    className={`${styles.phone} ${styles.phoneFront}`}
                    src={project.cover}
                    alt={project.coverAlt}
                    width={780}
                    height={1688}
                    sizes="(max-width: 700px) 38vw, 22vw"
                  />
                </div>
              ) : (
                <Image
                  className={styles.cover}
                  src={project.cover}
                  alt={project.coverAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 68vw"
                />
              )}
            </div>
            <div className={styles.details}>
              <h3>{project.title}</h3>
              <p>{project.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
