"use client";

import { useEffect, useRef } from "react";

import styles from "./about.module.css";

const opening = "I tend to notice the little things: why an interaction feels effortless, how a color shifts a mood, or what makes a page stay with you.";
const belief = "I believe";
const closing = "the best digital experiences bring that curiosity together with clarity—thoughtfully designed, carefully built, and grounded in how people actually use them.";

const openingLength = opening.replaceAll(" ", "").length;
const beliefLength = belief.replaceAll(" ", "").length;

function RevealWords({ text, start }: { text: string; start: number }) {
  let offset = start;
  const words = text.split(" ");

  return words.map((word, wordIndex) => {
    const firstCharacter = offset;
    offset += word.length;

    return (
      <span key={firstCharacter}>
        <span className={styles.revealWord}>
          {Array.from(word).map((character, characterIndex) => (
            <span className={styles.revealCharacter} key={characterIndex}>{character}</span>
          ))}
        </span>
        {wordIndex < words.length - 1 ? " " : null}
      </span>
    );
  });
}

export function ManifestoText() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const paragraph = textRef.current;
    const section = paragraph?.closest("section");
    if (!paragraph || !section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const characters = Array.from(paragraph.querySelectorAll<HTMLSpanElement>(`.${styles.revealCharacter}`));
    paragraph.classList.add(styles.scrollReady);
    let frame = 0;
    let previousPosition = -1;

    const setColor = (index: number, amount: number) => {
      const channel = Math.round(237 + (17 - 237) * amount);
      characters[index].style.color = `rgb(${channel}, ${channel}, ${channel})`;
    };

    const update = () => {
      frame = 0;
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / distance));
      const position = progress * characters.length;
      if (position === previousPosition) return;

      const first = Math.max(0, Math.floor(Math.min(previousPosition, position)));
      const last = Math.min(characters.length - 1, Math.ceil(Math.max(previousPosition, position)));
      for (let index = first; index <= last; index++) {
        setColor(index, Math.max(0, Math.min(1, position - index)));
      }
      previousPosition = position;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p ref={textRef} className={styles.manifestoText}>
      <strong><RevealWords text={opening} start={0} /></strong>{" "}
      <span className={styles.belief}><RevealWords text={belief} start={openingLength} /></span>{" "}
      <RevealWords text={closing} start={openingLength + beliefLength} />
    </p>
  );
}
