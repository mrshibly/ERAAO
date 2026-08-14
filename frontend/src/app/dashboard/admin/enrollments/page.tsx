"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { GraduationCap, Trash2, Search } from "lucide-react";
import CustomModal from "@/components/CustomModal";

export default function AdminEnrollmentsPage() {
  const { token } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "info" as "info" | "danger" | "confirm" | "success",
    title: "",
    message: "",
    confirmText: "Confirm",
    onConfirm: undefined as (() => void) | undefined
  });

  const headers = { "Authorization": `Bearer ${token}` };

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchEnrollments = async () => {
    try {
      const res = await fetch("/api/v1/enrollments", { headers });
      if (res.ok) {
        setEnrollments(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleDeleteEnrollment = (enrollmentId: string) => {
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Cancel Student Enrollment",
      message: "Are you sure you want to cancel this student's enrollment?",
      confirmText: "Cancel Enrollment",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/v1/enrollments/${enrollmentId}`, { method: "DELETE", headers });
          if (res.ok) {
            showMessage("Enrollment cancelled successfully.");
            fetchEnrollments();
          } else {
            showMessage("Failed to cancel enrollment.", "error");
          }
        } catch {
          showMessage("Error connecting to server.", "error");
        }
      }
    });
  };

  const filtered = enrollments.filter(e =>
    (e.user_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.user_email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.course_title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <GraduationCap size={24} style={{ color: "var(--accent-blue)" }} /> Enrollments Manager
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "var(--text-sm)" }}>Monitor student learning progress, enrollment states, and cancel access when necessary</p>
      </div>

      {message && (
        <div style={{
          background: message.type === "success" ? "var(--color-success-bg)" : "var(--color-error-bg)",
          color: message.type === "success" ? "var(--color-success)" : "var(--color-error)",
          padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
          border: `1px solid ${message.type === "success" ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
          marginBottom: "1.5rem", fontWeight: 600, fontSize: "var(--text-sm)"
        }}>
          {message.text}
        </div>
      )}

      <div className="card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>Student Enrollments ({filtered.length})</h2>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text" placeholder="Search by student or course..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: "2.25rem", width: "260px" }}
            />
          </div>
        </div>

        {fetching ? (
          <div className="loading-container" style={{ padding: "3rem 0" }}>Loading enrollments...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state" style={{ padding: "3rem 0" }}>No enrollments found.</div>
        ) : (
          <div className="table-container">
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "var(--text-sm)" }}>
              <thead>
                <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)", color: "var(--text-secondary)", fontWeight: 600 }}>
                  <th style={{ padding: "1rem" }}>Student</th>
                  <th style={{ padding: "1rem" }}>Course Track</th>
                  <th style={{ padding: "1rem" }}>Enrolled Date</th>
                  <th style={{ padding: "1rem" }}>Status</th>
                  <th style={{ padding: "1rem" }}>Action Override</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{e.user_name}</div>
                      <div style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)" }}>{e.user_email}</div>
                    </td>
                    <td style={{ padding: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>{e.course_title}</td>
                    <td style={{ padding: "1rem" }}>{new Date(e.enrolled_at).toLocaleDateString()}</td>
                    <td style={{ padding: "1rem" }}>
                      <span className={`badge ${e.status === "completed" ? "badge-green" : "badge-blue"}`}>
                        {e.status?.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <button 
                        onClick={() => handleDeleteEnrollment(e.id)}
                        style={{ color: "var(--color-error)", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem", fontWeight: 600, fontSize: "var(--text-xs)" }}
                      >
                        <Trash2 size={16} />
                        <span>Cancel Enrollment</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CustomModal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        onConfirm={modalConfig.onConfirm}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
}
