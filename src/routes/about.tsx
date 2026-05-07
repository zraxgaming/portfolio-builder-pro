import { createFileRoute } from "@tanstack/react-router";
import config from "../config.json";
import { WindowBar, SectionLabel } from "../components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${config.identity.name}` },
      { name: "description", content: `About ${config.identity.name}, ${config.identity.role} and founder of ${config.identity.studio}.` },
      { property: "og:title", content: `About — ${config.identity.name}` },
      { property: "og:description", content: config.about.comment },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { about } = config;
  return (
    <section>
      <SectionLabel>about.md</SectionLabel>
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
              {about.skills.map((s) => (
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
                {about.alsoKnow.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
