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
import BrandLoader from "@/components/BrandLoader";

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
    return <BrandLoader message="Loading your student command center..." />;
  }

  const getCourseImage = (title: string) => {
    const t = (title || "").toLowerCase();
    if (t.includes("hack") || t.includes("penetration") || t.includes("security") || t.includes("cyber") || t.includes("defense")) {
      return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600";
    }
    if (t.includes("ai") || t.includes("intelligence") || t.includes("machine") || t.includes("model") || t.includes("neural")) {
      return "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600";
    }
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600";
  };

  const currentActiveCourse = activeCourses[0];
  const activeProgress = currentActiveCourse ? Math.round(currentActiveCourse.progress ?? currentActiveCourse.completion_pct ?? 0) : 0;
  const completedLessonsTotal = activeCourses.reduce((acc, c) => acc + Math.round((((c.progress ?? c.completion_pct ?? 0)) / 100) * 10), 0);

  return (
    <div style={{ paddingBottom: "3rem" }}>
      {/* Hero Welcome Banner */}
      <div className="hero-banner anim-fade-up" style={{
        background: "linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-dark-secondary) 100%)",
        borderRadius: "var(--radius-lg)",
        padding: "2.5rem 2rem",
        color: "white",
        position: "relative",
        overflow: "hidden",
        boxShadow: "var(--shadow-lg)",
        marginBottom: "2rem",
        border: "1px solid rgba(255, 255, 255, 0.08)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "600px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "var(--accent-blue-bg)", border: "1px solid rgba(14, 165, 233, 0.4)", color: "var(--accent-blue)", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "var(--text-xs)", fontWeight: 700, marginBottom: "0.85rem" }}>
              <Sparkles size={14} /> Student Dashboard
            </div>
            <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--text-on-dark)", letterSpacing: "-0.01em", lineHeight: "1.25" }}>
              Welcome back, {user?.full_name?.split(" ")[0] || "Student"}!
            </h1>
            <p style={{ color: "var(--text-on-dark-muted)", fontSize: "var(--text-sm)", marginTop: "0.4rem", lineHeight: "1.5" }}>
              {currentActiveCourse
                ? `You are currently learning ${currentActiveCourse.course?.title || "your active course"}. Click below to resume!`
                : "You aren't enrolled in any courses yet. Explore our catalog to start your learning journey."}
            </p>

            {currentActiveCourse ? (
              <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <Link
                  href={`/learn/${currentActiveCourse.id}`}
                  className="btn btn-accent"
                  style={{
                    padding: "0.7rem 1.5rem",
                    fontWeight: 800,
                    fontSize: "var(--text-sm)"
                  }}
                >
                  <Play size={16} fill="white" />
                  <span>Continue Learning ({activeProgress}%)</span>
                </Link>
                <Link
                  href="/dashboard/student/courses"
                  style={{ color: "var(--text-on-dark-muted)", fontSize: "var(--text-xs)", textDecoration: "none", fontWeight: 600 }}
                >
                  See All ({activeCourses.length}) →
                </Link>
              </div>
            ) : (
              <div style={{ marginTop: "1.5rem" }}>
                <Link
                  href="/dashboard/student/catalog"
                  className="btn btn-primary"
                  style={{
                    padding: "0.7rem 1.5rem",
                    fontWeight: 800,
                    fontSize: "var(--text-sm)"
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
            borderRadius: "var(--radius-lg)",
            padding: "1.25rem 1.75rem",
            textAlign: "center",
            minWidth: "180px"
          }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "50%", background: "var(--color-success-bg)", color: "var(--color-success)", marginBottom: "0.5rem" }}>
              <Activity size={22} />
            </div>
            <div style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-on-dark)" }}>
              {activeCourses.length}
            </div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--text-on-dark-muted)", fontWeight: 700, textTransform: "uppercase" }}>
              Enrolled Courses
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Metrics */}
      <div className="card-grid-4 anim-fade-up" style={{ marginBottom: "2.25rem" }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "var(--accent-blue-bg)", color: "var(--accent-blue)" }}>
            <BookOpen size={20} />
          </div>
          <div>
            <div className="stat-value">{stats.enrolled_courses || activeCourses.length}</div>
            <div className="stat-label">Enrolled Courses</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "var(--color-success-bg)", color: "var(--color-success)" }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div className="stat-value">{stats.completed_courses}</div>
            <div className="stat-label">Completed Courses</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "var(--color-warning-bg)", color: "var(--color-warning)" }}>
            <Award size={20} />
          </div>
          <div>
            <div className="stat-value">{stats.certificates_earned || certificates.length}</div>
            <div className="stat-label">Certificates Earned</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(139, 92, 246, 0.1)", color: "var(--accent-violet)" }}>
            <Clock size={20} />
          </div>
          <div>
            <div className="stat-value">{completedLessonsTotal}</div>
            <div className="stat-label">Completed Lessons</div>
          </div>
        </div>
      </div>

      {/* Main Content Layout — Symmetric 2-Column Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.75rem",
        alignItems: "start"
      }}>

        {/* Left Column — My Enrolled Courses */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "32px", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <BookOpen size={20} style={{ color: "var(--accent-blue)" }} /> My Courses
            </h2>
            {activeCourses.length > 0 && (
              <Link href="/dashboard/student/courses" style={{ color: "var(--accent-blue)", fontSize: "var(--text-xs)", fontWeight: 700, textDecoration: "none" }}>
                See All ({activeCourses.length}) →
              </Link>
            )}
          </div>

          {activeCourses.length === 0 ? (
            <div className="card hover-lift" style={{
              padding: "3.5rem 2rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-sm)"
            }}>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "var(--accent-blue-bg)",
                color: "var(--accent-blue)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.15)"
              }}>
                <BookOpen size={28} />
              </div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                No active courses
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", maxWidth: "380px", margin: "0 auto 1.5rem auto", lineHeight: "1.6" }}>
                Enroll in a course to start learning and tracking your progress.
              </p>
              <Link href="/dashboard/student/catalog" className="btn btn-primary" style={{ padding: "0.7rem 1.5rem", fontSize: "var(--text-sm)" }}>
                <span>Find Courses</span>
                <ArrowRight size={16} />
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
                    className="card hover-lift"
                    style={{
                      overflow: "hidden",
                      display: "flex",
                      padding: 0
                    }}
                  >
                    <div style={{ width: "160px", position: "relative", overflow: "hidden", background: "var(--bg-dark)", flexShrink: 0 }}>
                      <img src={getCourseImage(course.title)} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>

                    <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, color: "var(--text-primary)", lineHeight: "1.3" }}>
                            {course.title || "Untitled Course"}
                          </h3>
                          <span className={`badge ${progress >= 100 ? "badge-green" : "badge-blue"}`}>
                            {progress >= 100 ? "Completed" : `${progress}%`}
                          </span>
                        </div>
                        <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "0.3rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {course.description || "Interactive bootcamp syllabus with hands-on labs."}
                        </p>
                      </div>

                      <div style={{ marginTop: "1rem" }}>
                        <div className="progress-bar" style={{ marginBottom: "0.75rem" }}>
                          <div className="progress-bar-fill" style={{ width: `${progress}%`, background: progress >= 100 ? "var(--color-success)" : "var(--accent-blue)" }} />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                            Progress: {progress}%
                          </span>
                          <Link
                            href={`/learn/${item.id}`}
                            className="btn btn-primary"
                            style={{
                              padding: "0.4rem 0.85rem",
                              fontSize: "var(--text-xs)"
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
          <div style={{ display: "flex", alignItems: "center", minHeight: "32px", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Award size={20} style={{ color: "var(--color-warning)" }} /> Overview & Support
            </h2>
          </div>

          {/* Certificates Widget */}
          <div className="card hover-lift" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "var(--text-sm)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Award size={18} style={{ color: "var(--color-warning)" }} /> My Certificates
            </h3>
            {certificates.length === 0 ? (
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Complete any course syllabus to 100% to earn your verified completion certificate.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {certificates.map((cert) => (
                  <Link
                    key={cert.id}
                    href={`/verify/${cert.verification_id || cert.id}`}
                    target="_blank"
                    className="card"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.65rem",
                      padding: "0.65rem",
                      textDecoration: "none"
                    }}
                  >
                    <ShieldCheck size={18} style={{ color: "var(--color-success)", flexShrink: 0 }} />
                    <div style={{ overflow: "hidden" }}>
                      <div style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {cert.course_title}
                      </div>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Verified Badge</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Help Widget */}
          <div className="card hover-lift" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "var(--text-sm)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <HelpCircle size={18} style={{ color: "var(--accent-blue)" }} /> Need Help?
            </h3>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginBottom: "1.25rem", lineHeight: "1.5" }}>
              Have questions about your courses or virtual labs? Ask our team anytime.
            </p>
            <Link
              href="/dashboard/student/tickets"
              className="btn btn-outline"
              style={{
                width: "100%",
                padding: "0.6rem",
                fontSize: "var(--text-xs)",
                justifyContent: "center"
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
