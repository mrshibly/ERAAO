import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, BookOpen, Clock, Calendar, CheckCircle2, ShieldCheck,
  BrainCircuit, MessageSquare, Award, Sparkles, Terminal, Layers,
  Phone, Laptop, Check, ArrowUpRight, Headphones, Users, HelpCircle
} from "lucide-react";
import Chatbot from "@/components/Chatbot";
import { ALL_COURSES } from "@/data/courses";

export default function Home() {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION — Academy-First High-Conversion Hero
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
        borderBottom: "1px solid var(--border-color)"
      }}>
        {/* Soft Ambient Radial Glow */}
        <div className="anim-glow" style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 15% 15%, rgba(14, 165, 233, 0.09) 0%, transparent 45%),
            radial-gradient(circle at 85% 75%, rgba(124, 58, 237, 0.08) 0%, transparent 45%)
          `,
          zIndex: 0
        }} />

        {/* Dot Matrix Pattern */}
        <div className="anim-fade-in" style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(148, 163, 184, 0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          zIndex: 0
        }} />

        <div className="container responsive-grid-split" style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "4rem",
          alignItems: "center",
          padding: "4.5rem 1.5rem"
        }}>
          {/* Left Column — Core Narrative */}
          <div>
            <div className="anim-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.85rem", borderRadius: "var(--radius-full)", background: "rgba(14, 165, 233, 0.1)", border: "1px solid rgba(14, 165, 233, 0.25)", color: "var(--accent-blue)", fontSize: "var(--text-xs)", fontWeight: 800, marginBottom: "1.25rem", letterSpacing: "0.02em" }}>
              <Sparkles size={14} />
              <span>PRACTICAL 12-WEEK PRACTITIONER BOOTCAMPS</span>
            </div>

            <h1 className="hero-title anim-fade-up anim-delay-1" style={{
              fontSize: "clamp(2.5rem, 5vw, 3.85rem)",
              fontWeight: 900,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              marginBottom: "1.5rem"
            }}>
              Master Skills That Unlock
              <span className="gradient-text-animated" style={{
                display: "block",
                background: "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-violet) 55%, var(--accent-teal) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% auto"
              }}>
                Global High-Income Careers
              </span>
            </h1>

            <p className="anim-fade-up anim-delay-2" style={{
              fontSize: "var(--text-base)",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              marginBottom: "2rem",
              maxWidth: "36rem"
            }}>
              Structured 12-week cohorts in <strong>Spoken English for Freelancers</strong>, <strong>AI Automation &amp; Agents</strong>, and <strong>Offensive Cyber Security</strong>. Zero passive lectures — build real fluency through live speaking drills, browser sandboxes, and direct mentor feedback.
            </p>

            {/* CTAs */}
            <div className="anim-fade-up anim-delay-3" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/academy" className="btn btn-accent" style={{
                padding: "0.9rem 2.25rem",
                fontSize: "var(--text-base)",
                fontWeight: 700,
                borderRadius: "var(--radius-xl)",
                background: "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-blue-hover) 100%)",
                boxShadow: "0 10px 25px rgba(14, 165, 233, 0.35)",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <span>Explore Bootcamps</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/book" className="btn btn-outline" style={{
                padding: "0.9rem 2.25rem",
                fontSize: "var(--text-base)",
                fontWeight: 600,
                borderRadius: "var(--radius-xl)",
                background: "var(--bg-primary)",
                borderColor: "var(--border-focus)",
                color: "var(--text-primary)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <Phone size={18} />
                <span>Free Level Assessment</span>
              </Link>
            </div>

            {/* Verified Curriculum Attributes Bar — ZERO Fake Data */}
            <div className="anim-fade-up anim-delay-4" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
              gap: "1.25rem",
              marginTop: "2.5rem",
              paddingTop: "1.75rem",
              borderTop: "1px solid var(--border-color)"
            }}>
              <div>
                <div style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: "var(--accent-blue)" }}>12 Weeks</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Structured Cohort</div>
              </div>
              <div>
                <div style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: "var(--accent-teal)" }}>36 Classes</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>3 Live Sessions/Wk</div>
              </div>
              <div>
                <div style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: "var(--accent-violet)" }}>6 Stages</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Scientific Retention</div>
              </div>
              <div>
                <div style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: "var(--color-warning)" }}>1-on-1</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Mentor Speech Review</div>
              </div>
            </div>
          </div>

          {/* Right Column — Visual Bootcamp Showcase Card */}
          <div className="anim-slide-right anim-delay-3" style={{ position: "relative" }}>
            <div style={{
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "var(--shadow-xl)",
              border: "1px solid var(--border-color)",
              background: "var(--card-bg)"
            }}>
              {/* Card Banner Image */}
              <div style={{ position: "relative", height: "240px" }}>
                <Image
                  src="/banners/banner-spoken-english.jpg"
                  alt="ERAAO Spoken English & Career Bootcamps"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.85) 100%)"
                }} />
                <div style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1.25rem",
                  color: "white"
                }}>
                  <span className="badge" style={{ background: "rgba(14, 165, 233, 0.9)", color: "white", fontSize: "0.7rem", fontWeight: 800, marginBottom: "0.3rem" }}>
                    Flagship Track
                  </span>
                  <div style={{ fontSize: "var(--text-lg)", fontWeight: 800 }}>Spoken English for Global Careers</div>
                </div>
              </div>

              {/* Card Body Highlights */}
              <div style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-teal)", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Calendar size={14} />
                    <span>Mon &bull; Wed &bull; Fri Schedule</span>
                  </span>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>
                    60-75 Min / Class
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={14} style={{ color: "var(--color-success)" }} />
                    <span>Class 1: Understand &rarr; Notice &rarr; Build (Worksheet released)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={14} style={{ color: "var(--accent-blue)" }} />
                    <span>Class 2: Guided Speaking &amp; Live Pair Simulations</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={14} style={{ color: "var(--accent-violet)" }} />
                    <span>Class 3: Dedicated Listening Audio Labs &amp; Active Recall</span>
                  </div>
                </div>

                <Link
                  href="/academy/courses/english-for-freelancers"
                  className="btn btn-accent"
                  style={{ width: "100%", justifyContent: "center", fontWeight: 700, borderRadius: "var(--radius-md)" }}
                >
                  <span>Explore Freelancer English Bootcamp</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE ERAAO 6-STAGE LEARNING CYCLE SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", background: "var(--bg-primary)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "46rem", margin: "0 auto 3.5rem auto" }}>
            <span className="section-badge" style={{ background: "rgba(14, 165, 233, 0.1)", color: "var(--accent-blue)", marginBottom: "0.75rem" }}>
              Our Core Pedagogy
            </span>
            <h2 style={{ fontSize: "clamp(1.85rem, 3.5vw, 2.6rem)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              The ERAAO 6-Stage Learning Cycle
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-base)", lineHeight: 1.65, marginTop: "0.75rem" }}>
              Most courses fail because they jump straight from passive theory to an exam. We use a 6-stage cognitive cycle so that speaking English, engineering AI agents, or defending systems becomes second nature.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.25rem" }}>
            {[
              {
                step: "01",
                name: "Understand",
                desc: "Clear, intuitive breakdown of sentence mechanics or architectural patterns. No abstract grammar jargon.",
                color: "var(--accent-blue)"
              },
              {
                step: "02",
                name: "Notice",
                desc: "Spot recurring patterns in authentic speech, client emails, and real production terminal outputs.",
                color: "var(--accent-teal)"
              },
              {
                step: "03",
                name: "Build",
                desc: "Construct accurate sentences, workflows, and tools from structured prompts and worksheet models.",
                color: "var(--accent-violet)"
              },
              {
                step: "04",
                name: "Practice",
                desc: "Low-stakes guided repetitions with direct instructor corrections to build speech and muscle confidence.",
                color: "#f59e0b"
              },
              {
                step: "05",
                name: "Use",
                desc: "High-stakes production challenges: cold pitch simulations, client discovery calls, and live red team labs.",
                color: "var(--color-success)"
              },
              {
                step: "06",
                name: "Recall",
                desc: "Spaced audio testing and retrieval quizzes at 1, 3, and 6 weeks to lock skills into permanent memory.",
                color: "var(--accent-blue)"
              }
            ].map((cycle, idx) => (
              <div key={idx} className="academy-advantage-card" style={{ padding: "1.5rem 1.25rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 900, color: cycle.color, display: "block", marginBottom: "0.5rem" }}>
                  STAGE {cycle.step}
                </span>
                <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  {cycle.name}
                </h3>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.55, margin: 0 }}>
                  {cycle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FLAGSHIP ACADEMY BOOTCAMPS SHOWCASE
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", background: "var(--bg-secondary)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <span className="section-badge" style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--accent-teal)", marginBottom: "0.75rem" }}>
                Active Cohorts
              </span>
              <h2 style={{ fontSize: "clamp(1.85rem, 3.5vw, 2.6rem)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Flagship Academy Tracks
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-base)", marginTop: "0.5rem" }}>
                Every program includes 12 weeks of live instruction, 36 classes, downloadable materials, and mentor feedback.
              </p>
            </div>

            <Link href="/academy" className="btn btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span>View Full Academy Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {ALL_COURSES.map((c) => (
              <div key={c.id} className="academy-card">
                <Link href={`/academy/courses/${c.slug}`} className="academy-card-image-wrap">
                  <Image
                    src={c.thumbnail_url}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
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
                    {c.level}
                  </div>
                </Link>

                <div className="academy-card-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span className="badge badge-blue">
                      {c.category}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "var(--text-xs)", color: "var(--accent-teal)", fontWeight: 700 }}>
                      <Clock size={13} />
                      <span>12 Wks • 36 Classes</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, marginBottom: "0.6rem", color: "var(--text-primary)", lineHeight: 1.35 }}>
                    <Link href={`/academy/courses/${c.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {c.title}
                    </Link>
                  </h3>

                  <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", lineHeight: 1.6, marginBottom: "1.25rem", flex: 1 }}>
                    {c.short_description}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1rem", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <CheckCircle2 size={13} style={{ color: "var(--accent-blue)" }} />
                      <span>3 Live Classes / Week • Mentored Sessions</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <Layers size={13} style={{ color: "var(--accent-teal)" }} />
                      <span>{c.modules.length} Modules • Practice Packs Included</span>
                    </div>
                  </div>
                </div>

                <div className="academy-card-footer">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Tuition</span>
                    <span style={{ fontSize: "var(--text-xl)", fontWeight: 900, color: "var(--text-primary)" }}>
                      ৳{c.price.toLocaleString()} <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--text-muted)" }}>BDT</span>
                    </span>
                  </div>

                  <Link
                    href={`/academy/courses/${c.slug}`}
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY ERAAO ACADEMY — Factual Advantages
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", background: "var(--bg-primary)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto 3.5rem auto" }}>
            <span className="section-badge" style={{ background: "rgba(124, 58, 237, 0.1)", color: "var(--accent-violet)", marginBottom: "0.75rem" }}>
              Why Students Choose ERAAO
            </span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Built for Practical Execution, Not Memorization
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-base)", lineHeight: 1.65, marginTop: "0.75rem" }}>
              We eliminate traditional lecture halls in favor of active drills, real simulation challenges, and personalized instructor guidance.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            <div className="academy-advantage-card">
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "var(--accent-blue-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-blue)", marginBottom: "1.25rem" }}>
                <MessageSquare size={24} />
              </div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Live Speaking &amp; Lab Sessions
                <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px" }}>Zero Passive Videos</span>
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Every class demands active student participation. Speak in guided drills, build real agent scripts, or execute offensive penetration tests.
              </p>
            </div>

            <div className="academy-advantage-card">
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(124, 58, 237, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-violet)", marginBottom: "1.25rem" }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                1-on-1 Dedicated Feedback
                <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px" }}>Speech &amp; Code Diagnostics</span>
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Instructors diagnose hesitation patterns, correct grammatical errors in real time, and review your code pull requests line-by-line.
              </p>
            </div>

            <div className="academy-advantage-card">
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "var(--accent-teal-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-teal)", marginBottom: "1.25rem" }}>
                <Headphones size={24} />
              </div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Dedicated Audio &amp; Worksheets
                <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px" }}>Permanent Downloadable Packs</span>
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Receive structured worksheets released Class 1 of every module and self-made listening audios at native speaking speed in Class 3.
              </p>
            </div>

            <div className="academy-advantage-card">
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-success)", marginBottom: "1.25rem" }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Cryptographic Verifiable Diplomas
                <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px" }}>LinkedIn &amp; Client Ready</span>
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Graduate with a verifiable digital diploma with a unique verification URL ready to demonstrate your competency to international clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ENTERPRISE SERVICES — AUXILIARY SECTION FOR BUSINESSES
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: "5rem 0",
        background: "linear-gradient(180deg, #090d16 0%, #0f172a 100%)",
        color: "white",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <span className="badge" style={{ background: "rgba(14, 165, 233, 0.2)", color: "var(--accent-blue)", marginBottom: "1rem" }}>
                For Business &bull; Enterprise Solutions
              </span>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: "1rem" }}>
                Need Custom AI Engineering or Offensive Security Audits?
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "var(--text-base)", lineHeight: 1.65, marginBottom: "2rem" }}>
                Beyond our practitioner academy, ERAAO partners with forward-thinking companies to build bespoke multi-agent LLM systems and conduct rigorous penetration testing.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <ShieldCheck size={20} style={{ color: "var(--accent-teal)", flexShrink: 0, marginTop: "3px" }} />
                  <div>
                    <strong style={{ fontSize: "var(--text-sm)", color: "white" }}>Offensive Penetration Testing</strong>
                    <p style={{ fontSize: "var(--text-xs)", color: "#94a3b8", margin: "2px 0 0 0" }}>Web applications, mobile binaries, internal Active Directory, and API security assessments.</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <BrainCircuit size={20} style={{ color: "var(--accent-violet)", flexShrink: 0, marginTop: "3px" }} />
                  <div>
                    <strong style={{ fontSize: "var(--text-sm)", color: "white" }}>Autonomous Multi-Agent AI Software</strong>
                    <p style={{ fontSize: "var(--text-xs)", color: "#94a3b8", margin: "2px 0 0 0" }}>Bespoke agent workflows, enterprise RAG pipelines, and automated customer operations.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/services"
                  className="btn btn-accent"
                  style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))", color: "white", padding: "0.85rem 1.75rem", borderRadius: "var(--radius-md)", fontWeight: 700 }}
                >
                  <span>Explore Enterprise Services</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/book"
                  className="btn btn-outline"
                  style={{ color: "white", borderColor: "rgba(255, 255, 255, 0.25)", padding: "0.85rem 1.5rem", borderRadius: "var(--radius-md)", fontWeight: 600 }}
                >
                  <span>Schedule Corporate Consultation</span>
                </Link>
              </div>
            </div>

            {/* Right Framing */}
            <div style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "var(--radius-xl)",
              padding: "2.5rem",
              backdropFilter: "blur(8px)"
            }}>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "white", marginBottom: "1.25rem" }}>
                Enterprise Engagement Standards
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--accent-teal)", fontWeight: 700 }}>VERIFIED METHODOLOGY</div>
                  <div style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "white", marginTop: "2px" }}>OWASP Top 10 &amp; NIST CSF 2.0 Aligned</div>
                </div>

                <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--accent-blue)", fontWeight: 700 }}>EXECUTIVE DELIVERABLES</div>
                  <div style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "white", marginTop: "2px" }}>CVSS v3.1 Scoring &amp; Board-Ready Reporting</div>
                </div>

                <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--accent-violet)", fontWeight: 700 }}>CUSTOM AUTOMATION</div>
                  <div style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "white", marginTop: "2px" }}>Production MLOps, LLM Guardrails &amp; Agent Tooling</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CALL TO ACTION SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        padding: "6rem 0",
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-color)",
        textAlign: "center"
      }}>
        <div className="container" style={{ maxWidth: "44rem" }}>
          <span className="section-badge" style={{ background: "rgba(14, 165, 233, 0.1)", color: "var(--accent-blue)", marginBottom: "1rem" }}>
            Ready to Accelerate Your Career?
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
            Start with the Next 12-Week Cohort
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-base)", lineHeight: 1.65, marginBottom: "2.5rem" }}>
            Explore the curriculum syllabi, review weekly class schedules, or connect directly with an admissions advisor for a personalized skill assessment.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/academy" className="btn btn-accent" style={{
              padding: "0.9rem 2.25rem",
              fontSize: "var(--text-base)",
              fontWeight: 700,
              boxShadow: "0 8px 24px rgba(14, 165, 233, 0.35)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <span>Browse All Academy Tracks</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/book" className="btn btn-outline" style={{
              padding: "0.9rem 2.25rem",
              fontSize: "var(--text-base)",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <Phone size={18} />
              <span>Book Admissions Counseling</span>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Assistant Chatbot */}
      <Chatbot />
    </div>
  );
}
