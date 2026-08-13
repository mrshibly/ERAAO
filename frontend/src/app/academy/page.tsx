"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, Loader, Search, ArrowRight, ChevronLeft, ChevronRight, X, Filter } from "lucide-react";

export default function AcademyPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);
  const [total, setTotal] = useState(0);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/v1/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch courses with pagination, search, and filters
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.set("page", page.toString());
        queryParams.set("page_size", pageSize.toString());
        if (searchQuery.trim()) queryParams.set("search", searchQuery.trim());
        if (selectedLevel !== "all") queryParams.set("level", selectedLevel);
        if (selectedCategory !== "all") queryParams.set("category_id", selectedCategory);

        const res = await fetch(`/api/v1/courses?${queryParams.toString()}`);
        if (res.ok) {
          const body = await res.json();
          setCourses(body.items || []);
          setTotal(body.total || 0);
        }
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchCourses();
    }, 250);

    return () => clearTimeout(timer);
  }, [page, pageSize, searchQuery, selectedLevel, selectedCategory]);

  const totalPages = Math.ceil(total / pageSize) || 1;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedLevel("all");
    setSelectedCategory("all");
    setPage(1);
  };

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
    <div style={{ padding: "4rem 0", background: "var(--bg-secondary)", minHeight: "100vh" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginTop: "0.5rem", maxWidth: "38rem", margin: "0.5rem auto 0 auto" }}>
            Explore our hands-on cybersecurity and applied AI courses. Filter by topic or level to begin your learning path.
          </p>
        </div>

        {/* Controls Bar: Search & Filters */}
        <div style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem 1.5rem",
          marginBottom: "2.5rem",
          boxShadow: "var(--shadow-sm)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            
            {/* Live Search Input */}
            <div style={{ flex: "1 1 280px", position: "relative" }}>
              <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Search bootcamps, topics, or skills..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                style={{
                  width: "100%",
                  padding: "0.7rem 2.5rem 0.7rem 2.75rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem",
                  outline: "none"
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setPage(1);
                  }}
                  style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Filter Dropdown */}
            <div style={{ flex: "0 1 200px" }}>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                style={{
                  width: "100%",
                  padding: "0.7rem 1rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters Button */}
            {(searchQuery || selectedLevel !== "all" || selectedCategory !== "all") && (
              <button
                onClick={handleResetFilters}
                style={{
                  padding: "0.65rem 1rem",
                  background: "none",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <X size={14} /> Clear Filters
              </button>
            )}

          </div>

          {/* Level Filter Pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", paddingTop: "0.5rem", borderTop: "1px solid var(--border-color)" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginRight: "0.5rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Filter size={12} /> Level:
            </span>
            {["all", "beginner", "intermediate", "advanced"].map((lvl) => {
              const active = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => {
                    setSelectedLevel(lvl);
                    setPage(1);
                  }}
                  style={{
                    padding: "0.35rem 0.85rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    textTransform: "capitalize",
                    transition: "all 0.2s ease",
                    border: active ? "1px solid var(--accent-blue)" : "1px solid var(--border-color)",
                    background: active ? "var(--accent-blue)" : "var(--bg-primary)",
                    color: active ? "white" : "var(--text-secondary)"
                  }}
                >
                  {lvl === "all" ? "All Levels" : lvl}
                </button>
              );
            })}

            {/* Total Results Counter */}
            <span style={{ marginLeft: "auto", fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: 600 }}>
              Showing {courses.length > 0 ? (page - 1) * pageSize + 1 : 0}-{Math.min(page * pageSize, total)} of {total} courses
            </span>
          </div>
        </div>

        {/* Course Cards Grid */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "5rem 0" }}>
            <Loader className="animate-spin text-accent" style={{ color: "var(--accent-blue)" }} size={36} />
          </div>
        ) : courses.length === 0 ? (
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "4rem 2rem", textAlign: "center" }}>
            <BookOpen size={42} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>No Matching Bootcamps Found</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              Try adjusting your search query, selecting another level, or clearing active filters.
            </p>
            <button
              onClick={handleResetFilters}
              style={{
                background: "var(--accent-blue)",
                color: "white",
                padding: "0.6rem 1.25rem",
                borderRadius: "var(--radius-md)",
                fontWeight: 700,
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer"
              }}
            >
              Reset All Filters
            </button>
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
                    background: "rgba(15, 23, 42, 0.85)",
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

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "3.5rem"
          }}>
            {/* Previous Page Button */}
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.65rem 1rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
                background: page === 1 ? "var(--bg-primary)" : "var(--card-bg)",
                color: page === 1 ? "var(--text-muted)" : "var(--text-primary)",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: page === 1 ? "not-allowed" : "pointer"
              }}
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = pageNum === page;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "var(--radius-md)",
                    border: isActive ? "1px solid var(--accent-blue)" : "1px solid var(--border-color)",
                    background: isActive ? "var(--accent-blue)" : "var(--card-bg)",
                    color: isActive ? "white" : "var(--text-primary)",
                    fontWeight: 800,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Page Button */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.65rem 1rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
                background: page === totalPages ? "var(--bg-primary)" : "var(--card-bg)",
                color: page === totalPages ? "var(--text-muted)" : "var(--text-primary)",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: page === totalPages ? "not-allowed" : "pointer"
              }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
