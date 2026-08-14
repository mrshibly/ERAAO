"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, History } from "lucide-react";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [metrics, setMetrics] = useState({ 
    total_users: 0, 
    total_courses: 0, 
    total_enrollments: 0, 
    total_revenue: 0.0, 
    total_bookings: 0 
  });
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  const headers = { 
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const fetchDashboardData = async () => {
    if (!token) return;
    setFetching(true);
    try {
      const metricsRes = await fetch("/api/v1/dashboard/admin/metrics", { headers });
      if (metricsRes.ok) setMetrics(await metricsRes.json());

      const logsRes = await fetch("/api/v1/dashboard/admin/audit-logs?page=1&page_size=25", { headers });
      if (logsRes.ok) {
        const body = await logsRes.json();
        setAuditLogs(body.items || []);
      }
    } catch (err) {
      console.error("Dashboard hydration error:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  if (fetching) {
    return (
      <div className="loading-container" style={{ padding: "8rem 0" }}>
        <p>Loading secure operations workspace...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Banner */}
      <div className="card" style={{ padding: "2.5rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-violet)" }}>
          <ShieldCheck size={20} />
          <span style={{ fontWeight: 600, fontSize: "var(--text-xs)", textTransform: "uppercase" }}>Security Operations (SecOps)</span>
        </div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-primary)" }}>Platform Operations Center</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)" }}>Interactive administrative overrides and audit log monitoring</p>
      </div>

      {/* Metrics Cards */}
      <div className="card-grid" style={{ marginBottom: "3rem" }}>
        <div className="stat-card">
          <div className="stat-label">Total Users</div>
          <div className="stat-value">{metrics.total_users}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Courses</div>
          <div className="stat-value" style={{ color: "var(--accent-blue)" }}>{metrics.total_courses}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Enrollments</div>
          <div className="stat-value" style={{ color: "var(--accent-teal)" }}>{metrics.total_enrollments}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Consultations</div>
          <div className="stat-value" style={{ color: "var(--accent-violet)" }}>{metrics.total_bookings}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value" style={{ color: "var(--color-success)" }}>
            ৳{metrics.total_revenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} BDT
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div>
        <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <History size={22} style={{ color: "var(--text-primary)" }} /> Audit log stream
        </h2>
        <div className="table-container">
          {auditLogs.length === 0 ? (
            <div className="empty-state">
              <p>No operations logs recorded yet.</p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "var(--text-sm)" }}>
              <thead>
                <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)", color: "var(--text-secondary)", fontWeight: 600 }}>
                  <th style={{ padding: "1rem" }}>Timestamp</th>
                  <th style={{ padding: "1rem" }}>Action</th>
                  <th style={{ padding: "1rem" }}>Actor ID</th>
                  <th style={{ padding: "1rem" }}>Resource Type</th>
                  <th style={{ padding: "1rem" }}>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: "1px solid var(--border-color)", fontFamily: "monospace" }}>
                    <td style={{ padding: "1rem" }}>{new Date(log.timestamp).toLocaleString()}</td>
                    <td style={{ padding: "1rem", color: "var(--accent-blue)", fontWeight: 600 }}>{log.action}</td>
                    <td style={{ padding: "1rem" }}>{log.actor_id || "System"}</td>
                    <td style={{ padding: "1rem" }}>{log.resource_type}</td>
                    <td style={{ padding: "1rem" }}>{log.ip_address || "127.0.0.1"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
