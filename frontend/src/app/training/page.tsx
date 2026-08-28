import { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight, Video, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Live Bootcamps & Hacking Cohorts — Academy Bangladesh",
  description: "Enroll in live virtual ethical hacking classes, offensive penetration testing training, and secure AI systems engineering bootcamps in Bangladesh.",
  alternates: {
    canonical: "/training",
  },
};

export default function TrainingPage() {
  const bootcamps = [
    { title: "Offensive Security Cohort", schedule: "August 1st — October 15th, 2026", format: "Live Virtual + Practical Labs", description: "Comprehensive preparation covering active directory compromise, buffer overflows, and complex network pivoting.", price: "৳35,000 / Seat" },
    { title: "Secure AI Solutions Architect", schedule: "September 5th — October 30th, 2026", format: "Live Class + Capstone Project", description: "Design fully secure enterprise agent architectures, secure RAG nodes, and protect models from malicious prompt injections.", price: "৳45,000 / Seat" }
  ];

  return (
    <div style={{ padding: "var(--spacing-section) 0" }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">
            Cohorts &amp; Live Programs
          </span>
          <h1 className="section-title">Live Training &amp; Bootcamps</h1>
          <p className="section-subtitle">
            Rigorous live cohort training directed by OSCP security experts and production AI engineers.
          </p>
        </div>

        {/* Bootcamp Grid */}
        <div className="card-grid-2" style={{ marginBottom: "var(--spacing-section)" }}>
          {bootcamps.map((camp, idx) => (
            <div key={idx} className="card hover-lift" style={{ padding: "3rem", display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", color: "var(--accent-blue)", fontSize: "var(--text-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
                <Video size={16} />
                <span>{camp.format}</span>
              </div>
              <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem" }}>{camp.title}</h3>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "1.5rem", fontWeight: 500 }}>
                <Calendar size={14} />
                <span>{camp.schedule}</span>
              </div>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: "var(--text-base)", flex: 1, marginBottom: "2rem" }}>
                {camp.description}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
                <span style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)" }}>{camp.price}</span>
                <Link href="/book" className="btn btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "var(--text-sm)" }}>
                  <span>Apply Seat</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate L&D Promo */}
        <div style={{
          background: "linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-dark-secondary) 100%)",
          color: "white",
          borderRadius: "var(--radius-lg)",
          padding: "4rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "4rem",
          alignItems: "center"
        }}>
          <div>
            <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginBottom: "1rem", color: "var(--text-on-dark)" }}>Corporate Cohorts &amp; Custom Curricula</h2>
            <p style={{ color: "var(--text-on-dark-muted)", fontSize: "var(--text-base)", lineHeight: 1.6, marginBottom: "2rem" }}>
              Looking to upskill your entire development or security team? We design tailored bootcamps, configure isolated target practice labs, and issue branded completion certificates.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link href="/quote?service=corporate" className="btn btn-accent" style={{ color: "white" }}>
                <MessageSquare size={16} />
                <span>Request Corporate Quote</span>
              </Link>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80&auto=format&fit=crop"
              alt="Corporate Training Workspace"
              style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "var(--radius-md)" }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
