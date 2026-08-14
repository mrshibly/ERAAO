"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Settings, Edit3, Search } from "lucide-react";

export default function AdminServicesPage() {
  const { token } = useAuth();
  const [services, setServices] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  
  const [editId, setEditId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState({ title: "", description: "", base_price: 1500.0, estimated_days: 5 });

  const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/v1/services", { headers });
      if (res.ok) {
        setServices(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEditClick = (svc: any) => {
    setEditId(svc.id);
    setServiceForm({
      title: svc.title,
      description: svc.description || "",
      base_price: svc.base_price,
      estimated_days: svc.estimated_days || 5
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    try {
      const res = await fetch(`/api/v1/services/${editId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(serviceForm)
      });
      if (res.ok) {
        showMessage("Service catalog updated successfully!");
        setEditId(null);
        fetchServices();
      } else {
        showMessage("Failed to update service.", "error");
      }
    } catch {
      showMessage("Error connecting to server.", "error");
    }
  };

  const filtered = services.filter(s =>
    (s.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.slug || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <Settings size={24} style={{ color: "var(--accent-blue)" }} /> Service CMS
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "var(--text-sm)" }}>Manage details, pricing structures, and SLA parameters of service catalog offerings</p>
      </div>

      {message && (
        <div style={{
          background: message.type === "success" ? "var(--color-success-bg)" : "var(--color-error-bg)",
          color: message.type === "success" ? "var(--color-success)" : "var(--color-error)",
          padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
          border: `1px solid ${message.type === "success" ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
          marginBottom: "1.5rem", fontWeight: 600, fontSize: "var(--text-sm)"
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
        {/* Listing */}
        <div style={{ gridColumn: "span 2" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>Catalog Services ({filtered.length})</h2>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text" placeholder="Search services..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: "2.25rem", width: "220px" }}
              />
            </div>
          </div>

          {fetching ? (
            <div className="loading-container" style={{ padding: "3rem 0" }}>Loading service listings...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state card" style={{ padding: "3rem 0" }}>No services found.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {filtered.map((svc) => (
                <div key={svc.id} className="card" style={{ border: editId === svc.id ? "2px solid var(--accent-blue)" : "1px solid var(--border-color)", padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: "var(--text-base)", color: "var(--text-primary)" }}>{svc.title}</h4>
                      <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "0.15rem", fontFamily: "monospace" }}>{svc.slug}</p>
                    </div>
                    <button 
                      onClick={() => handleEditClick(svc)}
                      style={{ color: "var(--accent-blue)", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem", fontWeight: 600, fontSize: "var(--text-xs)" }}
                    >
                      <Edit3 size={15} />
                      <span>Edit</span>
                    </button>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginTop: "0.5rem" }}>{svc.description}</p>
                  <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.75rem", borderTop: "1px solid var(--border-color)", paddingTop: "0.5rem", fontSize: "var(--text-xs)", fontWeight: 600 }}>
                    <span style={{ color: "var(--accent-teal)" }}>Base Rate: ৳{svc.base_price} BDT</span>
                    <span style={{ color: "var(--accent-violet)" }}>Duration SLA: {svc.estimated_days || 5} Days</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Configuration Editor */}
        <div className="card" style={{ padding: "1.75rem", height: "fit-content" }}>
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
            <Settings size={18} /> Service Editor
          </h2>
          
          {!editId ? (
            <div className="empty-state" style={{ padding: "3rem 0", fontSize: "var(--text-xs)" }}>
              Select a service from the listings catalog to adjust scope, price, and deadline parameters.
            </div>
          ) : (
            <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" required value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} className="input-field" />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea required rows={4} value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} className="input-field" style={{ resize: "vertical" }} />
              </div>
              <div className="form-group">
                <label className="form-label">Base Price (BDT)</label>
                <input type="number" required value={serviceForm.base_price} onChange={(e) => setServiceForm({ ...serviceForm, base_price: parseFloat(e.target.value) })} className="input-field" />
              </div>
              <div className="form-group">
                <label className="form-label">Estimated Duration (Days)</label>
                <input type="number" required value={serviceForm.estimated_days} onChange={(e) => setServiceForm({ ...serviceForm, estimated_days: parseInt(e.target.value) })} className="input-field" />
              </div>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="submit" className="btn btn-accent" style={{ flex: 1 }}>
                  Save Changes
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setEditId(null)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
