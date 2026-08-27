"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
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
  MessageSquareQuote,
  CheckCircle2,
  Calendar,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { getServiceBySlug, SERVICES_CATALOG } from "@/data/servicesData";

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

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : (rawSlug as string) || "";

  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <div style={{ padding: "var(--spacing-section) 0", minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="container" style={{ maxWidth: "36rem", textAlign: "center" }}>
          <ShieldAlert size={48} style={{ color: "var(--accent-teal)", margin: "0 auto 1.5rem" }} />
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            Service Specification Not Found
          </h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
            The requested service &quot;{slug}&quot; does not exist in our active enterprise catalog.
          </p>
          <Link href="/services" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Return to Service Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = ICON_MAP[service.iconName] || ShieldAlert;

  return (
    <div style={{ padding: "var(--spacing-section) 0" }}>
      <div className="container" style={{ maxWidth: "56rem" }}>
        {/* Back Navigation */}
        <button
          onClick={() => router.push("/services")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "none",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontWeight: 600,
            marginBottom: "2rem",
            fontSize: "0.9rem"
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to All Services</span>
        </button>

        {/* Main Hero Card */}
        <div
          className="card"
          style={{
            padding: "0",
            overflow: "hidden",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--card-bg)",
            boxShadow: "var(--shadow-lg)",
            marginBottom: "2.5rem"
          }}
        >
          {/* Visual Header Banner */}
          <div style={{ position: "relative", height: "260px", width: "100%", overflow: "hidden", backgroundColor: "#090d16" }}>
            <Image
              src={service.imageUrl}
              alt={service.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 896px"
              style={{ objectFit: "cover" }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(11,15,23,0.95) 0%, rgba(11,15,23,0.4) 60%, transparent 100%)"
            }} />
            <div style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "2rem",
              right: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-teal)",
                  border: "1px solid rgba(255,255,255,0.2)"
                }}>
                  <IconComponent size={28} />
                </div>
                <div>
                  <span style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--accent-teal)",
                    display: "block",
                    marginBottom: "0.25rem"
                  }}>
                    {service.categoryLabel} &bull; {service.badge}
                  </span>
                  <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800, color: "#ffffff", margin: 0, lineHeight: 1.2 }}>
                    {service.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div style={{ padding: "2.5rem 2rem" }}>
            {/* Overview */}
            <div style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                Executive Overview
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.65 }}>
                {service.fullDescription}
              </p>
            </div>

            {/* Problem Solved Callout */}
            <div style={{
              padding: "1.5rem",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--bg-primary)",
              borderLeft: "4px solid var(--accent-teal)",
              marginBottom: "2.5rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", color: "var(--text-primary)", fontWeight: 700 }}>
                <HelpCircle size={18} style={{ color: "var(--accent-teal)" }} />
                <span>The Challenge We Solve</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                {service.problemStatement}
              </p>
            </div>

            {/* Deliverables Scope Checklist */}
            <div style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
                Scope &amp; Core Deliverables
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.85rem" }}>
                {service.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      padding: "0.85rem 1rem",
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: "var(--bg-primary)",
                      border: "1px solid var(--border-color)"
                    }}
                  >
                    <CheckCircle size={18} style={{ color: "var(--accent-teal)", flexShrink: 0, marginTop: "0.15rem" }} />
                    <span style={{ fontSize: "0.925rem", color: "var(--text-primary)", fontWeight: 500 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Methodology */}
            <div style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
                Engagement &amp; Delivery Methodology
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                {service.methodology.map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "1.25rem",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--bg-primary)",
                      border: "1px solid var(--border-color)"
                    }}
                  >
                    <div style={{
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "var(--accent-teal)",
                      marginBottom: "0.5rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}>
                      Stage 0{idx + 1}
                    </div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4 }}>
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border-color)"
            }}>
              <Link
                href={`/quote?service=${service.slug}`}
                className="btn btn-primary"
                style={{ flex: "1 1 240px", padding: "0.85rem 1.5rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
              >
                <MessageSquareQuote size={18} />
                <span>Request Quotation for {service.title}</span>
              </Link>
              <Link
                href="/book"
                className="btn btn-outline"
                style={{ flex: "1 1 200px", padding: "0.85rem 1.5rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
              >
                <Calendar size={18} />
                <span>Schedule Discovery Call</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Other Recommended Services */}
        <div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
            Explore Related Practice Areas
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
            {SERVICES_CATALOG.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 3).map((rel) => (
              <Link
                key={rel.id}
                href={`/services/${rel.slug}`}
                className="card"
                style={{
                  padding: "1.25rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-secondary)",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none"
                }}
              >
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--accent-teal)", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                  {rel.badge}
                </span>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  {rel.title}
                </h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                  {rel.shortDescription.slice(0, 90)}...
                </p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
