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
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="logo-grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1565a0"/>
          <stop offset="100%" stopColor="#2196c8"/>
        </linearGradient>
        <linearGradient id="logo-grad-mid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e88c8"/>
          <stop offset="100%" stopColor="#42b4e6"/>
        </linearGradient>
        <linearGradient id="logo-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38a8d8"/>
          <stop offset="100%" stopColor="#6dd5f5"/>
        </linearGradient>
        <linearGradient id="logo-grad-s1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e88c8"/>
          <stop offset="100%" stopColor="#48c0e8"/>
        </linearGradient>
        <linearGradient id="logo-grad-s2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2196c8"/>
          <stop offset="100%" stopColor="#52c8ec"/>
        </linearGradient>
        <linearGradient id="logo-grad-s3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2ba4d4"/>
          <stop offset="100%" stopColor="#5cd0f0"/>
        </linearGradient>
      </defs>

      {/* A triangle - left leg */}
      <polygon points="256,40 80,460 160,460 256,165" fill="url(#logo-grad-dark)"/>

      {/* A triangle - right leg */}
      <polygon points="256,40 432,460 352,460 256,165" fill="url(#logo-grad-light)"/>

      {/* A triangle - top peak overlay */}
      <polygon points="256,40 220,130 292,130" fill="url(#logo-grad-mid)"/>

      {/* Inner triangle hole */}
      <polygon points="256,180 200,310 312,310" fill="white" fillOpacity="0"/>

      {/* E stripe 1 (top) */}
      <polygon points="118,260 270,260 262,290 126,290" fill="url(#logo-grad-s1)"/>

      {/* E stripe 2 (middle) */}
      <polygon points="104,330 254,330 246,360 112,360" fill="url(#logo-grad-s2)"/>

      {/* E stripe 3 (bottom) */}
      <polygon points="88,400 236,400 230,430 95,430" fill="url(#logo-grad-s3)"/>

      {/* Right side notch accent */}
      <polygon points="345,290 372,245 380,260 353,305" fill="url(#logo-grad-light)"/>
    </svg>
  );

  const content = (
    <div style={{ display: "inline-flex", alignItems: "center", gap: `${size * 0.25}px`, textDecoration: "none" }}>
      {logoMark}
      {withText && (
        <span
          style={{
            fontWeight: 800,
            fontSize: `${size * 0.048}rem`,
            letterSpacing: "0.04em",
            color: textColor,
            lineHeight: 1,
            textTransform: "uppercase",
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
          }}
        >
          ERAAO
        </span>
      )}
      {withSlogan && (
        <span
          style={{
            fontSize: `${size * 0.019}rem`,
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "#64748b",
            textTransform: "none",
            marginLeft: `${size * 0.1}px`
          }}
        >
          Lighting the future.
        </span>
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
