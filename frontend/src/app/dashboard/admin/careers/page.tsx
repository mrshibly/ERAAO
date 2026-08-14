"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Layers, Trash2, Search } from "lucide-react";
import CustomModal from "@/components/CustomModal";

export default function AdminCareersPage() {
  const { token } = useAuth();
  const [careers, setCareers] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [careerForm, setCareerForm] = useState({ title: "", slug: "", department: "", location: "", type: "Full-Time", description: "", requirements: "", status: "draft" });

  const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchCareers = async () => {
    try {
      const res = await fetch("/api/v1/careers", { headers });
      if (res.ok) {
        setCareers(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/careers", { method: "POST", headers, body: JSON.stringify(careerForm) });
      if (res.ok) {
        showMessage("Job posting created successfully!");
        setCareerForm({ title: "", slug: "", department: "", location: "", type: "Full-Time", description: "", requirements: "", status: "draft" });
        fetchCareers();
      } else {
        const err = await res.json();
        showMessage(err.detail || "Failed to create job posting.", "error");
      }
    } catch {
      showMessage("Error connecting to server.", "error");
    }
  };

  const confirmDeleteJob = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/careers/${id}`, { method: "DELETE", headers });
      if (res.ok) {
        showMessage("Job posting deleted.");
        setSelectedJobId(null);
        setApplications([]);
        fetchCareers();
      } else {
        showMessage("Failed to delete job posting.", "error");
      }
    } catch {
      showMessage("Error connecting to server.", "error");
    } finally {
      setDeleteTargetId(null);
    }
  };

  const handleViewApplications = async (jobId: string) => {
    setSelectedJobId(jobId);
    try {
      const res = await fetch(`/api/v1/careers/${jobId}/applications`, { headers });
      if (res.ok) {
        setApplications(await res.json());
      } else {
        showMessage("Failed to fetch applications.", "error");
      }
    } catch {
      showMessage("Error connecting to server.", "error");
    }
  };

  const filtered = careers.filter(job =>
    (job.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.department || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.location || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <Layers size={24} style={{ color: "var(--accent-blue)" }} /> Careers CMS
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "var(--text-sm)" }}>Review open roles, post new positions, and view applicant details</p>
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
            <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>Careers Openings ({filtered.length})</h2>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text" placeholder="Search positions..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: "2.25rem", width: "220px" }}
              />
            </div>
          </div>

          {fetching ? (
            <div className="loading-container" style={{ padding: "3rem 0" }}>Loading jobs...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state card" style={{ padding: "3rem 0" }}>No jobs listed.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {filtered.map((job) => (
                <div key={job.id} className="card" style={{ border: selectedJobId === job.id ? "2px solid var(--accent-blue)" : "1px solid var(--border-color)", padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.4rem" }}>
                        <span className="badge badge-teal">{job.department}</span>
                        <span className="badge">{job.type}</span>
                        <span className={`badge ${job.status === "open" ? "badge-green" : "badge-amber"}`}>{job.status.toUpperCase()}</span>
                      </div>
                      <h4 style={{ fontWeight: 700, fontSize: "var(--text-base)", color: "var(--text-primary)" }}>{job.title}</h4>
                      <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", marginTop: "0.15rem" }}>{job.location}</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0, marginLeft: "1rem" }}>
                      <button onClick={() => handleViewApplications(job.id)} className="btn btn-outline" style={{ fontSize: "var(--text-xs)", padding: "0.35rem 0.75rem" }}>
                        Applicants
                      </button>
                      <button onClick={() => setDeleteTargetId(job.id)} style={{ color: "var(--color-error)", padding: "0.4rem", background: "transparent", border: "none", cursor: "pointer" }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create/Applicants Panel */}
        <div className="card" style={{ padding: "1.75rem", height: "fit-content" }}>
          {selectedJobId ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>Applicants list</h2>
                <button onClick={() => setSelectedJobId(null)} className="btn btn-outline" style={{ padding: "0.35rem 0.75rem", fontSize: "var(--text-xs)" }}>
                  Back to Form
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {applications.length === 0 ? (
                  <div className="empty-state" style={{ padding: "2rem 0", fontSize: "var(--text-xs)" }}>No applications received yet.</div>
                ) : (
                  applications.map((app) => (
                    <div key={app.id} className="card" style={{ padding: "1rem" }}>
                      <div style={{ fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>{app.name}</div>
                      <div style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)" }}>{app.email}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem", fontSize: "var(--text-xs)" }}>
                        <span style={{ fontWeight: 600, color: "var(--accent-blue)" }}>Status: {app.status}</span>
                        {app.resume_url && (
                          <a href={app.resume_url} target="_blank" rel="noreferrer" style={{ color: "var(--accent-teal)", textDecoration: "underline", fontWeight: 600 }}>
                            View Resume
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "1.25rem", color: "var(--text-primary)" }}>Create Job Posting</h2>
              <form onSubmit={handleCreateJob} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Job Title *</label>
                  <input type="text" required value={careerForm.title} onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })} className="input-field" />
                </div>
                <div className="form-group">
                  <label className="form-label">Slug *</label>
                  <input type="text" required value={careerForm.slug} placeholder="e.g. senior-security-consultant" onChange={(e) => setCareerForm({ ...careerForm, slug: e.target.value })} className="input-field" />
                </div>
                <div className="form-group">
                  <label className="form-label">Department *</label>
                  <input type="text" required value={careerForm.department} placeholder="e.g. Academy Operations" onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })} className="input-field" />
                </div>
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input type="text" required value={careerForm.location} placeholder="e.g. Dhaka, Bangladesh / Remote" onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })} className="input-field" />
                </div>
                <div className="form-group">
                  <label className="form-label">Job Type</label>
                  <select value={careerForm.type} onChange={(e) => setCareerForm({ ...careerForm, type: e.target.value })} className="input-field">
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea required value={careerForm.description} rows={4} onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })} className="input-field" style={{ resize: "vertical" }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select value={careerForm.status} onChange={(e) => setCareerForm({ ...careerForm, status: e.target.value })} className="input-field">
                    <option value="draft">Draft</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-accent" style={{ width: "100%", marginTop: "0.5rem" }}>
                  Add Job Posting
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <CustomModal
        isOpen={Boolean(deleteTargetId)}
        type="danger"
        title="Delete Job Posting"
        message="Are you sure you want to delete this job posting? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => deleteTargetId && confirmDeleteJob(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
