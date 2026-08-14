"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShieldX, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandleable client-side application error:", error);
  }, [error]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: "2rem" }}>
      <div className="card" style={{ maxWidth: "32rem", textAlign: "center", padding: "3rem", boxShadow: "var(--shadow-md)" }}>
        <ShieldX size={56} style={{ color: "var(--color-error)", margin: "0 auto 1.5rem auto" }} />
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, marginBottom: "0.5rem", color: "var(--text-primary)" }}>System Override Failed</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.5, marginBottom: "2rem" }}>
          An unhandled error occurred in the execution engine loop. Please reload the current stack parameters or return to home.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button className="btn btn-primary" onClick={() => reset()}>
            <RotateCcw size={16} />
            <span>Reset Stack</span>
          </button>
          <Link href="/" className="btn btn-outline">
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
