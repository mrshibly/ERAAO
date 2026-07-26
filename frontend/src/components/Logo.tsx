"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: number;
  withText?: boolean;
  withSlogan?: boolean;
  textColor?: string;
  href?: string | null;
}

export default function Logo({
  size = 36,
  withText = true,
  withSlogan = false,
  textColor = "var(--text-primary)",
  href = "/",
}: LogoProps) {
  const logoMark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, filter: "drop-shadow(0 0 12px rgba(14, 165, 233, 0.4))" }}
    >
      <defs>
        <linearGradient id="eraao-outer-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="40%" stopColor="#0ea5e9" />
          <stop offset="75%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>

        <linearGradient id="eraao-core-grad" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>

        <radialGradient id="eraao-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(14, 165, 233, 0.35)" />
          <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
        </radialGradient>
      </defs>

      {/* Radiant Background Ambient Glow */}
      <circle cx="24" cy="24" r="22" fill="url(#eraao-glow)" />

      {/* Layer 1: Outer Precision Tech Shield */}
      <path
        d="M24 3L42 12V36L24 45L6 36V12L24 3Z"
        stroke="url(#eraao-outer-grad)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="rgba(15, 23, 42, 0.75)"
      />

      {/* Layer 2: Inner Cyber Hex Geometry */}
      <path
        d="M24 8L37 15.5V32.5L24 40L11 32.5V15.5L24 8Z"
        stroke="rgba(56, 189, 248, 0.3)"
        strokeWidth="1.2"
        strokeDasharray="3 2"
      />

      {/* Layer 3: Futuristic 'E' Neural Circuit Core */}
      <path
        d="M16 15H32M16 15V33M16 24H28M16 33H32"
        stroke="url(#eraao-core-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Layer 4: Quantum Node Spheres */}
      <circle cx="32" cy="15" r="2.5" fill="#38bdf8" />
      <circle cx="28" cy="24" r="2.5" fill="#c084fc" />
      <circle cx="32" cy="33" r="2.5" fill="#2dd4bf" />

      {/* Layer 5: Center Power Signal Core */}
      <circle cx="16" cy="24" r="2" fill="#ffffff" />
    </svg>
  );

  const content = (
    <div style={{ display: "inline-flex", alignItems: "center", gap: `${size * 0.3}px`, textDecoration: "none" }}>
      {logoMark}
      {withText && (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span
            style={{
              fontWeight: 900,
              fontSize: `${size * 0.046}rem`,
              letterSpacing: "-0.035em",
              color: textColor,
              lineHeight: 1,
              textTransform: "uppercase"
            }}
          >
            ERAAO<span style={{ color: "#0ea5e9" }}>.</span>
          </span>
          {withSlogan && (
            <span
              style={{
                fontSize: `${size * 0.019}rem`,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "#38bdf8",
                textTransform: "none",
                marginTop: "2px"
              }}
            >
              Lighting the future.
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        {content}
      </Link>
    );
  }

  return content;
}
