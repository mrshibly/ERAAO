"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen, Search, Filter, Sparkles, CheckCircle2, Play, Plus, Clock,
  Award, Shield, Cpu, ChevronRight, X, ArrowRight, User, Layers
} from "lucide-react";

export default function StudentCatalogPage() {
  const router = useRouter();
  const { token, user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [myEnrollments, setMyEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [enrollSuccessMsg, setEnrollSuccessMsg] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // 1. Fetch published courses
      const courseRes = await fetch(`/api/v1/courses?page_size=50${levelFilter !== "all" ? `&level=${levelFilter}` : ""}`);
      if (courseRes.ok) {
        const data = await courseRes.json();
        setCourses(data.items || []);
      }

      // 2. Fetch student's active enrollments to check enrollment status
      if (token) {
        const enrollRes = await fetch("/api/v1/enrollments/me", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (enrollRes.ok) {
          setMyEnrollments(await enrollRes.json());
        }
      }
    } catch (err) {
      console.error("Catalog fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, levelFilter]);

  // Check if student is already enrolled in a given course_id
  const getEnrollmentForCourse = (courseId: string) => {
    return myEnrollments.find((e) => e.course_id === courseId || e.course?.id === courseId);
  };

  const handleEnroll = async (courseId: string) => {
    if (!token) {
      router.push("/login");
      return;
    }

    setEnrollingId(courseId);
    setEnrollSuccessMsg(null);

    try {
      const res = await fetch("/api/v1/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ course_id: courseId })
      });

      if (res.ok) {
        const newEnrollment = await res.json();
        setEnrollSuccessMsg("Successfully enrolled! Redirecting to course...");
        setMyEnrollments((prev) => [...prev, newEnrollment]);
        setTimeout(() => {
          router.push(`/learn/${newEnrollment.id}`);
        }, 1200);
      } else {
        const errData = await res.json();
        alert(errData.detail || "Enrollment failed. Please try again.");
      }
    } catch (err) {
      console.error("Enrollment error:", err);
      alert("Network error during enrollment.");
    } finally {
      setEnrollingId(null);
    }
  };

  const filteredCourses = courses.filter((c) =>
    (c.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCourseImage = (title: string) => {
    const t = (title || "").toLowerCase();
    if (t.includes("hack") || t.includes("penetration") || t.includes("security") || t.includes("defense") || t.includes("cyber")) {
      return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600";
    }
    if (t.includes("ai") || t.includes("intelligence") || t.includes("machine") || t.includes("model") || t.includes("neural")) {
      return "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600";
    }
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600";
  };

  return (
    <div style={{ paddingBottom: "3rem" }}>
      {/* Success Banner */}
      {enrollSuccessMsg && (
        <div style={{
          position: "fixed",
          top: "1.5rem",
          right: "1.5rem",
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "white",
          padding: "1rem 1.5rem",
          borderRadius: "14px",
          boxShadow: "0 10px 25px rgba(16, 185, 129, 0.35)",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          fontWeight: 700,
          fontSize: "0.9rem"
        }}>
          <CheckCircle2 size={20} />
          <span>{enrollSuccessMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-lg)",
        padding: "2rem",
        marginBottom: "2rem",
        boxShadow: "var(--shadow-sm)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
              Student Portal • Course Catalog
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              Explore & Enroll in Bootcamps
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
              Browse ERAAO's cybersecurity and applied AI courses. Click any bootcamp to view syllabus details and enroll instantly.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link
              href="/dashboard/student/courses"
              style={{
                background: "var(--bg-primary)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                padding: "0.6rem 1.25rem",
                borderRadius: "var(--radius-md)",
                fontWeight: 700,
                fontSize: "0.85rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem"
              }}
            >
              <BookOpen size={16} /> My Vault ({myEnrollments.length})
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1.75rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
            <Search size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search catalog by title, skill, or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                background: "var(--bg-primary)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                padding: "0.65rem 1rem 0.65rem 2.5rem",
                color: "var(--text-primary)",
                fontSize: "0.875rem",
                outline: "none"
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "0.5rem", background: "var(--bg-primary)", padding: "0.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
            {[
              { id: "all", label: "All Levels" },
              { id: "beginner", label: "Beginner" },
              { id: "intermediate", label: "Intermediate" },
              { id: "advanced", label: "Advanced" }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setLevelFilter(t.id)}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  background: levelFilter === t.id ? "var(--card-bg)" : "transparent",
                  color: levelFilter === t.id ? "var(--accent-blue)" : "var(--text-secondary)",
                  fontWeight: levelFilter === t.id ? 700 : 500,
                  fontSize: "0.825rem",
                  cursor: "pointer",
                  boxShadow: levelFilter === t.id ? "var(--shadow-sm)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-secondary)" }}>
          Loading course catalog...
        </div>
      ) : filteredCourses.length === 0 ? (
        <div style={{
          background: "var(--card-bg)",
          border: "1px dashed var(--border-color)",
          borderRadius: "var(--radius-lg)",
          padding: "4rem 2rem",
          textAlign: "center"
        }}>
          <BookOpen size={40} style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }} />
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>No courses found</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.4rem" }}>
            Try adjusting your search terms or difficulty filter.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: "1.75rem" }}>
          {filteredCourses.map((course) => {
            const enrollment = getEnrollmentForCourse(course.id);
            const isEnrolled = !!enrollment;
            const isEnrolling = enrollingId === course.id;

            return (
              <div
                key={course.id}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.3s ease"
                }}
                className="hover-lift"
              >
                {/* Image Header */}
                <div style={{ height: "165px", position: "relative", overflow: "hidden", background: "#0f172a" }}>
                  <img
                    src={getCourseImage(course.title)}
                    alt={course.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "0.75rem",
                    left: "0.75rem",
                    background: "rgba(15, 23, 42, 0.85)",
                    backdropFilter: "blur(6px)",
                    color: "#38bdf8",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.6rem",
                    borderRadius: "6px",
                    textTransform: "uppercase"
                  }}>
                    {course.level || "Bootcamp"}
                  </div>

                  {isEnrolled && (
                    <div style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      background: "#10b981",
                      color: "white",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem"
                    }}>
                      <CheckCircle2 size={12} /> ENROLLED
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3
                      onClick={() => setSelectedCourse(course)}
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                        marginBottom: "0.4rem",
                        lineHeight: "1.35",
                        cursor: "pointer"
                      }}
                    >
                      {course.title}
                    </h3>
                    <p style={{
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: "1.5"
                    }}>
                      {course.description || "Practical, hands-on bootcamp with labs and certification."}
                    </p>
                  </div>

                  {/* Actions & Details Button */}
                  <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Link
                      href={`/academy/courses/${course.slug}`}
                      style={{
                        padding: "0.6rem 0.85rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-primary)",
                        color: "var(--text-primary)",
                        fontWeight: 700,
                        fontSize: "0.825rem",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem"
                      }}
                    >
                      View Details
                    </Link>

                    {isEnrolled ? (
                      <Link
                        href={`/learn/${enrollment.id}`}
                        style={{
                          flex: 1,
                          padding: "0.6rem",
                          borderRadius: "var(--radius-md)",
                          background: "#10b981",
                          color: "white",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.4rem"
                        }}
                      >
                        <Play size={14} /> Continue
                      </Link>
                    ) : (
                      <button
                        disabled={isEnrolling}
                        onClick={() => handleEnroll(course.id)}
                        style={{
                          flex: 1,
                          padding: "0.6rem",
                          borderRadius: "var(--radius-md)",
                          background: "var(--accent-blue)",
                          color: "white",
                          border: "none",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          cursor: isEnrolling ? "not-allowed" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.4rem",
                          boxShadow: "0 4px 10px rgba(14, 165, 233, 0.25)"
                        }}
                      >
                        <Plus size={16} />
                        <span>{isEnrolling ? "Enrolling..." : "Enroll Now"}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(6px)",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem"
        }}>
          <div style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-lg)",
            width: "100%",
            maxWidth: "600px",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "2rem",
            position: "relative"
          }} className="anim-fade-up">

            <button
              onClick={() => setSelectedCourse(null)}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "var(--bg-primary)",
                border: "1px solid var(--border-color)",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                cursor: "pointer"
              }}
            >
              <X size={18} />
            </button>

            <div style={{ fontSize: "0.75rem", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.4rem" }}>
              {selectedCourse.level || "Bootcamp"} • Syllabus Overview
            </div>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              {selectedCourse.title}
            </h2>

            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              {selectedCourse.description}
            </p>

            {/* Course Features */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ background: "var(--bg-primary)", padding: "0.85rem 1rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Hands-on Labs</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "2px" }}>Virtual Cloud Lab Included</div>
              </div>

              <div style={{ background: "var(--bg-primary)", padding: "0.85rem 1rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Certificate</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--accent-emerald)", marginTop: "2px" }}>Cryptographic Verified Badge</div>
              </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
              <button
                onClick={() => setSelectedCourse(null)}
                style={{
                  padding: "0.75rem 1.25rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-primary)",
                  color: "var(--text-secondary)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer"
                }}
              >
                Close
              </button>

              {getEnrollmentForCourse(selectedCourse.id) ? (
                <Link
                  href={`/learn/${getEnrollmentForCourse(selectedCourse.id).id}`}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    background: "#10b981",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                >
                  <Play size={16} /> Continue Learning
                </Link>
              ) : (
                <button
                  disabled={enrollingId === selectedCourse.id}
                  onClick={() => {
                    handleEnroll(selectedCourse.id);
                    setSelectedCourse(null);
                  }}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--accent-blue)",
                    color: "white",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: "0 6px 16px rgba(14, 165, 233, 0.3)"
                  }}
                >
                  <Plus size={18} />
                  <span>{enrollingId === selectedCourse.id ? "Enrolling..." : "Enroll in Bootcamp Now"}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
