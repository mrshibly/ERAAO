"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

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
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="logo" style={{ marginBottom: "0.75rem" }}>
            <Logo size={28} textColor="#ffffff" />
          </div>
          <div className="footer-tagline">Lighting the future.</div>
          <p className="footer-description">
            Leading security and artificial intelligence service provider &amp; practitioner development training institute.
          </p>

          {/* Social Channels */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
            <a
              href="https://www.facebook.com/eraao.academy"
              target="_blank"
              rel="noopener noreferrer"
              title="ERAAO Academy on Facebook"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#cbd5e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "var(--transition-fast)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1877f2";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.color = "#cbd5e1";
              }}
            >
              <FacebookIcon size={18} />
            </a>

            <a
              href="https://linkedin.com/company/eraao"
              target="_blank"
              rel="noopener noreferrer"
              title="ERAAO on LinkedIn"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#cbd5e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "var(--transition-fast)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#0a66c2";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.color = "#cbd5e1";
              }}
            >
              <LinkedinIcon size={18} />
            </a>

            <a
              href="https://github.com/mrshibly"
              target="_blank"
              rel="noopener noreferrer"
              title="ERAAO on GitHub"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#cbd5e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "var(--transition-fast)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#24292f";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.color = "#cbd5e1";
              }}
            >
              <GithubIcon size={18} />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Services</h4>
          <ul>
            <li><Link href="/services">AI Agent Architectures</Link></li>
            <li><Link href="/services">Offensive Penetration Testing</Link></li>
            <li><Link href="/services">Cloud Security &amp; Audits</Link></li>
            <li><Link href="/services">Web &amp; Mobile Pentesting</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Academy</h4>
          <ul>
            <li><Link href="/academy">Cybersecurity Track</Link></li>
            <li><Link href="/academy">AI &amp; LLM Training</Link></li>
            <li><Link href="/academy">Live Bootcamps</Link></li>
            <li><Link href="/verify">Verify Credentials</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact &amp; Social</h4>
          <ul>
            <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Mail size={14} style={{ color: "var(--accent-teal)" }} />
              <span>info@eraao.com</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Phone size={14} style={{ color: "var(--accent-teal)" }} />
              <span>+880 1700-000000</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPin size={14} style={{ color: "var(--accent-teal)" }} />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FacebookIcon size={14} />
              <a
                href="https://www.facebook.com/eraao.academy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#93c5fd", textDecoration: "underline" }}
              >
                fb.com/eraao.academy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} Eraao Platform. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

