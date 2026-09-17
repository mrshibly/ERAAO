"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Bot,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MessageSquare,
  Phone
} from "lucide-react";

interface HeroSlide {
  id: string;
  tabLabel: string;
  tabIcon: React.ReactNode;
  badge: string;
  badgeIcon: React.ReactNode;
  schedule: string;
  seats: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  tags: string[];
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  metrics: { label: string; value: string }[];
  accentColor: string;
  accentSecondary: string;
  gradientText: string;
  glowColor: string;
  bgAtmosphere: string;
  trackType: "english" | "ai" | "security";
}

const TRACKS: HeroSlide[] = [
  {
    id: "spoken-english",
    tabLabel: "Spoken English for Freelancers",
    tabIcon: <MessageSquare size={16} />,
    badge: "12-WEEK PRACTITIONER COHORT",
    badgeIcon: <Sparkles size={13} />,
    schedule: "36 Live Classes • Mon / Wed / Fri",
    seats: "Limited to 25 Seats / Cohort",
    titlePrefix: "Win High-Ticket Global Clients with",
    titleHighlight: "Fluent English Communication",
    description:
      "Engineered specifically for freelancers, developers, and remote professionals. Master client Zoom discovery calls, high-converting Upwork proposals, and rate negotiations with 1-on-1 mentor speech diagnostics and zero boring grammar drills.",
    tags: [
      "Client Zoom Discovery Drills",
      "Upwork & Contract Pitching",
      "Spaced Audio Retrieval",
      "1-on-1 Speech Diagnostics",
    ],
    ctaPrimaryText: "Enroll in English Cohort",
    ctaPrimaryHref: "/academy/courses/english-for-freelancers",
    ctaSecondaryText: "Free Level Assessment",
    ctaSecondaryHref: "/book",
    metrics: [
      { value: "12 Weeks", label: "Structured Cohort" },
      { value: "36 Classes", label: "Live Interactive Drills" },
      { value: "6 Stages", label: "Scientific Retention Cycle" },
      { value: "1-on-1", label: "Mentor Speech Review" },
    ],
    accentColor: "#38bdf8",
    accentSecondary: "#0284c7",
    gradientText: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
    glowColor: "rgba(56, 189, 248, 0.28)",
    bgAtmosphere:
      "radial-gradient(ellipse 90% 70% at 80% 25%, rgba(14, 165, 233, 0.22) 0%, rgba(8, 12, 22, 0) 70%)",
    trackType: "english",
  },
  {
    id: "ai-automation",
    tabLabel: "AI Automation & Agents",
    tabIcon: <Bot size={16} />,
    badge: "12-WEEK PRODUCTION LAB",
    badgeIcon: <Bot size={13} />,
    schedule: "36 Live Sessions • Mon / Wed / Fri",
    seats: "Limited to 20 Engineers / Cohort",
    titlePrefix: "Architect & Deploy Enterprise",
    titleHighlight: "Autonomous AI Multi-Agents",
    description:
      "Build production-grade autonomous agent systems, automated business workflows, and robust LLM tool pipelines using n8n, LangChain, and MCP protocols. Move beyond prompt engineering into scalable AI infrastructure.",
    tags: [
      "Multi-Agent Architectures",
      "LangChain & MCP Tools",
      "Production n8n Workflows",
      "Live Cloud Sandboxes",
    ],
    ctaPrimaryText: "Enroll in AI Cohort",
    ctaPrimaryHref: "/academy/courses/ai-automation-agents",
    ctaSecondaryText: "Explore Agent Curriculum",
    ctaSecondaryHref: "/academy",
    metrics: [
      { value: "12 Weeks", label: "Production Lab" },
      { value: "36 Sessions", label: "Hands-On System Builds" },
      { value: "5+ Agents", label: "Production Capstones" },
      { value: "Live Code", label: "Architect Review" },
    ],
    accentColor: "#c084fc",
    accentSecondary: "#a855f7",
    gradientText: "linear-gradient(135deg, #c084fc 0%, #34d399 100%)",
    glowColor: "rgba(168, 85, 247, 0.28)",
    bgAtmosphere:
      "radial-gradient(ellipse 90% 70% at 80% 25%, rgba(168, 85, 247, 0.22) 0%, rgba(8, 12, 22, 0) 70%)",
    trackType: "ai",
  },
  {
    id: "cyber-security",
    tabLabel: "Offensive Cyber Security",
    tabIcon: <ShieldCheck size={16} />,
    badge: "12-WEEK HANDS-ON RED TEAM",
    badgeIcon: <ShieldCheck size={13} />,
    schedule: "36 Live Sessions • Mon / Wed / Fri",
    seats: "Limited to 20 Practitioners / Cohort",
    titlePrefix: "Master Active Adversary Emulation &",
    titleHighlight: "Real-World Ethical Hacking",
    description:
      "Hands-on attack labs, Kali Linux toolkits, web application penetration testing, network exploitation, and enterprise threat defense. Train in isolated virtual ranges with real zero-day and privilege escalation scenarios.",
    tags: [
      "Kali Linux & Burp Suite",
      "Privilege Escalation",
      "Active Red Team Labs",
      "Enterprise Vulnerability Audit",
    ],
    ctaPrimaryText: "Enroll in Security Cohort",
    ctaPrimaryHref: "/academy/courses/offensive-cyber-security",
    ctaSecondaryText: "Explore Red Team Labs",
    ctaSecondaryHref: "/academy",
    metrics: [
      { value: "12 Weeks", label: "Red Team Immersion" },
      { value: "36 Labs", label: "Live Attack Range" },
      { value: "100% Practical", label: "Zero Pointless Theory" },
      { value: "Verified", label: "Technical Competency" },
    ],
    accentColor: "#fb7185",
    accentSecondary: "#e11d48",
    gradientText: "linear-gradient(135deg, #fb7185 0%, #fb923c 100%)",
    glowColor: "rgba(251, 113, 133, 0.28)",
    bgAtmosphere:
      "radial-gradient(ellipse 90% 70% at 80% 25%, rgba(244, 63, 94, 0.22) 0%, rgba(8, 12, 22, 0) 70%)",
    trackType: "security",
  },
];

export default function CinematicHeroSlider() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_DURATION = 7000; // 7 seconds per slide

  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  }, []);

  // Timer & Progress Animation
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50; // update every 50ms
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (intervalStep / SLIDE_DURATION) * 100;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const current = TRACKS[activeIdx];

  return (
    <div
      className="cinematic-hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "1rem 1.5rem 3.5rem 1.5rem",
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════
          TRACK SWITCHER TABS (Top Command Bar)
          ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        {TRACKS.map((t, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={t.id}
              onClick={() => {
                setActiveIdx(idx);
                setProgress(0);
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.6rem 1.25rem",
                borderRadius: "999px",
                background: isActive
                  ? "rgba(15, 23, 42, 0.85)"
                  : "rgba(15, 23, 42, 0.4)",
                border: isActive
                  ? `1px solid ${t.accentColor}`
                  : "1px solid rgba(255, 255, 255, 0.08)",
                color: isActive ? "#ffffff" : "var(--text-muted)",
                fontSize: "0.85rem",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                backdropFilter: "blur(12px)",
                boxShadow: isActive
                  ? `0 0 20px ${t.glowColor}, inset 0 0 12px ${t.glowColor}`
                  : "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Active countdown fill bar */}
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "3px",
                    width: `${progress}%`,
                    background: t.gradientText,
                    transition: "width 0.05s linear",
                    borderRadius: "999px",
                  }}
                />
              )}
              <span
                style={{
                  color: isActive ? t.accentColor : "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {t.tabIcon}
              </span>
              <span>{t.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          THE CINEMATIC SHOWCASE CARD (Full-Width Responsive Stage)
          ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          borderRadius: "28px",
          background: "#080c16",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: `0 35px 70px -15px rgba(0, 0, 0, 0.55), 0 0 50px ${current.glowColor}`,
          overflow: "hidden",
          transition: "box-shadow 0.6s ease, border-color 0.6s ease",
        }}
      >
        {/* Dynamic Atmospheric Spotlight Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `${current.bgAtmosphere}, linear-gradient(180deg, rgba(8, 12, 22, 0.92) 0%, rgba(8, 12, 22, 0.98) 100%)`,
            zIndex: 0,
            transition: "background 0.8s ease",
          }}
        />

        {/* Ambient Grid Texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.5,
            zIndex: 0,
          }}
        />

        {/* Inner Two-Column Stage Grid */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "3rem",
            alignItems: "center",
            padding: "clamp(2rem, 4vw, 3.75rem)",
          }}
          className="cinematic-stage-grid"
        >
          {/* ── LEFT COLUMN: High-Converting Narrative & Direct CTAs ── */}
          <div>
            {/* Cohort Status Pill & Schedule Indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: `1px solid ${current.accentColor}44`,
                  backdropFilter: "blur(8px)",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  color: current.accentColor,
                  boxShadow: `0 0 14px ${current.glowColor}`,
                }}
              >
                {current.badgeIcon}
                <span>{current.badge}</span>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.75rem",
                  color: "#94a3b8",
                  fontWeight: 600,
                  background: "rgba(0, 0, 0, 0.4)",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <Clock size={13} style={{ color: current.accentColor }} />
                <span>{current.schedule}</span>
              </div>
            </div>

            {/* Huge Headline with Vector Animated Gradient */}
            <h1
              style={{
                fontSize: "clamp(2rem, 3.4vw, 3.15rem)",
                fontWeight: 900,
                letterSpacing: "-0.035em",
                lineHeight: 1.15,
                color: "#ffffff",
                marginBottom: "1.25rem",
                textWrap: "balance",
              }}
            >
              {current.titlePrefix}{" "}
              <span
                style={{
                  display: "inline-block",
                  background: current.gradientText,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {current.titleHighlight}
              </span>
            </h1>

            {/* Clear, Conversational Pedagogy Description */}
            <p
              style={{
                fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                color: "#cbd5e1",
                lineHeight: 1.68,
                marginBottom: "1.75rem",
                maxWidth: "38rem",
              }}
            >
              {current.description}
            </p>

            {/* Verified Feature Chips */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginBottom: "2rem",
              }}
            >
              {current.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#f1f5f9",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    padding: "0.3rem 0.75rem",
                    borderRadius: "8px",
                  }}
                >
                  <CheckCircle2 size={13} style={{ color: current.accentColor }} />
                  {tag}
                </span>
              ))}
            </div>

            {/* Dual CTAs & Limited Seats Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "2.25rem",
              }}
            >
              <Link
                href={current.ctaPrimaryHref}
                className="btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.9rem 2.25rem",
                  borderRadius: "14px",
                  background: current.gradientText,
                  color: "#080c16",
                  fontWeight: 800,
                  fontSize: "1rem",
                  textDecoration: "none",
                  boxShadow: `0 10px 25px ${current.glowColor}`,
                  transition: "all 0.25s ease",
                }}
              >
                <span>{current.ctaPrimaryText}</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                href={current.ctaSecondaryHref}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.9rem 1.75rem",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.25s ease",
                }}
              >
                <Phone size={16} style={{ color: current.accentColor }} />
                <span>{current.ctaSecondaryText}</span>
              </Link>
            </div>

            {/* Factual Cohort Metrics Bar */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              className="cinematic-metrics-grid"
            >
              {current.metrics.map((m, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: "clamp(1.2rem, 1.8vw, 1.65rem)",
                      fontWeight: 900,
                      color:
                        i === 0
                          ? current.accentColor
                          : i === 1
                          ? "#34d399"
                          : i === 2
                          ? "#c084fc"
                          : "#fbbf24",
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "#94a3b8",
                      fontWeight: 600,
                      marginTop: "0.15rem",
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: Interactive 60fps Motion Showcase ── */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Outer Cyber Frame */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "420px",
                aspectRatio: "1 / 1",
                borderRadius: "24px",
                background: "rgba(10, 15, 30, 0.7)",
                border: `1px solid ${current.accentColor}33`,
                boxShadow: `0 20px 50px rgba(0, 0, 0, 0.6), inset 0 0 30px ${current.glowColor}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1.75rem",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              {/* Atmospheric Corner Accents */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  width: "8px",
                  height: "8px",
                  borderTop: `2px solid ${current.accentColor}`,
                  borderLeft: `2px solid ${current.accentColor}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "8px",
                  height: "8px",
                  borderTop: `2px solid ${current.accentColor}`,
                  borderRight: `2px solid ${current.accentColor}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  width: "8px",
                  height: "8px",
                  borderBottom: `2px solid ${current.accentColor}`,
                  borderLeft: `2px solid ${current.accentColor}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  width: "8px",
                  height: "8px",
                  borderBottom: `2px solid ${current.accentColor}`,
                  borderRight: `2px solid ${current.accentColor}`,
                }}
              />

              {/* ── MOTION STAGE 1: Spoken English Audio & Zoom Simulation ── */}
              {current.trackType === "english" && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: "#38bdf8",
                          boxShadow: "0 0 10px #38bdf8",
                          display: "inline-block",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#38bdf8",
                          letterSpacing: "0.05em",
                        }}
                      >
                        LIVE CLIENT CALL SIMULATOR
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#94a3b8",
                        background: "rgba(255, 255, 255, 0.06)",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                      }}
                    >
                      Milestone 05 · Use
                    </span>
                  </div>

                  {/* Audio Waveform Equalizer Display */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      height: "110px",
                      margin: "1rem 0",
                    }}
                  >
                    {[30, 55, 90, 45, 80, 100, 60, 75, 95, 50, 70, 85, 40, 65, 80].map(
                      (h, i) => (
                        <span
                          key={i}
                          className="anim-waveform-bar"
                          style={{
                            width: "6px",
                            height: `${h}%`,
                            borderRadius: "999px",
                            background: "linear-gradient(to top, #0284c7, #38bdf8)",
                            animationDelay: `${(i * 0.08).toFixed(2)}s`,
                            animationDuration: `${0.75 + (i % 3) * 0.3}s`,
                          }}
                        />
                      )
                    )}
                  </div>

                  {/* Simulated Zoom Discovery Card */}
                  <div
                    style={{
                      background: "rgba(15, 23, 42, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      padding: "0.85rem 1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.4rem",
                      }}
                    >
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ffffff" }}>
                        Client Discovery Pitch (US/UK Client)
                      </span>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          color: "#34d399",
                          fontWeight: 700,
                        }}
                      >
                        ✓ Fluency 94%
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.72rem",
                        color: "#94a3b8",
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      &quot;Based on your project requirements, here is the exact 3-phase delivery architecture...&quot;
                    </p>
                  </div>
                </>
              )}

              {/* ── MOTION STAGE 2: AI Automation & Multi-Agent Network ── */}
              {current.trackType === "ai" && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: "#c084fc",
                          boxShadow: "0 0 10px #c084fc",
                          display: "inline-block",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#c084fc",
                          letterSpacing: "0.05em",
                        }}
                      >
                        AUTONOMOUS AGENT MESH
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#94a3b8",
                        background: "rgba(255, 255, 255, 0.06)",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                      }}
                    >
                      LangChain · MCP · n8n
                    </span>
                  </div>

                  {/* Interactive SVG Neural Nodes Graph */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "140px",
                      margin: "0.5rem 0",
                    }}
                  >
                    <svg width="280" height="140" viewBox="0 0 280 140" fill="none">
                      <line x1="40" y1="70" x2="110" y2="35" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                      <line x1="40" y1="70" x2="110" y2="105" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                      <line x1="110" y1="35" x2="180" y2="70" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                      <line x1="110" y1="105" x2="180" y2="70" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                      <line x1="180" y1="70" x2="245" y2="70" stroke="#34d399" strokeWidth="2" opacity="0.8" />
                      
                      <circle cx="40" cy="70" r="14" fill="#7c3aed" className="anim-neural-node" />
                      <text x="40" y="74" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">USER</text>

                      <circle cx="110" cy="35" r="15" fill="#a855f7" className="anim-neural-node" style={{ animationDelay: "-0.8s" }} />
                      <text x="110" y="39" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">AGENT 1</text>

                      <circle cx="110" cy="105" r="15" fill="#9333ea" className="anim-neural-node" style={{ animationDelay: "-1.6s" }} />
                      <text x="110" y="109" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">AGENT 2</text>

                      <circle cx="180" cy="70" r="16" fill="#c084fc" className="anim-neural-node" style={{ animationDelay: "-2.4s" }} />
                      <text x="180" y="74" textAnchor="middle" fill="#080c16" fontSize="9" fontWeight="900">SYNTH</text>

                      <circle cx="245" cy="70" r="16" fill="#34d399" className="anim-neural-node" style={{ animationDelay: "-1.2s" }} />
                      <text x="245" y="74" textAnchor="middle" fill="#080c16" fontSize="9" fontWeight="900">EXEC</text>
                    </svg>
                  </div>

                  {/* Active Tool Pipeline Card */}
                  <div
                    style={{
                      background: "rgba(15, 23, 42, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      padding: "0.85rem 1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ffffff" }}>
                        Pipeline Execution Status
                      </span>
                      <span style={{ fontSize: "0.68rem", color: "#34d399", fontWeight: 700 }}>
                        ● 4 Agents Active
                      </span>
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                      MCP Tool Router &gt; Postgres Vector DB &gt; Execution Sandbox
                    </span>
                  </div>
                </>
              )}

              {/* ── MOTION STAGE 3: Offensive Cyber Security Radar & Terminal ── */}
              {current.trackType === "security" && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: "#fb7185",
                          boxShadow: "0 0 10px #fb7185",
                          display: "inline-block",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#fb7185",
                          letterSpacing: "0.05em",
                        }}
                      >
                        RED TEAM ATTACK RANGE
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#94a3b8",
                        background: "rgba(255, 255, 255, 0.06)",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                      }}
                    >
                      Kali · Burp · Metasploit
                    </span>
                  </div>

                  {/* 60fps Cyber Radar Sweep Display */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "135px",
                      margin: "0.5rem 0",
                    }}
                  >
                    <svg width="135" height="135" viewBox="0 0 135 135" fill="none">
                      <circle cx="67.5" cy="67.5" r="60" stroke="#fb7185" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                      <circle cx="67.5" cy="67.5" r="40" stroke="#fb7185" strokeWidth="1" opacity="0.45" />
                      <circle cx="67.5" cy="67.5" r="18" stroke="#fb7185" strokeWidth="1" opacity="0.65" />
                      <line x1="67.5" y1="7" x2="67.5" y2="128" stroke="#fb7185" strokeWidth="0.75" opacity="0.35" />
                      <line x1="7" y1="67.5" x2="128" y2="67.5" stroke="#fb7185" strokeWidth="0.75" opacity="0.35" />
                      <g className="anim-radar-beam">
                        <line x1="67.5" y1="67.5" x2="67.5" y2="7" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                      </g>
                      <circle cx="95" cy="42" r="4" fill="#fb923c" className="anim-neural-node" />
                      <circle cx="45" cy="90" r="3" fill="#f43f5e" className="anim-neural-node" style={{ animationDelay: "-1s" }} />
                      <circle cx="35" cy="48" r="3" fill="#fb7185" className="anim-neural-node" style={{ animationDelay: "-2s" }} />
                    </svg>
                  </div>

                  {/* Live Exploit Status Box */}
                  <div
                    style={{
                      background: "rgba(15, 23, 42, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      padding: "0.85rem 1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ffffff" }}>
                        Active Sandbox Range
                      </span>
                      <span style={{ fontSize: "0.68rem", color: "#fb7185", fontWeight: 700 }}>
                        ROOT ACCESSED
                      </span>
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "#94a3b8", fontFamily: "monospace" }}>
                      &gt; CVE-2024-PrivEsc patched [100% verified]
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Slide Navigation Controls (Prev / Next Glass Arrows) ── */}
        <button
          onClick={prevSlide}
          className="academy-slider-nav-btn academy-slider-prev"
          aria-label="Previous Track"
          style={{ position: "absolute", left: "1.25rem", top: "50%", zIndex: 10 }}
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          className="academy-slider-nav-btn academy-slider-next"
          aria-label="Next Track"
          style={{ position: "absolute", right: "1.25rem", top: "50%", zIndex: 10 }}
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* ── Bottom Segmented Slide Indicators ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginTop: "1.5rem",
        }}
      >
        {TRACKS.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => {
              setActiveIdx(idx);
              setProgress(0);
            }}
            aria-label={`Switch to ${t.tabLabel}`}
            style={{
              height: "6px",
              width: idx === activeIdx ? "36px" : "12px",
              borderRadius: "999px",
              background:
                idx === activeIdx ? t.accentColor : "rgba(255, 255, 255, 0.2)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
