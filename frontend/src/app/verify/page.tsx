"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Search, ShieldCheck, CheckCircle2, Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function CertificateVerificationSearchPage() {
  const router = useRouter();
  const [verificationId, setVerificationId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = verificationId.trim();
    if (!cleanId) {
      setError("Please enter a valid Certificate Verification ID or URL.");
      return;
    }

    // Extract ID if full URL was pasted
    let finalId = cleanId;
    if (cleanId.includes("/verify/")) {
      const parts = cleanId.split("/verify/");
      finalId = parts[1]?.split("?")[0]?.split("/")[0] || cleanId;
    }

    setError(null);
    setLoading(true);
    router.push(`/verify/${finalId}`);
  };

  return (
    <div style={{ padding: "var(--spacing-section) 0", background: "var(--bg-secondary)", minHeight: "90vh" }}>
      <div className="container" style={{ maxWidth: "52rem" }}>
        
        {/* Header */}
        <div className="section-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-badge" style={{ background: "rgba(14, 165, 233, 0.1)", color: "var(--accent-blue)" }}>
            <ShieldCheck size={14} style={{ display: "inline", marginRight: "0.3rem" }} /> Credential Integrity
          </span>
          <h1 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Official Certificate <span className="text-gradient">Verification</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: "38rem", margin: "0.75rem auto 0 auto" }}>
            Verify the authenticity of digital certificates and practitioner diplomas issued by ERAAO Applied AI &amp; Cybersecurity Academy.
          </p>
        </div>

        {/* Verification Lookup Card */}
        <div className="card" style={{ padding: "2.75rem 2.25rem", boxShadow: "var(--shadow-xl)", background: "var(--card-bg)", marginBottom: "3rem" }}>
          <form onSubmit={handleVerify}>
            <label className="form-label" style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", display: "block" }}>
              Enter Certificate ID or Verification URL
            </label>
            
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <Award size={20} style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", color: "var(--accent-blue)" }} />
              <input
                type="text"
                placeholder="e.g. e17b3fd7-4562-4f81-9b12-9c3f811a0021"
                value={verificationId}
                onChange={(e) => {
                  setVerificationId(e.target.value);
                  if (error) setError(null);
                }}
                className="input-field"
                style={{ paddingLeft: "3rem", paddingRight: "1rem", fontSize: "var(--text-base)" }}
                autoFocus
              />
            </div>

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-error)", fontSize: "var(--text-xs)", marginBottom: "1rem" }}>
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !verificationId.trim()}
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.9rem 1.5rem", fontSize: "var(--text-base)", fontWeight: 700, borderRadius: "var(--radius-md)", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
            >
              <Search size={18} />
              <span>{loading ? "Searching Credential..." : "Verify Certificate"}</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* Verification System Guarantees */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          <div className="card" style={{ padding: "1.75rem", background: "var(--card-bg)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--accent-blue-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-blue)", marginBottom: "1rem" }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Cryptographic Integrity
            </h3>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Every certificate contains an immutable unique verification hash linked to the graduate&apos;s verified curriculum records.
            </p>
          </div>

          <div className="card" style={{ padding: "1.75rem", background: "var(--card-bg)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--accent-teal-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-teal)", marginBottom: "1rem" }}>
              <CheckCircle2 size={22} />
            </div>
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Real-Time Validation
            </h3>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Employers and institutions can instantly confirm student identity, completion date, syllabus scope, and instructor signatures.
            </p>
          </div>

          <div className="card" style={{ padding: "1.75rem", background: "var(--card-bg)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(124, 58, 237, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-violet)", marginBottom: "1rem" }}>
              <Lock size={22} />
            </div>
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Tamper Evident
            </h3>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Any alteration to holder name or credential parameters will invalidate the digital certificate verification status immediately.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
