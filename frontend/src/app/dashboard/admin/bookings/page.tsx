"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Calendar, Search } from "lucide-react";

export default function AdminBookingsPage() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const headers = { "Authorization": `Bearer ${token}` };

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/v1/bookings", { headers });
      if (res.ok) {
        setBookings(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filtered = bookings.filter(b =>
    (b.client_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.client_email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.company_name && b.company_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <Calendar size={24} style={{ color: "var(--accent-blue)" }} /> Booking Manager
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "var(--text-sm)" }}>Monitor consultation slots and B2B corporate training meetings scheduled by visitors</p>
      </div>

      <div className="card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>Upcoming Slots ({filtered.length})</h2>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text" placeholder="Search by name, email, or company..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: "2.25rem", width: "280px" }}
            />
          </div>
        </div>

        {fetching ? (
          <div className="loading-container" style={{ padding: "3rem 0" }}>Loading scheduled slots...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state" style={{ padding: "3rem 0" }}>No bookings registered.</div>
        ) : (
          <div className="table-container">
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "var(--text-sm)" }}>
              <thead>
                <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)", color: "var(--text-secondary)", fontWeight: 600 }}>
                  <th style={{ padding: "1rem" }}>Scheduled Time</th>
                  <th style={{ padding: "1rem" }}>Client Name</th>
                  <th style={{ padding: "1rem" }}>Email Address</th>
                  <th style={{ padding: "1rem" }}>Company/Org Name</th>
                  <th style={{ padding: "1rem" }}>Scope/Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => (
                  <tr key={booking.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      {new Date(booking.scheduled_time).toLocaleString()}
                    </td>
                    <td style={{ padding: "1rem", color: "var(--text-primary)" }}>{booking.client_name}</td>
                    <td style={{ padding: "1rem", fontFamily: "monospace" }}>{booking.client_email}</td>
                    <td style={{ padding: "1rem" }}>{booking.company_name || "Self-employed"}</td>
                    <td style={{ padding: "1rem", whiteSpace: "pre-wrap", color: "var(--text-secondary)" }}>{booking.notes || "No extra context."}</td>
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
