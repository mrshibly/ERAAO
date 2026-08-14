"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Trash2, Edit3, Search, List } from "lucide-react";
import CustomModal from "@/components/CustomModal";

export default function AdminCoursesPage() {
  const { token } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
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
  const [courseForm, setCourseForm] = useState({
    title: "", slug: "", description: "", short_description: "", price: 99.0, level: "beginner", duration_hours: 10, status: "draft"
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/v1/courses/managed?page=1&page_size=100", { headers });
      if (res.ok) { const body = await res.json(); setCourses(body.items || []); }
    } catch (err) { console.error(err); }
    finally { setFetching(false); }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editId ? `/api/v1/courses/${editId}` : "/api/v1/courses";
      const method = editId ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers, body: JSON.stringify(courseForm) });
      if (res.ok) {
        showMessage(editId ? "Course updated successfully!" : "Course created successfully!");
        setCourseForm({ title: "", slug: "", description: "", short_description: "", price: 99.0, level: "beginner", duration_hours: 10, status: "draft" });
        setEditId(null);
        fetchCourses();
      } else {
        const err = await res.json();
        showMessage(err.detail || "Operation failed.", "error");
      }
    } catch { showMessage("Error connecting to server.", "error"); }
  };

  const handleEdit = (course: any) => {
    setEditId(course.id);
    setCourseForm({
      title: course.title, slug: course.slug, description: course.description || "",
      short_description: course.short_description || "", price: course.price,
      level: course.level, duration_hours: course.duration_hours || 10,
      status: course.status
    });
  };

  const handleDelete = (id: string) => {
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Delete Course Track",
      message: "Are you sure you want to delete this course and all its syllabus modules?",
      confirmText: "Delete Course",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/v1/courses/${id}`, { method: "DELETE", headers });
          if (res.ok) { showMessage("Course deleted."); fetchCourses(); }
          else showMessage("Failed to delete course.", "error");
        } catch { showMessage("Error connecting to server.", "error"); }
      }
    });
  };

  const handleApprove = (id: string) => {
    setModalConfig({
      isOpen: true,
      type: "confirm",
      title: "Publish Course Track",
      message: "Approve and publish this course to the public directory?",
      confirmText: "Publish Course",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/v1/courses/${id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ status: "published" })
          });
          if (res.ok) {
            showMessage("Course published successfully!");
            fetchCourses();
          } else {
            const err = await res.json().catch(() => ({}));
            showMessage(err.detail || err.error?.message || "Failed to publish course.", "error");
          }
        } catch { showMessage("Error connecting to server.", "error"); }
      }
    });
  };

  const pendingCount = courses.filter(c => c.status === "draft").length;

  const filtered = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.slug.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeTab === "pending") return c.status === "draft";
    if (activeTab === "published") return c.status === "published";
    return true;
  });

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <BookOpen size={24} style={{ color: "var(--accent-blue)" }} /> Course Manager
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "var(--text-sm)" }}>Create, edit, and approve courses submitted by instructors</p>
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

      {/* Tab Selector */}
      <div className="filter-pills" style={{ marginBottom: "1.5rem" }}>
        {[
          { id: "all", label: "All Courses", count: courses.length },
          { id: "pending", label: "Pending Approval", count: pendingCount },
          { id: "published", label: "Published", count: courses.filter(c => c.status === "published").length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`filter-pill ${activeTab === tab.id ? "active" : ""}`}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <span>{tab.label}</span>
            <span style={{
              fontSize: "10px",
              background: tab.id === "pending" && tab.count > 0 ? "var(--color-error)" : "var(--bg-secondary)",
              color: tab.id === "pending" && tab.count > 0 ? "white" : "var(--text-secondary)",
              padding: "0.1rem 0.4rem",
              borderRadius: "10px",
              fontWeight: 700
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
        {/* Course List */}
        <div style={{ gridColumn: "span 2" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>Course Directory ({filtered.length})</h2>
            <div style={{ position: "relative", width: "100%", maxWidth: "220px" }}>
              <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text" placeholder="Search courses..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: "2.25rem" }}
              />
            </div>
          </div>

          {fetching ? (
            <div className="loading-container" style={{ padding: "3rem 0" }}>Loading courses...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state card" style={{ padding: "4rem 2rem" }}>
              <BookOpen size={40} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
              <p className="empty-text">No courses found.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {filtered.map((course) => (
                <div key={course.id} className="card" style={{
                  border: editId === course.id ? "2px solid var(--accent-blue)" : "1px solid var(--border-color)",
                  padding: "1.25rem"
                }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                    <div style={{ flex: 1, minWidth: "200px" }}>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.4rem" }}>
                        <span className="badge badge-blue">{course.level}</span>
                        <span className={`badge ${course.status === "published" ? "badge-green" : "badge-amber"}`}>{course.status.toUpperCase()}</span>
                      </div>
                      <h4 style={{ fontWeight: 700, fontSize: "var(--text-base)", color: "var(--text-primary)" }}>{course.title}</h4>
                      <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", marginTop: "0.15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{course.short_description || "No description"}</p>
                      <p style={{ fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--text-primary)", marginTop: "0.4rem" }}>
                        ৳{course.price} BDT &bull; {course.duration_hours || 0}h
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                      {course.status === "draft" && (
                        <button onClick={() => handleApprove(course.id)} className="btn btn-primary" style={{ padding: "0.3rem 0.6rem", fontSize: "var(--text-xs)", background: "var(--color-success)" }}>
                          Approve
                        </button>
                      )}
                      <Link
                        href={`/dashboard/admin/courses/builder/${course.id}`}
                        className="btn btn-outline"
                        style={{
                          padding: "0.35rem 0.75rem",
                          fontSize: "var(--text-xs)"
                        }}
                        title="Open Syllabus Studio"
                      >
                        <List size={14} /> <span>Syllabus Studio</span>
                      </Link>
                      <button onClick={() => handleEdit(course)} style={{ color: "var(--accent-blue)", padding: "0.4rem", background: "transparent", border: "none", cursor: "pointer" }} title="Edit">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDelete(course.id)} style={{ color: "var(--color-error)", padding: "0.4rem", background: "transparent", border: "none", cursor: "pointer" }} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create/Edit Course Form */}
        <div className="card" style={{ padding: "1.5rem", height: "fit-content" }}>
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>{editId ? "Edit Course" : "Add New Course"}</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Course Title</label>
              <input
                type="text" required
                value={courseForm.title}
                onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label className="form-label">URL Slug</label>
              <input
                type="text" required
                value={courseForm.slug}
                onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Short Tagline</label>
              <input
                type="text"
                value={courseForm.short_description}
                onChange={(e) => setCourseForm({ ...courseForm, short_description: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Full Description</label>
              <textarea
                rows={3}
                value={courseForm.description}
                onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                className="input-field"
                style={{ resize: "vertical" }}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Price (BDT)</label>
                <input
                  type="number" required
                  value={courseForm.price}
                  onChange={(e) => setCourseForm({ ...courseForm, price: parseFloat(e.target.value) || 0 })}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Difficulty Level</label>
                <select
                  value={courseForm.level}
                  onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                  className="input-field"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Publishing Status</label>
              <select
                value={courseForm.status}
                onChange={(e) => setCourseForm({ ...courseForm, status: e.target.value })}
                className="input-field"
              >
                <option value="draft">Draft (Private)</option>
                <option value="published">Published (Live)</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              {editId && (
                <button type="button" onClick={() => { setEditId(null); setCourseForm({ title: "", slug: "", description: "", short_description: "", price: 99.0, level: "beginner", duration_hours: 10, status: "draft" }); }} className="btn btn-outline">
                  Cancel
                </button>
              )}
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                {editId ? "Update Course" : "Create Course"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <CustomModal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        onConfirm={modalConfig.onConfirm}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
