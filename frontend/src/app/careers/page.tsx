"use client";

import { useEffect, useState, useMemo } from "react";
import { Briefcase, MapPin, ArrowRight, Loader, Send, CheckCircle2, AlertCircle, Search, X, Building, DollarSign } from "lucide-react";

interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description?: string;
  requirements?: string;
  salary_range?: string;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");

  // Application Modal state
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/v1/careers");
      if (response.ok) {
        setJobs(await response.json());
      }
    } catch (err) {
      console.error("Error loading jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Compute unique departments
  const departments = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach(j => {
      if (j.department) set.add(j.department);
    });
    return Array.from(set);
  }, [jobs]);

  // Client-side filtering
  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      const matchesDept = selectedDept === "all" || j.department?.toLowerCase() === selectedDept.toLowerCase();
      if (!matchesDept) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        j.title?.toLowerCase().includes(q) ||
        j.department?.toLowerCase().includes(q) ||
        j.location?.toLowerCase().includes(q)
      );
    });
  }, [jobs, selectedDept, searchQuery]);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyJob) return;
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/careers/${applyJob.slug}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          cover_letter: coverLetter,
          resume_url: ""
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit application. Please verify your details.");
      }

      setSuccess(true);
      setFullName("");
      setEmail("");
      setCoverLetter("");
    } catch (err: any) {
      setError(err.message || "Error submitting job application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "var(--spacing-section) 0", background: "var(--bg-secondary)", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "60rem" }}>
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge" style={{ background: "var(--color-success-bg)", color: "var(--color-success)" }}>
            Join the Mission
          </span>
          <h1 className="section-title">Careers &amp; Open Positions</h1>
          <p className="section-subtitle">
            Help us engineer state-of-the-art enterprise AI systems and train next-generation offensive cybersecurity practitioners.
          </p>
        </div>

        {/* Search & Department Filters */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ position: "relative", marginBottom: "1rem" }}>
            <Search size={18} style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search by role title, technology, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: "3rem", paddingRight: "2.5rem", background: "var(--card-bg)" }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Department Filter Pills */}
          {departments.length > 0 && (
            <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.5rem", WebkitOverflowScrolling: "touch" }}>
              <button
                onClick={() => setSelectedDept("all")}
                className="btn"
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "var(--text-xs)",
                  fontWeight: selectedDept === "all" ? 700 : 500,
                  background: selectedDept === "all" ? "var(--color-success)" : "var(--card-bg)",
                  color: selectedDept === "all" ? "#ffffff" : "var(--text-secondary)",
                  border: `1px solid ${selectedDept === "all" ? "var(--color-success)" : "var(--border-color)"}`,
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                All Roles ({jobs.length})
              </button>
              {departments.map((dept) => {
                const isSelected = selectedDept === dept;
                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className="btn"
                    style={{
                      padding: "0.45rem 1rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "var(--text-xs)",
                      fontWeight: isSelected ? 700 : 500,
                      background: isSelected ? "var(--color-success)" : "var(--card-bg)",
                      color: isSelected ? "#ffffff" : "var(--text-secondary)",
                      border: `1px solid ${isSelected ? "var(--color-success)" : "var(--border-color)"}`,
                      cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <Building size={12} style={{ marginRight: "0.3rem", display: "inline" }} />
                    {dept}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Application Modal / Form Overlay */}
        {applyJob && (
          <div
            style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(4px)", zIndex: 120, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
            onClick={() => { setApplyJob(null); setSuccess(false); setError(null); }}
          >
            <div
              className="card"
              style={{ maxWidth: "580px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "2.5rem", boxShadow: "var(--shadow-xl)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-success)", fontWeight: 700, textTransform: "uppercase" }}>Applying for Position</span>
                  <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.25rem" }}>{applyJob.title}</h2>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{applyJob.department} &bull; {applyJob.location}</span>
                </div>
                <button
                  onClick={() => { setApplyJob(null); setSuccess(false); setError(null); }}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "4px" }}
                >
                  <X size={20} />
                </button>
              </div>

              {success ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <CheckCircle2 size={56} style={{ color: "var(--color-success)", margin: "0 auto 1rem auto" }} />
                  <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginBottom: "0.5rem", color: "var(--text-primary)" }}>Application Received</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                    Thank you for applying. Our talent &amp; engineering operations directors will review your submission and reach out soon.
                  </p>
                  <button className="btn btn-primary" onClick={() => { setApplyJob(null); setSuccess(false); }}>
                    Return to Open Positions
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {error && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--color-error-bg)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "var(--color-error)", padding: "0.75rem", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)" }}>
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input required type="text" placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input-field" />
                  </div>
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input required type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
                  </div>
                  <div>
                    <label className="form-label">Cover Letter &amp; Experience Summary *</label>
                    <textarea
                      required
                      value={coverLetter}
                      rows={5}
                      placeholder="Outline your background, certifications (OSCP, OSCE, AWS, CKA), GitHub profile, or links to technical projects..."
                      onChange={(e) => setCoverLetter(e.target.value)}
                      className="input-field"
                      style={{ resize: "vertical" }}
                    />
                  </div>
                  <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                    <Send size={16} />
                    <span>{submitting ? "Submitting application..." : "Submit Application"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Listings */}
        {loading ? (
          <div className="loading-container">
            <Loader className="animate-spin text-accent" style={{ color: "var(--accent-blue)" }} size={32} />
            <p>Loading open roles...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="empty-state card" style={{ padding: "3.5rem 2rem", textAlign: "center" }}>
            <Briefcase size={42} style={{ color: "var(--text-muted)", margin: "0 auto 1rem auto" }} />
            <h3 className="empty-title">No Matching Positions Found</h3>
            <p className="empty-text">Try adjusting your search criteria or checking back soon as new cohorts open.</p>
            {(searchQuery || selectedDept !== "all") && (
              <button
                onClick={() => { setSearchQuery(""); setSelectedDept("all"); }}
                className="btn btn-outline"
                style={{ marginTop: "1rem" }}
              >
                Clear Search Filters
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {filteredJobs.map((job) => (
              <div key={job.id} className="card hover-lift" style={{
                padding: "2rem 2.25rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1.5rem",
                background: "var(--card-bg)"
              }}>
                <div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    <span className="badge badge-green">
                      {job.department}
                    </span>
                    {job.type && (
                      <span className="badge badge-blue">
                        {job.type}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.35rem" }}>{job.title}</h3>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", color: "var(--text-secondary)", fontSize: "var(--text-xs)", flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <MapPin size={14} style={{ color: "var(--accent-blue)" }} />
                      {job.location || "Dhaka / Remote"}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Briefcase size={14} style={{ color: "var(--color-success)" }} />
                      {job.type || "Full-time"}
                    </span>
                    {job.salary_range && (
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <DollarSign size={14} style={{ color: "var(--accent-teal)" }} />
                        {job.salary_range}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className="btn btn-accent"
                  onClick={() => setApplyJob(job)}
                  style={{ whiteSpace: "nowrap" }}
                >
                  <span>Apply Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
