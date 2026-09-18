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
  Phone,
} from "lucide-react";

interface HeroSlide {
  id: string;
  tabLabel: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  accentColor: string;
  accentSecondary: string;
  gradientText: string;
  glowColor: string;
  bgAtmosphere: string;
  unsplashBg: string;
  cardImage: string;
  cardImagePosition?: string;
  chipTop: { dotColor: string; text: string };
  chipBottom: { icon: React.ReactNode; text: string };
  trackType: "english" | "ai" | "security";
}

const TRACKS: HeroSlide[] = [
  {
    id: "spoken-english",
    tabLabel: "Spoken English for Freelancers",
    titlePrefix: "Win High-Ticket Global Clients with",
    titleHighlight: "Fluent English Communication",
    description:
      "Master live Zoom discovery calls, high-converting Upwork pitching, and confident rate negotiations with 1-on-1 mentor diagnostics.",
    ctaPrimaryText: "Enroll in English Cohort",
    ctaPrimaryHref: "/academy/courses/professional-zero-to-fluent-english",
    ctaSecondaryText: "Free Level Assessment",
    ctaSecondaryHref: "/book",
    accentColor: "#38bdf8",
    accentSecondary: "#0284c7",
    gradientText: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
    glowColor: "rgba(56, 189, 248, 0.28)",
    bgAtmosphere:
      "radial-gradient(ellipse 90% 70% at 80% 25%, rgba(14, 165, 233, 0.22) 0%, rgba(6, 10, 20, 0) 70%)",
    unsplashBg:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&q=80&auto=format&fit=crop",
    cardImage: "/banners/professional-zero-to-fluent-english.jpg",
    cardImagePosition: "center 22%",
    chipTop: { dotColor: "#10b981", text: "Live Zoom Pitch Simulation" },
    chipBottom: {
      icon: <Sparkles size={14} style={{ color: "#38bdf8" }} />,
      text: "1-on-1 Mentor Speech Review",
    },
    trackType: "english",
  },
  {
    id: "ai-automation",
    tabLabel: "AI Automation & Agents",
    titlePrefix: "Architect & Deploy Enterprise",
    titleHighlight: "Autonomous AI Multi-Agents",
    description:
      "Build production-grade multi-agent architectures, automated business workflows, and robust LLM tool pipelines using n8n and LangChain.",
    ctaPrimaryText: "Enroll in AI Cohort",
    ctaPrimaryHref: "/academy/courses/ai-automation-agents",
    ctaSecondaryText: "Explore Agent Curriculum",
    ctaSecondaryHref: "/academy",
    accentColor: "#c084fc",
    accentSecondary: "#a855f7",
    gradientText: "linear-gradient(135deg, #c084fc 0%, #34d399 100%)",
    glowColor: "rgba(168, 85, 247, 0.28)",
    bgAtmosphere:
      "radial-gradient(ellipse 90% 70% at 80% 25%, rgba(168, 85, 247, 0.22) 0%, rgba(6, 10, 20, 0) 70%)",
    unsplashBg:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80&auto=format&fit=crop",
    cardImage:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=85",
    cardImagePosition: "center 22%",
    chipTop: { dotColor: "#a855f7", text: "Autonomous Agent Lab" },
    chipBottom: {
      icon: <Bot size={14} style={{ color: "#c084fc" }} />,
      text: "LangChain & n8n Production Pipelines",
    },
    trackType: "ai",
  },
  {
    id: "cyber-security",
    tabLabel: "Offensive Cyber Security",
    titlePrefix: "Master Active Adversary Emulation &",
    titleHighlight: "Real\u2011World Ethical Hacking",
    description:
      "Gain hands-on attack immersion in live cloud sandboxes, enterprise threat exploitation, and red-team penetration testing.",
    ctaPrimaryText: "Enroll in Security Cohort",
    ctaPrimaryHref: "/academy/courses/offensive-cyber-security",
    ctaSecondaryText: "Explore Red Team Labs",
    ctaSecondaryHref: "/academy",
    accentColor: "#fb7185",
    accentSecondary: "#e11d48",
    gradientText: "linear-gradient(135deg, #fb7185 0%, #fb923c 100%)",
    glowColor: "rgba(251, 113, 133, 0.28)",
    bgAtmosphere:
      "radial-gradient(ellipse 90% 70% at 80% 25%, rgba(244, 63, 94, 0.22) 0%, rgba(6, 10, 20, 0) 70%)",
    unsplashBg:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80&auto=format&fit=crop",
    cardImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=85",
    cardImagePosition: "center",
    chipTop: { dotColor: "#ef4444", text: "Live Isolated Red Team Sandbox" },
    chipBottom: {
      icon: <ShieldCheck size={14} style={{ color: "#fb7185" }} />,
      text: "Zero-Day Exploit Defense Lab",
    },
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

            {/* Dual CTAs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: 0,
              }}
            >
              <Link
                href={current.ctaPrimaryHref}
                className="btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.95rem 2.25rem",
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

          </div>

          {/* ── RIGHT COLUMN: Studio Photography Showcase with Floating Glass Chips ── */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Studio Photo Glass Card */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "540px",
                aspectRatio: "16 / 11",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                background: "rgba(10, 15, 30, 0.85)",
                boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px ${current.glowColor}`,
                transition: "all 0.4s ease",
              }}
            >
              {/* High-Resolution Studio Image with Smooth Crossfade */}
              {TRACKS.map((t, idx) => (
                <div
                  key={t.id}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: idx === activeIdx ? 1 : 0,
                    transform: idx === activeIdx ? "scale(1)" : "scale(1.03)",
                    transition:
                      "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <Image
                    src={t.cardImage}
                    alt={t.tabLabel}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 540px"
                    priority={idx === 0}
                    style={{
                      objectFit: "cover",
                      objectPosition: t.cardImagePosition || "center",
                    }}
                  />
                  {/* Subtle lighting vignette overlay to ensure chip contrast */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(6, 10, 20, 0.25) 0%, rgba(6, 10, 20, 0.08) 45%, rgba(6, 10, 20, 0.75) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              ))}

              {/* Floating Glass Chip 1: Top Left */}
              <div
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  left: "1.25rem",
                  zIndex: 3,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.45rem 0.95rem",
                  borderRadius: "999px",
                  background: "rgba(10, 15, 30, 0.82)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: current.chipTop.dotColor,
                    boxShadow: `0 0 10px ${current.chipTop.dotColor}`,
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#f8fafc",
                    letterSpacing: "0.01em",
                  }}
                >
                  {current.chipTop.text}
                </span>
              </div>

              {/* Floating Glass Chip 2: Bottom Right */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  right: "1.25rem",
                  zIndex: 3,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "999px",
                  background: "rgba(10, 15, 30, 0.88)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: `1px solid ${current.accentColor}77`,
                  boxShadow: `0 12px 28px rgba(0, 0, 0, 0.6), 0 0 18px ${current.glowColor}`,
                }}
              >
                {current.chipBottom.icon}
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "0.01em",
                  }}
                >
                  {current.chipBottom.text}
                </span>
              </div>
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
