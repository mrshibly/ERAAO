"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, Loader, Search, ArrowRight, ChevronLeft, ChevronRight, X, Filter } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Course {
  id: string;
  title: string;
  slug: string;
  level: string;
  short_description?: string;
  price?: number;
  duration_weeks?: number;
  duration_hours?: number;
  lessons_count?: number;
  category_id?: string;
}

export default function AcademyPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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
      return "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80&auto=format&fit=crop";
    }
    return "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80&auto=format&fit=crop";
  };

  return (
    <div style={{ padding: "var(--spacing-section) 0", background: "var(--bg-secondary)", minHeight: "100vh" }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">
            Academy Bootcamps
          </span>
          <h1 className="section-title">Course Catalog</h1>
          <p className="section-subtitle">
            Explore our hands-on cybersecurity and applied AI courses. Filter by topic or level to begin your learning path.
          </p>
        </div>

        {/* Controls Bar: Search & Filters */}
        <div className="controls-bar">
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
                className="input-field"
                style={{ paddingLeft: "2.75rem", paddingRight: "2.5rem" }}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setPage(1);
                  }}
                  style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                  aria-label="Clear search"
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
                className="input-field"
                style={{ cursor: "pointer" }}
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
                className="btn btn-outline"
                style={{ padding: "0.6rem 1rem", fontSize: "var(--text-sm)" }}
              >
                <X size={14} /> <span>Clear Filters</span>
              </button>
            )}

          </div>

          {/* Level Filter Pills */}
          <div className="filter-pills" style={{ paddingTop: "0.75rem", marginTop: "0.75rem", borderTop: "1px solid var(--border-color)" }}>
            <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginRight: "0.5rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
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
                  className={`filter-pill ${active ? "active" : ""}`}
                >
                  {lvl === "all" ? "All Levels" : lvl}
                </button>
              );
            })}

            {/* Total Results Counter */}
            <span className="results-counter" style={{ marginLeft: "auto" }}>
              Showing {courses.length > 0 ? (page - 1) * pageSize + 1 : 0}-{Math.min(page * pageSize, total)} of {total} courses
            </span>
          </div>
        </div>

        {/* Course Cards Grid */}
        {loading ? (
          <div className="loading-container">
            <Loader className="animate-spin text-accent" style={{ color: "var(--accent-blue)" }} size={36} />
            <p>Loading course catalog...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="empty-state card">
            <div className="empty-icon">
              <BookOpen size={28} />
            </div>
            <h3 className="empty-title">No Matching Bootcamps Found</h3>
            <p className="empty-text">
              Try adjusting your search query, selecting another level, or clearing active filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn btn-accent"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="card-grid">
            {courses.map((course) => (
              <div key={course.id} className="premium-card hover-lift" style={{ height: "100%", display: "flex", flexDirection: "column", padding: 0, overflow: "hidden" }}>
                
                {/* Cover Image -> Links to Course Details Page */}
                <Link href={`/academy/courses/${course.slug}`} style={{ height: "185px", overflow: "hidden", position: "relative", display: "block" }}>
                  <Image
                    src={getCourseThumbnail(course.title)}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    background: "rgba(15, 23, 42, 0.85)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 700,
                    color: "white",
                    textTransform: "capitalize"
                  }}>
                    {course.level}
                  </div>
                </Link>

                <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  <span className="badge badge-blue" style={{ alignSelf: "flex-start", marginBottom: "0.5rem" }}>
                    Practitioner Track
                  </span>

                  <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginBottom: "0.75rem", color: "var(--text-primary)", lineHeight: 1.3 }}>
                    <Link href={`/academy/courses/${course.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {course.title}
                    </Link>
                  </h3>

                  <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.5, marginBottom: "1.5rem", flex: "1" }}>
                    {course.short_description}
                  </p>

                  <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                    <div style={{ display: "flex", gap: "1rem", color: "var(--text-secondary)", fontSize: "var(--text-xs)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <Clock size={14} />
                        {course.duration_hours || 10} hours
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <BookOpen size={14} />
                        Practice Labs
                      </span>
                    </div>
                    <span style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)" }}>
                      ৳{course.price} BDT
                    </span>
                  </div>

                  {/* Primary Button ALWAYS routes to Course Details Page */}
                  <Link
                    href={`/academy/courses/${course.slug}`}
                    className="btn btn-accent"
                    style={{ width: "100%" }}
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
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="pagination-btn"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = pageNum === page;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`pagination-btn ${isActive ? "active" : ""}`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="pagination-btn"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
