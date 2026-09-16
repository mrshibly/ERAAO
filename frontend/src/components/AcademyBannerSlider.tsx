"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, MessageSquare, PhoneCall, ShieldCheck } from "lucide-react";

interface BannerSlide {
  id: string;
  badge: string;
  badgeIcon: React.ReactNode;
  badgeBn: string;
  title: string;
  taglineEn: string;
  taglineBn: string;
  description: string;
  imageSrc: string;
  features: string[];
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  accentColor: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: "ai-automation",
    badge: "Most In-Demand 2026",
    badgeIcon: <Sparkles size={14} />,
    badgeBn: "হাই-গ্রোথ ক্যারিয়ার",
    title: "AI AUTOMATION",
    taglineEn: "From Zero to High-Paying Client Automation",
    taglineBn: "ক্লাসরুম থেকে সরাসরি হাই-পেয়িং ক্লায়েন্ট — অটোমেশন দিয়ে গড়ুন স্বপ্নের ক্যারিয়ার",
    description: "থিওরি বাদ দিয়ে রিয়েল প্রজেক্টে শিখুন। কীভাবে এআই এজেন্ট বানাবেন, ওয়ার্কফ্লো অটোমেট করবেন এবং গ্লোবাল ক্লায়েন্টদের কাজ করবেন — সবকিছু শূন্য থেকে।",
    imageSrc: "/banners/banner-ai-automation.jpg",
    features: ["AI Tools & Agents", "Prompt Engineering", "Workflow Automation", "No-Code Systems"],
    ctaPrimaryText: "Explore AI Track",
    ctaPrimaryLink: "/academy",
    ctaSecondaryText: "ফ্রি ক্যারিয়ার পরামর্শ",
    ctaSecondaryLink: "/book",
    accentColor: "#0ea5e9",
  },
  {
    id: "cyber-security",
    badge: "Enterprise Defense & Hacking",
    badgeIcon: <ShieldCheck size={14} />,
    badgeBn: "সার্টিফাইড মেন্টরশিপ",
    title: "CYBER SECURITY",
    taglineEn: "Skill Today, Security Tomorrow",
    taglineBn: "ডিজিটাল দুনিয়ায় নিজেকে করুন সুরক্ষিত ও দক্ষ — ক্যারিয়ার গড়ুন ডিফেন্ডার হয়ে",
    description: "হ্যান্ডস-অন এথিক্যাল হ্যাকিং আর নেটওয়ার্ক ডিফেন্স। কোনো ভারী পিসি লাগবে না — সরাসরি ব্রাউজার ল্যাবে প্র্যাকটিস করুন ২৪/৭ লাইভ সাপোর্ট সহ।",
    imageSrc: "/banners/banner-cyber-security.jpg",
    features: ["Ethical Hacking", "Network Defense", "Cloud Security", "24/7 Browser Labs"],
    ctaPrimaryText: "Start Cyber Defense",
    ctaPrimaryLink: "/academy",
    ctaSecondaryText: "কথা বলুন মেন্টরের সাথে",
    ctaSecondaryLink: "/book",
    accentColor: "#38bdf8",
  },
  {
    id: "spoken-english",
    badge: "Career & Client Communication",
    badgeIcon: <MessageSquare size={14} />,
    badgeBn: "সহজ ও কার্যকর প্র্যাকটিস",
    title: "SPOKEN ENGLISH",
    taglineEn: "Speak with Confidence, Win Global Clients",
    taglineBn: "কথা বলুন জড়তাহীন আত্মবিশ্বাসে — বিদেশি ক্লায়েন্ট ও ইন্টারভিউয়ের জন্য পারফেক্ট",
    description: "গ্রামারের ভয় কাটিয়ে রিয়েল-লাইফ কনভারসেশন প্র্যাকটিস। ফ্রিল্যান্সার, সফটওয়্যার ইঞ্জিনিয়ার ও ক্যারিয়ার গ্রোথের জন্য বিশেষভাবে সাজানো।",
    imageSrc: "/banners/banner-spoken-english.jpg",
    features: ["Daily Speaking Practice", "Accent & Fluency", "Client Negotiation", "Interview Mastery"],
    ctaPrimaryText: "Join Spoken English",
    ctaPrimaryLink: "/book",
    ctaSecondaryText: "ফ্রি ট্রায়াল সেশন",
    ctaSecondaryLink: "/book",
    accentColor: "#06b6d4",
  },
];

export default function AcademyBannerSlider() {
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
    }, 5500);
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
      aria-roledescription="carousel"
      aria-label="ERAAO Academy Featured Career Tracks"
    >
      {/* Quick Navigation Filter Tabs on top */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          zIndex: 25,
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            style={{
              padding: "0.35rem 0.85rem",
              borderRadius: "var(--radius-full)",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.25s ease",
              border: index === current ? "1px solid rgba(14, 165, 233, 0.6)" : "1px solid rgba(255, 255, 255, 0.12)",
              background: index === current ? "rgba(14, 165, 233, 0.25)" : "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(8px)",
              color: index === current ? "#38bdf8" : "#94a3b8",
            }}
          >
            {slide.title}
          </button>
        ))}
      </div>

      {/* Main Track Slides */}
      <div
        className="academy-slider-track"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {SLIDES.map((slide, index) => (
          <div key={slide.id} className="academy-slider-slide">
            {/* Background Banner Image */}
            <Image
              src={slide.imageSrc}
              alt={`${slide.title} - ERAAO Academy`}
              fill
              priority={index === 0}
              sizes="(max-width: 1200px) 100vw, 1200px"
              style={{
                objectFit: "cover",
                objectPosition: "center right",
              }}
            />

            {/* Dark Vignette Overlay for Crisp High-Contrast Text Readability */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, rgba(9, 13, 22, 0.96) 0%, rgba(9, 13, 22, 0.85) 45%, rgba(9, 13, 22, 0.3) 100%)",
                zIndex: 2,
              }}
            />

            {/* Slide Content Overlay */}
            <div
              style={{
                position: "relative",
                zIndex: 5,
                padding: "3.5rem 3.5rem 3rem 3.5rem",
                maxWidth: "42rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {/* Dual Badge (English + Bangla) */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "var(--radius-full)",
                    background: "rgba(14, 165, 233, 0.2)",
                    border: "1px solid rgba(14, 165, 233, 0.4)",
                    color: "#38bdf8",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {slide.badgeIcon}
                  <span>{slide.badge}</span>
                </span>

                <span
                  className="font-bengali"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.2rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#e2e8f0",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {slide.badgeBn}
                </span>
              </div>

              {/* Title & Slogans */}
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                {slide.title}
              </h2>

              <div
                className="font-bengali"
                style={{
                  fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
                  fontWeight: 700,
                  color: "#38bdf8",
                  lineHeight: 1.4,
                }}
              >
                {slide.taglineBn}
              </div>

              <p
                className="font-bengali"
                style={{
                  fontSize: "0.88rem",
                  color: "#cbd5e1",
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: "34rem",
                }}
              >
                {slide.description}
              </p>

              {/* Feature Pills */}
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  marginTop: "0.25rem",
                }}
              >
                {slide.features.map((feat) => (
                  <span
                    key={feat}
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      padding: "0.2rem 0.6rem",
                      borderRadius: "6px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#94a3b8",
                    }}
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>

              {/* Action Buttons (High-Conversion CTAs) */}
              <div
                style={{
                  display: "flex",
                  gap: "0.85rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                  marginTop: "0.75rem",
                }}
              >
                <Link
                  href={slide.ctaPrimaryLink}
                  className="btn btn-accent"
                  style={{
                    padding: "0.65rem 1.4rem",
                    fontSize: "0.88rem",
                    fontWeight: 800,
                    borderRadius: "var(--radius-lg)",
                    background: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)",
                    color: "#ffffff",
                    boxShadow: "0 8px 20px rgba(14, 165, 233, 0.35)",
                    border: "none",
                  }}
                >
                  <span>{slide.ctaPrimaryText}</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href={slide.ctaSecondaryLink}
                  className="font-bengali"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.65rem 1.25rem",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    borderRadius: "var(--radius-lg)",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#f8fafc",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <PhoneCall size={14} style={{ color: "#38bdf8" }} />
                  <span>{slide.ctaSecondaryText}</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next Navigation Controls */}
      <button
        onClick={prevSlide}
        className="academy-slider-nav-btn academy-slider-prev"
        aria-label="Previous Course Slide"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        className="academy-slider-nav-btn academy-slider-next"
        aria-label="Next Course Slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Progress Dots */}
      <div className="academy-slider-indicators">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`academy-slider-dot ${index === current ? "active" : ""}`}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
          />
        ))}
      </div>
    </div>
  );
}
