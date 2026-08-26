"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen, Search, CheckCircle2, Play, Plus
} from "lucide-react";

import CustomModal from "@/components/CustomModal";

export default function StudentCatalogPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [myEnrollments, setMyEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [enrollSuccessMsg, setEnrollSuccessMsg] = useState<string | null>(null);
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; title: string; message: string; type: "info" | "danger" }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

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

    const existing = getEnrollmentForCourse(courseId);
    if (existing) {
      router.push(`/learn/${existing.id}`);
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
        }, 1000);
      } else {
        const enrollRes = await fetch("/api/v1/enrollments/me", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (enrollRes.ok) {
          const fresh = await enrollRes.json();
          setMyEnrollments(fresh);
          const matched = fresh.find((e: any) => e.course_id === courseId || e.course?.id === courseId);
          if (matched) {
            router.push(`/learn/${matched.id}`);
            return;
          }
        }
        const errData = await res.json().catch(() => ({}));
        setModalConfig({
          isOpen: true,
          type: "info",
          title: "Enrollment Notice",
          message: errData.detail || "Enrollment notice."
        });
      }
    } catch (err) {
      console.error("Enrollment error:", err);
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
      return "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600";
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
          background: "linear-gradient(135deg, var(--color-success) 0%, #059669 100%)",
          color: "white",
          padding: "1rem 1.5rem",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-lg)",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          fontWeight: 700,
          fontSize: "var(--text-sm)"
        }}>
          <CheckCircle2 size={20} />
          <span>{enrollSuccessMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
              Student Portal • Course Catalog
            </div>
            <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              Explore &amp; Enroll in Bootcamps
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginTop: "0.25rem" }}>
              Browse ERAAO's cybersecurity and applied AI courses. Click any bootcamp to view syllabus details and enroll instantly.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link
              href="/dashboard/student/courses"
              className="btn btn-outline"
              style={{
                fontSize: "var(--text-sm)"
              }}
            >
              <BookOpen size={16} /> My Vault ({myEnrollments.length})
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: "1.75rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid var(--border-color)"
        }}>
          <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
            <Search size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search catalog by title, skill, or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: "2.5rem", borderRadius: "var(--radius-lg)" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
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
                  borderRadius: "var(--radius-full)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: levelFilter === t.id ? "1px solid var(--accent-blue)" : "1px solid var(--border-color)",
                  background: levelFilter === t.id ? "var(--accent-blue)" : "var(--bg-primary)",
                  color: levelFilter === t.id ? "#ffffff" : "var(--text-secondary)",
                  boxShadow: levelFilter === t.id ? "0 2px 10px rgba(59, 130, 246, 0.25)" : "none"
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
        <div className="loading-container" style={{ padding: "4rem 0" }}>
          Loading course catalog...
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="empty-state card" style={{ padding: "4rem 2rem" }}>
          <BookOpen size={40} style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }} />
          <h3 className="empty-title">No courses found</h3>
          <p className="empty-text">
            Try adjusting your search terms or difficulty filter.
          </p>
        </div>
      ) : (
        <div className="card-grid">
          {filteredCourses.map((course) => {
            const enrollment = getEnrollmentForCourse(course.id);
            const isEnrolled = !!enrollment;
            const isEnrolling = enrollingId === course.id;

            return (
              <div
                key={course.id}
                className="card hover-lift"
                style={{
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  padding: 0
                }}
              >
                {/* Image Header */}
                <div style={{ height: "165px", position: "relative", overflow: "hidden", background: "var(--bg-dark)" }}>
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
                    color: "var(--accent-blue)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 700,
                    padding: "0.25rem 0.6rem",
                    borderRadius: "var(--radius-sm)",
                    textTransform: "uppercase"
                  }}>
                    {course.level || "Bootcamp"}
                  </div>

                  {isEnrolled && (
                    <div style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      background: "var(--color-success)",
                      color: "white",
                      fontSize: "var(--text-xs)",
                      fontWeight: 800,
                      padding: "0.25rem 0.6rem",
                      borderRadius: "var(--radius-sm)",
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
                      style={{
                        fontSize: "var(--text-base)",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                        marginBottom: "0.4rem",
                        lineHeight: "1.35"
                      }}
                    >
                      {course.title}
                    </h3>
                    <p style={{
                      fontSize: "var(--text-xs)",
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
                      className="btn btn-outline"
                      style={{
                        padding: "0.6rem 0.85rem",
                        fontSize: "var(--text-xs)"
                      }}
                    >
                      View Details
                    </Link>

                    {isEnrolled ? (
                      <Link
                        href={`/learn/${enrollment.id}`}
                        className="btn btn-accent"
                        style={{
                          flex: 1,
                          fontSize: "var(--text-xs)",
                          backgroundColor: "var(--color-success)"
                        }}
                      >
                        <Play size={14} /> Continue
                      </Link>
                    ) : (
                      <button
                        disabled={isEnrolling}
                        onClick={() => handleEnroll(course.id)}
                        className="btn btn-primary"
                        style={{
                          flex: 1,
                          fontSize: "var(--text-xs)"
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

      <CustomModal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
