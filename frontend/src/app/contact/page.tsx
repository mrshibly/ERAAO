"use client";

import { useState } from "react";
import { Send, CheckCircle2, Building, Mail, Phone, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (!response.ok) {
        throw new Error("Unable to submit contact message. Please try again later.");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "var(--spacing-section) 0" }}>
      <div className="container" style={{ maxWidth: "56rem" }}>
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge" style={{ background: "rgba(13, 148, 136, 0.08)", color: "var(--accent-teal)" }}>
            Get In Touch
          </span>
          <h1 className="section-title">Contact Our Office</h1>
          <p className="section-subtitle">
            Reach out to our solution engineers, security consultants, or support desk.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>
          {/* Left Column — Form */}
          <div className="card" style={{ padding: "2.5rem", boxShadow: "var(--shadow-sm)" }}>
            {success ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <CheckCircle2 size={56} style={{ color: "var(--color-success)", margin: "0 auto 1.5rem auto" }} />
                <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>Message Transmitted</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "1.5rem", lineHeight: 1.5 }}>
                  Thank you for reaching out. A representative from our security or AI operations team will contact you shortly.
                </p>
                <button className="btn btn-outline" onClick={() => setSuccess(false)}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {error && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--color-error-bg)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "var(--color-error)", padding: "0.75rem", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)" }}>
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject *</label>
                  <input required type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-field" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message Body *</label>
                  <textarea required value={message} rows={5} onChange={(e) => setMessage(e.target.value)} className="input-field" style={{ resize: "vertical" }} />
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                  <Send size={16} />
                  <span>{loading ? "Transmitting..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column — Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", justifyContent: "center" }}>
            <div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
                <Building size={20} style={{ color: "var(--accent-teal)" }} />
                Corporate HQ
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>
                ERAAO Headquarters<br />
                Dhaka, Bangladesh
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
                <Mail size={20} style={{ color: "var(--accent-blue)" }} />
                Direct Channels
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                <li>General: <strong style={{ color: "var(--text-primary)" }}>info@eraao.com</strong></li>
                <li>Support Desk: <strong style={{ color: "var(--text-primary)" }}>support@eraao.com</strong></li>
                <li>Corporate L&amp;D: <strong style={{ color: "var(--text-primary)" }}>training@eraao.com</strong></li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
                <Phone size={20} style={{ color: "var(--accent-violet)" }} />
                Phone Support
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>
                +880 1700-000000<br />
                Sun – Thu, 9:00 AM – 6:00 PM BST
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
