"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  User, AlertCircle, Save, Trash2, Phone, Building,
  Award, Target, CheckCircle2, Camera
} from "lucide-react";

export default function ProfileSettingsPage() {
  const { user, token, login } = useAuth();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [signatureUrl, setSignatureUrl] = useState("");
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [primaryGoal, setPrimaryGoal] = useState("career_switch");
  const [organization, setOrganization] = useState("");

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
        <div style={{ fontSize: "var(--text-xs)", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
          Account &amp; Learning Preferences
        </div>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
          Student Profile Settings
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginTop: "0.25rem" }}>
          Manage your personal details, contact preferences, technical skill goals, and graduation signatures.
        </p>
      </div>

      {/* User Overview Banner */}
      <div className="card" style={{
        padding: "1.75rem 2rem",
        marginBottom: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1.5rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent-blue), var(--color-success))",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "var(--text-xl)",
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
              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)" }}>
                {fullName || "Student User"}
              </h2>
              {user?.is_verified && (
                <span className="badge badge-green">
                  <CheckCircle2 size={12} /> Verified Student
                </span>
              )}
            </div>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
              {user?.email}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <span className="badge badge-blue">
            Role: {user?.roles?.join(", ") || "Student"}
          </span>
        </div>
      </div>

      {/* Alert Messages */}
      {message && (
        <div style={{ padding: "1rem 1.25rem", background: "var(--color-success-bg)", border: "1px solid var(--color-success)", borderRadius: "var(--radius-md)", color: "var(--color-success)", display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "var(--text-sm)", marginBottom: "1.75rem", fontWeight: 600 }}>
          <CheckCircle2 size={18} />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div style={{ padding: "1rem 1.25rem", background: "var(--color-error-bg)", border: "1px solid var(--color-error)", borderRadius: "var(--radius-md)", color: "var(--color-error)", display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "var(--text-sm)", marginBottom: "1.75rem", fontWeight: 600 }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

        {/* Section 1: Personal & Contact Information */}
        <div className="card" style={{ padding: "2rem" }}>
          <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <User size={18} style={{ color: "var(--accent-blue)" }} /> Personal &amp; Contact Details
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            <div className="form-group">
              <label className="form-label">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Phone / WhatsApp Number
              </label>
              <div style={{ position: "relative" }}>
                <Phone size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="tel"
                  placeholder="+880 1700-000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </div>

            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="form-label">
                Avatar Image URL
              </label>
              <div style={{ position: "relative" }}>
                <Camera size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Technical Skill Level & Primary Goal */}
        <div className="card" style={{ padding: "2rem" }}>
          <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Target size={18} style={{ color: "var(--accent-blue)" }} /> Academic &amp; Career Goals
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label className="form-label" style={{ marginBottom: "0.5rem" }}>
                Technical Experience Level
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
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
                      background: skillLevel === lvl.id ? "var(--accent-blue-bg)" : "var(--bg-primary)",
                      color: skillLevel === lvl.id ? "var(--accent-blue)" : "var(--text-primary)",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "var(--transition-fast)"
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: "var(--text-sm)" }}>{lvl.label}</div>
                    <div style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "2px" }}>{lvl.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label" style={{ marginBottom: "0.5rem" }}>
                Primary Learning Goal
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
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

            <div className="form-group">
              <label className="form-label">
                University or Organization Name (Optional)
              </label>
              <div style={{ position: "relative" }}>
                <Building size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="text"
                  placeholder="e.g. Dhaka University / Tech Solutions Inc"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Graduation & Certificate Signature Canvas */}
        <div className="card" style={{ padding: "2rem" }}>
          <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Award size={18} style={{ color: "var(--color-warning)" }} /> Official Certificate Signature
          </h3>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Draw or upload your digital signature. This signature is embedded on your official ERAAO course completion credentials.
          </p>

          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {/* Draw Signature Canvas */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-primary)" }}>Draw Signature Pad</div>
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
                  className="btn btn-outline"
                  style={{ fontSize: "var(--text-xs)", padding: "0.45rem 0.85rem" }}
                >
                  <Trash2 size={14} /> Clear Pad
                </button>
                <button
                  type="button"
                  onClick={saveCanvasSignature}
                  className="btn btn-primary"
                  style={{ fontSize: "var(--text-xs)", padding: "0.45rem 0.85rem" }}
                >
                  Capture Drawing
                </button>
              </div>
            </div>

            {/* Signature Preview */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1, minWidth: "15rem" }}>
              <div style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-primary)" }}>Active Signature Preview</div>
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
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>No signature captured yet</span>
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
            className="btn btn-accent"
            style={{
              padding: "0.85rem 2rem",
              fontSize: "var(--text-sm)"
            }}
          >
            <Save size={18} /> {saving ? "Saving Changes..." : "Save Profile Settings"}
          </button>
        </div>

      </form>
    </div>
  );
}
