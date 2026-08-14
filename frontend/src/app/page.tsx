import Link from "next/link";
import { ArrowRight, ShieldCheck, BrainCircuit, Users, Award, Phone, Globe, Target } from "lucide-react";
import Chatbot from "@/components/Chatbot";

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
        background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
        borderBottom: "1px solid var(--border-color)"
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
            <h1 className="hero-title anim-fade-up anim-delay-1" style={{
              fontSize: "3.75rem",
              fontWeight: 900,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              marginBottom: "1.5rem"
            }}>
              The Convergence of
              <span className="gradient-text-animated" style={{
                display: "block",
                background: "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-violet) 60%, var(--accent-teal) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% auto"
              }}>
                Applied AI &amp; Offensive Security
              </span>
            </h1>

            {/* Subheadline Paragraph */}
            <p className="anim-fade-up anim-delay-2" style={{
              fontSize: "var(--text-lg)",
              color: "var(--text-secondary)",
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
                fontSize: "var(--text-base)",
                fontWeight: 700,
                borderRadius: "var(--radius-xl)",
                background: "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-blue-hover) 100%)",
                boxShadow: "0 10px 25px rgba(14, 165, 233, 0.35)",
                color: "white"
              }}>
                <span>Explore Academy</span>
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
                boxShadow: "var(--shadow-sm)"
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
              borderTop: "1px solid var(--border-color)"
            }}>
              <div>
                <div style={{ fontSize: "var(--text-3xl)", fontWeight: 900, color: "var(--accent-blue)" }}>98%</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Completion Rate</div>
              </div>
              <div>
                <div style={{ fontSize: "var(--text-3xl)", fontWeight: 900, color: "var(--accent-violet)" }}>10k+</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Graduates</div>
              </div>
              <div>
                <div style={{ fontSize: "var(--text-3xl)", fontWeight: 900, color: "var(--accent-teal)" }}>50+</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Enterprise Clients</div>
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
              boxShadow: "var(--shadow-xl)",
              border: "1px solid var(--border-color)"
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
              boxShadow: "var(--shadow-xl)",
              border: "4px solid var(--bg-primary)"
            }}>
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&auto=format&fit=crop&q=75"
                alt="AI neural network architecture"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="eager"
              />
            </div>

            {/* Floating Glassmorphic Badge 1: SOC-2 Ready */}
            <div className="anim-float glass" style={{
              position: "absolute",
              top: "210px",
              right: "-15px",
              borderRadius: "16px",
              padding: "1rem 1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              boxShadow: "var(--shadow-lg)",
              animationDelay: "-1.5s",
              zIndex: 10
            }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "var(--radius-xl)",
                background: "var(--accent-blue-bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <ShieldCheck size={24} style={{ color: "var(--accent-blue)" }} />
              </div>
              <div>
                <div style={{ fontSize: "var(--text-sm)", fontWeight: 800, color: "var(--text-primary)" }}>SOC-2 &amp; ISO Ready</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Enterprise Defense</div>
              </div>
            </div>

            {/* Floating Glassmorphic Badge 2: LLM Multi-Agent */}
            <div className="anim-float-delayed glass" style={{
              position: "absolute",
              bottom: "-10px",
              right: "30px",
              borderRadius: "16px",
              padding: "0.9rem 1.2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              boxShadow: "var(--shadow-lg)",
              animationDelay: "-4.5s",
              zIndex: 10
            }}>
              <div style={{
                width: "38px",
                height: "38px",
                borderRadius: "var(--radius-xl)",
                background: "rgba(124, 58, 237, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <BrainCircuit size={22} style={{ color: "var(--accent-violet)" }} />
              </div>
              <div>
                <div style={{ fontSize: "var(--text-sm)", fontWeight: 800, color: "var(--text-primary)" }}>LLM Multi-Agent</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Custom Orchestration</div>
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
            <span style={{ fontWeight: 600 }}>OSCP &amp; OSCE Certified Bangladeshi Instructors</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--text-secondary)" }}>
            <BrainCircuit size={24} style={{ color: "var(--accent-violet)" }} />
            <span style={{ fontWeight: 600 }}>Custom LLM &amp; RAG Solutions</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--text-secondary)" }}>
            <ShieldCheck size={24} style={{ color: "var(--accent-blue)" }} />
            <span style={{ fontWeight: 600 }}>ISO 27001 Audit Ready Services</span>
          </div>
        </div>
      </section>

      {/* Services with Images */}
      <section style={{ padding: "var(--spacing-section) 0" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">What We Do</span>
            <h2 className="section-title">Our Core Offerings</h2>
            <p className="section-subtitle">
              Structured to deliver technical excellence for businesses and practitioners.
            </p>
          </div>

          <div className="responsive-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {/* Card 1: AI Engineering */}
            <div className="hover-lift card" style={{ padding: 0, overflow: "hidden" }}>
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
                  background: "rgba(139, 92, 246, 0.9)",
                  color: "white",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 700
                }}>
                  AI &amp; ML
                </div>
              </div>
              <div style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "0.75rem" }}>AI &amp; Software Engineering</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  End-to-end custom AI systems, multi-agent LLM platforms, MLOps orchestration, and secure application development.
                </p>
                <Link href="/services" style={{ color: "var(--accent-violet)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "var(--text-sm)" }}>
                  <span>Explore AI Services</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Card 2: Cybersecurity */}
            <div className="hover-lift card" style={{ padding: 0, overflow: "hidden" }}>
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
                  background: "rgba(13, 148, 136, 0.9)",
                  color: "white",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 700
                }}>
                  Security
                </div>
              </div>
              <div style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "0.75rem" }}>Cybersecurity Services</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  Offensive pentesting (Web, Mobile, AD, API), red teaming, AI security audits, and cloud configuration hardening.
                </p>
                <Link href="/services" style={{ color: "var(--accent-teal)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "var(--text-sm)" }}>
                  <span>View Security Services</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Card 3: Academy */}
            <div className="hover-lift card" style={{ padding: 0, overflow: "hidden" }}>
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
                  background: "rgba(14, 165, 233, 0.9)",
                  color: "white",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 700
                }}>
                  Academy
                </div>
              </div>
              <div style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "0.75rem" }}>Training Academy</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  Self-paced curricula and intensive live bootcamps covering ethical hacking, bug hunting, secure coding, and LLM orchestration.
                </p>
                <Link href="/academy" style={{ color: "var(--accent-blue)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "var(--text-sm)" }}>
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
        padding: "var(--spacing-section) 0",
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
              <div className="card" style={{
                position: "absolute",
                bottom: "-30px",
                right: "-20px",
                padding: "1.25rem 1.5rem",
                boxShadow: "var(--shadow-xl)",
                display: "flex",
                alignItems: "center",
                gap: "1rem"
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-success-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Target size={24} style={{ color: "var(--accent-emerald)" }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "var(--text-2xl)" }}>50+</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)" }}>Local Clients</div>
                </div>
              </div>
            </div>

            {/* Right — Content */}
            <div>
              <span className="section-badge" style={{ background: "rgba(13, 148, 136, 0.08)", color: "var(--accent-teal)" }}>
                Why Choose Us
              </span>
              <h2 style={{ fontSize: "var(--text-4xl)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "1rem", marginTop: "1rem" }}>
                Built by Practitioners,<br />for Practitioners
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-base)", lineHeight: 1.7, marginBottom: "2rem" }}>
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
                      borderRadius: "var(--radius-md)",
                      background: `${item.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <item.icon size={20} style={{ color: item.color }} />
                    </div>
                    <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", fontWeight: 500 }}>
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
        padding: "var(--spacing-section) 0",
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
            <h3 style={{ fontSize: "var(--text-4xl)", fontWeight: 800, color: "var(--accent-blue)" }}>98%</h3>
            <p style={{ color: "var(--text-secondary)", fontWeight: 500, marginTop: "0.25rem" }}>Course Completion Rate</p>
          </div>
          <div>
            <h3 style={{ fontSize: "var(--text-4xl)", fontWeight: 800, color: "var(--accent-teal)" }}>50+</h3>
            <p style={{ color: "var(--text-secondary)", fontWeight: 500, marginTop: "0.25rem" }}>Bangladeshi Corporates</p>
          </div>
          <div>
            <h3 style={{ fontSize: "var(--text-4xl)", fontWeight: 800, color: "var(--accent-violet)" }}>10k+</h3>
            <p style={{ color: "var(--text-secondary)", fontWeight: 500, marginTop: "0.25rem" }}>Certified Graduates</p>
          </div>
          <div>
            <h3 style={{ fontSize: "var(--text-4xl)", fontWeight: 800, color: "var(--text-primary)" }}>100%</h3>
            <p style={{ color: "var(--text-secondary)", fontWeight: 500, marginTop: "0.25rem" }}>Practical Lab Focus</p>
          </div>
        </div>
      </section>

      {/* CTA Section — immersive background image */}
      <section style={{
        position: "relative",
        padding: "7rem 0",
        overflow: "hidden",
        background: "var(--bg-dark)"
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
          <h2 style={{ fontSize: "var(--text-4xl)", fontWeight: 800, marginBottom: "1rem", color: "var(--text-on-dark)" }}>
            Ready to Build or Harden?
          </h2>
          <p style={{ color: "var(--text-on-dark-muted)", fontSize: "var(--text-lg)", maxWidth: "var(--max-width-narrow)", margin: "0 auto 2.5rem auto", lineHeight: 1.6 }}>
            Speak directly with our senior developers and security engineers to build custom AI platforms or protect your existing infrastructure.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book" className="btn btn-accent" style={{
              padding: "0.9rem 2rem",
              fontSize: "var(--text-base)",
              boxShadow: "0 0 30px rgba(14, 165, 233, 0.3)"
            }}>
              <Phone size={18} />
              <span>Schedule Call</span>
            </Link>
            <Link href="/quote" className="btn" style={{
              padding: "0.9rem 2rem",
              fontSize: "var(--text-base)",
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

      {/* AI Assistant Chatbot — Landing Page Only */}
      <Chatbot />
    </div>
  );
}
