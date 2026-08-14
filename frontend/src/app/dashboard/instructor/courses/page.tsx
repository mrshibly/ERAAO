"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Plus, Trash2, Edit3, Search, AlertCircle, List } from "lucide-react";
import SyllabusBuilder from "@/components/SyllabusBuilder";
import CustomModal from "@/components/CustomModal";

export default function InstructorCoursesPage() {
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
  const [selectedCourseForSyllabus, setSelectedCourseForSyllabus] = useState<{ id: string; slug: string } | null>(null);

  const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/v1/courses/managed?page=1&page_size=100", { headers });
      if (res.ok) {
        const body = await res.json();
        setCourses(body.items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editId ? `/api/v1/courses/${editId}` : "/api/v1/courses";
      const method = editId ? "PATCH" : "POST";
      
      // Enforce status to draft for instructors
      const payload = {
        ...courseForm,
        status: "draft"
      };

      const res = await fetch(url, { method, headers, body: JSON.stringify(payload) });
      if (res.ok) {
        showMessage(editId ? "Course saved as draft! Pending admin review." : "Course created as draft! Pending admin review.");
        setCourseForm({ title: "", slug: "", description: "", short_description: "", price: 99.0, level: "beginner", duration_hours: 10, status: "draft" });
        setEditId(null);
        fetchCourses();
      } else {
        const err = await res.json();
        showMessage(err.detail || "Operation failed.", "error");
      }
    } catch {
      showMessage("Error connecting to server.", "error");
    }
  };

  const handleEdit = (course: any) => {
    setEditId(course.id);
    setCourseForm({
      title: course.title, slug: course.slug, description: course.description || "",
      short_description: course.short_description || "", price: course.price,
      level: course.level, duration_hours: course.duration_hours || 10,
      status: "draft"
    });
  };

  const handleDelete = (id: string) => {
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Delete Course Draft",
      message: "Are you sure you want to delete this course draft?",
      confirmText: "Delete Draft",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/v1/courses/${id}`, { method: "DELETE", headers });
          if (res.ok) {
            showMessage("Course deleted.");
            fetchCourses();
          } else {
            showMessage("Failed to delete course.", "error");
          }
        } catch {
          showMessage("Error connecting to server.", "error");
        }
      }
    });
  };

  const filtered = courses.filter(c =>
    (c.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.slug || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <BookOpen size={24} style={{ color: "var(--accent-violet)" }} /> Course Workspace
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "var(--text-sm)" }}>Submit courses and curriculum designs. Content will be saved as draft pending administrator approval.</p>
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
        {/* Course List */}
        <div style={{ gridColumn: "span 2" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>My Direct Courses ({filtered.length})</h2>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text" placeholder="Search courses..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: "2.25rem", width: "220px" }}
              />
            </div>
          </div>

          {fetching ? (
            <div className="loading-container" style={{ padding: "3rem 0" }}>Loading courses...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state card" style={{ padding: "4rem 2rem" }}>
              <BookOpen size={40} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
              <p className="empty-text">No courses created yet.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {filtered.map((course) => (
                <div key={course.id} className="card" style={{
                  border: editId === course.id ? "2px solid var(--accent-violet)" : "1px solid var(--border-color)",
                  padding: "1.25rem"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.4rem" }}>
                        <span className="badge badge-violet">{course.level}</span>
                        <span className={`badge ${course.status === "published" ? "badge-green" : "badge-amber"}`}>{course.status.toUpperCase()}</span>
                      </div>
                      <h4 style={{ fontWeight: 700, fontSize: "var(--text-base)", color: "var(--text-primary)" }}>{course.title}</h4>
                      <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", marginTop: "0.15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{course.short_description || "No description"}</p>
                      <p style={{ fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--text-primary)", marginTop: "0.4rem" }}>
                        ৳{course.price} BDT &bull; {course.duration_hours || 0}h
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.25rem", flexShrink: 0, marginLeft: "1rem" }}>
                      <Link
                        href={`/dashboard/instructor/courses/builder/${course.id}`}
                        className="btn btn-outline"
                        style={{
                          padding: "0.35rem 0.75rem",
                          fontSize: "var(--text-xs)"
                        }}
                        title="Open Syllabus Studio"
                      >
                        <List size={14} /> <span>Syllabus Studio</span>
                      </Link>
                      <button onClick={() => handleEdit(course)} style={{ color: "var(--accent-violet)", padding: "0.4rem", background: "transparent", border: "none", cursor: "pointer" }} title="Edit">
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

        {/* Create/Edit Form */}
        <div className="card" style={{ padding: "1.75rem", height: "fit-content" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(139, 92, 246, 0.05)", border: "1px solid rgba(139, 92, 246, 0.15)", borderRadius: "var(--radius-md)", padding: "0.75rem", marginBottom: "1.5rem", fontSize: "var(--text-xs)", color: "var(--accent-violet)" }}>
            <AlertCircle size={16} />
            <span>Note: New and edited courses require administrative approval before going live.</span>
          </div>

          <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
            <Plus size={18} /> {editId ? "Edit Course Draft" : "Create New Course Draft"}
          </h2>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Course Title *</label>
              <input type="text" required value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} className="input-field" />
            </div>
            <div className="form-group">
              <label className="form-label">URL Slug *</label>
              <input type="text" required value={courseForm.slug} placeholder="e.g. offensive-security-basics" onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })} className="input-field" />
            </div>
            <div className="form-group">
              <label className="form-label">Short Summary *</label>
              <input type="text" required value={courseForm.short_description} onChange={(e) => setCourseForm({ ...courseForm, short_description: e.target.value })} className="input-field" />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea value={courseForm.description} rows={3} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} className="input-field" style={{ resize: "vertical" }} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Price (BDT) *</label>
                <input type="number" required value={courseForm.price} onChange={(e) => setCourseForm({ ...courseForm, price: parseFloat(e.target.value) })} className="input-field" />
              </div>
              <div className="form-group">
                <label className="form-label">Duration (Hrs) *</label>
                <input type="number" required value={courseForm.duration_hours} onChange={(e) => setCourseForm({ ...courseForm, duration_hours: parseFloat(e.target.value) })} className="input-field" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Level</label>
              <select value={courseForm.level} onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })} className="input-field">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
              <button type="submit" className="btn btn-accent" style={{ flex: 1 }}>
                {editId ? "Save Changes" : "Submit Draft"}
              </button>
              {editId && (
                <button type="button" className="btn btn-outline" onClick={() => { setEditId(null); setCourseForm({ title: "", slug: "", description: "", short_description: "", price: 99.0, level: "beginner", duration_hours: 10, status: "draft" }); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {selectedCourseForSyllabus && (
        <SyllabusBuilder
          courseId={selectedCourseForSyllabus.id}
          courseSlug={selectedCourseForSyllabus.slug}
          token={token || ""}
          onClose={() => setSelectedCourseForSyllabus(null)}
        />
      )}

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
