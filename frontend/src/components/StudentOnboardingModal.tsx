"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Phone, Building, ArrowRight, CheckCircle2, Target } from "lucide-react";
import Logo from "@/components/Logo";

interface StudentOnboardingModalProps {
  onComplete: () => void;
}

export default function StudentOnboardingModal({ onComplete }: StudentOnboardingModalProps) {
  const { token, login, user } = useAuth();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState(user?.phone || "");
  const [skillLevel, setSkillLevel] = useState(user?.skill_level || "beginner");
  const [primaryGoal, setPrimaryGoal] = useState(user?.primary_goal || "career_switch");
  const [organization, setOrganization] = useState(user?.organization || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async (markComplete: boolean = true) => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          phone: phone.trim() || null,
          skill_level: skillLevel,
          primary_goal: primaryGoal,
          organization: organization.trim() || null,
          onboarding_completed: markComplete
        })
      });

      if (res.ok) {
        const updatedProfile = await res.json();
        if (token) {
          login(token, updatedProfile);
        }
      }
    } catch (err) {
      console.error("Onboarding error:", err);
    } finally {
      setLoading(false);
      onComplete();
    }
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(15, 23, 42, 0.75)",
      backdropFilter: "blur(8px)",
      zIndex: 99999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1.5rem"
    }}>
      <div className="card" style={{
        width: "100%",
        maxWidth: "480px",
        boxShadow: "var(--shadow-xl)",
        overflow: "hidden",
        position: "relative",
        padding: 0
      }}>

        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, var(--bg-dark) 0%, #1e293b 100%)",
          color: "#ffffff",
          padding: "1.75rem 2rem",
          position: "relative"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Logo size={28} withText={true} textColor="#ffffff" />
            <button
              onClick={() => handleSave(true)}
              title="Skip for now"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--text-xs)",
                fontWeight: 600
              }}
            >
              Skip for now
            </button>
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <span className="badge" style={{ background: "rgba(255, 255, 255, 0.15)", color: "white", marginBottom: "0.4rem" }}>
              Step {step} of 2
            </span>
            <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "#ffffff" }}>
              {step === 1 ? "Personalize Your Learning Path" : "Experience Level & Goal"}
            </h2>
            <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "var(--text-xs)", marginTop: "0.25rem" }}>
              {step === 1
                ? "Help our instructors adapt hands-on virtual labs to your career focus."
                : "Let us match you with tailored syllabus modules and exercises."}
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div style={{ padding: "2rem" }}>
          {step === 1 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className="form-group">
                <label className="form-label">
                  WhatsApp / Contact Number
                </label>
                <div style={{ position: "relative" }}>
                  <Phone size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="tel"
                    placeholder="+880 1517-825859"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: "2.5rem" }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  University / Organization (Optional)
                </label>
                <div style={{ position: "relative" }}>
                  <Building size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    placeholder="e.g. Dhaka University / Tech Corp"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: "2.5rem" }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  marginTop: "0.5rem"
                }}
              >
                <span>Continue to Goals</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label className="form-label" style={{ marginBottom: "0.5rem" }}>
                  Technical Background
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                  {[
                    { id: "beginner", label: "Beginner", desc: "Starting out" },
                    { id: "intermediate", label: "Intermediate", desc: "Some coding" },
                    { id: "advanced", label: "Advanced", desc: "Practitioner" }
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setSkillLevel(lvl.id)}
                      style={{
                        padding: "0.65rem 0.5rem",
                        borderRadius: "var(--radius-md)",
                        border: skillLevel === lvl.id ? "2px solid var(--accent-blue)" : "1px solid var(--border-color)",
                        background: skillLevel === lvl.id ? "var(--accent-blue-bg)" : "var(--bg-primary)",
                        color: skillLevel === lvl.id ? "var(--accent-blue)" : "var(--text-primary)",
                        cursor: "pointer",
                        textAlign: "center"
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: "var(--text-xs)" }}>{lvl.label}</div>
                      <div style={{ fontSize: "10px", color: "var(--text-secondary)", marginTop: "2px" }}>{lvl.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label" style={{ marginBottom: "0.5rem" }}>
                  Primary Objective
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[
                    { id: "career_switch", label: "Career Switch into Cyber / AI" },
                    { id: "skill_upgrade", label: "Upgrade Skills for Current Role" },
                    { id: "certification", label: "Achieve Industry Certifications" }
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setPrimaryGoal(g.id)}
                      style={{
                        padding: "0.65rem 0.85rem",
                        borderRadius: "var(--radius-md)",
                        border: primaryGoal === g.id ? "2px solid var(--accent-blue)" : "1px solid var(--border-color)",
                        background: primaryGoal === g.id ? "var(--accent-blue-bg)" : "var(--bg-primary)",
                        color: primaryGoal === g.id ? "var(--accent-blue)" : "var(--text-primary)",
                        cursor: "pointer",
                        textAlign: "left",
                        fontWeight: 700,
                        fontSize: "var(--text-xs)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <span>{g.label}</span>
                      {primaryGoal === g.id && <CheckCircle2 size={16} style={{ color: "var(--accent-blue)" }} />}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-outline"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSave(true)}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <span>{loading ? "Configuring..." : "Launch Learning Dashboard"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
