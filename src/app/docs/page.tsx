"use client";

import React, { useState } from "react";
import AppShell from "@/components/shell/AppShell";
import "../docs.css";

// MOCK DATA for Live Data Integration
const MOCK_FEATURES = [
  { name: "AI Query Generation", status: "Live", type: "live" },
  { name: "Web Crawler Engine", status: "Live", type: "live" },
  { name: "Trust Scoring Pipeline", status: "Live", type: "live" },
  { name: "Verification System", status: "Beta", type: "beta" },
  { name: "Knowledge Graph", status: "Planned", type: "planned" },
];

const MOCK_TEAM = [
  {
    name: "Mohammad Tonmoy Hossain Jifat",
    role: "AI Orchestration + DevOps Lead",
    image: "/PP/jifat.JPG",
  },
  {
    name: "Md. Adib Hasan",
    role: "Frontend Developer",
    image: "/PP/adib.jpg",
  },
  {
    name: "Shafayet Huda Sadi",
    role: "Backend API + DB Engineer",
    image: "/PP/sadi.JPG",
  },
  {
    name: "Shajjad Siyam",
    role: "Scraping & Crawling",
    image: "/PP/siyam.JPG",
  },
  {
    name: "Mahmudul Hasan",
    role: "Extraction & Scoring",
    image: "/PP/hasan.JPG",
  },
];

export default function DocsPage() {
  const crumbs = [{ label: "Workspace" }, { label: "Documentation", current: true }];

  // Access Control State
  const [isAdmin] = useState(true); // Mock admin state
  const [isPublic, setIsPublic] = useState(true);
  const [scheduleStart, setScheduleStart] = useState("2026-06-10T00:00");
  const [scheduleEnd, setScheduleEnd] = useState("2026-06-14T23:59");

  // If not admin and not public, show restricted view
  if (!isAdmin && !isPublic) {
    return (
      <AppShell crumbs={crumbs}>
        <div className="content">
          <div className="restricted-view">
            <h1>🔒 Not Available</h1>
            <p>This documentation is currently restricted or outside of its scheduled publishing window.</p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell crumbs={crumbs}>
      <main className="content">
        {isAdmin && (
          <div className="admin-banner">
            <div>
              <strong>Admin Controls:</strong> Document Visibility is currently <strong>{isPublic ? "PUBLIC" : "HIDDEN"}</strong>.
              Scheduled window: {scheduleStart.replace("T", " ")} to {scheduleEnd.replace("T", " ")}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setIsPublic(!isPublic)}>
                Toggle {isPublic ? "OFF" : "ON"}
              </button>
              <button onClick={() => alert("Open Scheduling Modal (Mock)")}>Edit Schedule</button>
            </div>
          </div>
        )}

        <div className="docs-container">
          {/* Sticky Navigation */}
          <nav className="docs-nav">
            <h4>Pitch Deck</h4>
            <ul>
              <li><a href="#problem">Problem & Solution</a></li>
              <li><a href="#market">Market & Business</a></li>
              <li><a href="#advantage">Unique Advantage</a></li>
              <li><a href="#team">Team & Vision</a></li>
            </ul>

            <h4>Technical Docs</h4>
            <ul>
              <li><a href="#overview">Product Overview</a></li>
              <li><a href="#features">Feature Matrix</a></li>
              <li><a href="#architecture">Architecture Diagram</a></li>
              <li><a href="#tech-stack">Technology Stack</a></li>
              <li><a href="#api">API Documentation</a></li>
              <li><a href="#data-ai">Data & AI Layer</a></li>
              <li><a href="#roadmap">Roadmap & Scalability</a></li>
            </ul>
          </nav>

          {/* Main Content */}
          <div className="docs-content">
            <header className="docs-header">
              <h1>InfluenceIQ Documentation</h1>
              <p>
                The AI-powered, trust-aware influencer discovery platform. Live system view,
                technical whitepaper, and business pitch deck.
              </p>
            </header>

            {/* --- PITCH DECK SECTIONS --- */}
            <section id="problem" className="docs-section">
              <h2>Problem & Solution</h2>
              <h3>The Problem</h3>
              <p>
                Brands spend massive amounts of time and money trying to find the right influencers. 
                Existing platforms focus on vanity metrics (follower count, likes), which fails to 
                determine if an influencer is actually trustworthy, credible, or aligned with a brand's reputation.
                This leads to partnerships with creators who have fake followers, spread misinformation, or pose brand safety risks.
              </p>
              <h3>The Solution</h3>
              <p>
                InfluenceIQ is an AI-powered platform that evaluates influencers based on credibility, 
                audience trust, engagement quality, and brand safety. Instead of asking "Who is popular?", 
                we answer "Who should a brand actually trust?".
              </p>
              <h3>Why Now?</h3>
              <p>
                As influencer marketing budgets grow, so does the risk of brand damage from poor partnerships. 
                With recent advancements in LLMs and NLP, it is now possible to programmatically evaluate 
                qualitative trust signals at scale.
              </p>
            </section>

            <section id="market" className="docs-section">
              <h2>Market & Business Model</h2>
              <h3>Market Opportunity</h3>
              <p>
                The influencer marketing industry is valued at over $21 Billion. Mid-market and enterprise 
                brands are shifting budgets from traditional ads to creator partnerships, requiring enterprise-grade 
                vetting and compliance tools.
              </p>
              <h3>Business Model</h3>
              <p>
                B2B SaaS tiered subscription model. Basic tiers for targeted campaign discovery, Enterprise tiers 
                for API access, continuous brand safety monitoring, and custom RAG-based credential verification.
              </p>
            </section>

            <section id="advantage" className="docs-section">
              <h2>Unique Advantage & Competition</h2>
              <h3>Competition</h3>
              <p>
                Incumbents (e.g., Grin, Aspire, Upfluence) act as CRM tools that focus on workflow and vanity 
                metrics. They require brands to manually vet the content and credibility of creators.
              </p>
              <h3>Unique Advantage</h3>
              <p>
                We are building the first <strong>Trust Scoring Engine</strong>. Our recursive crawling pipeline, 
                combined with multi-pass identity resolution and LLM-driven brand safety classification, provides 
                an explainable, data-backed Trust Grade (A+ to D) for every creator.
              </p>
            </section>

            <section id="team" className="docs-section">
              <h2>Team</h2>
              <div className="team-grid">
                {MOCK_TEAM.map((member) => (
                  <div key={member.name} className="team-card">
                    <img src={member.image} alt={member.name} className="team-avatar-img" />
                    <h4>{member.name}</h4>
                    <div className="role">{member.role}</div>
                  </div>
                ))}
              </div>
            </section>

            <hr style={{ margin: "64px 0", border: "0", borderTop: "1px solid var(--line)" }} />

            {/* --- TECHNICAL DOCS SECTIONS --- */}
            <section id="overview" className="docs-section">
              <h2>Product Overview</h2>
              <p>
                InfluenceIQ is a modular monolith built for speed, observability, and scale. Brands input 
                campaign parameters, our AI generates search queries, Celery workers recursively scrape the web, 
                and NLP pipelines extract and score entities. The frontend subscribes to real-time WebSocket 
                events to visualize this data pipeline live.
              </p>
            </section>

            <section id="features" className="docs-section">
              <h2>Feature Matrix (Live Sync)</h2>
              <table className="docs-table">
                <thead>
                  <tr>
                    <th>Feature Module</th>
                    <th>Current Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_FEATURES.map((feature) => (
                    <tr key={feature.name}>
                      <td>{feature.name}</td>
                      <td>
                        <span className={`status-indicator status-${feature.type}`}>
                          {feature.type === 'live' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></span>}
                          {feature.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section id="architecture" className="docs-section">
              <h2>Architecture Diagram</h2>
              <div className="arch-diagram">
                <svg viewBox="0 0 800 300" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="50" y="100" width="150" height="100" rx="8" fill="var(--paper)" stroke="var(--line)" strokeWidth="2"/>
                  <text x="125" y="155" textAnchor="middle" fill="var(--ink)" fontFamily="inherit" fontSize="14" fontWeight="500">Next.js Frontend</text>
                  
                  <path d="M200 150 L300 150" stroke="var(--violet)" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)"/>
                  <text x="250" y="140" textAnchor="middle" fill="var(--muted)" fontSize="12">WebSockets / API</text>

                  <rect x="300" y="50" width="200" height="200" rx="8" fill="var(--paper)" stroke="var(--line)" strokeWidth="2"/>
                  <text x="400" y="80" textAnchor="middle" fill="var(--ink)" fontFamily="inherit" fontSize="16" fontWeight="600">FastAPI Backend</text>
                  <rect x="320" y="100" width="160" height="30" rx="4" fill="var(--cyan-soft)" stroke="var(--cyan)"/>
                  <text x="400" y="120" textAnchor="middle" fill="var(--cyan-ink)" fontSize="12">Celery + Redis</text>
                  <rect x="320" y="140" width="160" height="30" rx="4" fill="var(--coral-soft)" stroke="var(--coral)"/>
                  <text x="400" y="160" textAnchor="middle" fill="var(--coral-ink)" fontSize="12">Scraping Workers</text>
                  <rect x="320" y="180" width="160" height="30" rx="4" fill="var(--violet-soft)" stroke="var(--violet)"/>
                  <text x="400" y="200" textAnchor="middle" fill="var(--violet-ink)" fontSize="12">AI Scoring Workers</text>

                  <path d="M500 150 L600 150" stroke="var(--line)" strokeWidth="2" markerEnd="url(#arrow)"/>

                  <rect x="600" y="100" width="150" height="100" rx="8" fill="var(--paper)" stroke="var(--line)" strokeWidth="2"/>
                  <text x="675" y="145" textAnchor="middle" fill="var(--ink)" fontFamily="inherit" fontSize="14" fontWeight="500">PostgreSQL</text>
                  <text x="675" y="165" textAnchor="middle" fill="var(--ink)" fontFamily="inherit" fontSize="12">+ pgvector</text>

                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/>
                    </marker>
                  </defs>
                </svg>
              </div>
              <p>
                <strong>Data Flow:</strong> Brand Inputs Campaign &rarr; AI Generates Queries &rarr; Celery Workers Scrape Web &rarr; 
                Entity Extraction &rarr; Trust Scoring &rarr; Real-Time WebSocket Update &rarr; Ranked Recommendations.
              </p>
            </section>

            <section id="tech-stack" className="docs-section">
              <h2>Technology Stack</h2>
              <ul>
                <li><strong>Frontend:</strong> Next.js 16, React 19, Vanilla CSS (CSS variables design system).</li>
                <li><strong>Backend:</strong> Python, FastAPI.</li>
                <li><strong>Async Workers:</strong> Celery with Redis broker (4 specific queues: search, crawl, extract, score).</li>
                <li><strong>Database:</strong> PostgreSQL with pgvector for embeddings and semantic similarity.</li>
                <li><strong>Scraping:</strong> Playwright (JS-rendered pages) + BeautifulSoup (static HTML), rotating proxies.</li>
                <li><strong>AI Models:</strong> Kimi K2 (Long context), Gemini 2.5 Flash (Fast multi-label), DeepSeek V4 (JSON struct).</li>
              </ul>
            </section>

            <section id="api" className="docs-section">
              <h2>API Documentation</h2>
              <p>The system exposes REST APIs and a WebSocket stream for real-time orchestration.</p>
              <div className="code-block">
                POST /api/campaigns<br/>
                GET  /api/campaigns/{"{id}"}<br/>
                GET  /api/campaigns/{"{id}"}/influencers<br/>
                WS   /ws/campaign/{"{campaign_id}"}
              </div>
              <p>
                <strong>WebSocket Reconnection:</strong> All pipeline events are appended to a Redis list with a 1-hour TTL. 
                On reconnection, the server replays the event list so the UI can reconstruct its state seamlessly.
              </p>
            </section>

            <section id="data-ai" className="docs-section">
              <h2>Data & AI Layer</h2>
              <h3>Data Layer & Provenance</h3>
              <p>
                Every scraped data point retains its source URL. Before fetching, a Redis URL cache check (48h TTL) 
                is performed to drastically reduce scraping redundancy and API limits.
              </p>
              <h3>AI Layer</h3>
              <p>
                We employ a hybrid approach. Deterministic tools (Regex, spaCy NER, blocklists) run first to reduce LLM costs. 
                LLMs are utilized for edge-case identity resolution, brand-safety classification, and explaining the final trust score. 
                A multi-model strategy ensures we use the best (and cheapest) model for each specific task.
              </p>
            </section>

            <section id="roadmap" className="docs-section">
              <h2>Roadmap, Scalability & Security</h2>
              <h3>Roadmap</h3>
              <ul>
                <li><strong>Phase 1 (Live):</strong> Core pipeline, scraping, deterministic scoring.</li>
                <li><strong>Phase 2 (Upcoming):</strong> Verification System (LinkedIn API, credential checks, ML fraud detection).</li>
                <li><strong>Phase 3 (Planned):</strong> Knowledge Graph (Influencer relationship mapping, authority propagation).</li>
              </ul>
              <h3>Scalability & Performance</h3>
              <p>
                Celery workers scale independently. Crawl workers (I/O bound) run with high concurrency. Extract workers 
                (CPU/LLM bound) are restricted to manage rate limits and token budgets.
              </p>
              <h3>Security & Privacy</h3>
              <p>
                We do not auto-reject influencers based on AI evaluation; we flag them for human review with source citations. 
                Scraped data undergoes PII scrubbing (emails, phone numbers removed) before entering the vector database.
              </p>
            </section>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
