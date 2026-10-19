"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { projects } from "@/lib/projects";

import styles from "./header.module.css";

const navigation = [
  { label: "RESUME", href: "/bss_meghana_resume.pdf", download: true },
  { label: "CONTACT", href: "/#contact", download: false },
];

export function Header() {
  const workMenuRef = useRef<HTMLDetailsElement>(null);
  const [workMenuOpen, setWorkMenuOpen] = useState(false);

  useEffect(() => {
    if (!workMenuOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!workMenuRef.current?.contains(event.target as Node)) setWorkMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setWorkMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [workMenuOpen]);

  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/" aria-label="Meghana BSS home">
        MEGHANA BSS
      </Link>
      <nav className={styles.navigation} aria-label="Main navigation">
        <Link className={styles.link} href="/about">ABOUT</Link>
        <details
          ref={workMenuRef}
          className={styles.workMenu}
          open={workMenuOpen}
          onToggle={(event) => setWorkMenuOpen(event.currentTarget.open)}
        >
          <summary className={styles.link} onClick={(event) => {
            event.preventDefault();
            setWorkMenuOpen((open) => !open);
          }}>
            WORK <span className={styles.chevron} aria-hidden="true" />
          </summary>
          <div className={styles.dropdown} aria-label="Project navigation">
              <Link className={`${styles.projectLink} ${styles.allWorkLink}`} href="/#work" onClick={() => setWorkMenuOpen(false)}>
              <span>00</span>
              <span>All work</span>
              <span aria-hidden="true">↓</span>
            </Link>
            {projects.map((project) => (
              <Link className={styles.projectLink} href={`/work/${project.slug}`} key={project.slug} onClick={() => setWorkMenuOpen(false)}>
                <span>{project.number}</span>
                <span>{project.title}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </details>
        {navigation.map(({ label, href, download }) => download ? (
          <a className={styles.link} href={href} key={label} download>
            {label}<span aria-hidden="true">↗</span>
          </a>
        ) : (
          <Link className={styles.link} href={href} key={label}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
