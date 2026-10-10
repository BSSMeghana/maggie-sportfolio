"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { LotusFallback } from "./lotus-fallback";

function disposeModel(model: THREE.Object3D) {
  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;

    object.geometry.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      for (const value of Object.values(material)) {
        if (value instanceof THREE.Texture) value.dispose();
      }
      material.dispose();
    }
  });
}

export function LotusModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    let context: WebGL2RenderingContext | null = null;
    try {
      context = canvas.getContext("webgl2", { alpha: true, antialias: true });
    } catch {
      // Some browsers throw instead of returning null when WebGL is unavailable.
    }
    let contextAvailable = false;
    try {
      contextAvailable = !!context && !context.isContextLost();
    } catch {
      // Treat an incomplete WebGL context as unavailable.
    }
    if (!context || !contextAvailable) {
      queueMicrotask(() => setLoadState("error"));
      return;
    }

    // A few WebGL implementations return null for precision queries. Three.js
    // assumes a result exists for highp/mediump, so use lowp on those devices.
    let precision: "highp" | "mediump" | "lowp" = "lowp";
    try {
      const supported = (level: number) =>
        (context.getShaderPrecisionFormat(context.VERTEX_SHADER, level)?.precision ?? 0) > 0 &&
        (context.getShaderPrecisionFormat(context.FRAGMENT_SHADER, level)?.precision ?? 0) > 0;
      if (supported(context.HIGH_FLOAT)) precision = "highp";
      else if (supported(context.MEDIUM_FLOAT)) precision = "mediump";
    } catch {
      // Keep lowp when shader precision cannot be queried reliably.
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context,
        alpha: true,
        antialias: true,
        precision,
      });
    } catch {
      try {
        context.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {
        // The context is already unusable.
      }
      queueMicrotask(() => setLoadState("error"));
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    let contextLost = false;
    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      setLoadState("error");
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff, 2));
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(3, 5, 4);
    scene.add(light);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    // The Sketchfab GLB lies mostly flat after its root rotation.
    // View it from above so the petals face the camera.
    camera.position.set(0, 3.4, 4.2);
    camera.lookAt(0, 0, 0);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dispersion = { value: 0 };
    const dispersionDirection = { value: new THREE.Vector2(1, 0) };
    const pointerPosition = { value: new THREE.Vector2(0.5, 0.5) };
    const pointerTarget = new THREE.Vector2(0.5, 0.5);
    const previousPointer = new THREE.Vector2(0.5, 0.5);
    const directionTarget = new THREE.Vector2(1, 0);
    const pointerMovement = new THREE.Vector2();
    const texelSize = { value: new THREE.Vector2(1, 1) };
    const canvasAspect = { value: 1 };
    const flowerTarget = new THREE.WebGLRenderTarget(1, 1);
    flowerTarget.texture.colorSpace = THREE.SRGBColorSpace;
    const dispersionMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tFlower: { value: flowerTarget.texture },
        uDispersion: dispersion,
        uDirection: dispersionDirection,
        uPointer: pointerPosition,
        uTexelSize: texelSize,
        uAspect: canvasAspect,
      },
      vertexShader: `varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }`,
      fragmentShader: `uniform sampler2D tFlower;
        uniform float uDispersion;
        uniform vec2 uDirection;
        uniform vec2 uPointer;
        uniform vec2 uTexelSize;
        uniform float uAspect;
        varying vec2 vUv;
        void main() {
          if (uDispersion < 0.0001) {
            gl_FragColor = texture2D(tFlower, vUv);
          } else {
            vec2 fromPointer = (vUv - uPointer) * vec2(uAspect, 1.0);
            float distanceFromPointer = length(fromPointer);
            float proximity = 1.0 - smoothstep(0.08, 0.55, distanceFromPointer);
            float strength = uDispersion * (0.35 + 0.65 * proximity);
            vec2 shift = uDirection * uTexelSize * strength * 8.0;
            vec4 center = texture2D(tFlower, vUv);
            vec4 red = texture2D(tFlower, vUv + shift);
            vec4 blue = texture2D(tFlower, vUv - shift);
            float alpha = max(center.a, max(red.a, blue.a));
            gl_FragColor = vec4(red.r, center.g, blue.b, alpha);
          }
          #include <colorspace_fragment>
        }`,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    const screenGeometry = new THREE.PlaneGeometry(2, 2);
    const screenScene = new THREE.Scene();
    screenScene.add(new THREE.Mesh(screenGeometry, dispersionMaterial));
    const screenCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    let previousFrameTime = 0;
    let pointerInside = false;
    let pointerEnergy = 0;
    let hasPreviousPointer = false;
    let disposed = false;
    let loadedModel: THREE.Object3D | null = null;
    const hitSize = 256;
    let hitAlpha: Uint8Array | null = null;
    const hitImage = new window.Image();
    hitImage.onload = () => {
      const hitCanvas = document.createElement("canvas");
      hitCanvas.width = hitSize;
      hitCanvas.height = hitSize;
      const hitContext = hitCanvas.getContext("2d", { willReadFrequently: true });
      if (!hitContext) return;
      hitContext.drawImage(hitImage, 0, 0, hitSize, hitSize);
      const pixels = hitContext.getImageData(0, 0, hitSize, hitSize).data;
      hitAlpha = new Uint8Array(hitSize * hitSize);
      for (let i = 0; i < hitAlpha.length; i++) hitAlpha[i] = pixels[i * 4 + 3];
    };
    hitImage.src = "/lotus-fallback.png";
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    const onPointerMove = (event: PointerEvent) => {
      if (!loadedModel || reducedMotion) return;
      const x = THREE.MathUtils.clamp(event.offsetX / container.clientWidth, 0, 1);
      const y = THREE.MathUtils.clamp(1 - event.offsetY / container.clientHeight, 0, 1);
      let onFlower = false;
      if (hitAlpha) {
        const hitX = Math.min(hitSize - 1, Math.floor(x * hitSize));
        const hitY = Math.min(hitSize - 1, Math.floor((1 - y) * hitSize));
        onFlower = hitAlpha[hitY * hitSize + hitX] > 64;
      } else {
        pointerNdc.set(x * 2 - 1, y * 2 - 1);
        raycaster.setFromCamera(pointerNdc, camera);
        onFlower = raycaster.intersectObject(loadedModel, true).length > 0;
      }
      if (!onFlower) {
        pointerInside = false;
        hasPreviousPointer = false;
        return;
      }
      pointerTarget.set(x, y);
      if (hasPreviousPointer) {
        pointerMovement.copy(pointerTarget).sub(previousPointer);
        if (pointerMovement.lengthSq() > 0.00001) {
          directionTarget.copy(pointerMovement).normalize();
          pointerEnergy = Math.min(1, pointerEnergy + pointerMovement.length() * 4);
        }
      } else {
        pointerEnergy = 0.6;
        hasPreviousPointer = true;
      }
      previousPointer.copy(pointerTarget);
      pointerInside = true;
    };
    const onPointerLeave = () => {
      pointerInside = false;
      hasPreviousPointer = false;
    };
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      const drawingSize = renderer.getDrawingBufferSize(new THREE.Vector2());
      flowerTarget.setSize(drawingSize.x, drawingSize.y);
      texelSize.value.set(1 / drawingSize.x, 1 / drawingSize.y);
      canvasAspect.value = drawingSize.x / drawingSize.y;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const loader = new GLTFLoader();
    loader.load(
      "/lotus.glb",
      ({ scene: model }) => {
        if (disposed || contextLost) {
          disposeModel(model);
          return;
        }

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const group = new THREE.Group();
        model.position.sub(center);
        group.add(model);
        group.scale.setScalar(3 / Math.max(size.x, size.y, size.z));
        scene.add(group);
        scene.updateMatrixWorld(true);
        loadedModel = model;
        setLoadState("ready");
      },
      undefined,
      (error) => {
        if (!disposed) {
          console.error("Could not load lotus.glb", error);
          setLoadState("error");
        }
      },
    );

    let frame = 0;
    const render = (frameTime: number) => {
      if (contextLost) return;
      frame = window.requestAnimationFrame(render);
      if (!reducedMotion && previousFrameTime) {
        const delta = Math.min((frameTime - previousFrameTime) / 1000, 0.05);
        pointerEnergy *= Math.exp(-delta / 0.3);
        const targetStrength = pointerInside ? 0.38 + 0.62 * pointerEnergy : 0;
        const fadeTime = pointerInside ? 0.16 : 0.07;
        dispersion.value += (targetStrength - dispersion.value) * (1 - Math.exp(-delta / fadeTime));
        pointerPosition.value.lerp(pointerTarget, 1 - Math.exp(-delta / 0.09));
        dispersionDirection.value.lerp(directionTarget, 1 - Math.exp(-delta / 0.14)).normalize();
      }
      previousFrameTime = frameTime;
      renderer.setRenderTarget(flowerTarget);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.render(screenScene, screenCamera);
    };
    frame = window.requestAnimationFrame(render);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      hitImage.onload = null;
      hitImage.src = "";
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      if (loadedModel) disposeModel(loadedModel);
      screenGeometry.dispose();
      dispersionMaterial.dispose();
      flowerTarget.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="relative h-full w-full" role="img" aria-label="Pink lotus flower">
      <div ref={containerRef} className="h-full w-full" />
      {loadState === "loading" && (
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-zinc-600">
          Loading lotus…
        </p>
      )}
      {loadState === "error" && (
        <LotusFallback />
      )}
    </div>
  );
}
