"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen, Award, CheckCircle2, Clock, Play, ShieldCheck,
  ArrowRight, Sparkles, HelpCircle, Activity, Compass
} from "lucide-react";
import StudentOnboardingModal from "@/components/StudentOnboardingModal";

export default function StudentDashboard() {
  const router = useRouter();
  const { user, token, loading } = useAuth();
  const [stats, setStats] = useState({ enrolled_courses: 0, completed_courses: 0, certificates_earned: 0 });
  const [activeCourses, setActiveCourses] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    if (!user.onboarding_completed) {
      setShowOnboarding(true);
    }

    const fetchData = async () => {
      try {
        const headers = { "Authorization": `Bearer ${token}` };

        const statsRes = await fetch("/api/v1/dashboard/student/overview", { headers });
        if (statsRes.ok) {
          setStats(await statsRes.json());
        }

        const enrollRes = await fetch("/api/v1/enrollments/me", { headers });
        if (enrollRes.ok) {
          setActiveCourses(await enrollRes.json());
        }

        const certRes = await fetch("/api/v1/certificates/me", { headers });
        if (certRes.ok) {
          setCertificates(await certRes.json());
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [user, token, loading, router]);

  if (loading || fetching) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "36px", height: "36px", border: "3px solid rgba(14, 165, 233, 0.2)", borderTopColor: "var(--accent-blue)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: 600 }}>Loading dashboard...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const getCourseImage = (title: string) => {
    const t = (title || "").toLowerCase();
    if (t.includes("hack") || t.includes("penetration") || t.includes("security") || t.includes("cyber") || t.includes("defense")) {
      return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600";
    }
    if (t.includes("ai") || t.includes("intelligence") || t.includes("machine") || t.includes("model") || t.includes("neural")) {
      return "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600";
    }
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600";
  };

  const currentActiveCourse = activeCourses[0];
  const activeProgress = currentActiveCourse ? Math.round(currentActiveCourse.progress || 0) : 0;
  const completedLessonsTotal = activeCourses.reduce((acc, c) => acc + Math.round(((c.progress || 0) / 100) * 10), 0);

  return (
    <div style={{ paddingBottom: "3rem" }}>
      <style>{`
        .hero-banner-simple {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-radius: var(--radius-lg);
          padding: 2.5rem 2rem;
          color: white;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px -10px rgba(15, 23, 42, 0.25);
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .metrics-bar-simple {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.25rem;
        }
        @media (max-width: 1024px) {
          .metrics-bar-simple { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .metrics-bar-simple { grid-template-columns: 1fr; }
        }
        .metric-card-simple {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: var(--shadow-sm);
        }
        .dashboard-main-grid {
          display: grid;
          grid-template-columns: 2.4fr 1fr;
          gap: 2.25rem;
        }
        @media (max-width: 1024px) {
          .dashboard-main-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero Welcome Banner */}
      <div className="hero-banner-simple anim-fade-up">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "600px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(14, 165, 233, 0.2)", border: "1px solid rgba(14, 165, 233, 0.4)", color: "#38bdf8", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.85rem" }}>
              <Sparkles size={14} /> Student Dashboard
            </div>
            <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em", lineHeight: "1.25" }}>
              Welcome back, {user?.full_name?.split(" ")[0] || "Student"}! 👋
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "0.925rem", marginTop: "0.4rem", lineHeight: "1.5" }}>
              {currentActiveCourse
                ? `You are currently learning ${currentActiveCourse.course?.title || "your active course"}. Click below to resume!`
                : "You aren't enrolled in any courses yet. Explore our catalog to start your learning journey."}
            </p>

            {currentActiveCourse ? (
              <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <Link
                  href={`/learn/${currentActiveCourse.id}`}
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                    color: "white",
                    padding: "0.7rem 1.5rem",
                    borderRadius: "12px",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: "0 8px 20px rgba(14, 165, 233, 0.35)"
                  }}
                >
                  <Play size={16} fill="white" />
                  <span>Continue Learning ({activeProgress}%)</span>
                </Link>
                <Link
                  href="/dashboard/student/courses"
                  style={{ color: "#94a3b8", fontSize: "0.85rem", textDecoration: "none", fontWeight: 600 }}
                >
                  See All ({activeCourses.length}) →
                </Link>
              </div>
            ) : (
              <div style={{ marginTop: "1.5rem" }}>
                <Link
                  href="/dashboard/student/catalog"
                  style={{
                    background: "var(--accent-blue)",
                    color: "white",
                    padding: "0.7rem 1.5rem",
                    borderRadius: "12px",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                >
                  <Compass size={16} /> Explore Courses <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>

          {/* Quick Enrolled Badge */}
          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "1.25rem 1.75rem",
            textAlign: "center",
            minWidth: "180px"
          }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", color: "#10b981", marginBottom: "0.5rem" }}>
              <Activity size={22} />
            </div>
            <div style={{ fontSize: "1.65rem", fontWeight: 800, color: "#ffffff" }}>
              {activeCourses.length}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
              Enrolled Courses
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Metrics */}
      <div className="metrics-bar-simple anim-fade-up">
        <div className="metric-card-simple">
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(14, 165, 233, 0.1)", color: "var(--accent-blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={20} />
          </div>
          <div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.enrolled_courses || activeCourses.length}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Enrolled Courses</div>
          </div>
        </div>

        <div className="metric-card-simple">
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.completed_courses}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Completed Courses</div>
          </div>
        </div>

        <div className="metric-card-simple">
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Award size={20} />
          </div>
          <div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.certificates_earned || certificates.length}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Certificates Earned</div>
          </div>
        </div>

        <div className="metric-card-simple">
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)" }}>{completedLessonsTotal}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Completed Lessons</div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="dashboard-main-grid">

        {/* Left Column — My Enrolled Courses */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)" }}>
              My Courses
            </h2>
            {activeCourses.length > 0 && (
              <Link href="/dashboard/student/courses" style={{ color: "var(--accent-blue)", fontSize: "0.85rem", fontWeight: 700, textDecoration: "none" }}>
                See All ({activeCourses.length}) →
              </Link>
            )}
          </div>

          {activeCourses.length === 0 ? (
            <div style={{
              background: "var(--card-bg)",
              border: "1px dashed var(--border-color)",
              borderRadius: "var(--radius-lg)",
              padding: "3rem 1.5rem",
              textAlign: "center"
            }}>
              <BookOpen size={36} style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }} />
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>No active courses</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.3rem", marginBottom: "1.25rem" }}>
                Enroll in a course to start learning and tracking your progress.
              </p>
              <Link href="/dashboard/student/catalog" style={{
                background: "var(--accent-blue)",
                color: "white",
                padding: "0.6rem 1.25rem",
                borderRadius: "var(--radius-md)",
                fontWeight: 700,
                fontSize: "0.85rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem"
              }}>
                Find Courses <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {activeCourses.map((item) => {
                const course = item.course || {};
                const progress = Math.round(item.progress || 0);

                return (
                  <div
                    key={item.id}
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      display: "flex",
                      boxShadow: "var(--shadow-sm)",
                      transition: "all 0.2s ease"
                    }}
                    className="hover-lift"
                  >
                    <div style={{ width: "160px", position: "relative", overflow: "hidden", background: "#0f172a", flexShrink: 0 }}>
                      <img src={getCourseImage(course.title)} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>

                    <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: "1.3" }}>
                            {course.title || "Cybersecurity Course"}
                          </h3>
                          <span style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            padding: "0.2rem 0.55rem",
                            borderRadius: "12px",
                            background: progress >= 100 ? "rgba(16, 185, 129, 0.1)" : "rgba(14, 165, 233, 0.1)",
                            color: progress >= 100 ? "#10b981" : "var(--accent-blue)"
                          }}>
                            {progress >= 100 ? "Completed" : `${progress}%`}
                          </span>
                        </div>
                        <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", marginTop: "0.3rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {course.description || "Practical syllabus with hands-on exercises."}
                        </p>
                      </div>

                      <div style={{ marginTop: "1rem" }}>
                        <div style={{ height: "5px", background: "var(--border-color)", borderRadius: "4px", overflow: "hidden", marginBottom: "0.75rem" }}>
                          <div style={{ height: "100%", width: `${progress}%`, background: progress >= 100 ? "#10b981" : "var(--accent-blue)", borderRadius: "4px" }} />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            Progress: {progress}%
                          </span>
                          <Link
                            href={`/learn/${item.id}`}
                            style={{
                              background: "var(--accent-blue)",
                              color: "white",
                              padding: "0.4rem 0.85rem",
                              borderRadius: "var(--radius-sm)",
                              fontWeight: 700,
                              fontSize: "0.8rem",
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem"
                            }}
                          >
                            <Play size={13} /> Continue
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

        {/* Right Column — My Certificates & Help */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Certificates Widget */}
          <div style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            padding: "1.25rem"
          }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Award size={18} style={{ color: "#f59e0b" }} /> My Certificates
            </h3>
            {certificates.length === 0 ? (
              <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                Complete any course syllabus to 100% to earn your verified completion certificate.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {certificates.map((cert) => (
                  <Link
                    key={cert.id}
                    href={`/verify/${cert.verification_id || cert.id}`}
                    target="_blank"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.65rem",
                      padding: "0.65rem",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-color)",
                      textDecoration: "none"
                    }}
                  >
                    <ShieldCheck size={18} style={{ color: "#10b981", flexShrink: 0 }} />
                    <div style={{ overflow: "hidden" }}>
                      <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {cert.course_title}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Verified Badge</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Help Widget */}
          <div style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            padding: "1.25rem"
          }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <HelpCircle size={18} style={{ color: "var(--accent-blue)" }} /> Need Help?
            </h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: "1.4" }}>
              Have questions about your courses or virtual labs? Ask our team anytime.
            </p>
            <Link
              href="/dashboard/student/tickets"
              style={{
                width: "100%",
                padding: "0.55rem",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-primary)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                fontWeight: 700,
                fontSize: "0.825rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                boxSizing: "border-box"
              }}
            >
              Get Help
            </Link>
          </div>

        </div>

      </div>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <StudentOnboardingModal onComplete={() => setShowOnboarding(false)} />
      )}
    </div>
  );
}
