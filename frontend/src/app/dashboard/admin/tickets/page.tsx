"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { HelpCircle, Search } from "lucide-react";

export default function AdminTicketsPage() {
  const { token } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [ticketReplyBody, setTicketReplyBody] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/v1/tickets", { headers });
      if (res.ok) {
        setTickets(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSelectTicket = (ticket: any) => {
    setSelectedTicket(ticket);
  };

  const handleReplyTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !ticketReplyBody.trim()) return;
    try {
      const res = await fetch(`/api/v1/tickets/${selectedTicket.id}/replies`, {
        method: "POST",
        headers,
        body: JSON.stringify({ body: ticketReplyBody })
      });
      if (res.ok) {
        showMessage("Reply posted successfully!");
        setTicketReplyBody("");
        // Reload all tickets, and update selected ticket view
        const ticketsRes = await fetch("/api/v1/tickets", { headers });
        if (ticketsRes.ok) {
          const freshTickets = await ticketsRes.json();
          setTickets(freshTickets);
          const updated = freshTickets.find((t: any) => t.id === selectedTicket.id);
          if (updated) setSelectedTicket(updated);
        }
      } else {
        showMessage("Failed to post reply.", "error");
      }
    } catch {
      showMessage("Error posting reply.", "error");
    }
  };

  const handleUpdateTicketStatus = async (ticketId: string, status: string, priority: string) => {
    try {
      const res = await fetch(`/api/v1/tickets/${ticketId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status, priority })
      });
      if (res.ok) {
        showMessage("Ticket status updated.");
        // Reload tickets
        const ticketsRes = await fetch("/api/v1/tickets", { headers });
        if (ticketsRes.ok) {
          const freshTickets = await ticketsRes.json();
          setTickets(freshTickets);
          const updated = freshTickets.find((t: any) => t.id === ticketId);
          if (updated) setSelectedTicket(updated);
        }
      } else {
        showMessage("Failed to update status.", "error");
      }
    } catch {
      showMessage("Error updating ticket.", "error");
    }
  };

  const filtered = tickets.filter(t =>
    (t.subject || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.status || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <HelpCircle size={24} style={{ color: "var(--accent-blue)" }} /> Support Desk
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "var(--text-sm)" }}>Interact with students and clients seeking help, and manage ticket overrides</p>
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
        {/* Ticket List */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>Active Tickets ({filtered.length})</h2>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text" placeholder="Search tickets..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: "2.25rem", width: "200px" }}
              />
            </div>
          </div>

          {fetching ? (
            <div className="loading-container" style={{ padding: "3rem 0" }}>Loading tickets...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state card" style={{ padding: "3rem 0" }}>No tickets found.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {filtered.map((t) => (
                <div 
                  key={t.id} 
                  onClick={() => handleSelectTicket(t)}
                  className="card"
                  style={{ 
                    border: selectedTicket?.id === t.id ? "2px solid var(--accent-blue)" : "1px solid var(--border-color)", 
                    padding: "1.25rem", 
                    cursor: "pointer" 
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className={`badge ${t.status === "open" ? "badge-amber" : "badge-green"}`}>
                      {t.status?.toUpperCase()}
                    </span>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                      Priority: {t.priority}
                    </span>
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: "var(--text-base)", marginTop: "0.4rem", color: "var(--text-primary)" }}>{t.subject}</h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", marginTop: "0.2rem" }}>Updated: {new Date(t.updated_at || t.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Ticket */}
        <div>
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "1.25rem", color: "var(--text-primary)" }}>Ticket Console</h2>
          {!selectedTicket ? (
            <div className="empty-state card" style={{ padding: "4rem 2rem" }}>
              <p className="empty-text">Select a support ticket from the list to view conversations and post updates.</p>
            </div>
          ) : (
            <div className="card" style={{ padding: "1.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: "var(--text-base)", color: "var(--text-primary)" }}>{selectedTicket.subject}</h3>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "0.15rem" }}>Ticket ID: {selectedTicket.id}</p>
                </div>
                <div>
                  <select 
                    value={selectedTicket.status} 
                    onChange={(e) => handleUpdateTicketStatus(selectedTicket.id, e.target.value, selectedTicket.priority)}
                    className="input-field"
                    style={{ padding: "0.3rem 0.6rem", fontSize: "var(--text-xs)", fontWeight: 600, width: "auto" }}
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Conversation thread */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxHeight: "300px", overflowY: "auto", marginBottom: "1.25rem", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", padding: "1rem" }}>
                {(!selectedTicket.replies || selectedTicket.replies.length === 0) ? (
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)", textAlign: "center" }}>No replies in this thread yet.</p>
                ) : (
                  selectedTicket.replies.map((reply: any) => (
                    <div key={reply.id} style={{ alignSelf: reply.is_staff_reply ? "flex-end" : "flex-start", background: reply.is_staff_reply ? "var(--accent-blue-bg)" : "var(--bg-secondary)", padding: "0.65rem 0.85rem", borderRadius: "var(--radius-md)", maxWidth: "80%" }}>
                      <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBottom: "0.2rem" }}>
                        {reply.is_staff_reply ? "Staff Agent Override" : "User Client"} &bull; {new Date(reply.created_at).toLocaleTimeString()}
                      </div>
                      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>{reply.body}</p>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleReplyTicket}>
                <textarea 
                  required
                  placeholder="Type response message..."
                  rows={3}
                  value={ticketReplyBody}
                  onChange={(e) => setTicketReplyBody(e.target.value)}
                  className="input-field"
                  style={{ resize: "vertical" }}
                />
                <button type="submit" className="btn btn-accent" style={{ width: "100%", marginTop: "0.75rem" }}>
                  Send Response
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
