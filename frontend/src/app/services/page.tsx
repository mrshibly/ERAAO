"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldAlert, Bot, Zap, Globe, Smartphone, Server, Network, Skull,
  Cpu, Radio, Search, Activity, RefreshCw, Sliders, TrendingUp,
  Database, BarChart3, Brain, Layout, Layers, Terminal, Video,
  ArrowRight, CheckCircle2, Sparkles, MessageSquareQuote, LayoutGrid,
  ListFilter, X, ShieldCheck, Lock, CheckCircle, ArrowUpRight
} from "lucide-react";
import { SERVICES_CATALOG, SERVICE_CATEGORIES, ServiceItem } from "@/data/servicesData";

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldAlert,
  Bot,
  Zap,
  Globe,
  Smartphone,
  Server,
  Network,
  Skull,
  Cpu,
  Radio,
  Search,
  Activity,
  RefreshCw,
  Sliders,
  TrendingUp,
  Database,
  BarChart3,
  Brain,
  Layout,
  Layers,
  Terminal,
  Video,
};

const CATEGORY_META: Record<string, { badge: string; title: string; desc: string }> = {
  "all": {
    badge: "23 PROFESSIONAL PRACTICES",
    title: "Complete Enterprise Services Catalog",
    desc: "Direct access to lead offensive security practitioners, AI architects, full-stack software engineers, and media production directors."
  },
  "cybersecurity": {
    badge: "OFFENSIVE SECURITY & TESTING",
    title: "Security & Penetration Testing (11 Practices)",
    desc: "Adversarial red teaming, AI-assisted pentesting, cloud infrastructure audits, and code reviews to neutralize threat vectors before adversaries exploit them."
  },
  "ai-automation": {
    badge: "APPLIED AI & AUTOMATION",
    title: "Autonomous AI & LLM Systems (7 Practices)",
    desc: "Enterprise RAG pipelines, fine-tuned agentic workflows, autonomous customer operations, and predictive machine learning models."
  },
  "software-engineering": {
    badge: "SOFTWARE & SAAS STUDIO",
    title: "Custom Software & Multi-Tenant SaaS (4 Practices)",
    desc: "High-performance web applications, native cross-platform mobile apps, cloud-native APIs, and scalable SaaS infrastructure."
  },
  "creative-media": {
    badge: "MEDIA & MOTION GRAPHICS",
    title: "4K Media Production & Course Production (1 Practice)",
    desc: "Cinematic product walk-throughs, technical curriculum lesson capture, and high-impact motion graphics explaining complex architectures."
  }
};

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "matrix">("grid");

  const filteredServices = useMemo(() => {
    return SERVICES_CATALOG.filter((item: ServiceItem) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deliverables.some((d) =>
          d.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeMeta = CATEGORY_META[selectedCategory] || CATEGORY_META["all"];

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      
      {/* ═══════════════════════════════════════════════════════════════
          SERVICES HERO SECTION — Modern Glow & Trust Metrics
          ═══════════════════════════════════════════════════════════════ */}
      <section className="services-hero">
        <div className="services-hero-glow" />
        
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", maxWidth: "48rem", margin: "0 auto" }}>
            
            <span className="badge badge-teal" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 1rem", marginBottom: "1.25rem", borderRadius: "var(--radius-full)" }}>
              <Sparkles size={14} style={{ color: "var(--accent-teal)" }} /> Enterprise Technical Engineering &amp; Offensive Security
            </span>

            <h1 className="hero-title" style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              High-Assurance AI Systems,{" "}
              <span className="gradient-text-animated" style={{
                background: "linear-gradient(135deg, var(--accent-teal) 0%, var(--accent-blue) 50%, var(--accent-violet) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                Pentesting &amp; Software Studio
              </span>
            </h1>

            <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: "42rem", margin: "0 auto" }}>
              23 specialized practices spanning adversarial red teaming, private on-premise AI deployments, multi-tenant SaaS architecture, and technical media production.
            </p>
          </div>

          {/* 4-Metric Trust Bar */}
          <div className="academy-stat-grid" style={{ marginTop: "3rem" }}>
            <div className="academy-stat-card">
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "var(--accent-teal-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-teal)", flexShrink: 0 }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <div style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>0% False Positives</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Manual PoC Exploit Proofs</div>
              </div>
            </div>

            <div className="academy-stat-card">
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "var(--accent-blue-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-blue)", flexShrink: 0 }}>
                <Brain size={22} />
              </div>
              <div>
                <div style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>Private &amp; On-Prem AI</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Zero Data Leakage</div>
              </div>
            </div>

            <div className="academy-stat-card">
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(124, 58, 237, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-violet)", flexShrink: 0 }}>
                <Zap size={22} />
              </div>
              <div>
                <div style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>72-Hour SLA</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Remediation Re-testing</div>
              </div>
            </div>

            <div className="academy-stat-card">
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-success)", flexShrink: 0 }}>
                <Lock size={22} />
              </div>
              <div>
                <div style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>Enterprise NDA</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Encrypted Deliverables</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PRACTICE PILLARS & CATALOG SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "3.5rem 0", background: "var(--bg-secondary)" }}>
        <div className="container">
          
          {/* Master Practice Tabs */}
          <div className="services-category-grid">
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`services-category-btn ${isActive ? "active" : ""}`}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "0.15rem 0.55rem",
                      borderRadius: "9999px",
                      backgroundColor: isActive ? "var(--accent-teal)" : "rgba(148, 163, 184, 0.15)",
                      color: isActive ? "#ffffff" : "var(--text-muted)"
                    }}>
                      {cat.count} {cat.count === 1 ? "PRACTICE" : "PRACTICES"}
                    </span>
                  </div>
                  <div style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: isActive ? "var(--accent-teal)" : "var(--text-primary)",
                    lineHeight: 1.25
                  }}>
                    {cat.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pillar Briefing Card + Toolbar */}
          <div className="card" style={{
            padding: "1.75rem 2rem",
            borderRadius: "var(--radius-xl)",
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            marginBottom: "2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
            boxShadow: "var(--shadow-sm)"
          }}>
            <div style={{ maxWidth: "42rem" }}>
              <span className="badge badge-teal" style={{ marginBottom: "0.5rem" }}>
                {activeMeta.badge}
              </span>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                {activeMeta.title}
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                {activeMeta.desc}
              </p>
            </div>

            {/* Search Box & View Mode Toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <div style={{ position: "relative", minWidth: "260px" }}>
                <Search size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="text"
                  placeholder="Search practices (e.g. pentest, RAG, iOS, red team)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field"
                  style={{
                    paddingLeft: "2.5rem",
                    paddingRight: "2.2rem",
                    borderRadius: "var(--radius-full)",
                    background: "var(--bg-secondary)"
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* View Mode Buttons */}
              <div style={{
                display: "flex",
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-full)",
                padding: "0.2rem",
                gap: "0.2rem"
              }}>
                <button
                  onClick={() => setViewMode("grid")}
                  style={{
                    padding: "0.45rem 0.85rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    border: "none",
                    backgroundColor: viewMode === "grid" ? "var(--accent-teal)" : "transparent",
                    color: viewMode === "grid" ? "#ffffff" : "var(--text-secondary)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem"
                  }}
                  title="Visual Cards View"
                >
                  <LayoutGrid size={14} />
                  <span>Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("matrix")}
                  style={{
                    padding: "0.45rem 0.85rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    border: "none",
                    backgroundColor: viewMode === "matrix" ? "var(--accent-teal)" : "transparent",
                    color: viewMode === "matrix" ? "#ffffff" : "var(--text-secondary)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem"
                  }}
                  title="Compact Technical Matrix View"
                >
                  <ListFilter size={14} />
                  <span>List</span>
                </button>
              </div>
            </div>
          </div>

          {/* Empty Search State */}
          {filteredServices.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-secondary)", marginBottom: "4rem", background: "var(--card-bg)" }}>
              <div style={{
                width: "3.5rem",
                height: "3.5rem",
                borderRadius: "50%",
                backgroundColor: "rgba(13, 148, 136, 0.1)",
                color: "var(--accent-teal)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem"
              }}>
                <Search size={28} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                No practices found matching &quot;{searchQuery}&quot;
              </h3>
              <p style={{ maxWidth: "28rem", margin: "0 auto 1.5rem", fontSize: "0.875rem" }}>
                Try searching for terms like &quot;pentest&quot;, &quot;chatbot&quot;, &quot;mobile&quot;, or &quot;cloud audit&quot;.
              </p>
              <button
                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                className="btn btn-outline"
                style={{ padding: "0.6rem 1.4rem" }}
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* =========================================================
               VISUAL CARDS GRID VIEW
               ========================================================= */
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.75rem",
              marginBottom: "4rem"
            }}>
              {filteredServices.map((service, index) => {
                const IconComponent = ICON_MAP[service.iconName] || ShieldAlert;
                return (
                  <div key={service.id} className="services-card">
                    
                    {/* Thumbnail Image */}
                    <div className="services-card-image-wrap">
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                        loading="lazy"
                      />
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(11,15,23,0.9) 0%, rgba(11,15,23,0.3) 60%, transparent 100%)"
                      }} />
                      
                      {/* Badge */}
                      <div style={{
                        position: "absolute",
                        bottom: "0.85rem",
                        left: "1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}>
                        <span style={{
                          padding: "0.25rem 0.65rem",
                          borderRadius: "9999px",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          backgroundColor: "rgba(13, 148, 136, 0.95)",
                          color: "#ffffff",
                          backdropFilter: "blur(4px)"
                        }}>
                          {service.badge}
                        </span>
                      </div>

                      {/* Numbering */}
                      <div style={{
                        position: "absolute",
                        top: "0.85rem",
                        right: "1rem",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "6px",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        fontFamily: "monospace",
                        backgroundColor: "rgba(11, 15, 23, 0.8)",
                        color: "var(--accent-teal)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(4px)"
                      }}>
                        {(index + 1).toString().padStart(2, "0")}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem" }}>
                        <div style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          borderRadius: "var(--radius-md)",
                          backgroundColor: "rgba(13, 148, 136, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--accent-teal)",
                          flexShrink: 0
                        }}>
                          <IconComponent size={20} />
                        </div>
                        <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.3 }}>
                          {service.title}
                        </h3>
                      </div>

                      <p style={{
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        marginBottom: "1.25rem",
                        flexGrow: 1
                      }}>
                        {service.shortDescription}
                      </p>

                      {/* Key Deliverables */}
                      <div style={{ marginBottom: "1.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                        <div style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "0.6rem" }}>
                          Verified Deliverables
                        </div>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                          {service.deliverables.slice(0, 3).map((d, i) => (
                            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                              <CheckCircle2 size={14} style={{ color: "var(--accent-teal)", flexShrink: 0, marginTop: "0.15rem" }} />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "auto" }}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="btn btn-primary"
                          style={{ flex: 1, padding: "0.6rem 0.85rem", fontSize: "0.825rem", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "0.4rem", borderRadius: "var(--radius-md)", fontWeight: 700 }}
                        >
                          <span>Explore Scope</span>
                          <ArrowRight size={14} />
                        </Link>
                        <Link
                          href={`/quote?service=${service.slug}`}
                          className="btn btn-outline"
                          style={{ padding: "0.6rem 0.85rem", fontSize: "0.825rem", display: "inline-flex", alignItems: "center", gap: "0.35rem", borderRadius: "var(--radius-md)" }}
                          title="Request Quote"
                        >
                          <MessageSquareQuote size={14} />
                          <span>Quote</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* =========================================================
               COMPACT MATRIX TABLE VIEW
               ========================================================= */
            <div className="card" style={{
              padding: 0,
              overflow: "hidden",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--card-bg)",
              marginBottom: "4rem",
              boxShadow: "var(--shadow-sm)"
            }}>
              <div style={{ overflowX: "auto", width: "100%" }}>
                <div style={{ minWidth: "720px" }}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "60px 2.2fr 3.5fr 1.2fr 180px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    backgroundColor: "var(--bg-secondary)",
                    borderBottom: "1px solid var(--border-color)",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--text-muted)"
                  }}>
                    <div>#</div>
                    <div>Practice Area</div>
                    <div>Scope &amp; Deliverables Summary</div>
                    <div>Badge</div>
                    <div style={{ textAlign: "right" }}>Actions</div>
                  </div>

                  {filteredServices.map((service, index) => {
                    const IconComponent = ICON_MAP[service.iconName] || ShieldAlert;
                    return (
                      <div
                        key={service.id}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "60px 2.2fr 3.5fr 1.2fr 180px",
                          gap: "1rem",
                          padding: "1.25rem 1.5rem",
                          borderBottom: index === filteredServices.length - 1 ? "none" : "1px solid var(--border-color)",
                          alignItems: "center"
                        }}
                      >
                        <div style={{ fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 800, color: "var(--accent-teal)" }}>
                          {(index + 1).toString().padStart(2, "0")}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{
                            width: "2.25rem",
                            height: "2.25rem",
                            borderRadius: "8px",
                            backgroundColor: "rgba(13, 148, 136, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--accent-teal)",
                            flexShrink: 0
                          }}>
                            <IconComponent size={16} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>{service.title}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "capitalize" }}>{service.categoryLabel}</div>
                          </div>
                        </div>
                        <div style={{ fontSize: "0.825rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                          {service.shortDescription}
                        </div>
                        <div>
                          <span style={{
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            padding: "0.2rem 0.55rem",
                            borderRadius: "9999px",
                            backgroundColor: "rgba(13, 148, 136, 0.1)",
                            color: "var(--accent-teal)"
                          }}>
                            {service.badge}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="btn btn-outline"
                            style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem", borderRadius: "var(--radius-sm)" }}
                          >
                            Scope
                          </Link>
                          <Link
                            href={`/quote?service=${service.slug}`}
                            className="btn btn-primary"
                            style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem", borderRadius: "var(--radius-sm)" }}
                          >
                            Quote ↗
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          HOW WE ENGAGE — Engineering Workflow
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", background: "var(--bg-primary)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          
          <div style={{ textAlign: "center", maxWidth: "42rem", margin: "0 auto 3.5rem auto" }}>
            <span className="badge badge-teal" style={{ marginBottom: "0.75rem" }}>
              Engagement Lifecycle
            </span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              How We Deliver Enterprise Projects
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6, marginTop: "0.75rem" }}>
              Every engagement follows structured milestones with transparent milestones, daily engineering syncs, and executive-ready deliverables.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.75rem" }}>
            
            <div className="services-workflow-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "var(--accent-teal-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-teal)", fontWeight: 800 }}>
                  01
                </div>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 700 }}>PHASE 1</span>
              </div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Scoping &amp; Threat Modeling
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Technical scoping call with senior architects. We sign mutual NDAs, map infrastructure topologies, define test boundaries, and establish rules of engagement.
              </p>
            </div>

            <div className="services-workflow-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "var(--accent-blue-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-blue)", fontWeight: 800 }}>
                  02
                </div>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 700 }}>PHASE 2</span>
              </div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Execution &amp; Active Sprint
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Our specialists execute manual adversary simulation, AI model fine-tuning, or software buildout with encrypted daily progress reports.
              </p>
            </div>

            <div className="services-workflow-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(124, 58, 237, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-violet)", fontWeight: 800 }}>
                  03
                </div>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 700 }}>PHASE 3</span>
              </div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Delivery, Handover &amp; Retests
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Full executive report, verified code repositories, and free 72-hour remediation validation re-tests to guarantee vulnerability closure.
              </p>
            </div>

          </div>

          {/* Global CTA Banner */}
          <div style={{
            marginTop: "4.5rem",
            padding: "3.5rem 2.5rem",
            textAlign: "center",
            borderRadius: "var(--radius-xl)",
            background: "linear-gradient(135deg, #090d16 0%, #042f2e 100%)",
            border: "1px solid rgba(13, 148, 136, 0.3)",
            color: "white",
            boxShadow: "var(--shadow-xl)"
          }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "#ffffff", marginBottom: "0.75rem" }}>
              Need a Custom Enterprise Engagement?
            </h2>
            <p style={{ maxWidth: "40rem", margin: "0 auto 2rem", color: "#94a3b8", fontSize: "var(--text-base)", lineHeight: 1.6 }}>
              We assemble dedicated multi-disciplinary squads combining senior ethical hackers, full-stack engineers, and AI architects for high-stakes projects.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/book" className="btn btn-primary" style={{ padding: "0.85rem 1.75rem", borderRadius: "var(--radius-md)", fontWeight: 700 }}>
                <span>Book Technical Discovery Call</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/quote" className="btn btn-outline" style={{ padding: "0.85rem 1.75rem", borderRadius: "var(--radius-md)", fontWeight: 600, color: "white", borderColor: "rgba(255, 255, 255, 0.2)" }}>
                <span>Instant Project Quote</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
