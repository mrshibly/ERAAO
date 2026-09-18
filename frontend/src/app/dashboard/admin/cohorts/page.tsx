"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Database, Plus, Trash2, Search, Edit3, Video,
  Calendar, Clock, Megaphone, Key, ExternalLink, Users, BookOpen
} from "lucide-react";
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

  // Edit modal state
  const [editingCohort, setEditingCohort] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    capacity: 30,
    meeting_url: "",
    meeting_passcode: "",
    schedule_info: "",
    announcement: ""
  });

  const [cohortForm, setCohortForm] = useState({
    course_id: "",
    title: "",
    start_date: "",
    end_date: "",
    capacity: 30,
    instructor_id: "",
    meeting_url: "",
    meeting_passcode: "",
    schedule_info: "",
    announcement: ""
  });

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
      const res = await fetch("/api/v1/cohorts", {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...cohortForm,
          meeting_url: cohortForm.meeting_url.trim() || undefined,
          meeting_passcode: cohortForm.meeting_passcode.trim() || undefined,
          schedule_info: cohortForm.schedule_info.trim() || undefined,
          announcement: cohortForm.announcement.trim() || undefined
        })
      });
      if (res.ok) {
        showMessage("Cohort created successfully!");
        setCohortForm({
          course_id: "",
          title: "",
          start_date: "",
          end_date: "",
          capacity: 30,
          instructor_id: "",
          meeting_url: "",
          meeting_passcode: "",
          schedule_info: "",
          announcement: ""
        });
        fetchCohortData();
      } else {
        const err = await res.json();
        showMessage(err.detail || "Failed to create cohort.", "error");
      }
    } catch {
      showMessage("Error connecting to server.", "error");
    }
  };

  const openEditModal = (cohort: any) => {
    setEditingCohort(cohort);
    setEditForm({
      title: cohort.title || "",
      capacity: cohort.capacity || 30,
      meeting_url: cohort.meeting_url || "",
      meeting_passcode: cohort.meeting_passcode || "",
      schedule_info: cohort.schedule_info || "",
      announcement: cohort.announcement || ""
    });
  };

  const handleUpdateCohort = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCohort) return;
    try {
      const res = await fetch(`/api/v1/cohorts/${editingCohort.id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        showMessage("Cohort updated successfully!");
        setEditingCohort(null);
        fetchCohortData();
      } else {
        const err = await res.json();
        showMessage(err.detail || "Failed to update cohort.", "error");
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

  const getCourseTitle = (courseId: string) => {
    const found = courses.find(c => c.id === courseId);
    return found ? found.title : courseId;
  };

  const getInstructorName = (instructorId: string) => {
    const found = users.find(u => u.id === instructorId);
    return found ? found.full_name || found.email : "Unassigned";
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <Database size={24} style={{ color: "var(--accent-blue)" }} /> Cohort Manager
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "var(--text-sm)" }}>
          Organize student groups, assign instructors, configure live class rooms, and broadcast cohort announcements
        </p>
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
            <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>
              Active Cohorts ({filtered.length})
            </h2>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {filtered.map((cohort) => (
                <div key={cohort.id} className="card" style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                        <span className="badge badge-blue" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Users size={12} /> Capacity: {cohort.capacity} Students Max
                        </span>
                        <span className="badge badge-purple" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <BookOpen size={12} /> {getCourseTitle(cohort.course_id)}
                        </span>
                      </div>
                      <h4 style={{ fontWeight: 700, fontSize: "var(--text-base)", color: "var(--text-primary)" }}>{cohort.title}</h4>
                      <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                        Instructor: <strong>{getInstructorName(cohort.instructor_id)}</strong>
                      </p>
                      
                      <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 500, flexWrap: "wrap" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Calendar size={13} /> Start: {new Date(cohort.start_date).toLocaleDateString()}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Calendar size={13} /> End: {new Date(cohort.end_date).toLocaleDateString()}
                        </span>
                        {cohort.schedule_info && (
                          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--accent-blue)", fontWeight: 600 }}>
                            <Clock size={13} /> {cohort.schedule_info}
                          </span>
                        )}
                      </div>

                      {/* Live Meeting Room Link & Notice */}
                      {cohort.meeting_url && (
                        <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                          <a
                            href={cohort.meeting_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-sm"
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.78rem", padding: "0.3rem 0.75rem" }}
                          >
                            <Video size={13} style={{ color: "var(--accent-blue)" }} />
                            <span>Join Live Classroom</span>
                            <ExternalLink size={11} />
                          </a>
                          {cohort.meeting_passcode && (
                            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                              <Key size={12} /> Passcode: <code>{cohort.meeting_passcode}</code>
                            </span>
                          )}
                        </div>
                      )}

                      {/* Announcement banner */}
                      {cohort.announcement && (
                        <div style={{
                          marginTop: "0.75rem",
                          padding: "0.6rem 0.85rem",
                          background: "rgba(14, 165, 233, 0.06)",
                          borderLeft: "3px solid var(--accent-blue)",
                          borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                          fontSize: "var(--text-xs)",
                          color: "var(--text-primary)",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem"
                        }}>
                          <Megaphone size={14} style={{ color: "var(--accent-blue)", flexShrink: 0, marginTop: "2px" }} />
                          <div>
                            <strong style={{ color: "var(--accent-blue)" }}>Announcement: </strong>
                            <span>{cohort.announcement}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                      <button
                        onClick={() => openEditModal(cohort)}
                        style={{ color: "var(--text-secondary)", padding: "0.45rem", background: "rgba(255, 255, 255, 0.05)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", cursor: "pointer" }}
                        title="Edit Cohort"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(cohort.id)}
                        style={{ color: "var(--color-error)", padding: "0.45rem", background: "rgba(239, 68, 68, 0.08)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(239, 68, 68, 0.2)", cursor: "pointer" }}
                        title="Delete Cohort"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
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
                <option value="">Select Course Track</option>
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
                <option value="">Select Instructor</option>
                {users.filter((u: any) => u.roles?.includes("instructor") || u.roles?.includes("admin")).map((user) => (
                  <option key={user.id} value={user.id}>{user.full_name} ({user.email})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Cohort Title *</label>
              <input
                type="text"
                required
                placeholder="Cohort Alpha 2026"
                value={cohortForm.title}
                onChange={(e) => setCohortForm({ ...cohortForm, title: e.target.value })}
                className="input-field"
              />
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
              <label className="form-label">Student Capacity *</label>
              <input type="number" required value={cohortForm.capacity} onChange={(e) => setCohortForm({ ...cohortForm, capacity: parseInt(e.target.value) })} className="input-field" />
            </div>
            <div className="form-group">
              <label className="form-label">Live Meeting URL (Zoom / Google Meet)</label>
              <input
                type="url"
                placeholder="https://meet.google.com/xyz or https://zoom.us/j/..."
                value={cohortForm.meeting_url}
                onChange={(e) => setCohortForm({ ...cohortForm, meeting_url: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Meeting Passcode (Optional)</label>
              <input
                type="text"
                placeholder="Passcode or PIN if required"
                value={cohortForm.meeting_passcode}
                onChange={(e) => setCohortForm({ ...cohortForm, meeting_passcode: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Weekly Schedule</label>
              <input
                type="text"
                placeholder="e.g. Every Saturday and Tuesday at 8:00 PM GMT+6"
                value={cohortForm.schedule_info}
                onChange={(e) => setCohortForm({ ...cohortForm, schedule_info: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Welcome Notice / Announcement</label>
              <textarea
                rows={2}
                placeholder="Instructions or orientation reminder for enrolled students"
                value={cohortForm.announcement}
                onChange={(e) => setCohortForm({ ...cohortForm, announcement: e.target.value })}
                className="input-field"
                style={{ resize: "vertical" }}
              />
            </div>
            <button type="submit" className="btn btn-accent" style={{ width: "100%", marginTop: "0.5rem" }}>
              Deploy Cohort Batch
            </button>
          </form>
        </div>
      </div>

      {/* Edit Cohort Modal */}
      {editingCohort && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.75)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem"
        }}>
          <div className="card" style={{ maxWidth: "560px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Edit3 size={18} style={{ color: "var(--accent-blue)" }} /> Edit Cohort Settings
              </h3>
              <button
                onClick={() => setEditingCohort(null)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "1.25rem", cursor: "pointer" }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateCohort} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="form-group">
                <label className="form-label">Cohort Title</label>
                <input
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Student Capacity</label>
                <input
                  type="number"
                  required
                  value={editForm.capacity}
                  onChange={(e) => setEditForm({ ...editForm, capacity: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Live Meeting URL (Zoom / Google Meet)</label>
                <input
                  type="url"
                  placeholder="https://meet.google.com/..."
                  value={editForm.meeting_url}
                  onChange={(e) => setEditForm({ ...editForm, meeting_url: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Meeting Passcode</label>
                <input
                  type="text"
                  placeholder="Passcode or PIN"
                  value={editForm.meeting_passcode}
                  onChange={(e) => setEditForm({ ...editForm, meeting_passcode: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Weekly Schedule</label>
                <input
                  type="text"
                  placeholder="e.g. Every Saturday and Tuesday at 8:00 PM GMT+6"
                  value={editForm.schedule_info}
                  onChange={(e) => setEditForm({ ...editForm, schedule_info: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Cohort Announcement</label>
                <textarea
                  rows={3}
                  placeholder="Important message or update broadcast to all students in this cohort"
                  value={editForm.announcement}
                  onChange={(e) => setEditForm({ ...editForm, announcement: e.target.value })}
                  className="input-field"
                  style={{ resize: "vertical" }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setEditingCohort(null)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-accent btn-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

