"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Calendar, Clock, Video, CheckCircle2, AlertCircle, ShieldCheck, Mail, Phone, ArrowRight, UserCheck } from "lucide-react";

interface SlotData {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

function getNextWeekdays(count: number): { label: string; value: string }[] {
  const days: { label: string; value: string }[] = [];
  const now = new Date();
  let d = new Date(now);
  // Start from tomorrow
  d.setDate(d.getDate() + 1);

  while (days.length < count) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) {
      const iso = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      days.push({ label, value: iso });
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

const SERVICE_TYPES = [
  "Security Consultation",
  "AI & LLM Architecture",
  "Offensive Penetration Testing",
  "Corporate Ethical Hacking Training",
  "Cloud Infrastructure Audit",
  "Web & Mobile Security Audit",
  "Custom Enterprise Request"
];

const FALLBACK_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM"
];

export default function BookPage() {
  const { user } = useAuth();
  const dates = getNextWeekdays(5);
  const [selectedDate, setSelectedDate] = useState(dates[0]?.value || "");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API slots state
  const [apiSlots, setApiSlots] = useState<SlotData[]>([]);
  const [slotsLoaded, setSlotsLoaded] = useState(false);

  // Auto-fill form details if student/client is logged in
  useEffect(() => {
    if (user) {
      if (user.full_name) setName(user.full_name);
      if (user.email) setEmail(user.email);
    }
  }, [user]);

  // Fetch available time slots from the API
  useEffect(() => {
    fetch("/api/v1/bookings/slots")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch slots");
      })
      .then((data: SlotData[]) => {
        setApiSlots(data);
        setSlotsLoaded(true);
      })
      .catch(() => {
        setSlotsLoaded(true); // Use fallback slots
      });
  }, []);

  // Determine which slots to show for the selected date
  const slotsForDate = apiSlots.filter(s => s.date === selectedDate && s.is_available);
  const useApiSlots = slotsLoaded && apiSlots.length > 0;

  const displaySlots = useApiSlots
    ? slotsForDate.map(s => ({
        label: formatTime(s.start_time) + " – " + formatTime(s.end_time),
        id: s.id,
      }))
    : FALLBACK_SLOTS.map(s => ({ label: s, id: null as string | null }));

  function formatTime(t: string): string {
    const [h, m] = t.split(":");
    const hour = parseInt(h, 10);
    const suffix = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${suffix}`;
  }

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setError(null);

    setLoading(true);
    try {
      const payload: Record<string, unknown> = {
        name,
        email,
        phone: phone || null,
        service_type: serviceType,
        notes: notes || null,
      };

      if (selectedSlotId) {
        payload.time_slot_id = selectedSlotId;
      }

      const response = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.detail || body.error?.message || "Unable to register consultation slot.");
      }

      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error scheduling appointment. Please try another slot.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "var(--spacing-section) 0", background: "var(--bg-primary)" }}>
      <div className="container" style={{ maxWidth: "62rem" }}>
        
        {/* Page Hero Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="badge badge-blue" style={{ marginBottom: "0.75rem" }}>
            1-on-1 Discovery Session
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Schedule Your <span className="text-gradient">Technical Consultation</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-base)", maxWidth: "38rem", margin: "0.75rem auto 0 auto", lineHeight: 1.6 }}>
            Connect with a lead cybersecurity practitioner or AI solution architect to design, evaluate, or scale your enterprise roadmap.
          </p>
        </div>

        {/* Main Card Grid */}
        <div className="book-card-grid">
          
          {/* Left Panel: Information & Host Info */}
          <div className="book-left-panel">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <ShieldCheck size={20} style={{ color: "var(--accent-blue)" }} />
                <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--accent-blue)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  ERAAO Advisory
                </span>
              </div>

              <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
                Technical Discovery Call
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6, marginBottom: "2rem" }}>
                Direct access to our senior engineering specialists. Pure technical scope analysis — no high-pressure sales.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--accent-blue-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-blue)", flexShrink: 0 }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Duration</div>
                    <div style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--text-primary)" }}>30 Minutes</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--accent-teal-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-teal)", flexShrink: 0 }}>
                    <Video size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Location</div>
                    <div style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--text-primary)" }}>Google Meet (Encrypted Video Link)</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-success)", flexShrink: 0 }}>
                    <UserCheck size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>Lead Practitioner</div>
                    <div style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--text-primary)" }}>Solutions Specialist</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Footer Block */}
            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
              <div style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Direct Assistance
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "var(--text-xs)" }}>
                <a href="mailto:info@eraao.com" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", textDecoration: "none" }}>
                  <Mail size={14} style={{ color: "var(--accent-blue)" }} /> info@eraao.com
                </a>
                <a href="tel:+8801517835859" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", textDecoration: "none" }}>
                  <Phone size={14} style={{ color: "var(--accent-blue)" }} /> +880 1517-835859
                </a>
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Scheduler */}
          <div className="book-right-panel">
            
            {success ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-success)",
                  margin: "0 auto 1.5rem auto"
                }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                  Consultation Booked!
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "2rem", lineHeight: 1.6 }}>
                  A calendar invite with the encrypted Google Meet link has been dispatched to <strong>{email}</strong>.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => { setSuccess(false); setError(null); setSelectedSlot(null); }}
                  style={{ borderRadius: "var(--radius-md)" }}
                >
                  Schedule Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook}>
                
                {/* Error Banner */}
                {error && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.85rem 1rem",
                    marginBottom: "1.5rem",
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--color-error)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 500
                  }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{error}</span>
                  </div>
                )}

                {/* 1. Date Selector */}
                <div style={{ marginBottom: "1.75rem", width: "100%" }}>
                  <h4 style={{ fontWeight: 700, fontSize: "var(--text-sm)", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
                    <Calendar size={16} style={{ color: "var(--accent-blue)" }} /> 1. Select Date
                  </h4>
                  <div className="book-date-grid">
                    {dates.map((date) => {
                      const isSelected = selectedDate === date.value;
                      return (
                        <button
                          key={date.value}
                          type="button"
                          onClick={() => { setSelectedDate(date.value); setSelectedSlot(null); setSelectedSlotId(null); }}
                          className={`book-date-btn ${isSelected ? "active" : ""}`}
                        >
                          {date.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Time Slot Selector */}
                <div style={{ marginBottom: "2rem" }}>
                  <h4 style={{ fontWeight: 700, fontSize: "var(--text-sm)", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
                    <Clock size={16} style={{ color: "var(--accent-blue)" }} /> 2. Select Time Slot
                  </h4>
                  <div className="book-slot-grid">
                    {displaySlots.length === 0 ? (
                      <p style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)", gridColumn: "1 / -1", padding: "0.5rem 0" }}>No available slots on this date.</p>
                    ) : displaySlots.map((slot) => {
                      const isSelected = selectedSlot === slot.label;
                      return (
                        <button
                          key={slot.label}
                          type="button"
                          onClick={() => { setSelectedSlot(slot.label); setSelectedSlotId(slot.id); }}
                          className={`book-slot-btn ${isSelected ? "active" : ""}`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Details Form */}
                {selectedSlot ? (
                  <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <h4 style={{ fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                      3. Confirm Your Information
                    </h4>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
                      <div>
                        <label className="form-label">Full Name *</label>
                        <input
                          required
                          type="text"
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+880 1517-835859"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Email Address *</label>
                      <input
                        required
                        type="email"
                        placeholder="your.email@organization.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="form-label">Primary Interest / Service Area</label>
                      <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="input-field">
                        {SERVICE_TYPES.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Project Scope / Agenda Details</label>
                      <textarea
                        placeholder="Briefly describe your security, AI, or training requirements..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="input-field"
                        style={{ resize: "vertical" }}
                      />
                    </div>

                    <button
                      disabled={loading}
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "100%", padding: "0.85rem 1.5rem", borderRadius: "var(--radius-md)", marginTop: "0.5rem" }}
                    >
                      {loading ? "Confirming Slot..." : "Confirm & Book Discovery Call"}
                    </button>
                  </div>
                ) : (
                  <div style={{
                    padding: "1.25rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-secondary)",
                    border: "1px dashed var(--border-color)",
                    textAlign: "center",
                    fontSize: "var(--text-xs)",
                    color: "var(--text-muted)"
                  }}>
                    Select a date and time slot above to continue booking.
                  </div>
                )}

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
