"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  GraduationCap, Trash2, Search, UserPlus, Award,
  CheckCircle2, RotateCcw, BookOpen, Users, X,
  Smartphone, Clock, Check, XCircle, Copy, ShieldCheck,
  Filter, RefreshCw
} from "lucide-react";
import CustomModal from "@/components/CustomModal";

export default function AdminEnrollmentsPage() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<"enrollments" | "bkash">("enrollments");

  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // bKash Transactions State
  const [bkashTransactions, setBkashTransactions] = useState<any[]>([]);
  const [bkashFilter, setBkashFilter] = useState<"all" | "pending" | "paid" | "failed">("all");
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [copiedTrx, setCopiedTrx] = useState<string | null>(null);

  // Direct Enroll Modal State
  const [isDirectEnrollOpen, setIsDirectEnrollOpen] = useState(false);
  const [directForm, setDirectForm] = useState({
    user_identifier: "",
    course_id: "",
    cohort_id: ""
  });
  const [submittingDirect, setSubmittingDirect] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "info" as "info" | "danger" | "confirm" | "success",
    title: "",
    message: "",
    confirmText: "Confirm",
    onConfirm: undefined as (() => void) | undefined
  });

  const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchAllData = async () => {
    try {
      const [enrollRes, courseRes, cohortRes, userRes, bkashRes] = await Promise.all([
        fetch("/api/v1/enrollments", { headers }),
        fetch("/api/v1/courses?page=1&page_size=100", { headers }),
        fetch("/api/v1/cohorts", { headers }),
        fetch("/api/v1/users?page=1&page_size=100", { headers }),
        fetch("/api/v1/payments/manual-bkash/pending", { headers })
      ]);

      if (enrollRes.ok) setEnrollments(await enrollRes.json());
      if (courseRes.ok) {
        const data = await courseRes.json();
        setCourses(data.items || []);
      }
      if (cohortRes.ok) setCohorts(await cohortRes.json());
      if (userRes.ok) {
        const data = await userRes.json();
        setUsers(data.items || []);
      }
      if (bkashRes.ok) {
        setBkashTransactions(await bkashRes.json());
      }
    } catch (err) {
      console.error("Error loading administrative data:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllData();
    }
  }, [token]);

  const handleCopyTrx = (trx: string) => {
    navigator.clipboard.writeText(trx);
    setCopiedTrx(trx);
    setTimeout(() => setCopiedTrx(null), 2000);
  };

  const handleApproveBkash = async (orderId: string, studentName: string) => {
    setActionInProgress(orderId);
    try {
      const res = await fetch(`/api/v1/payments/manual-bkash/${orderId}/approve`, {
        method: "POST",
        headers
      });

      if (res.ok) {
        showMessage(`bKash payment approved. ${studentName} is now enrolled in the course.`);
        fetchAllData();
      } else {
        const err = await res.json().catch(() => ({}));
        showMessage(err.detail || "Failed to approve payment.", "error");
      }
    } catch {
      showMessage("Error communicating with payment service.", "error");
    } finally {
      setActionInProgress(null);
    }
  };

  const handleRejectBkash = (orderId: string, studentName: string) => {
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Reject bKash Transaction",
      message: `Are you sure you want to mark this bKash transaction for ${studentName} as rejected?`,
      confirmText: "Reject Transaction",
      onConfirm: async () => {
        setActionInProgress(orderId);
        try {
          const res = await fetch(`/api/v1/payments/manual-bkash/${orderId}/reject`, {
            method: "POST",
            headers
          });

          if (res.ok) {
            showMessage("Transaction marked as rejected.");
            fetchAllData();
          } else {
            const err = await res.json().catch(() => ({}));
            showMessage(err.detail || "Failed to reject transaction.", "error");
          }
        } catch {
          showMessage("Error communicating with server.", "error");
        } finally {
          setActionInProgress(null);
        }
      }
    });
  };

  const handleDirectEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directForm.user_identifier.trim() || !directForm.course_id) {
      showMessage("Please specify both student email/ID and course track.", "error");
      return;
    }

    setSubmittingDirect(true);
    try {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(directForm.user_identifier.trim());
      const payload: any = {
        course_id: directForm.course_id,
        cohort_id: directForm.cohort_id ? directForm.cohort_id : undefined
      };

      if (isUuid) {
        payload.user_id = directForm.user_identifier.trim();
      } else {
        payload.email = directForm.user_identifier.trim();
      }

      const res = await fetch("/api/v1/enrollments/direct", {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showMessage("Student directly enrolled successfully!");
        setIsDirectEnrollOpen(false);
        setDirectForm({ user_identifier: "", course_id: "", cohort_id: "" });
        fetchAllData();
      } else {
        const err = await res.json();
        showMessage(err.detail || "Failed to complete direct enrollment.", "error");
      }
    } catch {
      showMessage("Error connecting to server.", "error");
    } finally {
      setSubmittingDirect(false);
    }
  };

  const handleOverrideProgress = async (enrollmentId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/v1/enrollments/${enrollmentId}/admin-progress`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        showMessage(`Enrollment marked as ${newStatus}.`);
        fetchAllData();
      } else {
        const err = await res.json();
        showMessage(err.detail || "Failed to update enrollment progress.", "error");
      }
    } catch {
      showMessage("Error updating enrollment.", "error");
    }
  };

  const handleDeleteEnrollment = (enrollmentId: string) => {
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Cancel Student Enrollment",
      message: "Are you sure you want to cancel this student's enrollment?",
      confirmText: "Cancel Enrollment",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/v1/enrollments/${enrollmentId}`, { method: "DELETE", headers });
          if (res.ok) {
            showMessage("Enrollment cancelled successfully.");
            fetchAllData();
          } else {
            showMessage("Failed to cancel enrollment.", "error");
          }
        } catch {
          showMessage("Error connecting to server.", "error");
        }
      }
    });
  };

  // Filter enrollments
  const filteredEnrollments = enrollments.filter(e =>
    (e.user_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.user_email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.course_title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter bKash transactions
  const filteredBkash = bkashTransactions.filter(t => {
    const matchesFilter = bkashFilter === "all" || t.status === bkashFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (t.user_name || "").toLowerCase().includes(q) ||
      (t.user_email || "").toLowerCase().includes(q) ||
      (t.course_title || "").toLowerCase().includes(q) ||
      (t.trx_id || "").toLowerCase().includes(q) ||
      (t.sender_number || "").toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const pendingBkashCount = bkashTransactions.filter(t => t.status === "pending").length;
  const availableCohorts = cohorts.filter(c => !directForm.course_id || c.course_id === directForm.course_id);

  return (
    <div>
      {/* Top Header */}
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
            <GraduationCap size={24} style={{ color: "var(--accent-blue)" }} /> Enrollments & Payments
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "var(--text-sm)" }}>
            Verify bKash Send Money transactions, grant course access, directly enroll students, and manage curriculum progress
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => fetchAllData()}
            className="btn btn-secondary btn-sm"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
            title="Refresh records"
          >
            <RefreshCw size={14} /> Refresh
          </button>

          <button
            onClick={() => setIsDirectEnrollOpen(true)}
            className="btn btn-accent btn-sm"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            <UserPlus size={16} /> Direct Enroll Student
          </button>
        </div>
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

      {/* Main Container Card */}
      <div className="card" style={{ padding: "1.5rem" }}>
        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => setActiveTab("enrollments")}
            className={`btn btn-sm ${activeTab === "enrollments" ? "btn-primary" : "btn-secondary"}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: 700 }}
          >
            <GraduationCap size={16} />
            <span>Active Student Enrollments ({enrollments.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("bkash")}
            className={`btn btn-sm ${activeTab === "bkash" ? "btn-primary" : "btn-secondary"}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: 700 }}
          >
            <Smartphone size={16} />
            <span>bKash Verifications ({bkashTransactions.length})</span>
            {pendingBkashCount > 0 && (
              <span style={{
                background: "#e2136e",
                color: "#ffffff",
                fontSize: "0.7rem",
                fontWeight: 800,
                padding: "0.15rem 0.5rem",
                borderRadius: "var(--radius-full)",
                letterSpacing: "0.03em"
              }}>
                {pendingBkashCount} PENDING
              </span>
            )}
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>
              {activeTab === "enrollments"
                ? `Student Enrollments (${filteredEnrollments.length})`
                : `bKash Submissions (${filteredBkash.length})`}
            </h2>

            {activeTab === "bkash" && (
              <div style={{ display: "flex", gap: "0.35rem" }}>
                {(["all", "pending", "paid", "failed"] as const).map((statusKey) => (
                  <button
                    key={statusKey}
                    type="button"
                    onClick={() => setBkashFilter(statusKey)}
                    className="btn btn-sm"
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.65rem",
                      background: bkashFilter === statusKey ? "var(--bg-secondary)" : "transparent",
                      border: bkashFilter === statusKey ? "1px solid var(--border-color)" : "none",
                      color: bkashFilter === statusKey ? "var(--accent-blue)" : "var(--text-muted)",
                      fontWeight: bkashFilter === statusKey ? 700 : 500
                    }}
                  >
                    {statusKey.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder={activeTab === "enrollments" ? "Search student or course..." : "Search by TrxID, sender, student..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: "2.25rem", width: "280px" }}
            />
          </div>
        </div>

        {/* TAB 1: ACTIVE ENROLLMENTS */}
        {activeTab === "enrollments" && (
          fetching ? (
            <div className="loading-container" style={{ padding: "3rem 0" }}>Loading enrollments...</div>
          ) : filteredEnrollments.length === 0 ? (
            <div className="empty-state" style={{ padding: "3rem 0" }}>No student enrollments found.</div>
          ) : (
            <div className="table-container">
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "var(--text-sm)" }}>
                <thead>
                  <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)", color: "var(--text-secondary)", fontWeight: 600 }}>
                    <th style={{ padding: "1rem" }}>Student</th>
                    <th style={{ padding: "1rem" }}>Course Track</th>
                    <th style={{ padding: "1rem" }}>Enrolled Date</th>
                    <th style={{ padding: "1rem" }}>Status</th>
                    <th style={{ padding: "1rem" }}>Curriculum Progress</th>
                    <th style={{ padding: "1rem" }}>Access Control</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnrollments.map((e) => (
                    <tr key={e.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{e.user_name}</div>
                        <div style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)" }}>{e.user_email}</div>
                      </td>
                      <td style={{ padding: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>{e.course_title}</td>
                      <td style={{ padding: "1rem", color: "var(--text-secondary)", fontSize: "var(--text-xs)" }}>
                        {new Date(e.enrolled_at).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span className={`badge ${e.status === "completed" ? "badge-green" : "badge-blue"}`}>
                          {e.status?.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        {e.status !== "completed" ? (
                          <button
                            onClick={() => handleOverrideProgress(e.id, "completed")}
                            className="btn btn-secondary btn-sm"
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", padding: "0.25rem 0.65rem", color: "#10b981", borderColor: "rgba(16, 185, 129, 0.3)" }}
                            title="Instantly graduate student and unlock certificate"
                          >
                            <Award size={13} />
                            <span>Mark Completed</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOverrideProgress(e.id, "active")}
                            className="btn btn-secondary btn-sm"
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", padding: "0.25rem 0.65rem", color: "var(--text-secondary)" }}
                            title="Revert to active status"
                          >
                            <RotateCcw size={13} />
                            <span>Reset Active</span>
                          </button>
                        )}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <button
                          onClick={() => handleDeleteEnrollment(e.id)}
                          style={{ color: "var(--color-error)", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem", fontWeight: 600, fontSize: "var(--text-xs)" }}
                        >
                          <Trash2 size={15} />
                          <span>Cancel</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* TAB 2: MANUAL BKASH VERIFICATIONS */}
        {activeTab === "bkash" && (
          fetching ? (
            <div className="loading-container" style={{ padding: "3rem 0" }}>Loading bKash transactions...</div>
          ) : filteredBkash.length === 0 ? (
            <div className="empty-state" style={{ padding: "3rem 0" }}>
              No bKash transactions matching current filter.
            </div>
          ) : (
            <div className="table-container">
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "var(--text-sm)" }}>
                <thead>
                  <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)", color: "var(--text-secondary)", fontWeight: 600 }}>
                    <th style={{ padding: "1rem" }}>Student</th>
                    <th style={{ padding: "1rem" }}>Bootcamp Track</th>
                    <th style={{ padding: "1rem" }}>Sender bKash</th>
                    <th style={{ padding: "1rem" }}>Transaction ID (TrxID)</th>
                    <th style={{ padding: "1rem" }}>Tuition</th>
                    <th style={{ padding: "1rem" }}>Submitted At</th>
                    <th style={{ padding: "1rem" }}>Status</th>
                    <th style={{ padding: "1rem" }}>Verification Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBkash.map((t) => (
                    <tr key={t.order_id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{t.user_name}</div>
                        <div style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)" }}>{t.user_email}</div>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{t.course_title}</div>
                        {t.notes && (
                          <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                            {t.notes}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "1rem", fontFamily: "monospace", fontWeight: 600, color: "var(--text-primary)" }}>
                        {t.sender_number}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <span style={{
                            fontFamily: "monospace",
                            fontWeight: 800,
                            letterSpacing: "0.05em",
                            color: "var(--accent-blue)",
                            background: "var(--bg-secondary)",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "var(--radius-sm)",
                            border: "1px solid var(--border-color)"
                          }}>
                            {t.trx_id}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyTrx(t.trx_id)}
                            style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                            title="Copy TrxID"
                          >
                            {copiedTrx === t.trx_id ? <Check size={13} style={{ color: "var(--color-success)" }} /> : <Copy size={13} />}
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        ৳{Number(t.amount).toLocaleString()} BDT
                      </td>
                      <td style={{ padding: "1rem", color: "var(--text-secondary)", fontSize: "var(--text-xs)" }}>
                        {new Date(t.created_at).toLocaleString()}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span className={`badge ${t.status === "paid" ? "badge-green" : t.status === "failed" ? "badge-red" : "badge-blue"}`}>
                          {t.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        {t.status === "pending" ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <button
                              type="button"
                              disabled={actionInProgress === t.order_id}
                              onClick={() => handleApproveBkash(t.order_id, t.user_name)}
                              className="btn btn-sm"
                              style={{
                                background: "var(--color-success)",
                                color: "#ffffff",
                                border: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                fontSize: "0.75rem",
                                padding: "0.3rem 0.65rem",
                                fontWeight: 700,
                                borderRadius: "var(--radius-sm)"
                              }}
                              title="Verify TrxID and instantly activate student enrollment"
                            >
                              <CheckCircle2 size={14} />
                              <span>{actionInProgress === t.order_id ? "Enrolling..." : "Approve & Enroll"}</span>
                            </button>

                            <button
                              type="button"
                              disabled={actionInProgress === t.order_id}
                              onClick={() => handleRejectBkash(t.order_id, t.user_name)}
                              className="btn btn-secondary btn-sm"
                              style={{
                                color: "var(--color-error)",
                                borderColor: "rgba(239, 68, 68, 0.3)",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                fontSize: "0.75rem",
                                padding: "0.3rem 0.65rem"
                              }}
                              title="Reject invalid transaction"
                            >
                              <XCircle size={14} />
                              <span>Reject</span>
                            </button>
                          </div>
                        ) : t.status === "paid" ? (
                          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-success)", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <CheckCircle2 size={14} /> Enrolled
                          </span>
                        ) : (
                          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-error)", fontWeight: 600 }}>
                            Declined
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>

      {/* Direct Student Enrollment Modal */}
      {isDirectEnrollOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.75)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem"
        }}>
          <div className="card" style={{ maxWidth: "540px", width: "100%", padding: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <UserPlus size={18} style={{ color: "var(--accent-blue)" }} /> Direct Student Enrollment
              </h3>
              <button
                onClick={() => setIsDirectEnrollOpen(false)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleDirectEnroll} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="form-group">
                <label className="form-label">Student Email or Registered User *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter student email (e.g. student@example.com)"
                  value={directForm.user_identifier}
                  onChange={(e) => setDirectForm({ ...directForm, user_identifier: e.target.value })}
                  className="input-field"
                />
                {users.length > 0 && (
                  <div style={{ marginTop: "0.4rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Or select from registered accounts:</span>
                    <select
                      onChange={(e) => {
                        if (e.target.value) setDirectForm({ ...directForm, user_identifier: e.target.value });
                      }}
                      className="input-field"
                      style={{ marginTop: "0.25rem", fontSize: "0.8rem", padding: "0.4rem" }}
                      defaultValue=""
                    >
                      <option value="">Choose registered student</option>
                      {users.map((u) => (
                        <option key={u.id} value={u.email}>{u.full_name} ({u.email})</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Target Course Track *</label>
                <select
                  required
                  value={directForm.course_id}
                  onChange={(e) => setDirectForm({ ...directForm, course_id: e.target.value, cohort_id: "" })}
                  className="input-field"
                >
                  <option value="">Select Course Track</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Assign to Cohort Batch (Optional)</label>
                <select
                  value={directForm.cohort_id}
                  onChange={(e) => setDirectForm({ ...directForm, cohort_id: e.target.value })}
                  className="input-field"
                  disabled={!directForm.course_id || availableCohorts.length === 0}
                >
                  <option value="">No Cohort (Independent Self-Paced Track)</option>
                  {availableCohorts.map((c) => (
                    <option key={c.id} value={c.id}>{c.title} (Max: {c.capacity})</option>
                  ))}
                </select>
                {directForm.course_id && availableCohorts.length === 0 && (
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    No active cohorts found for this course. Enrollment will be self-paced.
                  </p>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setIsDirectEnrollOpen(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingDirect}
                  className="btn btn-accent btn-sm"
                >
                  {submittingDirect ? "Enrolling..." : "Enroll Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
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
