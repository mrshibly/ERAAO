"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, Phone, Award, Building, ArrowRight, CheckCircle2, X, Target } from "lucide-react";
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
      <div style={{
        width: "100%",
        maxWidth: "480px",
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        boxShadow: "0 25px 60px -15px rgba(15, 23, 42, 0.3)",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        position: "relative"
      }} className="anim-fade-up">

        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          padding: "1.75rem 2rem",
          position: "relative"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Logo size={28} withText={true} textColor="#ffffff" />
            <button
              onClick={() => handleSave(false)}
              title="Skip for now"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
                padding: "0.35rem 0.75rem",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: 600
              }}
            >
              Skip for now
            </button>
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em" }}>
              Welcome! Let's set up your profile
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginTop: "0.25rem" }}>
              Step {step} of 2 — Personalize your learning experience
            </p>
          </div>

          {/* Progress Bar */}
          <div style={{
            height: "4px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "2px",
            marginTop: "1.25rem",
            overflow: "hidden"
          }}>
            <div style={{
              height: "100%",
              width: step === 1 ? "50%" : "100%",
              background: "linear-gradient(90deg, #0ea5e9, #10b981)",
              transition: "width 0.3s ease"
            }} />
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "2rem" }}>
          {step === 1 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "0.4rem" }}>
                  Phone / WhatsApp Number
                </label>
                <p style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "0.5rem" }}>
                  Used for batch start date announcements and lab access alerts.
                </p>
                <div style={{ position: "relative" }}>
                  <Phone size={18} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                  <input
                    type="tel"
                    placeholder="+880 1700-000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      background: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      borderRadius: "12px",
                      padding: "0.75rem 1rem 0.75rem 2.5rem",
                      fontSize: "0.9rem",
                      color: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "0.5rem" }}>
                  Current Technical Experience Level
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                  {[
                    { id: "beginner", label: "Beginner", desc: "New to tech" },
                    { id: "intermediate", label: "Intermediate", desc: "Some coding/IT" },
                    { id: "advanced", label: "Advanced", desc: "Pro engineer" }
                  ].map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setSkillLevel(level.id)}
                      style={{
                        padding: "0.75rem 0.5rem",
                        borderRadius: "12px",
                        border: skillLevel === level.id ? "2px solid #0ea5e9" : "1px solid #cbd5e1",
                        background: skillLevel === level.id ? "rgba(14, 165, 233, 0.08)" : "#f8fafc",
                        color: skillLevel === level.id ? "#0ea5e9" : "#334155",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: "0.85rem" }}>{level.label}</div>
                      <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "2px" }}>{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "12px",
                  background: "#0ea5e9",
                  color: "white",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  marginTop: "0.5rem"
                }}
              >
                <span>Continue to Step 2</span>
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "0.5rem" }}>
                  Primary Learning Goal
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {[
                    { id: "career_switch", label: "Career Change into Cyber / AI" },
                    { id: "skill_upgrade", label: "Upgrade Skills for Current Job" },
                    { id: "certification", label: "Earn Industry Certifications" },
                    { id: "university", label: "University Project & Studies" }
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setPrimaryGoal(goal.id)}
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "12px",
                        border: primaryGoal === goal.id ? "2px solid #0ea5e9" : "1px solid #cbd5e1",
                        background: primaryGoal === goal.id ? "rgba(14, 165, 233, 0.08)" : "#f8fafc",
                        color: primaryGoal === goal.id ? "#0ea5e9" : "#334155",
                        cursor: "pointer",
                        textAlign: "left",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <span>{goal.label}</span>
                      {primaryGoal === goal.id && <CheckCircle2 size={16} style={{ color: "#0ea5e9" }} />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "0.4rem" }}>
                  University or Company Name (Optional)
                </label>
                <div style={{ position: "relative" }}>
                  <Building size={18} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                  <input
                    type="text"
                    placeholder="e.g. Dhaka University / Tech Corp"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    style={{
                      width: "100%",
                      background: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      borderRadius: "12px",
                      padding: "0.75rem 1rem 0.75rem 2.5rem",
                      fontSize: "0.9rem",
                      color: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    padding: "0.85rem 1.25rem",
                    borderRadius: "12px",
                    background: "#f1f5f9",
                    color: "#475569",
                    border: "1px solid #cbd5e1",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer"
                  }}
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSave(true)}
                  style={{
                    flex: 1,
                    padding: "0.85rem",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "white",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: "0 10px 20px rgba(16, 185, 129, 0.3)"
                  }}
                >
                  <CheckCircle2 size={18} />
                  <span>{loading ? "Saving Profile..." : "Complete Setup"}</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
