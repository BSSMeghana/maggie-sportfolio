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
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [workMenuOpen, setWorkMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!workMenuOpen && !mobileMenuOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!workMenuRef.current?.contains(event.target as Node)) setWorkMenuOpen(false);
      if (!mobileMenuRef.current?.contains(event.target as Node)) setMobileMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setWorkMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [workMenuOpen, mobileMenuOpen]);

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
                <span aria-hidden="true">↗︎</span>
              </Link>
            ))}
          </div>
        </details>
        {navigation.map(({ label, href, download }) => download ? (
          <a className={styles.link} href={href} key={label} download>
            {label}<span aria-hidden="true">↗︎</span>
          </a>
        ) : (
          <Link className={styles.link} href={href} key={label}>
            {label}
          </Link>
        ))}
      </nav>
      <div className={styles.mobileMenu} ref={mobileMenuRef}>
        <button
          className={styles.menuToggle}
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        {mobileMenuOpen && (
          <nav className={styles.mobileNavigation} id="mobile-navigation" aria-label="Mobile navigation">
            <Link className={styles.mobileLink} href="/about" onClick={() => setMobileMenuOpen(false)}>ABOUT</Link>
            <details className={styles.mobileWorkMenu}>
              <summary className={styles.mobileLink}>
                WORK <span className={styles.chevron} aria-hidden="true" />
              </summary>
              <div className={styles.mobileProjectList}>
                <Link className={styles.mobileProjectLink} href="/#work" onClick={() => setMobileMenuOpen(false)}>
                  ALL WORK
                </Link>
                {projects.map((project) => (
                  <Link
                    className={styles.mobileProjectLink}
                    href={`/work/${project.slug}`}
                    key={project.slug}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{project.number}</span>
                    <span>{project.title}</span>
                  </Link>
                ))}
              </div>
            </details>
            <a className={styles.mobileLink} href="/bss_meghana_resume.pdf" download onClick={() => setMobileMenuOpen(false)}>
              RESUME <span aria-hidden="true">↗︎</span>
            </a>
            <Link className={styles.mobileLink} href="/#contact" onClick={() => setMobileMenuOpen(false)}>CONTACT</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
