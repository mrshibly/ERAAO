import { Metadata } from "next";
import { ShieldCheck, Cpu, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Academy Bangladesh",
  description: "Learn more about our elite team of OSCP & OSCE certified security consultants and our secure Applied AI mission in Bangladesh.",
};

export default function AboutPage() {
  const team = [
    { name: "Alex Mercer", role: "Principal Security Consultant", certs: "OSCP, OSCE, OSWE", desc: "10+ years of offensive penetration testing and infrastructure compromise simulation.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format&fit=crop" },
    { name: "Dr. Sarah Chen", role: "AI Research Lead", certs: "PhD Machine Learning", desc: "Author of multiple whitepapers on LLM prompt injection defense and secure agent orchestration.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format&fit=crop" },
    { name: "Marcus Vance", role: "Director of Academy Operations", certs: "CISSP, CEH", desc: "Designed training pipelines for 10,000+ engineers globally across cybersecurity tracks.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop" }
  ];

  return (
    <div style={{ padding: "var(--spacing-section) 0" }}>
      <div className="container">
        
        {/* Hero Section */}
        <div className="section-header">
          <span className="section-badge">
            Who We Are
          </span>
          <h1 className="section-title">About Our Academy</h1>
          <p className="section-subtitle">
            We exist at the convergence of Applied AI and Offensive Security, delivering state-of-the-art enterprise services and practitioner-led bootcamps.
          </p>
        </div>

        {/* Visual Banner */}
        <div style={{
          position: "relative",
          height: "400px",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          marginBottom: "var(--spacing-section)",
          boxShadow: "var(--shadow-lg)"
        }}>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop"
            alt="Academy Team Work"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.9) 100%)",
            display: "flex",
            alignItems: "flex-end",
            padding: "3rem"
          }}>
            <div>
              <h3 style={{ color: "var(--text-on-dark)", fontSize: "var(--text-2xl)", fontWeight: 800 }}>Pioneering Secure AI Operations</h3>
              <p style={{ color: "var(--text-on-dark-subtle)", marginTop: "0.5rem", maxWidth: "32rem", fontSize: "var(--text-base)" }}>
                Our solutions enable tech-forward companies to deploy custom LLMs securely while defending their network perimeters from advanced adversaries.
              </p>
            </div>
          </div>
        </div>

        {/* Value Pillars */}
        <div className="card-grid" style={{ marginBottom: "var(--spacing-section)" }}>
          <div className="card">
            <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "var(--accent-blue-bg)", color: "var(--accent-blue)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "0.75rem" }}>Technical Rigor</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>
              No marketing fluff. All of our course content and advisory perimeters are designed and reviewed by elite practitioner labs.
            </p>
          </div>

          <div className="card">
            <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "rgba(139, 92, 246, 0.1)", color: "var(--accent-violet)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <Cpu size={24} />
            </div>
            <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "0.75rem" }}>Applied AI Focus</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>
              We build and secure agents, configure scalable vector indexing databases, and block critical injection flaws in modern applications.
            </p>
          </div>

          <div className="card">
            <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "rgba(13, 148, 136, 0.1)", color: "var(--accent-teal)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "0.75rem" }}>Zero-Trust Integrity</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>
              Every network boundary, Active Directory forest, and API pipeline is verified under the most rigorous standards.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "var(--spacing-section)" }}>
          <div className="section-header">
            <h2 className="section-title">Meet the Instructors</h2>
            <p className="section-subtitle">Elite credential holders directing our live bootcamps and corporate training.</p>
          </div>

          <div className="card-grid">
            {team.map((member, i) => (
              <div key={i} className="card hover-lift" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ height: "260px", overflow: "hidden" }}>
                  <img
                    src={member.img}
                    alt={member.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h4 style={{ fontWeight: 700, fontSize: "var(--text-lg)", color: "var(--text-primary)" }}>{member.name}</h4>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.25rem" }}>
                    <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", fontWeight: 500 }}>{member.role}</span>
                    <span className="badge badge-blue">
                      {member.certs}
                    </span>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginTop: "1rem", lineHeight: 1.5 }}>
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
