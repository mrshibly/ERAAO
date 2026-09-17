"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Bot, ShieldCheck, CheckCircle2, Clock } from "lucide-react";

interface BannerSlide {
  id: string;
  badge: string;
  badgeIcon: React.ReactNode;
  schedule: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  tags: string[];
  ctaText: string;
  linkHref: string;
  accentColor: string;
  gradientText: string;
  glowColor: string;
  bgAtmosphere: string;
  backdropImage?: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: "spoken-english",
    badge: "12-WEEK PRACTITIONER COHORT",
    badgeIcon: <Sparkles size={13} />,
    schedule: "36 Live Classes • Mon / Wed / Fri",
    titlePrefix: "Spoken English",
    titleHighlight: "for Freelancers & Remote Pros",
    description: "Master client Zoom discovery calls, high-ticket Upwork proposal scripts, and rate negotiations with 1-on-1 mentor speech review.",
    tags: ["Proposal Pitching", "Client Zoom Drills", "Audio Spaced Retention"],
    ctaText: "Explore Track & Syllabus",
    linkHref: "/academy/courses/english-for-freelancers",
    accentColor: "#38bdf8",
    gradientText: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
    glowColor: "rgba(56, 189, 248, 0.22)",
    bgAtmosphere: "radial-gradient(ellipse 90% 70% at 85% 20%, rgba(14, 165, 233, 0.22) 0%, rgba(15, 23, 42, 0) 70%)",
    backdropImage: "/banners/banner-spoken-english.jpg",
  },
  {
    id: "ai-automation",
    badge: "12-WEEK PRODUCTION LAB",
    badgeIcon: <Bot size={13} />,
    schedule: "36 Live Sessions • Mon / Wed / Fri",
    titlePrefix: "AI Automation",
    titleHighlight: "& Autonomous Agents",
    description: "Engineer production multi-agent workflows, automated business operations, and enterprise LLM pipelines with n8n & LangChain.",
    tags: ["Multi-Agent Architectures", "LangChain & MCP", "Live Cloud Sandboxes"],
    ctaText: "Explore Track & Syllabus",
    linkHref: "/academy/courses/ai-automation-agents",
    accentColor: "#a855f7",
    gradientText: "linear-gradient(135deg, #c084fc 0%, #34d399 100%)",
    glowColor: "rgba(168, 85, 247, 0.22)",
    bgAtmosphere: "radial-gradient(ellipse 90% 70% at 85% 20%, rgba(168, 85, 247, 0.22) 0%, rgba(15, 23, 42, 0) 70%)",
    backdropImage: "/banners/banner-ai-automation.jpg",
  },
  {
    id: "cyber-security",
    badge: "12-WEEK HANDS-ON RED TEAM",
    badgeIcon: <ShieldCheck size={13} />,
    schedule: "36 Live Sessions • Mon / Wed / Fri",
    titlePrefix: "Offensive Security",
    titleHighlight: "& Ethical Hacking",
    description: "Hands-on attack labs, Kali Linux toolkits, web application pentesting, privilege escalation, and active adversary emulation.",
    tags: ["Burp Suite & Kali", "Privilege Escalation", "Real Attack Range"],
    ctaText: "Explore Track & Syllabus",
    linkHref: "/academy/courses/offensive-cyber-security",
    accentColor: "#fb7185",
    gradientText: "linear-gradient(135deg, #fb7185 0%, #fb923c 100%)",
    glowColor: "rgba(251, 113, 133, 0.22)",
    bgAtmosphere: "radial-gradient(ellipse 90% 70% at 85% 20%, rgba(244, 63, 94, 0.22) 0%, rgba(15, 23, 42, 0) 70%)",
    backdropImage: "/banners/banner-cyber-security.jpg",
  },
];

export default function AcademyBannerSlider() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
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

  return (
    <div
      className="academy-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.08)",
        background: "#080c16",
      }}
    >
      {/* Slider Track */}
      <div
        style={{
          display: "flex",
          width: "100%",
          transform: `translateX(-${current * 100}%)`,
          transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        }}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => router.push(slide.linkHref)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && router.push(slide.linkHref)}
            style={{
              position: "relative",
              minWidth: "100%",
              width: "100%",
              aspectRatio: "16 / 9",
              minHeight: "330px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "clamp(1.25rem, 2.5vw, 1.85rem)",
              boxSizing: "border-box",
              cursor: "pointer",
              overflow: "hidden",
              background: "#080d1a",
            }}
          >
            {/* Atmospheric Background Layer (Image texture with dark cyber gradient) */}
            {slide.backdropImage && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  opacity: 0.22,
                  filter: "saturate(1.25) contrast(1.1)",
                }}
              >
                <Image
                  src={slide.backdropImage}
                  alt={slide.titlePrefix}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 700px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

            {/* Glowing Accent Orbs & Tech Mesh Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `${slide.bgAtmosphere}, linear-gradient(180deg, rgba(8, 13, 26, 0.85) 0%, rgba(8, 13, 26, 0.96) 100%)`,
                zIndex: 1,
              }}
            />

            {/* Subtle Tech Grid Lines */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                opacity: 0.45,
                zIndex: 1,
              }}
            />

            {/* ── Slide Header: Pill Badge & Live Cohort Schedule ── */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: `1px solid ${slide.accentColor}33`,
                  backdropFilter: "blur(8px)",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  color: slide.accentColor,
                  boxShadow: `0 0 12px ${slide.glowColor}`,
                }}
              >
                <span style={{ color: slide.accentColor, display: "flex", alignItems: "center" }}>
                  {slide.badgeIcon}
                </span>
                <span>{slide.badge}</span>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.72rem",
                  color: "#94a3b8",
                  fontWeight: 600,
                  background: "rgba(0, 0, 0, 0.35)",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "6px",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <Clock size={12} style={{ color: slide.accentColor }} />
                <span>{slide.schedule}</span>
              </div>
            </div>

            {/* ── Slide Body: Vector Typography & Outcome Description ── */}
            <div style={{ position: "relative", zIndex: 2, margin: "0.75rem 0" }}>
              <h3
                style={{
                  fontSize: "clamp(1.25rem, 2.2vw, 1.7rem)",
                  fontWeight: 900,
                  lineHeight: 1.2,
                  letterSpacing: "-0.025em",
                  color: "#ffffff",
                  marginBottom: "0.45rem",
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                {slide.titlePrefix}{" "}
                <span
                  style={{
                    background: slide.gradientText,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline",
                  }}
                >
                  {slide.titleHighlight}
                </span>
              </h3>

              <p
                style={{
                  fontSize: "clamp(0.78rem, 1.05vw, 0.88rem)",
                  color: "#94a3b8",
                  lineHeight: 1.5,
                  maxWidth: "96%",
                  margin: 0,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {slide.description}
              </p>

              {/* Verified Feature Chips */}
              <div
                style={{
                  display: "flex",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                  marginTop: "0.75rem",
                }}
              >
                {slide.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      color: "#e2e8f0",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      padding: "0.22rem 0.55rem",
                      borderRadius: "6px",
                    }}
                  >
                    <CheckCircle2 size={11} style={{ color: slide.accentColor }} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Slide Footer: Interactive CTA Button & Next Cohort Indicator ── */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.55rem 1.15rem",
                  borderRadius: "10px",
                  background: slide.gradientText,
                  color: "#0a0f1d",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  boxShadow: `0 8px 20px ${slide.glowColor}`,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <span>{slide.ctaText}</span>
                <ArrowRight size={14} />
              </div>

              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#64748b",
                  fontWeight: 600,
                }}
              >
                Limited to 25 seats / cohort
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next Navigation Controls */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="academy-slider-nav-btn academy-slider-prev"
        aria-label="Previous Course Slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="academy-slider-nav-btn academy-slider-next"
        aria-label="Next Course Slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Progress Dots */}
      <div className="academy-slider-indicators">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(index);
            }}
            className={`academy-slider-dot ${index === current ? "active" : ""}`}
            aria-label={`Go to slide ${index + 1}: ${slide.titlePrefix}`}
          />
        ))}
      </div>
    </div>
  );
}
