"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { Mail, Phone, MapPin } from "lucide-react";

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

export default function Footer() {
  return (
    <footer style={{
      background: "linear-gradient(180deg, #090d16 0%, #030712 100%)",
      color: "#94a3b8",
      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      position: "relative",
      overflow: "hidden",
      paddingTop: "3.5rem",
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

        {/* Main 4-Column Footer Grid */}
        <div className="footer-grid">

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

            {/* Social Channels (Facebook & LinkedIn) */}
            <div style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
              <a
                href="https://www.facebook.com/eraao.academy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="footer-social-icon facebook"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://linkedin.com/company/eraao"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="footer-social-icon linkedin"
              >
                <LinkedinIcon size={16} />
              </a>
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
                  <Link href={link.href} className="footer-link">
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
                  <Link href={link.href} className="footer-link">
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
                <a href="mailto:info@eraao.com" className="footer-link" style={{ color: "#cbd5e1" }}>
                  info@eraao.com
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Phone size={14} style={{ color: "#38bdf8", flexShrink: 0 }} />
                <a href="tel:+8801517835859" className="footer-link" style={{ color: "#cbd5e1" }}>
                  +880 1517-835859
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <MapPin size={14} style={{ color: "#38bdf8", flexShrink: 0 }} />
                <span style={{ color: "#cbd5e1" }}>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar — Copyright & Legal Links */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} ERAAO Platform. All rights reserved.
          </div>

          <div style={{ display: "flex", gap: "1.25rem" }}>
            <Link href="/about" className="footer-link">About</Link>
            <Link href="/careers" className="footer-link">Careers</Link>
            <Link href="/privacy" className="footer-link">Privacy Policy</Link>
            <Link href="/terms" className="footer-link">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
