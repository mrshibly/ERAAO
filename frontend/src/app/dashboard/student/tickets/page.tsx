"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert, Plus, MessageSquare, CheckCircle2, Clock, Send, AlertCircle, X } from "lucide-react";

export default function StudentTicketsPage() {
  const { token, user } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("lab_help");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/v1/tickets/me", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setTickets(await res.json());
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTickets();
  }, [token]);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/v1/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          subject: subject.trim(),
          category,
          description: description.trim()
        })
      });

      if (res.ok) {
        setShowCreateModal(false);
        setSubject("");
        setDescription("");
        fetchTickets();
      }
    } catch (err) {
      console.error("Ticket error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: "3rem" }}>
      {/* Header */}
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
            <div style={{ fontSize: "0.75rem", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
              Academic Helpdesk
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              Support Desk & Lab Help
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
              Ask syllabus questions, request lab assistance, or get technical advice from ERAAO instructors.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              background: "var(--accent-blue)",
              color: "white",
              border: "none",
              padding: "0.65rem 1.25rem",
              borderRadius: "var(--radius-md)",
              fontWeight: 700,
              fontSize: "0.875rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              boxShadow: "0 4px 12px rgba(14, 165, 233, 0.25)"
            }}
          >
            <Plus size={18} /> Submit Support Request
          </button>
        </div>
      </div>

      {/* Tickets List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-secondary)" }}>
          Loading support tickets...
        </div>
      ) : tickets.length === 0 ? (
        <div style={{
          background: "var(--card-bg)",
          border: "1px dashed var(--border-color)",
          borderRadius: "var(--radius-lg)",
          padding: "4rem 2rem",
          textAlign: "center"
        }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(14, 165, 233, 0.1)", color: "var(--accent-blue)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto" }}>
            <ShieldAlert size={28} />
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>No open support tickets</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.4rem", maxWidth: "400px", margin: "0.4rem auto 1.5rem auto" }}>
            Need help with a practical lab environment or course module? Submit a ticket to get direct assistance.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              background: "var(--accent-blue)",
              color: "white",
              border: "none",
              padding: "0.65rem 1.5rem",
              borderRadius: "var(--radius-md)",
              fontWeight: 700,
              fontSize: "0.875rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem"
            }}
          >
            <Plus size={18} /> Open Ticket Now
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {tickets.map((t) => (
            <div
              key={t.id}
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                padding: "1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1.5rem"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
                  <span style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "20px",
                    background: t.status === "closed" ? "rgba(16, 185, 129, 0.1)" : "rgba(14, 165, 233, 0.1)",
                    color: t.status === "closed" ? "#10b981" : "var(--accent-blue)"
                  }}>
                    {t.status === "closed" ? "Resolved" : "Active"}
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    Ticket #{t.id.slice(0, 8)} • {new Date(t.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {t.subject}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                  {t.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showCreateModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(6px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem"
        }}>
          <div style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-lg)",
            width: "100%",
            maxWidth: "520px",
            padding: "2rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>
                Submit Support Ticket
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: "0.4rem" }}>
                  Ticket Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Virtual Lab 3 SSH Access Error"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: "0.4rem" }}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                >
                  <option value="lab_help">Virtual Lab & Terminal Issues</option>
                  <option value="syllabus_question">Syllabus & Lecture Content Question</option>
                  <option value="certificate">Certificate & Credential Request</option>
                  <option value="billing">Enrollment & Billing Support</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: "0.4rem" }}>
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your issue or question in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    padding: "0.75rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-primary)",
                    color: "var(--text-secondary)",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    border: "none",
                    background: "var(--accent-blue)",
                    color: "white",
                    fontWeight: 700,
                    cursor: submitting ? "not-allowed" : "pointer"
                  }}
                >
                  {submitting ? "Submitting..." : "Submit Ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
