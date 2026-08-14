"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Database, Plus, Trash2, Search } from "lucide-react";
import CustomModal from "@/components/CustomModal";

export default function AdminCohortsPage() {
  const { token } = useAuth();
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [cohortForm, setCohortForm] = useState({ course_id: "", title: "", start_date: "", end_date: "", capacity: 30, instructor_id: "" });

  const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchCohortData = async () => {
    try {
      const cohortsRes = await fetch("/api/v1/cohorts", { headers });
      if (cohortsRes.ok) setCohorts(await cohortsRes.json());

      const coursesRes = await fetch("/api/v1/courses?page=1&page_size=100", { headers });
      if (coursesRes.ok) {
        const body = await coursesRes.json();
        setCourses(body.items || []);
      }

      const usersRes = await fetch("/api/v1/users?page=1&page_size=100", { headers });
      if (usersRes.ok) {
        const body = await usersRes.json();
        setUsers(body.items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCohortData();
  }, []);

  const handleCreateCohort = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/cohorts", { method: "POST", headers, body: JSON.stringify(cohortForm) });
      if (res.ok) {
        showMessage("Cohort created successfully!");
        setCohortForm({ course_id: "", title: "", start_date: "", end_date: "", capacity: 30, instructor_id: "" });
        fetchCohortData();
      } else {
        const err = await res.json();
        showMessage(err.detail || "Failed to create cohort.", "error");
      }
    } catch {
      showMessage("Error connecting to server.", "error");
    }
  };

  const confirmDeleteCohort = async (cohortId: string) => {
    try {
      const res = await fetch(`/api/v1/cohorts/${cohortId}`, { method: "DELETE", headers });
      if (res.ok) {
        showMessage("Cohort deleted successfully.");
        fetchCohortData();
      } else {
        showMessage("Failed to delete cohort.", "error");
      }
    } catch {
      showMessage("Error connecting to server.", "error");
    } finally {
      setDeleteTargetId(null);
    }
  };

  const filtered = cohorts.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <Database size={24} style={{ color: "var(--accent-blue)" }} /> Cohort Manager
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "var(--text-sm)" }}>Organize student groups, assign instructors, and set schedule dates for active bootcamps</p>
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
        {/* Listing */}
        <div style={{ gridColumn: "span 2" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>Active Cohorts ({filtered.length})</h2>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text" placeholder="Search cohorts..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: "2.25rem", width: "220px" }}
              />
            </div>
          </div>

          {fetching ? (
            <div className="loading-container" style={{ padding: "3rem 0" }}>Loading cohorts...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state card" style={{ padding: "3rem 0" }}>No cohorts created.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {filtered.map((cohort) => (
                <div key={cohort.id} className="card" style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.4rem" }}>
                        <span className="badge badge-blue">
                          Capacity: {cohort.capacity} Students Max
                        </span>
                      </div>
                      <h4 style={{ fontWeight: 700, fontSize: "var(--text-base)", color: "var(--text-primary)" }}>{cohort.title}</h4>
                      <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                        Course ID: {cohort.course_id}
                      </p>
                      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 500 }}>
                        <span>Start: {new Date(cohort.start_date).toLocaleDateString()}</span>
                        <span>End: {new Date(cohort.end_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button onClick={() => setDeleteTargetId(cohort.id)} style={{ color: "var(--color-error)", padding: "0.4rem", background: "transparent", border: "none", cursor: "pointer", marginLeft: "1rem" }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="card" style={{ padding: "1.75rem", height: "fit-content" }}>
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
            <Plus size={18} /> Deploy Cohort Batch
          </h2>
          <form onSubmit={handleCreateCohort} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Select Course Track *</label>
              <select 
                required 
                value={cohortForm.course_id} 
                onChange={(e) => setCohortForm({ ...cohortForm, course_id: e.target.value })}
                className="input-field"
              >
                <option value="">-- Select Course --</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Select Assigned Instructor *</label>
              <select 
                required 
                value={cohortForm.instructor_id} 
                onChange={(e) => setCohortForm({ ...cohortForm, instructor_id: e.target.value })}
                className="input-field"
              >
                <option value="">-- Select Instructor --</option>
                {users.filter((u: any) => u.roles?.includes("instructor") || u.roles?.includes("admin")).map((user) => (
                  <option key={user.id} value={user.id}>{user.full_name} ({user.email})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Cohort Title *</label>
              <input type="text" required placeholder="e.g. Cohort Alpha 2026" value={cohortForm.title} onChange={(e) => setCohortForm({ ...cohortForm, title: e.target.value })} className="input-field" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Start Date *</label>
                <input type="date" required value={cohortForm.start_date} onChange={(e) => setCohortForm({ ...cohortForm, start_date: e.target.value })} className="input-field" />
              </div>
              <div className="form-group">
                <label className="form-label">End Date *</label>
                <input type="date" required value={cohortForm.end_date} onChange={(e) => setCohortForm({ ...cohortForm, end_date: e.target.value })} className="input-field" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Capacity *</label>
              <input type="number" required value={cohortForm.capacity} onChange={(e) => setCohortForm({ ...cohortForm, capacity: parseInt(e.target.value) })} className="input-field" />
            </div>
            <button type="submit" className="btn btn-accent" style={{ width: "100%", marginTop: "0.5rem" }}>
              Deploy Cohort Batch
            </button>
          </form>
        </div>
      </div>

      <CustomModal
        isOpen={Boolean(deleteTargetId)}
        type="danger"
        title="Delete Cohort"
        message="Are you sure you want to delete this cohort? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => deleteTargetId && confirmDeleteCohort(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
