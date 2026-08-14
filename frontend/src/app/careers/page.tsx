"use client";

import { useEffect, useState } from "react";
import { Briefcase, MapPin, ArrowRight, Loader, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Application Modal state
  const [applyJob, setApplyJob] = useState<any | null>(null);
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
        throw new Error("Failed to submit application. Please verify details.");
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
    <div style={{ padding: "var(--spacing-section) 0" }}>
      <div className="container" style={{ maxWidth: "56rem" }}>
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge" style={{ background: "var(--color-success-bg)", color: "var(--color-success)" }}>
            Join the Mission
          </span>
          <h1 className="section-title">Careers &amp; Open Positions</h1>
          <p className="section-subtitle">
            Help us build clean enterprise AI platforms and secure modern network infrastructures.
          </p>
        </div>

        {/* Modal Overlay / Form view */}
        {applyJob ? (
          <div className="card" style={{ padding: "3rem", marginBottom: "3rem", boxShadow: "var(--shadow-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", marginBottom: "2rem" }}>
              <div>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-success)", fontWeight: 700, textTransform: "uppercase" }}>APPLYING FOR POSITION</span>
                <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)" }}>{applyJob.title}</h2>
              </div>
              <button className="btn btn-outline" onClick={() => { setApplyJob(null); setSuccess(false); setError(null); }} style={{ padding: "0.4rem 0.8rem", fontSize: "var(--text-xs)" }}>
                Close Form
              </button>
            </div>

            {success ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <CheckCircle2 size={56} style={{ color: "var(--color-success)", margin: "0 auto 1.5rem auto" }} />
                <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>Application Received</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "1.5rem" }}>
                  Thank you. Our operations directors will review your application and resume. We will contact you soon.
                </p>
                <button className="btn btn-primary" onClick={() => { setApplyJob(null); setSuccess(false); }}>
                  Return to Listings
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
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input-field" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
                </div>
                <div className="form-group">
                  <label className="form-label">Cover Letter &amp; Resume Summary *</label>
                  <textarea required value={coverLetter} rows={6} placeholder="Provide details of your experience, certifications (OSCP, OSCE, etc.), and link to your online resume/portfolio." onChange={(e) => setCoverLetter(e.target.value)} className="input-field" style={{ resize: "vertical" }} />
                </div>
                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                  <Send size={16} />
                  <span>{submitting ? "Submitting application..." : "Send Application"}</span>
                </button>
              </form>
            )}
          </div>
        ) : null}

        {/* Listings */}
        {loading ? (
          <div className="loading-container">
            <Loader className="animate-spin text-accent" style={{ color: "var(--accent-blue)" }} size={32} />
            <p>Loading open positions...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="empty-state card">
            <Briefcase size={42} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
            <h3 className="empty-title">No Open Positions Currently Listed</h3>
            <p className="empty-text">Please check back later or submit a general inquiry.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {jobs.map((job) => (
              <div key={job.id} className="card hover-lift" style={{
                padding: "2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1.5rem"
              }}>
                <div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span className="badge badge-green">
                      {job.department}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--text-primary)" }}>{job.title}</h3>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", color: "var(--text-secondary)", fontSize: "var(--text-xs)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Briefcase size={14} />
                      {job.type}
                    </span>
                  </div>
                </div>

                <button className="btn btn-accent" onClick={() => setApplyJob(job)}>
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
