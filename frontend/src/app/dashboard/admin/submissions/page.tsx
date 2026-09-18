"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  FileCode, Search, CheckCircle2, Clock, ExternalLink,
  Award, Filter, RefreshCw, X, GitBranch, Edit3, MessageSquare
} from "lucide-react";
import CustomModal from "@/components/CustomModal";

interface Submission {
  id: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
  enrollment_id: string;
  lesson_id: string;
  lesson_title?: string;
  course_title?: string;
  submission_url: string;
  notes?: string;
  status: string;
  score?: number;
  grade?: string;
  feedback?: string;
  graded_at?: string;
  submitted_at: string;
}

export default function AdminSubmissionsPage() {
  const { token } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [fetching, setFetching] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"all" | "submitted" | "graded">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Grading Modal State
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(85);
  const [gradeLetter, setGradeLetter] = useState<string>("A");
  const [gradeFeedback, setGradeFeedback] = useState<string>("");
  const [gradingInProgress, setGradingInProgress] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "info" as "info" | "danger" | "confirm" | "success",
    title: "",
    message: ""
  });

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const fetchSubmissions = async () => {
    if (!token) return;
    setFetching(true);
    try {
      let url = "/api/v1/assessments/submissions";
      if (statusFilter !== "all") {
        url += `?status=${statusFilter}`;
      }
      const res = await fetch(url, { headers });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [token, statusFilter]);

  const openGradingModal = (sub: Submission) => {
    setSelectedSubmission(sub);
    setGradeScore(sub.score ?? 85);
    setGradeLetter(sub.grade ?? "A");
    setGradeFeedback(sub.feedback ?? "");
  };

  const handleGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;
    setGradingInProgress(true);
    try {
      const res = await fetch(`/api/v1/assessments/submissions/${selectedSubmission.id}/grade`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          score: Number(gradeScore),
          grade: gradeLetter,
          feedback: gradeFeedback.trim()
        })
      });

      if (res.ok) {
        const updated = await res.json();
        setSubmissions(prev => prev.map(s => s.id === updated.id ? updated : s));
        setSelectedSubmission(null);
        setModalConfig({
          isOpen: true,
          type: "success",
          title: "Grade Recorded",
          message: "Student assignment evaluated successfully and completion progress updated."
        });
      } else {
        const err = await res.json().catch(() => ({}));
        setModalConfig({
          isOpen: true,
          type: "danger",
          title: "Grading Error",
          message: err.detail || "Failed to record student grade."
        });
      }
    } catch {
      setModalConfig({
        isOpen: true,
        type: "danger",
        title: "Network Error",
        message: "Failed to connect to grading server."
      });
    } finally {
      setGradingInProgress(false);
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      (sub.user_name || "").toLowerCase().includes(q) ||
      (sub.user_email || "").toLowerCase().includes(q) ||
      (sub.course_title || "").toLowerCase().includes(q) ||
      (sub.lesson_title || "").toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.25rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-md)", background: "rgba(14, 165, 233, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-blue)" }}>
              <FileCode size={20} />
            </div>
            <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
              Assessment Submissions &amp; Grading
            </h1>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", margin: 0 }}>
            Inspect student project repositories, evaluate capstones, and award official academic grades.
          </p>
        </div>

        <button
          onClick={fetchSubmissions}
          className="btn btn-outline"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "var(--text-xs)" }}
        >
          <RefreshCw size={14} /> Refresh Submissions
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <Filter size={13} /> Filter:
          </span>
          <button
            onClick={() => setStatusFilter("all")}
            className={`btn btn-sm ${statusFilter === "all" ? "btn-primary" : "btn-outline"}`}
          >
            All ({submissions.length})
          </button>
          <button
            onClick={() => setStatusFilter("submitted")}
            className={`btn btn-sm ${statusFilter === "submitted" ? "btn-primary" : "btn-outline"}`}
          >
            Pending Review
          </button>
          <button
            onClick={() => setStatusFilter("graded")}
            className={`btn btn-sm ${statusFilter === "graded" ? "btn-primary" : "btn-outline"}`}
          >
            Graded
          </button>
        </div>

        <div style={{ position: "relative", minWidth: "260px" }}>
          <input
            type="text"
            placeholder="Search student or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ width: "100%", paddingLeft: "2.25rem", fontSize: "var(--text-xs)" }}
          />
          <Search size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
        </div>
      </div>

      {/* Submissions Table */}
      {fetching ? (
        <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>
          <p>Loading assessment submissions queue...</p>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="card empty-state" style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
          <FileCode size={40} style={{ margin: "0 auto 1rem auto", color: "var(--text-muted)", opacity: 0.6 }} />
          <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
            No Project Submissions Found
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", margin: 0 }}>
            {statusFilter !== "all" ? `There are no submissions currently categorized as ${statusFilter}.` : "No student project submissions recorded yet."}
          </p>
        </div>
      ) : (
        <div className="card" style={{ overflowX: "auto", padding: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "var(--text-sm)" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", background: "rgba(0, 0, 0, 0.02)" }}>
                <th style={{ padding: "1rem 1.25rem", fontWeight: 700, color: "var(--text-secondary)", fontSize: "var(--text-xs)", textTransform: "uppercase" }}>Student</th>
                <th style={{ padding: "1rem 1.25rem", fontWeight: 700, color: "var(--text-secondary)", fontSize: "var(--text-xs)", textTransform: "uppercase" }}>Course &amp; Lesson</th>
                <th style={{ padding: "1rem 1.25rem", fontWeight: 700, color: "var(--text-secondary)", fontSize: "var(--text-xs)", textTransform: "uppercase" }}>Repository Link</th>
                <th style={{ padding: "1rem 1.25rem", fontWeight: 700, color: "var(--text-secondary)", fontSize: "var(--text-xs)", textTransform: "uppercase" }}>Status</th>
                <th style={{ padding: "1rem 1.25rem", fontWeight: 700, color: "var(--text-secondary)", fontSize: "var(--text-xs)", textTransform: "uppercase" }}>Grade</th>
                <th style={{ padding: "1rem 1.25rem", fontWeight: 700, color: "var(--text-secondary)", fontSize: "var(--text-xs)", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((sub) => (
                <tr key={sub.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                      {sub.user_name || "Enrolled Student"}
                    </div>
                    <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                      {sub.user_email}
                    </div>
                  </td>

                  <td style={{ padding: "1rem 1.25rem" }}>
                    <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                      {sub.course_title || "Course Track"}
                    </div>
                    <div style={{ fontSize: "var(--text-xs)", color: "var(--accent-blue)" }}>
                      {sub.lesson_title || "Assignment"}
                    </div>
                  </td>

                  <td style={{ padding: "1rem 1.25rem" }}>
                    <a
                      href={sub.submission_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "var(--text-xs)", textDecoration: "none" }}
                    >
                      <GitBranch size={13} />
                      <span>Inspect Project</span>
                      <ExternalLink size={11} />
                    </a>
                  </td>

                  <td style={{ padding: "1rem 1.25rem" }}>
                    {sub.status === "graded" ? (
                      <span className="badge badge-green" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                        <CheckCircle2 size={12} /> Graded
                      </span>
                    ) : (
                      <span className="badge badge-blue" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                        <Clock size={12} /> Pending Review
                      </span>
                    )}
                  </td>

                  <td style={{ padding: "1rem 1.25rem" }}>
                    {sub.grade ? (
                      <div>
                        <span style={{ fontWeight: 800, color: "var(--color-success)" }}>Grade {sub.grade}</span>
                        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginLeft: "0.35rem" }}>({sub.score}%)</span>
                      </div>
                    ) : (
                      <span style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)" }}>Not graded yet</span>
                    )}
                  </td>

                  <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                    <button
                      onClick={() => openGradingModal(sub)}
                      className="btn btn-primary btn-sm"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                    >
                      <Edit3 size={13} />
                      <span>{sub.status === "graded" ? "Update Grade" : "Grade Project"}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Faculty Grading Modal */}
      {selectedSubmission && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "1rem"
          }}
        >
          <div
            className="card"
            style={{
              width: "100%",
              maxWidth: "600px",
              padding: "2rem",
              boxShadow: "var(--shadow-xl)",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Award size={20} style={{ color: "var(--accent-blue)" }} />
                <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Evaluate Student Assignment
                </h3>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Submission Metadata */}
            <div style={{ background: "rgba(0, 0, 0, 0.03)", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                <strong>Student: </strong> {selectedSubmission.user_name} ({selectedSubmission.user_email})
              </div>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                <strong>Course: </strong> {selectedSubmission.course_title}
              </div>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                <strong>Lesson: </strong> {selectedSubmission.lesson_title}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <a
                  href={selectedSubmission.submission_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "var(--text-xs)", textDecoration: "none" }}
                >
                  <GitBranch size={12} />
                  <span>Inspect Submitted Repository</span>
                  <ExternalLink size={11} />
                </a>
              </div>
              {selectedSubmission.notes && (
                <div style={{ marginTop: "0.75rem", fontSize: "var(--text-xs)", color: "var(--text-primary)", background: "var(--card-bg)", padding: "0.6rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                  <strong>Student Notes: </strong>
                  <span>{selectedSubmission.notes}</span>
                </div>
              )}
            </div>

            {/* Grading Form */}
            <form onSubmit={handleGradeSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 700, marginBottom: "0.35rem", color: "var(--text-primary)" }}>
                      Numeric Score (0 to 100)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      required
                      value={gradeScore}
                      onChange={(e) => setGradeScore(Number(e.target.value))}
                      className="input-field"
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 700, marginBottom: "0.35rem", color: "var(--text-primary)" }}>
                      Letter Grade
                    </label>
                    <select
                      value={gradeLetter}
                      onChange={(e) => setGradeLetter(e.target.value)}
                      className="input-field"
                      style={{ width: "100%" }}
                    >
                      <option value="A+">A+ (Exceptional)</option>
                      <option value="A">A (Superior)</option>
                      <option value="B+">B+ (Very Good)</option>
                      <option value="B">B (Competent)</option>
                      <option value="C">C (Passing)</option>
                      <option value="F">F (Revision Required)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 700, marginBottom: "0.35rem", color: "var(--text-primary)" }}>
                    Academic Faculty Feedback &amp; Review
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={gradeFeedback}
                    onChange={(e) => setGradeFeedback(e.target.value)}
                    placeholder="Provide constructive feedback on implementation architecture, code quality, and best practices..."
                    className="input-field"
                    style={{ width: "100%", resize: "vertical" }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setSelectedSubmission(null)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={gradingInProgress}
                    className="btn btn-primary"
                  >
                    {gradingInProgress ? "Recording Grade..." : "Submit Academic Grade"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <CustomModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
      />
    </div>
  );
}
