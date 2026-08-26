"use client";

import { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";

export default function ServiceWorkerRegister() {
  const [isOffline, setIsOffline] = useState(false);
  const [showBackOnlineToast, setShowBackOnlineToast] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          // Check for service worker updates
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                  console.log("New content available; will refresh on next visit.");
                }
              };
            }
          };
        })
        .catch((error) => {
          console.warn("ServiceWorker registration failed:", error);
        });
    }

    // Network connectivity listeners
    const handleOnline = () => {
      setIsOffline(false);
      setShowBackOnlineToast(true);
      const timer = setTimeout(() => setShowBackOnlineToast(false), 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      }
    };
  }, []);

  if (!isOffline && !showBackOnlineToast) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        background: isOffline ? "rgba(15, 23, 42, 0.95)" : "rgba(16, 185, 129, 0.95)",
        color: "#ffffff",
        padding: "0.65rem 1.25rem",
        borderRadius: "var(--radius-full)",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
        border: `1px solid ${isOffline ? "rgba(255, 255, 255, 0.15)" : "rgba(16, 185, 129, 0.4)"}`,
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        fontSize: "var(--text-xs)",
        fontWeight: 600,
        backdropFilter: "blur(8px)",
        animation: "fadeInUp 0.3s ease-out forwards",
        pointerEvents: "none"
      }}
    >
      {isOffline ? (
        <>
          <WifiOff size={16} style={{ color: "#f87171" }} />
          <span>Offline Mode — Cached lessons &amp; course syllabus available</span>
        </>
      ) : (
        <>
          <Wifi size={16} style={{ color: "#ffffff" }} />
          <span>Back Online — Live sync restored</span>
        </>
      )}
    </div>
  );
}
