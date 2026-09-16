"use client";

import React, { useId } from "react";
import Link from "next/link";

interface LogoProps {
  size?: number;
  withText?: boolean;
  withSlogan?: boolean;
  textColor?: string;
  href?: string | null;
  className?: string;
}

export default function Logo({
  size = 38,
  withText = true,
  withSlogan = false,
  textColor,
  href = "/",
  className,
}: LogoProps) {
  const uid = useId().replace(/:/g, "_");

  // If a custom non-default textColor is provided, optionally tint the wordmark
  const customTextColor = textColor && textColor !== "var(--text-primary)" ? textColor : undefined;

  const defsContent = (
    <defs>
      <linearGradient id={`gradient_0-${uid}`} gradientUnits="userSpaceOnUse" x1="1726.5092" y1="2043.5887" x2="1472.9811" y2="1672.0959"><stop offset="0" stopColor="#0D98FE" /><stop offset="1" stopColor="#4DE2FE" /></linearGradient>
      <linearGradient id={`gradient_1-${uid}`} gradientUnits="userSpaceOnUse" x1="2985.8962" y1="2303.5908" x2="2356.6475" y2="1808.3087"><stop offset="0" stopColor="#9A42FF" /><stop offset="1" stopColor="#3D66FF" /></linearGradient>
      <linearGradient id={`gradient_2-${uid}`} gradientUnits="userSpaceOnUse" x1="3231.1802" y1="2833.4138" x2="3034.6692" y2="2639.7207"><stop offset="0" stopColor="#7E3CFF" /><stop offset="1" stopColor="#518EFF" /></linearGradient>
      <linearGradient id={`gradient_3-${uid}`} gradientUnits="userSpaceOnUse" x1="2013.6432" y1="2438.7148" x2="1747.0249" y2="2156.7441"><stop offset="0" stopColor="#6128FF" /><stop offset="1" stopColor="#189AFF" /></linearGradient>
      <linearGradient id={`gradient_4-${uid}`} gradientUnits="userSpaceOnUse" x1="1620.7877" y1="2168.7468" x2="1678.3853" y2="2235.9526"><stop offset="0" stopColor="#49BEFE" /><stop offset="1" stopColor="#28A0FF" /></linearGradient>
      <linearGradient id={`gradient_5-${uid}`} gradientUnits="userSpaceOnUse" x1="2044.1875" y1="1981.6842" x2="1917.3313" y2="1845.1686"><stop offset="0" stopColor="#2462FF" /><stop offset="1" stopColor="#38BDFF" /></linearGradient>
    </defs>
  );

  // Aspect ratio of the emblem mark: 1930w x 1165h (~1.6567:1)
  // When withText is true, height is size and width is proportionally calculated
  const markHeight = size;
  const markWidth = Math.round(markHeight * (1930 / 1165));

  const logoMark = (
    <svg
      width={markWidth}
      height={markHeight}
      viewBox="1070 1155 1930 1165"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: "block" }}
      aria-label="ERAAO Brand Mark"
    >
      {defsContent}
      <g id={`eraao-emblem-${uid}`}>
        
      </g>
    </svg>
  );

  // Wordmark aspect ratio: 2580w x 375h (~6.88:1)
  // Perfectly balanced with mark height
  const textHeight = Math.max(16, Math.round(size * 0.52));
  const textWidth = Math.round(textHeight * (2580 / 375));

  const wordMark = (
    <svg
      width={textWidth}
      height={textHeight}
      viewBox="770 2535 2580 375"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: "block" }}
      aria-label="ERAAO"
    >
      {defsContent}
      <g id={`eraao-wordmark-${uid}`}>
        
      </g>
    </svg>
  );

  const content = (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: `${Math.max(0.65, size * 0.024)}rem`,
        textDecoration: "none",
      }}
    >
      {logoMark}
      {withText && (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {wordMark}
          {withSlogan && (
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "var(--text-muted, #94a3b8)",
                textTransform: "none",
                marginTop: "2px",
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
      <Link href={href} style={{ textDecoration: "none", display: "inline-flex" }}>
        {content}
      </Link>
    );
  }

  return content;
}
