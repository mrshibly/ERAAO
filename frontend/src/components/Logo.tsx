"use client";

import React, { useId } from "react";
import Link from "next/link";

interface LogoProps {
  size?: number;
  withText?: boolean;
  withSlogan?: boolean;
  textColor?: string;
  href?: string | null;
}

export default function Logo({
  size = 32,
  withText = true,
  withSlogan = false,
  textColor = "var(--text-primary)",
  href = "/",
}: LogoProps) {
  const uid = useId().replace(/:/g, "_");

  const logoMark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: "block" }}
    >
      <defs>
        <linearGradient id={`grad-left-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id={`grad-right-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id={`grad-top-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <linearGradient id={`grad-stripe-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
      </defs>

      {/* A triangle - left leg */}
      <polygon points="256,40 80,460 160,460 256,165" fill={`url(#grad-left-${uid})`} />

      {/* A triangle - right leg */}
      <polygon points="256,40 432,460 352,460 256,165" fill={`url(#grad-right-${uid})`} />

      {/* A triangle - top peak overlay */}
      <polygon points="256,40 220,130 292,130" fill={`url(#grad-top-${uid})`} />

      {/* E stripes horizontal */}
      <polygon points="118,260 270,260 262,290 126,290" fill={`url(#grad-stripe-${uid})`} />
      <polygon points="104,330 254,330 246,360 112,360" fill={`url(#grad-stripe-${uid})`} />
      <polygon points="88,400 236,400 230,430 95,430" fill={`url(#grad-stripe-${uid})`} />

      {/* Right side notch accent */}
      <polygon points="345,290 372,245 380,260 353,305" fill="#38bdf8" />
    </svg>
  );

  const content = (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
      {logoMark}
      {withText && (
        <span
          style={{
            fontWeight: 900,
            fontSize: `${Math.max(1.1, size * 0.045)}rem`,
            letterSpacing: "0.05em",
            color: textColor,
            lineHeight: 1,
            textTransform: "uppercase",
            fontFamily: "var(--font-main)"
          }}
        >
          ERAAO
        </span>
      )}
      {withSlogan && (
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "#64748b",
            textTransform: "none",
            marginLeft: "0.4rem"
          }}
        >
          Lighting the future.
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none", display: "inline-flex" }}>
        {content}
      </Link>
    );
  }

  return content;
}
