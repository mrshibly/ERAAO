"use client";

import React, { useEffect } from "react";
import { AlertTriangle, CheckCircle2, Info, X, ShieldAlert, AlertCircle } from "lucide-react";

export interface CustomModalProps {
  isOpen: boolean;
  type?: "danger" | "confirm" | "info" | "success";
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onClose: () => void;
}

export default function CustomModal({
  isOpen,
  type = "info",
  title,
  message,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  onClose
}: CustomModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getHeaderIcon = () => {
    switch (type) {
      case "danger":
        return (
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.12)", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AlertTriangle size={22} />
          </div>
        );
      case "confirm":
        return (
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(14, 165, 233, 0.12)", color: "var(--accent-blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShieldAlert size={22} />
          </div>
        );
      case "success":
        return (
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.12)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckCircle2 size={22} />
          </div>
        );
      default:
        return (
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(139, 92, 246, 0.12)", color: "var(--accent-violet)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Info size={22} />
          </div>
        );
    }
  };

  const isAlertOnly = !onConfirm || type === "info" || type === "success";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem"
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(15, 23, 42, 0.55)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          animation: "eraaoFadeIn 0.2s ease forwards"
        }}
      />

      {/* Modal Dialog Card */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "440px",
          background: "var(--card-bg)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          padding: "1.75rem",
          animation: "eraaoModalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: "0.25rem",
            borderRadius: "6px"
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
          {getHeaderIcon()}
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
              {title}
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.5" }}>
              {message}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.75rem" }}>
          {!isAlertOnly && (
            <button
              onClick={onClose}
              style={{
                padding: "0.6rem 1.25rem",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-primary)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                fontWeight: 700,
                fontSize: "0.875rem",
                cursor: "pointer"
              }}
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "var(--radius-md)",
              background: type === "danger" ? "#ef4444" : "var(--accent-blue)",
              color: "white",
              border: "none",
              fontWeight: 800,
              fontSize: "0.875rem",
              cursor: "pointer",
              boxShadow: type === "danger" ? "0 4px 12px rgba(239, 68, 68, 0.3)" : "0 4px 12px rgba(14, 165, 233, 0.3)"
            }}
          >
            {confirmText || (isAlertOnly ? "Got it" : "Confirm")}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes eraaoFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes eraaoModalPop {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
