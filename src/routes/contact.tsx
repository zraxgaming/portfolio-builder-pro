import { createFileRoute } from "@tanstack/react-router";
import config from "../config.json";
import { WindowBar, SectionLabel } from "../components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${config.identity.name}` },
      { name: "description", content: `Get in touch with ${config.identity.name} for plugin development and server work.` },
      { property: "og:title", content: `Contact — ${config.identity.name}` },
      { property: "og:description", content: config.contact.intro },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { contact } = config;
  return (
    <section>
      <SectionLabel>contact.sh</SectionLabel>
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
  );
}
