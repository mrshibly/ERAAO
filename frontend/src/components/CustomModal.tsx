"use client";

import React, { useEffect } from "react";
import { AlertTriangle, CheckCircle2, Info, X, ShieldAlert } from "lucide-react";

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
          <div style={{ width: "44px", height: "44px", borderRadius: "var(--radius-full)", background: "var(--color-error-bg)", color: "var(--color-error)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <AlertTriangle size={22} />
          </div>
        );
      case "confirm":
        return (
          <div style={{ width: "44px", height: "44px", borderRadius: "var(--radius-full)", background: "var(--accent-blue-bg)", color: "var(--accent-blue)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ShieldAlert size={22} />
          </div>
        );
      case "success":
        return (
          <div style={{ width: "44px", height: "44px", borderRadius: "var(--radius-full)", background: "var(--color-success-bg)", color: "var(--color-success)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <CheckCircle2 size={22} />
          </div>
        );
      default:
        return (
          <div style={{ width: "44px", height: "44px", borderRadius: "var(--radius-full)", background: "rgba(139, 92, 246, 0.12)", color: "var(--accent-violet)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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
          WebkitBackdropFilter: "blur(8px)"
        }}
        className="anim-fade-in"
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
          boxShadow: "var(--shadow-xl)",
          padding: "1.75rem"
        }}
        className="anim-fade-up"
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
            borderRadius: "var(--radius-sm)"
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
          {getHeaderIcon()}
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
              {title}
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: "1.5" }}>
              {message}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.75rem" }}>
          {!isAlertOnly && (
            <button
              onClick={onClose}
              className="btn btn-outline"
              style={{ padding: "0.55rem 1.25rem", fontSize: "var(--text-sm)" }}
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
            className={type === "danger" ? "btn" : "btn btn-accent"}
            style={{
              padding: "0.55rem 1.25rem",
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              backgroundColor: type === "danger" ? "var(--color-error)" : undefined,
              color: "white"
            }}
          >
            {confirmText || (isAlertOnly ? "Got it" : "Confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
