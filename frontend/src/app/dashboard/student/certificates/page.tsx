"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Award, ExternalLink, ShieldCheck, ArrowRight } from "lucide-react";

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
      <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--color-success)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
              Cryptographic Credential Ledger
            </div>
            <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              My Certificates &amp; Badges
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginTop: "0.25rem" }}>
              Verify, share, and export your official ERAAO course completion credentials.
            </p>
          </div>
          <div className="badge badge-green" style={{ padding: "0.6rem 1.25rem", fontSize: "var(--text-sm)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShieldCheck size={18} />
            <span>{certificates.length} Verified Badges</span>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      {loading ? (
        <div className="loading-container" style={{ padding: "4rem 0" }}>
          Verifying credential ledger...
        </div>
      ) : certificates.length === 0 ? (
        <div className="empty-state card" style={{ padding: "4rem 2rem" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--color-warning-bg)", color: "var(--color-warning)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto" }}>
            <Award size={28} />
          </div>
          <h3 className="empty-title">No certificates earned yet</h3>
          <p className="empty-text">
            Complete 100% of any enrolled course syllabus to automatically receive your cryptographically verified ERAAO certificate.
          </p>
          <Link href="/dashboard/student/courses" className="btn btn-primary" style={{ marginTop: "1rem" }}>
            View Active Courses <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="card-grid">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="card hover-lift"
              style={{
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              {/* Badge Icon Header */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-md)",
                    background: "linear-gradient(135deg, var(--accent-blue), var(--color-success))",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "var(--shadow-md)"
                  }}>
                    <Award size={26} />
                  </div>
                  <span className="badge badge-green">
                    VERIFIED CREDENTIAL
                  </span>
                </div>

                <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.4rem", lineHeight: "1.3" }}>
                  {cert.course_title || "Certified Cybersecurity Specialist"}
                </h3>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                  Issued to <strong style={{ color: "var(--text-primary)" }}>{user?.full_name}</strong> on {cert.issued_at ? new Date(cert.issued_at).toLocaleDateString() : "Recent"}
                </p>

                <div style={{
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.5rem 0.75rem",
                  fontSize: "var(--text-xs)",
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
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    fontSize: "var(--text-sm)"
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
