import React, { useState, useEffect, useRef } from "react";

const PHOTO = "PASTE_YOUR_IMAGE_URL_OR_BASE64_HERE";

const SKILLS = [
  { name: "JavaScript (ES6+)", level: 95 },
  { name: "React", level: 82 },
  { name: "Node.js", level: 85 },
  { name: "HTML & CSS", level: 90 },
  { name: "Game logic & canvas", level: 70 },
  { name: "Git & deployment", level: 65 },
];

const PROJECTS = [
  {
    tag: "Web App",
    title: "Add your first app here",
    blurb:
      "Swap this card for a real project — what it does, the problem it solves, and the JavaScript/Node.js underneath it.",
    stack: ["JavaScript", "React", "Node.js"],
  },
  {
    tag: "Website",
    title: "Add a site you've built",
    blurb:
      "A landing page, a client site, a redesign — whatever you're proud to show. Replace this placeholder text with the story.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    tag: "Game",
    title: "Add a game you've made",
    blurb:
      "Browser games are a great way to show off JS logic. Drop in the name, a short description, and how it plays.",
    stack: ["JavaScript", "Canvas"],
  },
];

function useOnScreen(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function TypeLine() {
  const words = ["apps.", "websites.", "games.", "ideas."];
  const [wordIdx, setWordIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && display.length < current.length) {
      timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 75);
    } else if (!deleting && display.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && display.length > 0) {
      timeout = setTimeout(() => setDisplay(current.slice(0, display.length - 1)), 40);
    } else if (deleting && display.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, deleting, wordIdx]);

  return (
    <span className="type-word">
      {display}
      <span className="type-cursor">|</span>
    </span>
  );
}

export default function Portfolio() {
  const [navOpen, setNavOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [year] = useState(new Date().getFullYear());

  const sections = ["About", "Skills", "Projects", "Contact"];

  const scrollTo = (id) => {
    setNavOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800&family=Rajdhani:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .pf-root {
          --bg: #060613;
          --bg2: #0A0B1E;
          --panel: rgba(255,255,255,0.035);
          --panel-border: rgba(140,160,255,0.16);
          --cyan: #2FE6E0;
          --magenta: #FF3DAE;
          --violet: #8B6BFF;
          --text: #F1F2FA;
          --text-dim: #8B90AE;
          position: relative;
          background: var(--bg);
          color: var(--text);
          font-family: 'Rajdhani', sans-serif;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          line-height: 1.5;
        }
        .pf-root * { box-sizing: border-box; }
        .pf-root h1, .pf-root h2, .pf-root h3 { font-family: 'Orbitron', sans-serif; margin: 0; }
        .mono { font-family: 'IBM Plex Mono', monospace; }

        .pf-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(circle at 15% 15%, rgba(47,230,224,0.10), transparent 40%),
            radial-gradient(circle at 85% 25%, rgba(255,61,174,0.10), transparent 45%),
            radial-gradient(circle at 50% 90%, rgba(139,107,255,0.10), transparent 45%),
            linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%);
          pointer-events: none;
        }
        .pf-grid {
          position: fixed;
          inset: 0;
          z-index: 0;
          opacity: 0.35;
          background-image:
            linear-gradient(rgba(139,160,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,160,255,0.06) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, #000 40%, transparent 90%);
          pointer-events: none;
        }
        .content { position: relative; z-index: 1; }

        .wrap { max-width: 1120px; margin: 0 auto; padding: 0 28px; }

        .glass {
          background: var(--panel);
          border: 1px solid var(--panel-border);
          backdrop-filter: blur(14px);
          border-radius: 16px;
        }

        .nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(6,6,19,0.65);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--panel-border);
        }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; height: 68px; }
        .brand {
          font-family: 'Orbitron', sans-serif;
          font-size: 16px; font-weight: 700; letter-spacing: 0.04em;
          background: linear-gradient(90deg, var(--cyan), var(--violet));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .nav-links { display: flex; gap: 30px; }
        .nav-links button {
          background: none; border: none; cursor: pointer;
          font-family: 'Rajdhani', sans-serif; font-weight: 600; letter-spacing: 0.03em;
          color: var(--text-dim); font-size: 15px; padding: 6px 2px;
          border-bottom: 2px solid transparent;
          transition: color 0.2s ease, border-color 0.2s ease, text-shadow 0.2s ease;
        }
        .nav-links button:hover { color: var(--cyan); border-color: var(--cyan); text-shadow: 0 0 12px rgba(47,230,224,0.7); }
        .burger { display: none; background: none; border: 1px solid var(--panel-border); border-radius: 8px; color: var(--cyan); padding: 6px 10px; cursor: pointer; }
        .nav-mobile { display: none; flex-direction: column; padding: 6px 0 16px; }
        .nav-mobile.open { display: flex; }
        .nav-mobile button { text-align: left; background: none; border: none; color: var(--text-dim); font-size: 15px; padding: 10px 4px; border-bottom: 1px solid var(--panel-border); cursor: pointer; }

        .hero { padding: 90px 0 100px; }
        .hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 56px; align-items: center; }
        .tagline-row { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; }
        .tagline-row .ring {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--cyan); box-shadow: 0 0 10px 2px var(--cyan);
          animation: blip 1.8s infinite ease-in-out;
        }
        @keyframes blip { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        .tagline-row span.mono { color: var(--cyan); font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; }

        .hero h1 {
          font-size: 46px; font-weight: 800; line-height: 1.15; letter-spacing: 0.01em;
        }
        .grad-text {
          background: linear-gradient(90deg, var(--cyan), var(--violet) 55%, var(--magenta));
          -webkit-background-clip: text; background-clip: text; color: transparent;
          text-shadow: 0 0 40px rgba(139,107,255,0.25);
        }
        .type-line { margin-top: 14px; font-family: 'IBM Plex Mono', monospace; font-size: 20px; color: var(--text-dim); min-height: 28px; }
        .type-word { color: var(--cyan); }
        .type-cursor { animation: blink 1s step-start infinite; color: var(--magenta); }
        @keyframes blink { 50% { opacity: 0; } }

        .hero-sub { margin-top: 20px; font-size: 17px; color: var(--text-dim); max-width: 48ch; }

        .hero-cta { display: flex; gap: 14px; margin-top: 34px; flex-wrap: wrap; }
        .btn { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 15px; letter-spacing: 0.02em; padding: 13px 26px; border-radius: 10px; cursor: pointer; border: 1px solid transparent; transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease; }
        .btn:hover { transform: translateY(-2px); }
        .btn-primary { background: linear-gradient(90deg, var(--cyan), var(--violet)); color: #05060F; box-shadow: 0 0 24px rgba(47,230,224,0.35); }
        .btn-primary:hover { box-shadow: 0 0 34px rgba(139,107,255,0.55); }
        .btn-ghost { background: transparent; color: var(--text); border-color: var(--panel-border); }
        .btn-ghost:hover { border-color: var(--magenta); color: var(--magenta); box-shadow: 0 0 18px rgba(255,61,174,0.25); }

        .stat-row { display: flex; gap: 28px; margin-top: 44px; }
        .stat-item .num { font-family: 'Orbitron', sans-serif; font-size: 22px; font-weight: 700; color: var(--cyan); text-shadow: 0 0 14px rgba(47,230,224,0.5); }
        .stat-item .lbl { font-size: 12.5px; color: var(--text-dim); margin-top: 4px; letter-spacing: 0.03em; }

        .hud-wrap { position: relative; padding: 22px; }
        .hud-frame {
          position: relative; border-radius: 18px; overflow: hidden;
          aspect-ratio: 4/5;
          background: #000;
        }
        .hud-frame img { width: 100%; height: 100%; object-fit: cover; display: block; filter: contrast(1.05) saturate(1.05); }
        .hud-frame::after {
          content: ""; position: absolute; inset: 0; border-radius: 18px;
          box-shadow: inset 0 0 0 1.5px rgba(47,230,224,0.5), inset 0 0 60px rgba(139,107,255,0.15);
          pointer-events: none;
        }
        .hud-scan {
          position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
          box-shadow: 0 0 12px 2px rgba(47,230,224,0.7);
          animation: scan 3.4s linear infinite;
          opacity: 0.7;
        }
        @keyframes scan { 0% { top: 4%; } 50% { top: 94%; } 100% { top: 4%; } }
        .corner { position: absolute; width: 26px; height: 26px; border: 2px solid var(--cyan); opacity: 0.9; filter: drop-shadow(0 0 6px rgba(47,230,224,0.7)); }
        .corner.tl { top: 6px; left: 6px; border-right: none; border-bottom: none; border-top-left-radius: 8px; }
        .corner.tr { top: 6px; right: 6px; border-left: none; border-bottom: none; border-top-right-radius: 8px; border-color: var(--magenta); filter: drop-shadow(0 0 6px rgba(255,61,174,0.7)); }
        .corner.bl { bottom: 6px; left: 6px; border-right: none; border-top: none; border-bottom-left-radius: 8px; border-color: var(--magenta); filter: drop-shadow(0 0 6px rgba(255,61,174,0.7)); }
        .corner.br { bottom: 6px; right: 6px; border-left: none; border-top: none; border-bottom-right-radius: 8px; }
        .hud-caption { display: flex; justify-content: space-between; margin-top: 14px; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: var(--text-dim); padding: 0 4px; }
        .hud-caption .live { color: var(--cyan); }

        section { padding: 96px 0; position: relative; }
        .section-head { margin-bottom: 46px; max-width: 62ch; }
        .kicker { font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; color: var(--magenta); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; }
        .section-head h2 { font-size: 32px; font-weight: 700; }
        .section-head p { margin-top: 12px; color: var(--text-dim); font-size: 15.5px; }

        .about-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; }
        .about-card { padding: 32px; }
        .about-card p { color: var(--text-dim); font-size: 15.5px; margin: 0 0 16px; }
        .about-card strong { color: var(--cyan); font-weight: 600; }
        .fact-list { display: flex; flex-direction: column; }
        .fact { display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--panel-border); font-size: 14.5px; }
        .fact:last-child { border-bottom: none; }
        .fact-k { color: var(--text-dim); }
        .fact-v { color: var(--text); font-weight: 600; text-align: right; }

        .skills-panel { padding: 34px; }
        .skill-row { margin-bottom: 22px; }
        .skill-row:last-child { margin-bottom: 0; }
        .skill-top { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14.5px; font-weight: 600; }
        .skill-top .pct { font-family: 'IBM Plex Mono', monospace; color: var(--cyan); font-size: 13px; }
        .track { height: 7px; border-radius: 5px; background: rgba(255,255,255,0.06); overflow: hidden; border: 1px solid var(--panel-border); }
        .fill { height: 100%; border-radius: 5px; background: linear-gradient(90deg, var(--cyan), var(--violet)); box-shadow: 0 0 10px rgba(47,230,224,0.5); transition: width 1.1s cubic-bezier(0.2,0.8,0.2,1); }

        .loves-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 40px; }
        .love-chip { border: 1px solid var(--panel-border); background: var(--panel); padding: 10px 18px; border-radius: 999px; font-size: 14px; color: var(--text-dim); }
        .love-chip b { color: var(--magenta); }

        .project-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .project-card {
          padding: 26px; display: flex; flex-direction: column; gap: 14px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .project-card:hover { transform: translateY(-4px); border-color: var(--cyan); box-shadow: 0 8px 40px rgba(47,230,224,0.15); }
        .project-tag {
          font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase;
          color: var(--magenta); border: 1px solid var(--magenta); border-radius: 999px; padding: 3px 10px; width: fit-content;
        }
        .project-card h3 { font-family: 'Rajdhani', sans-serif; font-size: 19px; font-weight: 700; }
        .project-card p { color: var(--text-dim); font-size: 14px; margin: 0; flex-grow: 1; }
        .stack-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; }
        .stack-pill { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--cyan); background: rgba(47,230,224,0.08); border: 1px solid rgba(47,230,224,0.25); padding: 4px 9px; border-radius: 6px; }
        .project-note { margin-top: 30px; font-size: 13.5px; color: var(--text-dim); border-left: 2px solid var(--magenta); padding-left: 14px; }

        .contact-box { padding: 46px; display: grid; grid-template-columns: 1fr 1fr; gap: 42px; }
        .contact-box h2 { font-size: 26px; margin-bottom: 12px; }
        .contact-box > div > p { color: var(--text-dim); font-size: 15px; margin-bottom: 22px; }
        .field { margin-bottom: 15px; }
        .field label { display: block; font-size: 12.5px; color: var(--text-dim); margin-bottom: 6px; letter-spacing: 0.03em; }
        .field input, .field textarea {
          width: 100%; background: rgba(255,255,255,0.04); border: 1px solid var(--panel-border); border-radius: 8px;
          padding: 11px 13px; color: var(--text); font-family: 'Rajdhani', sans-serif; font-size: 15px;
        }
        .field input:focus, .field textarea:focus { outline: none; border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(47,230,224,0.15); }
        .field textarea { resize: vertical; min-height: 90px; }
        .sent-msg { color: var(--cyan); font-size: 14px; margin-top: 10px; }

        footer { padding: 34px 0; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--text-dim); }
        footer .socials { display: flex; gap: 20px; }
        footer a { color: var(--text-dim); text-decoration: none; transition: color 0.2s ease, text-shadow 0.2s ease; }
        footer a:hover { color: var(--cyan); text-shadow: 0 0 10px rgba(47,230,224,0.6); }

        @media (max-width: 860px) {
          .nav-links { display: none; }
          .burger { display: inline-flex; }
          .hero-grid { grid-template-columns: 1fr; }
          .hero h1 { font-size: 34px; }
          .about-grid { grid-template-columns: 1fr; }
          .project-grid { grid-template-columns: 1fr; }
          .contact-box { grid-template-columns: 1fr; padding: 28px; }
          .stat-row { flex-wrap: wrap; gap: 20px; }
          .wrap { padding: 0 20px; }
        }
      `}</style>

      <div className="pf-bg" />
      <div className="pf-grid" />

      <div className="content">
        <nav className="nav">
          <div className="wrap">
            <div className="nav-inner">
              <div className="brand">ADELOKUN.DEV</div>
              <div className="nav-links">
                {sections.map((s) => (
                  <button key={s} onClick={() => scrollTo(s)}>{s}</button>
                ))}
              </div>
              <button className="burger" onClick={() => setNavOpen((v) => !v)} aria-label="Toggle menu">☰</button>
            </div>
            <div className={`nav-mobile ${navOpen ? "open" : ""}`}>
              {sections.map((s) => (
                <button key={s} onClick={() => scrollTo(s)}>{s}</button>
              ))}
            </div>
          </div>
        </nav>

        <header className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="tagline-row">
                <span className="ring" />
                <span className="mono">system online — open to work</span>
              </div>
              <div className="mono" style={{ color: "#8B90AE", fontSize: 14, letterSpacing: "0.08em", marginBottom: 10 }}>
                ADELOKUN DANIEL
              </div>
              <h1>
                Building the next<br />
                <span className="grad-text">generation of the web.</span>
              </h1>
              <div className="type-line">
                I build <TypeLine />
              </div>
              <p className="hero-sub">
                A self-taught developer working end to end in JavaScript — React on the
                front end, Node.js on the back — shipping apps, websites, and browser
                games from idea to production.
              </p>
              <div className="hero-cta">
                <button className="btn btn-primary" onClick={() => scrollTo("Projects")}>View Projects</button>
                <button className="btn btn-ghost" onClick={() => scrollTo("Contact")}>Contact Me</button>
              </div>
              <div className="stat-row">
                <div className="stat-item"><div className="num">JS</div><div className="lbl">Primary language</div></div>
                <div className="stat-item"><div className="num">3</div><div className="lbl">Build categories</div></div>
                <div className="stat-item"><div className="num">100%</div><div className="lbl">Self-taught</div></div>
              </div>
            </div>

            <div className="hud-wrap">
              <div className="hud-frame">
                <img src={PHOTO} alt="Portrait" />
                <div className="hud-scan" />
                <div className="corner tl" />
                <div className="corner tr" />
                <div className="corner bl" />
                <div className="corner br" />
              </div>
              <div className="hud-caption">
                <span>ID:// portrait.jpg</span>
                <span className="live">● live feed</span>
              </div>
            </div>
          </div>
        </header>

        <section id="about">
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <div className="kicker">// about.exe</div>
                <h2>A developer who likes finishing things</h2>
              </div>
            </Reveal>
            <div className="about-grid">
              <Reveal delay={60}>
                <div className="glass about-card">
                  <p>
                    I love <strong>coding</strong> — taking a rough idea and turning it into
                    something people can actually click, play, or use. Most of what I build
                    runs on <strong>JavaScript</strong> end to end: React on the front end,
                    <strong> Node.js</strong> powering the back end, from small interactive
                    pages to full apps and games in the browser.
                  </p>
                  <p>
                    I'm not chasing every framework — I'm chasing depth. I'd rather understand
                    JavaScript properly and build real things with it than collect tools I
                    never finish a project in.
                  </p>
                  <p>
                    This page is one of those things — a portfolio I built to show what I can
                    do, and a home base for whatever I ship next.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={140}>
                <div className="glass about-card fact-list">
                  <div className="fact"><span className="fact-k">Focus</span><span className="fact-v">JavaScript (React + Node.js)</span></div>
                  <div className="fact"><span className="fact-k">Builds</span><span className="fact-v">Apps · Websites · Games</span></div>
                  <div className="fact"><span className="fact-k">Learning style</span><span className="fact-v">Self-taught, project-driven</span></div>
                  <div className="fact"><span className="fact-k">Currently</span><span className="fact-v">Open to freelance & roles</span></div>
                  <div className="fact"><span className="fact-k">Based in</span><span className="fact-v">Abuja, Nigeria</span></div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <div className="kicker">// skills.json</div>
                <h2>What I actually work with</h2>
                <p>JavaScript is home base — everything else supports it.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="glass skills-panel">
                {SKILLS.map((s) => (
                  <div className="skill-row" key={s.name}>
                    <div className="skill-top">
                      <span>{s.name}</span>
                      <span className="pct mono">{s.level}%</span>
                    </div>
                    <div className="track">
                      <div className="fill" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="loves-row">
                <div className="love-chip">Building <b>apps</b></div>
                <div className="love-chip">Building <b>websites</b></div>
                <div className="love-chip">Building <b>games</b></div>
                <div className="love-chip">Clean, working <b>JavaScript</b></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="projects">
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <div className="kicker">// projects.map()</div>
                <h2>Selected work</h2>
                <p>Three slots below, ready for your real projects — swap in the name, description, and stack for each.</p>
              </div>
            </Reveal>
            <div className="project-grid">
              {PROJECTS.map((p, idx) => (
                <Reveal key={p.title} delay={idx * 90}>
                  <div className="glass project-card">
                    <span className="project-tag">{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p>{p.blurb}</p>
                    <div className="stack-row">
                      {p.stack.map((s) => (<span key={s} className="stack-pill">{s}</span>))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="project-note">
              Tell me about a real app, site, or game you've built and I'll write these cards
              properly — with the actual name, what it does, and a link if it's live.
            </p>
          </div>
        </section>

        <section id="contact">
          <div className="wrap">
            <Reveal>
              <div className="glass contact-box">
                <div>
                  <h2>Let's build something</h2>
                  <p>Have a project, a job, or an idea you want built in JavaScript? Send a message — I read every one.</p>
                  <div className="fact-list">
                    <div className="fact"><span className="fact-k">Email</span><span className="fact-v">setemiadelokun11@gmail.com</span></div>
                    <div className="fact"><span className="fact-k">Location</span><span className="fact-v">Abuja, Nigeria</span></div>
                    <div className="fact"><span className="fact-k">Response time</span><span className="fact-v">Within a day</span></div>
                  </div>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="you@domain.com" required />
                  </div>
                  <div className="field">
                    <label htmlFor="msg">Message</label>
                    <textarea id="msg" placeholder="What are you looking to build?" required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Send message</button>
                  {sent && <div className="sent-msg">Message ready — connect a form service to actually deliver it.</div>}
                </form>
              </div>
            </Reveal>
          </div>
        </section>

        <footer>
          <div className="wrap" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <span className="mono">© {year} Adelokun Daniel — built with JavaScript, React & Node.js</span>
            <div className="socials">
              <a href="#" onClick={(e) => e.preventDefault()}>GitHub</a>
              <a href="#" onClick={(e) => e.preventDefault()}>LinkedIn</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Twitter / X</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}