"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, Building, Sparkles } from "lucide-react";
import CustomModal from "@/components/CustomModal";
import { SERVICES_CATALOG } from "@/data/servicesData";

function QuoteForm() {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service") || "ai";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [serviceType, setServiceType] = useState(requestedService);
  const [budgetRange, setBudgetRange] = useState("৳1,00,000 - ৳5,00,000");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; title: string; message: string; type: "danger" | "info" }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  useEffect(() => {
    if (requestedService) {
      setServiceType(requestedService);
      const matched = SERVICES_CATALOG.find((s) => s.slug === requestedService || s.id === requestedService);
      if (matched && !details) {
        setDetails(`I am requesting a quotation for: ${matched.title}.\nKey requirements:\n- `);
      }
    }
  }, [requestedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/v1/contacts/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: company || null,
          service_type: serviceType,
          budget_range: budgetRange,
          details
        })
      });

      if (!response.ok) {
        throw new Error("Unable to register quote request.");
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setModalConfig({
        isOpen: true,
        type: "danger",
        title: "Submission Error",
        message: "Error submitting quote request. Please check your network and try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: "2.5rem", boxShadow: "var(--shadow-md)" }}>
      {success ? (
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <CheckCircle2 size={64} style={{ color: "var(--color-success)", margin: "0 auto 1.5rem auto" }} />
          <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>Request Submitted</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "1.5rem", lineHeight: 1.5 }}>
            Thank you, <strong>{name}</strong>. Our solution engineers will review your request details and follow up within 24 hours.
          </p>
          <button className="btn btn-outline" onClick={() => setSuccess(false)}>
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="section-badge" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
              <Sparkles size={14} /> Enterprise Services
            </span>
            <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)" }}>Request a Custom Quote</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginTop: "0.25rem" }}>
              Provide project requirements to discuss engineering frameworks, offensive audits, or media production.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* 1. Name & Email */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="Full Name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="name@company.com" />
              </div>
            </div>

            {/* 2. Company */}
            <div className="form-group">
              <label className="form-label">Company / Organization (Optional)</label>
              <div style={{ position: "relative" }}>
                <Building size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="input-field" style={{ paddingLeft: "2.25rem" }} placeholder="Organization / 017XXXXXXXX" />
              </div>
            </div>

            {/* 3. Service Category & Budget */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Service Focus</label>
                <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="input-field">
                  <optgroup label="Offensive Cybersecurity">
                    <option value="ai-penetration-testing">AI-Powered PenTesting</option>
                    <option value="web-app-pentesting">Web Application PenTesting</option>
                    <option value="mobile-app-pentesting">Mobile Application Security</option>
                    <option value="api-security-testing">API Security Testing</option>
                    <option value="network-infrastructure-pentesting">Network &amp; Infrastructure PenTesting</option>
                    <option value="red-teaming-exercises">Red Teaming Exercises</option>
                    <option value="ai-llm-security">AI &amp; LLM PenTesting</option>
                    <option value="iot-scada-pentesting">IoT / ICS / SCADA PenTesting</option>
                    <option value="vulnerability-assessment">Vulnerability Assessment</option>
                    <option value="managed-security-services">Managed Security Services (MSSP)</option>
                    <option value="pentest-as-a-service">PenTest-as-a-Service (PTaaS)</option>
                  </optgroup>
                  <optgroup label="AI & Automation">
                    <option value="ai-chatbots">AI Chatbots &amp; Conversational AI</option>
                    <option value="ai-agents-tool-use">Autonomous AI Agents with Tool Use</option>
                    <option value="workflow-automation">Workflow &amp; Business Process Automation</option>
                    <option value="marketing-sales-automation">Marketing &amp; Sales Funnel Automation</option>
                    <option value="data-pipeline-automation">Data Pipeline &amp; Sync Automation</option>
                    <option value="dashboards-reporting">Reporting &amp; Real-Time Dashboards</option>
                    <option value="applied-ai-solutions">Applied AI Solutions &amp; Custom Models</option>
                  </optgroup>
                  <optgroup label="Software & SaaS Engineering">
                    <option value="secure-websites">Secure Website Building (Next.js/React)</option>
                    <option value="custom-saas">Custom SaaS Products &amp; Startup MVPs</option>
                    <option value="custom-mobile-apps">Custom Mobile App Development</option>
                    <option value="backend-api-development">Backend &amp; High-Throughput API Dev</option>
                  </optgroup>
                  <optgroup label="Creative Media">
                    <option value="video-editing-production">Video Editing &amp; Motion Graphics</option>
                  </optgroup>
                  <option value="other">Full Engagement / Dedicated Squad</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Est. Budget Range</label>
                <select value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)} className="input-field">
                  <option value="৳1,00,000 - ৳5,00,000">৳1,00,000 - ৳5,00,000 BDT</option>
                  <option value="৳5,00,000 - ৳10,00,000">৳5,00,000 - ৳10,00,000 BDT</option>
                  <option value="৳10,00,000 - ৳25,00,000">৳10,00,000 - ৳25,00,000 BDT</option>
                  <option value="৳25,00,000+">৳25,00,000+ BDT</option>
                </select>
              </div>
            </div>

            {/* 4. Details */}
            <div className="form-group">
              <label className="form-label">Project Requirements / Scope</label>
              <textarea required placeholder="Outline key targets, deliverables, tech stack requirements..." value={details} onChange={(e) => setDetails(e.target.value)} rows={5} className="input-field" style={{ resize: "vertical" }} />
            </div>

            <button disabled={loading} type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
              <Send size={18} />
              <span>{loading ? "Submitting..." : "Submit Quote Request"}</span>
            </button>
          </div>
        </form>
      )}

      <CustomModal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}

export default function QuotePage() {
  return (
    <div style={{ padding: "var(--spacing-section) 0" }}>
      <div className="container" style={{ maxWidth: "38rem" }}>
        <Suspense fallback={<div className="card" style={{ padding: "3rem", textAlign: "center" }}>Loading quote request...</div>}>
          <QuoteForm />
        </Suspense>
      </div>
    </div>
  );
}
