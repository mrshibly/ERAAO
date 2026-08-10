"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLoginCallback = async (response: any) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: response.credential }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || "Google sign in failed.");
      }

      const data = await res.json();
      
      const meResponse = await fetch("/api/v1/users/me", {
        headers: { "Authorization": `Bearer ${data.access_token}` },
      });

      if (!meResponse.ok) {
        throw new Error("Failed to retrieve user profile.");
      }

      const profile = await meResponse.json();
      login(data.access_token, profile);

      if (profile.roles.includes("admin")) {
        router.push("/dashboard/admin");
      } else if (profile.roles.includes("instructor")) {
        router.push("/dashboard/instructor");
      } else if (profile.roles.includes("corporate_client")) {
        router.push("/dashboard/client");
      } else {
        router.push("/dashboard/student");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if ((window as any).google) {
        (window as any).google.accounts.id.initialize({
          client_id: "1077790098218-or3jf6egdbmin5u10o6v0m1vnqsi6n9o.apps.googleusercontent.com",
          callback: handleGoogleLoginCallback,
        });
        (window as any).google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          { theme: "outline", size: "large", width: 340 }
        );
      }
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.detail || "Invalid email or password. Please try again.");
      }

      const data = await response.json();
      
      const meResponse = await fetch("/api/v1/users/me", {
        headers: { "Authorization": `Bearer ${data.access_token}` },
      });

      if (!meResponse.ok) {
        throw new Error("Failed to retrieve user profile.");
      }

      const profile = await meResponse.json();
      login(data.access_token, profile);

      if (profile.roles.includes("admin")) {
        router.push("/dashboard/admin");
      } else if (profile.roles.includes("instructor")) {
        router.push("/dashboard/instructor");
      } else if (profile.roles.includes("corporate_client")) {
        router.push("/dashboard/client");
      } else {
        router.push("/dashboard/student");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "85vh",
      display: "flex",
      width: "100%",
      backgroundColor: "#ffffff"
    }} className="responsive-flex-column">
      
      {/* Left Column — Simple, Clean Form */}
      <div style={{
        flex: "1 1 50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem 2rem",
        backgroundColor: "#ffffff"
      }}>
        <div style={{ width: "100%", maxWidth: "24rem" }}>
          
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem"
            }}>
              Sign In
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
              Enter your email and password to access your ERAAO account.
            </p>
          </div>

          {error && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              padding: "0.8rem 1rem",
              borderRadius: "10px",
              fontSize: "0.875rem",
              marginBottom: "1.5rem"
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Google Sign-in */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.5rem" }}>
            <div id="google-signin-btn" style={{ width: "100%", display: "flex", justifyContent: "center" }}></div>
            
            <div style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              margin: "1.25rem 0 0.5rem 0",
              color: "#94a3b8",
              fontSize: "0.75rem",
              fontWeight: 600
            }}>
              <hr style={{ flex: 1, border: "0", borderTop: "1px solid #e2e8f0" }} />
              <span style={{ padding: "0 0.75rem" }}>or sign in with email</span>
              <hr style={{ flex: 1, border: "0", borderTop: "1px solid #e2e8f0" }} />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#334155",
                display: "block",
                marginBottom: "0.4rem"
              }}>
                Email address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  required
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "10px",
                    padding: "0.75rem 1rem 0.75rem 2.5rem",
                    fontSize: "0.925rem",
                    color: "#0f172a",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <label style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#334155"
                }}>
                  Password
                </label>
                <Link href="/forgot-password" style={{ fontSize: "0.825rem", color: "#0ea5e9", fontWeight: 600, textDecoration: "none" }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  required
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "10px",
                    padding: "0.75rem 1rem 0.75rem 2.5rem",
                    fontSize: "0.925rem",
                    color: "#0f172a",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              style={{
                background: "#0ea5e9",
                color: "#ffffff",
                padding: "0.8rem",
                borderRadius: "10px",
                fontSize: "0.95rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: "0.5rem",
                transition: "background 0.2s ease"
              }}
            >
              <LogIn size={18} />
              <span>{loading ? "Signing in..." : "Sign In"}</span>
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.9rem", color: "#64748b" }}>
            Don't have an account? <Link href="/register" style={{ color: "#0ea5e9", fontWeight: 700, textDecoration: "none" }}>Create one here</Link>
          </p>

        </div>
      </div>

      {/* Right Column — Simple High-Quality Tech Image Card */}
      <div className="login-graphic" style={{
        flex: "1 1 50%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      }}>
        <div style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: "480px",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)"
        }}>
          <img
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80"
            alt="Cybersecurity and technology"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.8) 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "3rem"
          }}>
            <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.75rem", lineHeight: 1.3 }}>
              Build Skills. Protect Assets.
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: "1rem", lineHeight: 1.6, maxWidth: "28rem" }}>
              Access your training courses, cloud labs, and security tools all in one simple dashboard.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
