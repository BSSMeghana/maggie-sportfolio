export type Project = {
  slug: "reci" | "gibberlink" | "socia" | "drushti";
  number: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  cover: string;
  coverAlt: string;
  heroVideo?: string;
  accent: string;
  liveUrl?: string;
  overview: string;
  challenge: string;
  challengeSummary?: string;
  keyDecisions?: readonly { title: string; body: string }[];
  contribution: string;
  detailTitle?: string;
  detailBody?: string;
  outcome: string;
  technologies: readonly string[];
  gallery: readonly { src: string; alt: string; title?: string; description?: string }[];
};

export const projects: readonly Project[] = [
  {
    slug: "reci",
    number: "01",
    title: "Reci",
    subtitle: "Recipe discovery through ingredients and cravings",
    role: "Full-stack Developer & Designer",
    year: "2026",
    cover: "/reci/reci1.jpeg",
    coverAlt: "Reci landing page with playful 3D food models",
    heroVideo: "/reci/recivideo.mp4",
    accent: "#e7f31f",
    liveUrl: "https://reci-puce.vercel.app",
    overview:
      "Reci is a recipe discovery app that helps people find Indian recipes by ingredients, dish names, or cravings. Filters for dietary preference, cuisine, meal type, mood, and dish type make it easier to narrow the results, while playful 3D food visuals give the experience a distinctive identity.",
    challenge:
      "Finding a recipe can be frustrating when you have ingredients on hand or a craving in mind but don’t know the exact dish to search for. Many recipe platforms focus on specific names, leaving people to sift through results that may not fit their dietary preferences, cuisine, or meal. Reci makes discovery more flexible by connecting ingredients and broad cravings to relevant recipes.",
    challengeSummary:
      "People may know their ingredients or cravings without knowing the exact dish name. Reci makes recipe discovery more flexible by connecting those starting points to relevant results.",
    keyDecisions: [
      { title: "Support flexible discovery", body: "Let users search by ingredients, dish names, and broad cravings so they don’t need an exact recipe name." },
      { title: "Make preferences easy to combine", body: "Add filters for dietary preference, cuisine, meal type, mood, and dish type." },
      { title: "Use layered recommendations", body: "Search the local recipe collection first, broaden related terms, then use the recommendation model when needed." },
      { title: "Keep recipe details together", body: "Show ingredients, metadata, and instructions with each result; enrich details from TheMealDB when available." },
      { title: "Give the product a playful identity", body: "Pair the practical search experience with interactive 3D food visuals." },
    ],
    contribution:
      "I designed and built Reci end to end, including the visual direction, responsive interface, recipe search and filters, frontend-to-backend integration, recommendation logic, and interactive 3D food visuals.",
    detailTitle: "From craving to recipe",
    detailBody:
      "Users can start with an ingredient or craving, then refine recommendations by dietary preference, cuisine, meal type, mood, and dish type. Results keep useful recipe information visible at a glance, while collapsible instructions let people explore the method when they are ready to cook.",
    outcome:
      "Reci brings ingredient and craving-based search together with filters for dietary preference, cuisine, meal type, mood, and dish type. Recipe details stay easy to scan, with instructions available when people are ready to cook.",
    technologies: ["React", "Python", "Flask", "Pandas", "Scikit-learn", "Three.js", "React Three Fiber"],
    gallery: [
      { src: "/reci/reci2.jpeg", alt: "Reci animated food carousel" },
      { src: "/reci/reci3.jpeg", alt: "Reci recipe search and filter interface" },
      {
        src: "/reci/recimbl1.jpeg",
        alt: "Reci mobile landing and filter experience",
        title: "Discover and refine",
        description: "The mobile landing flow keeps the playful food showcase while reorganizing the discovery filters and ingredient search into a comfortable single-column experience.",
      },
      {
        src: "/reci/recimbl2.jpeg",
        alt: "Reci mobile recipe results",
        title: "Scan useful recipe matches",
        description: "Recipe cards surface cuisine, meal type, mood, diet, and ingredients first, with instructions collapsed until the user wants to explore the cooking method.",
      },
      {
        src: "/reci/recimbl3.jpeg",
        alt: "Reci mobile project information",
        title: "Explain the product clearly",
        description: "The responsive project overview communicates Reci’s purpose, technical foundation, and interface decisions in a readable format designed for smaller screens.",
      },
    ],
  },
  {
    slug: "gibberlink",
    number: "02",
    title: "GibberLink",
    subtitle: "An agentic AI advisory room for startup decisions",
    role: "Frontend Developer",
    year: "2026",
    cover: "/Gibberlink/GL1.jpeg",
    coverAlt: "GibberLink landing page for an AI co-founder platform",
    heroVideo: "/Gibberlink/GLvideo.mp4",
    accent: "#b9f52f",
    overview:
      "GibberLink is an agentic AI platform created for HackAP Hackathon 2026. Founders describe a startup decision, assemble a group of virtual executives, and watch the agents debate before receiving a structured strategy and action plan.",
    challenge:
      "A multi-agent system produces a large amount of information across setup, discussion, analysis, and execution. The frontend needed to make that complex process understandable and keep users oriented as the agents moved from debate to a final decision.",
    challengeSummary:
      "Founders need to follow a complex multi-agent process and understand how a discussion becomes a clear recommendation and action plan.",
    keyDecisions: [
      { title: "Guide founders through setup", body: "Collect the decision context before a session so the executive team can respond to a clear question." },
      { title: "Make executive selection intentional", body: "Let founders choose the virtual executives whose perspectives fit the decision." },
      { title: "Keep the live discussion readable", body: "Present agent contributions as a clear conversation and make session progress easy to follow." },
      { title: "Structure the recommendation", body: "Bring the viability assessment, key concerns, and strategy into a scannable decision summary." },
      { title: "Connect decisions to next steps", body: "Turn recommendations into practical tasks founders can review and execute." },
    ],
    contribution:
      "As the frontend developer, I implemented the product interface across the landing page, onboarding flow, executive selection, live discussion, decision summary, analytics, and task execution views. I focused on responsive behavior, clear system states, and translating agent activity into readable UI.",
    outcome:
      "The interface turns a technical orchestration workflow into a guided product journey, giving founders a clear path from an initial question to a viability assessment, key concerns, and practical next steps.",
    technologies: ["React", "TypeScript", "Responsive UI", "Agentic AI Interface", "Dashboard Design"],
    gallery: [
      { src: "/Gibberlink/GL4.jpeg", alt: "GibberLink startup dashboard" },
      {
        src: "/Gibberlink/GL6.png",
        alt: "GibberLink guided onboarding step",
        title: "Guided idea setup",
        description: "A focused onboarding flow helps founders describe the decision they need to make and gives the agent team enough context to begin the session.",
      },
      {
        src: "/Gibberlink/GL10.png",
        alt: "GibberLink meeting setup",
        title: "Build the advisory room",
        description: "Users select the virtual executives needed for the discussion, making each meeting relevant to the startup question and its business context.",
      },
      {
        src: "/Gibberlink/GL11.png",
        alt: "GibberLink live multi-agent discussion",
        title: "Follow the live debate",
        description: "The discussion view turns agent activity into a readable conversation so founders can understand competing perspectives as the recommendation develops.",
      },
      {
        src: "/Gibberlink/GL12.png",
        alt: "GibberLink decision summary and action plan",
        title: "Turn decisions into action",
        description: "A structured summary brings together the final recommendation, viability signals, concerns, and practical next steps in one scannable view.",
      },
    ],
  },
  {
    slug: "socia",
    number: "03",
    title: "Socia",
    subtitle: "Social media management in one workspace",
    role: "UI/UX Designer & Frontend Developer",
    year: "2026",
    cover: "/socia/socia1.png",
    coverAlt: "Socia social media management landing page",
    accent: "#d9c9ff",
    liveUrl: "https://socialmedia-managementtool.vercel.app/Home",
    overview:
      "Socia is a multi-platform publishing workspace for creators and teams managing several social channels. It brings drafting, media editing, channel-specific previews, scheduling, publishing, and performance tracking into one flow—while still accounting for each platform’s formats and publishing requirements.",
    challenge:
      "Publishing one idea across multiple networks is rarely just copy and paste. Each channel has its own media ratios, post types, rules, and audience conventions; creators often move between tools to adapt assets, check previews, and coordinate timing. Socia needed to reduce that repetition without forcing every post into a generic format.",
    challengeSummary:
      "Creators need one place to adapt each post to different channel formats and rules without repeating the work or flattening each platform’s conventions.",
    contribution:
      "I designed the information architecture and visual system, then developed the responsive frontend for account connections, content creation, media editing, platform previews, AI-assisted writing, scheduling, calendar planning, and performance views. I also integrated the interface with backend services for authentication, media, posts, and publishing.",
    detailTitle: "From draft to distribution",
    detailBody:
      "The central workflow keeps channel selection, copy, media, previews, and timing together. Creators can start with an idea, adapt its assets for each destination, review a platform-specific preview, then publish or schedule it. Behind the interface, media rendering and scheduled publishing run as background jobs, keeping longer operations separate from the editing flow.",
    keyDecisions: [
      { title: "Keep creation flexible", body: "Offer templates, uploads, text, and visual controls so creators can shape a post around its message and media." },
      { title: "Make each destination visible", body: "Show platform-specific options and previews before publishing, so differences in format are part of the workflow." },
      { title: "Separate planning from publishing", body: "Let creators schedule and review upcoming posts while background workers handle media rendering and delivery." },
    ],
    outcome:
      "The result is an end-to-end workspace for moving from an initial idea to platform-ready posts. Account status, tailored previews, validation, and calendar planning help creators see what is connected, what each post will look like, and when it is set to go out.",
    technologies: ["Next.js", "React", "TypeScript", "Figma", "NestJS APIs", "Responsive Design"],
    gallery: [
      {
        src: "/socia/socia6.jpeg",
        alt: "Socia connected accounts dashboard",
        title: "See every connected channel",
        description: "The workspace brings connected social accounts together, giving creators one starting point for composing, reviewing, and planning content across their channels.",
      },
      {
        src: "/socia/socia7.jpeg",
        alt: "Socia visual content editor",
        title: "Create in one workspace",
        description: "The editor brings text, media, templates, and visual controls into one focused workspace so creators can build a post without switching tools.",
      },
      {
        src: "/socia/socia10.jpeg",
        alt: "Socia platform post preview",
        title: "Preview every platform",
        description: "Platform-specific previews show how the same idea will appear across connected channels, helping creators catch content and layout issues before publishing.",
      },
      {
        src: "/socia/socia11.jpeg",
        alt: "Socia cross-platform crop editor",
        title: "Adapt media quickly",
        description: "A dedicated crop flow handles different social media ratios while keeping the original asset and its focal point visible across formats.",
      },
      {
        src: "/socia/socia14.png",
        alt: "Socia content calendar",
        title: "Plan the publishing schedule",
        description: "The calendar brings scheduled content into a clear timeline, making it easier to review upcoming posts and maintain a consistent publishing rhythm.",
      },
    ],
  },
  {
    slug: "drushti",
    number: "04",
    title: "Drushti",
    subtitle: "Accessible eye-care screening on mobile",
    role: "Frontend Developer & Team Lead",
    year: "2025",
    cover: "/drushti/eye3.jpeg",
    coverAlt: "Drushti mobile eye-care news homepage",
    accent: "#dceaff",
    overview:
      "Drushti is a mobile eye-care application that combines preliminary retina screening, at-home vision checks, educational resources, and interactive eye exercises in one approachable experience.",
    challengeSummary:
      "People need approachable ways to check common eye-health concerns and understand their next steps, but screening can feel clinical or difficult to navigate on a phone.",
    challenge:
      "Eye-care information and early screening tools are often difficult to access outside clinical settings. The team needed a phone-first interface that could guide non-specialists through several different tasks while communicating results responsibly.",
    contribution:
      "As team lead and frontend developer, I guided the product’s frontend direction and built its navigation, responsive layouts, questionnaire, vision tests, retina upload flow, result presentation, voice assistance, educational content, games, and shareable PDF report experience.",
    keyDecisions: [
      { title: "Start with a guided check-in", body: "Collect basic profile details and common risk indicators, while letting users skip the questionnaire if they want to explore first." },
      { title: "Give each vision test a clear entry point", body: "Separate distance, near, pediatric, and color checks so users can quickly find the assessment they need." },
      { title: "Explain retina screening before upload", body: "Show image guidance and the steps from capture through prediction, result review, and PDF sharing." },
      { title: "Support learning beyond screening", body: "Bring voice assistance, eye-health resources, and short visual exercises into the same app." },
    ],
    outcome:
      "The mobile experience provides a clear entry point to eye-care awareness and preliminary screening, while its guidance and medical disclaimers direct users toward professional evaluation when needed.",
    technologies: ["React Native", "Expo", "TypeScript", "Expo Router", "Axios", "Expo Speech"],
    gallery: [
      {
        src: "/drushti/eye2.jpeg",
        alt: "Drushti eye-health questionnaire",
        title: "Begin with a guided eye-health check-in",
        description: "The onboarding questionnaire collects basic profile information and common risk indicators such as discomfort, blurred vision, diabetes, high blood pressure, and dry-eye symptoms. Clear response chips keep the screening approachable, while the option to skip respects users who want to explore the application first.",
      },
      {
        src: "/drushti/eye6.jpeg",
        alt: "Drushti vision test menu",
        title: "Choose the right vision check",
        description: "A focused test menu separates distance, near, pediatric, and color-vision checks into clear entry points. The persistent navigation keeps screening, retina upload, exercises, and home-care resources accessible without making users retrace their steps.",
      },
      {
        src: "/drushti/eye7.jpeg",
        alt: "Drushti distance vision test",
        title: "Guide users through distance testing",
        description: "The distance test gives placement instructions before presenting a simple directional reading task. Large Can Read and Cannot Read controls reduce interaction effort, helping another person assist with the test while the phone remains positioned away from the user.",
      },
      {
        src: "/drushti/eye11.jpeg",
        alt: "Drushti retina image upload",
        title: "Make retina screening understandable",
        description: "The upload flow explains the complete path from selecting or capturing a well-lit retina photo to prediction, result review, and PDF sharing. Two prominent actions support both existing images and direct camera capture while visual guidance sets expectations before upload.",
      },
      {
        src: "/drushti/eye14.jpeg",
        alt: "Drushti color exercise game",
        title: "Support engagement through visual exercises",
        description: "The color exercise turns visual discrimination into a short ten-round activity. A clear score, large color tiles, and immediate progression create an accessible interaction that encourages users to engage with eye-care concepts beyond formal screening flows.",
      },
    ],
  },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
