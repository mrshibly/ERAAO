"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldCheck, Copy, Check, Smartphone, CheckCircle2,
  Clock, AlertCircle, ArrowRight, BookOpen, RefreshCw,
  HelpCircle, ExternalLink, UserCheck
} from "lucide-react";

interface CourseOption {
  id: string;
  title: string;
  slug: string;
  price: number;
  currency: string;
  level: string;
  duration_hours?: number;
}

const FALLBACK_COURSES: CourseOption[] = [
  {
    id: "offensive-cyber-security",
    title: "Offensive Cyber Security & Practical Penetration Testing",
    slug: "offensive-cyber-security",
    price: 28000,
    currency: "BDT",
    level: "INTERMEDIATE",
    duration_hours: 36
  },
  {
    id: "professional-zero-to-fluent-english",
    title: "Professional Zero to Fluent English",
    slug: "professional-zero-to-fluent-english",
    price: 12000,
    currency: "BDT",
    level: "BEGINNER",
    duration_hours: 36
  },
  {
    id: "basic-english-foundation",
    title: "Professional Zero to Fluent English",
    slug: "basic-english-foundation",
    price: 12000,
    currency: "BDT",
    level: "BEGINNER",
    duration_hours: 36
  },
  {
    id: "english-for-freelancers",
    title: "English for Freelancers: International Client Communication",
    slug: "english-for-freelancers",
    price: 15000,
    currency: "BDT",
    level: "INTERMEDIATE",
    duration_hours: 36
  },
  {
    id: "advanced-english-fluency",
    title: "Advanced English: Natural Fluency & Nuanced Communication",
    slug: "advanced-english-fluency",
    price: 18000,
    currency: "BDT",
    level: "ADVANCED",
    duration_hours: 36
  },
  {
    id: "ai-automation-agents",
    title: "Practical AI Automation & Intelligent Agents",
    slug: "ai-automation-agents",
    price: 25000,
    currency: "BDT",
    level: "INTERMEDIATE",
    duration_hours: 36
  }
];

const BKASH_NUMBER = "01517835859";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();

  const initialCourseParam = searchParams?.get("course") || "";

  const [courses, setCourses] = useState<CourseOption[]>(FALLBACK_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<CourseOption>(FALLBACK_COURSES[0]);
  const [loadingCourse, setLoadingCourse] = useState(true);

  // Form State
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [amount, setAmount] = useState<number>(FALLBACK_COURSES[0].price);
  const [notes, setNotes] = useState("");

  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Submission Status State
  const [submittedOrder, setSubmittedOrder] = useState<any | null>(null);
  const [existingOrders, setExistingOrders] = useState<any[]>([]);
  const [checkingExisting, setCheckingExisting] = useState(false);

  // Fetch available courses from API
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const res = await fetch("/api/v1/courses?page=1&page_size=50");
        if (res.ok) {
          const data = await res.json();
          const items = data.items || [];
          if (items.length > 0) {
            const mapped: CourseOption[] = items.map((c: any) => ({
              id: c.id,
              title: c.title,
              slug: c.slug,
              price: Number(c.price) || 0,
              currency: c.currency || "BDT",
              level: c.level || "BEGINNER",
              duration_hours: c.duration_hours || 36
            }));
            setCourses(mapped);

            // Match selected course by ID or slug
            if (initialCourseParam) {
              const matched = mapped.find(
                (c) => c.id === initialCourseParam || c.slug === initialCourseParam
              );
              if (matched) {
                setSelectedCourse(matched);
                setAmount(matched.price);
              } else {
                setSelectedCourse(mapped[0]);
                setAmount(mapped[0].price);
              }
            } else {
              setSelectedCourse(mapped[0]);
              setAmount(mapped[0].price);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoadingCourse(false);
      }
    };

    fetchCatalog();
  }, [initialCourseParam]);

  // Fetch user's existing manual bKash submissions
  useEffect(() => {
    if (!token) return;
    const fetchMySubmissions = async () => {
      setCheckingExisting(true);
      try {
        const res = await fetch("/api/v1/payments/manual-bkash/my-submissions", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const orders = await res.json();
          setExistingOrders(orders);
          // If there's an order matching selected course that is pending or paid
          const currentCourseOrder = orders.find(
            (o: any) => (o.course_id === selectedCourse.id || o.course_title === selectedCourse.title) && o.status === "pending"
          );
          if (currentCourseOrder) {
            setSubmittedOrder(currentCourseOrder);
          }
        }
      } catch (err) {
        console.error("Error fetching submissions:", err);
      } finally {
        setCheckingExisting(false);
      }
    };

    fetchMySubmissions();
  }, [token, selectedCourse]);

  const handleSelectCourse = (courseIdOrSlug: string) => {
    const found = courses.find((c) => c.id === courseIdOrSlug || c.slug === courseIdOrSlug);
    if (found) {
      setSelectedCourse(found);
      setAmount(found.price);
      setSubmittedOrder(null);
      setFormError(null);
    }
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(BKASH_NUMBER);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(amount.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2500);
  };

  const handleSubmitVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!token) {
      router.push(`/login?redirect=/checkout?course=${selectedCourse.slug || selectedCourse.id}`);
      return;
    }

    const cleanedNumber = senderNumber.trim();
    const cleanedTrx = trxId.trim().toUpperCase();

    if (!cleanedNumber || cleanedNumber.length < 11) {
      setFormError("Please enter a valid 11 digit bKash sender mobile number.");
      return;
    }

    if (!cleanedTrx || cleanedTrx.length < 6) {
      setFormError("Please enter a valid bKash Transaction ID (TrxID).");
      return;
    }

    if (!amount || amount <= 0) {
      setFormError("Please specify a valid tuition amount.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/v1/payments/manual-bkash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          course_id: selectedCourse.id,
          sender_number: cleanedNumber,
          trx_id: cleanedTrx,
          amount: amount,
          notes: notes.trim() || undefined
        })
      });

      if (res.ok) {
        const data = await res.json();
        setSubmittedOrder(data);
        setExistingOrders((prev) => [data, ...prev]);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setFormError(
          errorData.detail ||
          errorData.error?.message ||
          "Submission failed. Please confirm transaction details and try again."
        );
      }
    } catch {
      setFormError("Unable to connect to platform server. Please check your connection and retry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "85vh", padding: "3rem 1rem 6rem 1rem" }}>
      <div className="container" style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* Page Header */}
        <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1rem",
            background: "rgba(37, 99, 235, 0.08)",
            border: "1px solid rgba(37, 99, 235, 0.2)",
            borderRadius: "var(--radius-full)",
            color: "var(--accent-blue)",
            fontSize: "var(--text-xs)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: "1rem"
          }}>
            <ShieldCheck size={16} /> Official Manual Admissions Payment
          </div>
          <h1 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "0.75rem"
          }}>
            bKash Send Money Enrollment
          </h1>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "var(--text-base)",
            maxWidth: "680px",
            margin: "0 auto",
            lineHeight: 1.6
          }}>
            Submit your course tuition directly via bKash Send Money. Once your Transaction ID is confirmed, our admissions team will activate your complete curriculum access.
          </p>
        </div>

        {/* Not Logged In Warning Banner */}
        {!authLoading && !token && (
          <div className="card" style={{
            padding: "1.25rem 1.5rem",
            marginBottom: "2rem",
            borderLeft: "4px solid var(--accent-blue)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <UserCheck size={20} style={{ color: "var(--accent-blue)" }} />
              <div>
                <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "var(--text-sm)" }}>
                  Authentication Required to Link Enrollment
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", marginTop: "0.15rem" }}>
                  Please log in or register before submitting your bKash transaction so your courses unlock under your profile.
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link
                href={`/login?redirect=/checkout?course=${selectedCourse.slug || selectedCourse.id}`}
                className="btn btn-primary btn-sm"
              >
                Log In
              </Link>
              <Link
                href={`/register?redirect=/checkout?course=${selectedCourse.slug || selectedCourse.id}`}
                className="btn btn-secondary btn-sm"
              >
                Register
              </Link>
            </div>
          </div>
        )}

        {/* Two-Column Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          alignItems: "start"
        }}>
          {/* Left Column: Instructions & Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Course Selector & Summary */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <BookOpen size={18} style={{ color: "var(--accent-blue)" }} />
                <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>
                  Selected Curriculum Track
                </h2>
              </div>

              <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                <label className="form-label" style={{ fontSize: "var(--text-xs)" }}>Switch Bootcamp Track:</label>
                <select
                  value={selectedCourse.id}
                  onChange={(e) => handleSelectCourse(e.target.value)}
                  className="input-field"
                  style={{ fontSize: "var(--text-sm)", padding: "0.6rem 0.85rem" }}
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} (৳{c.price.toLocaleString()} BDT)
                    </option>
                  ))}
                </select>
              </div>

              <div style={{
                background: "var(--bg-secondary)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                border: "1px solid var(--border-color)"
              }}>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Tuition Due
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginTop: "0.25rem"
                }}>
                  <div style={{
                    fontSize: "var(--text-2xl)",
                    fontWeight: 800,
                    color: "var(--accent-blue)",
                    letterSpacing: "-0.02em"
                  }}>
                    ৳{selectedCourse.price.toLocaleString()} <span style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>BDT</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAmount}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.6rem", display: "flex", alignItems: "center", gap: "0.3rem" }}
                  >
                    {copiedAmount ? <Check size={13} style={{ color: "var(--color-success)" }} /> : <Copy size={13} />}
                    <span>{copiedAmount ? "Copied" : "Copy Fee"}</span>
                  </button>
                </div>

                <div style={{
                  display: "flex",
                  gap: "1.5rem",
                  marginTop: "1rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid var(--border-color)",
                  fontSize: "var(--text-xs)",
                  color: "var(--text-secondary)"
                }}>
                  <div>
                    <span style={{ color: "var(--text-muted)" }}>Level:</span> <strong>{selectedCourse.level}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)" }}>Duration:</span> <strong>{selectedCourse.duration_hours || 36} Hours (12 Weeks)</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)" }}>Format:</span> <strong>Live & Cohort Lab</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* bKash Instructions Card */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <Smartphone size={18} style={{ color: "#e2136e" }} />
                <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>
                  bKash Send Money Instructions
                </h2>
              </div>

              {/* bKash Recipient Number Box */}
              <div style={{
                background: "linear-gradient(135deg, rgba(226, 19, 110, 0.08) 0%, rgba(226, 19, 110, 0.02) 100%)",
                border: "1px solid rgba(226, 19, 110, 0.25)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                marginBottom: "1.5rem"
              }}>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", fontWeight: 600, marginBottom: "0.35rem" }}>
                  Recipient Personal Account (Send Money)
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", flexWrap: "wrap" }}>
                  <div style={{
                    fontSize: "var(--text-2xl)",
                    fontFamily: "monospace",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: "var(--text-primary)"
                  }}>
                    {BKASH_NUMBER}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    className="btn btn-sm"
                    style={{
                      background: copiedNumber ? "var(--color-success)" : "#e2136e",
                      color: "#ffffff",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      padding: "0.45rem 0.85rem",
                      borderRadius: "var(--radius-md)"
                    }}
                  >
                    {copiedNumber ? <Check size={15} /> : <Copy size={15} />}
                    <span>{copiedNumber ? "Copied Number!" : "Copy Number"}</span>
                  </button>
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                  Notice: This is a Personal bKash Account. Please choose the Send Money option inside your app or dial menu.
                </div>
              </div>

              {/* Step by Step Flow */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { step: "1", title: "Open bKash", desc: "Launch the bKash App or dial *247# on your mobile phone." },
                  { step: "2", title: "Select Send Money", desc: "Choose the Send Money (সেন্ড মানি) option from the main menu." },
                  { step: "3", title: "Enter Recipient Number", desc: `Input recipient number ${BKASH_NUMBER} (Personal Account).` },
                  { step: "4", title: "Input Exact Tuition", desc: `Enter amount ৳${selectedCourse.price.toLocaleString()} BDT as displayed above.` },
                  { step: "5", title: "Confirm with PIN", desc: "Enter your secure bKash PIN to authorize and release payment." },
                  { step: "6", title: "Copy Transaction ID", desc: "Copy the 10 character TrxID from confirmation screen or SMS." }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--accent-blue)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: "0.1rem"
                    }}>
                      {item.step}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "0.15rem", lineHeight: 1.4 }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Verification Form or Pending Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* If there's an active submitted order, show Pending Card */}
            {submittedOrder ? (
              <div className="card" style={{ padding: "2rem", borderTop: "4px solid #10b981" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  background: submittedOrder.status === "paid" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
                  color: submittedOrder.status === "paid" ? "var(--color-success)" : "#f59e0b",
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "1rem"
                }}>
                  {submittedOrder.status === "paid" ? (
                    <>
                      <CheckCircle2 size={14} /> Enrollment Approved & Active
                    </>
                  ) : (
                    <>
                      <Clock size={14} /> Verification Under Review
                    </>
                  )}
                </div>

                <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  {submittedOrder.status === "paid" ? "Payment Confirmed" : "bKash Verification Pending"}
                </h2>

                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  {submittedOrder.status === "paid"
                    ? "Your bKash transaction has been verified. You now have full access to your curriculum materials and cohorts."
                    : "Your transaction details have been recorded. Our admissions operations team verifies TrxIDs within 1 to 2 hours during operational windows."}
                </p>

                {/* Submitted Details Box */}
                <div style={{
                  background: "var(--bg-secondary)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.25rem",
                  border: "1px solid var(--border-color)",
                  marginBottom: "1.5rem",
                  fontSize: "var(--text-sm)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Course:</span>
                    <strong style={{ color: "var(--text-primary)", textAlign: "right", maxWidth: "220px" }}>
                      {submittedOrder.course_title || selectedCourse.title}
                    </strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Transaction ID (TrxID):</span>
                    <strong style={{ fontFamily: "monospace", color: "var(--accent-blue)" }}>
                      {submittedOrder.trx_id}
                    </strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Sender bKash:</span>
                    <strong style={{ fontFamily: "monospace", color: "var(--text-primary)" }}>
                      {submittedOrder.sender_number}
                    </strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Amount Paid:</span>
                    <strong style={{ color: "var(--text-primary)" }}>
                      ৳{Number(submittedOrder.amount).toLocaleString()} BDT
                    </strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Status:</span>
                    <span className={`badge ${submittedOrder.status === "paid" ? "badge-green" : "badge-blue"}`}>
                      {submittedOrder.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {submittedOrder.status === "paid" ? (
                    <Link
                      href="/dashboard/student/courses"
                      className="btn btn-primary"
                      style={{ width: "100%", textAlign: "center", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
                    >
                      <span>Enter Student Classroom</span>
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard/student"
                      className="btn btn-primary"
                      style={{ width: "100%", textAlign: "center", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
                    >
                      <span>Go to Student Dashboard</span>
                      <ArrowRight size={16} />
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => setSubmittedOrder(null)}
                    className="btn btn-secondary btn-sm"
                    style={{ width: "100%", marginTop: "0.25rem" }}
                  >
                    Submit Another Transaction
                  </button>
                </div>
              </div>
            ) : (
              /* Transaction Verification Form */
              <div className="card" style={{ padding: "2rem" }}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)" }}>
                    Submit Transaction Verification
                  </h2>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                    Provide your bKash payment reference after completing the Send Money transfer.
                  </p>
                </div>

                {formError && (
                  <div style={{
                    background: "var(--color-error-bg)",
                    color: "var(--color-error)",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    marginBottom: "1.25rem",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitVerification} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div className="form-group">
                    <label className="form-label">
                      Sender bKash Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01712345678"
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      className="input-field"
                      style={{ fontFamily: "monospace" }}
                    />
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
                      The phone number from which you performed the Send Money.
                    </span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Transaction ID (TrxID) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 8N7K92M4PL"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                      className="input-field"
                      style={{ fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}
                    />
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
                      Found in your bKash confirmation SMS or transaction statement.
                    </span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Amount Sent (BDT) *
                    </label>
                    <input
                      type="number"
                      required
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="input-field"
                      style={{ fontFamily: "monospace" }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Student Name or Reference Note (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mahmudur Rahman (Shibly) or reference note"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      fontWeight: 700,
                      fontSize: "var(--text-sm)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      marginTop: "0.5rem"
                    }}
                  >
                    {submitting ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Submitting Verification...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={16} />
                        <span>Verify and Activate Enrollment</span>
                      </>
                    )}
                  </button>
                </form>

                <div style={{
                  marginTop: "1.25rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--border-color)",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                  textAlign: "center"
                }}>
                  Security Notice: All submitted transaction IDs are cross verified against our official merchant logs. False submissions will result in account suspension.
                </div>
              </div>
            )}

            {/* Past Submissions for this Student */}
            {existingOrders.length > 0 && (
              <div className="card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                  Your Payment Submissions ({existingOrders.length})
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {existingOrders.map((o) => (
                    <div
                      key={o.order_id || o.id}
                      style={{
                        padding: "0.75rem",
                        background: "var(--bg-secondary)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                        fontSize: "var(--text-xs)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{o.course_title}</div>
                        <div style={{ color: "var(--text-muted)", marginTop: "0.15rem", fontFamily: "monospace" }}>
                          TrxID: {o.trx_id} | ৳{Number(o.amount).toLocaleString()}
                        </div>
                      </div>
                      <span className={`badge ${o.status === "paid" ? "badge-green" : o.status === "failed" ? "badge-red" : "badge-blue"}`}>
                        {o.status?.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="loading-container" style={{ padding: "8rem 0" }}>
        <p>Loading checkout portal...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
