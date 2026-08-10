"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen, Award, CheckCircle2, Clock, Play, Flame, ShieldCheck,
  ArrowRight, Sparkles, HelpCircle, Activity, Compass, UserCheck
} from "lucide-react";
import StudentOnboardingModal from "@/components/StudentOnboardingModal";
import Logo from "@/components/Logo";

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

        // 1. Fetch student stats overview
        const statsRes = await fetch("/api/v1/dashboard/student/overview", { headers });
        if (statsRes.ok) {
          setStats(await statsRes.json());
        }

        // 2. Fetch active enrollments
        const enrollRes = await fetch("/api/v1/enrollments/me", { headers });
        if (enrollRes.ok) {
          setActiveCourses(await enrollRes.json());
        }

        // 3. Fetch certificates
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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "75vh", backgroundColor: "var(--bg-primary)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid rgba(14, 165, 233, 0.15)", borderTopColor: "var(--accent-blue)", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
          <p style={{ color: "var(--text-secondary)", fontWeight: 600 }}>Loading your dashboard...</p>
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
    <div style={{ minHeight: "95vh", paddingBottom: "3rem" }}>
      <style>{`
        .portal-header-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 2rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          box-shadow: var(--shadow-sm);
        }
        .hero-resume-card {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-radius: var(--radius-lg);
          padding: 2.25rem 2rem;
          color: white;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.3);
          margin-bottom: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .stats-grid-dynamic {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 1024px) {
          .stats-grid-dynamic { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .stats-grid-dynamic { grid-template-columns: 1fr; }
        }
        .stat-card-clean {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: var(--shadow-sm);
        }
        .portal-layout-grid {
          display: grid;
          grid-template-columns: 2.4fr 1fr;
          gap: 2.5rem;
        }
        @media (max-width: 1024px) {
          .portal-layout-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Brand Header Banner with Official ERAAO Logo */}
      <div className="portal-header-card anim-fade-up">
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <Logo size={38} withText={true} textColor="var(--text-primary)" href={null} />
          <div style={{ height: "28px", width: "1px", background: "var(--border-color)" }} />
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Student Portal
            </div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
              Welcome back, {user?.full_name || "Student"}
            </h1>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link
            href="/dashboard/student/catalog"
            style={{
              background: "var(--accent-blue)",
              color: "white",
              padding: "0.6rem 1.25rem",
              borderRadius: "var(--radius-md)",
              fontWeight: 700,
              fontSize: "0.875rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem"
            }}
          >
            <Compass size={16} /> Find Courses
          </Link>
        </div>
      </div>

      {/* Hero Resume Learning Banner */}
      <div className="hero-resume-card anim-fade-up">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "620px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(14, 165, 233, 0.2)", border: "1px solid rgba(14, 165, 233, 0.4)", color: "#38bdf8", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700, marginBottom: "1rem" }}>
              <Sparkles size={14} /> Active Learning Track
            </div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em", lineHeight: "1.25" }}>
              {currentActiveCourse
                ? (currentActiveCourse.course?.title || "Your Active Course")
                : "Start Learning Today"}
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.925rem", marginTop: "0.5rem", lineHeight: "1.5" }}>
              {currentActiveCourse
                ? `You have completed ${activeProgress}% of this course. Click below to pick up right where you left off.`
                : "You aren't enrolled in any courses yet. Browse our catalog to join your first bootcamp!"}
            </p>

            {currentActiveCourse ? (
              <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <Link
                  href={`/learn/${currentActiveCourse.id}`}
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                    color: "white",
                    padding: "0.75rem 1.75rem",
                    borderRadius: "12px",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: "0 8px 20px rgba(14, 165, 233, 0.35)"
                  }}
                >
                  <Play size={18} fill="white" />
                  <span>Continue Learning ({activeProgress}%)</span>
                </Link>
                <Link
                  href="/dashboard/student/courses"
                  style={{ color: "#94a3b8", fontSize: "0.875rem", textDecoration: "none", fontWeight: 600 }}
                >
                  See All →
                </Link>
              </div>
            ) : (
              <div style={{ marginTop: "1.5rem" }}>
                <Link
                  href="/dashboard/student/catalog"
                  style={{
                    background: "var(--accent-blue)",
                    color: "white",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "12px",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                >
                  <Compass size={18} /> Explore Courses <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>

          {/* Real Dynamic Progress Badge */}
          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "1.5rem",
            minWidth: "200px",
            textAlign: "center"
          }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", color: "#10b981", marginBottom: "0.75rem" }}>
              <Activity size={26} />
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff" }}>
              {activeCourses.length} {activeCourses.length === 1 ? "Course" : "Courses"}
            </div>
            <div style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase" }}>
              Active Enrolled Syllabi
            </div>
          </div>
        </div>
      </div>

      {/* Real Dynamic Metrics Bar */}
      <div className="stats-grid-dynamic anim-fade-up">
        <div className="stat-card-clean">
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(14, 165, 233, 0.1)", color: "var(--accent-blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={22} />
          </div>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.enrolled_courses || activeCourses.length}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>Enrolled Courses</div>
          </div>
        </div>

        <div className="stat-card-clean">
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.completed_courses}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>Completed Courses</div>
          </div>
        </div>

        <div className="stat-card-clean">
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Award size={22} />
          </div>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.certificates_earned || certificates.length}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>Certificates Earned</div>
          </div>
        </div>

        <div className="stat-card-clean">
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{completedLessonsTotal}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>Completed Lessons</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="portal-layout-grid">

        {/* Left Column — Real Active Enrolled Courses */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>
              My Courses
            </h2>
            <Link href="/dashboard/student/courses" style={{ color: "var(--accent-blue)", fontSize: "0.85rem", fontWeight: 700, textDecoration: "none" }}>
              See All ({activeCourses.length}) →
            </Link>
          </div>

          {activeCourses.length === 0 ? (
            <div style={{
              background: "var(--card-bg)",
              border: "1px dashed var(--border-color)",
              borderRadius: "var(--radius-lg)",
              padding: "3rem 1.5rem",
              textAlign: "center",
              marginBottom: "2rem"
            }}>
              <BookOpen size={36} style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }} />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>No active courses</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.3rem", marginBottom: "1.25rem" }}>
                Enroll in a course to start learning and tracking your progress.
              </p>
              <Link href="/dashboard/student/catalog" style={{
                background: "var(--accent-blue)",
                color: "white",
                padding: "0.6rem 1.25rem",
                borderRadius: "var(--radius-md)",
                fontWeight: 700,
                fontSize: "0.875rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem"
              }}>
                Find Courses <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
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
                      transition: "all 0.25s ease"
                    }}
                    className="hover-lift"
                  >
                    <div style={{ width: "170px", position: "relative", overflow: "hidden", background: "#0f172a", flexShrink: 0 }}>
                      <img src={getCourseImage(course.title)} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>

                    <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: "1.3" }}>
                            {course.title || "Cybersecurity Course"}
                          </h3>
                          <span style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            padding: "0.2rem 0.6rem",
                            borderRadius: "12px",
                            background: progress >= 100 ? "rgba(16, 185, 129, 0.1)" : "rgba(14, 165, 233, 0.1)",
                            color: progress >= 100 ? "#10b981" : "var(--accent-blue)"
                          }}>
                            {progress >= 100 ? "Completed" : `${progress}% Done`}
                          </span>
                        </div>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.35rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {course.description || "Hands-on syllabus with practical lab exercises."}
                        </p>
                      </div>

                      <div style={{ marginTop: "1rem" }}>
                        <div style={{ height: "6px", background: "var(--border-color)", borderRadius: "4px", overflow: "hidden", marginBottom: "0.85rem" }}>
                          <div style={{ height: "100%", width: `${progress}%`, background: progress >= 100 ? "#10b981" : "var(--accent-blue)", borderRadius: "4px" }} />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                            Syllabus Progress: {progress}%
                          </span>
                          <Link
                            href={`/learn/${item.id}`}
                            style={{
                              background: "var(--accent-blue)",
                              color: "white",
                              padding: "0.45rem 1rem",
                              borderRadius: "var(--radius-sm)",
                              fontWeight: 700,
                              fontSize: "0.825rem",
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.35rem"
                            }}
                          >
                            <Play size={14} /> Continue
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

        {/* Right Column — Real Widgets & Quick Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

          {/* Real Verified Badges Widget */}
          <div style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Award size={18} style={{ color: "#f59e0b" }} /> My Certificates
            </h3>
            {certificates.length === 0 ? (
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Complete any course syllabus to 100% to earn your verified completion certificate.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {certificates.map((cert) => (
                  <Link
                    key={cert.id}
                    href={`/verify/${cert.verification_id || cert.id}`}
                    target="_blank"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-color)",
                      textDecoration: "none"
                    }}
                  >
                    <ShieldCheck size={20} style={{ color: "#10b981", flexShrink: 0 }} />
                    <div style={{ overflow: "hidden" }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {cert.course_title}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Verified Badge</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Helpdesk Widget */}
          <div style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <HelpCircle size={18} style={{ color: "var(--accent-blue)" }} /> Need Help?
            </h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
              Have questions about your courses or virtual labs? Ask our team anytime.
            </p>
            <Link
              href="/dashboard/student/tickets"
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-primary)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                fontWeight: 700,
                fontSize: "0.85rem",
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
