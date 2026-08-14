"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Award, Search } from "lucide-react";

export default function AdminCertificatesPage() {
  const { token } = useAuth();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const headers = { "Authorization": `Bearer ${token}` };

  const fetchCertificates = async () => {
    try {
      const res = await fetch("/api/v1/certificates", { headers });
      if (res.ok) {
        setCertificates(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const filtered = certificates.filter(c =>
    (c.user_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.user_email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.course_title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.verification_id || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <Award size={24} style={{ color: "var(--accent-blue)" }} /> Certificates Registry
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "var(--text-sm)" }}>Review and verify professional credentials issued to platform graduates</p>
      </div>

      <div className="card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>Generated Certificates ({filtered.length})</h2>
          <div style={{ position: "relative", width: "100%", maxWidth: "260px" }}>
            <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text" placeholder="Search registry..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: "2.25rem" }}
            />
          </div>
        </div>

        {fetching ? (
          <div className="loading-container" style={{ padding: "3rem 0" }}>Loading credentials list...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state" style={{ padding: "3rem 0" }}>No certificates issued.</div>
        ) : (
          <div className="table-container">
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "var(--text-sm)" }}>
              <thead>
                <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)", color: "var(--text-secondary)", fontWeight: 600 }}>
                  <th style={{ padding: "1rem" }}>Holder Name</th>
                  <th style={{ padding: "1rem" }}>Course Track</th>
                  <th style={{ padding: "1rem" }}>Verification ID</th>
                  <th style={{ padding: "1rem" }}>Issued Date</th>
                  <th style={{ padding: "1rem" }}>Verification File</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{c.user_name}</div>
                      <div style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)" }}>{c.user_email}</div>
                    </td>
                    <td style={{ padding: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>{c.course_title}</td>
                    <td style={{ padding: "1rem", fontFamily: "monospace" }}>{c.verification_id}</td>
                    <td style={{ padding: "1rem" }}>{new Date(c.issued_at).toLocaleDateString()}</td>
                    <td style={{ padding: "1rem" }}>
                      {c.pdf_url ? (
                        <a href={c.pdf_url} target="_blank" rel="noreferrer" style={{ color: "var(--accent-blue)", textDecoration: "underline", fontWeight: 600 }}>
                          Open PDF
                        </a>
                      ) : (
                        <span style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)" }}>Generating...</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
