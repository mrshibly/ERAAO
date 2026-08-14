"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShoppingCart, AlertCircle } from "lucide-react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { token, loading } = useAuth();
  
  const courseId = searchParams?.get("course") || "course-1";
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(true);

  // Mapping static titles to checkout
  const courseTitles: Record<string, string> = {
    "course-1": "Ethical Hacking & Penetration Testing — Course Tuition",
    "course-2": "Practical Bug Bounty Hunting — Course Tuition",
    "course-3": "Secure AI Applications Development — Course Tuition"
  };

  useEffect(() => {
    if (loading) return;
    if (!token) {
      router.push(`/login?redirect=/checkout?course=${courseId}`);
      return;
    }

    const triggerCheckout = async () => {
      try {
        const response = await fetch("/api/v1/payments/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            items: [
              {
                item_type: "course",
                item_id: courseId
              }
            ]
          })
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body.detail || "Unable to initiate payment session.");
        }

        const data = await response.json();
        if (data.checkout_url) {
          // Forwarding the user to Stripe Checkout gateway URL
          window.location.href = data.checkout_url;
        } else {
          throw new Error("Stripe url not generated.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to generate checkout portal.");
        setGenerating(false);
      }
    };

    triggerCheckout();
  }, [courseId, token, loading, router]);

  if (loading || generating) {
    return (
      <div className="loading-container" style={{ padding: "8rem 0" }}>
        <ShoppingCart size={48} style={{ color: "var(--accent-blue)", margin: "0 auto 1.5rem auto", animation: "pulse 1.5s infinite" }} />
        <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>Initializing Secure Checkout</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)" }}>
          Redirecting to Payment Gateway for: <strong>{courseTitles[courseId] || "Course Enrollment"}</strong>...
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "6rem 0", display: "flex", justifyContent: "center" }}>
      <div className="container" style={{ maxWidth: "28rem" }}>
        <div className="card" style={{ padding: "2.5rem", textAlign: "center" }}>
          <AlertCircle size={48} style={{ color: "var(--color-error)", margin: "0 auto 1rem auto" }} />
          <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>Checkout Failed</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.5, marginBottom: "2rem" }}>
            {error || "An error occurred while setting up the transaction context. Please check payment configuration."}
          </p>
          <button className="btn btn-primary" onClick={() => router.push("/academy")} style={{ width: "100%" }}>
            Return to Academy Catalog
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="loading-container" style={{ padding: "8rem 0" }}>
        <p>Loading checkout parameters...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
