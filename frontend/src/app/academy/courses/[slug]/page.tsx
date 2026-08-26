"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft, Clock, Award, CheckCircle2, PlayCircle, BookOpen,
  Shield, Video, FileText, CheckSquare, HelpCircle, ArrowRight
} from "lucide-react";
import BrandLoader from "@/components/BrandLoader";
import CustomModal from "@/components/CustomModal";

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
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "info" as "info" | "danger" | "confirm" | "success",
    title: "",
    message: ""
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/v1/courses/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setCourse(data);
          if (data?.title) {
            document.title = `${data.title} | ERAAO Academy`;
          }
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
        setModalConfig({
          isOpen: true,
          type: "info",
          title: "Enrollment Notice",
          message: err.detail || err.error?.message || "Enrollment failed. You might already be enrolled."
        });
      }
    } catch {
      setModalConfig({
        isOpen: true,
        type: "danger",
        title: "Connection Error",
        message: "Error connecting to server. Please try again."
      });
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
      return "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200";
    }
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200";
  };

  if (loading) {
    return <BrandLoader message="Loading course syllabus & lab details..." />;
  }

  if (error || !course) {
    return (
      <div className="empty-state card" style={{ maxWidth: "600px", margin: "5rem auto" }}>
        <BookOpen size={42} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
        <h2 className="empty-title">Course Not Found</h2>
        <p className="empty-text">
          The requested course syllabus could not be found or has been updated.
        </p>
        <Link href="/academy" className="btn btn-accent">
          Browse Catalog
        </Link>
      </div>
    );
  }

  const totalLessons = (course.modules || []).reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0);

  return (
    <div style={{ minHeight: "90vh", paddingBottom: "4rem", paddingTop: "2rem" }}>
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
            fontSize: "var(--text-sm)",
            marginBottom: "1.5rem"
          }}
        >
          <ArrowLeft size={16} /> Back to Catalog
        </button>

        {/* Hero Cover Header */}
        <div className="anim-fade-up" style={{
          position: "relative",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          background: "var(--bg-dark)",
          color: "white",
          padding: "3rem 2.5rem",
          marginBottom: "2.5rem",
          boxShadow: "var(--shadow-xl)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.25, zIndex: 1 }}>
            <Image
              src={getCourseImage(course.title)}
              alt={course.title}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div style={{ position: "relative", zIndex: 2, maxWidth: "750px" }}>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center", marginBottom: "1rem" }}>
              <span className="badge badge-blue">
                {course.level || "Intermediate"} Bootcamp
              </span>
              <span className="badge" style={{ background: "rgba(255, 255, 255, 0.1)", color: "var(--text-on-dark-subtle)" }}>
                {course.duration_hours ? `${course.duration_hours} Hours Content` : "Self-Paced Learning"}
              </span>
            </div>

            <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--text-on-dark)", letterSpacing: "-0.01em", lineHeight: "1.25", marginBottom: "1rem" }}>
              {course.title}
            </h1>

            <p style={{ color: "var(--text-on-dark-subtle)", fontSize: "var(--text-base)", lineHeight: "1.6", marginBottom: "1.75rem" }}>
              {course.short_description || course.description || "Master industry-standard practical skills with real-world hands-on lab exercises."}
            </p>

            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", fontSize: "var(--text-sm)", color: "var(--text-on-dark-muted)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <BookOpen size={16} style={{ color: "var(--accent-cyan)" }} />
                <span>{course.modules?.length || 0} Syllabus Modules</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <PlayCircle size={16} style={{ color: "var(--color-success)" }} />
                <span>{totalLessons} Interactive Lectures &amp; Labs</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Award size={16} style={{ color: "var(--color-warning)" }} />
                <span>Verified Graduation Badge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>

          {/* Left Column — Detailed Course Description & Syllabus Breakdown */}
          <div style={{ gridColumn: "span 2" }}>
            
            {/* Overview & What You Will Learn */}
            <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
                Course Overview
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: "1.65", marginBottom: "1.75rem", whiteSpace: "pre-line" }}>
                {course.description || "This comprehensive course provides in-depth technical knowledge and hands-on skill building designed by industry experts."}
              </p>

              <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
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
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                    <CheckCircle2 size={18} style={{ color: "var(--color-success)", flexShrink: 0, marginTop: "2px" }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Syllabus Modules */}
            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div>
                  <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)" }}>
                    Curriculum Syllabus
                  </h2>
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
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
                  <div key={mod.id} style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", marginBottom: "1.25rem", overflow: "hidden" }}>
                    <div style={{ padding: "1.15rem 1.25rem", background: "var(--bg-secondary)", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: mod.lessons?.length > 0 ? "1px solid var(--border-color)" : "none" }}>
                      <div>
                        <div style={{ fontSize: "var(--text-xs)", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase" }}>
                          Module {idx + 1}
                        </div>
                        <h4 style={{ fontSize: "var(--text-base)", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.15rem" }}>
                          {mod.title}
                        </h4>
                      </div>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>
                        {mod.lessons?.length || 0} {mod.lessons?.length === 1 ? "Lesson" : "Lessons"}
                      </span>
                    </div>

                    {mod.lessons && mod.lessons.length > 0 && (
                      <div style={{ padding: "0.75rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {mod.lessons.sort((a: any, b: any) => a.order - b.order).map((lesson: any) => (
                          <div key={lesson.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                              {lesson.content_type === "video" && <Video size={16} style={{ color: "var(--accent-blue)" }} />}
                              {lesson.content_type === "material" && <FileText size={16} style={{ color: "var(--color-success)" }} />}
                              {lesson.content_type === "assignment" && <CheckSquare size={16} style={{ color: "var(--color-warning)" }} />}
                              {lesson.content_type === "quiz" && <HelpCircle size={16} style={{ color: "var(--accent-violet)" }} />}
                              <span>{lesson.title}</span>
                            </div>
                            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>
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
            <div className="card" style={{ padding: "2rem", position: "sticky", top: "2rem", boxShadow: "var(--shadow-md)" }}>
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                  Tuition Price
                </span>
                <div style={{ fontSize: "var(--text-3xl)", fontWeight: 900, color: "var(--text-primary)", marginTop: "0.25rem" }}>
                  {course.price > 0 ? `৳${course.price} BDT` : "Free Access"}
                </div>
              </div>

              {enrollSuccess ? (
                <div style={{ background: "var(--color-success-bg)", border: "1px solid rgba(34, 197, 94, 0.3)", color: "var(--color-success)", padding: "1rem", borderRadius: "var(--radius-md)", textAlign: "center", fontWeight: 700, marginBottom: "1rem" }}>
                  <CheckCircle2 size={24} style={{ margin: "0 auto 0.5rem auto", display: "block" }} />
                  Enrollment Successful! Redirecting to workspace...
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="btn btn-accent"
                  style={{ width: "100%", padding: "0.85rem", fontSize: "var(--text-base)", marginBottom: "1.25rem" }}
                >
                  {enrolling ? "Enrolling..." : "Enroll & Start Learning"} <ArrowRight size={18} />
                </button>
              )}

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Shield size={16} style={{ color: "var(--accent-blue)" }} />
                  <span>Full Lifetime Access</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Award size={16} style={{ color: "var(--color-warning)" }} />
                  <span>Verified Credential Certificate</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Clock size={16} style={{ color: "var(--color-success)" }} />
                  <span>Learn at Your Own Pace</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <CustomModal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
}
