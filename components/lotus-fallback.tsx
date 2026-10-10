"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function LotusFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const flower = new window.Image();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { active: false, x: 0, y: 0, hasPosition: false, impulse: 0 };
    const direction = { x: 1, y: 0 };
    const targetDirection = { x: 1, y: 0 };
    let flowerAlpha: Uint8Array | null = null;
    let flowerWidth = 0;
    let flowerHeight = 0;
    let redLayer: HTMLCanvasElement | null = null;
    let cyanLayer: HTMLCanvasElement | null = null;
    let frame = 0;
    let width = 0;
    let height = 0;
    let strength = 0;
    let previousTime = 0;
    let canvasVisible = false;

    flower.onload = () => {
      const source = document.createElement("canvas");
      source.width = flower.naturalWidth;
      source.height = flower.naturalHeight;
      const sourceContext = source.getContext("2d", { willReadFrequently: true });
      if (!sourceContext) return;
      sourceContext.drawImage(flower, 0, 0);
      const pixels = sourceContext.getImageData(0, 0, source.width, source.height);
      flowerAlpha = new Uint8Array(source.width * source.height);
      for (let i = 0; i < flowerAlpha.length; i++) {
        flowerAlpha[i] = pixels.data[i * 4 + 3];
      }
      flowerWidth = source.width;
      flowerHeight = source.height;

      const makeLayer = (red: boolean) => {
        const layer = document.createElement("canvas");
        layer.width = source.width;
        layer.height = source.height;
        const layerContext = layer.getContext("2d");
        if (!layerContext) return null;
        const tint = layerContext.createImageData(source.width, source.height);
        for (let i = 0; i < pixels.data.length; i += 4) {
          tint.data[i] = red ? 255 : 0;
          tint.data[i + 1] = red ? 25 : 220;
          tint.data[i + 2] = red ? 75 : 255;
          tint.data[i + 3] = pixels.data[i + 3];
        }
        layerContext.putImageData(tint, 0, 0);
        return layer;
      };

      redLayer = makeLayer(true);
      cyanLayer = makeLayer(false);
    };
    flower.src = "/lotus-fallback.png";

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!flowerAlpha || !width || !height) return;
      const imageX = Math.floor((event.offsetX / width) * flowerWidth);
      const imageY = Math.floor((event.offsetY / height) * flowerHeight);
      const onFlower = imageX >= 0 && imageX < flowerWidth && imageY >= 0 && imageY < flowerHeight
        && flowerAlpha[imageY * flowerWidth + imageX] > 24;
      if (!onFlower) {
        pointer.active = false;
        pointer.hasPosition = false;
        return;
      }

      if (pointer.hasPosition) {
        const dx = event.offsetX - pointer.x;
        const dy = event.offsetY - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance > 2) {
          targetDirection.x = dx / distance;
          targetDirection.y = dy / distance;
          pointer.impulse = Math.min(1, pointer.impulse + (distance / Math.min(width, height)) * 18);
        }
      }
      pointer.x = event.offsetX;
      pointer.y = event.offsetY;
      pointer.hasPosition = true;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
      pointer.hasPosition = false;
    };

    const draw = (time: number) => {
      frame = window.requestAnimationFrame(draw);
      if (!flower.complete || !flower.naturalWidth || !width || !height) return;
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      pointer.impulse *= Math.exp(-delta / 0.18);
      const target = pointer.active && !reducedMotion ? 0.75 + 0.25 * pointer.impulse : 0;
      strength += (target - strength) * (1 - Math.exp(-delta / (pointer.active ? 0.13 : 0.07)));
      const directionEase = 1 - Math.exp(-delta / 0.12);
      direction.x += (targetDirection.x - direction.x) * directionEase;
      direction.y += (targetDirection.y - direction.y) * directionEase;

      if (strength <= 0.005 || !redLayer || !cyanLayer) {
        if (canvasVisible) {
          context.clearRect(0, 0, width, height);
          canvasVisible = false;
        }
        return;
      }

      context.clearRect(0, 0, width, height);
      const shift = 11 * strength * (1 + 0.35 * pointer.impulse);
      context.globalAlpha = strength;
      context.drawImage(redLayer, direction.x * shift, direction.y * shift, width, height);
      context.drawImage(cyanLayer, -direction.x * shift, -direction.y * shift, width, height);
      context.globalAlpha = 1;
      context.drawImage(flower, 0, 0, width, height);
      canvasVisible = true;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    frame = window.requestAnimationFrame(draw);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      flower.onload = null;
      flower.src = "";
    };
  }, []);

  return (
    <>
      <Image src="/lotus-fallback.png" alt="" fill unoptimized sizes="(max-width: 800px) 94vw, 1050px" className="object-contain" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" aria-hidden="true" />
    </>
  );
}
