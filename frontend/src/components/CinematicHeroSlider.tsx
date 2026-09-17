"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Bot,
  ShieldCheck,
  CheckCircle2,
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
  unsplashBg: string;
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
      "radial-gradient(ellipse 90% 70% at 80% 25%, rgba(14, 165, 233, 0.22) 0%, rgba(6, 10, 20, 0) 70%)",
    unsplashBg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&q=80&auto=format&fit=crop",
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
      "radial-gradient(ellipse 90% 70% at 80% 25%, rgba(168, 85, 247, 0.22) 0%, rgba(6, 10, 20, 0) 70%)",
    unsplashBg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80&auto=format&fit=crop",
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
      "radial-gradient(ellipse 90% 70% at 80% 25%, rgba(244, 63, 94, 0.22) 0%, rgba(6, 10, 20, 0) 70%)",
    unsplashBg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80&auto=format&fit=crop",
    trackType: "security",
  },
];

export default function CinematicHeroSlider() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_DURATION = 7000; // 7 seconds per slide

  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % TRACKS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  }, []);

  // Autoplay Timer (every 7 seconds, pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);
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
    <section
      className="hero-cinematic-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "88vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#060913",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "2.5rem 0 3.5rem 0",
      }}
    >
      {/* ── Faded Atmospheric Unsplash Image Layer (Clearly Visible & Faded) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {TRACKS.map((t, idx) => (
          <div
            key={t.id}
            style={{
              position: "absolute",
              inset: 0,
              opacity: idx === activeIdx ? 0.42 : 0,
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Image
              src={t.unsplashBg}
              alt={t.tabLabel}
              fill
              unoptimized
              priority={idx === 0}
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center 30%",
                filter: "saturate(1.3) contrast(1.15)",
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Balanced Multi-Angle Gradient Overlay (Protects text while showing image) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(90deg, rgba(6, 10, 20, 0.92) 0%, rgba(6, 10, 20, 0.68) 45%, rgba(6, 10, 20, 0.35) 100%),
            linear-gradient(180deg, rgba(6, 10, 20, 0.3) 0%, rgba(6, 10, 20, 0.88) 100%),
            ${current.bgAtmosphere}
          `,
          zIndex: 1,
          transition: "background 0.8s ease",
        }}
      />

      {/* ── Edge-to-Edge Ambient Cyber Grid Pattern ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.45,
          zIndex: 2,
        }}
      />

      {/* ── Main Hero Content (No floating card box - The hero IS the section) ── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >


        {/* ═══════════════════════════════════════════════════════════════
            HERO DUAL-COLUMN STAGE (Edge-to-edge on canvas)
            ═══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "3.5rem",
            alignItems: "center",
          }}
          className="cinematic-stage-grid"
        >
          {/* ── LEFT COLUMN: High-Converting Narrative & Direct CTAs ── */}
          <div>

            {/* Huge Headline with Vector Animated Gradient */}
            <h1
              style={{
                fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)",
                fontWeight: 900,
                letterSpacing: "-0.035em",
                lineHeight: 1.15,
                color: "#ffffff",
                marginBottom: "1.35rem",
                textWrap: "balance",
              }}
            >
              {current.titlePrefix}{" "}
              <span
                className="hero-gradient-text"
                style={{
                  backgroundImage: current.gradientText,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  display: "inline",
                }}
              >
                {current.titleHighlight}
              </span>
            </h1>

            {/* Clear, Conversational Pedagogy Description */}
            <p
              style={{
                fontSize: "clamp(0.95rem, 1.2vw, 1.08rem)",
                color: "#cbd5e1",
                lineHeight: 1.68,
                marginBottom: "1.85rem",
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
                marginBottom: "2.5rem",
              }}
            >
              <Link
                href={current.ctaPrimaryHref}
                className="btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.95rem 2.35rem",
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
                  padding: "0.95rem 1.85rem",
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
                gap: "1.25rem",
                paddingTop: "1.75rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              className="cinematic-metrics-grid"
            >
              {current.metrics.map((m, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: "clamp(1.25rem, 1.8vw, 1.7rem)",
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
                      marginTop: "0.2rem",
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
                maxWidth: "460px",
                aspectRatio: "1 / 1",
                borderRadius: "24px",
                background: "rgba(10, 15, 30, 0.75)",
                border: `1px solid ${current.accentColor}33`,
                boxShadow: `0 25px 60px rgba(0, 0, 0, 0.65), inset 0 0 35px ${current.glowColor}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "2rem",
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
                  width: "10px",
                  height: "10px",
                  borderTop: `2px solid ${current.accentColor}`,
                  borderLeft: `2px solid ${current.accentColor}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "10px",
                  height: "10px",
                  borderTop: `2px solid ${current.accentColor}`,
                  borderRight: `2px solid ${current.accentColor}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  width: "10px",
                  height: "10px",
                  borderBottom: `2px solid ${current.accentColor}`,
                  borderLeft: `2px solid ${current.accentColor}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  width: "10px",
                  height: "10px",
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
                      height: "120px",
                      margin: "1rem 0",
                    }}
                  >
                    {[30, 55, 90, 45, 80, 100, 60, 75, 95, 50, 70, 85, 40, 65, 80, 50].map(
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
                      height: "140px",
                      margin: "0.5rem 0",
                    }}
                  >
                    <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                      <circle cx="70" cy="70" r="62" stroke="#fb7185" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                      <circle cx="70" cy="70" r="42" stroke="#fb7185" strokeWidth="1" opacity="0.45" />
                      <circle cx="70" cy="70" r="18" stroke="#fb7185" strokeWidth="1" opacity="0.65" />
                      <line x1="70" y1="7" x2="70" y2="133" stroke="#fb7185" strokeWidth="0.75" opacity="0.35" />
                      <line x1="7" y1="70" x2="133" y2="70" stroke="#fb7185" strokeWidth="0.75" opacity="0.35" />
                      <g className="anim-radar-beam">
                        <line x1="70" y1="70" x2="70" y2="7" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                      </g>
                      <circle cx="98" cy="44" r="4" fill="#fb923c" className="anim-neural-node" />
                      <circle cx="46" cy="92" r="3" fill="#f43f5e" className="anim-neural-node" style={{ animationDelay: "-1s" }} />
                      <circle cx="36" cy="50" r="3" fill="#fb7185" className="anim-neural-node" style={{ animationDelay: "-2s" }} />
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
      </div>

      {/* ── Slide Navigation Controls (Prev / Next Glass Arrows on Edge of Section) ── */}
      <button
        onClick={prevSlide}
        className="academy-slider-nav-btn academy-slider-prev"
        aria-label="Previous Track"
        style={{ position: "absolute", left: "1.5rem", top: "50%", zIndex: 10 }}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="academy-slider-nav-btn academy-slider-next"
        aria-label="Next Track"
        style={{ position: "absolute", right: "1.5rem", top: "50%", zIndex: 10 }}
      >
        <ChevronRight size={24} />
      </button>

      {/* ── Bottom Segmented Slide Indicators ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.6rem",
          marginTop: "2.5rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        {TRACKS.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => setActiveIdx(idx)}
            aria-label={`Switch to ${t.tabLabel}`}
            style={{
              height: "6px",
              width: idx === activeIdx ? "40px" : "12px",
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
    </section>
  );
}
