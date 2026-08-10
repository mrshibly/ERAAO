import Link from "next/link";
import { ArrowRight, ShieldCheck, BrainCircuit, Cpu, Users, Award, BookOpen, Phone, Zap, Globe, Target } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION — 60-30-10 Light Mode Ultra-Premium
          60% Light Canvas | 30% Dark Slate Structure | 10% Cyan/Violet Accent
       ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
        borderBottom: "1px solid #e2e8f0"
      }}>
        {/* 60% Dominant Canvas — Soft Ambient Radial Glow & Grid Pattern */}
        <div className="anim-glow" style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 15% 15%, rgba(14, 165, 233, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 85% 75%, rgba(124, 58, 237, 0.08) 0%, transparent 45%)
          `,
          zIndex: 0
        }} />

        {/* Lightweight Fast-Loading Dot Matrix Grid */}
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
          padding: "4rem 1.5rem"
        }}>
          {/* Left Column — 30% Text Structure & 10% Accent Buttons */}
          <div>


            {/* 30% Secondary — High Contrast Main Title */}
            <h1 className="anim-fade-up anim-delay-1" style={{
              fontSize: "3.75rem",
              fontWeight: 900,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              color: "#0f172a",
              marginBottom: "1.5rem"
            }}>
              The Convergence of
              <span className="gradient-text-animated" style={{
                display: "block",
                background: "linear-gradient(135deg, #0ea5e9 0%, #7c3aed 60%, #0d9488 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% auto"
              }}>
                Applied AI & Offensive Security
              </span>
            </h1>

            {/* Subheadline Paragraph */}
            <p className="anim-fade-up anim-delay-2" style={{
              fontSize: "1.15rem",
              color: "#475569",
              lineHeight: 1.65,
              marginBottom: "2.5rem",
              maxWidth: "34rem"
            }}>
              Enterprise AI architectures, advanced penetration testing services, and professional-grade practitioner bootcamps to future-proof your organization.
            </p>

            {/* 10% Accent CTAs */}
            <div className="anim-fade-up anim-delay-3" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/academy" className="btn btn-accent" style={{
                padding: "0.9rem 2.25rem",
                fontSize: "1rem",
                fontWeight: 700,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                boxShadow: "0 10px 25px rgba(14, 165, 233, 0.35)",
                color: "white"
              }}>
                <span>Explore Academy</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/book" className="btn btn-outline" style={{
                padding: "0.9rem 2.25rem",
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: "12px",
                background: "#ffffff",
                borderColor: "#cbd5e1",
                color: "#0f172a",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
              }}>
                <Phone size={18} />
                <span>Book Consultation</span>
              </Link>
            </div>

            {/* 30% Structural Trust Bar */}
            <div className="anim-fade-up anim-delay-4" style={{
              display: "flex",
              gap: "2.5rem",
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid #e2e8f0"
            }}>
              <div>
                <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0ea5e9" }}>98%</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Completion Rate</div>
              </div>
              <div>
                <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#7c3aed" }}>10k+</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Graduates</div>
              </div>
              <div>
                <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0d9488" }}>50+</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Enterprise Clients</div>
              </div>
            </div>
          </div>

          {/* Right Column — 30% Secondary Dark Framing & 10% Accent Floating Cards */}
          <div className="anim-slide-right anim-delay-3" style={{ position: "relative", minHeight: "480px" }}>
            {/* Primary Frame (Cyber Security Terminal — Fast Load WebP) */}
            <div className="anim-float" style={{
              position: "absolute",
              top: "0",
              right: "0",
              width: "88%",
              height: "310px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 25px 60px -15px rgba(15, 23, 42, 0.25)",
              border: "1px solid #e2e8f0"
            }}>
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=75"
                alt="Cybersecurity terminal interface"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="eager"
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0.5) 100%)"
              }} />
            </div>

            {/* Secondary Frame (AI Neural Core — Fast Load WebP) */}
            <div className="anim-float-delayed" style={{
              position: "absolute",
              bottom: "20px",
              left: "0",
              width: "68%",
              height: "240px",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 20px 45px -10px rgba(15, 23, 42, 0.28)",
              border: "4px solid #ffffff"
            }}>
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&auto=format&fit=crop&q=75"
                alt="AI neural network architecture"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="eager"
              />
            </div>

            {/* Floating Glassmorphic Badge 1: SOC-2 Ready */}
            <div className="anim-float" style={{
              position: "absolute",
              top: "210px",
              right: "-15px",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderRadius: "16px",
              padding: "1rem 1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              boxShadow: "0 15px 35px rgba(15, 23, 42, 0.12)",
              animationDelay: "-1.5s",
              zIndex: 10
            }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "rgba(14, 165, 233, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <ShieldCheck size={24} style={{ color: "#0ea5e9" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0f172a" }}>SOC-2 & ISO Ready</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Enterprise Defense</div>
              </div>
            </div>

            {/* Floating Glassmorphic Badge 2: LLM Multi-Agent */}
            <div className="anim-float-delayed" style={{
              position: "absolute",
              bottom: "-10px",
              right: "30px",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderRadius: "16px",
              padding: "0.9rem 1.2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              boxShadow: "0 15px 35px rgba(15, 23, 42, 0.12)",
              animationDelay: "-4.5s",
              zIndex: 10
            }}>
              <div style={{
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                background: "rgba(124, 58, 237, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <BrainCircuit size={22} style={{ color: "#7c3aed" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a" }}>LLM Multi-Agent</div>
                <div style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 600 }}>Custom Orchestration</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Verification Badges */}
      <section style={{ background: "var(--bg-primary)", borderBottom: "1px solid var(--border-color)", padding: "2.5rem 0" }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center", gap: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--text-secondary)" }}>
            <Award size={24} style={{ color: "var(--accent-teal)" }} />
            <span style={{ fontWeight: 600 }}>OSCP & OSCE Certified Bangladeshi Instructors</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--text-secondary)" }}>
            <BrainCircuit size={24} style={{ color: "var(--accent-violet)" }} />
            <span style={{ fontWeight: 600 }}>Custom LLM & RAG Solutions</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--text-secondary)" }}>
            <ShieldCheck size={24} style={{ color: "var(--accent-blue)" }} />
            <span style={{ fontWeight: 600 }}>ISO 27001 Audit Ready Services</span>
          </div>
        </div>
      </section>

      {/* Services with Images */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{
              display: "inline-block",
              background: "rgba(14, 165, 233, 0.08)",
              color: "var(--accent-blue)",
              padding: "0.35rem 1rem",
              borderRadius: "9999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "1rem"
            }}>
              What We Do
            </span>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Our Core Offerings</h2>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.75rem", fontSize: "1.1rem", maxWidth: "35rem", margin: "0.75rem auto 0 auto" }}>
              Structured to deliver technical excellence for businesses and practitioners.
            </p>
          </div>

          <div className="responsive-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {/* Card 1: AI Engineering */}
            <div className="hover-lift" style={{
              background: "var(--card-bg)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-color)",
              overflow: "hidden",
              boxShadow: "var(--shadow-sm)"
            }}>
              <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format&fit=crop"
                  alt="AI and machine learning visualization"
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                />
                <div style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  background: "rgba(139,92,246,0.9)",
                  color: "white",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 700
                }}>
                  AI & ML
                </div>
              </div>
              <div style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }}>AI & Software Engineering</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  End-to-end custom AI systems, multi-agent LLM platforms, MLOps orchestration, and secure application development.
                </p>
                <Link href="/services" style={{ color: "var(--accent-violet)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.95rem" }}>
                  <span>Explore AI Services</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Card 2: Cybersecurity */}
            <div className="hover-lift" style={{
              background: "var(--card-bg)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-color)",
              overflow: "hidden",
              boxShadow: "var(--shadow-sm)"
            }}>
              <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80&auto=format&fit=crop"
                  alt="Cybersecurity code and security operations"
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                />
                <div style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  background: "rgba(13,148,136,0.9)",
                  color: "white",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 700
                }}>
                  Security
                </div>
              </div>
              <div style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }}>Cybersecurity Services</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  Offensive pentesting (Web, Mobile, AD, API), red teaming, AI security audits, and cloud configuration hardening.
                </p>
                <Link href="/services" style={{ color: "var(--accent-teal)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.95rem" }}>
                  <span>View Security Services</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Card 3: Academy */}
            <div className="hover-lift" style={{
              background: "var(--card-bg)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-color)",
              overflow: "hidden",
              boxShadow: "var(--shadow-sm)"
            }}>
              <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop"
                  alt="Professional training and learning"
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                />
                <div style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  background: "rgba(14,165,233,0.9)",
                  color: "white",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 700
                }}>
                  Academy
                </div>
              </div>
              <div style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }}>Training Academy</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  Self-paced curricula and intensive live bootcamps covering ethical hacking, bug hunting, secure coding, and LLM orchestration.
                </p>
                <Link href="/academy" style={{ color: "var(--accent-blue)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.95rem" }}>
                  <span>Browse Catalog</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us — Visual showcase */}
      <section style={{
        padding: "6rem 0",
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)"
      }}>
        <div className="container">
          <div className="responsive-grid-split" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center"
          }}>
            {/* Left — Image collage */}
            <div style={{ position: "relative" }}>
              <div style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "var(--shadow-lg)"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=80&auto=format&fit=crop"
                  alt="Team collaboration in modern workspace"
                  style={{ width: "100%", height: "400px", objectFit: "cover", display: "block" }}
                />
              </div>
              {/* Floating accent card */}
              <div style={{
                position: "absolute",
                bottom: "-30px",
                right: "-20px",
                background: "var(--card-bg)",
                borderRadius: "12px",
                padding: "1.25rem 1.5rem",
                boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
                border: "1px solid var(--border-color)",
                display: "flex",
                alignItems: "center",
                gap: "1rem"
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(16,185,129,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Target size={24} style={{ color: "var(--accent-emerald)" }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1.5rem" }}>50+</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Local Clients</div>
                </div>
              </div>
            </div>

            {/* Right — Content */}
            <div>
              <span style={{
                display: "inline-block",
                background: "rgba(13, 148, 136, 0.08)",
                color: "var(--accent-teal)",
                padding: "0.35rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.8rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "1rem"
              }}>
                Why Choose Us
              </span>
              <h2 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "1rem" }}>
                Built by Practitioners,<br />for Practitioners
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                Our team consists of certified security researchers, AI engineers, and educators who have built production systems for Fortune 500 companies.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { icon: ShieldCheck, text: "OSCP, OSCE & OSWE certified offensive security experts in Dhaka", color: "var(--accent-teal)" },
                  { icon: BrainCircuit, text: "Production-grade LLM & multi-agent system architects", color: "var(--accent-violet)" },
                  { icon: Globe, text: "SOC-2 and ISO 27001 audit-ready infrastructure", color: "var(--accent-blue)" },
                  { icon: Users, text: "10,000+ practitioners trained and certified in Bangladesh", color: "var(--accent-emerald)" }
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: `${item.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <item.icon size={20} style={{ color: item.color }} />
                    </div>
                    <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics with background image */}
      <section style={{
        position: "relative",
        padding: "5rem 0",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 0
        }}>
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format&fit=crop"
            alt="Technology data center"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.12 }}
          />
        </div>
        <div className="container" style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "3rem",
          textAlign: "center"
        }}>
          <div>
            <h3 style={{ fontSize: "2.75rem", fontWeight: 800, color: "var(--accent-blue)" }}>98%</h3>
            <p style={{ color: "var(--text-secondary)", fontWeight: 500, marginTop: "0.25rem" }}>Course Completion Rate</p>
          </div>
          <div>
            <h3 style={{ fontSize: "2.75rem", fontWeight: 800, color: "var(--accent-teal)" }}>50+</h3>
            <p style={{ color: "var(--text-secondary)", fontWeight: 500, marginTop: "0.25rem" }}>Bangladeshi Corporates</p>
          </div>
          <div>
            <h3 style={{ fontSize: "2.75rem", fontWeight: 800, color: "var(--accent-violet)" }}>10k+</h3>
            <p style={{ color: "var(--text-secondary)", fontWeight: 500, marginTop: "0.25rem" }}>Certified Graduates</p>
          </div>
          <div>
            <h3 style={{ fontSize: "2.75rem", fontWeight: 800, color: "var(--text-primary)" }}>100%</h3>
            <p style={{ color: "var(--text-secondary)", fontWeight: 500, marginTop: "0.25rem" }}>Practical Lab Focus</p>
          </div>
        </div>
      </section>

      {/* CTA Section — immersive background image */}
      <section style={{
        position: "relative",
        padding: "7rem 0",
        overflow: "hidden",
        background: "#0f172a"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 0
        }}>
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80&auto=format&fit=crop"
            alt="Modern office meeting"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.2 }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(14,165,233,0.2) 100%)"
          }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h2 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "1rem", color: "white" }}>
            Ready to Build or Harden?
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.15rem", maxWidth: "38rem", margin: "0 auto 2.5rem auto", lineHeight: 1.6 }}>
            Speak directly with our senior developers and security engineers to build custom AI platforms or protect your existing infrastructure.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book" className="btn btn-accent" style={{
              padding: "0.9rem 2rem",
              fontSize: "1rem",
              boxShadow: "0 0 30px rgba(14, 165, 233, 0.3)"
            }}>
              <Phone size={18} />
              <span>Schedule Call</span>
            </Link>
            <Link href="/quote" className="btn" style={{
              padding: "0.9rem 2rem",
              fontSize: "1rem",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white"
            }}>
              <span>Request Quote</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
