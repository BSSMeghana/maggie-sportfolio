import type { Metadata } from "next";
import Image from "next/image";

import { AboutCollage } from "./about-collage";
import { ManifestoText } from "./manifesto-text";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About | Maggie’s Portfolio",
};

const skillGroups = [
  { title: "Frontend", skills: ["React", "Next.js", "HTML5", "CSS3", "JavaScript", "TypeScript"] },
  { title: "Design", skills: ["Figma", "Photoshop", "Illustrator", "Adobe XD", "Canva"] },
  { title: "AI/ML", skills: ["Python", "PyTorch", "Pandas", "NumPy", "Scikit-learn", "TensorFlow"] },
  { title: "Tools", skills: ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Docker"] },
] as const;

export default function AboutPage() {
  return (
    <main className={styles.about}>
      <h1 className="sr-only">About Meghana BSS</h1>
      <section className={styles.intro} aria-label="Introduction">
        <div className={styles.content}>
          <AboutCollage />
          <div className={styles.greetingCopy}>
            <p className={styles.greeting}>
              It’s nice to<br />
              <span>
                meet you!
                <Image
                  className={styles.greetingElephant}
                  src="/elehello.png"
                  alt=""
                  width={409}
                  height={371}
                />
              </span>
            </p>
            <p className={styles.introParagraph}>
              I&apos;m <span className={styles.blueHighlight}>Meghana</span>, a <span className={styles.blueHighlight}>UI/UX designer</span> and <span className={styles.blueHighlight}>frontend developer</span> from Vizag, currently pursuing an <span className={styles.blueHighlight}>M.Tech</span> in <span className={styles.blueHighlight}>Computer Science and Technology</span> at <span className={styles.blueHighlight}>Andhra University</span>. I&apos;m drawn to the little things that make an experience feel effortless—the rhythm of an interaction, an unexpected visual, the moment a complex idea becomes simple. That curiosity is what I bring to my work, pairing thoughtful design with code to create digital experiences that feel clear, considered, and a little surprising.
            </p>
            <p className={styles.personalNote}>
              When I&apos;m not working, I enjoy singing classical music, playing badminton, and overthinking the little things.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.manifesto} aria-labelledby="manifesto-title">
        <div className={styles.manifestoSticky}>
          <h2 id="manifesto-title" className={styles.manifestoTitle}>Manifesto</h2>
          <ManifestoText />
        </div>
      </section>
      <section className={styles.experience} aria-labelledby="experience-title">
        <div className={styles.experienceSticky}>
          <h2 id="experience-title" className={styles.experienceTitle}>Experience</h2>
          <div className={styles.experienceList}>
            <article className={styles.experienceItem}>
              <div className={styles.experienceHeader}>
                <h3 className={styles.company}><strong>Aditha Enterprises LLP</strong> <span>(Internship)</span></h3>
                <p className={styles.period}>Jul 2025–Present</p>
              </div>
              <p className={styles.role}>Frontend Developer</p>
            </article>
            <article className={styles.experienceItem}>
              <div className={styles.experienceHeader}>
                <h3 className={styles.company}><strong>SeventhRay Consulting and Technology</strong> <span>(Freelancer)</span></h3>
                <p className={styles.period}>Dec 2025–Mar 2026</p>
              </div>
              <p className={styles.role}>UI/UX Designer</p>
            </article>
            <article className={styles.experienceItem}>
              <div className={styles.experienceHeader}>
                <h3 className={styles.company}><strong>YUKTII Ventures</strong> <span>(Internship)</span></h3>
                <p className={styles.period}>Nov 2024–Apr 2025</p>
              </div>
              <p className={styles.role}>Trainee</p>
            </article>
          </div>
        </div>
      </section>
      <section className={styles.stack} aria-labelledby="stack-title">
        <h2 id="stack-title" className={styles.stackTitle}>My Stack</h2>
        <div className={styles.stackGroups}>
          {skillGroups.map((group) => (
            <section className={styles.stackGroup} key={group.title} aria-labelledby={`stack-${group.title.toLowerCase().replace("/", "-")}`}>
              <h3 id={`stack-${group.title.toLowerCase().replace("/", "-")}`} className={styles.stackGroupTitle}>{group.title}</h3>
              <ul className={styles.skillList}>
                {group.skills.map((skill) => (
                  <li className={styles.skill} key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
      <section className={styles.education} aria-labelledby="education-title">
        <h2 id="education-title" className={styles.educationTitle}>Education</h2>
        <div className={styles.educationList}>
          <article className={styles.educationItem}>
            <div>
              <h3 className={styles.degree}>M.Tech in Computer Science and Technology</h3>
              <p className={styles.institution}>Andhra University</p>
            </div>
            <p className={styles.educationPeriod}>2024–2026</p>
          </article>
          <article className={styles.educationItem}>
            <div>
              <h3 className={styles.degree}>B.Tech in Computer Science and Technology (AI &amp; ML)</h3>
              <p className={styles.institution}>Gayatri Vidya Parishad College of Engineering (A)</p>
            </div>
            <p className={styles.educationPeriod}>2020–2024</p>
          </article>
        </div>
      </section>
    </main>
  );
}
