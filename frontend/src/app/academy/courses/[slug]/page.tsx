"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft, Clock, Award, CheckCircle2, PlayCircle, BookOpen,
  Shield, Check, User, Sparkles, HelpCircle, FileText, Video,
  CheckSquare, ArrowRight, Lock
} from "lucide-react";
import BrandLoader from "@/components/BrandLoader";

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const router = useRouter();
  const { user, token } = useAuth();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/v1/courses/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setCourse(data);
        } else {
          setError("Course not found.");
        }
      } catch {
        setError("Error connecting to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  const handleEnroll = async () => {
    if (!user) {
      router.push(`/login?redirect=/academy/courses/${slug}`);
      return;
    }

    setEnrolling(true);
    try {
      const res = await fetch("/api/v1/enrollments", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ course_id: course.id })
      });

      if (res.ok) {
        const enrollment = await res.json();
        setEnrollSuccess(true);
        setTimeout(() => {
          router.push(`/learn/${enrollment.id}`);
        }, 1200);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.detail || err.error?.message || "Enrollment failed. You might already be enrolled.");
      }
    } catch {
      alert("Error connecting to server.");
    } finally {
      setEnrolling(false);
    }
  };

  const getCourseImage = (title: string) => {
    const t = (title || "").toLowerCase();
    if (t.includes("hack") || t.includes("penetration") || t.includes("security") || t.includes("cyber")) {
      return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200";
    }
    if (t.includes("ai") || t.includes("intelligence") || t.includes("model") || t.includes("machine")) {
      return "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=1200";
    }
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200";
  };

  if (loading) {
    return <BrandLoader message="Loading course syllabus & lab details..." />;
  }

  if (error || !course) {
    return (
      <div style={{ maxWidth: "600px", margin: "5rem auto", padding: "3rem 2rem", textAlign: "center", background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)" }}>
        <BookOpen size={42} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Course Not Found</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
          The requested course syllabus could not be found or has been updated.
        </p>
        <Link href="/dashboard/student/catalog" style={{ background: "var(--accent-blue)", color: "white", padding: "0.6rem 1.25rem", borderRadius: "var(--radius-md)", fontWeight: 700, textDecoration: "none" }}>
          Browse Catalog
        </Link>
      </div>
    );
  }

  const totalLessons = (course.modules || []).reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0);

  return (
    <div style={{ minHeight: "90vh", paddingBottom: "4rem", paddingTop: "2rem" }}>
      <style>{`
        .course-hero-cover {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #0f172a;
          color: white;
          padding: 3rem 2.5rem;
          margin-bottom: 2.5rem;
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .detail-layout-grid {
          display: grid;
          grid-template-columns: 2.4fr 1fr;
          gap: 2.5rem;
        }
        @media (max-width: 1024px) {
          .detail-layout-grid { grid-template-columns: 1fr; }
        }
        .enroll-sticky-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 2rem;
          position: sticky;
          top: 2rem;
          box-shadow: var(--shadow-md);
        }
        .module-accordion-item {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
          overflow: hidden;
        }
      `}</style>

      <div className="container">
        
        {/* Back button */}
        <button
          onClick={() => router.back()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "none",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "0.875rem",
            marginBottom: "1.5rem"
          }}
        >
          <ArrowLeft size={16} /> Back to Catalog
        </button>

        {/* Hero Cover Header */}
        <div className="course-hero-cover anim-fade-up">
          <div style={{ position: "absolute", inset: 0, opacity: 0.25, zIndex: 1 }}>
            <img src={getCourseImage(course.title)} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          <div style={{ position: "relative", zIndex: 2, maxWidth: "750px" }}>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ background: "rgba(14, 165, 233, 0.25)", border: "1px solid rgba(14, 165, 233, 0.4)", color: "#38bdf8", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase" }}>
                {course.level || "Intermediate"} Bootcamp
              </span>
              <span style={{ background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.2)", color: "#e2e8f0", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600 }}>
                {course.duration_hours ? `${course.duration_hours} Hours Content` : "Self-Paced Learning"}
              </span>
            </div>

            <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em", lineHeight: "1.25", marginBottom: "1rem" }}>
              {course.title}
            </h1>

            <p style={{ color: "#cbd5e1", fontSize: "1.05rem", lineHeight: "1.6", marginBottom: "1.75rem" }}>
              {course.short_description || course.description || "Master industry-standard practical skills with real-world hands-on lab exercises."}
            </p>

            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", fontSize: "0.875rem", color: "#94a3b8" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <BookOpen size={16} style={{ color: "#38bdf8" }} />
                <span>{course.modules?.length || 0} Syllabus Modules</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <PlayCircle size={16} style={{ color: "#10b981" }} />
                <span>{totalLessons} Interactive Lectures & Labs</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Award size={16} style={{ color: "#f59e0b" }} />
                <span>Verified Graduation Badge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="detail-layout-grid">

          {/* Left Column — Detailed Course Description & Syllabus Breakdown */}
          <div>
            
            {/* Overview & What You Will Learn */}
            <div style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "2rem", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
                Course Overview
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.65", marginBottom: "1.75rem", whiteSpace: "pre-line" }}>
                {course.description || "This comprehensive course provides in-depth technical knowledge and hands-on skill building designed by industry experts."}
              </p>

              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
                What You Will Learn
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  "Hands-on practical lab environments",
                  "Industry-aligned technical frameworks",
                  "Real-world case studies and vulnerability audits",
                  "1-on-1 technical instructor support desk",
                  "Verified digital certificate of completion",
                  "Lifetime access to syllabus updates"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.875rem", color: "var(--text-primary)" }}>
                    <CheckCircle2 size={18} style={{ color: "#10b981", flexShrink: 0, marginTop: "2px" }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Syllabus Modules */}
            <div style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>
                    Curriculum Syllabus
                  </h2>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                    {course.modules?.length || 0} Modules &bull; {totalLessons} Lectures
                  </p>
                </div>
              </div>

              {(!course.modules || course.modules.length === 0) ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                  Syllabus details are currently being finalized by the instructor team.
                </div>
              ) : (
                course.modules.sort((a: any, b: any) => a.order - b.order).map((mod: any, idx: number) => (
                  <div key={mod.id} className="module-accordion-item">
                    <div style={{ padding: "1.15rem 1.25rem", background: "var(--bg-primary)", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: mod.lessons?.length > 0 ? "1px solid var(--border-color)" : "none" }}>
                      <div>
                        <div style={{ fontSize: "0.72rem", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase" }}>
                          Module {idx + 1}
                        </div>
                        <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.15rem" }}>
                          {mod.title}
                        </h4>
                      </div>
                      <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>
                        {mod.lessons?.length || 0} {mod.lessons?.length === 1 ? "Lesson" : "Lessons"}
                      </span>
                    </div>

                    {mod.lessons && mod.lessons.length > 0 && (
                      <div style={{ padding: "0.75rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {mod.lessons.sort((a: any, b: any) => a.order - b.order).map((lesson: any) => (
                          <div key={lesson.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", fontSize: "0.875rem", color: "var(--text-primary)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                              {lesson.content_type === "video" && <Video size={16} style={{ color: "var(--accent-blue)" }} />}
                              {lesson.content_type === "material" && <FileText size={16} style={{ color: "#10b981" }} />}
                              {lesson.content_type === "assignment" && <CheckSquare size={16} style={{ color: "#f59e0b" }} />}
                              {lesson.content_type === "quiz" && <HelpCircle size={16} style={{ color: "#8b5cf6" }} />}
                              <span>{lesson.title}</span>
                            </div>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                              {lesson.duration_minutes ? `${lesson.duration_minutes}m` : "Self-paced"}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

          </div>

          {/* Right Column — Enrollment / Purchase Action Box */}
          <div>
            <div className="enroll-sticky-card">
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                  Tuition Price
                </span>
                <div style={{ fontSize: "2.25rem", fontWeight: 900, color: "var(--text-primary)", marginTop: "0.25rem" }}>
                  {course.price > 0 ? `৳${course.price} BDT` : "Free Access"}
                </div>
              </div>

              {enrollSuccess ? (
                <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#10b981", padding: "1rem", borderRadius: "var(--radius-md)", textAlign: "center", fontWeight: 700, marginBottom: "1rem" }}>
                  <CheckCircle2 size={24} style={{ margin: "0 auto 0.5rem auto", display: "block" }} />
                  Enrollment Successful! Redirecting to workspace...
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  style={{
                    width: "100%",
                    padding: "0.85rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--accent-blue)",
                    color: "white",
                    border: "none",
                    fontWeight: 800,
                    fontSize: "1rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: "0 6px 18px rgba(14, 165, 233, 0.35)",
                    marginBottom: "1.25rem"
                  }}
                >
                  {enrolling ? "Enrolling..." : "Enroll & Start Learning"} <ArrowRight size={18} />
                </button>
              )}

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.825rem", color: "var(--text-secondary)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Shield size={16} style={{ color: "var(--accent-blue)" }} />
                  <span>Full Lifetime Access</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Award size={16} style={{ color: "#f59e0b" }} />
                  <span>Verified Credential Certificate</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Clock size={16} style={{ color: "#10b981" }} />
                  <span>Learn at Your Own Pace</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
