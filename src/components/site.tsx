import { Link } from "@tanstack/react-router";
import config from "@/config.json";

export function SiteHeader() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="topbar-logo">{config.identity.username}</Link>
        <nav className="topbar-nav">
          {config.nav.map((n) => (
            <Link key={n.to} to={n.to} activeProps={{ className: "active" }}>{n.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-left"><span>// </span>{config.footer.text}</div>
        <div className="footer-links">
          {config.footer.links.map((l) => <a key={l.label} href={l.url}>{l.label}</a>)}
        </div>
      </div>
    </footer>
  );
}

export function WindowBar({ title, accent }: { title: string; accent: string }) {
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

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label">{children}</div>;
}
