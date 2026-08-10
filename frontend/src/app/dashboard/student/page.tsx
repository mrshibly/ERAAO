"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen, Award, CheckCircle, Clock, Play, Flame, Shield, Cpu,
  Terminal, Activity, ArrowRight, Calendar, Sparkles, ExternalLink,
  ShieldCheck, HelpCircle, Layers, Compass
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

        // Fetch student stats overview
        const statsRes = await fetch("/api/v1/dashboard/student/overview", { headers });
        if (statsRes.ok) {
          setStats(await statsRes.json());
        }

        // Fetch active enrollments
        const enrollRes = await fetch("/api/v1/enrollments/me", { headers });
        if (enrollRes.ok) {
          setActiveCourses(await enrollRes.json());
        }

        // Fetch certificates
        const certRes = await fetch("/api/v1/certificates/me", { headers });
        if (certRes.ok) {
          setCertificates(await certRes.json());
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
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
          <p style={{ color: "var(--text-secondary)", fontWeight: 600 }}>Loading Student Learning Command Center...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const getCourseImage = (title: string) => {
    const t = (title || "").toLowerCase();
    if (t.includes("hack") || t.includes("penetration") || t.includes("security") || t.includes("defense") || t.includes("cyber")) {
      return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600";
    }
    if (t.includes("ai") || t.includes("intelligence") || t.includes("machine") || t.includes("model") || t.includes("neural")) {
      return "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600";
    }
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600";
  };

  const currentActiveCourse = activeCourses[0];
  const activeProgress = currentActiveCourse ? Math.round(currentActiveCourse.progress || 0) : 0;

  return (
    <div style={{ minHeight: "95vh", paddingBottom: "3rem" }}>
      <style>{`
        .portal-hero-banner {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-radius: var(--radius-lg);
          padding: 2.5rem 2rem;
          color: white;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.3);
          margin-bottom: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .portal-hero-banner::after {
          content: "";
          position: absolute;
          right: -50px;
          bottom: -50px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .portal-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 1024px) {
          .portal-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .portal-stats-grid { grid-template-columns: 1fr; }
        }
        .portal-stat-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: var(--shadow-sm);
        }
        .portal-grid-main {
          display: grid;
          grid-template-columns: 2.4fr 1fr;
          gap: 2.5rem;
        }
        @media (max-width: 1024px) {
          .portal-grid-main { grid-template-columns: 1fr; }
        }
        .streak-tracker-bar {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          box-shadow: var(--shadow-sm);
        }
        @media (max-width: 640px) {
          .streak-tracker-bar { flex-direction: column; align-items: flex-start; }
        }
        .streak-days-flex {
          display: flex;
          gap: 0.5rem;
        }
        .streak-day-bubble {
          width: 34px;
          height: 34px;
          borderRadius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }
      `}</style>

      {/* Hero Banner — Quick Resume Learning */}
      <div className="portal-hero-banner anim-fade-up">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "600px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(14, 165, 233, 0.2)", border: "1px solid rgba(14, 165, 233, 0.4)", color: "#38bdf8", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700, marginBottom: "1rem" }}>
              <Sparkles size={14} /> Student Command Center
            </div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em", lineHeight: "1.2" }}>
              Welcome back, {user?.full_name || "Student"}!
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginTop: "0.5rem", lineHeight: "1.5" }}>
              {currentActiveCourse
                ? `You're currently making progress in ${currentActiveCourse.course?.title || "your cybersecurity bootcamp"}. Keep your learning momentum going!`
                : "Explore ERAAO's industry-grade bootcamps in Ethical Hacking, Cyber Defense, and Applied AI to kickstart your journey."}
            </p>

            {currentActiveCourse && (
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
                  <span>Resume Course ({activeProgress}% Done)</span>
                </Link>
                <Link
                  href="/dashboard/student/courses"
                  style={{ color: "#94a3b8", fontSize: "0.875rem", textDecoration: "none", fontWeight: 600 }}
                >
                  View All Syllabi →
                </Link>
              </div>
            )}
          </div>

          {/* Quick Learning Stats Widget */}
          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "1.5rem",
            minWidth: "220px",
            textAlign: "center"
          }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", color: "#10b981", marginBottom: "0.75rem" }}>
              <Flame size={26} />
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff" }}>5 Days</div>
            <div style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Current Study Streak 🔥</div>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="portal-stats-grid anim-fade-up">
        <div className="portal-stat-card">
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(14, 165, 233, 0.1)", color: "var(--accent-blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={22} />
          </div>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.enrolled_courses}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>Enrolled Bootcamps</div>
          </div>
        </div>

        <div className="portal-stat-card">
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckCircle size={22} />
          </div>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.completed_courses}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>Completed Syllabi</div>
          </div>
        </div>

        <div className="portal-stat-card">
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Award size={22} />
          </div>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.certificates_earned}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>Verified Badges</div>
          </div>
        </div>

        <div className="portal-stat-card">
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>18.5 hrs</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>Weekly Lab Time</div>
          </div>
        </div>
      </div>

      {/* Main Command Center Grid */}
      <div className="portal-grid-main">

        {/* Left Column — Active Courses & Lab Modules */}
        <div>
          {/* Weekly Learning Activity Tracker */}
          <div className="streak-tracker-bar">
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Activity size={18} style={{ color: "var(--accent-blue)" }} /> Learning Activity Tracker
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                Complete 1 module daily to maintain your study streak.
              </p>
            </div>

            <div className="streak-days-flex">
              {[
                { day: "M", active: true },
                { day: "T", active: true },
                { day: "W", active: true },
                { day: "T", active: true },
                { day: "F", active: true },
                { day: "S", active: false },
                { day: "S", active: false }
              ].map((d, i) => (
                <div
                  key={i}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: d.active ? "var(--accent-blue)" : "var(--bg-primary)",
                    color: d.active ? "white" : "var(--text-muted)",
                    border: d.active ? "none" : "1px solid var(--border-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}
                >
                  {d.day}
                </div>
              ))}
            </div>
          </div>

          {/* Section Title */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>
              Active Enrolled Syllabi
            </h2>
            <Link href="/dashboard/student/courses" style={{ color: "var(--accent-blue)", fontSize: "0.85rem", fontWeight: 700, textDecoration: "none" }}>
              View All ({activeCourses.length}) →
            </Link>
          </div>

          {/* Courses List */}
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
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>No enrolled courses yet</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.3rem", marginBottom: "1.25rem" }}>
                Join an ERAAO bootcamp to access video lectures, virtual labs, and certifications.
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
                Browse Catalog <ArrowRight size={16} />
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
                      transition: "all 0.25 ease"
                    }}
                    className="hover-lift"
                  >
                    <div style={{ width: "180px", position: "relative", overflow: "hidden", background: "#0f172a", flexShrink: 0 }}>
                      <img src={getCourseImage(course.title)} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>

                    <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: "1.3" }}>
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
                          {course.description || "Master hands-on labs and core security principles."}
                        </p>
                      </div>

                      <div style={{ marginTop: "1rem" }}>
                        <div style={{ height: "6px", background: "var(--border-color)", borderRadius: "4px", overflow: "hidden", marginBottom: "0.85rem" }}>
                          <div style={{ height: "100%", width: `${progress}%`, background: progress >= 100 ? "#10b981" : "var(--accent-blue)", borderRadius: "4px" }} />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                            Modules: 6 Completed
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
                            <Play size={14} /> Continue Lesson
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

        {/* Right Column — Widgets & Upcoming Live Sessions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

          {/* Upcoming Live Sessions Widget */}
          <div style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Calendar size={18} style={{ color: "var(--accent-blue)" }} /> Live Lab Sessions & Q&A
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { title: "Penetration Testing Lab Q&A", time: "Tomorrow, 8:00 PM BDT", tag: "Interactive" },
                { title: "AI Security & Threat Modeling Workshop", time: "Friday, 7:30 PM BDT", tag: "Bootcamp" }
              ].map((ev, i) => (
                <div key={i} style={{ padding: "0.85rem", borderRadius: "var(--radius-sm)", background: "var(--bg-primary)", border: "1px solid var(--border-color)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{ev.title}</div>
                    <span style={{ fontSize: "0.7rem", color: "var(--accent-blue)", fontWeight: 700 }}>{ev.tag}</span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.3rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Clock size={12} /> {ev.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Badges Widget */}
          <div style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Award size={18} style={{ color: "#f59e0b" }} /> Verified Badges
            </h3>
            {certificates.length === 0 ? (
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                No certificates earned yet. Complete your first syllabus to earn a verified credential badge.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {certificates.slice(0, 2).map((cert) => (
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
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Verified Credentials</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Academic Support Widget */}
          <div style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <HelpCircle size={18} style={{ color: "var(--accent-blue)" }} /> Need Assistance?
            </h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
              Encountering virtual lab issues or syllabus questions? Our instructors are ready to assist.
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
              Open Support Ticket
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
