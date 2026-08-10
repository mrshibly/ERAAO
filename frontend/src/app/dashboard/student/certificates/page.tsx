"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Award, ExternalLink, ShieldCheck, Download, Share2, CheckCircle2, Lock, ArrowRight } from "lucide-react";

export default function StudentCertificatesPage() {
  const { token, user } = useAuth();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch("/api/v1/certificates/me", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setCertificates(data);
        }
      } catch (err) {
        console.error("Error fetching student certificates:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchCertificates();
  }, [token]);

  return (
    <div style={{ paddingBottom: "3rem" }}>
      {/* Page Header */}
      <div style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-lg)",
        padding: "2rem",
        marginBottom: "2rem",
        boxShadow: "var(--shadow-sm)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--accent-emerald)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
              Cryptographic Credential Ledger
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              My Certificates & Badges
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
              Verify, share, and export your official ERAAO course completion credentials.
            </p>
          </div>
          <div style={{
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            color: "#10b981",
            padding: "0.6rem 1.25rem",
            borderRadius: "var(--radius-md)",
            fontSize: "0.85rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <ShieldCheck size={18} />
            <span>{certificates.length} Verified Badges</span>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-secondary)" }}>
          Verifying credential ledger...
        </div>
      ) : certificates.length === 0 ? (
        <div style={{
          background: "var(--card-bg)",
          border: "1px dashed var(--border-color)",
          borderRadius: "var(--radius-lg)",
          padding: "4rem 2rem",
          textAlign: "center"
        }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto" }}>
            <Award size={28} />
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>No certificates earned yet</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.4rem", maxWidth: "420px", margin: "0.4rem auto 1.5rem auto" }}>
            Complete 100% of any enrolled course syllabus to automatically receive your cryptographically verified ERAAO certificate.
          </p>
          <Link href="/dashboard/student/courses" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--accent-blue)",
            color: "white",
            padding: "0.65rem 1.5rem",
            borderRadius: "var(--radius-md)",
            fontWeight: 700,
            textDecoration: "none"
          }}>
            View Active Courses <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.75rem" }}>
          {certificates.map((cert) => (
            <div
              key={cert.id}
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-lg)",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "var(--shadow-sm)",
                position: "relative",
                overflow: "hidden"
              }}
              className="hover-lift"
            >
              {/* Badge Icon Header */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #0ea5e9, #10b981)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 16px rgba(14, 165, 233, 0.25)"
                  }}>
                    <Award size={26} />
                  </div>
                  <div style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--accent-emerald)",
                    background: "rgba(16, 185, 129, 0.1)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "20px"
                  }}>
                    VERIFIED CREDENTIAL
                  </div>
                </div>

                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.4rem", lineHeight: "1.3" }}>
                  {cert.course_title || "Certified Cybersecurity Specialist"}
                </h3>
                <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                  Issued to <strong style={{ color: "var(--text-primary)" }}>{user?.full_name}</strong> on {cert.issued_at ? new Date(cert.issued_at).toLocaleDateString() : "Recent"}
                </p>

                <div style={{
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                  marginBottom: "1.5rem"
                }}>
                  ID: {cert.verification_id || cert.id}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <Link
                  href={`/verify/${cert.verification_id || cert.id}`}
                  target="_blank"
                  style={{
                    flex: 1,
                    padding: "0.6rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--accent-blue)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem"
                  }}
                >
                  <ExternalLink size={14} /> View Certificate
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
