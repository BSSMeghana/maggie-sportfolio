import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CaseStudyLaptopCarousel } from "@/components/case-study-laptop-carousel";
import { GibberLinkImageCarousel } from "@/components/gibberlink-image-carousel";
import { ReciMobileShowcase } from "@/components/reci-mobile-showcase";
import { getProject, projects } from "@/lib/projects";

import styles from "./project.module.css";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} | Meghana BSS`,
    description: project.subtitle,
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const usesEditorialSections = project.slug === "reci" || project.slug === "gibberlink" || project.slug === "socia" || project.slug === "drushti";
  const usesEditorialOverview = usesEditorialSections;
  const hasTransparentGallery = project.slug === "reci" || project.slug === "gibberlink" || project.slug === "socia" || project.slug === "drushti";
  const galleryClassName = `${styles.gallery} ${project.slug === "drushti" ? styles.mobileGallery : ""} ${project.slug === "reci" ? styles.reciGallery : ""} ${project.slug === "gibberlink" || project.slug === "socia" || project.slug === "drushti" ? styles.transparentGallery : ""}`;
  const renderGalleryImage = (image: (typeof project.gallery)[number], index: number) => {
    const isExplainedGibberLinkImage = project.slug === "gibberlink" && index > 0;
    const isExplainedSociaImage = project.slug === "socia" && index > 0;
    const isSociaImage = project.slug === "socia";
    const isExplainedReciMobileImage = project.slug === "reci" && index > 1;
    const isExplainedDrushtiImage = project.slug === "drushti";
    const hasExplanation = isExplainedGibberLinkImage || isExplainedSociaImage || isExplainedReciMobileImage || isExplainedDrushtiImage;

    return (
    <figure
      key={image.src}
      className={`${styles.galleryItem} ${hasExplanation ? styles.explainedGalleryItem : ""} ${isExplainedReciMobileImage ? styles.mobileFeatureItem : ""} ${isExplainedDrushtiImage ? styles.drushtiFeatureItem : ""}`}
      style={hasTransparentGallery ? undefined : { backgroundColor: index % 2 === 0 ? project.accent : "#ecebe6" }}
    >
      {isSociaImage ? (
        <span className={styles.sociaLaptopFrame}>
          <span className={styles.laptopScreen}>
            <span className={styles.laptopCamera} aria-hidden="true" />
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 92vw, 58vw" />
          </span>
          <span className={styles.laptopBase} aria-hidden="true"><span /></span>
        </span>
      ) : isExplainedDrushtiImage ? (
        <div className={`${styles.mobileDevice} ${styles.drushtiPhone}`}>
          <span className={styles.mobileDeviceScreen}>
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 62vw, 20vw" />
          </span>
        </div>
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          width={project.slug === "drushti" || isExplainedReciMobileImage ? 780 : 3024}
          height={project.slug === "drushti" || isExplainedReciMobileImage ? 1688 : 1964}
          sizes={project.slug === "drushti" || isExplainedReciMobileImage ? "(max-width: 700px) 72vw, 34vw" : "100vw"}
        />
      )}
      {hasExplanation && (
        <figcaption className={styles.galleryCaption}>
          <h3>{image.title}</h3>
          <p>{image.description}</p>
        </figcaption>
      )}
    </figure>
    );
  };
  const renderSociaLaptop = (image: (typeof project.gallery)[number]) => (
    <div className={styles.dashboardLaptop}>
      <span className={styles.laptopScreen}>
        <span className={styles.laptopCamera} aria-hidden="true" />
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 92vw, 50vw" />
      </span>
      <span className={styles.laptopBase} aria-hidden="true"><span /></span>
    </div>
  );
  const renderDrushtiPhone = (image: (typeof project.gallery)[number]) => (
    <div className={`${styles.mobileDevice} ${styles.drushtiPhone}`}>
      <span className={styles.mobileDeviceScreen}>
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 72vw, 20vw" />
      </span>
    </div>
  );

  return (
    <main className={`${styles.page} ${project.slug === "reci" ? styles.reciPage : ""} ${project.slug === "gibberlink" ? styles.gibberPage : ""} ${project.slug === "socia" ? styles.sociaPage : ""} ${project.slug === "drushti" ? styles.drushtiPage : ""}`}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Case study · {project.number}</p>
        <h1>{project.title}</h1>
        <p className={styles.subtitle}>{project.subtitle}</p>
        <div className={styles.meta}>
          <div>
            <span>Role</span>
            <p>{project.role}</p>
          </div>
          <div>
            <span>Year</span>
            <p>{project.year}</p>
          </div>
          <div>
            <span>Focus</span>
            <p>{project.technologies.slice(0, 3).join(", ")}</p>
          </div>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              View live site <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </section>

      <div
        className={`${styles.heroVisual} ${project.slug === "drushti" ? styles.heroVisualMobile : ""}`}
        style={project.slug === "drushti" ? undefined : { backgroundColor: project.accent }}
      >
        {project.slug === "drushti" ? (
          <div className={styles.phoneHero}>
            <div className={`${styles.mobileDevice} ${styles.drushtiPhone}`}>
              <span className={styles.mobileDeviceScreen}>
                <Image src="/drushti/eye11.jpeg" alt="Drushti retina upload screen" fill sizes="(max-width: 760px) 24vw, 16vw" />
              </span>
            </div>
            <div className={`${styles.mobileDevice} ${styles.drushtiPhone}`}>
              <span className={styles.mobileDeviceScreen}>
                <Image src={project.cover} alt={project.coverAlt} fill priority sizes="(max-width: 760px) 28vw, 19vw" />
              </span>
            </div>
            <div className={`${styles.mobileDevice} ${styles.drushtiPhone}`}>
              <span className={styles.mobileDeviceScreen}>
                <Image src="/drushti/eye6.jpeg" alt="Drushti vision test menu" fill sizes="(max-width: 760px) 24vw, 16vw" />
              </span>
            </div>
          </div>
        ) : project.heroVideo ? (
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={project.cover}
            aria-label={`${project.title} website preview`}
          >
            <source src={project.heroVideo} type="video/mp4" />
          </video>
          ) : (
            <Image src={project.cover} alt={project.coverAlt} fill priority sizes="100vw" className={styles.heroImage} />
          )}
      </div>

      {usesEditorialOverview ? (
        <section className={styles.reciOverview} aria-labelledby="overview-title">
          <h2 id="overview-title">Overview</h2>
          <div className={styles.reciOverviewCopy}>
            <p>{project.overview}</p>
            <div>
              <h3>Challenge</h3>
              <p>{project.challengeSummary ?? project.challenge}</p>
            </div>
            <div>
              <h3>Role</h3>
              <p>{project.contribution}</p>
            </div>
            <div>
              <h3>Impact</h3>
              <p>{project.outcome}</p>
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.intro} aria-label="Project overview">
          <h2>Overview</h2>
          <p>{project.overview}</p>
        </section>
      )}

      {project.slug === "reci" && <CaseStudyLaptopCarousel />}

      {usesEditorialSections && (
        <section className={styles.reciProblem} aria-labelledby="problem-title">
          <h2 id="problem-title">The Problem</h2>
          <p className={styles.reciProblemIntro}>{project.challenge}</p>
          {project.slug === "reci" && (
            <>
              <h3>Key Decisions</h3>
              <ol>
                {project.keyDecisions?.map((decision) => (
                  <li key={decision.title}>
                    <strong>{decision.title}</strong>
                    <span>— {decision.body}</span>
                  </li>
                ))}
              </ol>
            </>
          )}
        </section>
      )}

      {project.slug === "gibberlink" && (
        <section className={styles.gibberDashboard} aria-labelledby="dashboard-title">
          <div className={styles.dashboardLaptop}>
            <span className={styles.laptopScreen}>
              <span className={styles.laptopCamera} aria-hidden="true" />
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/Gibberlink/GLhomevideo-poster.jpg"
                aria-label="GibberLink dashboard walkthrough"
              >
                <source src="/Gibberlink/GLhomevideo.mp4" type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            </span>
            <span className={styles.laptopBase} aria-hidden="true"><span /></span>
          </div>
          <div className={styles.gibberDashboardCopy}>
            <h2 id="dashboard-title">The GibberLink dashboard</h2>
            <p>Designed to give founders an at-a-glance overview of their AI advisory team and task activity.</p>
            <ol>
              <li><strong>Overview cards</strong> display agent counts, active tasks, completed and failed jobs, revenue, and users.</li>
              <li><strong>Task performance</strong> compares completed and failed tasks across the week.</li>
              <li><strong>Agent usage distribution</strong> shows how activity is divided among executive roles such as CTO, CMO, CFO, and Legal.</li>
              <li><strong>Sidebar navigation</strong> connects the dashboard to idea onboarding, live discussions, and decision summaries.</li>
            </ol>
          </div>
        </section>
      )}

      {project.slug === "gibberlink" && <GibberLinkImageCarousel />}

      {project.slug === "socia" && project.gallery[0] && (
        <section className={styles.gibberDashboard} aria-labelledby="socia-workspace-title">
          {renderSociaLaptop(project.gallery[0])}
          <div className={styles.gibberDashboardCopy}>
            <h2 id="socia-workspace-title">One workspace for every channel</h2>
            <p>{project.detailBody}</p>
            <ol>
              <li><strong>Connect channels</strong> and see account status in one place.</li>
              <li><strong>Create and adapt posts</strong> with media tools and channel-specific previews.</li>
              <li><strong>Plan publishing</strong> across a shared calendar and scheduled workflow.</li>
            </ol>
          </div>
        </section>
      )}

      {project.slug === "socia" && (
        <section className={styles.gibberFeatureSequence} aria-label="Socia publishing workflow features">
          {project.gallery.slice(1).map((image, index) => (
            <article
              className={`${styles.gibberFeature} ${index % 2 === 1 ? styles.gibberFeatureReversed : ""}`}
              key={image.src}
            >
              {index % 2 === 1 && (
                <div className={styles.gibberFeatureCopy}>
                  <p className={styles.gibberFeatureNumber}>{String(index + 1).padStart(2, "0")}</p>
                  <h2>{image.title}</h2>
                  <p>{image.description}</p>
                </div>
              )}
              {renderSociaLaptop(image)}
              {index % 2 === 0 && (
                <div className={styles.gibberFeatureCopy}>
                  <p className={styles.gibberFeatureNumber}>{String(index + 1).padStart(2, "0")}</p>
                  <h2>{image.title}</h2>
                  <p>{image.description}</p>
                </div>
              )}
            </article>
          ))}
        </section>
      )}

      {project.slug === "drushti" && (
        <section className={`${styles.gibberFeatureSequence} ${styles.drushtiFeatureSequence}`} aria-label="Drushti mobile app features">
          {project.gallery.map((image, index) => (
            <article
              className={`${styles.gibberFeature} ${index % 2 === 1 ? styles.gibberFeatureReversed : ""}`}
              key={image.src}
            >
              {index % 2 === 1 && (
                <div className={styles.gibberFeatureCopy}>
                  <p className={styles.gibberFeatureNumber}>{String(index + 1).padStart(2, "0")}</p>
                  <h2>{image.title}</h2>
                  <p>{image.description}</p>
                </div>
              )}
              {renderDrushtiPhone(image)}
              {index % 2 === 0 && (
                <div className={styles.gibberFeatureCopy}>
                  <p className={styles.gibberFeatureNumber}>{String(index + 1).padStart(2, "0")}</p>
                  <h2>{image.title}</h2>
                  <p>{image.description}</p>
                </div>
              )}
            </article>
          ))}
        </section>
      )}

      {project.slug === "gibberlink" && (
        <section className={styles.gibberFeatureSequence} aria-label="GibberLink session and decision interfaces">
          <article className={styles.gibberFeature}>
            <div className={styles.dashboardLaptop}>
              <span className={styles.laptopScreen}>
                <span className={styles.laptopCamera} aria-hidden="true" />
                <Image src="/Gibberlink/GL11.png" alt="GibberLink live AI advisory session" fill sizes="(max-width: 760px) 92vw, 50vw" />
              </span>
              <span className={styles.laptopBase} aria-hidden="true"><span /></span>
            </div>
            <div className={styles.gibberFeatureCopy}>
              <p className={styles.gibberFeatureNumber}>01</p>
              <h2>Live Session</h2>
              <p>The <strong>Live Session</strong> screen is GibberLink&apos;s virtual boardroom, where specialized AI agents discuss a founder&apos;s business challenge. Each agent contributes a different perspective, responding to earlier points and surfacing tradeoffs that shape the discussion.</p>
              <p>In this example, the agents evaluate a proposed quarry lease. The Legal agent raises concerns about liability and contractual protections, the CFO considers rental costs and cash flow, and the CTO highlights infrastructure requirements. Their responses show how one decision can involve several connected business priorities.</p>
              <p>Role labels, colored indicators, and subtly tinted message cards help users distinguish speakers and follow the conversation. A session timer and live status provide context, while <strong>Pause, Debate, and Stop</strong> controls give founders ways to manage the session.</p>
              <p>The screen makes a multi-agent discussion readable and transparent, allowing founders to explore the perspectives behind a recommendation before moving to the decision summary.</p>
            </div>
          </article>

          <article className={`${styles.gibberFeature} ${styles.gibberFeatureReversed}`}>
            <div className={styles.gibberFeatureCopy}>
              <p className={styles.gibberFeatureNumber}>02</p>
              <h2>Decision Summary</h2>
              <p>The <strong>Decision Summary</strong> screen brings the AI boardroom discussion into a structured overview, helping founders review the outcome without revisiting the full conversation. It keeps the session agenda visible and organizes the findings into <strong>strengths, concerns, and an action plan</strong>.</p>
              <p>In this example, the summary reviews a granite quarry lease discussion. Strengths include agreement on contractual protections, operational requirements, and assigned responsibilities. Concerns highlight potential negotiation difficulties, infrastructure delays, budget pressure, and compliance dependencies.</p>
              <p>The two-column layout places strengths and concerns side by side, making tradeoffs easy to compare. Green checkmarks distinguish positive findings, while orange indicators draw attention to unresolved risks. A numbered action-plan section below provides a clear sequence for reviewing the proposed follow-up items.</p>
              <p>This screen connects discussion with planning, giving founders a consolidated reference for considering their next steps.</p>
            </div>
            <div className={styles.dashboardLaptop}>
              <span className={styles.laptopScreen}>
                <span className={styles.laptopCamera} aria-hidden="true" />
                <Image src="/Gibberlink/GL12.png" alt="GibberLink AI decision summary and action plan" fill sizes="(max-width: 760px) 92vw, 50vw" />
              </span>
              <span className={styles.laptopBase} aria-hidden="true"><span /></span>
            </div>
          </article>
        </section>
      )}

      {project.slug === "gibberlink" && (
        <section className={`${styles.reciProblem} ${styles.gibberKeyDecisions}`} aria-labelledby="key-decisions-title">
          <h3 id="key-decisions-title">Key Decisions</h3>
          <ol>
            {project.keyDecisions?.map((decision) => (
              <li key={decision.title}>
                <strong>{decision.title}</strong>
                <span>— {decision.body}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {project.slug === "gibberlink" && (
        <section className={`${styles.reciOverview} ${styles.gibberOutcomes}`} aria-labelledby="gibber-outcomes-title">
          <h2 id="gibber-outcomes-title">The Outcomes</h2>
          <div className={styles.reciOverviewCopy}>
            <p>GibberLink connects startup onboarding, AI advisory discussions, and decision summaries in one working prototype. Founders can define their business context, select an advisory team, and explore challenges from multiple executive perspectives.</p>
            <p>The platform organizes discussions into strengths, concerns, and proposed next steps. PDF export and AI-generated deliverables extend the experience from reviewing recommendations to preparing practical outputs.</p>
            <p>The result is a complete journey from introducing a business idea to reviewing an action plan. Improvements in decision quality, founder confidence, and time savings remain to be validated through user testing.</p>
          </div>
        </section>
      )}

      {project.slug === "reci" && <ReciMobileShowcase />}

      {!usesEditorialSections && <section className={styles.story}>
        <article>
          <p className={styles.sectionNumber}>01</p>
          <h2>The challenge</h2>
          <p>{project.challenge}</p>
        </article>
      </section>}

      {!usesEditorialSections && project.gallery[0] && (
        <section className={`${galleryClassName} ${styles.singleGallery}`} aria-label={`${project.title} challenge interface`}>
          {renderGalleryImage(project.gallery[0], 0)}
        </section>
      )}

      {!usesEditorialSections && <section className={styles.story}>
        <article>
          <p className={styles.sectionNumber}>02</p>
          <h2>My contribution</h2>
          <p>{project.contribution}</p>
        </article>
      </section>}

      {!usesEditorialSections && project.gallery[1] && (
        <section className={`${galleryClassName} ${styles.singleGallery}`} aria-label={`${project.title} contribution interface`}>
          {renderGalleryImage(project.gallery[1], 1)}
        </section>
      )}

      {!usesEditorialSections && project.detailTitle && project.detailBody && (
        <section className={styles.projectDetail}>
          <p className={styles.detailLabel}>How it works</p>
          <h2>{project.detailTitle}</h2>
          <p>{project.detailBody}</p>
        </section>
      )}

      {!usesEditorialSections && project.gallery.length > 2 && (
        <section className={`${galleryClassName} ${project.slug === "reci" ? styles.reciMobileGrid : ""} ${project.slug === "drushti" ? styles.drushtiGalleryGrid : ""}`} aria-label={`${project.title} interface gallery`}>
          {project.gallery.slice(2).map((image, index) => renderGalleryImage(image, index + 2))}
        </section>
      )}

      {project.slug === "socia" && project.keyDecisions && (
        <section className={`${styles.reciProblem} ${styles.sociaDecisions}`} aria-labelledby="socia-decisions-title">
          <h3 id="socia-decisions-title">Key Decisions</h3>
          <ol>
            {project.keyDecisions.map((decision) => (
              <li key={decision.title}>
                <strong>{decision.title}</strong>
                <span>— {decision.body}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {project.slug === "drushti" && project.keyDecisions && (
        <section className={`${styles.reciProblem} ${styles.gibberKeyDecisions}`} aria-labelledby="drushti-decisions-title">
          <h3 id="drushti-decisions-title">Key Decisions</h3>
          <ol>
            {project.keyDecisions.map((decision) => (
              <li key={decision.title}>
                <strong>{decision.title}</strong>
                <span>— {decision.body}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {project.slug === "socia" && (
        <section className={`${styles.reciOverview} ${styles.gibberOutcomes}`} aria-labelledby="socia-outcomes-title">
          <h2 id="socia-outcomes-title">The Outcomes</h2>
          <div className={styles.reciOverviewCopy}>
            <p>{project.outcome}</p>
            <p>{project.detailBody}</p>
          </div>
        </section>
      )}

      {project.slug === "drushti" && (
        <section className={`${styles.reciOverview} ${styles.gibberOutcomes}`} aria-labelledby="drushti-outcomes-title">
          <h2 id="drushti-outcomes-title">The Outcomes</h2>
          <div className={styles.reciOverviewCopy}>
            <p>{project.outcome}</p>
            <p>Guided screening, voice assistance, educational resources, and short exercises bring prevention and eye-care learning into one approachable mobile experience.</p>
          </div>
        </section>
      )}

      {!usesEditorialSections && <section className={styles.outcome}>
        <p className={styles.sectionNumber}>03</p>
        <h2>Outcome</h2>
        <p>{project.outcome}</p>
        <ul aria-label="Technologies used">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </section>}

      {project.slug !== "reci" && (
        <Link className={styles.nextProject} href={`/work/${nextProject.slug}`}>
          <span>Next project</span>
          <strong>{nextProject.title}</strong>
          <span aria-hidden="true">↗</span>
        </Link>
      )}
    </main>
  );
}
