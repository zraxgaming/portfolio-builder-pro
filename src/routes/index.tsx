import { createFileRoute, Link } from "@tanstack/react-router";
import config from "../config.json";
import { WindowBar } from "../components/site";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { identity, stats, contact } = config;
  const nameParts = (identity.name || "").trim().split(/\s+/);
  const firstName = nameParts[0] ?? "";
  const restName = nameParts.slice(1).join(" ");
  const chips = identity.chips ?? [];
  const items = stats ?? [];
  const contactItems = contact?.items ?? [];

  return (
    <>
      <section className="hero" style={{ paddingTop: 32 }}>
        <div className="hero-grid">
          <div>
            {identity.status && (
              <div className="status-row">
                <span className="status-dot" />
                <span className="status-text">{identity.status}</span>
              </div>
            )}
            <div className="hero-prompt">whoami</div>
            <h1 className="hero-name">
              {firstName}
              {restName && (
                <>
                  {" "}
                  <span className="hero-name-accent">{restName}</span>
                </>
              )}
            </h1>
            <div className="hero-role hero-cursor">{identity.role}</div>
            <p className="hero-desc">
              <span className="kw-comment">/* {identity.tagline} */</span>
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">get in touch</Link>
              <Link to="/portfolio" className="btn btn-ghost">view work</Link>
            </div>
          </div>

          <div className="hero-skin-panel">
            <div className="window skin-window">
              <WindowBar title="identity" accent=".card" />
              <div className="window-body">
                <div className="profile-card">
                  {identity.avatar && (
                    <img src={identity.avatar} alt={identity.name} className="skin-img" />
                  )}
                  <div className="profile-name">{identity.name}</div>
                  {identity.handle && <div className="profile-handle">{identity.handle}</div>}
                  {identity.studio && (
                    <div className="profile-note">Founder @ {identity.studio}</div>
                  )}
                  {chips.length > 0 && (
                    <div className="profile-chips">
                      {chips.map((c) => <span key={c} className="profile-chip">{c}</span>)}
                    </div>
                  )}
                </div>
              </div>
              {contactItems.length > 0 && (
                <div className="skin-meta">
                  {contactItems.slice(0, 2).map((c) => (
                    <a key={c.platform} href={c.url} className="profile-meta-link">{c.platform}</a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {items.length > 0 && (
        <section>
          <div
            className="stats-row"
            style={{ gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, 1fr)` }}
          >
            {items.map((s) => (
              <div key={s.label} className="stat-cell">
                <div className="stat-n">{s.value}</div>
                <div className="stat-l">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
