"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.detail || "Unable to request password reset code.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "6rem 0", display: "flex", justifyContent: "center" }}>
      <div className="container" style={{ maxWidth: "26rem" }}>
        
        <div className="card" style={{ padding: "2.5rem", boxShadow: "var(--shadow-md)" }}>
          {success ? (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <CheckCircle2 size={64} style={{ color: "var(--color-success)", margin: "0 auto 1.5rem auto" }} />
              <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>Reset Link Dispatched</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "1.5rem", lineHeight: 1.5 }}>
                An instructions link has been sent to <strong>{email}</strong> if an account exists under that address.
              </p>
              <Link href="/login" className="btn btn-primary" style={{ width: "100%" }}>
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)" }}>Reset Password</h1>
                <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", marginTop: "0.25rem" }}>
                  Provide your email to receive recovery instructions
                </p>
              </div>

              {error && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--color-error-bg)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "var(--color-error)", padding: "0.75rem", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)", marginBottom: "1.5rem" }}>
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div style={{ position: "relative" }}>
                    <Mail size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" style={{ paddingLeft: "2.25rem" }} />
                  </div>
                </div>

                <button disabled={loading} type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                  <Send size={18} />
                  <span>{loading ? "Sending..." : "Request Reset Link"}</span>
                </button>
              </form>

              <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                Remember password? <Link href="/login" style={{ color: "var(--accent-blue)", fontWeight: 600 }}>Log in</Link>
              </p>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
