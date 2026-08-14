"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert, Plus, X } from "lucide-react";

export default function StudentTicketsPage() {
  const { token } = useAuth();
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
      <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
              Academic Helpdesk
            </div>
            <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              Support Desk &amp; Lab Help
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginTop: "0.25rem" }}>
              Ask syllabus questions, request lab assistance, or get technical advice from ERAAO instructors.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-accent"
            style={{
              padding: "0.65rem 1.25rem",
              fontSize: "var(--text-sm)"
            }}
          >
            <Plus size={18} /> Submit Support Request
          </button>
        </div>
      </div>

      {/* Tickets List */}
      {loading ? (
        <div className="loading-container" style={{ padding: "4rem 0" }}>
          Loading support tickets...
        </div>
      ) : tickets.length === 0 ? (
        <div className="empty-state card" style={{ padding: "4rem 2rem" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--accent-blue-bg)", color: "var(--accent-blue)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto" }}>
            <ShieldAlert size={28} />
          </div>
          <h3 className="empty-title">No open support tickets</h3>
          <p className="empty-text">
            Need help with a practical lab environment or course module? Submit a ticket to get direct assistance.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
            style={{ marginTop: "1rem" }}
          >
            <Plus size={18} /> Open Ticket Now
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {tickets.map((t) => (
            <div
              key={t.id}
              className="card"
              style={{
                padding: "1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1.5rem"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
                  <span className={`badge ${t.status === "closed" ? "badge-green" : "badge-blue"}`}>
                    {t.status === "closed" ? "Resolved" : "Active"}
                  </span>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                    Ticket #{t.id.slice(0, 8)} • {new Date(t.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>
                  {t.subject}
                </h3>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
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
          <div className="card" style={{
            width: "100%",
            maxWidth: "520px",
            padding: "2rem",
            boxShadow: "var(--shadow-xl)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)" }}>
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
              <div className="form-group">
                <label className="form-label">
                  Ticket Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Virtual Lab 3 SSH Access Error"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field"
                >
                  <option value="lab_help">Virtual Lab &amp; Terminal Issues</option>
                  <option value="syllabus_question">Syllabus &amp; Lecture Content Question</option>
                  <option value="certificate">Certificate &amp; Credential Request</option>
                  <option value="billing">Enrollment &amp; Billing Support</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your issue or question in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="input-field"
                  style={{ resize: "vertical" }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
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
