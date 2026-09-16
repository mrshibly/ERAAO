"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerSlide {
  id: string;
  title: string;
  imageSrc: string;
  linkHref: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: "ai-automation",
    title: "AI Automation & No-Code Systems",
    imageSrc: "/banners/banner-ai-automation.jpg",
    linkHref: "#courses-catalog",
  },
  {
    id: "cyber-security",
    title: "Offensive Cyber Security & Defense",
    imageSrc: "/banners/banner-cyber-security.jpg",
    linkHref: "#courses-catalog",
  },
  {
    id: "spoken-english",
    title: "Spoken English & Client Communication",
    imageSrc: "/banners/banner-spoken-english.jpg",
    linkHref: "/book",
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
    }, 5000);
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
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.08)",
        background: "#080c14",
      }}
    >
      {/* Slider Track */}
      <div
        style={{
          display: "flex",
          width: "100%",
          transform: `translateX(-${current * 100}%)`,
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        }}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              position: "relative",
              minWidth: "100%",
              width: "100%",
              aspectRatio: "851 / 315",
              display: "block",
            }}
          >
            <Link
              href={slide.linkHref}
              style={{
                display: "block",
                position: "relative",
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
              aria-label={`View ${slide.title} Bootcamp`}
            >
              <Image
                src={slide.imageSrc}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 1200px"
                style={{
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Link>
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
