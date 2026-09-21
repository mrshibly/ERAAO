import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Clock,
  BookOpen,
  Users,
  ShieldCheck,
  Star,
  Layers,
  PhoneCall,
  Calendar
} from "lucide-react";

export const metadata: Metadata = {
  title: "Meet the Instructor | Ayesha Anika | ERAAO Academy",
  description: "Meet Ayesha Anika, Lead English Communication Mentor at ERAAO Academy. Master spoken English, hesitation removal, and professional fluency.",
};

export default function MeetTheInstructorPage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", padding: "var(--spacing-section) 0" }}>
      <div className="container">
        
        {/* Breadcrumb / Category Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/about" style={{ color: "inherit", textDecoration: "none" }}>About</Link>
          <span>/</span>
          <span style={{ color: "var(--accent-blue)", fontWeight: 700 }}>Meet the Instructor</span>
        </div>

        {/* Hero Mentor Profile Section */}
        <div
          className="card"
          style={{
            position: "relative",
            padding: "clamp(1.5rem, 3.5vw, 3rem)",
            background: "linear-gradient(135deg, var(--card-bg) 0%, rgba(14, 165, 233, 0.05) 50%, rgba(124, 58, 237, 0.04) 100%)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-2xl)",
            marginBottom: "3.5rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.45)"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "3rem",
              alignItems: "center"
            }}
          >
            {/* Left Column: Instructor Portrait with Rich Frame */}
            <div style={{ position: "relative", textAlign: "center" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "540px",
                  aspectRatio: "16 / 9",
                  margin: "0 auto",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  boxShadow: "0 25px 50px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.12)",
                  border: "2px solid rgba(56, 189, 248, 0.25)"
                }}
              >
                <img
                  src="/instructor/ayesha-anika.jpg"
                  alt="Ayesha Anika - Lead English Communication Mentor"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center"
                  }}
                />
                
                {/* Floating Bottom Badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    insetInline: 0,
                    background: "linear-gradient(to top, rgba(10, 15, 30, 0.96) 0%, rgba(10, 15, 30, 0.6) 60%, transparent 100%)",
                    padding: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backdropFilter: "blur(4px)"
                  }}
                >
                  <div>
                    <span className="badge badge-blue" style={{ fontSize: "0.72rem", fontWeight: 700 }}>
                      Lead Mentor
                    </span>
                    <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "white", marginTop: "0.25rem" }}>
                      Ayesha Anika
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--accent-teal)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Award size={15} /> 4+ Years Exp.
                    </span>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.6)", marginTop: "0.15rem" }}>
                      500+ Mentees
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Core Mission */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.85rem", flexWrap: "wrap" }}>
                <span
                  className="badge badge-green"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    padding: "0.3rem 0.75rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem"
                  }}
                >
                  <Sparkles size={13} />
                  <span>English Communication Mentor</span>
                </span>
                <span className="badge badge-blue" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                  ERAAO Academy
                </span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(2rem, 3.8vw, 2.75rem)",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem"
                }}
              >
                Ayesha Anika
              </h1>

              <p style={{ fontSize: "var(--text-base)", color: "var(--accent-teal)", fontWeight: 700, marginBottom: "1.25rem" }}>
                Lead Spoken English Mentor • Specialist in Hesitation Removal &amp; Conversational Fluency
              </p>

              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-base)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                &ldquo;Speaking English should never feel like taking an intimidating grammar exam. Most learners in Bangladesh understand English when they read or listen, but freeze when speaking because they try to translate word-by-word in their head. My mission is to give you a safe, practice-rich environment where mistakes are welcomed as milestones, and speaking becomes second nature.&rdquo;
              </p>

              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.7, marginBottom: "2rem" }}>
                Over the past 4+ years, Ayesha has trained hundreds of students, career changers, job candidates, and freelancers. Her interactive classes focus on pattern recognition, substitution drills, and confidence-building live simulations.
              </p>

              {/* Competency Badges */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.85rem", marginBottom: "2.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                  <span>Spontaneous Sentence Building</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                  <span>Eliminate Mental Bengali Translation</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-sm)", color: "var(--accent-teal)", flexShrink: 0 }} />
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                  <span>1-on-1 Speech Diagnostics</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                  <span>Interview &amp; Client Pitch Confidence</span>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <Link
                  href="/academy/courses/professional-zero-to-fluent-english"
                  className="btn btn-primary"
                  style={{
                    padding: "0.85rem 1.75rem",
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "var(--text-sm)"
                  }}
                >
                  <span>Explore 12-Week Course</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/academy/free-bootcamp"
                  className="btn btn-outline"
                  style={{
                    padding: "0.85rem 1.5rem",
                    fontWeight: 700,
                    borderRadius: "var(--radius-md)",
                    fontSize: "var(--text-sm)"
                  }}
                >
                  <span>1-Day Free Bootcamp</span>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            FLAGSHIP COURSE DIRECTED BY AYESHA ANIKA
            ═══════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: "4rem" }}>
          <div className="section-header" style={{ textAlign: "left", marginBottom: "2rem" }}>
            <span className="section-badge" style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--accent-teal)", marginBottom: "0.5rem" }}>
              Featured Course
            </span>
            <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: "var(--text-primary)" }}>
              Programs Directed by Ayesha Anika
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)" }}>
              Step-by-step practitioner instruction designed to turn hesitant English into an intuitive, fluent superpower.
            </p>
          </div>

          <div
            className="academy-card hover-lift"
            style={{
              maxWidth: "850px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              overflow: "hidden",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-color)",
              background: "var(--card-bg)"
            }}
          >
            {/* Course Thumbnail Image */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "#060a16", overflow: "hidden" }}>
              <img
                src="/banners/professional-zero-to-fluent-english.jpg"
                alt=""
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(22px) brightness(0.5)", transform: "scale(1.25)", opacity: 0.85 }}
                aria-hidden="true"
              />
              <img
                src="/banners/professional-zero-to-fluent-english.jpg"
                alt="Professional Zero to Fluent English"
                style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", position: "relative", zIndex: 1 }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  background: "rgba(15, 23, 42, 0.85)",
                  backdropFilter: "blur(6px)",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 800,
                  color: "white"
                }}
              >
                12-Week Flagship Cohort
              </div>
            </div>

            {/* Course Info */}
            <div style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span className="badge badge-green">Beginner to Fluent</span>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-teal)", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Clock size={13} /> 36 Live Interactive Classes
                  </span>
                </div>

                <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                  Professional Zero to Fluent English
                </h3>

                <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  Turn fragmented school English into a spontaneous, usable spoken system. Learn sentence mechanics through context, substitution drills, and real-life practice with 1-on-1 mentor guidance.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <CheckCircle2 size={14} style={{ color: "var(--accent-blue)" }} />
                    <span>3 Live Interactive Classes per Week with Ayesha Anika</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Layers size={14} style={{ color: "var(--accent-teal)" }} />
                    <span>Downloadable Worksheets &amp; Self-Paced Audio Practice Packs</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Award size={14} style={{ color: "var(--accent-violet)" }} />
                    <span>Official Certificate of Completion &amp; Fluency Diagnostic</span>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>Total Tuition</div>
                  <div style={{ fontSize: "var(--text-xl)", fontWeight: 900, color: "var(--text-primary)" }}>
                    ৳12,000 <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>BDT</span>
                  </div>
                </div>

                <Link
                  href="/academy/courses/professional-zero-to-fluent-english"
                  className="btn btn-primary"
                  style={{
                    padding: "0.65rem 1.4rem",
                    fontWeight: 800,
                    borderRadius: "var(--radius-md)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem"
                  }}
                >
                  <span>View Full Syllabus</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            THE ERAAO 6-STAGE LEARNING PEDAGOGY
            ═══════════════════════════════════════════════════════════════ */}
        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "3.5rem" }}>
          <div style={{ textAlign: "center", maxWidth: "46rem", margin: "0 auto 3rem auto" }}>
            <span className="section-badge" style={{ background: "rgba(14, 165, 233, 0.1)", color: "var(--accent-blue)", marginBottom: "0.75rem" }}>
              Teaching Methodology
            </span>
            <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: "var(--text-primary)" }}>
              How Ayesha Anika Teaches Spoken English
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6, marginTop: "0.5rem" }}>
              A proven 6-stage cognitive cycle designed to bridge the gap between knowing English grammar rules and naturally speaking in conversation.
            </p>
          </div>

          <div className="learning-cycle-grid" style={{ marginBottom: "3rem" }}>
            {[
              {
                step: "01",
                name: "Understand",
                desc: "Sentence mechanics explained intuitively in plain language without terrifying grammar jargon.",
                color: "var(--accent-blue)"
              },
              {
                step: "02",
                name: "Notice",
                desc: "Identify natural language patterns in audio dialogues, movies, phone calls, and discussions.",
                color: "var(--accent-teal)"
              },
              {
                step: "03",
                name: "Build",
                desc: "Construct original sentences dynamically using the SVO framework and worksheet prompts.",
                color: "var(--accent-violet)"
              },
              {
                step: "04",
                name: "Practice",
                desc: "Low-pressure speaking drills in class with real-time, encouraging feedback from Ayesha.",
                color: "#f59e0b"
              },
              {
                step: "05",
                name: "Use",
                desc: "Put skills into action with live telephone roleplay, peer debates, and client meeting simulations.",
                color: "var(--color-success)"
              },
              {
                step: "06",
                name: "Recall",
                desc: "Audio listening testing and spaced repetition drills to lock spoken patterns into long-term memory.",
                color: "var(--accent-blue)"
              }
            ].map((cycle, idx) => (
              <div key={idx} className="academy-advantage-card" style={{ padding: "1.5rem 1.25rem", textAlign: "left" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 900, color: cycle.color, display: "block", marginBottom: "0.4rem" }}>
                  STAGE {cycle.step}
                </span>
                <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                  {cycle.name}
                </h3>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  {cycle.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Free Bootcamp CTA Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)",
              border: "1px solid rgba(14, 165, 233, 0.3)",
              borderRadius: "var(--radius-xl)",
              padding: "2.5rem",
              textAlign: "center",
              maxWidth: "750px",
              margin: "0 auto"
            }}
          >
            <span className="badge badge-green" style={{ marginBottom: "0.75rem" }}>
              Upcoming Free Session
            </span>
            <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 900, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Join Ayesha Anika&apos;s 1-Day Free English Bootcamp
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", maxWidth: "520px", margin: "0 auto 1.5rem auto", lineHeight: 1.6 }}>
              Experience her practical teaching firsthand on 26 September 2026. Understand exactly why you freeze when speaking English and how to overcome it.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/academy/free-bootcamp"
                className="btn btn-primary"
                style={{
                  padding: "0.75rem 1.75rem",
                  fontWeight: 800,
                  borderRadius: "var(--radius-md)"
                }}
              >
                <span>Register for Free Bootcamp</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
