"use client";

import { useEffect, useRef, useState } from "react";

type AutoplayVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  label: string;
  autoPlay?: boolean;
  decorative?: boolean;
};

export function AutoplayVideo({
  src,
  poster,
  className,
  label,
  autoPlay = true,
  decorative = false,
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!autoPlay) {
      video.pause();
      setShowControls(false);
      return;
    }

    let playRequestPending = false;
    const attemptPlayback = () => {
      if (document.visibilityState === "visible" && video.paused && !playRequestPending) {
        playRequestPending = true;
        void video.play()
          .then(() => setShowControls(false))
          .catch(() => setShowControls(true))
          .finally(() => {
            playRequestPending = false;
          });
      }
    };
    const hideControls = () => setShowControls(false);
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") attemptPlayback();
    };

    video.addEventListener("loadeddata", attemptPlayback);
    video.addEventListener("canplay", attemptPlayback);
    video.addEventListener("playing", hideControls);
    document.addEventListener("visibilitychange", onVisibilityChange);
    attemptPlayback();

    return () => {
      video.removeEventListener("loadeddata", attemptPlayback);
      video.removeEventListener("canplay", attemptPlayback);
      video.removeEventListener("playing", hideControls);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [autoPlay, src]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={autoPlay}
      controls={showControls}
      muted
      loop
      playsInline
      preload={autoPlay ? "auto" : "metadata"}
      poster={poster}
      aria-label={label}
      aria-hidden={decorative || undefined}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support embedded video.
    </video>
  );
}
