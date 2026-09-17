"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft, Clock, Award, CheckCircle2, PlayCircle, BookOpen,
  Shield, Video, FileText, CheckSquare, HelpCircle, ArrowRight,
  Sparkles, Users, MessageSquare, Calendar, Layers, Headphones,
  Check, ArrowUpRight
} from "lucide-react";
import BrandLoader from "@/components/BrandLoader";
import CustomModal from "@/components/CustomModal";
import { getCourseBySlug, ALL_COURSES, CourseData } from "@/data/courses";

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const router = useRouter();
  const { user, token } = useAuth();

  const staticCourse = getCourseBySlug(slug);

  const [course, setCourse] = useState<any>(staticCourse || null);
  const [loading, setLoading] = useState(!staticCourse);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "info" as "info" | "danger" | "confirm" | "success",
    title: "",
    message: ""
  });

  useEffect(() => {
    if (staticCourse) {
      document.title = `${staticCourse.title} | ERAAO Academy`;
    }

    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/v1/courses/${slug}`);
        if (res.ok) {
          const apiData = await res.json();
          // Merge API data with rich static PDF curriculum specifications
          setCourse((prev: any) => ({
            ...(staticCourse || {}),
            ...apiData,
            modules: (apiData.modules && apiData.modules.length > 0) ? apiData.modules : (staticCourse?.modules || []),
            outcomes: staticCourse?.outcomes || apiData.outcomes || [],
            target_audience: staticCourse?.target_audience || [],
            weekly_rhythm: staticCourse?.weekly_rhythm || "",
            resources_included: staticCourse?.resources_included || "",
            classes_count: staticCourse?.classes_count || 36,
            classes_per_week: staticCourse?.classes_per_week || 3,
            class_length_minutes: staticCourse?.class_length_minutes || 70,
            price: apiData.price ?? staticCourse?.price ?? 0
          }));
          if (apiData?.title) {
            document.title = `${apiData.title} | ERAAO Academy`;
          }
        } else if (!staticCourse) {
          setError("Course not found.");
        }
      } catch {
        if (!staticCourse) {
          setError("Error connecting to server.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug, staticCourse]);

  const handleEnroll = async () => {
    if (!user) {
      router.push(`/login?redirect=/academy/courses/${slug}`);
      return;
    }

    setEnrolling(true);
    try {
      const res = await fetch("/api/v1/enrollments", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ course_id: course.id })
      });

      if (res.ok) {
        const enrollment = await res.json();
        setEnrollSuccess(true);
        setTimeout(() => {
          router.push(`/learn/${enrollment.id}`);
        }, 1200);
      } else {
        const err = await res.json().catch(() => ({}));
        setModalConfig({
          isOpen: true,
          type: "info",
          title: "Enrollment Notice",
          message: err.detail || err.error?.message || "Enrollment failed. You might already be enrolled."
        });
      }
    } catch {
      setModalConfig({
        isOpen: true,
        type: "danger",
        title: "Connection Error",
        message: "Error connecting to server. Please try again."
      });
    } finally {
      setEnrolling(false);
    }
  };

  const getCourseImage = (title: string, s?: string) => {
    const t = (title || "").toLowerCase();
    const sl = (s || "").toLowerCase();
    if (t.includes("english") || sl.includes("english")) {
      return "/banners/banner-spoken-english.jpg";
    }
    if (t.includes("ai") || t.includes("automation") || sl.includes("ai")) {
      return "/banners/banner-ai-automation.jpg";
    }
    if (t.includes("hack") || t.includes("penetration") || t.includes("security") || sl.includes("cyber")) {
      return "/banners/banner-cyber-security.jpg";
    }
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200";
  };

  if (loading) {
    return <BrandLoader message="Loading official course syllabus & curriculum..." />;
  }

  if (error || !course) {
    return (
      <div className="empty-state card" style={{ maxWidth: "600px", margin: "5rem auto" }}>
        <BookOpen size={42} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
        <h2 className="empty-title">Course Not Found</h2>
        <p className="empty-text">
          The requested course syllabus could not be found or has been updated.
        </p>
        <Link href="/academy" className="btn btn-accent">
          Browse Academy Catalog
        </Link>
      </div>
    );
  }

  const totalLessons = (course.modules || []).reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0);

  return (
    <div style={{ minHeight: "90vh", paddingBottom: "5rem", paddingTop: "2rem" }}>
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
          <Link href="/academy" style={{ color: "var(--text-secondary)", textDecoration: "none", fontWeight: 600 }}>
            Academy
          </Link>
          <span>/</span>
          <span style={{ color: "var(--accent-blue)", fontWeight: 700 }}>
            {course.category || (course.category_slug ? course.category_slug.replace(/-/g, " ") : "Bootcamp")}
          </span>
          <span>/</span>
          <span style={{ color: "var(--text-muted)" }}>{course.title}</span>
        </div>

        {/* Hero Cover Header */}
        <div className="anim-fade-up" style={{
          position: "relative",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          background: "linear-gradient(135deg, #090d16 0%, #0f172a 100%)",
          color: "white",
          padding: "3.5rem 2.5rem",
          marginBottom: "2.5rem",
          boxShadow: "var(--shadow-xl)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.22, zIndex: 1 }}>
            <Image
              src={getCourseImage(course.title, course.slug)}
              alt={course.title}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div style={{ position: "relative", zIndex: 2, maxWidth: "800px" }}>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center", marginBottom: "1.25rem" }}>
              <span className="badge" style={{ background: "rgba(14, 165, 233, 0.2)", color: "var(--accent-blue)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {course.category || "Bootcamp"}
              </span>
              <span className="badge" style={{ background: "rgba(255, 255, 255, 0.12)", color: "white", textTransform: "capitalize", fontWeight: 700 }}>
                {course.level || "All Levels"} Level
              </span>
              <span className="badge" style={{ background: "rgba(16, 185, 129, 0.2)", color: "var(--accent-teal)", fontWeight: 700 }}>
                <Clock size={13} style={{ marginRight: "4px" }} />
                12 Weeks • 36 Live Classes
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(1.85rem, 3.5vw, 2.75rem)", fontWeight: 900, color: "var(--text-on-dark)", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "1.25rem" }}>
              {course.title}
            </h1>

            <p style={{ color: "var(--text-on-dark-subtle)", fontSize: "var(--text-base)", lineHeight: 1.65, marginBottom: "2rem" }}>
              {course.short_description || course.description}
            </p>

            {/* Program specifications */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(14, 165, 233, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-blue)" }}>
                  <Calendar size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "var(--text-xs)", color: "rgba(255, 255, 255, 0.6)", fontWeight: 600 }}>Rhythm</div>
                  <div style={{ fontSize: "var(--text-sm)", fontWeight: 800, color: "white" }}>3 Classes / Week</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-teal)" }}>
                  <Layers size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "var(--text-xs)", color: "rgba(255, 255, 255, 0.6)", fontWeight: 600 }}>Structure</div>
                  <div style={{ fontSize: "var(--text-sm)", fontWeight: 800, color: "white" }}>{course.modules?.length || 10} Deep Modules</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(124, 58, 237, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-violet)" }}>
                  <BookOpen size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "var(--text-xs)", color: "rgba(255, 255, 255, 0.6)", fontWeight: 600 }}>Class Length</div>
                  <div style={{ fontSize: "var(--text-sm)", fontWeight: 800, color: "white" }}>{course.class_length_minutes || 70} Mins / Class</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f59e0b" }}>
                  <Award size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "var(--text-xs)", color: "rgba(255, 255, 255, 0.6)", fontWeight: 600 }}>Credential</div>
                  <div style={{ fontSize: "var(--text-sm)", fontWeight: 800, color: "white" }}>Verified Diploma</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>

          {/* Left Column — Detailed Course Description, Learning Cycle & Syllabus */}
          <div style={{ gridColumn: "span 2" }}>
            
            {/* ERAAO 6-Stage Learning Cycle Box */}
            <div className="card" style={{ padding: "2rem", marginBottom: "2rem", background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <span className="badge badge-blue" style={{ fontSize: "var(--text-xs)", fontWeight: 800 }}>
                  <Sparkles size={13} style={{ color: "var(--accent-blue)" }} />
                  <span>The ERAAO Learning Methodology</span>
                </span>
              </div>
              <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 900, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                How This Course Works: 6-Stage Learning Cycle
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Every module in this bootcamp moves systematically through 6 scientific retention stages so you don&apos;t just memorize information — you gain unconscious fluency.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem" }}>
                {[
                  { step: "01", name: "Understand", desc: "Break concept down into clear, intuitive mechanics." },
                  { step: "02", name: "Notice", desc: "Spot the patterns in authentic spoken dialogues & code." },
                  { step: "03", name: "Build", desc: "Construct correct sentences and systems from prompts." },
                  { step: "04", name: "Practice", desc: "Low-stakes guided repetitions with instant instructor feedback." },
                  { step: "05", name: "Use", desc: "High-stakes production challenges and real simulations." },
                  { step: "06", name: "Recall", desc: "Spaced retrieval practice to lock fluency into long-term memory." },
                ].map((item, idx) => (
                  <div key={idx} style={{
                    padding: "0.85rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem"
                  }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--accent-blue)" }}>{item.step}</span>
                    <strong style={{ fontSize: "var(--text-xs)", color: "var(--text-primary)" }}>{item.name}</strong>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.4 }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Rhythm Breakdown (from PDF) */}
            <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Calendar size={18} style={{ color: "var(--accent-blue)" }} />
                <span>Weekly 3-Class Class Schedule</span>
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                {course.weekly_rhythm || "Each week features 3 live interactive sessions (Mon / Wed / Fri) engineered for progressive mastery."}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                <div style={{ padding: "1.25rem", borderRadius: "var(--radius-md)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span className="badge badge-blue" style={{ fontSize: "0.7rem", fontWeight: 800 }}>Class 1 &bull; Monday</span>
                  </div>
                  <strong style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)", display: "block", marginBottom: "0.35rem" }}>
                    New Input &amp; System Architecture
                  </strong>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                    Understand &rarr; Notice &rarr; Build. Module worksheet released with core sentence frames, key vocabulary, and guided models.
                  </p>
                </div>

                <div style={{ padding: "1.25rem", borderRadius: "var(--radius-md)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span className="badge" style={{ background: "rgba(16, 185, 129, 0.15)", color: "var(--accent-teal)", fontSize: "0.7rem", fontWeight: 800 }}>Class 2 &bull; Wednesday</span>
                  </div>
                  <strong style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)", display: "block", marginBottom: "0.35rem" }}>
                    Live Application &amp; Guided Speaking
                  </strong>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                    Practice &rarr; Use. Pair exercises, live drills, simulations, and real-time mentor corrections to eliminate hesitation.
                  </p>
                </div>

                <div style={{ padding: "1.25rem", borderRadius: "var(--radius-md)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span className="badge" style={{ background: "rgba(124, 58, 237, 0.15)", color: "var(--accent-violet)", fontSize: "0.7rem", fontWeight: 800 }}>Class 3 &bull; Friday</span>
                  </div>
                  <strong style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)", display: "block", marginBottom: "0.35rem" }}>
                    Listening Lab &amp; Active Recall
                  </strong>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                    Recall &amp; Milestone. Self-made audio comprehension, speed listening drills, active recall testing, and error diagnosis.
                  </p>
                </div>
              </div>
            </div>

            {/* What You Will Master (Learning Outcomes) */}
            <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                What You Will Master &amp; Build
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", marginBottom: "1.25rem" }}>
                Factual competencies verified through weekly assessments and capstone projects:
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.85rem" }}>
                {(course.outcomes && course.outcomes.length > 0 ? course.outcomes : [
                  "Systematic sentence architecture without mental translation",
                  "Overcoming conversational hesitation in live dialogues",
                  "Downloadable worksheets for persistent reference and practice",
                  "Audio listening training with natural native speaker speed",
                  "Direct instructor feedback and live correction in every class",
                  "Verifiable digital diploma upon completing capstone evaluation"
                ]).map((outcome: string, idx: number) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--color-success)", flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)", lineHeight: 1.5 }}>
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>

              {/* Target Audience */}
              {course.target_audience && course.target_audience.length > 0 && (
                <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-color)" }}>
                  <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Users size={16} style={{ color: "var(--accent-blue)" }} />
                    <span>Who is this bootcamp designed for?</span>
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {course.target_audience.map((aud: any, idx: number) => (
                      <div key={idx} style={{ background: "var(--bg-secondary)", padding: "0.85rem 1rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                        <strong style={{ fontSize: "var(--text-xs)", color: "var(--text-primary)", display: "block" }}>{aud.title}</strong>
                        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.4 }}>{aud.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Curriculum Syllabus Modules */}
            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <div>
                  <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)" }}>
                    Official 12-Week Curriculum Syllabus
                  </h2>
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                    {course.modules?.length || 0} Modules &bull; {totalLessons} Topic Lessons &bull; 36 Live Sessions
                  </p>
                </div>

                {course.resources_included && (
                  <span className="badge" style={{ background: "rgba(14, 165, 233, 0.1)", color: "var(--accent-blue)", fontSize: "var(--text-xs)", fontWeight: 700 }}>
                    {course.resources_included}
                  </span>
                )}
              </div>

              {(!course.modules || course.modules.length === 0) ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                  Syllabus details are currently being finalized by the instructor team.
                </div>
              ) : (
                course.modules.sort((a: any, b: any) => a.order - b.order).map((mod: any, idx: number) => (
                  <div key={mod.id || idx} style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", marginBottom: "1.25rem", overflow: "hidden" }}>
                    <div style={{ padding: "1.15rem 1.25rem", background: "var(--bg-secondary)", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: mod.lessons?.length > 0 ? "1px solid var(--border-color)" : "none", flexWrap: "wrap", gap: "0.5rem" }}>
                      <div>
                        <div style={{ fontSize: "var(--text-xs)", color: "var(--accent-blue)", fontWeight: 800, textTransform: "uppercase" }}>
                          Module {idx + 1}
                        </div>
                        <h4 style={{ fontSize: "var(--text-base)", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.15rem" }}>
                          {mod.title}
                        </h4>
                        {mod.description && (
                          <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "0.3rem", lineHeight: 1.5 }}>
                            {mod.description}
                          </p>
                        )}
                        {mod.student_outcome && (
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", marginTop: "0.4rem", fontSize: "0.75rem", color: "var(--accent-teal)", fontWeight: 700 }}>
                            <Check size={13} />
                            <span>Milestone: {mod.student_outcome}</span>
                          </div>
                        )}
                      </div>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>
                        {mod.lessons?.length || 0} {mod.lessons?.length === 1 ? "Lesson" : "Lessons"}
                      </span>
                    </div>

                    {mod.lessons && mod.lessons.length > 0 && (
                      <div style={{ padding: "0.75rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {mod.lessons.sort((a: any, b: any) => a.order - b.order).map((lesson: any) => (
                          <div key={lesson.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                              {lesson.content_type === "video" && <Video size={16} style={{ color: "var(--accent-blue)" }} />}
                              {lesson.content_type === "material" && <FileText size={16} style={{ color: "var(--color-success)" }} />}
                              {lesson.content_type === "assignment" && <CheckSquare size={16} style={{ color: "var(--color-warning)" }} />}
                              {lesson.content_type === "quiz" && <HelpCircle size={16} style={{ color: "var(--accent-violet)" }} />}
                              {lesson.content_type === "text" && <BookOpen size={16} style={{ color: "var(--accent-blue)" }} />}
                              <span>{lesson.title}</span>
                            </div>
                            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>
                              {lesson.duration_minutes ? `${lesson.duration_minutes}m` : "Live session"}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

          </div>

          {/* Right Column — Enrollment Action Box */}
          <div>
            <div className="card" style={{ padding: "2rem", position: "sticky", top: "2rem", boxShadow: "var(--shadow-md)" }}>
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                  Official Tuition Fee
                </span>
                <div style={{ fontSize: "var(--text-3xl)", fontWeight: 900, color: "var(--text-primary)", marginTop: "0.25rem" }}>
                  {course.price > 0 ? `৳${course.price.toLocaleString()} BDT` : "Free Access"}
                </div>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "0.25rem", display: "block" }}>
                  Full 12-Week Cohort • All Materials Included
                </span>
              </div>

              {enrollSuccess ? (
                <div style={{ background: "var(--color-success-bg)", border: "1px solid rgba(34, 197, 94, 0.3)", color: "var(--color-success)", padding: "1rem", borderRadius: "var(--radius-md)", textAlign: "center", fontWeight: 700, marginBottom: "1rem" }}>
                  <CheckCircle2 size={24} style={{ margin: "0 auto 0.5rem auto", display: "block" }} />
                  <span>Successfully enrolled! Redirecting to classroom...</span>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="btn btn-accent"
                  style={{ width: "100%", padding: "0.85rem", fontSize: "var(--text-base)", marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                  <span>{enrolling ? "Enrolling..." : "Enroll in Bootcamp"}</span>
                  <ArrowRight size={18} />
                </button>
              )}

              {/* Verified specifications list */}
              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Clock size={16} style={{ color: "var(--accent-blue)" }} />
                  <span>12 Weeks &bull; 36 Live Interactive Classes</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Calendar size={16} style={{ color: "var(--accent-teal)" }} />
                  <span>3 Live Classes Per Week (Mon / Wed / Fri)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <FileText size={16} style={{ color: "var(--color-success)" }} />
                  <span>Worksheets &amp; Dedicated Listening Audio Files</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Users size={16} style={{ color: "var(--accent-violet)" }} />
                  <span>1-on-1 Mentor Guidance &amp; Live Speech Feedback</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Award size={16} style={{ color: "var(--color-warning)" }} />
                  <span>Verifiable Digital Diploma with Credential ID</span>
                </div>
              </div>

              {/* Conversational Mentor Guidance Box */}
              <div style={{
                marginTop: "1.5rem",
                padding: "1.1rem",
                borderRadius: "var(--radius-md)",
                background: "linear-gradient(135deg, rgba(14, 165, 233, 0.06) 0%, rgba(124, 58, 237, 0.06) 100%)",
                border: "1px solid rgba(14, 165, 233, 0.2)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                  <Sparkles size={14} style={{ color: "var(--accent-blue)" }} />
                  <span style={{ fontSize: "var(--text-xs)", fontWeight: 800, color: "var(--text-primary)" }}>
                    Need help choosing the right level?
                  </span>
                </div>
                <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                  Speak directly with an ERAAO advisor on WhatsApp for an assessment and syllabus recommendation.
                </p>
                <a
                  href={`https://wa.me/8801700000000?text=${encodeURIComponent(`Hello ERAAO Academy, I would like to learn more about the ${course.title} bootcamp.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.85rem",
                    fontSize: "var(--text-xs)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    borderColor: "rgba(16, 185, 129, 0.4)",
                    color: "var(--text-primary)"
                  }}
                >
                  <MessageSquare size={14} style={{ color: "var(--color-success)" }} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

      <CustomModal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
}
