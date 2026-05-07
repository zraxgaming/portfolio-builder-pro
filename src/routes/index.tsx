import { createFileRoute } from "@tanstack/react-router";
import config from "../config.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${config.identity.username} | ${config.identity.role}` },
      { name: "description", content: config.identity.tagline },
      { property: "og:title", content: `${config.identity.username} | ${config.identity.role}` },
      { property: "og:description", content: config.identity.tagline },
      { property: "og:image", content: config.identity.avatar },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Sora:wght@400;600;700;800&display=swap",
      },
      { rel: "icon", href: config.identity.avatar, type: "image/png" },
    ],
  }),
  component: Index,
});

function WindowBar({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="window-bar">
      <span className="dot dot-red" />
      <span className="dot dot-yellow" />
      <span className="dot dot-green" />
      <span className="window-title">
        {title}<span>{accent}</span>
      </span>
    </div>
  );
}

function Index() {
  const { identity, stats, about, skills, alsoKnow, mainProject, commissions, contact, footer } = config;

  return (
    <div>
      <header className="topbar">
        <div className="topbar-inner">
          <a href="#" className="topbar-logo">{identity.username}</a>
          <nav className="topbar-nav">
            <a href="#about">about</a>
            <a href="#portfolio">portfolio</a>
            <a href="#contact">contact</a>
          </nav>
        </div>
      </header>

      <main className="wrapper">
        {/* HERO */}
        <section id="hero" className="hero">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="status-row">
                <span className="status-dot" />
                <span className="status-text">{identity.status}</span>
              </div>
              <div className="hero-prompt">whoami</div>
              <h1 className="hero-name">
                {identity.username.split("_")[0]}
                <span className="hero-name-accent">{identity.username.includes("_") ? "_" + identity.username.split("_")[1] : ""}</span>
              </h1>
              <div className="hero-role">{identity.role}</div>
              <p className="hero-desc">
                <span className="kw-comment">/* {identity.tagline} */</span>
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">get in touch</a>
                <a href="#portfolio" className="btn btn-ghost">view work</a>
              </div>
            </div>

            <div className="hero-skin-panel">
              <div className="window skin-window">
                <WindowBar title="identity" accent=".card" />
                <div className="window-body">
                  <div className="profile-card">
                    <img src={identity.avatar} alt={identity.username} className="skin-img" />
                    <div className="profile-name">{identity.username}</div>
                    <div className="profile-handle">{identity.handle}</div>
                    <div className="profile-note">Founder @ {identity.studio}</div>
                    <div className="profile-chips">
                      {identity.chips.map((c) => <span key={c} className="profile-chip">{c}</span>)}
                    </div>
                  </div>
                </div>
                <div className="skin-meta">
                  {contact.items.slice(0, 2).map((c) => (
                    <a key={c.platform} href={c.url} className="profile-meta-link">{c.platform}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section id="stats">
          <div className="stats-row">
            {stats.map((s) => (
              <div key={s.label} className="stat-cell">
                <div className="stat-n">{s.value}</div>
                <div className="stat-l">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="section-label">about.md</div>
          <div className="about-grid">
            <div className="window">
              <WindowBar title="bio" accent=".txt" />
              <div className="window-body">
                <div className="about-bio">
<span className="kw-comment">// who is this guy?</span>{"\n"}
<span className="kw-fn">const</span> <span className="kw-var">developer</span> = {"{"}{"\n"}
{"  "}name: <span className="kw-string">"{about.developer.name}"</span>,{"\n"}
{"  "}alias: <span className="kw-string">"{about.developer.alias}"</span>,{"\n"}
{"  "}studio: <span className="kw-string">"{about.developer.studio}"</span>,{"\n"}
{"  "}focus: [{about.developer.focus.map((f, i) => (
  <span key={f}>
    <span className="kw-string">"{f}"</span>{i < about.developer.focus.length - 1 ? ", " : ""}
  </span>
))}],{"\n"}
{"  "}status: <span className="kw-string">"{about.developer.status}"</span>{"\n"}
{"}"};{"\n\n"}
<span className="kw-comment">/* {about.comment} */</span>
                </div>
                <div className="tech-group">
                  <div className="tech-group-label">// stack</div>
                  <div className="tags">
                    {about.stack.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>
            </div>

            <div className="window">
              <WindowBar title="skills" accent=".lst" />
              <div className="window-body">
                <div className="skills-list">
                  {skills.map((s) => (
                    <div key={s.name} className="skill-row">
                      <span className="skill-row-name">{s.name}</span>
                      <div className="skill-bar-track">
                        <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
                      </div>
                      <span className="skill-pct">{s.level}%</span>
                    </div>
                  ))}
                </div>
                <div className="tech-group">
                  <div className="tech-group-label">// also know</div>
                  <div className="tags">
                    {alsoKnow.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio">
          <div className="section-label">portfolio.json</div>
          <div className="window portfolio-window">
            <WindowBar title={mainProject.label.split(" | ")[0]} accent={" | " + (mainProject.label.split(" | ")[1] ?? "")} />
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
            <div className="featured-wrap">
              <div className="featured-label">// featured plugins</div>
              <div className="tags">
                {mainProject.featured.map((f) => <span key={f} className="tag">{f}</span>)}
              </div>
            </div>
          </div>

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
              <a href={commissions.ctaUrl} className="link-sm">{commissions.ctaLabel}</a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="section-label">contact.sh</div>
          <div className="window">
            <WindowBar title="reach_out" accent=".exe" />
            <div className="window-body">
              <div className="commissions-head">
                <span className="kw-comment">// {contact.intro}</span>
              </div>
              <div className="contact-grid">
                {contact.items.map((c) => (
                  <a key={c.platform} href={c.url} className="contact-item">
                    <div className="contact-icon">◆</div>
                    <div>
                      <div className="contact-text-platform">{c.platform}</div>
                      <div className="contact-text-handle">{c.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <div className="footer-left"><span>// </span>{footer.text}</div>
          <div className="footer-links">
            {footer.links.map((l) => <a key={l.label} href={l.url}>{l.label}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
}
