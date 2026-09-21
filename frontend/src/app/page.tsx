"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, BookOpen, Clock, Calendar, CheckCircle2, ShieldCheck,
  BrainCircuit, MessageSquare, Award, Sparkles, Terminal, Layers,
  Phone, Laptop, Check, ArrowUpRight, Headphones, Users, HelpCircle,
  Loader
} from "lucide-react";
import Chatbot from "@/components/Chatbot";
import CinematicHeroSlider from "@/components/CinematicHeroSlider";

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    fetch("/api/v1/courses?page=1&page_size=20")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.items) {
          setCourses(data.items);
        }
      })
      .catch((err) => console.error("Error fetching courses on homepage:", err))
      .finally(() => setLoadingCourses(false));
  }, []);

  const englishCourses = courses.filter((c) => {
    const cat = (c.category?.slug || c.category_slug || c.category?.name || "").toLowerCase();
    const title = (c.title || "").toLowerCase();
    return cat.includes("english") || title.includes("english") || title.includes("spoken");
  });

  const techCourses = courses.filter((c) => {
    const cat = (c.category?.slug || c.category_slug || c.category?.name || "").toLowerCase();
    const title = (c.title || "").toLowerCase();
    return !cat.includes("english") && !title.includes("english") && !title.includes("spoken");
  });

  return (
    <div style={{ position: "relative", overflowX: "hidden", background: "var(--bg-primary)" }}>
      {/* ═══════════════════════════════════════════════════════════════
          FULL-WIDTH CINEMATIC HERO SECTION (Edge-to-Edge)
          ═══════════════════════════════════════════════════════════════ */}
      <CinematicHeroSlider />

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

          <div id="learning-cycle" className="learning-cycle-grid">
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
              <div key={idx} className="academy-advantage-card" style={{ padding: "1.25rem 1rem", textAlign: "left" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 900, color: cycle.color, display: "block", marginBottom: "0.4rem" }}>
                  STAGE {cycle.step}
                </span>
                <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                  {cycle.name}
                </h3>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                  {cycle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FLAGSHIP ACADEMY BOOTCAMPS SHOWCASE: Grouped by Practitioner Tracks
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

          {loadingCourses ? (
            <div className="loading-container" style={{ minHeight: "300px", textAlign: "center", padding: "4rem 0" }}>
              <Loader className="animate-spin text-accent" style={{ color: "var(--accent-blue)", margin: "0 auto 1rem auto" }} size={36} />
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)" }}>Loading active cohorts...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="card" style={{ padding: "4rem 2rem", textAlign: "center", maxWidth: "620px", margin: "0 auto" }}>
              <BookOpen size={42} style={{ color: "var(--accent-blue)", margin: "0 auto 1.25rem auto" }} />
              <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Upcoming Cohorts Opening Soon
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6, marginBottom: "1.75rem" }}>
                Our admissions department is finalizing the live schedule for the upcoming 12-week bootcamps. Check back shortly or speak directly with our team for priority enrollment notifications.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/book" className="btn btn-accent" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <Phone size={16} />
                  <span>Book Free Consultation</span>
                </Link>
                <Link href="/academy" className="btn btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>View Academy Catalog</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Active Running Bootcamp Notice Banner */}
              <div style={{
                background: "linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                borderRadius: "var(--radius-xl)",
                padding: "1.1rem 1.4rem",
                marginBottom: "2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
                boxShadow: "0 8px 24px -6px rgba(0, 0, 0, 0.3)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
                  <span className="badge badge-green" style={{ fontWeight: 800, padding: "0.3rem 0.75rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                    <Sparkles size={13} />
                    <span>RUNNING NOW</span>
                  </span>
                  <div>
                    <strong style={{ color: "#ffffff", fontSize: "var(--text-sm)", display: "block" }}>
                      Zero to Fluent Free English Bootcamp is Actively Running!
                    </strong>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>
                      Live Zoom training with mentor guidance. Other 12-week regular bootcamps are currently <strong>Coming Soon</strong>.
                    </span>
                  </div>
                </div>
                <Link href="/academy/free-bootcamp" className="btn btn-primary btn-sm" style={{ fontWeight: 700, fontSize: "var(--text-xs)", whiteSpace: "nowrap" }}>
                  <span>Join Free Bootcamp</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {englishCourses.length > 0 && (
                <>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem" }}>
                      <span className="badge badge-blue" style={{ fontSize: "0.7rem", fontWeight: 800, padding: "0.2rem 0.6rem" }}>TRACK 01</span>
                      <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                        English Communication for International Careers
                      </h3>
                    </div>
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", margin: 0 }}>
                      Practical speaking mechanics, client proposals, pitch rehearsals, and executive fluency for freelancers and remote contractors.
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3.5rem" }}>
                    {/* Featured Running Free English Bootcamp Card */}
                    <div className="academy-card" style={{ border: "2px solid rgba(16, 185, 129, 0.45)", boxShadow: "0 10px 30px -10px rgba(16, 185, 129, 0.3)" }}>
                      <Link href="/academy/free-bootcamp" className="academy-card-image-wrap">
                        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                          <Image
                            src="/banners/zero-to-fluent-free-bootcamp.png"
                            alt=""
                            fill
                            sizes="400px"
                            style={{ objectFit: "cover", filter: "blur(22px) brightness(0.5)", transform: "scale(1.25)", opacity: 0.85 }}
                            aria-hidden="true"
                          />
                        </div>

                        <Image
                          src="/banners/zero-to-fluent-free-bootcamp.png"
                          alt="ZERO TO FLUENT: Free English Bootcamp"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "contain", objectPosition: "center", zIndex: 1 }}
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
                          zIndex: 2
                        }}>
                          Beginner
                        </div>

                        {/* Running Now Overlay Badge */}
                        <div style={{
                          position: "absolute",
                          bottom: "0.85rem",
                          right: "0.85rem",
                          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          padding: "0.3rem 0.75rem",
                          borderRadius: "var(--radius-full)",
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          zIndex: 2,
                          boxShadow: "0 4px 14px rgba(16, 185, 129, 0.45)"
                        }}>
                          <Sparkles size={12} />
                          <span>RUNNING NOW</span>
                        </div>
                      </Link>

                      <div className="academy-card-body">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                          <span className="badge badge-green">
                            English Communication
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "var(--text-xs)", color: "var(--accent-teal)", fontWeight: 700 }}>
                            <Clock size={13} />
                            <span>2 Hours • Live Zoom</span>
                          </div>
                        </div>

                        <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, marginBottom: "0.6rem", color: "var(--text-primary)", lineHeight: 1.35 }}>
                          <Link href="/academy/free-bootcamp" style={{ color: "inherit", textDecoration: "none" }}>
                            ZERO TO FLUENT: Free English Bootcamp
                          </Link>
                        </h3>

                        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", lineHeight: 1.6, marginBottom: "1.25rem", flex: 1 }}>
                          মাত্র ২ ঘণ্টায় বুঝে নিন—কেন English পড়েও Speaking-এ আটকে যাচ্ছেন। Sentence building, listening drills এবং confident speaking drills শিখুন live with Mentor Ayesha Anika।
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1rem", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                            <CheckCircle2 size={13} style={{ color: "var(--accent-blue)" }} />
                            <span>Live Zoom Training • Dedicated Q&amp;A</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                            <Layers size={13} style={{ color: "var(--accent-teal)" }} />
                            <span>Telegram Community Access &amp; Worksheet</span>
                          </div>
                        </div>
                      </div>

                      <div className="academy-card-footer">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <div>
                            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Tuition</span>
                            <span style={{ display: "block", fontSize: "0.7rem", color: "#10b981", fontWeight: 700 }}>
                              Active Batch
                            </span>
                          </div>
                          <span style={{ fontSize: "var(--text-xl)", fontWeight: 900, color: "#10b981" }}>
                            FREE <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--text-muted)" }}>100% Access</span>
                          </span>
                        </div>

                        <Link
                          href="/academy/free-bootcamp"
                          className="btn btn-primary"
                          style={{ width: "100%", justifyContent: "center", fontWeight: 700, borderRadius: "var(--radius-md)" }}
                        >
                          <span>Join Free Bootcamp (Live Now)</span>
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>

                    {englishCourses.map((c) => (
                      <div key={c.id} className="academy-card">
                        <Link href={`/academy/courses/${c.slug}`} className="academy-card-image-wrap">
                          {/* Ambient blurred backdrop so any aspect ratio fills naturally without harsh bars */}
                          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                            <Image
                              src={c.thumbnail_url || "/banners/professional-zero-to-fluent-english.jpg"}
                              alt=""
                              fill
                              sizes="400px"
                              style={{ objectFit: "cover", filter: "blur(22px) brightness(0.5)", transform: "scale(1.25)", opacity: 0.85 }}
                              aria-hidden="true"
                            />
                          </div>

                          {/* Full uncropped, unstretched foreground image */}
                          <Image
                            src={c.thumbnail_url || "/banners/professional-zero-to-fluent-english.jpg"}
                            alt={c.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "contain", objectPosition: "center", zIndex: 1 }}
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

                          {/* Coming Soon Overlay Badge */}
                          <div style={{
                            position: "absolute",
                            bottom: "0.85rem",
                            right: "0.85rem",
                            background: "rgba(15, 23, 42, 0.92)",
                            backdropFilter: "blur(6px)",
                            border: "1px solid rgba(245, 158, 11, 0.5)",
                            padding: "0.25rem 0.65rem",
                            borderRadius: "var(--radius-full)",
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            color: "#fbbf24",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            zIndex: 2,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)"
                          }}>
                            <Clock size={12} style={{ color: "#fbbf24" }} />
                            <span>Coming Soon</span>
                          </div>
                        </Link>

                        <div className="academy-card-body">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                            <span className="badge badge-blue">
                              {c.category?.name || "English Communication"}
                            </span>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "var(--text-xs)", color: "var(--accent-teal)", fontWeight: 700 }}>
                              <Clock size={13} />
                              <span>{c.duration_hours || 36} Hours</span>
                            </div>
                          </div>

                          <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, marginBottom: "0.6rem", color: "var(--text-primary)", lineHeight: 1.35 }}>
                            <Link href={`/academy/courses/${c.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                              {c.title}
                            </Link>
                          </h3>

                          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", lineHeight: 1.6, marginBottom: "1.25rem", flex: 1 }}>
                            {c.short_description || c.description}
                          </p>

                          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1rem", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                              <CheckCircle2 size={13} style={{ color: "var(--accent-blue)" }} />
                              <span>Live Classes &bull; 1-on-1 Mentor Guidance</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                              <Layers size={13} style={{ color: "var(--accent-teal)" }} />
                              <span>{c.modules?.length || 0} Modules Included</span>
                            </div>
                          </div>
                        </div>

                        <div className="academy-card-footer">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                            <div>
                              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Tuition</span>
                              <span style={{ display: "block", fontSize: "0.7rem", color: "#f59e0b", fontWeight: 700 }}>
                                Launching Soon
                              </span>
                            </div>
                            <span style={{ fontSize: "var(--text-xl)", fontWeight: 900, color: "var(--text-primary)" }}>
                              ৳{c.price?.toLocaleString()} <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--text-muted)" }}>{c.currency || "BDT"}</span>
                            </span>
                          </div>

                          <Link
                            href={`/academy/courses/${c.slug}`}
                            className="btn btn-outline"
                            style={{ width: "100%", justifyContent: "center", fontWeight: 700, borderRadius: "var(--radius-md)", borderColor: "rgba(245, 158, 11, 0.4)", color: "var(--text-primary)" }}
                          >
                            <span>View Syllabus (Coming Soon)</span>
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {techCourses.length > 0 && (
                <>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem" }}>
                      <span className="badge badge-violet" style={{ fontSize: "0.7rem", fontWeight: 800, padding: "0.2rem 0.6rem" }}>TRACK 02</span>
                      <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                        Applied Technology &amp; Offensive Security
                      </h3>
                    </div>
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", margin: 0 }}>
                      Hands-on engineering tracks with real-world sandboxes, terminal penetration labs, and automated multi-agent LLM workflows.
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem" }}>
                    {techCourses.map((c) => (
                      <div key={c.id} className="academy-card">
                        <Link href={`/academy/courses/${c.slug}`} className="academy-card-image-wrap">
                          {/* Ambient blurred backdrop so any aspect ratio fills naturally without harsh bars */}
                          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                            <Image
                              src={c.thumbnail_url || (c.slug?.includes("cyber") ? "/banners/banner-cyber-security.jpg" : "/banners/banner-ai-automation.jpg")}
                              alt=""
                              fill
                              sizes="400px"
                              style={{ objectFit: "cover", filter: "blur(22px) brightness(0.5)", transform: "scale(1.25)", opacity: 0.85 }}
                              aria-hidden="true"
                            />
                          </div>

                          <Image
                            src={c.thumbnail_url || (c.slug?.includes("cyber") ? "/banners/banner-cyber-security.jpg" : "/banners/banner-ai-automation.jpg")}
                            alt={c.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                            style={{ objectFit: "contain", objectPosition: "center", zIndex: 1 }}
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

                          {/* Coming Soon Overlay Badge */}
                          <div style={{
                            position: "absolute",
                            bottom: "0.85rem",
                            right: "0.85rem",
                            background: "rgba(15, 23, 42, 0.92)",
                            backdropFilter: "blur(6px)",
                            border: "1px solid rgba(245, 158, 11, 0.5)",
                            padding: "0.25rem 0.65rem",
                            borderRadius: "var(--radius-full)",
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            color: "#fbbf24",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            zIndex: 2,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)"
                          }}>
                            <Clock size={12} style={{ color: "#fbbf24" }} />
                            <span>Coming Soon</span>
                          </div>
                        </Link>

                        <div className="academy-card-body">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                            <span className="badge badge-violet">
                              {c.category?.name || "Applied Technology"}
                            </span>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "var(--text-xs)", color: "var(--accent-teal)", fontWeight: 700 }}>
                              <Clock size={13} />
                              <span>{c.duration_hours || 36} Hours</span>
                            </div>
                          </div>

                          <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, marginBottom: "0.6rem", color: "var(--text-primary)", lineHeight: 1.35 }}>
                            <Link href={`/academy/courses/${c.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                              {c.title}
                            </Link>
                          </h3>

                          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", lineHeight: 1.6, marginBottom: "1.25rem", flex: 1 }}>
                            {c.short_description || c.description}
                          </p>

                          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1rem", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                              <CheckCircle2 size={13} style={{ color: "var(--accent-blue)" }} />
                              <span>Live Classes &bull; Hands-on Sandbox Labs</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                              <Layers size={13} style={{ color: "var(--accent-teal)" }} />
                              <span>{c.modules?.length || 0} Modules Included</span>
                            </div>
                          </div>
                        </div>

                        <div className="academy-card-footer">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                            <div>
                              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Tuition</span>
                              <span style={{ display: "block", fontSize: "0.7rem", color: "#f59e0b", fontWeight: 700 }}>
                                Launching Soon
                              </span>
                            </div>
                            <span style={{ fontSize: "var(--text-xl)", fontWeight: 900, color: "var(--text-primary)" }}>
                              ৳{c.price?.toLocaleString()} <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--text-muted)" }}>{c.currency || "BDT"}</span>
                            </span>
                          </div>

                          <Link
                            href={`/academy/courses/${c.slug}`}
                            className="btn btn-outline"
                            style={{ width: "100%", justifyContent: "center", fontWeight: 700, borderRadius: "var(--radius-md)", borderColor: "rgba(245, 158, 11, 0.4)", color: "var(--text-primary)" }}
                          >
                            <span>View Syllabus (Coming Soon)</span>
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY ERAAO ACADEMY: Factual Advantages
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
          ENTERPRISE SERVICES: AUXILIARY SECTION FOR BUSINESSES
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: "5rem 0",
        background: "linear-gradient(180deg, #090d16 0%, #0f172a 100%)",
        color: "white",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div className="container">
          <div className="enterprise-solutions-grid">
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
