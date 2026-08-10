import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Shield } from "lucide-react";
import { AuthProvider } from "@/context/AuthContext";
import ConditionalWrapper from "./ConditionalWrapper";
import Navbar from "./Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Logo from "@/components/Logo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://eraao.com"),
  title: {
    default: "ERAAO — Applied AI & Cybersecurity Academy",
    template: "%s | ERAAO"
  },
  description: "ERAAO — Applied AI & Offensive Cybersecurity Academy & Enterprise Engineering Services in Bangladesh.",
  keywords: [
    "Cybersecurity Bangladesh",
    "AI Development Dhaka",
    "Penetration Testing",
    "Offensive Security Bootcamps",
    "LLM Architecture",
    "Ethical Hacking Course",
    "Eraao",
    "Lighting the future"
  ],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  openGraph: {
    title: "Eraao — Lighting the future.",
    description: "Lighting the future. Enterprise AI Development, Defensive & Offensive Cybersecurity Services, and Professional Practitioner Academy.",
    url: "https://eraao.com",
    siteName: "Eraao",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Eraao — Lighting the future.",
    description: "Lighting the future. Enterprise AI Development, Defensive & Offensive Cybersecurity Services, and Professional Practitioner Academy."
  },
  verification: {
    google: "0KgnlJEXvcjNUrVF4Q4ni8_sfxzf0Hzxgu1ew5H1FNw"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>
        <JsonLd />
        <AuthProvider>
          <ConditionalWrapper
            navbar={<Navbar />}
            footer={
              <footer style={{ backgroundColor: "#0f172a", color: "#f8fafc", padding: "4rem 0 2rem 0" }}>
                <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
                  <div>
                    <div className="logo" style={{ marginBottom: "0.75rem" }}>
                      <Logo size={28} textColor="#ffffff" />
                    </div>
                    <div style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#38bdf8",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      marginBottom: "0.75rem"
                    }}>
                      Lighting the future.
                    </div>
                    <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                      Leading security and artificial intelligence service provider & practitioner development training institute.
                    </p>
                  </div>
                  <div>
                    <h4 style={{ color: "#ffffff", fontSize: "1.05rem", fontWeight: 600, marginBottom: "1.25rem" }}>Services</h4>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem", color: "#cbd5e1" }}>
                      <li><Link href="/services">AI Agent Architectures</Link></li>
                      <li><Link href="/services">Offensive Penetration Testing</Link></li>
                      <li><Link href="/services">Cloud Security</Link></li>
                      <li><Link href="/services">Web & Mobile Pentesting</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: "#ffffff", fontSize: "1.05rem", fontWeight: 600, marginBottom: "1.25rem" }}>Academy</h4>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem", color: "#cbd5e1" }}>
                      <li><Link href="/academy">Cybersecurity Track</Link></li>
                      <li><Link href="/academy">AI & LLM Training</Link></li>
                      <li><Link href="/academy">Live bootcamps</Link></li>
                      <li><Link href="/academy">Certifications</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: "#ffffff", fontSize: "1.05rem", fontWeight: 600, marginBottom: "1.25rem" }}>Contact</h4>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem", color: "#cbd5e1" }}>
                      <li>Email: info@eraao.com</li>
                      <li>Phone: +880 1700-000000</li>
                      <li>Address: Dhaka, Bangladesh</li>
                    </ul>
                  </div>
                </div>
                <div className="container" style={{ borderTop: "1px solid #1e293b", marginTop: "3rem", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#94a3b8" }}>
                  <span>&copy; {new Date().getFullYear()} Eraao Platform. All rights reserved.</span>
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Service</Link>
                  </div>
                </div>
              </footer>
            }
          >
            {children}
          </ConditionalWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
