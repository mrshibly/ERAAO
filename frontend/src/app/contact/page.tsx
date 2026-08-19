"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Send,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  AlertCircle,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageSquareQuote,
  HelpCircle,
  ChevronDown,
  Globe
} from "lucide-react";

// Clean inline Facebook SVG
const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function ContactPage() {
  const [selectedTopic, setSelectedTopic] = useState("services");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Enterprise Service Inquiry");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const topics = [
    { id: "services", label: "Enterprise Services", defaultSub: "Enterprise Service Inquiry" },
    { id: "academy", label: "Academy & Courses", defaultSub: "Course & Bootcamp Enrollment" },
    { id: "partnership", label: "Corporate Partnership", defaultSub: "Corporate Training & Partnership" },
    { id: "support", label: "Technical Support", defaultSub: "Support & Inquiries" },
  ];

  const handleTopicSelect = (id: string, defaultSub: string) => {
    setSelectedTopic(id);
    setSubject(defaultSub);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: `[${topics.find(t => t.id === selectedTopic)?.label || "General"}] ${subject}`,
          message: phone ? `Phone: ${phone}\n\n${message}` : message
        })
      });

      if (!response.ok) {
        throw new Error("Unable to transmit message. Please try again or email info@eraao.com directly.");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "How quickly can your team begin an engagement?",
      a: "For penetration testing, red teaming, and custom AI audits, we can scope and deploy a squad within 3 to 5 business days after NDA execution."
    },
    {
      q: "Do you sign Mutual Non-Disclosure Agreements (NDAs)?",
      a: "Yes. We strictly adhere to corporate compliance and execute standard or client-provided NDAs before accessing any architecture or proprietary codebases."
    },
    {
      q: "Are the academy courses live or self-paced?",
      a: "We offer both practitioner-led live cohorts with interactive labs and self-paced certified masterclasses with 1-on-1 mentor code reviews."
    },
    {
      q: "Can you provide custom enterprise training for engineering teams?",
      a: "Yes. We create tailored syllabus modules in Applied AI, DevSecOps, and Offensive Security designed specifically around your tech stack."
    }
  ];

  return (
    <div style={{ padding: "var(--spacing-section) 0", background: "var(--bg-secondary)", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "68rem" }}>
        
        {/* Header Section */}
        <div className="section-header" style={{ marginBottom: "3.5rem" }}>
          <span className="section-badge" style={{ background: "rgba(13, 148, 136, 0.08)", color: "var(--accent-teal)", border: "1px solid rgba(13, 148, 136, 0.2)" }}>
            Direct Contact &amp; Support
          </span>
          <h1 className="section-title">Let&apos;s Build &amp; Secure Your Future</h1>
          <p className="section-subtitle">
            Speak directly with our solution engineers, offensive security specialists, and training advisors.
          </p>
        </div>

        {/* Quick Contact Highlight Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3.5rem"
        }}>
          {/* Card 1 */}
          <div className="card hover-lift" style={{ padding: "1.75rem", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              backgroundColor: "rgba(14, 165, 233, 0.1)",
              color: "var(--accent-blue)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <Mail size={22} />
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                Direct Email
              </div>
              <a href="mailto:info@eraao.com" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: "0.25rem" }}>
                info@eraao.com
              </a>
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Average response time: &lt; 4 business hours
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card hover-lift" style={{ padding: "1.75rem", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              backgroundColor: "rgba(13, 148, 136, 0.1)",
              color: "var(--accent-teal)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <Building2 size={22} />
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                Headquarters
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                Dhaka, Bangladesh
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Engineering &amp; Security Lab Operations
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card hover-lift" style={{ padding: "1.75rem", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              color: "var(--accent-violet)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <Clock size={22} />
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                Consultation Hours
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                Sun – Thu, 9am – 6pm BST
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--color-success)", fontWeight: 600 }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--color-success)", display: "inline-block" }}></span>
                Desk Active
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Form + Info / Quick Links) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem",
          alignItems: "start",
          marginBottom: "4rem"
        }}>
          
          {/* Main Form Card */}
          <div className="card" style={{
            padding: "2.5rem",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-md)",
            border: "1px solid var(--border-color)"
          }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Send Us a Message
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1.75rem" }}>
              Choose a topic below to route your inquiry to the dedicated team.
            </p>

            {/* Topic Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.75rem" }}>
              {topics.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTopicSelect(t.id, t.defaultSub)}
                  style={{
                    padding: "0.45rem 0.9rem",
                    borderRadius: "9999px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "var(--transition-fast)",
                    border: selectedTopic === t.id ? "1px solid var(--accent-teal)" : "1px solid var(--border-color)",
                    backgroundColor: selectedTopic === t.id ? "rgba(13, 148, 136, 0.1)" : "var(--bg-primary)",
                    color: selectedTopic === t.id ? "var(--accent-teal)" : "var(--text-secondary)"
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {success ? (
              <div style={{
                textAlign: "center",
                padding: "3rem 1.5rem",
                backgroundColor: "rgba(34, 197, 94, 0.05)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                borderRadius: "var(--radius-lg)"
              }}>
                <CheckCircle2 size={56} style={{ color: "var(--color-success)", margin: "0 auto 1.25rem" }} />
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  Message Received!
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: "26rem", margin: "0 auto 1.75rem", lineHeight: 1.6 }}>
                  Thank you for reaching out. An engineer from our <strong style={{ color: "var(--text-primary)" }}>{topics.find(t => t.id === selectedTopic)?.label}</strong> team will review your message and reply promptly.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => setSuccess(false)}
                  style={{ padding: "0.6rem 1.25rem", fontSize: "0.875rem" }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {error && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    backgroundColor: "var(--color-error-bg)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "var(--color-error)",
                    padding: "0.85rem 1rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.85rem"
                  }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{error}</span>
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field"
                      style={{ borderRadius: "var(--radius-md)" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                      Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="sarah@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field"
                      style={{ borderRadius: "var(--radius-md)" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+880 1..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-field"
                      style={{ borderRadius: "var(--radius-md)" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                      Subject *
                    </label>
                    <input
                      required
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="input-field"
                      style={{ borderRadius: "var(--radius-md)" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                    How Can We Help You? *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your project goals, timelines, or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input-field"
                    style={{ borderRadius: "var(--radius-md)", resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    padding: "0.85rem 1.5rem",
                    fontWeight: 700,
                    borderRadius: "var(--radius-md)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                >
                  <Send size={16} />
                  <span>{loading ? "Transmitting..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Side: Need a Quote Faster? & Direct Contacts */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Quick Quote Prompt Box */}
            <div className="card" style={{
              padding: "2rem",
              borderRadius: "var(--radius-xl)",
              background: "linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(13, 148, 136, 0.08) 100%)",
              border: "1px solid rgba(14, 165, 233, 0.25)"
            }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.25rem 0.65rem", borderRadius: "9999px", backgroundColor: "rgba(14, 165, 233, 0.15)", color: "var(--accent-blue)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
                <Sparkles size={13} />
                <span>Instant Estimator</span>
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Need a Custom Project Quote?
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                Use our automated service quote builder to calculate transparent estimates across cybersecurity, AI automation, and web development.
              </p>
              <Link
                href="/quote"
                className="btn btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  width: "100%",
                  padding: "0.75rem 1rem",
                  fontSize: "0.875rem"
                }}
              >
                <MessageSquareQuote size={16} />
                <span>Launch Quote Builder</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Direct Department Directory */}
            <div className="card" style={{ padding: "2rem", borderRadius: "var(--radius-xl)" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.25rem" }}>
                Department Directory
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.875rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-color)" }}>
                  <div>
                    <strong style={{ color: "var(--text-primary)", display: "block" }}>Enterprise Solutions &amp; PenTesting</strong>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>Security audits &amp; custom AI squads</span>
                  </div>
                  <a href="mailto:solutions@eraao.com" style={{ color: "var(--accent-teal)", fontWeight: 600, fontSize: "0.8rem" }}>
                    solutions@eraao.com
                  </a>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-color)" }}>
                  <div>
                    <strong style={{ color: "var(--text-primary)", display: "block" }}>Academy &amp; Cohort Admissions</strong>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>Student &amp; corporate bootcamps</span>
                  </div>
                  <a href="mailto:training@eraao.com" style={{ color: "var(--accent-teal)", fontWeight: 600, fontSize: "0.8rem" }}>
                    training@eraao.com
                  </a>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--text-primary)", display: "block" }}>Careers &amp; Engineering Roles</strong>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>Join our security &amp; AI practice</span>
                  </div>
                  <a href="mailto:careers@eraao.com" style={{ color: "var(--accent-teal)", fontWeight: 600, fontSize: "0.8rem" }}>
                    careers@eraao.com
                  </a>
                </div>
              </div>
            </div>

            {/* Official Facebook Community Card */}
            <div className="card" style={{
              padding: "1.75rem 2rem",
              borderRadius: "var(--radius-xl)",
              border: "1px solid rgba(24, 119, 242, 0.25)",
              backgroundColor: "rgba(24, 119, 242, 0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.25rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  backgroundColor: "#1877f2",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <FacebookIcon size={22} />
                </div>
                <div>
                  <strong style={{ color: "var(--text-primary)", fontSize: "0.95rem", display: "block" }}>
                    ERAAO Academy Facebook
                  </strong>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                    Official announcements, cohort events &amp; community
                  </span>
                </div>
              </div>
              <a
                href="https://www.facebook.com/eraao.academy"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.8rem",
                  borderColor: "rgba(24, 119, 242, 0.4)",
                  color: "#1877f2",
                  backgroundColor: "var(--bg-primary)",
                  whiteSpace: "nowrap"
                }}
              >
                Visit Page
              </a>
            </div>

          </div>

        </div>

        {/* FAQ Quick Accordion Section */}
        <div style={{ maxWidth: "52rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Quick answers about our timelines, confidentiality, and delivery process.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="card"
                  style={{
                    padding: 0,
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    border: "1px solid var(--border-color)",
                    transition: "var(--transition-fast)"
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      backgroundColor: "var(--bg-primary)",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      color: "var(--text-primary)",
                      fontWeight: 700,
                      fontSize: "0.95rem"
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        color: isOpen ? "var(--accent-teal)" : "var(--text-muted)"
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: "0 1.5rem 1.25rem 1.5rem",
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      borderTop: "1px solid var(--border-color)",
                      paddingTop: "1rem"
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

