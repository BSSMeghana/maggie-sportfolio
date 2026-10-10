import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readProjectFile = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("Next.js App Router foundation is configured", async () => {
  const [layout, page, config] = await Promise.all([
    readProjectFile("app/layout.tsx"),
    readProjectFile("app/page.tsx"),
    readProjectFile("next.config.ts"),
  ]);

  assert.match(layout, /export default function RootLayout/);
  assert.match(page, /export default function Home/);
  assert.match(config, /NextConfig/);
});

test("hero page has an accessible main landmark", async () => {
  const [page, preview] = await Promise.all([
    readProjectFile("app/page.tsx"),
    readProjectFile("components/stack-preview.tsx"),
  ]);

  assert.match(page, /<StackPreview/);
  assert.match(preview, /<main/);
  assert.match(preview, /<h1/);
  assert.match(preview, /sr-only">Meghana BSS — UI\/UX Designer and Frontend Developer/);
});

test("global styles include the requested light background and responsive behavior", async () => {
  const styles = await readProjectFile("app/globals.css");

  assert.match(styles, /color-scheme:\s*light/);
  assert.match(styles, /--background:\s*#fefdf8/i);
  assert.match(styles, /@media \(max-width:/);
  assert.match(styles, /prefers-reduced-motion/);
});

test("header typography does not require a network font download", async () => {
  const [header, styles] = await Promise.all([
    readProjectFile("components/header.tsx"),
    readProjectFile("components/header.module.css"),
  ]);

  assert.doesNotMatch(header, /next\/font\/google/);
  assert.match(styles, /font-family:\s*[^;]*(?:system-ui|Arial|sans-serif)/);
  assert.match(styles, /height:\s*30px/);
  assert.match(styles, /\.brand,\s*\n\.link[\s\S]*?font-size:\s*14px/);
});

test("hero accounts for the compact header height", async () => {
  const styles = await readProjectFile("components/stack-preview.module.css");

  assert.match(styles, /min-height:\s*calc\(100svh - 30px\)/);
});

test("pages do not render decorative vertical background lines", async () => {
  const sources = await Promise.all([
    readProjectFile("components/stack-preview.tsx"),
    readProjectFile("components/projects-section.tsx"),
    readProjectFile("components/footer.tsx"),
    readProjectFile("app/about/page.tsx"),
    readProjectFile("app/work/[slug]/page.tsx"),
  ]);

  for (const source of sources) {
    assert.doesNotMatch(source, /BackgroundLines|background-lines/);
  }
});

test("the requested frontend stack is configured", async () => {
  const [packageJson, postcss, styles] = await Promise.all([
    readProjectFile("package.json"),
    readProjectFile("postcss.config.mjs"),
    readProjectFile("app/globals.css"),
  ]);
  const manifest = JSON.parse(packageJson);

  assert.ok(manifest.dependencies.motion);
  assert.ok(manifest.dependencies["lucide-react"]);
  assert.ok(manifest.devDependencies.tailwindcss);
  assert.ok(manifest.devDependencies["@tailwindcss/postcss"]);
  assert.match(postcss, /@tailwindcss\/postcss/);
  assert.match(styles, /@import\s+["']tailwindcss["']/);
});

test("hero shows a stationary lotus with RGB hover", async () => {
  const [hero, styles, model] = await Promise.all([
    readProjectFile("components/stack-preview.tsx"),
    readProjectFile("components/stack-preview.module.css"),
    readProjectFile("components/lotus-model.tsx"),
  ]);

  assert.match(hero, /<LotusModel\s*\/>/);
  assert.match(hero, /Meghana BSS — UI\/UX Designer and Frontend Developer/);
  assert.match(hero, /<textPath[^>]+href="#creative-title-curve"/);
  assert.match(hero, />\s*CREATIVE DEVELOPER\s*<\/textPath>/);
  assert.match(hero, /preserveAspectRatio="none"/);
  assert.match(hero, /viewBox="0 0 1200 190"/);
  assert.match(hero, /d="M -70 170 Q 600 130 1270 170"/);
  assert.doesNotMatch(hero, /MarqueeSequence|marqueeTrack|UI\/UX DESIGNER × FRONTEND DEVELOPER/);
  assert.match(hero, /Hey, I&apos;m Meghana\./);
  assert.match(hero, /I design and build thoughtful digital experiences/);
  assert.match(hero, /Design meets development\./);
  assert.match(hero, /From early sketches to final pixels/);
  assert.doesNotMatch(hero, /\/hero\/|<Image/);
  assert.match(styles, /\.creativeBanner[\s\S]*?background:\s*#242424/);
  assert.match(styles, /height:\s*clamp\(96px, 10vw, 154px\)/);
  assert.match(styles, /top:\s*clamp\(174px, 23vh, 238px\)/);
  assert.match(styles, /bottom:\s*calc\(var\(--lotus-size\) \* -0\.24\)/);
  assert.match(styles, /@media \(min-width: 801px\) and \(max-height: 650px\)/);
  assert.match(styles, /min-height:\s*max\(calc\(100svh - 30px\), 680px\)/);
  assert.match(styles, /\.creativeTitleSvg\s*\{[\s\S]*?width:\s*180%;[\s\S]*?left:\s*-40%/);
  assert.doesNotMatch(styles, /@keyframes scroll-left|animation:\s*scroll-left/);
  assert.match(styles, /overflow-x:\s*clip/);
  assert.match(styles, /--lotus-size:\s*min\(80vw, calc\(100svh - 80px\), 1050px\)/);
  assert.match(styles, /--lotus-size:\s*min\(88vw, max\(300px, calc\(100svh - 260px\)\), 500px\)/);
  assert.doesNotMatch(styles, /@keyframes fall-into-place/);
  assert.doesNotMatch(model, /OrbitControls|autoRotate|MeshPhysicalMaterial|transmission:/);
  assert.doesNotMatch(model, /createWaterNormalMap|waterNormalMap|uTime/);
  assert.match(model, /uDispersion/);
  assert.doesNotMatch(styles, /@keyframes scroll-up|@keyframes scroll-down/);
  assert.match(styles, /prefers-reduced-motion/);
});

test("hero shows compact location and availability metadata", async () => {
  const [hero, styles] = await Promise.all([
    readProjectFile("components/stack-preview.tsx"),
    readProjectFile("components/stack-preview.module.css"),
  ]);

  assert.match(hero, /VIZAG, INDIA/);
  assert.match(hero, /className=\{styles\.availabilityDot\}/);
  assert.match(hero, /AVAILABLE/);
  assert.match(styles, /\.bottomDetails[\s\S]*?font-size:\s*clamp\(11px, 1vw, 16px\)/);
  assert.match(styles, /\.availabilityDot[\s\S]*?background:\s*#39d353/);
  assert.match(styles, /@keyframes availability-pulse/);
});

test("primary portfolio contact actions point to real destinations", async () => {
  const [header, footer] = await Promise.all([
    readProjectFile("components/header.tsx"),
    readProjectFile("components/footer.tsx"),
  ]);

  assert.match(header, /href:\s*"\/bss_meghana_resume\.pdf"/);
  assert.match(header, /download:\s*true/);
  assert.match(footer, /href="mailto:meghana\.bantubilli@gmail\.com"/);
  assert.match(footer, /href="https:\/\/www\.linkedin\.com\/in\/bantubilli-sai-siva-meghana"/);
  assert.match(footer, /href="https:\/\/github\.com\/BSSMeghana"/);
});

test("the public resume is a valid PDF", async () => {
  const resume = await readFile(
    new URL("../public/bss_meghana_resume.pdf", import.meta.url),
  );

  assert.equal(resume.subarray(0, 4).toString(), "%PDF");
});

test("mobile footer reserves a separate grid cell for back to top", async () => {
  const styles = await readProjectFile("components/footer.module.css");

  assert.match(
    styles,
    /@media \(max-width: 800px\)[\s\S]*?\.backToTop\s*\{[\s\S]*?position:\s*static;/,
  );
});
