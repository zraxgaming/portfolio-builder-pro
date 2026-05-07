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
  const r = Math.max(0, Math.min(5, n || 0));
  return (
    <span className="stars">
      {"★".repeat(r)}
      <span style={{ color: "var(--border2)" }}>{"★".repeat(5 - r)}</span>
    </span>
  );
}

function PortfolioPage() {
  const { mainProject, projects = [], commissions } = config;
  return (
    <>
      <section>
        <SectionLabel>portfolio.json</SectionLabel>

        {mainProject && (
          <div className="window portfolio-window">
            <WindowBar title={mainProject.label?.split(" ")[0] ?? "main"} accent={` | ${mainProject.title}`} />
            <div className="portfolio-top">
              {mainProject.logo && (
                <div className="portfolio-img-side">
                  <img src={mainProject.logo} alt={mainProject.title} className="portfolio-logo" />
                </div>
              )}
              <div className="portfolio-info">
                <h3 className="portfolio-title">{mainProject.title}</h3>
                <p className="portfolio-desc">{mainProject.description}</p>
                {mainProject.stats?.length > 0 && (
                  <div className="portfolio-nums">
                    {mainProject.stats.map((s) => (
                      <div key={s.label}>
                        <div className="p-num-val">{s.value}</div>
                        <div className="p-num-lbl">{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                {mainProject.links?.length > 0 && (
                  <div className="hero-actions">
                    {mainProject.links.map((l) => (
                      <a key={l.label} href={l.url} className={`btn ${l.primary ? "btn-primary" : "btn-ghost"}`}>{l.label}</a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((p) => (
              <div key={p.name} className="window project-card">
                <WindowBar title={p.name.toLowerCase()} accent={` | ${p.brand}`} />
                <div className="project-body">
                  {p.image && <img src={p.image} alt={p.name} className="project-img" />}
                  <div className="project-content">
                    <div className="project-head">
                      <h4 className="project-name">{p.name}</h4>
                      {p.brand && <span className="project-brand">{p.brand}</span>}
                    </div>
                    {p.summary && <p className="project-summary">{p.summary}</p>}
                    {p.tags?.length > 0 && (
                      <div className="tags">
                        {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                      </div>
                    )}
                    {p.url && p.url !== "#" && (
                      <a href={p.url} className="link-sm">view project</a>
                    )}
                    {p.review && (
                      <div className="review-card">
                        <div className="review-head">
                          {p.review.reviewer?.avatar && (
                            <img src={p.review.reviewer.avatar} alt={p.review.reviewer.name} className="review-avatar" />
                          )}
                          <div className="review-meta">
                            <div className="review-name">{p.review.reviewer?.name}</div>
                            {p.review.reviewer?.handle && (
                              <div className="review-handle">{p.review.reviewer.handle}</div>
                            )}
                          </div>
                          <Stars n={p.review.rating} />
                        </div>
                        {p.review.text && <p className="review-text">"{p.review.text}"</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {commissions?.items?.length > 0 && (
        <section>
          <div className="window">
            <WindowBar title="commissions" accent=" | other projects" />
            <div className="commissions-wrap">
              {commissions.intro && (
                <div className="commissions-head">
                  <span className="kw-comment">// {commissions.intro}</span>
                </div>
              )}
              <div className="commissions-grid-fluid">
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
      )}
    </>
  );
}
