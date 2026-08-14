"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  text: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (text: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((text: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    
    // Automatically remove toast after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      
      {/* Toast Stack Overlay */}
      <div style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        maxWidth: "24rem",
        width: "100%"
      }}>
        {toasts.map((toast) => {
          let bgColor = "var(--card-bg)";
          let borderColor = "var(--border-color)";
          let textColor = "var(--text-primary)";
          let iconColor = "var(--accent-blue)";
          let Icon = Info;

          if (toast.type === "success") {
            bgColor = "var(--color-success-bg)";
            borderColor = "rgba(34, 197, 94, 0.3)";
            textColor = "#15803d";
            iconColor = "var(--color-success)";
            Icon = CheckCircle;
          } else if (toast.type === "error") {
            bgColor = "var(--color-error-bg)";
            borderColor = "rgba(239, 68, 68, 0.3)";
            textColor = "#b91c1c";
            iconColor = "var(--color-error)";
            Icon = AlertCircle;
          } else if (toast.type === "warning") {
            bgColor = "var(--color-warning-bg)";
            borderColor = "rgba(245, 158, 11, 0.3)";
            textColor = "#b45309";
            iconColor = "var(--color-warning)";
            Icon = AlertCircle;
          }

          return (
            <div 
              key={toast.id} 
              className="anim-fade-up"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                background: bgColor,
                border: `1px solid ${borderColor}`,
                color: textColor,
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-md)"
              }}
            >
              <Icon size={18} style={{ flexShrink: 0, marginTop: "0.1rem", color: iconColor }} />
              <div style={{ flex: 1, fontSize: "var(--text-sm)", fontWeight: 500, lineHeight: 1.4 }}>
                {toast.text}
              </div>
              <button 
                onClick={() => removeToast(toast.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "inherit",
                  opacity: 0.7,
                  display: "flex",
                  padding: "0.1rem",
                  borderRadius: "var(--radius-sm)"
                }}
                aria-label="Dismiss toast"
              >
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
