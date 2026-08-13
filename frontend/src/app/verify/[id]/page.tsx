"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Download, Copy, Check, Share2, Loader, XCircle, Award } from "lucide-react";

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/></svg>
);

interface VerificationData {
  is_valid: boolean;
  holder_name?: string;
  course_title?: string;
  issued_at?: string;
  instructor_name?: string;
  instructor_title?: string;
  signature_url?: string;
}

export default function CertificateVerificationPage() {
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<VerificationData | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedIframe, setCopiedIframe] = useState(false);

  useEffect(() => {
    if (!id) return;

    const verify = async () => {
      try {
        const res = await fetch(`/api/v1/certificates/verify/${id}`);
        if (res.ok) {
          const resData = await res.json();
          setData(resData);
          if (resData.holder_name) {
            setNameInput(resData.holder_name);
          }
        } else {
          setData({ is_valid: false });
        }
      } catch (err) {
        console.error("Verification fetch error:", err);
        setData({ is_valid: false });
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [id]);

  const shortId = id ? id.replace(/-/g, "").slice(0, 12).toUpperCase() : "";
  const publicUrl = typeof window !== "undefined" ? window.location.href : `https://academy.dev/verify/${id}`;
  const iframeUrl = `https://academy.dev/verify/iframe/${id}`;

  const copyToClipboard = (text: string, type: "link" | "iframe") => {
    navigator.clipboard.writeText(text);
    if (type === "link") {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedIframe(true);
      setTimeout(() => setCopiedIframe(false), 2000);
    }
  };

  const handleRegenerate = () => {
    if (!nameInput.trim()) return;
    setIsUpdating(true);
    setTimeout(() => {
      setData(prev => prev ? { ...prev, holder_name: nameInput } : prev);
      setIsUpdating(false);
    }, 600);
  };

  const formattedDate = data?.issued_at 
    ? new Date(data.issued_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "18 Jul, 2026";

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* Sub Header */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "1.5rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Certification Tests</span>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: "0.25rem 0 0 0" }}>
            {data?.course_title || "Python (Basic)"} Certificate
          </h1>
        </div>
      </div>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <Loader className="animate-spin" style={{ color: "#16a34a", margin: "0 auto 1rem auto" }} size={36} />
            <p style={{ color: "#64748b", fontWeight: 500 }}>Fetching verified credential...</p>
          </div>
        ) : data?.is_valid ? (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2.5rem", alignItems: "start" }} className="responsive-grid-split">
              
              {/* Left Column: Premium Certificate Visual Card */}
              <div style={{
                background: "#fcfdfd",
                borderRadius: "14px",
                padding: "0",
                position: "relative",
                aspectRatio: "1.414 / 1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
                boxShadow: "0 25px 60px rgba(15,23,42,0.12), 0 0 0 1px rgba(14,165,233,0.15)",
                userSelect: "none"
              }}>
                {/* Top Brand Accent Bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", background: "linear-gradient(90deg, #0284c7 0%, #0ea5e9 30%, #38bdf8 50%, #0ea5e9 70%, #0284c7 100%)", pointerEvents: "none" }} />

                {/* Background Watermark Logo */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) scale(2.2)", opacity: 0.035, pointerEvents: "none", zIndex: 0 }}>
                  <svg width="220" height="220" viewBox="0 0 512 512" fill="none">
                    <polygon points="256,40 80,460 160,460 256,165" fill="#0ea5e9" />
                    <polygon points="256,40 432,460 352,460 256,165" fill="#0ea5e9" />
                    <polygon points="256,40 220,130 292,130" fill="#0284c7" />
                    <polygon points="118,260 270,260 262,290 126,290" fill="#38bdf8" />
                    <polygon points="104,330 254,330 246,360 112,360" fill="#38bdf8" />
                    <polygon points="88,400 236,400 230,430 95,430" fill="#38bdf8" />
                  </svg>
                </div>

                {/* Guilloché Border Frame — Layer 1 (Outer Solid) */}
                <div style={{ position: "absolute", inset: "14px", border: "2px solid #cbd5e1", borderRadius: "10px", pointerEvents: "none" }} />
                {/* Guilloché Border Frame — Layer 2 (Gold/Blue Accent Line) */}
                <div style={{ position: "absolute", inset: "19px", border: "1px solid rgba(14,165,233,0.35)", borderRadius: "8px", pointerEvents: "none" }} />
                {/* Guilloché Border Frame — Layer 3 (Inner Fine Dashed) */}
                <div style={{ position: "absolute", inset: "24px", border: "1px solid #e2e8f0", borderRadius: "6px", pointerEvents: "none" }} />

                {/* Intricate Corner Filigree Ornaments */}
                {["top-left", "top-right", "bottom-left", "bottom-right"].map(corner => {
                  const isTop = corner.includes("top");
                  const isLeft = corner.includes("left");
                  return (
                    <div key={corner} style={{
                      position: "absolute",
                      [isTop ? "top" : "bottom"]: "18px",
                      [isLeft ? "left" : "right"]: "18px",
                      width: "36px",
                      height: "36px",
                      pointerEvents: "none",
                      zIndex: 2
                    }}>
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{
                        transform: `${isTop ? "" : "scaleY(-1)"} ${isLeft ? "" : "scaleX(-1)"}`
                      }}>
                        <path d="M4 4 L4 18 Q4 8 14 6 L4 4Z" fill="url(#corner-grad)" />
                        <path d="M4 4 L18 4 Q8 4 6 14 L4 4Z" fill="url(#corner-grad)" />
                        <path d="M12 12 Q4 16 16 4 Q8 8 12 12Z" fill="rgba(14,165,233,0.2)" />
                        <circle cx="7" cy="7" r="2" fill="#0ea5e9" opacity="0.6" />
                        <defs>
                          <linearGradient id="corner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0284c7" />
                            <stop offset="100%" stopColor="#38bdf8" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  );
                })}

                {/* TOP HEADER SECTION */}
                <div style={{ zIndex: 1, textAlign: "center", paddingTop: "2rem", width: "100%" }}>
                  {/* 1. Logo on Top */}
                  <div style={{ marginBottom: "0.25rem" }}>
                    <svg width="42" height="42" viewBox="0 0 512 512" fill="none" style={{ margin: "0 auto" }}>
                      <defs>
                        <linearGradient id="hdr-g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0284c7" /><stop offset="100%" stopColor="#0ea5e9" /></linearGradient>
                        <linearGradient id="hdr-g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#0ea5e9" /></linearGradient>
                      </defs>
                      <polygon points="256,40 80,460 160,460 256,165" fill="url(#hdr-g1)" />
                      <polygon points="256,40 432,460 352,460 256,165" fill="url(#hdr-g2)" />
                      <polygon points="256,40 220,130 292,130" fill="#0284c7" />
                      <polygon points="118,260 270,260 262,290 126,290" fill="#38bdf8" />
                      <polygon points="104,330 254,330 246,360 112,360" fill="#38bdf8" />
                      <polygon points="88,400 236,400 230,430 95,430" fill="#38bdf8" />
                      <polygon points="345,290 372,245 380,260 353,305" fill="#38bdf8" />
                    </svg>
                  </div>

                  {/* 2. ERAAO Title in Middle */}
                  <div style={{ fontFamily: "var(--font-cinzel)", fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", letterSpacing: "0.22em", textTransform: "uppercase", lineHeight: 1.1, marginBottom: "0.2rem" }}>
                    ERAAO
                  </div>

                  {/* 3. Tagline Slogan at Bottom */}
                  <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "#0ea5e9", letterSpacing: "0.08em" }}>
                    Lighting the future.
                  </div>

                  {/* Ornate Header Line */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", margin: "0.6rem auto 0 auto", width: "70%" }}>
                    <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, transparent, #cbd5e1)" }} />
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9" }} />
                    <div style={{ height: "1px", flex: 1, background: "linear-gradient(-90deg, transparent, #cbd5e1)" }} />
                  </div>
                </div>

                {/* MIDDLE CONTENT SECTION */}
                <div style={{ zIndex: 1, textAlign: "center", width: "100%", padding: "0 2rem" }}>
                  
                  {/* Certificate Title */}
                  <h2 style={{
                    fontFamily: "var(--font-cinzel)",
                    fontSize: "2.1rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    margin: "0.25rem 0",
                    letterSpacing: "0.04em",
                    lineHeight: 1.2,
                    textTransform: "uppercase"
                  }}>
                    Certificate of Accomplishment
                  </h2>

                  {/* Conferred Subhead */}
                  <div style={{ fontSize: "0.62rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.25em", textTransform: "uppercase", margin: "0.4rem 0 0.2rem 0" }}>
                    THIS IS PROUDLY CONFERRED UPON
                  </div>

                  {/* Recipient Name Box */}
                  <div style={{ position: "relative", display: "inline-block", width: "75%", margin: "0.1rem auto" }}>
                    <h3 style={{
                      fontFamily: "var(--font-calligraphy)",
                      fontSize: "3.4rem",
                      fontWeight: 400,
                      background: "linear-gradient(135deg, #0f172a 0%, #0284c7 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      margin: "0",
                      lineHeight: 1.15,
                      paddingBottom: "0.1rem"
                    }}>
                      {data.holder_name}
                    </h3>

                    {/* Gradient Ribbon Underline with Center Diamond */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.2rem" }}>
                      <div style={{ height: "1.5px", flex: 1, background: "linear-gradient(90deg, transparent, #0ea5e9)" }} />
                      <div style={{ width: "8px", height: "8px", transform: "rotate(45deg)", background: "#0ea5e9" }} />
                      <div style={{ height: "1.5px", flex: 1, background: "linear-gradient(-90deg, transparent, #0ea5e9)" }} />
                    </div>
                  </div>

                  {/* Body Text */}
                  <p style={{
                    color: "#475569",
                    fontSize: "0.78rem",
                    textAlign: "center",
                    maxWidth: "520px",
                    margin: "0.65rem auto 0.75rem auto",
                    lineHeight: 1.55,
                    fontWeight: 400
                  }}>
                    for successfully demonstrating mastery and passing all formal practical assessment benchmarks for the professional skill certification in
                  </p>

                  {/* Course Title Badge Ribbon */}
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                    <div style={{
                      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                      color: "#ffffff",
                      padding: "0.45rem 2.25rem",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      boxShadow: "0 4px 12px rgba(15,23,42,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                      border: "1px solid rgba(14,165,233,0.3)"
                    }}>
                      {data.course_title || "Python (Basic)"}
                    </div>
                  </div>

                </div>

                {/* BOTTOM FOOTER SECTION (Signatures + Gold Verification Seal) */}
                <div style={{
                  zIndex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  width: "100%",
                  padding: "0 3.25rem 2rem 3.25rem"
                }}>
                  
                  {/* Left: Issue Date & Cert ID */}
                  <div style={{ textAlign: "left", fontSize: "0.72rem" }}>
                    <div style={{ color: "#64748b", marginBottom: "2px" }}>
                      <span style={{ fontWeight: 500 }}>Date of Issuance: </span>
                      <strong style={{ color: "#0f172a" }}>{formattedDate}</strong>
                    </div>
                    <div style={{
                      fontFamily: "monospace",
                      fontSize: "0.68rem",
                      color: "#0ea5e9",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      marginTop: "2px"
                    }}>
                      VERIFICATION ID: {shortId}
                    </div>
                  </div>

                  {/* Center: Gold 3D Metallic Security Seal */}
                  <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle at 35% 35%, #fef08a 0%, #d4af37 40%, #a17c18 85%, #6b4e05 100%)",
                      boxShadow: "0 6px 16px rgba(161,124,24,0.35), inset 0 2px 4px rgba(255,255,255,0.6)",
                      border: "2px solid #fef08a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative"
                    }}>
                      <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        border: "1px dashed rgba(107,78,5,0.5)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center"
                      }}>
                        <Award size={18} style={{ color: "#423002", filter: "drop-shadow(0 1px 1px rgba(255,255,255,0.4))" }} />
                        <span style={{ fontSize: "0.42rem", fontWeight: 900, color: "#362601", letterSpacing: "0.05em", textTransform: "uppercase", marginTop: "1px" }}>
                          VERIFIED
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Dynamic Instructor Signature */}
                  <div style={{ textAlign: "center" }}>
                    {data.signature_url ? (
                      <img
                        src={data.signature_url}
                        alt="Signature"
                        style={{ maxHeight: "42px", maxWidth: "160px", objectFit: "contain", marginBottom: "4px", transform: "rotate(-2deg)" }}
                      />
                    ) : (
                      <div style={{
                        fontFamily: "var(--font-calligraphy)",
                        fontSize: "2rem",
                        color: "#0f172a",
                        fontWeight: 400,
                        lineHeight: 1,
                        marginBottom: "4px",
                        transform: "rotate(-2deg)"
                      }}>
                        {data.instructor_name || "Harishankaran K"}
                      </div>
                    )}
                    <div style={{ height: "1px", width: "130px", background: "linear-gradient(90deg, transparent, #0ea5e9, transparent)", margin: "0 auto 4px auto" }} />
                    <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "0.72rem" }}>{data.instructor_name || "Harishankaran K"}</div>
                    <div style={{ color: "#64748b", fontSize: "0.62rem", fontWeight: 500 }}>{data.instructor_title || "Chief Technology Officer, ERAAO"}</div>
                  </div>

                </div>

              </div>

              {/* Right Column: Actions Sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                
                {/* 1. Name Editor Box */}
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.25rem", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", display: "block", marginBottom: "0.25rem" }}>Full Name</label>
                  <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "0 0 0.75rem 0", lineHeight: 1.3 }}>This one-time update changes how your name appears on the certificate.</p>
                  
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.85rem",
                      marginBottom: "0.75rem",
                      outline: "none"
                    }}
                  />

                  <button
                    onClick={handleRegenerate}
                    disabled={isUpdating}
                    style={{
                      background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
                      color: "#ffffff",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      width: "100%",
                      transition: "all 0.2s",
                      boxShadow: "0 2px 8px rgba(14,165,233,0.25)"
                    }}
                  >
                    {isUpdating ? "Regenerating..." : "Regenerate Certificate"}
                  </button>
                </div>

                {/* 2. Share Links & Download */}
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.25rem", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", margin: "0 0 0.85rem 0" }}>Share this Certificate</h4>
                  
                  {/* Social Buttons */}
                  <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicUrl)}`} target="_blank" rel="noreferrer" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#1877f2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FacebookIcon />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(publicUrl)}`} target="_blank" rel="noreferrer" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#1da1f2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <TwitterIcon />
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicUrl)}`} target="_blank" rel="noreferrer" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#0a66c2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <LinkedinIcon />
                    </a>
                  </div>

                  {/* Public Link Input */}
                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        readOnly
                        value={publicUrl}
                        style={{ width: "100%", padding: "0.45rem 2.25rem 0.45rem 0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.75rem", background: "#f8fafc", color: "#475569" }}
                      />
                      <button
                        onClick={() => copyToClipboard(publicUrl, "link")}
                        style={{ position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
                      >
                        {copiedLink ? <Check size={14} style={{ color: "#16a34a" }} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Iframe Link Input */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Iframe Link</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        readOnly
                        value={iframeUrl}
                        style={{ width: "100%", padding: "0.45rem 2.25rem 0.45rem 0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.75rem", background: "#f8fafc", color: "#475569" }}
                      />
                      <button
                        onClick={() => copyToClipboard(iframeUrl, "iframe")}
                        style={{ position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
                      >
                        {copiedIframe ? <Check size={14} style={{ color: "#16a34a" }} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* LinkedIn Add to Profile & Download PDF */}
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <a
                      href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(data.course_title || "Certificate")}&organizationName=Academy&issueYear=2026&issueMonth=7&certUrl=${encodeURIComponent(publicUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        flex: 1,
                        background: "#0a66c2",
                        color: "#ffffff",
                        padding: "0.5rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px"
                      }}
                    >
                      <LinkedinIcon /> Add to profile
                    </a>

                    <a
                      href={`/api/v1/certificates/fallback/${id}.pdf`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        flex: 1,
                        background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
                        color: "#ffffff",
                        padding: "0.5rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px"
                      }}
                    >
                      Download <Download size={14} />
                    </a>
                  </div>
                </div>

                {/* 3. Skill Summary */}
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.25rem" }}>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", margin: "0 0 0.5rem 0" }}>{data.course_title || "Python (Basic)"}</h4>
                  <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0, lineHeight: 1.4 }}>
                    It covers topics like Scalar Types, Operators and Control Flow, Strings, Collections and Iteration, Modularity, Objects and Types and Classes.
                  </p>
                </div>

              </div>

            </div>

            {/* Bottom Section: User's Other Certificates */}
            <div style={{ marginTop: "3rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "1rem" }}>
                {data.holder_name}'s Academy Certificates
              </h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
                
                <div style={{ background: "#15803d", borderRadius: "8px", padding: "1.25rem", color: "#ffffff", position: "relative", overflow: "hidden" }}>
                  <Award size={24} style={{ marginBottom: "0.75rem" }} />
                  <div style={{ fontWeight: 800, fontSize: "0.85rem" }}>{data.course_title || "Python (Basic)"}</div>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, background: "rgba(255,255,255,0.2)", padding: "2px 6px", borderRadius: "4px", marginTop: "4px", display: "inline-block" }}>Verified</span>
                </div>

                <div style={{ background: "#1e3a8a", borderRadius: "8px", padding: "1.25rem", color: "#ffffff", position: "relative", overflow: "hidden" }}>
                  <Award size={24} style={{ marginBottom: "0.75rem" }} />
                  <div style={{ fontWeight: 800, fontSize: "0.85rem" }}>Software Engineer</div>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, background: "rgba(255,255,255,0.2)", padding: "2px 6px", borderRadius: "4px", marginTop: "4px", display: "inline-block" }}>Verified</span>
                </div>

              </div>
            </div>

          </div>
        ) : (
          <div style={{ maxWidth: "480px", margin: "3rem auto", background: "#ffffff", borderRadius: "8px", padding: "2.5rem", textAlign: "center", border: "1px solid #e2e8f0" }}>
            <XCircle size={48} style={{ color: "#ef4444", margin: "0 auto 1rem auto" }} />
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>Invalid Certificate</h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>The verification ID provided is invalid or expired.</p>
            <Link href="/" style={{ background: "#0f172a", color: "#ffffff", padding: "0.5rem 1.25rem", borderRadius: "6px", textDecoration: "none", fontSize: "0.85rem", fontWeight: 700 }}>
              Back to Home
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ background: "#ffffff", borderTop: "1px solid #e2e8f0", padding: "1.5rem 0", marginTop: "4rem", textAlign: "center", fontSize: "0.75rem", color: "#64748b" }}>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <span>Blog</span> | <span>Scoring</span> | <span>Environment</span> | <span>FAQ</span> | <span>About Us</span> | <span>Helpdesk</span> | <span>Careers</span> | <span>Terms Of Service</span> | <span>Privacy Policy</span>
        </div>
      </footer>
    </div>
  );
}
