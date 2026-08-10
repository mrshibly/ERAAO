"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  User, Shield, Check, AlertCircle, Save, Trash2, Phone, Building,
  Award, Target, Sparkles, CheckCircle2, Lock, Bell, Mail, Camera
} from "lucide-react";

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { user, token, login } = useAuth();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [signatureUrl, setSignatureUrl] = useState("");
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [primaryGoal, setPrimaryGoal] = useState("career_switch");
  const [organization, setOrganization] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
      setPhone(user.phone || "");
      setAvatarUrl(user.avatar_url || "");
      setSignatureUrl(user.signature_url || "");
      setSkillLevel(user.skill_level || "beginner");
      setPrimaryGoal(user.primary_goal || "career_switch");
      setOrganization(user.organization || "");
    }
  }, [user]);

  // Canvas signature functions
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0f172a";

    const coords = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvasSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const blank = document.createElement("canvas");
    blank.width = canvas.width;
    blank.height = canvas.height;
    if (canvas.toDataURL() === blank.toDataURL()) {
      setMessage("Please draw your signature on the canvas pad first.");
      return;
    }

    const dataUrl = canvas.toDataURL("image/png");
    setSignatureUrl(dataUrl);
    setMessage("Signature captured! Click 'Save Profile Settings' to persist changes.");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/v1/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          full_name: fullName,
          phone: phone.trim() || null,
          avatar_url: avatarUrl.trim() || null,
          signature_url: signatureUrl.trim() || null,
          skill_level: skillLevel,
          primary_goal: primaryGoal,
          organization: organization.trim() || null,
          onboarding_completed: true
        })
      });

      if (res.ok) {
        const updatedProfile = await res.json();
        if (token) login(token, updatedProfile);
        setMessage("Profile and learning goals updated successfully!");
      } else {
        const body = await res.json().catch(() => ({}));
        setError(body.detail || "Failed to update profile.");
      }
    } catch {
      setError("Network error updating profile.");
    } finally {
      setSaving(false);
    }
  };

  const getInitials = () => {
    if (!fullName) return "U";
    return fullName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  };

  return (
    <div style={{ paddingBottom: "3rem", maxWidth: "56rem", margin: "0 auto", width: "100%" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.75rem", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
          Account & Learning Preferences
        </div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
          Student Profile Settings
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
          Manage your personal details, contact preferences, technical skill goals, and graduation signatures.
        </p>
      </div>

      {/* User Overview Banner */}
      <div style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-lg)",
        padding: "1.75rem 2rem",
        marginBottom: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1.5rem",
        boxShadow: "var(--shadow-sm)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0ea5e9, #10b981)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: 800,
            flexShrink: 0,
            overflow: "hidden"
          }}>
            {avatarUrl ? (
              <img src={avatarUrl} alt={fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              getInitials()
            )}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>
                {fullName || "Student User"}
              </h2>
              {user?.is_verified && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", fontSize: "0.72rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: "12px" }}>
                  <CheckCircle2 size={12} /> Verified Student
                </span>
              )}
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
              {user?.email}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "0.4rem 0.85rem", borderRadius: "8px" }}>
            Role: {user?.roles?.join(", ") || "Student"}
          </span>
        </div>
      </div>

      {/* Alert Messages */}
      {message && (
        <div style={{ padding: "1rem 1.25rem", background: "rgba(16, 185, 129, 0.08)", border: "1px solid #10b981", borderRadius: "12px", color: "#10b981", display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", marginBottom: "1.75rem", fontWeight: 600 }}>
          <CheckCircle2 size={18} />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div style={{ padding: "1rem 1.25rem", background: "rgba(239, 68, 68, 0.08)", border: "1px solid #ef4444", borderRadius: "12px", color: "#ef4444", display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", marginBottom: "1.75rem", fontWeight: 600 }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

        {/* Section 1: Personal & Contact Information */}
        <div style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          boxShadow: "var(--shadow-sm)"
        }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <User size={18} style={{ color: "var(--accent-blue)" }} /> Personal & Contact Details
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: "0.4rem" }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem",
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: "0.4rem" }}>
                Phone / WhatsApp Number
              </label>
              <div style={{ position: "relative" }}>
                <Phone size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="tel"
                  placeholder="+880 1700-000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem 0.75rem 2.5rem",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: "0.4rem" }}>
                Avatar Image URL
              </label>
              <div style={{ position: "relative" }}>
                <Camera size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem 0.75rem 2.5rem",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Technical Skill Level & Primary Goal */}
        <div style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          boxShadow: "var(--shadow-sm)"
        }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Target size={18} style={{ color: "var(--accent-blue)" }} /> Academic & Career Goals
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: "0.5rem" }}>
                Technical Experience Level
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                {[
                  { id: "beginner", label: "Beginner", desc: "Starting cyber/AI journey" },
                  { id: "intermediate", label: "Intermediate", desc: "Some coding & IT labs" },
                  { id: "advanced", label: "Advanced", desc: "Experienced practitioner" }
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSkillLevel(lvl.id)}
                    style={{
                      padding: "0.85rem",
                      borderRadius: "var(--radius-md)",
                      border: skillLevel === lvl.id ? "2px solid var(--accent-blue)" : "1px solid var(--border-color)",
                      background: skillLevel === lvl.id ? "rgba(14, 165, 233, 0.08)" : "var(--bg-primary)",
                      color: skillLevel === lvl.id ? "var(--accent-blue)" : "var(--text-primary)",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: "0.875rem" }}>{lvl.label}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "2px" }}>{lvl.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: "0.5rem" }}>
                Primary Learning Goal
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[
                  { id: "career_switch", label: "Career Switch into Cyber / AI" },
                  { id: "skill_upgrade", label: "Upgrade Skills for Current Role" },
                  { id: "certification", label: "Industry Certifications" },
                  { id: "university", label: "University Project & Studies" }
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setPrimaryGoal(g.id)}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-md)",
                      border: primaryGoal === g.id ? "2px solid var(--accent-blue)" : "1px solid var(--border-color)",
                      background: primaryGoal === g.id ? "rgba(14, 165, 233, 0.08)" : "var(--bg-primary)",
                      color: primaryGoal === g.id ? "var(--accent-blue)" : "var(--text-primary)",
                      cursor: "pointer",
                      textAlign: "left",
                      fontWeight: 700,
                      fontSize: "0.85rem",
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

            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: "0.4rem" }}>
                University or Organization Name (Optional)
              </label>
              <div style={{ position: "relative" }}>
                <Building size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="text"
                  placeholder="e.g. Dhaka University / Tech Solutions Inc"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem 0.75rem 2.5rem",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Graduation & Certificate Signature Canvas */}
        <div style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          boxShadow: "var(--shadow-sm)"
        }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Award size={18} style={{ color: "#f59e0b" }} /> Official Certificate Signature
          </h3>
          <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Draw or upload your digital signature. This signature is embedded on your official ERAAO course completion credentials.
          </p>

          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {/* Draw Signature Canvas */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>Draw Signature Pad</div>
              <canvas
                ref={canvasRef}
                width={360}
                height={150}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                onTouchCancel={stopDrawing}
                style={{
                  border: "2px dashed var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-primary)",
                  cursor: "crosshair",
                  touchAction: "none",
                  maxWidth: "100%"
                }}
              />
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={clearCanvas}
                  style={{
                    padding: "0.45rem 0.85rem",
                    fontSize: "0.8rem",
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    color: "var(--text-secondary)",
                    fontWeight: 600
                  }}
                >
                  <Trash2 size={14} /> Clear Pad
                </button>
                <button
                  type="button"
                  onClick={saveCanvasSignature}
                  style={{
                    padding: "0.45rem 0.85rem",
                    fontSize: "0.8rem",
                    background: "var(--accent-blue)",
                    border: "none",
                    color: "white",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: 700
                  }}
                >
                  Capture Drawing
                </button>
              </div>
            </div>

            {/* Signature Preview */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1, minWidth: "15rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>Active Signature Preview</div>
              <div style={{
                width: "100%",
                height: "150px",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg-primary)",
                overflow: "hidden"
              }}>
                {signatureUrl ? (
                  <img src={signatureUrl} alt="Active Signature" style={{ maxHeight: "110px", maxWidth: "90%", objectFit: "contain" }} />
                ) : (
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>No signature captured yet</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Save Button Bar */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
              color: "white",
              border: "none",
              padding: "0.85rem 2rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.95rem",
              fontWeight: 800,
              cursor: saving ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 8px 20px rgba(14, 165, 233, 0.3)"
            }}
          >
            <Save size={18} /> {saving ? "Saving Changes..." : "Save Profile Settings"}
          </button>
        </div>

      </form>
    </div>
  );
}
