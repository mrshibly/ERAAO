import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Cpu, Target, CheckCircle2, Sparkles, ArrowRight, Award, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Meet the Instructor | ERAAO Academy",
  description: "Learn more about our Lead English Communication Mentor, Ayesha Anika, directing the Professional Zero to Fluent English program.",
};

export default function AboutPage() {
  return (
    <div style={{ padding: "var(--spacing-section) 0" }}>
      <div className="container">
        
        {/* Hero Section */}
        <div className="section-header">
          <span className="section-badge">
            Who We Are
          </span>
          <h1 className="section-title">About Our Academy</h1>
          <p className="section-subtitle">
            We exist to empower ambitious students, professionals, and freelancers with real-world communication fluency and high-demand modern skills.
          </p>
        </div>

        {/* Visual Banner */}
        <div style={{
          position: "relative",
          height: "400px",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          marginBottom: "var(--spacing-section)",
          boxShadow: "var(--shadow-lg)"
        }}>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop"
            alt="Academy Team Work"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.9) 100%)",
            display: "flex",
            alignItems: "flex-end",
            padding: "3rem"
          }}>
            <div>
              <h3 style={{ color: "var(--text-on-dark)", fontSize: "var(--text-2xl)", fontWeight: 800 }}>Empowering Confident Communicators</h3>
              <p style={{ color: "var(--text-on-dark-subtle)", marginTop: "0.5rem", maxWidth: "32rem", fontSize: "var(--text-base)" }}>
                Our cognitive, drill-based methodology enables learners to eliminate hesitation, master spontaneous speaking, and thrive in international careers.
              </p>
            </div>
          </div>
        </div>

        {/* Value Pillars */}
        <div className="card-grid" style={{ marginBottom: "var(--spacing-section)" }}>
          <div className="card">
            <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "var(--accent-blue-bg)", color: "var(--accent-blue)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "0.75rem" }}>The 6-Stage Learning Cycle</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>
              No dry memorization. We advance learners through Understand, Notice, Build, Practice, Use, and Recall for permanent speech retention.
            </p>
          </div>

          <div className="card">
            <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "rgba(139, 92, 246, 0.1)", color: "var(--accent-violet)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <Cpu size={24} />
            </div>
            <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "0.75rem" }}>Practical Conversational Drills</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>
              Interactive pair exercises, live phone scenarios, client pitching simulations, and hesitation removal drills every single week.
            </p>
          </div>

          <div className="card">
            <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "rgba(13, 148, 136, 0.1)", color: "var(--accent-teal)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "0.75rem" }}>1-on-1 Mentor Feedback</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>
              Direct audio and speech diagnostics from our dedicated mentor to correct pronunciation and unlock natural fluency.
            </p>
          </div>
        </div>

        {/* Meet the Instructor Spotlight Section */}
        <div id="instructor" style={{ borderTop: "1px solid var(--border-color)", paddingTop: "var(--spacing-section)" }}>
          <div className="section-header" style={{ marginBottom: "2.5rem" }}>
            <span className="section-badge" style={{ background: "rgba(14, 165, 233, 0.1)", color: "var(--accent-blue)" }}>
              Lead English Mentor
            </span>
            <h2 className="section-title">Meet the Instructor</h2>
            <p className="section-subtitle">Guiding you step-by-step from zero to spontaneous English fluency.</p>
          </div>

          <div
            className="card hover-lift"
            style={{
              padding: "2.5rem",
              background: "linear-gradient(135deg, var(--card-bg) 0%, rgba(14, 165, 233, 0.04) 100%)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-xl)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2.5rem",
              alignItems: "center"
            }}
          >
            {/* Instructor Portrait */}
            <div style={{ position: "relative", textAlign: "center" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "420px",
                  height: "380px",
                  margin: "0 auto",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                  border: "2px solid rgba(56, 189, 248, 0.2)"
                }}
              >
                <img
                  src="/instructor/ayesha-anika.jpg"
                  alt="Ayesha Anika - Lead English Mentor"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    insetInline: 0,
                    background: "linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)",
                    padding: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <span className="badge badge-blue" style={{ fontSize: "0.72rem", fontWeight: 700 }}>
                    Official Academy Mentor
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--accent-teal)", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Award size={14} /> 4+ Years Exp.
                  </span>
                </div>
              </div>
            </div>

            {/* Instructor Bio & Credentials */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                <span className="badge badge-green" style={{ fontSize: "0.72rem", fontWeight: 800, padding: "0.25rem 0.65rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                  <Sparkles size={12} />
                  <span>English Fluency Specialist</span>
                </span>
                <span className="badge badge-blue" style={{ fontSize: "0.72rem", fontWeight: 700 }}>
                  Senior Communication Mentor
                </span>
              </div>

              <h3 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "0.4rem" }}>
                Ayesha Anika
              </h3>

              <p style={{ fontSize: "var(--text-sm)", color: "var(--accent-teal)", fontWeight: 700, marginBottom: "1.25rem" }}>
                Lead English Communication Mentor • 4+ Years of Dedicated Mentorship
              </p>

              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-base)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Ayesha Anika has guided hundreds of students, working professionals, and freelancers to eliminate speech hesitation and achieve spontaneous English fluency. Her teaching pedagogy centers on the 6-stage ERAAO learning cycle—replacing mechanical grammar memorization with active sentence-building frameworks, listening comprehension labs, and real-time conversational practice.
              </p>

              {/* Highlights Checklist */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.85rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                  <span>100% Practical Speaking Drills</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                  <span>Hesitation &amp; Fear Removal</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                  <span>1-on-1 Speech Diagnostics</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                  <span>Client Pitch &amp; Interview Mastery</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <Link
                  href="/academy/courses/professional-zero-to-fluent-english"
                  className="btn btn-primary"
                  style={{
                    padding: "0.75rem 1.5rem",
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderRadius: "var(--radius-md)"
                  }}
                >
                  <span>Explore Zero to Fluent Course</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/academy/free-bootcamp"
                  className="btn btn-outline"
                  style={{
                    padding: "0.75rem 1.4rem",
                    fontWeight: 700,
                    borderRadius: "var(--radius-md)"
                  }}
                >
                  <span>1-Day Free Bootcamp</span>
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
