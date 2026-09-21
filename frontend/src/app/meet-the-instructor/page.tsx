import { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Bot,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
  Clock,
  Send,
  MessageSquare
} from "lucide-react";

export const metadata: Metadata = {
  title: "Meet the Instructors & Mentors | ERAAO Academy",
  description: "Meet the lead faculty at ERAAO Academy: Ayesha Anika (Lead English Communication Mentor) and Mahmudur Rahman Shibly (Co-Founder & Technical Lead, AI & Cybersecurity).",
};

export default function MeetTheInstructorsPage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", padding: "var(--spacing-section) 0" }}>
      <div className="container">
        
        {/* Breadcrumb / Category Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/about" style={{ color: "inherit", textDecoration: "none" }}>About</Link>
          <span>/</span>
          <span style={{ color: "var(--accent-blue)", fontWeight: 700 }}>Faculty &amp; Instructors</span>
        </div>

        {/* Section Title */}
        <div style={{ textAlign: "center", maxWidth: "48rem", margin: "0 auto 3.5rem auto" }}>
          <span className="badge badge-blue" style={{ marginBottom: "0.75rem" }}>
            ERAAO Academic Faculty
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Learn Directly from <span className="gradient-text">Industry Practitioners</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-base)", marginTop: "0.75rem", lineHeight: 1.6 }}>
            Our bootcamps are architected and mentored by veteran specialists who bring real-world production systems and practical communication frameworks straight into your learning journey.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            INSTRUCTOR 01: AYESHA ANIKA (English Communication)
            ═══════════════════════════════════════════════════════════════ */}
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
                  src="/banners/professional-zero-to-fluent-english.jpg"
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
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backdropFilter: "blur(4px)"
                  }}
                >
                  <div>
                    <span className="badge badge-green" style={{ fontSize: "0.72rem", fontWeight: 700 }}>
                      Lead English Mentor
                    </span>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "white", marginTop: "0.25rem" }}>
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
                  Active Live Cohorts
                </span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem"
                }}
              >
                Ayesha Anika
              </h2>

              <p style={{ fontSize: "var(--text-sm)", color: "var(--accent-teal)", fontWeight: 700, marginBottom: "1.1rem" }}>
                Lead Spoken English Mentor • Specialist in Hesitation Removal &amp; Conversational Fluency
              </p>

              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                &ldquo;Speaking English should never feel like taking an intimidating grammar exam. Most learners understand English when they read or listen, but freeze when speaking because they try to translate word-by-word in their head. My mission is to give you a safe, practice-rich environment where mistakes are welcomed as milestones, and speaking becomes second nature.&rdquo;
              </p>

              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                Over the past 4+ years, Ayesha has trained hundreds of students, career changers, job candidates, and freelancers. Her interactive classes focus on pattern recognition, substitution drills, and confidence-building live simulations.
              </p>

              {/* Competency Badges */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={15} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                  <span>Spontaneous Sentence Building</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={15} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                  <span>Eliminate Mental Bengali Translation</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={15} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                  <span>1-on-1 Speech Diagnostics</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={15} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                  <span>Interview &amp; Client Pitch Confidence</span>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <Link
                  href="/academy/free-bootcamp"
                  className="btn btn-primary"
                  style={{
                    padding: "0.8rem 1.6rem",
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "var(--text-xs)"
                  }}
                >
                  <Send size={15} />
                  <span>Join Free Bootcamp (Live Now)</span>
                </Link>

                <Link
                  href="/academy/courses/professional-zero-to-fluent-english"
                  className="btn btn-outline"
                  style={{
                    padding: "0.8rem 1.4rem",
                    fontWeight: 700,
                    borderRadius: "var(--radius-md)",
                    fontSize: "var(--text-xs)"
                  }}
                >
                  <span>View 12-Week Syllabus</span>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            INSTRUCTOR 02: MAHMUDUR RAHMAN (SHIBLY) (AI & Cybersecurity)
            ═══════════════════════════════════════════════════════════════ */}
        <div
          className="card"
          style={{
            position: "relative",
            padding: "clamp(1.5rem, 3.5vw, 3rem)",
            background: "linear-gradient(135deg, var(--card-bg) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(244, 63, 94, 0.04) 100%)",
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
                  border: "2px solid rgba(168, 85, 247, 0.25)"
                }}
              >
                <img
                  src="/banners/banner-ai-automation.jpg"
                  alt="Mahmudur Rahman (Shibly) - Co-Founder & Technical Lead"
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
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backdropFilter: "blur(4px)"
                  }}
                >
                  <div>
                    <span className="badge badge-violet" style={{ fontSize: "0.72rem", fontWeight: 700 }}>
                      Technical Lead
                    </span>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "white", marginTop: "0.25rem" }}>
                      Mahmudur Rahman (Shibly)
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Award size={15} /> 6+ Years Exp.
                    </span>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.6)", marginTop: "0.15rem" }}>
                      Systems Architect
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Core Mission */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.85rem", flexWrap: "wrap" }}>
                <span
                  className="badge badge-violet"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    padding: "0.3rem 0.75rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem"
                  }}
                >
                  <Bot size={13} />
                  <span>AI &amp; Security Architect</span>
                </span>
                <span className="badge badge-blue" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                  Co-Founder
                </span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem"
                }}
              >
                Mahmudur Rahman (Shibly)
              </h2>

              <p style={{ fontSize: "var(--text-sm)", color: "var(--accent-violet)", fontWeight: 700, marginBottom: "1.1rem" }}>
                Co-Founder &amp; Technical Lead • Autonomous Multi-Agents &amp; Red-Team Security
              </p>

              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                &ldquo;Modern tech education in our region is suffocating under memorization and toy tutorials. In the real world, you build multi-agent workflows that run autonomous operations, or you exploit vulnerabilities inside production cloud networks. My bootcamps are built like engineering sprints: zero theoretical fluff, live sandboxes, and tangible client deliverables from day one.&rdquo;
              </p>

              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                Full-stack systems engineer and security researcher spearheading ERAAO&apos;s digital infrastructure and practical curricula. Mahmudur instructs students on production agentic pipelines with LangChain &amp; n8n, as well as offensive adversary emulation.
              </p>

              {/* Competency Badges */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={15} style={{ color: "var(--accent-violet)", flexShrink: 0 }} />
                  <span>Autonomous Multi-Agent Swarms</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={15} style={{ color: "var(--accent-violet)", flexShrink: 0 }} />
                  <span>Offensive Penetration Testing Labs</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--accent-violet)", flexShrink: 0 }} />
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={15} style={{ color: "var(--accent-violet)", flexShrink: 0 }} />
                  <span>Production Cloud Sandboxes</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={15} style={{ color: "var(--accent-violet)", flexShrink: 0 }} />
                  <span>Enterprise Security Audits</span>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <Link
                  href="/academy/courses/ai-automation-agents"
                  className="btn btn-primary"
                  style={{
                    padding: "0.8rem 1.6rem",
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "var(--text-xs)",
                    background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
                    border: "none"
                  }}
                >
                  <span>Explore AI Automation (Coming Soon)</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/academy/courses/offensive-cyber-security"
                  className="btn btn-outline"
                  style={{
                    padding: "0.8rem 1.4rem",
                    fontWeight: 700,
                    borderRadius: "var(--radius-md)",
                    fontSize: "var(--text-xs)"
                  }}
                >
                  <span>Explore Cyber Security Labs</span>
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
              Our Shared Pedagogy
            </span>
            <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: "var(--text-primary)" }}>
              The ERAAO 6-Stage Learning Cycle
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6, marginTop: "0.5rem" }}>
              Whether you are mastering client spoken communication, deploying agent swarms, or testing cloud defense networks, every session moves through the same proven cycle.
            </p>
          </div>

          <div className="learning-cycle-grid" style={{ marginBottom: "3rem" }}>
            {[
              {
                step: "01",
                name: "Understand",
                desc: "Core concepts explained through live context, mechanics, and real-world outcomes without memorization.",
                color: "var(--accent-blue)"
              },
              {
                step: "02",
                name: "Notice",
                desc: "Spot recurring patterns in native audio recordings, production codebases, and vulnerability scans.",
                color: "var(--accent-teal)"
              },
              {
                step: "03",
                name: "Build",
                desc: "Construct original sentences, LLM tool definitions, or exploit payloads from scratch.",
                color: "var(--accent-violet)"
              },
              {
                step: "04",
                name: "Practice",
                desc: "Guided drills with instant mentor diagnostics and code reviews to eliminate hesitation and errors.",
                color: "#f59e0b"
              },
              {
                step: "05",
                name: "Use",
                desc: "High-stakes production application: simulated discovery calls, live cloud sandboxes, and client demos.",
                color: "var(--color-success)"
              },
              {
                step: "06",
                name: "Recall",
                desc: "Spaced retrieval practice across subsequent modules to permanently lock fluency into long-term memory.",
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

          {/* Need Guidance Box */}
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
              Active Support &amp; Consultation
            </span>
            <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 900, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Not Sure Which Track Is Right for You?
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", maxWidth: "520px", margin: "0 auto 1.5rem auto", lineHeight: 1.6 }}>
              Talk directly with our instructors. We will diagnose your current skills and recommend the exact curriculum to accelerate your global career.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://wa.me/8801606666577?text=Hello%20ERAAO%20Academy%2C%20I%20would%20like%20to%20consult%20with%20an%20instructor%20about%20my%20learning%20path"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  padding: "0.75rem 1.75rem",
                  fontWeight: 800,
                  borderRadius: "var(--radius-md)"
                }}
              >
                <MessageSquare size={16} />
                <span>Chat with Instructors on WhatsApp</span>
              </a>
              <Link
                href="/academy/free-bootcamp"
                className="btn btn-outline"
                style={{
                  padding: "0.75rem 1.5rem",
                  fontWeight: 700,
                  borderRadius: "var(--radius-md)"
                }}
              >
                <span>Join Live Free Bootcamp</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
