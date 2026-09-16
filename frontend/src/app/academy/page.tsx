"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen, Clock, Loader, Search, ArrowRight, ChevronLeft, ChevronRight,
  X, Filter, ShieldCheck, Award, Terminal, Users, Sparkles, CheckCircle2,
  Layers, Star, Laptop, ArrowUpRight, MessageSquare, PhoneCall
} from "lucide-react";
import AcademyBannerSlider from "@/components/AcademyBannerSlider";

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
  modules_count?: number;
  category_id?: string;
  category?: Category;
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
      return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=80&auto=format&fit=crop";
    }
    if (t.includes("ai") || t.includes("llm") || t.includes("gpt") || t.includes("machine") || t.includes("model") || t.includes("intelligence")) {
      return "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&q=80&auto=format&fit=crop";
    }
    return "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=80&auto=format&fit=crop";
  };

  const getLevelBadgeClass = (level: string) => {
    const l = (level || "").toLowerCase();
    if (l === "beginner") return "badge-green";
    if (l === "intermediate") return "badge-blue";
    if (l === "advanced") return "badge-violet";
    return "badge-blue";
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      
      {/* ═══════════════════════════════════════════════════════════════
          ACADEMY HERO SECTION — Top Slidable Banners & Clean English
          ═══════════════════════════════════════════════════════════════ */}
      <section className="academy-hero" style={{ paddingTop: "2rem" }}>
        <div className="academy-hero-glow" />
        
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          
          {/* ═══════════════════════════════════════════════════════════════
              TOP SLIDABLE BILLBOARD BANNERS (User Graphic Banners)
              ═══════════════════════════════════════════════════════════════ */}
          <div style={{ maxWidth: "1200px", margin: "0 auto 2.75rem auto" }}>
            <AcademyBannerSlider />
          </div>

          <div style={{ textAlign: "center", maxWidth: "48rem", margin: "0 auto" }}>
            
            <span className="badge badge-blue" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 1.1rem", marginBottom: "1.25rem", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: 700 }}>
              <Sparkles size={14} style={{ color: "var(--accent-blue)" }} /> High-Demand Practitioner Bootcamps
            </span>

            <h1 className="hero-title" style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1rem" }}>
              Skills That Actually Pay:{" "}
              <span className="gradient-text-animated" style={{
                background: "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-violet) 50%, var(--accent-teal) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                AI, Cyber Security &amp; Spoken English
              </span>
            </h1>

            <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: "40rem", margin: "0 auto 1.75rem auto" }}>
              Zero boring lectures or academic fluff. Build production-ready projects in cloud labs with direct guidance from active cybersecurity consultants and AI engineers.
            </p>

            {/* Action CTAs */}
            <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
              <a
                href="#courses-catalog"
                className="btn btn-accent"
                style={{
                  padding: "0.8rem 1.75rem",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 700,
                  fontSize: "var(--text-sm)",
                  background: "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-blue-hover) 100%)",
                  boxShadow: "0 8px 20px rgba(14, 165, 233, 0.3)",
                  color: "white"
                }}
              >
                <span>Explore Bootcamps</span>
                <ArrowRight size={16} />
              </a>

              <Link
                href="/book"
                className="btn btn-outline"
                style={{
                  padding: "0.8rem 1.6rem",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 600,
                  fontSize: "var(--text-sm)",
                  background: "var(--card-bg)",
                  borderColor: "var(--border-focus)",
                  color: "var(--text-primary)"
                }}
              >
                <PhoneCall size={16} style={{ color: "var(--accent-teal)" }} />
                <span>Book Free Career Guidance</span>
              </Link>
            </div>
          </div>

          {/* Trust Metrics Bar */}
          <div className="academy-stat-grid" style={{ marginTop: "2.75rem" }}>
            <div className="academy-stat-card">
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "var(--accent-blue-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-blue)", flexShrink: 0 }}>
                <CheckCircle2 size={22} />
              </div>
              <div>
                <div style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>98%</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>
                  Completion Rate
                </div>
              </div>
            </div>

            <div className="academy-stat-card">
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(124, 58, 237, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-violet)", flexShrink: 0 }}>
                <Terminal size={22} />
              </div>
              <div>
                <div style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>100%</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>
                  Hands-On Labs
                </div>
              </div>
            </div>

            <div className="academy-stat-card">
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "var(--accent-teal-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-teal)", flexShrink: 0 }}>
                <Award size={22} />
              </div>
              <div>
                <div style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>Verified</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>
                  Digital Diplomas
                </div>
              </div>
            </div>

            <div className="academy-stat-card">
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-success)", flexShrink: 0 }}>
                <Users size={22} />
              </div>
              <div>
                <div style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>10,000+</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>
                  Alumni Community
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              LEAD GENERATION CARD (Free 1-on-1 Call & WhatsApp)
              ═══════════════════════════════════════════════════════════════ */}
          <div style={{
            marginTop: "2.75rem",
            background: "linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)",
            border: "1px solid var(--border-focus)",
            borderRadius: "var(--radius-xl)",
            padding: "1.75rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            boxShadow: "var(--shadow-sm)"
          }}>
            <div style={{ maxWidth: "38rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                <span className="badge badge-green" style={{ fontSize: "var(--text-xs)", fontWeight: 700, padding: "0.25rem 0.65rem" }}>
                  Free Career Guidance • 1-on-1 Counseling
                </span>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                Confused Which Track is Best for Your Background?
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Speak directly with our senior mentors for a free 15-minute 1-on-1 discovery call or message our admissions team on WhatsApp. We will help you identify the fastest roadmap to freelance clients and high-income tech careers.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link
                href="/book"
                className="btn btn-accent"
                style={{
                  padding: "0.75rem 1.4rem",
                  fontSize: "var(--text-sm)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 700
                }}
              >
                <PhoneCall size={16} />
                <span>Schedule Free Call</span>
              </Link>
              <a
                href="https://wa.me/8801700000000?text=Hello%20ERAAO%20Academy%2C%20I%20want%20to%20know%20which%20course%20is%20best%20for%20me"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{
                  padding: "0.75rem 1.25rem",
                  fontSize: "var(--text-sm)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  borderColor: "rgba(16, 185, 129, 0.4)",
                  color: "var(--text-primary)"
                }}
              >
                <MessageSquare size={16} style={{ color: "var(--color-success)" }} />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CATALOG SECTION — Interactive Filters & Course Grid
          ═══════════════════════════════════════════════════════════════ */}
      <section id="courses-catalog" style={{ padding: "3.5rem 0", background: "var(--bg-secondary)" }}>
        <div className="container">
          
          {/* Filter Controls Box */}
          <div className="card" style={{ padding: "1.75rem", background: "var(--card-bg)", boxShadow: "var(--shadow-sm)", marginBottom: "2.5rem" }}>
            
            {/* Top row: Search & Category Dropdown */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              
              {/* Search Bar */}
              <div style={{ flex: "1 1 300px", position: "relative" }}>
                <Search size={18} style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="text"
                  placeholder="Search bootcamps (e.g. AI Automation, Ethical Hacking, Spoken English, Python)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="input-field"
                  style={{ paddingLeft: "3rem", paddingRight: "2.5rem" }}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setPage(1);
                    }}
                    style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "4px" }}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Category Selector */}
              <div style={{ flex: "0 1 240px" }}>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setPage(1);
                  }}
                  className="input-field"
                  style={{ cursor: "pointer" }}
                >
                  <option value="all">All Topics & Tracks</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filter Button */}
              {(searchQuery || selectedLevel !== "all" || selectedCategory !== "all") && (
                <button
                  onClick={handleResetFilters}
                  className="btn btn-outline"
                  style={{ padding: "0.6rem 1rem", fontSize: "var(--text-xs)", display: "flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <X size={14} /> <span>Clear Filters</span>
                </button>
              )}
            </div>

            {/* Bottom Row: Level Filter Pills */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "0.3rem", marginRight: "0.25rem" }}>
                  <Filter size={13} /> Level:
                </span>
                {[
                  { key: "all", label: "All Levels" },
                  { key: "beginner", label: "Beginner" },
                  { key: "intermediate", label: "Intermediate" },
                  { key: "advanced", label: "Advanced" }
                ].map((lvl) => {
                  const active = selectedLevel === lvl.key;
                  return (
                    <button
                      key={lvl.key}
                      onClick={() => {
                        setSelectedLevel(lvl.key);
                        setPage(1);
                      }}
                      className={`filter-pill ${active ? "active" : ""}`}
                      style={{ padding: "0.35rem 0.85rem", fontSize: "var(--text-xs)" }}
                    >
                      <span>{lvl.label}</span>
                    </button>
                  );
                })}
              </div>

              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>
                Showing {courses.length > 0 ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, total)} of {total} bootcamps
              </span>
            </div>

          </div>

          {/* Course Cards Grid */}
          {loading ? (
            <div className="loading-container" style={{ minHeight: "350px" }}>
              <Loader className="animate-spin text-accent" style={{ color: "var(--accent-blue)" }} size={36} />
              <p style={{ marginTop: "1rem", color: "var(--text-secondary)", fontWeight: 600 }}>Curating active bootcamps...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="empty-state card" style={{ padding: "4rem 2rem", textAlign: "center" }}>
              <div className="empty-icon" style={{ margin: "0 auto 1.25rem auto" }}>
                <BookOpen size={32} />
              </div>
              <h3 className="empty-title" style={{ fontSize: "var(--text-xl)", fontWeight: 800 }}>No Matching Bootcamps Found</h3>
              <p className="empty-text" style={{ maxWidth: "28rem", margin: "0.5rem auto 1.5rem auto" }}>
                We couldn&apos;t find any bootcamps matching your filters. Try clearing your search keywords or switching difficulty levels.
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
                <div key={course.id} className="academy-card">
                  
                  {/* Thumbnail Banner with Zoom Effect */}
                  <Link href={`/academy/courses/${course.slug}`} className="academy-card-image-wrap">
                    <Image
                      src={getCourseThumbnail(course.title)}
                      alt={course.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    
                    {/* Level Pill Overlay */}
                    <div style={{
                      position: "absolute",
                      top: "0.85rem",
                      left: "0.85rem",
                      background: "rgba(15, 23, 42, 0.85)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "var(--text-xs)",
                      fontWeight: 700,
                      color: "white",
                      textTransform: "capitalize",
                      zIndex: 2
                    }}>
                      {course.level}
                    </div>

                    {/* Official Certificate Icon Overlay */}
                    <div style={{
                      position: "absolute",
                      top: "0.85rem",
                      right: "0.85rem",
                      background: "rgba(15, 23, 42, 0.85)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "var(--text-xs)",
                      fontWeight: 700,
                      color: "var(--accent-teal)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      zIndex: 2
                    }}>
                      <Award size={13} />
                      <span>Certified</span>
                    </div>
                  </Link>

                  {/* Card Content Body */}
                  <div className="academy-card-body">
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                      <span className={`badge ${getLevelBadgeClass(course.level)}`}>
                        Practitioner Track
                      </span>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "var(--text-xs)", color: "#f59e0b", fontWeight: 700 }}>
                        <Star size={13} fill="#f59e0b" />
                        <span>4.9</span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, marginBottom: "0.6rem", color: "var(--text-primary)", lineHeight: 1.35 }}>
                      <Link href={`/academy/courses/${course.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {course.title}
                      </Link>
                    </h3>

                    <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", lineHeight: 1.6, marginBottom: "1.25rem", flex: 1 }}>
                      {course.short_description || "Comprehensive hands-on curriculum with real-world browser attack/defense environments and official graduation diploma."}
                    </p>

                    {/* Features checklist */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <Clock size={13} style={{ color: "var(--accent-blue)" }} />
                        <span>{course.duration_hours || 24} Hours on-demand training</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <Laptop size={13} style={{ color: "var(--accent-teal)" }} />
                        <span>Browser-based practice terminal &amp; labs</span>
                      </div>
                    </div>

                  </div>

                  {/* Card Footer with Price & CTA */}
                  <div className="academy-card-footer">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Tuition</span>
                      <span style={{ fontSize: "var(--text-xl)", fontWeight: 900, color: "var(--text-primary)" }}>
                        ৳{course.price ? course.price.toLocaleString() : "Free"} <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--text-muted)" }}>BDT</span>
                      </span>
                    </div>

                    <Link
                      href={`/academy/courses/${course.slug}`}
                      className="btn btn-accent"
                      style={{ width: "100%", justifyContent: "center", fontWeight: 700, borderRadius: "var(--radius-md)" }}
                    >
                      <span>Explore Syllabus</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Pagination Bar */}
          {totalPages > 1 && (
            <div className="pagination" style={{ marginTop: "3rem" }}>
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
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY ERAAO ACADEMY — Advantage & Learning Methodology
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", background: "var(--bg-primary)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          
          <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto 3.5rem auto" }}>
            <span className="section-badge" style={{ background: "rgba(124, 58, 237, 0.1)", color: "var(--accent-violet)", marginBottom: "0.75rem" }}>
              Why Choose ERAAO • The Advantage
            </span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Learn by Doing, Not Memorizing
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-base)", lineHeight: 1.65, marginTop: "0.75rem" }}>
              Skip passive video watching. Build production-grade skills through browser-based virtual labs, sandbox attack simulations, and live mentor code reviews.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            
            <div className="academy-advantage-card">
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "var(--accent-blue-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-blue)", marginBottom: "1.25rem" }}>
                <Terminal size={24} />
              </div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Zero-Setup Cloud Labs
                <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px" }}>Instant Browser Access</span>
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                No complicated local installations. Launch full Kali Linux environments and AI developer sandboxes directly from any modern web browser.
              </p>
            </div>

            <div className="academy-advantage-card">
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(124, 58, 237, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-violet)", marginBottom: "1.25rem" }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Active Industry Mentors
                <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px" }}>1-on-1 Code & Lab Reviews</span>
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Learn directly from professionals who are currently working full-time in cybersecurity operations, AI automation, and global tech consulting.
              </p>
            </div>

            <div className="academy-advantage-card">
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "var(--accent-teal-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-teal)", marginBottom: "1.25rem" }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Verifiable Credentials
                <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px" }}>Digital Cryptographic Badges</span>
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Earn globally verifiable credentials with unique verification IDs ready to showcase on LinkedIn, resumes, and client proposals.
              </p>
            </div>

            <div className="academy-advantage-card">
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-success)", marginBottom: "1.25rem" }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Career & Freelance Acceleration
                <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px" }}>Interview & Portfolio Prep</span>
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Resume optimization, GitHub audit, mock technical interviews, and direct guidance on winning high-paying international remote contracts.
              </p>
            </div>

          </div>

          {/* Corporate Advisory Banner */}
          <div style={{
            marginTop: "4rem",
            background: "linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)",
            borderRadius: "var(--radius-xl)",
            padding: "3rem 2.5rem",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2rem",
            boxShadow: "var(--shadow-xl)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <div style={{ maxWidth: "36rem" }}>
              <span className="badge" style={{ background: "rgba(14, 165, 233, 0.2)", color: "var(--accent-blue)", marginBottom: "0.75rem" }}>
                Corporate & Custom Cohorts • Enterprise Training
              </span>
              <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "white", marginTop: "0.5rem" }}>
                Upskill Your Engineering & Security Teams
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "var(--text-sm)", lineHeight: 1.6, marginTop: "0.5rem" }}>
                Equip your workforce with cutting-edge AI automation workflows, defense-in-depth cybersecurity practices, and professional executive communication.
              </p>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                href="/book"
                className="btn btn-accent"
                style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))", color: "white", padding: "0.85rem 1.75rem", borderRadius: "var(--radius-md)", fontWeight: 700 }}
              >
                <span>Book Corporate Discovery</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
