"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FileText, Trash2, Edit3, Search } from "lucide-react";
import CustomModal from "@/components/CustomModal";

export default function AdminBlogPage() {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState<any[]>([]);
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
  const [blogForm, setBlogForm] = useState({ title: "", slug: "", content: "", excerpt: "", status: "draft" });
  const [editId, setEditId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

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
      const res = await fetch(url, { method, headers, body: JSON.stringify(blogForm) });
      if (res.ok) {
        showMessage(editId ? "Blog post updated successfully!" : "Blog post created successfully!");
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
      status: post.status
    });
  };

  const handleDelete = (id: string) => {
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Delete Blog Post",
      message: "Are you sure you want to delete this blog post?",
      confirmText: "Delete Post",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/v1/blog/${id}`, { method: "DELETE", headers });
          if (res.ok) {
            showMessage("Blog post deleted.");
            fetchBlogs();
          } else {
            showMessage("Failed to delete post.", "error");
          }
        } catch {
          showMessage("Error connecting to server.", "error");
        }
      }
    });
  };

  const handleApprove = (id: string) => {
    setModalConfig({
      isOpen: true,
      type: "confirm",
      title: "Publish Blog Post",
      message: "Approve and publish this blog post to the live website?",
      confirmText: "Publish Post",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/v1/blog/${id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ status: "published" })
          });
          if (res.ok) {
            showMessage("Blog post published successfully!");
            fetchBlogs();
          } else {
            showMessage("Failed to publish blog post.", "error");
          }
        } catch {
          showMessage("Error connecting to server.", "error");
        }
      }
    });
  };

  const pendingCount = blogs.filter(b => b.status === "draft").length;

  const filtered = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.slug.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeTab === "pending") return b.status === "draft";
    if (activeTab === "published") return b.status === "published";
    return true;
  });

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <FileText size={24} style={{ color: "var(--accent-blue)" }} /> Blog Manager
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "var(--text-sm)" }}>Manage articles, news, and approve posts submitted by instructors</p>
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
          { id: "all", label: "All Articles", count: blogs.length },
          { id: "pending", label: "Pending Approval", count: pendingCount },
          { id: "published", label: "Published", count: blogs.filter(b => b.status === "published").length }
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
        {/* Listing */}
        <div style={{ gridColumn: "span 2" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>Blog Articles ({filtered.length})</h2>
            <div style={{ position: "relative", width: "100%", maxWidth: "220px" }}>
              <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text" placeholder="Search articles..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: "2.25rem" }}
              />
            </div>
          </div>

          {fetching ? (
            <div className="loading-container" style={{ padding: "3rem 0" }}>Loading articles...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state card" style={{ padding: "4rem 2rem" }}>
              <FileText size={40} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
              <p className="empty-text">No blog articles found.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {filtered.map((post) => (
                <div key={post.id} className="card" style={{
                  border: editId === post.id ? "2px solid var(--accent-blue)" : "1px solid var(--border-color)",
                  padding: "1.25rem"
                }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                    <div style={{ flex: 1, minWidth: "200px" }}>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.4rem" }}>
                        <span className={`badge ${post.status === "published" ? "badge-green" : "badge-amber"}`}>{post.status.toUpperCase()}</span>
                      </div>
                      <h4 style={{ fontWeight: 700, fontSize: "var(--text-base)", color: "var(--text-primary)" }}>{post.title}</h4>
                      <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", marginTop: "0.15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.excerpt || "No summary provided."}</p>
                      <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "0.4rem", fontFamily: "monospace" }}>Slug: {post.slug}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                      {post.status === "draft" && (
                        <button onClick={() => handleApprove(post.id)} className="btn btn-primary" style={{ padding: "0.3rem 0.6rem", fontSize: "var(--text-xs)", background: "var(--color-success)" }}>
                          Approve
                        </button>
                      )}
                      <button onClick={() => handleEdit(post)} style={{ color: "var(--accent-blue)", padding: "0.4rem", background: "transparent", border: "none", cursor: "pointer" }} title="Edit">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDelete(post.id)} style={{ color: "var(--color-error)", padding: "0.4rem", background: "transparent", border: "none", cursor: "pointer" }} title="Delete">
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
        <div className="card" style={{ padding: "1.5rem", height: "fit-content" }}>
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>{editId ? "Edit Article" : "Write Article"}</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Article Title</label>
              <input
                type="text" required
                value={blogForm.title}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label className="form-label">URL Slug</label>
              <input
                type="text" required
                value={blogForm.slug}
                onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Short Summary Excerpt</label>
              <input
                type="text"
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Markdown Article Body</label>
              <textarea
                rows={6} required
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                className="input-field"
                style={{ resize: "vertical" }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                value={blogForm.status}
                onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                className="input-field"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              {editId && (
                <button type="button" onClick={() => { setEditId(null); setBlogForm({ title: "", slug: "", content: "", excerpt: "", status: "draft" }); }} className="btn btn-outline">
                  Cancel
                </button>
              )}
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                {editId ? "Update Article" : "Save Article"}
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
