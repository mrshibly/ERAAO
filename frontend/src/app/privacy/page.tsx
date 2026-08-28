import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how ERAAO collects, protects, and handles student and client information under ISO 27001 standards.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div style={{ padding: "var(--spacing-section) 0" }}>
      <div className="container" style={{ maxWidth: "42rem" }}>
        <h1 style={{ fontSize: "var(--text-4xl)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1rem", color: "var(--text-primary)" }}>Privacy Policy</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", marginBottom: "2rem" }}>Last updated: July 11, 2026</p>

        <div className="card" style={{ lineHeight: 1.8, fontSize: "var(--text-base)", display: "flex", flexDirection: "column", gap: "1.5rem", color: "var(--text-secondary)", padding: "2.5rem" }}>
          <p>
            At <strong style={{ color: "var(--text-primary)" }}>ERAAO</strong>, we take the confidentiality of your academic progress and security metrics seriously. This Privacy Policy details how we collect, process, and protect your information.
          </p>

          <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--text-primary)", marginTop: "0.5rem" }}>1. Data Collection</h2>
          <p>
            We collect your full name, email address, password hashes, billing credentials, and course progress coordinates during your enrollment cycle.
          </p>

          <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--text-primary)", marginTop: "0.5rem" }}>2. Processing Scope</h2>
          <p>
            Your information is processed to maintain login authentication sessions, track module and lesson completions, compute average grades, issue completion certificates, and verify compliance under ISO 27001 requirements.
          </p>

          <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--text-primary)", marginTop: "0.5rem" }}>3. Academic Integrity</h2>
          <p>
            Practitioner lab solutions and answer submissions are logged strictly for grading verification. They are never shared, white-labeled, or sold to external corporate recruiting agencies.
          </p>
        </div>
      </div>
    </div>
  );
}
