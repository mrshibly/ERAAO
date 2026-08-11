"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, Loader, Eye, ArrowRight } from "lucide-react";

export default function AcademyPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/v1/courses?page=1&page_size=50");
        if (res.ok) {
          const body = await res.json();
          setCourses(body.items || []);
        }
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const getCourseThumbnail = (title: string) => {
    const t = (title || "").toLowerCase();
    if (t.includes("cyber") || t.includes("hack") || t.includes("security") || t.includes("pentest") || t.includes("defense")) {
      return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80&auto=format&fit=crop";
    }
    if (t.includes("ai") || t.includes("llm") || t.includes("gpt") || t.includes("machine") || t.includes("model") || t.includes("intelligence")) {
      return "https://images.unsplash.com/photo-1677442136019-21780efad995?w=600&q=80&auto=format&fit=crop";
    }
    return "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80&auto=format&fit=crop";
  };

  return (
    <div style={{ padding: "4rem 0" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{
            display: "inline-block",
            background: "rgba(14, 165, 233, 0.08)",
            color: "var(--accent-blue)",
            padding: "0.35rem 1rem",
            borderRadius: "4px",
            fontSize: "0.8rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "1rem"
          }}>
            Academy Bootcamps
          </span>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Course Catalog</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginTop: "0.5rem", maxWidth: "35rem", margin: "0.5rem auto 0 auto" }}>
            Explore our hands-on cybersecurity and applied AI courses. Click any course to view full syllabus details, modules, and labs.
          </p>
        </div>

        {/* Course Cards Grid */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
            <Loader className="animate-spin text-accent" style={{ color: "var(--accent-blue)" }} size={32} />
          </div>
        ) : courses.length === 0 ? (
          <div style={{ background: "white", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "4rem 2rem", textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>No active courses currently listed in the catalog.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2.5rem" }}>
            {courses.map((course) => (
              <div key={course.id} className="premium-card hover-lift" style={{ height: "100%", display: "flex", flexDirection: "column", padding: 0, overflow: "hidden" }}>
                
                {/* Cover Image -> Links to Course Details Page */}
                <Link href={`/academy/courses/${course.slug}`} style={{ height: "185px", overflow: "hidden", position: "relative", display: "block" }}>
                  <img
                    src={getCourseThumbnail(course.title)}
                    alt={course.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    background: "rgba(15, 23, 42, 0.8)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "white",
                    textTransform: "capitalize"
                  }}>
                    {course.level}
                  </div>
                </Link>

                <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", color: "var(--accent-blue)", marginBottom: "0.5rem" }}>
                    Practitioner Track
                  </span>

                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--text-primary)", lineHeight: 1.3 }}>
                    <Link href={`/academy/courses/${course.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {course.title}
                    </Link>
                  </h3>

                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1.5rem", flex: "1" }}>
                    {course.short_description}
                  </p>

                  <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                    <div style={{ display: "flex", gap: "1rem", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <Clock size={14} />
                        {course.duration_hours || 10} hours
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <BookOpen size={14} />
                        Practice Labs
                      </span>
                    </div>
                    <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>
                      ৳{course.price} BDT
                    </span>
                  </div>

                  {/* Primary Button ALWAYS routes to Course Details Page */}
                  <Link
                    href={`/academy/courses/${course.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.25rem",
                      borderRadius: "var(--radius-md)",
                      background: "var(--accent-blue)",
                      color: "white",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      boxShadow: "0 4px 12px rgba(14, 165, 233, 0.25)"
                    }}
                  >
                    <span>View Course Details</span> <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
