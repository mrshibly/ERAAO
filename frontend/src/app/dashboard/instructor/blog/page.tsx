"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FileText, Plus, Trash2, Edit3, Search, AlertCircle } from "lucide-react";
import CustomModal from "@/components/CustomModal";

export default function InstructorBlogPage() {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  
  const [blogForm, setBlogForm] = useState({ title: "", slug: "", content: "", excerpt: "", status: "draft" });
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/v1/blog/managed?page=1&page_size=100", { headers });
      if (res.ok) {
        const body = await res.json();
        setBlogs(body.items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editId ? `/api/v1/blog/${editId}` : "/api/v1/blog";
      const method = editId ? "PATCH" : "POST";
      
      // Enforce status to draft for instructors
      const payload = {
        ...blogForm,
        status: "draft"
      };

      const res = await fetch(url, { method, headers, body: JSON.stringify(payload) });
      if (res.ok) {
        showMessage(editId ? "Article saved as draft! Pending admin review." : "Article submitted as draft! Pending admin review.");
        setBlogForm({ title: "", slug: "", content: "", excerpt: "", status: "draft" });
        setEditId(null);
        fetchBlogs();
      } else {
        const err = await res.json();
        showMessage(err.detail || "Operation failed.", "error");
      }
    } catch {
      showMessage("Error connecting to server.", "error");
    }
  };

  const handleEdit = (post: any) => {
    setEditId(post.id);
    setBlogForm({
      title: post.title,
      slug: post.slug,
      content: post.content || "",
      excerpt: post.excerpt || "",
      status: "draft"
    });
  };

  const confirmDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/blog/${id}`, { method: "DELETE", headers });
      if (res.ok) {
        showMessage("Blog post draft deleted.");
        fetchBlogs();
      } else {
        showMessage("Failed to delete blog post.", "error");
      }
    } catch {
      showMessage("Error connecting to server.", "error");
    } finally {
      setDeleteTargetId(null);
    }
  };

  const filtered = blogs.filter(b =>
    (b.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.slug || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <FileText size={24} style={{ color: "var(--accent-violet)" }} /> Blog Workspace
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "var(--text-sm)" }}>Author articles, news, and technical guidelines. Submission defaults to draft, awaiting admin approval.</p>
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
            <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>My Articles ({filtered.length})</h2>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text" placeholder="Search articles..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: "2.25rem", width: "220px" }}
              />
            </div>
          </div>

          {fetching ? (
            <div className="loading-container" style={{ padding: "3rem 0" }}>Loading articles...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state card" style={{ padding: "4rem 2rem" }}>
              <FileText size={40} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
              <p className="empty-text">No articles authored yet.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {filtered.map((post) => (
                <div key={post.id} className="card" style={{
                  border: editId === post.id ? "2px solid var(--accent-violet)" : "1px solid var(--border-color)",
                  padding: "1.25rem"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.4rem" }}>
                        <span className={`badge ${post.status === "published" ? "badge-green" : "badge-amber"}`}>{post.status?.toUpperCase()}</span>
                      </div>
                      <h4 style={{ fontWeight: 700, fontSize: "var(--text-base)", color: "var(--text-primary)" }}>{post.title}</h4>
                      <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", marginTop: "0.15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.excerpt || "No summary provided."}</p>
                      <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "0.4rem", fontFamily: "monospace" }}>Slug: {post.slug}</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.25rem", flexShrink: 0, marginLeft: "1rem" }}>
                      <button onClick={() => handleEdit(post)} style={{ color: "var(--accent-violet)", padding: "0.4rem", background: "transparent", border: "none", cursor: "pointer" }} title="Edit">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => setDeleteTargetId(post.id)} style={{ color: "var(--color-error)", padding: "0.4rem", background: "transparent", border: "none", cursor: "pointer" }} title="Delete">
                        <Trash2 size={16} />
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(139, 92, 246, 0.05)", border: "1px solid rgba(139, 92, 246, 0.15)", borderRadius: "var(--radius-md)", padding: "0.75rem", marginBottom: "1.5rem", fontSize: "var(--text-xs)", color: "var(--accent-violet)" }}>
            <AlertCircle size={16} />
            <span>Note: Submitted articles will be reviewed by platform administrators before going public.</span>
          </div>

          <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
            <Plus size={18} /> {editId ? "Edit Blog Article" : "Write Blog Article"}
          </h2>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input type="text" required value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} className="input-field" />
            </div>
            <div className="form-group">
              <label className="form-label">Slug *</label>
              <input type="text" required value={blogForm.slug} placeholder="e.g. secure-agent-architectures" onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })} className="input-field" />
            </div>
            <div className="form-group">
              <label className="form-label">Excerpt *</label>
              <input type="text" required value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} className="input-field" />
            </div>
            <div className="form-group">
              <label className="form-label">Content (Markdown) *</label>
              <textarea required value={blogForm.content} rows={6} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} className="input-field" style={{ resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
              <button type="submit" className="btn btn-accent" style={{ flex: 1 }}>
                {editId ? "Save Changes" : "Submit Draft"}
              </button>
              {editId && (
                <button type="button" className="btn btn-outline" onClick={() => { setEditId(null); setBlogForm({ title: "", slug: "", content: "", excerpt: "", status: "draft" }); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <CustomModal
        isOpen={Boolean(deleteTargetId)}
        type="danger"
        title="Delete Blog Draft"
        message="Are you sure you want to delete this blog post draft? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => deleteTargetId && confirmDelete(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
