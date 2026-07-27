import Link from "next/link";
import { ArrowRight, ShieldCheck, BrainCircuit, Cpu, Users, Award, BookOpen, Phone, Zap, Globe, Target } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION — Premium Animated Dark Mode
          CSS-only animated grid mesh + gradient orbs, centered layout
       ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#060918"
      }}>
        {/* Layer 1: Animated Grid Mesh */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(56,189,248,0.04) 0px, transparent 1px, transparent 80px),
            repeating-linear-gradient(90deg, rgba(56,189,248,0.04) 0px, transparent 1px, transparent 80px)
          `,
          animation: "gridPulse 8s ease-in-out infinite",
          zIndex: 0
        }} />

        {/* Layer 2: Drifting Gradient Orb — Cyan */}
        <div style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(14,165,233,0.05) 40%, transparent 70%)",
          animation: "drift 20s ease-in-out infinite",
          zIndex: 0,
          pointerEvents: "none"
        }} />

        {/* Layer 3: Drifting Gradient Orb — Violet */}
        <div style={{
          position: "absolute",
          bottom: "-15%",
          left: "-8%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)",
          animation: "driftReverse 25s ease-in-out infinite",
          zIndex: 0,
          pointerEvents: "none"
        }} />

        {/* Layer 4: Subtle Teal Accent Orb */}
        <div style={{
          position: "absolute",
          top: "60%",
          right: "20%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(13,148,136,0.1) 0%, transparent 60%)",
          animation: "drift 18s ease-in-out infinite",
          animationDelay: "-5s",
          zIndex: 0,
          pointerEvents: "none"
        }} />

        {/* Hero Content */}
        <div className="container" style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "6rem 1.5rem 3rem",
          maxWidth: "860px"
        }}>
          {/* Badge — Slogan */}
          <div style={{
            animation: "heroFadeIn 0.8s ease-out forwards",
            opacity: 0,
            animationDelay: "0.1s",
            marginBottom: "2rem"
          }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "linear-gradient(90deg, rgba(14,165,233,0.15) 0%, rgba(139,92,246,0.15) 100%)",
              border: "1px solid rgba(56,189,248,0.25)",
              color: "#7dd3fc",
              padding: "0.5rem 1.25rem",
              borderRadius: "9999px",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              animation: "glowPulse 4s ease-in-out infinite"
            }}>
              <Zap size={15} style={{ color: "#38bdf8", filter: "drop-shadow(0 0 6px #38bdf8)" }} />
              <span>ERAAO &mdash; Lighting the Future</span>
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "4.25rem",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "#f1f5f9",
            marginBottom: "1.75rem",
            animation: "heroFadeIn 0.8s ease-out forwards",
            opacity: 0,
            animationDelay: "0.3s"
          }}>
            The Convergence of{" "}
            <span style={{
              background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 40%, #c084fc 70%, #2dd4bf 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 6s linear infinite"
            }}>
              Applied AI & Offensive Security
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: "1.2rem",
            color: "#94a3b8",
            lineHeight: 1.7,
            maxWidth: "38rem",
            margin: "0 auto 2.5rem auto",
            animation: "heroFadeIn 0.8s ease-out forwards",
            opacity: 0,
            animationDelay: "0.5s"
          }}>
            Enterprise AI architectures, advanced penetration testing, and
            professional-grade practitioner bootcamps to future-proof
            your organization.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "heroFadeIn 0.8s ease-out forwards",
            opacity: 0,
            animationDelay: "0.7s"
          }}>
            <Link href="/academy" className="btn btn-accent" style={{
              padding: "0.9rem 2.25rem",
              fontSize: "1rem",
              fontWeight: 700,
              borderRadius: "12px",
              boxShadow: "0 0 30px rgba(14,165,233,0.35), 0 4px 15px rgba(14,165,233,0.2)"
            }}>
              <span>Explore Academy</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/book" className="btn" style={{
              padding: "0.9rem 2.25rem",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "12px",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#e2e8f0"
            }}>
              <Phone size={18} />
              <span>Book Consultation</span>
            </Link>
          </div>
        </div>

        {/* Bento Feature Cards */}
        <div className="container" style={{
          position: "relative",
          zIndex: 1,
          padding: "0 1.5rem 2rem",
          maxWidth: "960px",
          animation: "heroFadeIn 0.8s ease-out forwards",
          opacity: 0,
          animationDelay: "0.9s"
        }}>
          <div className="responsive-grid-3" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem"
          }}>
            {[
              {
                icon: <ShieldCheck size={22} style={{ color: "#2dd4bf" }} />,
                title: "Offensive Security",
                desc: "Red Team Ops & Pentesting",
                accent: "rgba(45,212,191,0.12)",
                border: "rgba(45,212,191,0.2)"
              },
              {
                icon: <BrainCircuit size={22} style={{ color: "#818cf8" }} />,
                title: "AI Engineering",
                desc: "LLM Agents & MLOps",
                accent: "rgba(129,140,248,0.12)",
                border: "rgba(129,140,248,0.2)"
              },
              {
                icon: <Award size={22} style={{ color: "#38bdf8" }} />,
                title: "Academy",
                desc: "Certified Practitioner Training",
                accent: "rgba(56,189,248,0.12)",
                border: "rgba(56,189,248,0.2)"
              }
            ].map((card, i) => (
              <div key={i} className="hover-lift" style={{
                background: card.accent,
                backdropFilter: "blur(16px)",
                border: `1px solid ${card.border}`,
                borderRadius: "14px",
                padding: "1.5rem",
                transition: "all 0.3s ease",
                cursor: "default"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.5rem"
                }}>
                  {card.icon}
                  <span style={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "#f1f5f9"
                  }}>{card.title}</span>
                </div>
                <p style={{
                  fontSize: "0.85rem",
                  color: "#64748b",
                  lineHeight: 1.5
                }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Metrics Bar */}
        <div style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(8px)",
          animation: "heroFadeIn 0.8s ease-out forwards",
          opacity: 0,
          animationDelay: "1.1s"
        }}>
          <div className="container" style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "3rem",
            padding: "1.75rem 1.5rem"
          }}>
            {[
              { value: "98%", label: "Completion Rate", color: "#38bdf8" },
              { value: "10k+", label: "Graduates", color: "#818cf8" },
              { value: "50+", label: "Enterprise Clients", color: "#2dd4bf" },
              { value: "24/7", label: "SOC Monitoring", color: "#f472b6" }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: stat.color,
                  letterSpacing: "-0.02em"
                }}>{stat.value}</div>
                <div style={{
                  fontSize: "0.78rem",
                  color: "#64748b",
                  fontWeight: 500,
                  marginTop: "0.15rem"
                }}>{stat.label}</div>
              </div>
            ))}
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
