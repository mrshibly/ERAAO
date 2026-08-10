"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Play, CheckCircle2, Clock, Search, Filter, Sparkles, ArrowRight, Shield, Cpu } from "lucide-react";

export default function StudentCoursesPage() {
  const { token, user } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "in_progress" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
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

    if (token) fetchEnrollments();
  }, [token]);

  const filteredEnrollments = enrollments.filter((item) => {
    const titleMatches = item.course?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === "completed") return titleMatches && item.progress >= 100;
    if (filter === "in_progress") return titleMatches && item.progress < 100;
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
      {/* Page Header */}
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
              Student Portal • Course Vault
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              My Enrolled Courses & Labs
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
              Track your syllabus progress, access hands-on virtual labs, and earn credentials.
            </p>
          </div>
          <Link
            href="/academy"
            className="btn-academic-primary"
            style={{ textDecoration: "none", background: "var(--accent-blue)", color: "white" }}
          >
            <BookOpen size={16} /> Explore New Bootcamps
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
                padding: "0.6rem 1rem 0.6rem 2.5rem",
                color: "var(--text-primary)",
                fontSize: "0.875rem",
                outline: "none"
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "0.5rem", background: "var(--bg-primary)", padding: "0.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
            {[
              { id: "all", label: "All Syllabi" },
              { id: "in_progress", label: "In Progress" },
              { id: "completed", label: "Completed" }
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
          Loading your learning tracks...
        </div>
      ) : filteredEnrollments.length === 0 ? (
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
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>No enrolled courses found</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.4rem", maxWidth: "400px", margin: "0.4rem auto 1.5rem auto" }}>
            You haven't enrolled in any courses matching your filter criteria yet. Explore our catalog to get started.
          </p>
          <Link href="/academy" style={{
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
            Browse Academy Courses <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.75rem" }}>
          {filteredEnrollments.map((item) => {
            const course = item.course || {};
            const progress = Math.round(item.progress || 0);

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
                    <span>{progress >= 100 ? "Completed" : `${progress}% Done`}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: "1.35" }}>
                      {course.title || "Cybersecurity Course"}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.5" }}>
                      {course.description || "Master industry-standard security tools and practical lab exercises."}
                    </p>
                  </div>

                  {/* Progress Bar & Actions */}
                  <div style={{ marginTop: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                      <span>Syllabus Completion</span>
                      <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{progress}%</span>
                    </div>
                    <div style={{ height: "6px", background: "var(--border-color)", borderRadius: "4px", overflow: "hidden", marginBottom: "1.25rem" }}>
                      <div style={{ height: "100%", width: `${progress}%`, background: progress >= 100 ? "#10b981" : "var(--accent-blue)", borderRadius: "4px", transition: "width 0.4s ease" }} />
                    </div>

                    <Link
                      href={`/learn/${item.id}`}
                      style={{
                        width: "100%",
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
                      <span>{progress >= 100 ? "Review Course Syllabi" : "Continue Learning"}</span>
                    </Link>
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
