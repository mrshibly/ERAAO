"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerSlide {
  id: string;
  image: string;
  alt: string;
  linkHref: string;
  accentColor: string;
}

const BANNERS: BannerSlide[] = [
  {
    id: "spoken-english",
    image: "/banners/banner-spoken-english.jpg",
    alt: "Professional Zero to Fluent English",
    linkHref: "/academy/courses/professional-zero-to-fluent-english",
    accentColor: "#38bdf8",
  },
  {
    id: "ai-automation",
    image: "/banners/banner-ai-automation.jpg",
    alt: "Professional AI Automation",
    linkHref: "/academy/courses/ai-automation-agents",
    accentColor: "#c084fc",
  },
  {
    id: "cyber-security",
    image: "/banners/banner-cyber-security.jpg",
    alt: "Professional Cyber Security & Ethical Hacking",
    linkHref: "/academy/courses/offensive-cyber-security",
    accentColor: "#fb7185",
  },
];

export default function CinematicHeroSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_DURATION = 5000;

  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % BANNERS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="hero-banner-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1360px",
        margin: "1.5rem auto 0 auto",
        padding: "0 1.5rem",
        boxSizing: "border-box",
      }}
    >
      {/* Banner Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.08)",
          background: "#080c16",
        }}
      >
        {/* Slide Track */}
        <div
          style={{
            display: "flex",
            width: "100%",
            transform: `translateX(-${activeIdx * 100}%)`,
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "transform",
          }}
        >
          {BANNERS.map((banner) => (
            <Link
              key={banner.id}
              href={banner.linkHref}
              style={{
                position: "relative",
                minWidth: "100%",
                width: "100%",
                display: "block",
                flexShrink: 0,
              }}
            >
              {/* Use aspect-ratio to maintain the banner's wide proportions */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 7",
                }}
              >
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 768px) 100vw, 1360px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Prev / Next Arrows */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
          }}
          className="academy-slider-nav-btn academy-slider-prev"
          aria-label="Previous Banner"
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
          }}
          className="academy-slider-nav-btn academy-slider-next"
          aria-label="Next Banner"
          style={{
            position: "absolute",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        >
          <ChevronRight size={22} />
        </button>

        {/* Dot Indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "0.5rem",
            zIndex: 10,
          }}
        >
          {BANNERS.map((banner, idx) => (
            <button
              key={banner.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveIdx(idx);
              }}
              aria-label={`Go to banner ${idx + 1}`}
              style={{
                width: idx === activeIdx ? "32px" : "10px",
                height: "6px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                background:
                  idx === activeIdx
                    ? banner.accentColor
                    : "rgba(255, 255, 255, 0.45)",
                transition: "all 0.3s ease",
                boxShadow:
                  idx === activeIdx
                    ? `0 0 10px ${banner.accentColor}`
                    : "none",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
