"use client";

import { useEffect, useRef } from "react";

import styles from "./custom-cursor.module.css";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const updatePosition = (event: PointerEvent) => {
      cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
      cursor.dataset.visible = "true";

      const target = event.target;
      cursor.dataset.hover = target instanceof Element && Boolean(
        target.closest("a, button, [role='button'], input, textarea, select, label"),
      ) ? "true" : "false";
    };

    const hideCursor = () => {
      cursor.dataset.visible = "false";
      cursor.dataset.hover = "false";
      cursor.dataset.pressed = "false";
    };

    const setPressed = (event: PointerEvent) => {
      cursor.dataset.pressed = event.type === "pointerdown" ? "true" : "false";
    };

    document.addEventListener("pointermove", updatePosition);
    document.addEventListener("pointerleave", hideCursor);
    document.addEventListener("pointerdown", setPressed);
    document.addEventListener("pointerup", setPressed);

    return () => {
      document.removeEventListener("pointermove", updatePosition);
      document.removeEventListener("pointerleave", hideCursor);
      document.removeEventListener("pointerdown", setPressed);
      document.removeEventListener("pointerup", setPressed);
    };
  }, []);

  return (
    <div className={styles.cursor} ref={cursorRef} aria-hidden="true" data-visible="false">
      <span className={styles.dot} />
      <span className={styles.ring} />
    </div>
  );
}
