"use client";

import React from "react";
import Logo from "./Logo";

interface BrandLoaderProps {
  message?: string;
  size?: number;
  fullScreen?: boolean;
}

export default function BrandLoader({
  message = "Loading ERAAO Platform...",
  size = 48,
  fullScreen = false
}: BrandLoaderProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: fullScreen ? "100vh" : "60vh",
        padding: "2rem",
        position: "relative",
        background: fullScreen ? "var(--bg-secondary)" : "transparent"
      }}
    >
      {/* Outer Glowing Radial Backplate */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem"
        }}
      >
        {/* Soft Ambient Glow Halo */}
        <div
          style={{
            position: "absolute",
            width: `${size * 2.2}px`,
            height: `${size * 2.2}px`,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.25) 0%, rgba(16, 185, 129, 0.08) 50%, transparent 75%)",
            animation: "eraaoPulseScale 2.5s ease-in-out infinite"
          }}
        />

        {/* Dual Outer Orbital Ring */}
        <div
          style={{
            width: `${size * 1.6}px`,
            height: `${size * 1.6}px`,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "var(--accent-blue)",
            borderRightColor: "var(--accent-emerald)",
            animation: "eraaoOrbitalSpin 0.9s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite",
            position: "absolute"
          }}
        />

        {/* Inner Counter-Rotating Ring */}
        <div
          style={{
            width: `${size * 1.3}px`,
            height: `${size * 1.3}px`,
            borderRadius: "50%",
            border: "2px solid transparent",
            borderBottomColor: "#38bdf8",
            borderLeftColor: "#8b5cf6",
            animation: "eraaoOrbitalSpinReverse 1.4s linear infinite",
            position: "absolute"
          }}
        />

        {/* Central Logo Vector Mark */}
        <div
          style={{
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "eraaoLogoBreath 2s ease-in-out infinite"
          }}
        >
          <Logo size={size} withText={false} href={null} />
        </div>
      </div>

      {/* Loading Message */}
      {message && (
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              color: "var(--text-primary)",
              fontWeight: 800,
              fontSize: "0.95rem",
              letterSpacing: "0.02em",
              margin: 0
            }}
          >
            {message}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "4px",
              marginTop: "0.4rem"
            }}
          >
            <span className="dot-bounce" style={{ animationDelay: "0s" }} />
            <span className="dot-bounce" style={{ animationDelay: "0.2s" }} />
            <span className="dot-bounce" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      )}
    </div>
  );
}
