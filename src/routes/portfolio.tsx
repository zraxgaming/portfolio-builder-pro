import { createFileRoute } from "@tanstack/react-router";
import config from "../config.json";
import { WindowBar, SectionLabel } from "../components/site";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: `Portfolio — ${config.identity.name}` },
      { name: "description", content: `Selected projects, plugins and reviews by ${config.identity.name}.` },
      { property: "og:title", content: `Portfolio — ${config.identity.name}` },
      { property: "og:description", content: `Selected projects, plugins and reviews by ${config.identity.name}.` },
    ],
  }),
  component: PortfolioPage,
});

function Stars({ n }: { n: number }) {
  return <span className="stars">{"★".repeat(n)}<span style={{ color: "var(--border2)" }}>{"★".repeat(5 - n)}</span></span>;
}

function PortfolioPage() {
  const { mainProject, projects, commissions } = config;
  return (
    <>
      <section>
        <SectionLabel>portfolio.json</SectionLabel>

        <div className="window portfolio-window">
          <WindowBar title="leaf_studios" accent=" | main project" />
          <div className="portfolio-top">
            <div className="portfolio-img-side">
              <img src={mainProject.logo} alt={mainProject.title} className="portfolio-logo" />
            </div>
            <div className="portfolio-info">
              <h3 className="portfolio-title">{mainProject.title}</h3>
              <p className="portfolio-desc">{mainProject.description}</p>
              <div className="portfolio-nums">
                {mainProject.stats.map((s) => (
                  <div key={s.label}>
                    <div className="p-num-val">{s.value}</div>
                    <div className="p-num-lbl">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="hero-actions">
                {mainProject.links.map((l) => (
                  <a key={l.label} href={l.url} className={`btn ${l.primary ? "btn-primary" : "btn-ghost"}`}>{l.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((p) => (
            <div key={p.name} className="window project-card">
              <WindowBar title={p.name.toLowerCase()} accent={` | ${p.brand}`} />
              <div className="project-body">
                <img src={p.image} alt={p.name} className="project-img" />
                <div className="project-content">
                  <div className="project-head">
                    <h4 className="project-name">{p.name}</h4>
                    <span className="project-brand">{p.brand}</span>
                  </div>
                  <p className="project-summary">{p.summary}</p>
                  <div className="tags">
                    {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                  {p.url && p.url !== "#" && (
                    <a href={p.url} className="link-sm">view project</a>
                  )}
                  <div className="review-card">
                    <div className="review-head">
                      <img src={p.review.reviewer.avatar} alt={p.review.reviewer.name} className="review-avatar" />
                      <div className="review-meta">
                        <div className="review-name">{p.review.reviewer.name}</div>
                        <div className="review-handle">{p.review.reviewer.handle}</div>
                      </div>
                      <Stars n={p.review.rating} />
                    </div>
                    <p className="review-text">"{p.review.text}"</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="window">
          <WindowBar title="commissions" accent=" | other projects" />
          <div className="commissions-wrap">
            <div className="commissions-head">
              <span className="kw-comment">// {commissions.intro}</span>
            </div>
            <div className="commissions-grid">
              {commissions.items.map((c) => (
                <div key={c.title} className="commission-card">
                  <div className="commission-title">{c.title}</div>
                  <div className="commission-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
