"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
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
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MessageSquareQuote,
  LayoutGrid,
  ListFilter,
  X
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
    badge: "23 PROFESSIONAL SERVICES",
    title: "Complete Services Catalog",
    desc: "Direct support from experienced specialists in cyber security, AI automation, custom web and mobile development, and video production."
  },
  "cybersecurity": {
    badge: "SECURITY & SYSTEM TESTING",
    title: "Security & Penetration Testing (11 Services)",
    desc: "We find and fix security issues in your websites, apps, and company networks before attackers can find them."
  },
  "ai-automation": {
    badge: "AI & SMART AUTOMATION",
    title: "AI & Automation Systems (7 Services)",
    desc: "We build smart AI chatbots, connect your documents to private search, and automate repetitive tasks to save your team time."
  },
  "software-engineering": {
    badge: "WEB & APP DEVELOPMENT",
    title: "Custom Software & SaaS Studio (4 Services)",
    desc: "We design and build fast, reliable websites, web apps, mobile apps, and custom software tailored to your business needs."
  },
  "creative-media": {
    badge: "VIDEO & MEDIA PRODUCTION",
    title: "Video Production & Motion Graphics (1 Service)",
    desc: "We create clean, engaging videos, product walk-throughs, course lessons, and animations that clearly explain what you do."
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
    <div style={{ padding: "var(--spacing-section) 0", minHeight: "80vh" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-badge" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <Sparkles size={14} /> Enterprise Technical Solutions
          </span>
          <h1 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, marginTop: "0.75rem", marginBottom: "1rem" }}>
            Expert AI, Cybersecurity &amp; Engineering Services
          </h1>
          <p className="section-subtitle" style={{ maxWidth: "48rem", margin: "0 auto", color: "var(--text-secondary)", fontSize: "var(--text-lg)" }}>
            From adversarial red teaming and AI-assisted penetration tests to custom multi-tenant SaaS architectures, autonomous AI agents, and 4K media production.
          </p>
        </div>

        {/* Master Category Tabs Bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: "1rem 1.25rem",
                  borderRadius: "var(--radius-lg)",
                  textAlign: "left",
                  cursor: "pointer",
                  border: isActive ? "1px solid var(--accent-teal)" : "1px solid var(--border-color)",
                  backgroundColor: isActive ? "var(--bg-secondary)" : "var(--bg-primary)",
                  boxShadow: isActive ? "0 8px 24px rgba(13, 148, 136, 0.15)" : "var(--shadow-xs)",
                  transition: "all 0.25s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "0.5rem"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "0.15rem 0.55rem",
                    borderRadius: "9999px",
                    backgroundColor: isActive ? "var(--accent-teal)" : "var(--bg-secondary)",
                    color: isActive ? "#ffffff" : "var(--text-muted)"
                  }}>
                    {cat.count} {cat.count === 1 ? "PRACTICE" : "PRACTICES"}
                  </span>
                </div>
                <div style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: isActive ? "var(--accent-teal)" : "var(--text-primary)",
                  lineHeight: 1.2
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
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          marginBottom: "2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem"
        }}>
          <div style={{ maxWidth: "42rem" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--accent-teal)",
              backgroundColor: "rgba(13, 148, 136, 0.1)",
              padding: "0.25rem 0.65rem",
              borderRadius: "9999px",
              marginBottom: "0.5rem"
            }}>
              {activeMeta.badge}
            </div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
              {activeMeta.title}
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
              {activeMeta.desc}
            </p>
          </div>

          {/* Search Box & View Mode Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ position: "relative", minWidth: "260px" }}>
              <Search size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Search practices (e.g., pentest, rag)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.6rem 2.2rem 0.6rem 2.4rem",
                  borderRadius: "9999px",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  fontSize: "var(--text-sm)",
                  outline: "none"
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* View Mode Buttons */}
            <div style={{
              display: "flex",
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "9999px",
              padding: "0.2rem",
              gap: "0.2rem"
            }}>
              <button
                onClick={() => setViewMode("grid")}
                style={{
                  padding: "0.45rem 0.85rem",
                  borderRadius: "9999px",
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
                  borderRadius: "9999px",
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
                title="Compact List View"
              >
                <ListFilter size={14} />
                <span>List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Empty Search State */}
        {filteredServices.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-secondary)", marginBottom: "4rem" }}>
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
              No services found matching &quot;{searchQuery}&quot;
            </h3>
            <p style={{ maxWidth: "28rem", margin: "0 auto 1.5rem", fontSize: "0.9rem" }}>
              Try searching for terms like &quot;website&quot;, &quot;chatbot&quot;, &quot;mobile&quot;, or &quot;security&quot;.
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
                <div
                  key={service.id}
                  className="card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-lg)",
                    backgroundColor: "var(--bg-secondary)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  {/* Thumbnail Image */}
                  <div style={{ position: "relative", height: "190px", overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease"
                      }}
                      loading="lazy"
                    />
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(11,15,23,0.85) 0%, rgba(11,15,23,0.2) 60%, transparent 100%)"
                    }} />
                    <div style={{
                      position: "absolute",
                      bottom: "0.75rem",
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
                        backgroundColor: "rgba(13, 148, 136, 0.9)",
                        color: "#ffffff"
                      }}>
                        {service.badge}
                      </span>
                    </div>
                    <div style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "1rem",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "6px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      fontFamily: "monospace",
                      backgroundColor: "rgba(11, 15, 23, 0.75)",
                      color: "var(--accent-teal)",
                      border: "1px solid rgba(255, 255, 255, 0.15)"
                    }}>
                      {(index + 1).toString().padStart(2, "0")}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <div style={{
                        width: "2.25rem",
                        height: "2.25rem",
                        borderRadius: "var(--radius-md)",
                        backgroundColor: "var(--bg-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent-teal)",
                        flexShrink: 0
                      }}>
                        <IconComponent size={20} />
                      </div>
                      <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
                        {service.title}
                      </h3>
                    </div>

                    <p style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.55,
                      marginBottom: "1.25rem",
                      flexGrow: 1
                    }}>
                      {service.shortDescription}
                    </p>

                    {/* Key Deliverables */}
                    <div style={{ marginBottom: "1.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "0.6rem" }}>
                        Key Deliverables
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
                        style={{ flex: 1, padding: "0.55rem 0.85rem", fontSize: "0.825rem", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "0.4rem" }}
                      >
                        <span>View Scope</span>
                        <ArrowRight size={14} />
                      </Link>
                      <Link
                        href={`/quote?service=${service.slug}`}
                        className="btn btn-outline"
                        style={{ padding: "0.55rem 0.85rem", fontSize: "0.825rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
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
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--bg-secondary)",
            marginBottom: "4rem"
          }}>
            <div style={{ overflowX: "auto", width: "100%" }}>
              <div style={{ minWidth: "680px" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "60px 2.2fr 3.5fr 1.2fr 180px",
              gap: "1rem",
              padding: "1rem 1.5rem",
              backgroundColor: "var(--bg-primary)",
              borderBottom: "1px solid var(--border-color)",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)"
            }}>
              <div>#</div>
              <div>Practice Area</div>
              <div>Scope &amp; Deliverables Summary</div>
              <div>Standard</div>
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
                    alignItems: "center",
                    transition: "background 0.2s ease"
                  }}
                >
                  <div style={{ fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-teal)" }}>
                    {(index + 1).toString().padStart(2, "0")}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "6px",
                      backgroundColor: "var(--bg-primary)",
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
                  <div style={{ fontSize: "0.825rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
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
                      style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem" }}
                    >
                      Scope
                    </Link>
                    <Link
                      href={`/quote?service=${service.slug}`}
                      className="btn btn-primary"
                      style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem" }}
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

        {/* Global CTA Banner */}
        <div className="card" style={{
          padding: "3.5rem 2rem",
          textAlign: "center",
          borderRadius: "var(--radius-lg)",
          background: "linear-gradient(135deg, rgba(2,132,199,0.15) 0%, rgba(14,165,233,0.05) 100%)",
          border: "1px solid rgba(56, 189, 248, 0.3)"
        }}>
          <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            Need a Custom Enterprise Engagement?
          </h2>
          <p style={{ maxWidth: "38rem", margin: "0 auto 2rem", color: "var(--text-secondary)", fontSize: "var(--text-base)" }}>
            We assemble dedicated multi-disciplinary squads combining senior ethical hackers, full-stack engineers, and AI architects for high-stakes projects.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: "0.75rem 1.75rem" }}>
              <span>Contact Engineering Team</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/book" className="btn btn-outline" style={{ padding: "0.75rem 1.75rem" }}>
              <span>Book Technical Discovery Call</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
