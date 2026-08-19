"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Play, CheckCircle2, Clock, Search, ArrowRight, Compass } from "lucide-react";

export default function StudentCoursesPage() {
  const { token, loading: authLoading } = useAuth();
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
      return "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600";
    }
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600";
  };

  return (
    <div style={{ paddingBottom: "3rem" }}>
      {/* Page Header Card */}
      <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.25rem" }}>
          <div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
              Student Portal • My Learning
            </div>
            <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              My Courses
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginTop: "0.25rem" }}>
              View your active courses and track your learning progress.
            </p>
          </div>

          <Link
            href="/dashboard/student/catalog"
            className="btn btn-accent"
            style={{
              padding: "0.65rem 1.25rem",
              fontSize: "var(--text-sm)"
            }}
          >
            <Compass size={16} /> <span>Find Courses</span>
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="controls-bar" style={{ marginTop: "1.75rem" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
            <Search size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search your enrolled courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: "2.5rem" }}
            />
          </div>

          <div className="filter-pills">
            {[
              { id: "all", label: `All Courses (${enrollments.length})` },
              { id: "in_progress", label: `In Progress (${enrollments.filter(e => (e.progress ?? e.completion_pct ?? 0) < 100).length})` },
              { id: "completed", label: `Completed (${enrollments.filter(e => (e.progress ?? e.completion_pct ?? 0) >= 100).length})` }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id as any)}
                className={`filter-pill ${filter === t.id ? "active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses List */}
      {loading ? (
        <div className="loading-container" style={{ padding: "4rem 0" }}>
          Loading your courses...
        </div>
      ) : enrollments.length === 0 ? (
        <div className="empty-state card" style={{ padding: "4rem 2rem" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--accent-blue-bg)", color: "var(--accent-blue)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto" }}>
            <BookOpen size={28} />
          </div>
          <h3 className="empty-title">No enrolled courses found</h3>
          <p className="empty-text">
            You haven't enrolled in any courses yet. Explore our course catalog to get started.
          </p>
          <Link href="/dashboard/student/catalog" className="btn btn-primary" style={{ marginTop: "1rem" }}>
            <Compass size={16} /> <span>Find Courses</span> <ArrowRight size={16} />
          </Link>
        </div>
      ) : filteredEnrollments.length === 0 ? (
        <div className="empty-state card" style={{ padding: "3rem 2rem" }}>
          <h3 className="empty-title">No courses match your filter</h3>
          <p className="empty-text">
            No courses found under the "{filter.replace('_', ' ')}" tab or matching "{searchQuery}".
          </p>
          <button
            onClick={() => { setFilter("all"); setSearchQuery(""); }}
            className="btn btn-outline"
            style={{ marginTop: "1rem" }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="card-grid">
          {filteredEnrollments.map((item) => {
            const course = item.course || {};
            const progress = Math.round(item.progress ?? item.completion_pct ?? 0);

            return (
              <div
                key={item.id}
                className="card hover-lift"
                style={{
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  padding: 0
                }}
              >
                {/* Thumbnail */}
                <div style={{ height: "160px", position: "relative", overflow: "hidden", background: "var(--bg-dark)" }}>
                  <img
                    src={getCourseImage(course.title)}
                    alt={course.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    background: progress >= 100 ? "var(--color-success)" : "rgba(15, 23, 42, 0.8)",
                    backdropFilter: "blur(6px)",
                    color: "white",
                    fontSize: "var(--text-xs)",
                    fontWeight: 700,
                    padding: "0.25rem 0.6rem",
                    borderRadius: "var(--radius-sm)",
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
                    <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: "1.35" }}>
                      {course.title || "Untitled Course"}
                    </h3>
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.5" }}>
                      {course.description || "Interactive bootcamp syllabus with hands-on labs."}
                    </p>
                  </div>

                  {/* Progress Bar & Actions */}
                  <div style={{ marginTop: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                      <span>Course Progress</span>
                      <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{progress}%</span>
                    </div>
                    <div className="progress-bar" style={{ marginBottom: "1.25rem" }}>
                      <div className="progress-bar-fill" style={{ width: `${progress}%`, background: progress >= 100 ? "var(--color-success)" : "var(--accent-blue)" }} />
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link
                        href={`/learn/${item.id}`}
                        className={`btn ${progress >= 100 ? "btn-outline" : "btn-primary"}`}
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          fontSize: "var(--text-sm)"
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
