"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Building, Users, FileText, Download, Plus, Mail, CheckCircle2 } from "lucide-react";

export default function ClientDashboard() {
  const router = useRouter();
  const { user, token, loading } = useAuth();
  const [data, setData] = useState<any>({ organization: null, total_enrollments: 0, invoices: [] });
  const [fetching, setFetching] = useState(true);
  
  // Invite members form
  const [inviteEmail, setInviteEmail] = useState("");
  const [sendingInvite, setSendingInvite] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { "Authorization": `Bearer ${token}` };
        const res = await fetch("/api/v1/dashboard/client/overview", { headers });
        if (res.ok) {
          setData(await res.json());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [user, token, loading, router]);

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingInvite(true);
    setInviteSuccess(false);

    try {
      // Simulate invite API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setInviteSuccess(true);
      setInviteEmail("");
    } catch (err) {
      console.error(err);
    } finally {
      setSendingInvite(false);
    }
  };

  if (loading || fetching) {
    return (
      <div className="loading-container" style={{ padding: "8rem 0" }}>
        <p>Loading corporate dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Banner */}
      <div className="card" style={{ padding: "2.5rem", marginBottom: "3rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "2rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-blue)" }}>
            <Building size={20} />
            <span style={{ fontWeight: 600, fontSize: "var(--text-xs)", textTransform: "uppercase" }}>Enterprise Organization Portal</span>
          </div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-primary)" }}>Corporate Client Console</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)" }}>Manage training cohorts and view invoices</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--bg-secondary)", padding: "1rem 1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
          <Users size={24} style={{ color: "var(--accent-blue)" }} />
          <div>
            <span style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "block", lineHeight: "1", color: "var(--text-primary)" }}>{data.total_enrollments}</span>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Total Employee Enrollments</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem" }}>
        
        {/* Left Panel: Invoices */}
        <div style={{ gridColumn: "span 2" }}>
          <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
            <FileText size={22} style={{ color: "var(--accent-blue)" }} /> Corporate Invoices
          </h2>

          {data.invoices.length === 0 ? (
            <div className="empty-state card" style={{ padding: "3rem" }}>
              No active corporate invoices found.
            </div>
          ) : (
            <div className="table-container">
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "var(--text-sm)" }}>
                <thead>
                  <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)", color: "var(--text-secondary)", fontWeight: 600 }}>
                    <th style={{ padding: "1rem" }}>Invoice #</th>
                    <th style={{ padding: "1rem" }}>Status</th>
                    <th style={{ padding: "1rem", textAlign: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.invoices.map((inv: any) => (
                    <tr key={inv.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>{inv.invoice_number}</td>
                      <td style={{ padding: "1rem" }}>
                        <span className={`badge ${inv.status === "paid" ? "badge-green" : "badge-amber"}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td style={{ padding: "1rem", textAlign: "right" }}>
                        <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent-blue)", display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "var(--text-xs)", fontWeight: 600 }}>
                          <Download size={14} /> PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Panel: Invite Employees */}
        <div className="card" style={{ padding: "2rem", height: "fit-content" }}>
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
            <Plus size={20} style={{ color: "var(--accent-teal)" }} /> Invite Employees
          </h2>

          {inviteSuccess && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--color-success-bg)", border: "1px solid var(--color-success)", color: "var(--color-success)", padding: "0.75rem", borderRadius: "var(--radius-md)", fontSize: "var(--text-xs)", marginBottom: "1.5rem" }}>
              <CheckCircle2 size={16} />
              <span>Invitation sent successfully!</span>
            </div>
          )}

          <form onSubmit={handleSendInvite} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.5 }}>
              Invite employees to join your organization's custom bootcamp track. They will receive email setup instructions.
            </p>

            <div className="form-group">
              <label className="form-label">Employee Email</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input required type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} className="input-field" style={{ paddingLeft: "2.25rem" }} />
              </div>
            </div>

            <button disabled={sendingInvite} type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              <span>{sendingInvite ? "Inviting..." : "Send Invite"}</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
