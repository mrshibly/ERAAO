"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

// Clean inline brand SVGs
const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function Footer() {
  return (
    <footer style={{
      background: "linear-gradient(180deg, #090d16 0%, #030712 100%)",
      color: "#94a3b8",
      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      position: "relative",
      overflow: "hidden",
      paddingTop: "4rem",
      paddingBottom: "2rem"
    }}>

      {/* Background Subtle Ambient Glow */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "300px",
        background: "radial-gradient(ellipse at top, rgba(14, 165, 233, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
        pointerEvents: "none"
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* Top Callout Banner */}
        <div style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "var(--radius-xl)",
          padding: "1.5rem 2rem",
          marginBottom: "3.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.25rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
              <span className="badge" style={{ background: "rgba(14, 165, 233, 0.15)", color: "#38bdf8", border: "1px solid rgba(56, 189, 248, 0.3)" }}>
                ⚡ Practical Mastery
              </span>
              <span style={{ fontSize: "var(--text-xs)", color: "#cbd5e1", fontWeight: 600 }}>
                Next-Gen Cybersecurity &amp; AI Academy
              </span>
            </div>
            <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em" }}>
              Ready to elevate your engineering career or secure your enterprise?
            </h3>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link
              href="/academy"
              className="btn btn-primary"
              style={{
                fontSize: "var(--text-xs)",
                padding: "0.6rem 1.25rem",
                borderRadius: "var(--radius-md)"
              }}
            >
              <span>Explore Academy</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/book"
              className="btn btn-outline"
              style={{
                fontSize: "var(--text-xs)",
                padding: "0.6rem 1.25rem",
                borderRadius: "var(--radius-md)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#ffffff"
              }}
            >
              Book Consultation
            </Link>
          </div>
        </div>

        {/* Main 4-Column Footer Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "3rem",
          marginBottom: "3.5rem"
        }}>

          {/* Col 1: Brand & Bio */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <Logo size={30} textColor="#ffffff" />
            </div>
            <div style={{
              fontSize: "var(--text-xs)",
              fontWeight: 800,
              color: "#38bdf8",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "0.75rem"
            }}>
              Lighting The Future
            </div>
            <p style={{
              fontSize: "var(--text-xs)",
              color: "#94a3b8",
              lineHeight: "1.7",
              marginBottom: "1.5rem"
            }}>
              Leading cybersecurity &amp; artificial intelligence service provider and practitioner development institute headquartered in Dhaka, Bangladesh.
            </p>

            {/* Social Channels */}
            <div style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
              {[
                {
                  href: "https://www.facebook.com/eraao.academy",
                  label: "Facebook",
                  icon: <FacebookIcon size={16} />,
                  hoverBg: "#1877f2"
                },
                {
                  href: "https://linkedin.com/company/eraao",
                  label: "LinkedIn",
                  icon: <LinkedinIcon size={16} />,
                  hoverBg: "#0a66c2"
                },
                {
                  href: "https://github.com/mrshibly",
                  label: "GitHub",
                  icon: <GithubIcon size={16} />,
                  hoverBg: "#24292f"
                }
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#cbd5e1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.25s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = s.hoverBg;
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 4px 15px ${s.hoverBg}55`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.color = "#cbd5e1";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Academy */}
          <div>
            <h4 style={{
              fontSize: "var(--text-sm)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "1.25rem",
              letterSpacing: "-0.01em"
            }}>
              Academy
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "var(--text-xs)" }}>
              {[
                { label: "Cybersecurity Track", href: "/academy" },
                { label: "AI & LLM Engineering", href: "/academy" },
                { label: "Hands-on Virtual Labs", href: "/academy" },
                { label: "Live Bootcamps", href: "/academy" },
                { label: "Verify Certificates", href: "/verify" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    style={{
                      color: "#94a3b8",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      display: "inline-block"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#38bdf8";
                      e.currentTarget.style.transform = "translateX(3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 style={{
              fontSize: "var(--text-sm)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "1.25rem",
              letterSpacing: "-0.01em"
            }}>
              Services
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "var(--text-xs)" }}>
              {[
                { label: "AI Agent Architectures", href: "/services" },
                { label: "Offensive Penetration Testing", href: "/services" },
                { label: "Cloud Security & Audits", href: "/services" },
                { label: "Web & Mobile Pentesting", href: "/services" },
                { label: "Technical Consultation", href: "/book" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    style={{
                      color: "#94a3b8",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      display: "inline-block"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#38bdf8";
                      e.currentTarget.style.transform = "translateX(3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Info */}
          <div>
            <h4 style={{
              fontSize: "var(--text-sm)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "1.25rem",
              letterSpacing: "-0.01em"
            }}>
              Contact &amp; Location
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "var(--text-xs)" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Mail size={14} style={{ color: "#38bdf8", flexShrink: 0 }} />
                <a href="mailto:info@eraao.com" style={{ color: "#cbd5e1", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#ffffff"} onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}>
                  info@eraao.com
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Phone size={14} style={{ color: "#38bdf8", flexShrink: 0 }} />
                <span style={{ color: "#cbd5e1" }}>+880 1700-000000</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <MapPin size={14} style={{ color: "#38bdf8", flexShrink: 0 }} />
                <span style={{ color: "#cbd5e1" }}>Dhaka, Bangladesh</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.25rem" }}>
                <FacebookIcon size={14} />
                <a
                  href="https://www.facebook.com/eraao.academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#38bdf8", textDecoration: "none", fontWeight: 600 }}
                >
                  fb.com/eraao.academy
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar — Copyright, Status & Legal */}
        <div style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: "1.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "var(--text-xs)"
        }}>
          <div>
            &copy; {new Date().getFullYear()} ERAAO Platform. All rights reserved.
          </div>

          {/* Operational Status Pill */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            padding: "0.25rem 0.65rem",
            borderRadius: "var(--radius-full)",
            color: "#34d399",
            fontWeight: 700,
            fontSize: "11px"
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 8px #10b981" }} />
            <span>All Systems Operational</span>
          </div>

          <div style={{ display: "flex", gap: "1.25rem" }}>
            <Link href="/about" style={{ color: "#94a3b8", textDecoration: "none" }}>About</Link>
            <Link href="/careers" style={{ color: "#94a3b8", textDecoration: "none" }}>Careers</Link>
            <Link href="/privacy" style={{ color: "#94a3b8", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: "#94a3b8", textDecoration: "none" }}>Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
