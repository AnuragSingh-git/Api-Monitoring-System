"use client";

import { useEffect, useState } from "react";

/**
 * Portfolio — Anurag Singh
 * Design concept: the page reads like an API console. The subject builds
 * REST APIs, schemas, and auth systems — so the interface borrows the
 * vocabulary of a request/response cycle: routes, status codes, JSON
 * payloads, and schema definitions, instead of generic hero/stat-card copy.
 *
 * Fonts: swap in next/font if you like —
 *   import { JetBrains_Mono, Inter } from "next/font/google"
 * Left on system mono/sans stacks here so the file has zero extra deps.
 */

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PROFILE = {
  name: "Anurag Singh",
  role: "Full-Stack Developer — MERN",
  location: "Greater Noida, India",
  email: "anurag28singh88@gmail.com",
  phone: "+91 7011830630",
  github: "https://github.com/AnuragSingh-git",
  linkedin: "https://linkedin.com/in/anurag-singh-98b83217a",
};

const SKILL_SCHEMA: { field: string; type: string; values: string[] }[] = [
  { field: "languages", type: "Array<String>", values: ["JavaScript (ES6+)", "C++", "SQL"] },
  { field: "frontend", type: "Array<String>", values: ["React", "Vite", "React Router", "Tailwind CSS", "Recharts", "Axios"] },
  { field: "backend", type: "Array<String>", values: ["Node.js", "Express.js", "REST APIs", "Mongoose ODM", "Middleware"] },
  { field: "databases", type: "Array<String>", values: ["MongoDB (Atlas)", "MySQL"] },
  { field: "auth_and_security", type: "Array<String>", values: ["JWT", "bcrypt", "HTTP-only Cookies", "CORS", "RBAC"] },
  { field: "tools_and_devops", type: "Array<String>", values: ["Git", "GitHub", "Postman", "Vercel", "Render", "ImageKit"] },
  { field: "core_cs", type: "Array<String>", values: ["Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks"] },
];

type Project = {
  method: "GET" | "POST";
  route: string;
  name: string;
  status: 200;
  summary: string;
  stack: string[];
  stats: { label: string; value: string }[];
  details: string[];
};

const PROJECTS: Project[] = [
  {
    method: "GET",
    route: "/api/v1/healthcare-records",
    name: "Healthcare Record Management System",
    status: 200,
    summary: "Role-aware patient/doctor platform for secure medical record access.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    stats: [
      { label: "endpoints", value: "12+" },
      { label: "route handlers", value: "3" },
      { label: "schemas", value: "3" },
    ],
    details: [
      "12+ RESTful endpoints across 3 modular route handlers (auth, records, access control), following MVC to separate models, controllers, and middleware.",
      "Stateless JWT auth with cookie-based sessions and salted bcrypt hashing; CORS and SameSite policies enforced against XSS/CSRF.",
      "3 Mongoose schemas (User, File, AccessRequest); ImageKit integration for CDN-backed medical record retrieval.",
      "Permission-aware Patient and Doctor dashboards rendering conditionally on authenticated role.",
    ],
  },
  {
    method: "POST",
    route: "/api/v1/task-manager",
    name: "Authentication-Based Task Management System",
    status: 200,
    summary: "Admin/member task and project tool with middleware-enforced RBAC.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    stats: [
      { label: "endpoints", value: "8" },
      { label: "protected routes", value: "5+" },
      { label: "models", value: "3" },
    ],
    details: [
      "8-endpoint REST API (auth, projects, tasks) protected by JWT, cookie sessions with 1-day expiry, and bcrypt hashing.",
      "RBAC with admin/member roles — project and task creation restricted to admins via middleware across 5+ endpoints.",
      "3 interconnected Mongoose models (User, Project, Task); .populate() used to cut N+1 lookups.",
      "Frontend on Vercel, backend on Render, with CORS configured for secure cross-origin auth.",
    ],
  },
  {
    method: "GET",
    route: "/api/v1/research-tracker",
    name: "Research Paper Tracker",
    status: 200,
    summary: "Multi-criteria paper tracker with dual-token auth and live analytics.",
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "JWT"],
    stats: [
      { label: "endpoints", value: "8" },
      { label: "filter dimensions", value: "6" },
      { label: "charts", value: "5+" },
    ],
    details: [
      "8 REST endpoints (auth, papers, analytics) with dual-token JWT — 15-minute access, 7-day refresh.",
      "Multi-criteria filtering engine across 6 dimensions (title, domain, reading stage, impact score, date range) with optimized Mongoose queries.",
      "5+ interactive Recharts visualizations for completion rate and citation metrics, powered by MongoDB aggregation.",
      "2 Mongoose schemas (User, Paper) with enum validation and relationship integrity.",
    ],
  },
];

const EDUCATION = [
  {
    school: "G.L. Bajaj Institute of Technology and Management",
    location: "Greater Noida, India",
    degree: "B.Tech, Computer Science and Engineering",
    period: "2022 — 2026",
    score: "76%",
  },
  {
    school: "Delhi Public School",
    location: "",
    degree: "12th Grade, PCM",
    period: "2020 — 2021",
    score: "72%",
  },
];

const CERTIFICATIONS = [
  {
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    detail: "TCP/IP, OSI model, routing, switching, subnetting",
  },
  {
    name: "Android Developer Virtual Internship",
    issuer: "Google",
    detail: "Application architecture, REST APIs",
  },
];

const NAV = [
  { href: "#summary", label: "summary" },
  { href: "#schema", label: "schema" },
  { href: "#projects", label: "projects" },
  { href: "#education", label: "education" },
  { href: "#contact", label: "contact" },
];

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function MethodBadge({ method }: { method: "GET" | "POST" }) {
  const color = method === "GET" ? "text-[#3FB950] border-[#2ea043]/40 bg-[#3FB950]/10" : "text-[#D29922] border-[#d29922]/40 bg-[#D29922]/10";
  return (
    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${color}`}>
      {method}
    </span>
  );
}

function StatusPill({ code }: { code: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3FB950]/30 bg-[#3FB950]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#3FB950]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#3FB950]" />
      {code} OK
    </span>
  );
}

// ---------------------------------------------------------------------------
// Hero terminal — types out a GET request + JSON response
// ---------------------------------------------------------------------------

function HeroTerminal() {
  const requestLine = `GET /api/anurag-singh HTTP/1.1`;
  const [typed, setTyped] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(requestLine.slice(0, i));
      if (i >= requestLine.length) {
        clearInterval(iv);
        setTimeout(() => setShowResponse(true), 250);
      }
    }, 45);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const responseBody = [
    { k: "name", v: `"${PROFILE.name}"` },
    { k: "role", v: `"${PROFILE.role}"` },
    { k: "location", v: `"${PROFILE.location}"` },
    { k: "stack", v: `["React", "Node.js", "Express", "MongoDB"]` },
    { k: "status", v: `"open_to_opportunities"` },
  ];

  return (
    <div className="w-full max-w-md overflow-hidden rounded-lg border border-[#21262D] bg-[#0D1117] shadow-2xl shadow-black/40">
      <style>{`
        .response-fade-in {
          animation: response-fade-in 0.4s ease-out both;
        }
        @keyframes response-fade-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="flex items-center gap-1.5 border-b border-[#21262D] bg-[#131A24] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-[#7D8590]">console — anuragsingh.dev</span>
      </div>
      <div className="px-5 py-5 font-mono text-[13px] leading-relaxed">
        <div className="text-[#7D8590]">
          <span className="text-[#3FB950]">$</span> curl -i https://anuragsingh.dev/api/anurag-singh
        </div>
        <div className="mt-3 text-[#E6EDF3]">
          {typed}
          <span className="animate-pulse text-[#3FB950]">▌</span>
        </div>
        {showResponse && (
          <div className="response-fade-in mt-4 border-t border-[#21262D] pt-4">
            <div className="mb-2 flex items-center gap-2">
              <StatusPill code={200} />
              <span className="text-[11px] text-[#7D8590]">application/json</span>
            </div>
            <div className="text-[#E6EDF3]">
              {"{"}
              <div className="pl-4">
                {responseBody.map((row, idx) => (
                  <div key={row.k}>
                    <span className="text-[#79C0FF]">"{row.k}"</span>
                    <span className="text-[#7D8590]">: </span>
                    <span className="text-[#A5D6FF]">{row.v}</span>
                    {idx < responseBody.length - 1 && <span className="text-[#7D8590]">,</span>}
                  </div>
                ))}
              </div>
              {"}"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Project card — expandable endpoint card
// ---------------------------------------------------------------------------

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-[#21262D] bg-[#0D1117] transition-colors hover:border-[#30363D]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full flex-col gap-3 px-5 py-4 text-left sm:flex-row sm:items-center sm:justify-between"
        aria-expanded={open}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <MethodBadge method={project.method} />
            <code className="truncate font-mono text-[13px] text-[#7D8590]">{project.route}</code>
          </div>
          <h3 className="font-mono text-base font-semibold text-[#E6EDF3] sm:text-lg">{project.name}</h3>
          <p className="text-sm text-[#8B93A7]">{project.summary}</p>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <StatusPill code={project.status} />
          <span
            className={`font-mono text-[#7D8590] transition-transform duration-200 ${open ? "rotate-90" : ""}`}
            aria-hidden
          >
            ›
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t border-[#21262D] px-5 py-4">
          <div className="mb-4 flex flex-wrap gap-3">
            {project.stats.map((s) => (
              <div key={s.label} className="rounded border border-[#21262D] bg-[#131A24] px-3 py-1.5">
                <span className="font-mono text-sm font-semibold text-[#E6EDF3]">{s.value}</span>{" "}
                <span className="text-[11px] uppercase tracking-wide text-[#7D8590]">{s.label}</span>
              </div>
            ))}
          </div>
          <ul className="mb-4 space-y-2">
            {project.details.map((d, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-[#B4BCC9]">
                <span className="mt-1 text-[#3FB950]">·</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#21262D] bg-[#131A24] px-2.5 py-1 font-mono text-[11px] text-[#8B93A7]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Page() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F16] font-sans text-[#E6EDF3] antialiased">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-[#21262D] bg-[#0A0F16]/85 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#" className="font-mono text-sm font-semibold tracking-tight text-[#E6EDF3]">
            anurag<span className="text-[#3FB950]">.</span>dev
          </a>
          <div className="hidden items-center gap-6 sm:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="font-mono text-[13px] text-[#8B93A7] transition-colors hover:text-[#E6EDF3]"
              >
                {n.label}
              </a>
            ))}
          </div>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[#21262D] px-3 py-1.5 font-mono text-[12px] text-[#E6EDF3] transition-colors hover:border-[#3FB950]/50 hover:text-[#3FB950]"
          >
            github ↗
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-12 px-6 pb-20 pt-16 lg:flex-row lg:items-center lg:pt-24">
        <div className="flex-1">
          <p className="mb-4 font-mono text-[13px] text-[#3FB950]">GET / — {PROFILE.location}</p>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-[#E6EDF3] sm:text-5xl">
            {PROFILE.name}
          </h1>
          <p className="mt-4 max-w-md text-lg text-[#8B93A7]">
            Building full-stack MERN systems — auth, RBAC, and REST APIs that hold up under real
            requests, not just demos.
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#6E7681]">
            3 production-grade MERN applications, 28+ REST endpoints shipped, and a security-first
            approach to sessions, tokens, and access control.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-md bg-[#3FB950] px-5 py-2.5 font-mono text-[13px] font-semibold text-[#0A0F16] transition-opacity hover:opacity-90"
            >
              view projects
            </a>
            <a
              href="#contact"
              className="rounded-md border border-[#21262D] px-5 py-2.5 font-mono text-[13px] text-[#E6EDF3] transition-colors hover:border-[#30363D]"
            >
              get in touch
            </a>
          </div>
        </div>
        <div className="flex flex-1 justify-center lg:justify-end">
          <HeroTerminal />
        </div>
      </section>

      {/* Summary */}
      <section id="summary" className="mx-auto max-w-5xl px-6 py-16">
        <SectionLabel route="/summary" title="Summary" />
        <p className="max-w-3xl text-base leading-relaxed text-[#B4BCC9] sm:text-lg">
          Computer Science undergraduate (B.Tech, CSE) who has independently designed and built 3
          production-grade MERN applications through personal projects — collectively exposing
          28+ REST API endpoints. Implemented JWT authentication, role-based access control, and
          secure session management across all systems, backed by a strong foundation in Data
          Structures and Algorithms, DBMS, Operating Systems, and Computer Networks.
        </p>
      </section>

      {/* Schema / Skills */}
      <section id="schema" className="mx-auto max-w-5xl px-6 py-16">
        <SectionLabel route="/schema" title="Skills schema" />
        <div className="rounded-lg border border-[#21262D] bg-[#0D1117] p-6">
          <p className="mb-5 font-mono text-[13px] text-[#7D8590]">
            <span className="text-[#79C0FF]">const</span> SkillSchema ={" "}
            <span className="text-[#79C0FF]">new</span> Schema({"{"}
          </p>
          <div className="grid gap-4 pl-4 sm:grid-cols-2">
            {SKILL_SCHEMA.map((row) => (
              <div key={row.field} className="rounded border border-[#21262D] bg-[#131A24] p-4">
                <div className="mb-2 flex items-baseline gap-2 font-mono text-[13px]">
                  <span className="text-[#79C0FF]">{row.field}</span>
                  <span className="text-[#7D8590]">: {row.type}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {row.values.map((v) => (
                    <span
                      key={v}
                      className="rounded bg-[#0D1117] px-2 py-1 font-mono text-[11px] text-[#B4BCC9]"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 font-mono text-[13px] text-[#7D8590]">{"}"});</p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-5xl px-6 py-16">
        <SectionLabel route="/projects" title="Projects" />
        <p className="mb-6 max-w-2xl text-sm text-[#7D8590]">
          Tap a route to expand — each one returns the endpoints, schemas, and decisions behind it.
        </p>
        <div className="flex flex-col gap-4">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.route} project={p} />
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="education" className="mx-auto max-w-5xl px-6 py-16">
        <SectionLabel route="/education" title="Education & certifications" />
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-4 font-mono text-[13px] uppercase tracking-wide text-[#7D8590]">Education</h3>
            <div className="flex flex-col gap-5">
              {EDUCATION.map((e) => (
                <div key={e.school} className="border-l-2 border-[#21262D] pl-4">
                  <p className="font-mono text-[12px] text-[#3FB950]">{e.period}</p>
                  <p className="mt-1 font-semibold text-[#E6EDF3]">{e.school}</p>
                  <p className="text-sm text-[#8B93A7]">{e.degree}</p>
                  <p className="text-sm text-[#6E7681]">
                    {e.location ? `${e.location} · ` : ""}
                    {e.score}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-mono text-[13px] uppercase tracking-wide text-[#7D8590]">Certifications</h3>
            <div className="flex flex-col gap-5">
              {CERTIFICATIONS.map((c) => (
                <div key={c.name} className="border-l-2 border-[#21262D] pl-4">
                  <p className="font-semibold text-[#E6EDF3]">{c.name}</p>
                  <p className="text-sm text-[#8B93A7]">{c.issuer}</p>
                  <p className="text-sm text-[#6E7681]">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel route="/contact" title="Get in touch" />
        <div className="rounded-lg border border-[#21262D] bg-[#0D1117] p-6 sm:p-8">
          <p className="mb-6 max-w-md text-[#8B93A7]">
            Open to full-stack and backend roles. The fastest way to reach me is email — I'll
            respond within a day or two.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={copyEmail}
              className="flex items-center justify-between rounded-md border border-[#21262D] bg-[#131A24] px-4 py-3 text-left font-mono text-sm text-[#E6EDF3] transition-colors hover:border-[#3FB950]/50"
            >
              <span>{PROFILE.email}</span>
              <span className="text-[11px] text-[#3FB950]">{copied ? "copied ✓" : "copy"}</span>
            </button>
            <a
              href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
              className="flex items-center rounded-md border border-[#21262D] bg-[#131A24] px-4 py-3 font-mono text-sm text-[#E6EDF3] transition-colors hover:border-[#3FB950]/50"
            >
              {PROFILE.phone}
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center rounded-md border border-[#21262D] bg-[#131A24] px-4 py-3 font-mono text-sm text-[#E6EDF3] transition-colors hover:border-[#3FB950]/50"
            >
              github.com/AnuragSingh-git
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center rounded-md border border-[#21262D] bg-[#131A24] px-4 py-3 font-mono text-sm text-[#E6EDF3] transition-colors hover:border-[#3FB950]/50"
            >
              linkedin.com/in/anurag-singh
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#21262D] px-6 py-8 text-center font-mono text-[12px] text-[#6E7681]">
        {"// "}built by {PROFILE.name} · status: 200 OK
      </footer>
    </div>
  );
}

function SectionLabel({ route, title }: { route: string; title: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-3">
      <span className="font-mono text-[12px] text-[#7D8590]">{route}</span>
      <h2 className="text-2xl font-bold text-[#E6EDF3] sm:text-3xl">{title}</h2>
    </div>
  );
}
