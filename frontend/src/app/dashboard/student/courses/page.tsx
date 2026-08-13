"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Play, CheckCircle2, Clock, Search, ArrowRight, Compass } from "lucide-react";

export default function StudentCoursesPage() {
  const { token, user, loading: authLoading } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "in_progress" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (authLoading) return;

    const fetchEnrollments = async () => {
      setLoading(true);
      try {
        if (!token) {
          setLoading(false);
          return;
        }
        const res = await fetch("/api/v1/enrollments/me", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setEnrollments(data);
        }
      } catch (err) {
        console.error("Error loading student courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [token, authLoading]);

  const filteredEnrollments = enrollments.filter((item) => {
    const courseTitle = item.course?.title || "";
    const titleMatches = courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const pct = item.progress ?? item.completion_pct ?? 0;
    if (filter === "completed") return titleMatches && pct >= 100;
    if (filter === "in_progress") return titleMatches && pct < 100;
    return titleMatches;
  });

  const getCourseImage = (title: string) => {
    const t = (title || "").toLowerCase();
    if (t.includes("hack") || t.includes("penetration") || t.includes("security") || t.includes("cyber")) {
      return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600";
    }
    if (t.includes("ai") || t.includes("intelligence") || t.includes("model") || t.includes("machine")) {
      return "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600";
    }
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600";
  };

  return (
    <div style={{ paddingBottom: "3rem" }}>
      {/* Page Header Card */}
      <div style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-lg)",
        padding: "2rem",
        marginBottom: "2rem",
        boxShadow: "var(--shadow-sm)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.25rem" }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
              Student Portal • My Learning
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              My Courses
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
              View your active courses and track your learning progress.
            </p>
          </div>

          <Link
            href="/dashboard/student/catalog"
            style={{
              background: "var(--accent-blue)",
              color: "white",
              padding: "0.65rem 1.25rem",
              borderRadius: "var(--radius-md)",
              fontWeight: 700,
              fontSize: "0.875rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(14, 165, 233, 0.25)"
            }}
          >
            <Compass size={16} /> <span>Find Courses</span>
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1.75rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
            <Search size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search your enrolled courses..."
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
              { id: "all", label: `All Courses (${enrollments.length})` },
              { id: "in_progress", label: `In Progress (${enrollments.filter(e => (e.progress ?? e.completion_pct ?? 0) < 100).length})` },
              { id: "completed", label: `Completed (${enrollments.filter(e => (e.progress ?? e.completion_pct ?? 0) >= 100).length})` }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id as any)}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  background: filter === t.id ? "var(--card-bg)" : "transparent",
                  color: filter === t.id ? "var(--accent-blue)" : "var(--text-secondary)",
                  fontWeight: filter === t.id ? 700 : 500,
                  fontSize: "0.825rem",
                  cursor: "pointer",
                  boxShadow: filter === t.id ? "var(--shadow-sm)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-secondary)" }}>
          Loading your courses...
        </div>
      ) : enrollments.length === 0 ? (
        <div style={{
          background: "var(--card-bg)",
          border: "1px dashed var(--border-color)",
          borderRadius: "var(--radius-lg)",
          padding: "4rem 2rem",
          textAlign: "center"
        }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(14, 165, 233, 0.1)", color: "var(--accent-blue)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto" }}>
            <BookOpen size={28} />
          </div>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)" }}>No enrolled courses found</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.35rem", maxWidth: "400px", margin: "0.35rem auto 1.5rem auto" }}>
            You haven't enrolled in any courses yet. Explore our course catalog to get started.
          </p>
          <Link href="/dashboard/student/catalog" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--accent-blue)",
            color: "white",
            padding: "0.65rem 1.5rem",
            borderRadius: "var(--radius-md)",
            fontWeight: 700,
            textDecoration: "none"
          }}>
            <Compass size={16} /> <span>Find Courses</span> <ArrowRight size={16} />
          </Link>
        </div>
      ) : filteredEnrollments.length === 0 ? (
        <div style={{
          background: "var(--card-bg)",
          border: "1px dashed var(--border-color)",
          borderRadius: "var(--radius-lg)",
          padding: "3rem 2rem",
          textAlign: "center"
        }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>No courses match your filter</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.35rem", marginBottom: "1.25rem" }}>
            No courses found under the "{filter.replace('_', ' ')}" tab or matching "{searchQuery}".
          </p>
          <button
            onClick={() => { setFilter("all"); setSearchQuery(""); }}
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
              padding: "0.5rem 1.25rem",
              borderRadius: "var(--radius-md)",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer"
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.75rem" }}>
          {filteredEnrollments.map((item) => {
            const course = item.course || {};
            const progress = Math.round(item.progress ?? item.completion_pct ?? 0);

            return (
              <div
                key={item.id}
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
                {/* Thumbnail */}
                <div style={{ height: "160px", position: "relative", overflow: "hidden", background: "#0f172a" }}>
                  <img
                    src={getCourseImage(course.title)}
                    alt={course.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    background: progress >= 100 ? "#10b981" : "rgba(15, 23, 42, 0.8)",
                    backdropFilter: "blur(6px)",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.6rem",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem"
                  }}>
                    {progress >= 100 ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    <span>{progress >= 100 ? "Completed" : `${progress}%`}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: "1.35" }}>
                      {course.title || "Untitled Course"}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.5" }}>
                      {course.description || "Interactive bootcamp syllabus with hands-on labs."}
                    </p>
                  </div>

                  {/* Progress Bar & Actions */}
                  <div style={{ marginTop: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                      <span>Course Progress</span>
                      <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{progress}%</span>
                    </div>
                    <div style={{ height: "6px", background: "var(--border-color)", borderRadius: "4px", overflow: "hidden", marginBottom: "1.25rem" }}>
                      <div style={{ height: "100%", width: `${progress}%`, background: progress >= 100 ? "#10b981" : "var(--accent-blue)", borderRadius: "4px", transition: "width 0.4s ease" }} />
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link
                        href={`/learn/${item.id}`}
                        style={{
                          flex: 1,
                          padding: "0.65rem",
                          borderRadius: "var(--radius-md)",
                          background: progress >= 100 ? "var(--bg-primary)" : "var(--accent-blue)",
                          color: progress >= 100 ? "var(--text-primary)" : "white",
                          border: progress >= 100 ? "1px solid var(--border-color)" : "none",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.4rem",
                          boxSizing: "border-box"
                        }}
                      >
                        <Play size={16} />
                        <span>{progress >= 100 ? "Review Course" : "Continue Learning"}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
