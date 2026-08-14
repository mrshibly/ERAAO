"use client";

import Link from "next/link";
import Logo from "@/components/Logo";

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
        </div>
        <div className="footer-column">
          <h4>Services</h4>
          <ul>
            <li><Link href="/services">AI Agent Architectures</Link></li>
            <li><Link href="/services">Offensive Penetration Testing</Link></li>
            <li><Link href="/services">Cloud Security</Link></li>
            <li><Link href="/services">Web &amp; Mobile Pentesting</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Academy</h4>
          <ul>
            <li><Link href="/academy">Cybersecurity Track</Link></li>
            <li><Link href="/academy">AI &amp; LLM Training</Link></li>
            <li><Link href="/academy">Live bootcamps</Link></li>
            <li><Link href="/academy">Certifications</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact</h4>
          <ul>
            <li>Email: info@eraao.com</li>
            <li>Phone: +880 1700-000000</li>
            <li>Address: Dhaka, Bangladesh</li>
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
