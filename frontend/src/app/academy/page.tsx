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
import CinematicHeroSlider from "@/components/CinematicHeroSlider";

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

const DEFAULT_CATEGORIES: Category[] = [
  { id: "english-communication", name: "English Communication", slug: "english-communication" },
  { id: "artificial-intelligence", name: "Artificial Intelligence", slug: "artificial-intelligence" },
  { id: "cybersecurity", name: "Cybersecurity", slug: "cybersecurity" },
];

export default function AcademyPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
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
          if (Array.isArray(data) && data.length > 0) {
            setCategories(data);
          }
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

        const res = await fetch(`/api/v1/courses?${queryParams.toString()}`).catch(() => null);
        if (res && res.ok) {
          const body = await res.json();
          setCourses(body.items || []);
          setTotal(body.total || (body.items ? body.items.length : 0));
        } else {
          setCourses([]);
          setTotal(0);
        }
      } catch (err) {
        console.error("Error loading courses:", err);
        setCourses([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchCourses();
    }, 200);

    return () => clearTimeout(timer);
  }, [page, pageSize, searchQuery, selectedLevel, selectedCategory]);

  const totalPages = Math.ceil(total / pageSize) || 1;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedLevel("all");
    setSelectedCategory("all");
    setPage(1);
  };

  const getCourseThumbnail = (title: string, slug?: string) => {
    const t = (title || "").toLowerCase();
    const s = (slug || "").toLowerCase();
    if (s.includes("english") || t.includes("english") || t.includes("spoken")) {
      return "/banners/banner-spoken-english.jpg";
    }
    if (s.includes("ai") || t.includes("ai") || t.includes("agent") || t.includes("llm")) {
      return "/banners/banner-ai-automation.jpg";
    }
    if (s.includes("cyber") || t.includes("security") || t.includes("pentest") || t.includes("hack")) {
      return "/banners/banner-cyber-security.jpg";
    }
    return "/banners/banner-spoken-english.jpg";
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
          FULL-WIDTH CINEMATIC HERO SLIDER (Edge-to-Edge)
          ═══════════════════════════════════════════════════════════════ */}
      <CinematicHeroSlider />

      <section style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* ═══════════════════════════════════════════════════════════════
              THE ERAAO LEARNING CYCLE — Authentic Core Pedagogy
              ═══════════════════════════════════════════════════════════════ */}
          <div id="learning-cycle" style={{
            marginTop: "3rem",
            background: "linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-xl)",
            padding: "2rem 1.75rem",
            boxShadow: "var(--shadow-sm)"
          }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "var(--text-xs)", fontWeight: 800, color: "var(--accent-blue)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The ERAAO Learning Cycle
              </span>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.25rem" }}>
                From Understanding Context to Spontaneous Application
              </h3>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", maxWidth: "34rem", margin: "0.35rem auto 0 auto" }}>
                Every class moves through the same six stages. No memorizing rules or reciting scripts — you build, speak, and retain naturally.
              </p>
            </div>

            <div className="learning-cycle-grid">
              {[
                { step: "01", name: "Understand", desc: "Introduced through context, sound, situation & meaning" },
                { step: "02", name: "Notice", desc: "Recognise recurring words, structures & patterns" },
                { step: "03", name: "Build", desc: "Construct your own sentences from scratch" },
                { step: "04", name: "Practice", desc: "Controlled repetition, variation & substitution drills" },
                { step: "05", name: "Use", desc: "Speak and communicate in realistic scenarios" },
                { step: "06", name: "Recall", desc: "Spaced retrieval across subsequent classes" }
              ].map((stage) => (
                <div
                  key={stage.name}
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-lg)",
                    padding: "1rem 0.85rem",
                    textAlign: "center"
                  }}
                >
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--accent-teal)", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                    STAGE {stage.step}
                  </div>
                  <div style={{ fontSize: "var(--text-sm)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                    {stage.name}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                    {stage.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Verified Cohort Specifications (Factual Program Specs, Zero Fake Stats) */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
              marginTop: "1.5rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid var(--border-color)",
              fontSize: "var(--text-xs)",
              color: "var(--text-secondary)",
              fontWeight: 600
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <CheckCircle2 size={14} style={{ color: "var(--accent-blue)" }} /> 12-Week Structured Cohorts
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Clock size={14} style={{ color: "var(--accent-teal)" }} /> 3 Live Classes / Week (36 Total)
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Users size={14} style={{ color: "var(--accent-violet)" }} /> 1-on-1 Dedicated Mentor Guidance
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Award size={14} style={{ color: "var(--color-success)" }} /> Verifiable Digital Diplomas
              </span>
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
      <section id="bootcamps" style={{ padding: "3.5rem 0", background: "var(--bg-secondary)" }}>
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
                        {course.category?.name || "Practitioner Track"}
                      </span>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "var(--text-xs)", color: "var(--accent-teal)", fontWeight: 700 }}>
                        <Clock size={13} />
                        <span>{course.duration_weeks || 12} Weeks • 36 Classes</span>
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

                    {/* Features checklist - 100% authentic program specs */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1rem", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <CheckCircle2 size={13} style={{ color: "var(--accent-blue)" }} />
                        <span>3 Live Classes / Week • Mentored Sessions</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <Layers size={13} style={{ color: "var(--accent-teal)" }} />
                        <span>{course.modules_count || 10} Structured Modules • Downloadable Practice Materials</span>
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
