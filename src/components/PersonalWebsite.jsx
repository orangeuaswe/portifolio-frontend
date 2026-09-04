import React, { useState, useEffect, useMemo } from "react";
import HERO_IMG from '../resources/hero.jpg'
const API_BASE = "https://backend.deveram.guru"; 
const RESUME_URL = "/resume.pdf"; 
const profile = {
  brackets: "「ANIRUDH DEVERAM」",
  tagline: "computer science & data science @ rutgers",
  timezone: "America/New_York",
  timezoneLabel: "NEW JERSEY",
  email: "anirudhdeveram@gmail.com",
  github: "https://github.com/orangeuaswe",
  linkedin: "https://www.linkedin.com/in/anirudhdeveram",
  address: ["cranbury, nj", "usa"],
};

const aboutBio = [
  "Anirudh Deveram finished his B.S. in Computer Science and Data Science at Rutgers in August 2026. He works mostly on backends and machine-learning services — Spring Boot on one end, PyTorch on the other — and what he cares about is getting the two to hold together: a backend that stays correct when a lot is happening at once, and a model that runs behind a real endpoint instead of sitting in a notebook.",
  "Last summer he interned at Samsung SDSA, where he replaced a manual ticketing process with a full-stack VDI provisioning portal. Before that he was a data analytics extern at Colgate-Palmolive. In his own time he builds Spring Boot APIs and fix problems in his life; away from the screen he cooks, family recipes, mostly, and works on his car.",
  "He's currently looking for full-time roles.",
];

const experience = [
  {
    role: "Software Development Intern",
    org: "Samsung SDSA",
    place: "Ridgefield Park, NJ",
    dates: "Jun 2025 – Aug 2025",
    points: [
      "Replaced manual ticket workflows by building a full-stack VDI provisioning portal (Java, Spring Boot, React) that automated VM request, approval, and audit tracking.",
      "Cut manual coordination by ~20 hours/week with 20+ secured REST APIs using Spring Security, JWT, and role-based access control.",
      "Modeled the approval domain in PostgreSQL with Hibernate/JPA and automated multi-stage email notifications, backed by JUnit 5 and Mockito.",
    ],
  },
  {
    role: "Data Analytics Extern",
    org: "Colgate-Palmolive",
    place: "Piscataway, NJ",
    dates: "Sep 2024 – Dec 2024",
    points: [
      "Consolidated 5+ marketing and finance datasets into a unified reporting pipeline used by 3 teams for KPI tracking.",
      "Automated recurring dashboard updates with Google Apps Script, cutting manual reporting effort by ~4 hours/week.",
    ],
  },
];

const education = {
  school: "Rutgers University",
  degree: "B.S. Computer Science & Data Science",
  note: "Dean's List",
  place: "New Brunswick, NJ",
  grad: "Graduated 2026",
};

const skills = {
  Languages: ["Java", "Python", "SQL", "JavaScript"],
  Backend: ["Spring Boot", "Spring Security", "FastAPI", "REST APIs", "WebSockets"],
  "ML / Data": ["PyTorch", "PyTorch Geometric", "TensorFlow/Keras", "scikit-learn", "Pandas", "NumPy"],
  Databases: ["PostgreSQL", "Redis"],
  "Cloud / DevOps": ["AWS", "Docker", "Terraform", "GitHub Actions"],
  "Testing & Tools": ["JUnit 5", "Mockito", "Git"],
};

const projects = [
  {
    slug: "gnn-recommender",
    file: "gnn-recommender.md",
    title: "Cross-Domain GNN Recommender",
    stack: ["Python", "PyTorch", "PyTorch Geometric", "scikit-learn"],
    date: "Jan 2026 – May 2026",
    blurb:
      "A cross-domain recommender that transfers user taste from Movies & TV into Books via link prediction on a bipartite graph.",
    sections: [
      { h: "what it is", p: ["A cross-domain recommender built in PyTorch Geometric over multi-million-row Amazon review data. It transfers user preferences from one domain (Movies & TV) into another (Books) via link prediction, so a user with no book history still gets sensible recommendations."] },
      { h: "results", ul: ["Improved NDCG@5 by ~12% over the strongest baseline.", "Improved NDCG@5 by ~67% over a single-domain GCN.", "Benchmarked against matrix factorization, neural collaborative filtering, and single-domain GCN."] },
      { h: "how it works", ul: ["Pandas/NumPy pipeline for k-core filtering and bipartite graph construction.", "Link-prediction objective over the user–item graph for cross-domain transfer.", "Evaluation harness comparing ranking metrics across every baseline."] },
    ],
    links: [],
  },
  {
    slug: "flightdeck",
    file: "flightdeck.md",
    title: "FlightDeck — Coding Agent Control Plane",
    stack: ["Java 21", "Spring Boot 3.5", "PostgreSQL", "React", "Vite", "TypeScript", "WebSocket"],
    date: "Jul 2026 – Present",
    wip: true,
    blurb:
      "A read-only control plane that watches the coding agents already running on your machines and puts all of them on one live board.",
    sections: [
      {
        h: "what it is",
        p: [
          "FlightDeck watches the coding agents already running on your machines — Claude Code, Codex CLI, Gemini CLI, and OpenHands — and puts all of them on one live board. It doesn't write code and it doesn't replace your agents; it tells you what they're doing.",
          "Coding agents got autonomous faster than the tooling around them. The moment more than one is running, basic questions stop having easy answers: what is each one doing right now, which files did it touch, why did that one fail, which commits came out of which session, is one stuck on a permission prompt I never saw. Today those answers live in whichever terminal happens to be scrolled to the right place. FlightDeck collects them into one view.",
        ],
      },
      {
        h: "what it shows",
        ul: [
          "Live agent board — every active session as a row: provider, repo, branch, current task, machine, status, elapsed time. The ones needing attention float up.",
          "Session timeline — every prompt, tool call, test run, and commit in order, streamed over WebSocket as it happens.",
          "Terminal output — captured stdout/stderr from shell calls, per session.",
          "Git attribution — commits linked back to the session that produced them, read from git log right after the commit lands.",
          "Multi-machine — laptop, desktop, cloud VM, home server: every daemon reports to one backend, everything lands on one board.",
        ],
      },
      {
        h: "the key design decision",
        p: [
          "The daemon normalizes every provider into a single canonical vocabulary before it posts anything. The Spring Boot backend has zero per-provider logic — the event processor never learns whether an event came from Codex or Gemini. Adding a fifth agent means writing one adapter file and registering it: no backend change, no frontend change, no migration.",
          "The canonical vocabulary is Claude Code's, because Codex and Gemini both modelled their hook systems on it, which makes it the closest thing to a lingua franca in this space.",
        ],
      },
      {
        h: "the pipeline",
        ul: [
          "TypeScript daemon with one adapter per provider — normalizes events and tool names, enriches with git/machine context, fire-and-forget.",
          "Spring Boot 3.5 / Java 21 backend: intake → model → repo → WebSocket broadcast.",
          "PostgreSQL persistence; REST + STOMP/WebSocket out to a React + Vite dashboard.",
          "Built so that a FlightDeck outage can never break, block, or slow a real coding session.",
        ],
      },
    ],
    links: [],
  },
  {
    slug: "airbnb-price-prediction",
    file: "airbnb-price-prediction.md",
    title: "NYC Airbnb Price Prediction",
    stack: ["Python", "scikit-learn", "TensorFlow/Keras", "FastAPI"],
    date: "Oct 2025 – Dec 2025",
    blurb: "An end-to-end ML service predicting NYC Airbnb prices from ~70K listings, served behind a FastAPI endpoint.",
    sections: [
      { h: "what it is", p: ["An end-to-end machine-learning service that predicts NYC Airbnb prices from roughly 70,000 listings, comparing three model families on MAE and RMSE: linear regression, a random forest, and a Keras neural network."] },
      { h: "feature engineering", ul: ["scikit-learn pipelines for reproducible preprocessing.", "VADER sentiment scoring over listing text.", "KMeans geo-clustering to capture neighbourhood effects."] },
      { h: "serving", p: ["Predictions are served through a FastAPI endpoint, so the model is callable rather than sitting in a notebook."] },
    ],
    links: [],
  },
  {
    slug: "studywus",
    file: "studywus.md",
    title: "studyWus — Global Tutoring Platform",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "AWS"],
    date: "Sep 2025 – Present",
    wip: true,
    blurb: "A tutoring marketplace backend with transactional booking and real-time peer-to-peer sessions over WebRTC.",
    sections: [
      { h: "what it is", p: ["A marketplace backend for a global tutoring platform, built in Java/Spring Boot with transactional booking designed to hold up under concurrent users."] },
      { h: "backend", ul: ["REST APIs with JWT authentication.", "PostgreSQL for durable state, Redis for caching and sessions.", "Transactional booking to keep concurrent reservations consistent."] },
      { h: "real-time", ul: ["Peer-to-peer sessions via WebSocket/STOMP and WebRTC signaling.", "Containerized locally with Docker for a consistent dev environment."] },
    ],
    links: [],
  },
  {
    slug: "poraobd",
    file: "poraobd.md",
    title: "PoraoBD — AI Tutoring Platform",
    stack: ["Spring Boot", "PostgreSQL", "React", "OpenAI API", "WebSockets"],
    date: "HackRU",
    wip: true,
    blurb: "A HackRU build that matches students to tutors with semantic embeddings and cosine similarity.",
    sections: [
      { h: "what it is", p: ["An AI-powered tutoring platform built for HackRU that matches students with tutors using semantic embeddings and cosine similarity for personalized recommendations."] },
      { h: "features", ul: ["Real-time chat over WebSockets.", "Google OAuth login.", "AI tutor ranking via the OpenAI API.", "Geolocation search with Google Maps."] },
    ],
    links: [
      { label: "source", href: "https://github.com/orangeuaswe/PoraoBD-Backend" },
      { label: "devpost", href: "https://devpost.com/software/poraobd" },
    ],
  },
  {
    slug: "window-jumper",
    file: "window-jumper.md",
    title: "Window Jumper",
    stack: ["C#", ".NET", "WebView2", "Windows API"],
    date: "2024",
    blurb: "A lightweight custom browser with global hotkeys, tray integration, and JSON settings.",
    sections: [
      { h: "what it is", p: ["A lightweight custom browser with global hotkeys, tray integration, multi-tab support, and JSON-backed settings."] },
      { h: "features", ul: ["Global hotkey navigation.", "Session restoration.", "WebView2 rendering."] },
    ],
    links: [
      { label: "source", href: "https://github.com/orangeuaswe/Window-Jumper" },
      { label: "download", href: "https://github.com/orangeuaswe/Window-Jumper/releases" },
    ],
  },
  {
    slug: "fast-food-app",
    file: "fast-food-app.md",
    title: "Fast Food App",
    stack: ["Android", "Java", "MVC", "Material Design"],
    date: "2024",
    blurb: "An Android POS rebuilt from a JavaFX app with clean MVC and smooth RecyclerView UX.",
    sections: [
      { h: "what it is", p: ["An Android point-of-sale app, rebuilt from an earlier JavaFX version with a clean MVC structure and smooth RecyclerView interactions."] },
      { h: "architecture", ul: ["Clean MVC separation.", "Optimized RecyclerViews.", "Material Design components."] },
    ],
    links: [
      { label: "source", href: "https://github.com/orangeuaswe/fast-food-app" },
      { label: "apk", href: "https://github.com/orangeuaswe/fast-food-app/releases" },
    ],
  },
  {
    slug: "bank-app",
    file: "bank-app.md",
    title: "Bank App",
    stack: ["JavaFX", "JUnit", "FXML"],
    date: "2023",
    blurb: "A GUI banking app with multiple account types, strong validation, and thorough JUnit coverage.",
    sections: [
      { h: "what it is", p: ["A JavaFX banking application supporting multiple account types, robust input validation, and transaction logging."] },
      { h: "quality", ul: ["Comprehensive JUnit test coverage.", "Multiple account types.", "Transaction logging."] },
    ],
    links: [{ label: "source", href: "https://github.com/orangeuaswe/Bank-App" }],
  },
];
const CSS = `
.aw-site *{box-sizing:border-box;}
.aw-site{
  --ink:#111;--muted:#666;--link:#1a3fbf;--visited:#5a2a8a;
  --line:#e4e4e4;--bg:#fff;--mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
  --sans:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
  background:var(--bg);color:var(--ink);
  font-family:"Times New Roman",Times,serif;
  min-height:100vh;line-height:1.5;
}
.aw-site a,.aw-link{color:var(--link);text-decoration:underline;cursor:pointer;}
.aw-site a:hover,.aw-link:hover{text-decoration:none;}
.aw-link{background:none;border:none;padding:0;font:inherit;}

/* top bar (interior pages) */
.aw-topbar{
  display:flex;justify-content:space-between;align-items:baseline;
  max-width:820px;margin:0 auto;padding:22px 20px 14px;
  border-bottom:1px solid var(--line);
}
.aw-topbar .brand{font-weight:bold;font-style:italic;font-size:20px;letter-spacing:.5px;}
.aw-topbar .brand:hover{text-decoration:none;}
.aw-nav{font-size:15px;}
.aw-nav .sep{color:#bbb;margin:0 7px;}
.aw-nav .cur{color:var(--ink);text-decoration:none;cursor:default;}

/* generic page shell */
.aw-page{max-width:820px;margin:0 auto;padding:40px 20px 120px;}
.aw-h2{font-size:30px;font-style:italic;font-weight:bold;margin:0 0 4px;}
.aw-sub{color:var(--muted);font-size:15px;margin:0 0 30px;}

/* ---------- HOME (split hero: photo + text) ---------- */
.aw-home-split{min-height:100vh;display:grid;grid-template-columns:44% 56%;}
.aw-hero-photo{position:relative;overflow:hidden;border-right:1px solid var(--line);}
.aw-hero-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  object-position:60% center;
  /* subtle washed-film treatment to echo the reference banner */
  filter:contrast(0.94) saturate(0.9) brightness(1.02);}
.aw-hero-photo::after{content:"";position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(255,250,244,.10),rgba(250,246,240,.04) 40%,rgba(20,20,30,.06));
  pointer-events:none;}
.aw-hero-text{display:flex;align-items:center;justify-content:center;
  text-align:center;padding:60px 40px;}
.aw-hero-inner{max-width:520px;}
.aw-name{font-style:italic;font-weight:bold;line-height:1.05;
  font-size:clamp(34px,4.6vw,66px);margin:0;}
.aw-tag{font-style:italic;color:#333;font-size:clamp(15px,1.5vw,19px);margin:18px 0 0;}
.aw-clock{font-style:italic;font-size:16px;margin:24px 0 0;letter-spacing:.3px;display:block;}
.aw-homenav{margin-top:28px;font-size:17px;}
.aw-homenav .sep{color:#bbb;margin:0 8px;}

/* ---------- ABOUT ---------- */
.aw-about-grid{display:grid;grid-template-columns:220px 1fr;gap:34px;align-items:start;}
.aw-photo{width:220px;height:220px;object-fit:cover;border:1px solid var(--line);
  filter:grayscale(100%);}
.aw-about p{margin:0 0 16px;max-width:60ch;}
.aw-block{margin-top:44px;}
.aw-block h3{font-size:20px;font-style:italic;margin:0 0 14px;
  border-bottom:1px solid var(--line);padding-bottom:6px;}
.aw-exp{margin:0 0 22px;}
.aw-exp .row{display:flex;justify-content:space-between;align-items:baseline;gap:12px;}
.aw-exp .role{font-weight:bold;}
.aw-exp .when{color:var(--muted);font-size:14px;white-space:nowrap;}
.aw-exp .org{color:#333;font-style:italic;}
.aw-exp ul{margin:8px 0 0;padding-left:20px;}
.aw-exp li{margin:0 0 5px;}
.aw-skills{list-style:none;padding:0;margin:0;}
.aw-skills li{margin:0 0 8px;}
.aw-skills .k{font-weight:bold;font-style:italic;margin-right:8px;}
.aw-skills .v{font-family:var(--mono);font-size:13px;color:#333;}

/* ---------- PROJECTS (directory listing) ---------- */
.aw-dir{border:1px solid var(--line);background:#fff;font-family:var(--sans);}
.aw-dir-head{padding:13px 18px;border-bottom:1px solid var(--line);
  font-size:16px;font-weight:600;background:#fafafa;}
.aw-table{width:100%;border-collapse:collapse;font-size:14px;}
.aw-table th{text-align:left;padding:10px 18px;border-bottom:1px solid var(--line);
  font-weight:600;background:#fcfcfc;color:#333;}
.aw-table td{padding:10px 18px;border-bottom:1px solid #f0f0f0;vertical-align:top;}
.aw-table tr:last-child td{border-bottom:none;}
.aw-table tr.clickable:hover{background:#f7f9ff;}
.aw-table .fname{color:var(--link);text-decoration:none;}
.aw-table tr.clickable:hover .fname{text-decoration:underline;}
.aw-ic{margin-right:7px;}
.aw-stackcell{color:#555;}
.aw-datecell{color:#8a8a8a;white-space:nowrap;}
.aw-dir-foot{padding:9px 18px;border-top:1px solid var(--line);color:#888;
  font-size:12px;font-family:var(--sans);}
.aw-wip{font-family:var(--mono);font-size:10px;letter-spacing:.3px;color:#b26a00;
  border:1px solid #e8cfa0;background:#fff8ef;padding:0 5px;margin-left:9px;
  vertical-align:middle;text-transform:lowercase;}

/* ---------- PROJECT DETAIL (blog-post) ---------- */
.aw-post h1{font-size:32px;font-style:italic;font-weight:bold;margin:0 0 4px;}
.aw-post .meta{font-family:var(--mono);font-size:12.5px;color:var(--muted);margin:0 0 26px;}
.aw-post h3{font-size:19px;font-style:italic;margin:26px 0 8px;}
.aw-post p{margin:0 0 12px;max-width:66ch;}
.aw-post ul{margin:0 0 12px;padding-left:22px;}
.aw-post li{margin:0 0 5px;max-width:64ch;}
.aw-post .tags{margin:14px 0 0;}
.aw-tag-chip{display:inline-block;font-family:var(--mono);font-size:11.5px;
  border:1px solid var(--line);padding:2px 8px;margin:0 6px 6px 0;color:#444;}
.aw-post .links{margin-top:22px;}
.aw-post .links a{margin-right:18px;}
.aw-updated{color:var(--muted);font-style:italic;margin-top:34px;}
.aw-back{display:inline-block;margin-bottom:26px;font-size:14px;}

/* ---------- RESUME ---------- */
.aw-resume-actions{margin:0 0 22px;}
.aw-btn{display:inline-block;border:1px solid #333;background:#fff;color:#111;
  padding:8px 16px;margin-right:12px;text-decoration:none;font-size:15px;cursor:pointer;}
.aw-btn:hover{background:#111;color:#fff;text-decoration:none;}
.aw-frame{width:100%;height:900px;border:1px solid var(--line);}
.aw-frame-note{color:var(--muted);font-size:13px;margin-top:10px;}

/* ---------- CONTACT ---------- */
.aw-form{max-width:560px;}
.aw-field{margin:0 0 18px;}
.aw-field label{display:block;font-style:italic;margin:0 0 5px;font-size:15px;}
.aw-input,.aw-textarea{width:100%;font-family:"Times New Roman",Times,serif;
  font-size:16px;padding:8px 10px;border:1px solid #cfcfcf;background:#fff;color:#111;}
.aw-input:focus,.aw-textarea:focus{outline:none;border-color:#111;}
.aw-textarea{resize:vertical;min-height:130px;}
.aw-err{color:#a11;font-size:13px;margin-top:4px;}
.aw-note{padding:12px 14px;border:1px solid var(--line);margin:0 0 20px;font-size:15px;}
.aw-note.ok{border-color:#7bbf7b;background:#f3fbf3;}
.aw-note.bad{border-color:#e0a0a0;background:#fdf4f4;}
.aw-direct{margin-top:34px;color:#333;}
.aw-direct a{margin-right:2px;}

/* ---------- fixed corner widgets ---------- */
.aw-contactfix{position:fixed;right:16px;bottom:14px;font-size:13px;color:var(--muted);
  text-align:right;line-height:1.4;z-index:40;}
.aw-contactfix a{color:var(--muted);}
.aw-contactfix .addr{margin-top:7px;}

.aw-np{position:fixed;top:16px;right:16px;z-index:40;width:270px;
  border:1px solid var(--line);background:#fff;padding:11px 13px;
  font-family:var(--sans);box-shadow:0 1px 4px rgba(0,0,0,.05);}
.aw-interior-route .aw-np{top:80px;}
.aw-np-head{display:flex;justify-content:space-between;align-items:center;
  font-size:11px;letter-spacing:.4px;text-transform:lowercase;margin-bottom:8px;}
.aw-np-live{display:flex;align-items:center;gap:6px;color:#1a7a3a;}
.aw-np-dot{width:7px;height:7px;border-radius:50%;background:#1db954;
  animation:awpulse 1.6s ease-in-out infinite;}
.aw-np-plat{color:#999;font-size:11px;}
.aw-np-row{display:flex;gap:10px;align-items:center;}
.aw-np-art{width:46px;height:46px;object-fit:cover;border:1px solid var(--line);flex:0 0 auto;}
.aw-np-art.ph{display:flex;align-items:center;justify-content:center;background:#f2f2f2;color:#aaa;font-size:18px;}
.aw-np-title{font-size:13px;font-weight:600;color:#111;line-height:1.25;}
.aw-np-artist{font-size:12px;color:#666;line-height:1.25;}
.aw-np-bar{height:2px;background:#eee;margin-top:9px;}
.aw-np-fill{height:2px;background:#1db954;transition:width 1s linear;}
.aw-np-idle{font-size:12px;color:#999;}
.aw-skel{background:#eee;animation:awpulse 1.4s ease-in-out infinite;border-radius:2px;}
@keyframes awpulse{50%{opacity:.45;}}

@media (max-width:680px){
  .aw-home-split{grid-template-columns:1fr;min-height:auto;}
  .aw-hero-photo{position:relative;height:42vh;min-height:260px;border-right:none;
    border-bottom:1px solid var(--line);}
  .aw-hero-photo img{position:absolute;}
  .aw-hero-text{min-height:58vh;padding:48px 24px;}
  .aw-about-grid{grid-template-columns:1fr;}
  .aw-photo{width:160px;height:160px;}
  .aw-contactfix,.aw-np{position:static;width:auto;margin:30px auto 0;text-align:center;box-shadow:none;}
  .aw-np{max-width:300px;}
  .aw-table .aw-stackcell{display:none;}
  .aw-table th.stack-h{display:none;}
}
@media (prefers-reduced-motion:reduce){
  .aw-np-dot,.aw-skel{animation:none;}
}
`;
function Clock() {
  const fmt = useMemo(
    () =>
      new Intl.DateTimeFormat([], {
        timeZone: profile.timezone,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      }),
    []
  );
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const parts = fmt.formatToParts(now);
  const time = parts.filter((p) => p.type !== "timeZoneName").map((p) => p.value).join("");
  const tz = parts.find((p) => p.type === "timeZoneName")?.value || "";
  return (
    <span className="aw-clock">
      <i>
        TIME IN {profile.timezoneLabel} — {time} {tz}
      </i>
    </span>
  );
}

function NowPlaying() {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`${API_BASE}/api/now-playing`);
        const d = await r.json();
        if (alive) setTrack(d);
      } catch {
        if (alive) setTrack(null);
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    const id = setInterval(load, 30000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  if (loading) {
    return (
      <div className="aw-np">
        <div className="aw-np-head">
          <span>♪ now playing</span>
        </div>
        <div className="aw-np-row">
          <div className="aw-np-art aw-skel" />
          <div style={{ flex: 1 }}>
            <div className="aw-skel" style={{ height: 10, marginBottom: 6, width: "80%" }} />
            <div className="aw-skel" style={{ height: 9, width: "55%" }} />
          </div>
        </div>
      </div>
    );
  }

  if (!track || !track.isPlaying || !track.track) {
    return (
      <div className="aw-np">
        <div className="aw-np-head">
          <span>♪ now playing</span>
        </div>
        <div className="aw-np-idle">not playing — check back later</div>
      </div>
    );
  }

  const { track: t, platform, progress } = track;
  const pct = t.duration ? Math.min(100, (progress / t.duration) * 100) : 0;
  return (
    <div className="aw-np">
      <div className="aw-np-head">
        <span className="aw-np-live">
          <span className="aw-np-dot" /> now playing
        </span>
        <span className="aw-np-plat">{platform}</span>
      </div>
      <div className="aw-np-row">
        {t.albumArt ? (
          <img className="aw-np-art" src={t.albumArt} alt="" />
        ) : (
          <div className="aw-np-art ph">♪</div>
        )}
        <div style={{ minWidth: 0 }}>
          <div className="aw-np-title">{t.name}</div>
          <div className="aw-np-artist">{(t.artists && t.artists.join(", ")) || "Unknown Artist"}</div>
        </div>
      </div>
      {t.duration ? (
        <div className="aw-np-bar">
          <div className="aw-np-fill" style={{ width: `${pct}%` }} />
        </div>
      ) : null}
    </div>
  );
}

function ContactFix() {
  return (
    <div className="aw-contactfix">
      <div>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
      <div className="addr">
        {profile.address.map((l, i) => (
          <React.Fragment key={i}>
            {l}
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const NAV = [
  ["about", "about"],
  ["projects", "projects"],
  ["resume", "resume"],
  ["contact", "contact"],
];

function TopBar({ route, go }) {
  return (
    <div className="aw-topbar">
      <button className="aw-link brand" onClick={() => go("home")}>
        「AD」
      </button>
      <nav className="aw-nav">
        {NAV.map(([key, label], i) => {
          const active = route === key || route === `project:${key}`;
          return (
            <React.Fragment key={key}>
              {i > 0 && <span className="sep">{"//"}</span>}
              {active ? (
                <span className="cur">{label}</span>
              ) : (
                <button className="aw-link" onClick={() => go(key)}>
                  {label}
                </button>
              )}
            </React.Fragment>
          );
        })}
        <span className="sep">{"//"}</span>
        <a href={profile.github} target="_blank" rel="noreferrer">github</a>
      </nav>
    </div>
  );
}
function Home({ go }) {
  return (
    <div className="aw-home-split">
      <div className="aw-hero-photo">
        <img src={HERO_IMG} alt="East River skyline at dusk" />
      </div>
      <div className="aw-hero-text">
        <div className="aw-hero-inner">
          <h1 className="aw-name">{profile.brackets}</h1>
          <p className="aw-tag">
            <i>{profile.tagline}</i>
          </p>
          <Clock />
          <div className="aw-homenav">
            <button className="aw-link" onClick={() => go("about")}>about</button>
            <span className="sep">{"//"}</span>
            <button className="aw-link" onClick={() => go("projects")}>projects</button>
            <span className="sep">{"//"}</span>
            <button className="aw-link" onClick={() => go("resume")}>resume</button>
            <span className="sep">{"//"}</span>
            <button className="aw-link" onClick={() => go("contact")}>contact</button>
            <span className="sep">{"//"}</span>
            <a href={profile.github} target="_blank" rel="noreferrer">github</a>
            <span className="sep">{"//"}</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="aw-page">
      <h2 className="aw-h2">about</h2>
      <p className="aw-sub">who's behind the screen</p>
      <div className="aw-about-grid">
        <img
          className="aw-photo"
          src="https://raw.githubusercontent.com/orangeuaswe/portifolio-frontend/main/src/resources/dev1.jpg"
          alt="Anirudh Deveram"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="aw-about">
          {aboutBio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div className="aw-block">
        <h3>experience</h3>
        {experience.map((e) => (
          <div className="aw-exp" key={e.org}>
            <div className="row">
              <span>
                <span className="role">{e.role}</span> — <span className="org">{e.org}</span>
              </span>
              <span className="when">{e.dates}</span>
            </div>
            <div className="org" style={{ fontSize: 14, color: "#777" }}>{e.place}</div>
            <ul>
              {e.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="aw-block">
        <h3>education</h3>
        <div className="aw-exp">
          <div className="row">
            <span>
              <span className="role">{education.school}</span> — <span className="org">{education.degree}</span>
            </span>
            <span className="when">{education.grad}</span>
          </div>
          <div className="org" style={{ fontSize: 14, color: "#777" }}>
            {education.place} · {education.note}
          </div>
        </div>
      </div>

      <div className="aw-block">
        <h3>skills</h3>
        <ul className="aw-skills">
          {Object.entries(skills).map(([k, v]) => (
            <li key={k}>
              <span className="k">{k}:</span>
              <span className="v">{v.join(" · ")}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Projects({ go }) {
  return (
    <div className="aw-page">
      <h2 className="aw-h2">projects</h2>
      <p className="aw-sub">pick a file to read the writeup</p>
      <div className="aw-dir">
        <div className="aw-dir-head">Index of /projects</div>
        <table className="aw-table">
          <thead>
            <tr>
              <th style={{ width: "42%" }}>Filename</th>
              <th className="stack-h" style={{ width: "38%" }}>Stack</th>
              <th style={{ width: "20%" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <button className="aw-link fname" onClick={() => go("home")}>
                  <span className="aw-ic">📁</span>..
                </button>
              </td>
              <td className="aw-stackcell">—</td>
              <td className="aw-datecell">—</td>
            </tr>
            {projects.map((p) => (
              <tr key={p.slug} className="clickable" onClick={() => go(`project:${p.slug}`)}>
                <td>
                  <span className="fname">
                    <span className="aw-ic">📄</span>
                    {p.file}
                  </span>
                  {p.wip && <span className="aw-wip">wip</span>}
                </td>
                <td className="aw-stackcell">{p.stack.join(", ")}</td>
                <td className="aw-datecell">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="aw-dir-foot">
          generated by project-explorer · {projects.length} items
        </div>
      </div>
    </div>
  );
}

function ProjectDetail({ slug, go }) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) {
    return (
      <div className="aw-page">
        <button className="aw-link aw-back" onClick={() => go("projects")}>← /projects</button>
        <p>file not found.</p>
      </div>
    );
  }
  return (
    <div className="aw-page">
      <button className="aw-link aw-back" onClick={() => go("projects")}>← /projects</button>
      <div className="aw-post">
        <h1>{p.title}</h1>
        <div className="meta">{p.date}{p.wip ? " · work in progress" : ""}</div>
        {p.blurb && <p><i>{p.blurb}</i></p>}
        {p.sections.map((s, i) => (
          <div key={i}>
            <h3>{s.h}</h3>
            {s.p && s.p.map((par, j) => <p key={j}>{par}</p>)}
            {s.ul && (
              <ul>
                {s.ul.map((li, j) => (
                  <li key={j}>{li}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <div className="tags">
          {p.stack.map((t) => (
            <span className="aw-tag-chip" key={t}>{t}</span>
          ))}
        </div>
        {p.links.length > 0 && (
          <div className="links">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
        <p className="aw-updated">— a. deveram</p>
      </div>
    </div>
  );
}

function Resume() {
  return (
    <div className="aw-page">
      <h2 className="aw-h2">resume</h2>
      <p className="aw-sub">preview below, or grab a copy</p>
      <div className="aw-resume-actions">
        <a className="aw-btn" href={RESUME_URL} target="_blank" rel="noreferrer">open in new tab</a>
        <a className="aw-btn" href={RESUME_URL} download>download pdf</a>
      </div>
      <iframe className="aw-frame" src={`${RESUME_URL}#toolbar=0&navpanes=0&view=FitH`} title="Resume" />
      <p className="aw-frame-note">
        if the preview doesn't load, <a href={RESUME_URL} target="_blank" rel="noreferrer">open it in a new tab</a>.
      </p>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", company: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'ok' | 'bad' | null
  const [sending, setSending] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: undefined }));
  };

  const validate = () => {
    const n = {};
    if (!form.name.trim()) n.name = "please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) n.email = "please enter a valid email.";
    if (!form.subject.trim()) n.subject = "please add a subject.";
    if (form.message.trim().length < 10) n.message = "message should be at least 10 characters.";
    if (form.company.trim() !== "") n.message = "spam check failed.";
    setErrors(n);
    return Object.keys(n).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;
    setSending(true);
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      setForm({ name: "", email: "", subject: "", message: "", company: "" });
    } catch {
      setStatus("bad");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="aw-page">
      <h2 className="aw-h2">contact</h2>
      <p className="aw-sub">i'll respond to messages that are a good match. thank you.</p>

      {status === "ok" && <div className="aw-note ok">message sent — i'll get back to you soon.</div>}
      {status === "bad" && (
        <div className="aw-note bad">
          something went wrong. email me directly at <a href={`mailto:${profile.email}`}>{profile.email}</a>.
        </div>
      )}

      <form className="aw-form" onSubmit={onSubmit} noValidate>
        <input
          className="hidden"
          style={{ display: "none" }}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={onChange}
        />
        <div className="aw-field">
          <label htmlFor="c-name">your name</label>
          <input id="c-name" className="aw-input" name="name" value={form.name} onChange={onChange} />
          {errors.name && <div className="aw-err">{errors.name}</div>}
        </div>
        <div className="aw-field">
          <label htmlFor="c-email">email</label>
          <input id="c-email" className="aw-input" name="email" type="email" value={form.email} onChange={onChange} />
          {errors.email && <div className="aw-err">{errors.email}</div>}
        </div>
        <div className="aw-field">
          <label htmlFor="c-subject">subject</label>
          <input id="c-subject" className="aw-input" name="subject" value={form.subject} onChange={onChange} />
          {errors.subject && <div className="aw-err">{errors.subject}</div>}
        </div>
        <div className="aw-field">
          <label htmlFor="c-message">message</label>
          <textarea id="c-message" className="aw-textarea" name="message" value={form.message} onChange={onChange} />
          {errors.message && <div className="aw-err">{errors.message}</div>}
        </div>
        <button className="aw-btn" type="submit" disabled={sending}>
          {sending ? "sending…" : "send message"}
        </button>
      </form>

      <div className="aw-direct">
        <p>or reach me directly:</p>
        <p>
          e-mail — <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <br />
          github — <a href={profile.github} target="_blank" rel="noreferrer">{profile.github.replace("https://", "")}</a>
          <br />
          linkedin — <a href={profile.linkedin} target="_blank" rel="noreferrer">{profile.linkedin.replace("https://www.", "")}</a>
        </p>
      </div>
    </div>
  );
}
export default function PersonalWebsite() {
  const [route, setRoute] = useState("home");
  const go = (r) => {
    setRoute(r);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };

  const isHome = route === "home";
  let page;
  if (route === "home") page = <Home go={go} />;
  else if (route === "about") page = <About />;
  else if (route === "projects") page = <Projects go={go} />;
  else if (route === "resume") page = <Resume />;
  else if (route === "contact") page = <Contact />;
  else if (route.startsWith("project:")) page = <ProjectDetail slug={route.split(":")[1]} go={go} />;
  else page = <Home go={go} />;

  return (
    <div className={`aw-site ${isHome ? "aw-home-route" : "aw-interior-route"}`}>
      <style>{CSS}</style>
      {!isHome && <TopBar route={route} go={go} />}
      {page}
      {isHome && <ContactFix />}
      <NowPlaying />
    </div>
  );
}
