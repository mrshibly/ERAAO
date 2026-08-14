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
      backgroundColor: "var(--bg-primary)"
    }} className="responsive-flex-column">
      
      {/* Left Column — Simple, Clean Form */}
      <div style={{
        flex: "1 1 50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem 2rem",
        backgroundColor: "var(--bg-primary)"
      }}>
        <div style={{ width: "100%", maxWidth: "24rem" }}>
          
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{
              fontSize: "var(--text-3xl)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem"
            }}>
              Sign In
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
              Enter your email and password to access your ERAAO account.
            </p>
          </div>

          {error && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "var(--color-error-bg)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "var(--color-error)",
              padding: "0.8rem 1rem",
              borderRadius: "var(--radius-md)",
              fontSize: "var(--text-sm)",
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
              color: "var(--text-muted)",
              fontSize: "var(--text-xs)",
              fontWeight: 600
            }}>
              <hr style={{ flex: 1, border: "0", borderTop: "1px solid var(--border-color)" }} />
              <span style={{ padding: "0 0.75rem" }}>or sign in with email</span>
              <hr style={{ flex: 1, border: "0", borderTop: "1px solid var(--border-color)" }} />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="form-group">
              <label className="form-label">
                Email address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  required
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.2rem" }}>
                <label className="form-label">
                  Password
                </label>
                <Link href="/forgot-password" style={{ fontSize: "var(--text-xs)", color: "var(--accent-blue)", fontWeight: 600, textDecoration: "none" }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  required
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn btn-accent"
              style={{
                width: "100%",
                padding: "0.8rem",
                fontSize: "var(--text-sm)",
                marginTop: "0.5rem"
              }}
            >
              <LogIn size={18} />
              <span>{loading ? "Signing in..." : "Sign In"}</span>
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
            Don't have an account? <Link href="/register" style={{ color: "var(--accent-blue)", fontWeight: 700, textDecoration: "none" }}>Create one here</Link>
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
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          boxShadow: "var(--shadow-lg)"
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
            <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-on-dark)", marginBottom: "0.75rem", lineHeight: 1.3 }}>
              Build Skills. Protect Assets.
            </h2>
            <p style={{ color: "var(--text-on-dark-subtle)", fontSize: "var(--text-base)", lineHeight: 1.6, maxWidth: "28rem" }}>
              Access your training courses, cloud labs, and security tools all in one simple dashboard.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
