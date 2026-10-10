"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./about.module.css";

const photos = [
  { id: "me2", position: styles.seaside, alt: "Meghana by the sea at sunset", width: 314, height: 460, sizes: "(max-width: 900px) 42vw, 24vw" },
  { id: "me5", position: styles.childhood, alt: "Meghana as a child", width: 314, height: 460, sizes: "(max-width: 900px) 39vw, 22vw" },
  { id: "me3", position: styles.travel, alt: "Meghana on a beach", width: 314, height: 460, sizes: "(max-width: 900px) 42vw, 24vw" },
  { id: "me4", position: styles.birthday, alt: "Meghana celebrating a childhood birthday", width: 314, height: 460, sizes: "(max-width: 900px) 40vw, 23vw" },
  { id: "me1", position: styles.lotusLake, alt: "Meghana among lotus flowers on a lake", width: 321, height: 460, sizes: "(max-width: 900px) 46vw, 26vw" },
] as const;

export function AboutCollage() {
  const [frontPhoto, setFrontPhoto] = useState<string>("me1");

  return (
    <div className={styles.collage} aria-label="Photos of Meghana through the years">
      {photos.map((photo) => (
        <button
          key={photo.id}
          type="button"
          className={`${styles.photo} ${photo.position} ${frontPhoto === photo.id ? styles.photoActive : ""}`}
          onClick={() => setFrontPhoto(photo.id)}
          aria-label={`Bring ${photo.alt.toLowerCase()} to the front`}
          aria-pressed={frontPhoto === photo.id}
        >
          <Image
            className={styles.photoImage}
            src={`/${photo.id}.png`}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={photo.sizes}
            priority={photo.id === "me1"}
            unoptimized
          />
          {photo.id === "me1" && (
            <Image
              className={styles.highResPhoto}
              src="/me.jpeg"
              alt=""
              width={960}
              height={1280}
              sizes="(max-width: 900px) 40vw, 23vw"
              priority
              unoptimized
            />
          )}
        </button>
      ))}
    </div>
  );
}
