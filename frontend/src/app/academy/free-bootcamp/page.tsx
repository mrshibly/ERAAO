"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Video,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Gift,
  Headphones,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Send,
  ShieldCheck,
  Award,
  PhoneCall,
  Flame,
  Star
} from "lucide-react";

const TELEGRAM_JOIN_URL = "https://t.me/+BWxzf8Zk2stmNWY1";
const WHATSAPP_URL =
  "https://wa.me/8801700000000?text=Hello%20ERAAO%20Academy%2C%20I%20want%20to%20know%20more%20about%20the%20Free%20Zero%20to%20Fluent%20Bootcamp";
const TARGET_DATE = new Date("2026-09-26T21:00:00+06:00").getTime();

export default function FreeBootcampPage() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isLive: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isLive: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isLive: false,
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)" }}>
      
      {/* Top Breadcrumb Navigation Bar */}
      <div style={{ borderBottom: "1px solid var(--border-color)", background: "var(--bg-secondary)" }}>
        <div className="container" style={{ padding: "0.65rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span style={{ color: "var(--text-muted)", opacity: 0.6 }}>/</span>
            <Link href="/academy" style={{ color: "var(--text-secondary)", textDecoration: "none", fontWeight: 600 }}>Academy</Link>
            <span style={{ color: "var(--text-muted)", opacity: 0.6 }}>/</span>
            <span style={{ color: "var(--accent-blue)", fontWeight: 700 }}>Zero to Fluent Free Bootcamp</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="badge badge-green" style={{ fontSize: "0.72rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, padding: "0.25rem 0.65rem" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "currentColor", animation: "pulse 1.5s infinite" }} />
              Registration Open
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION: ZERO TO FLUENT BOOTCAMP
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", paddingTop: "3rem", paddingBottom: "4rem", overflow: "hidden" }}>
        
        {/* Ambient Glows */}
        <div style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse at center, rgba(14, 165, 233, 0.18) 0%, rgba(124, 58, 237, 0.08) 50%, transparent 80%)",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none"
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "center" }}>
            
            {/* Left Column: Headings & Countdown & CTA */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                <span className="badge badge-blue" style={{ fontSize: "0.75rem", padding: "0.35rem 0.8rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  <Sparkles size={13} style={{ marginRight: "0.35rem" }} />
                  One Day Free Live Bootcamp
                </span>
                <span className="badge badge-violet" style={{ fontSize: "0.75rem", padding: "0.35rem 0.8rem", fontWeight: 700 }}>
                  <Flame size={13} style={{ marginRight: "0.35rem", color: "#f59e0b" }} />
                  100% Free Entry
                </span>
              </div>

              <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
                ZERO TO <span className="gradient-text">FLUENT</span>
                <br />
                <span style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.1rem)", color: "var(--text-primary)", fontWeight: 800 }}>
                  Free English Bootcamp
                </span>
              </h1>

              <p style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", color: "var(--accent-blue)", fontWeight: 600, lineHeight: 1.5, marginBottom: "1.25rem" }}>
                মাত্র ২ ঘণ্টায় বুঝে নিন: কেন English পড়েও আপনি English Speaking-এ আটকে যাচ্ছেন!
              </p>

              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem", maxWidth: "34rem" }}>
                বছরের পর বছর Grammar আর Vocabulary পড়ার পরেও যদি কথা বলতে গেলে আটকে যান, তবে সমস্যা আপনার দক্ষতায় নয়, পদ্ধতিতে। শিখুন সহজ Sentence Building ও Fluency তৈরি করার প্রমাণিত উপায়।
              </p>

              {/* Event Specs Quick Pill */}
              <div style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-lg)",
                padding: "1rem 1.25rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "1rem",
                marginBottom: "2rem"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <Calendar size={18} style={{ color: "var(--accent-blue)" }} />
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Start Date</div>
                    <div style={{ fontSize: "var(--text-xs)", fontWeight: 700 }}>26 Sep, 2026</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <Clock size={18} style={{ color: "var(--accent-teal)" }} />
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Time & Duration</div>
                    <div style={{ fontSize: "var(--text-xs)", fontWeight: 700 }}>09:00 to 11:00 PM (2h)</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <Video size={18} style={{ color: "var(--accent-violet)" }} />
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Location</div>
                    <div style={{ fontSize: "var(--text-xs)", fontWeight: 700 }}>Online Live Session</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <Award size={18} style={{ color: "var(--color-success)" }} />
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Fee</div>
                    <div style={{ fontSize: "var(--text-xs)", fontWeight: 800, color: "var(--color-success)" }}>100% Free</div>
                  </div>
                </div>
              </div>

              {/* Countdown Timer Box */}
              <div style={{
                background: "linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)",
                border: "1px solid rgba(14, 165, 233, 0.25)",
                borderRadius: "var(--radius-xl)",
                padding: "1.25rem 1.5rem",
                marginBottom: "2rem",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Clock size={14} style={{ color: "var(--accent-blue)" }} />
                    {timeLeft.isLive ? "ইভেন্ট শুরু হয়েছে!" : "বুটক্যাম্প শুরু হতে বাকি:"}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                    শনিবার, ২৬ সেপ্টেম্বর ২০২৬
                  </span>
                </div>

                {timeLeft.isLive ? (
                  <div style={{ textAlign: "center", padding: "1rem", color: "var(--color-success)", fontWeight: 800, fontSize: "var(--text-base)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-danger, #ef4444)", animation: "pulse 1.5s infinite" }} />
                    <span>লাইভ সেশন চলছে! এখনই টেলিগ্রাম গ্রুপে যোগ দিন।</span>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", textAlign: "center" }}>
                    {[
                      { value: timeLeft.days, labelBn: "দিন", labelEn: "Days" },
                      { value: timeLeft.hours, labelBn: "ঘণ্টা", labelEn: "Hours" },
                      { value: timeLeft.minutes, labelBn: "মিনিট", labelEn: "Mins" },
                      { value: timeLeft.seconds, labelBn: "সেকেন্ড", labelEn: "Secs" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: "var(--card-bg)",
                          border: "1px solid var(--border-color)",
                          borderRadius: "var(--radius-md)",
                          padding: "0.6rem 0.4rem",
                        }}
                      >
                        <div style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", fontWeight: 900, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>
                          {String(item.value).padStart(2, "0")}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600 }}>
                          {item.labelBn}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Call-to-Action Buttons */}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <a
                  href={TELEGRAM_JOIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    padding: "0.95rem 1.75rem",
                    fontSize: "var(--text-sm)",
                    borderRadius: "var(--radius-md)",
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    boxShadow: "0 10px 25px -5px rgba(14, 165, 233, 0.4)",
                    background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                    border: "none",
                    color: "#ffffff"
                  }}
                >
                  <Send size={18} />
                  <span>Join Free on Telegram</span>
                  <ArrowRight size={16} />
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{
                    padding: "0.9rem 1.4rem",
                    fontSize: "var(--text-sm)",
                    borderRadius: "var(--radius-md)",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderColor: "rgba(16, 185, 129, 0.4)",
                    color: "var(--text-primary)"
                  }}
                >
                  <MessageSquare size={17} style={{ color: "var(--color-success)" }} />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              <div style={{ marginTop: "1rem", fontSize: "0.76rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <ShieldCheck size={14} style={{ color: "var(--color-success)" }} />
                <span>কোনো ক্রেডিট কার্ড বা পেমেন্ট প্রয়োজন নেই • সম্পূর্ণ ফ্রি অ্যাক্সেস</span>
              </div>
            </div>

            {/* Right Column: Official Poster Showcase */}
            <div>
              <div
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  border: "1px solid rgba(14, 165, 233, 0.3)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(14, 165, 233, 0.15)",
                  background: "#060a16"
                }}
              >
                <Image
                  src="/banners/zero-to-fluent-free-bootcamp.png"
                  alt="Zero to Fluent Free English Bootcamp | ERAAO Academy"
                  width={1024}
                  height={537}
                  priority
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover"
                  }}
                />

                {/* Quick Overlay Footer Badge */}
                <div style={{
                  padding: "1rem 1.25rem",
                  background: "var(--card-bg)",
                  borderTop: "1px solid var(--border-color)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem"
                }}>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "var(--accent-teal)", fontWeight: 700, textTransform: "uppercase" }}>
                      Featured Mentor
                    </div>
                    <div style={{ fontSize: "var(--text-sm)", fontWeight: 800, color: "var(--text-primary)" }}>
                      Ayesha Anika • 4 Years Experience
                    </div>
                  </div>

                  <a
                    href={TELEGRAM_JOIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "var(--text-xs)",
                      fontWeight: 700,
                      color: "var(--accent-blue)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      textDecoration: "none"
                    }}
                  >
                    Join Telegram Group <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PAIN POINTS SECTION: এই সমস্যাগুলো কি আপনারও?
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "4rem 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          
          <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto 3rem auto" }}>
            <span className="badge badge-amber" style={{ fontSize: "var(--text-xs)", fontWeight: 800, marginBottom: "0.75rem", padding: "0.3rem 0.75rem" }}>
              <HelpCircle size={13} style={{ marginRight: "0.35rem" }} />
              Self Assessment
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
              এই সমস্যাগুলো কি আপনার ক্ষেত্রেও ঘটে?
            </h2>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              প্রতিটি প্রশ্নের উত্তর যদি ‘হ্যাঁ’ হয়, তবে জেনে রাখুন, আপনি একা নন। দেশের হাজারো শিক্ষার্থীর এই একই সংকট।
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
            {[
              {
                q: "বছরের পর বছর English Grammar পড়েছেন, Vocabulary শিখেছেন, তবুও Speaking করতে গেলে ভয় লাগে?",
                note: "Brain Freeze",
                iconColor: "#ef4444"
              },
              {
                q: "Sentence মাথায় ঠিকই সাজানো আসে, কিন্তু মুখে বলার সময় শব্দ বের হতে চায় না?",
                note: "Hesitation Barrier",
                iconColor: "#f59e0b"
              },
              {
                q: "ভুল হওয়ার ভয়ে বা মানুষ হাসাহাসি করবে ভেবে মানুষের সামনে English বলতে পারেন না?",
                note: "Fear of Judgment",
                iconColor: "#3b82f6"
              },
              {
                q: "Grammar-এর সব সূত্র জানেন, কিন্তু বাস্তব কথোপকথনে সেগুলো কাজে লাগাতে পারেন না?",
                note: "Passive Knowledge",
                iconColor: "#8b5cf6"
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: "1.75rem 1.5rem",
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s, border-color 0.2s"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: card.iconColor, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Issue #{idx + 1} • {card.note}
                    </span>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: card.iconColor }} />
                  </div>
                  <p style={{ fontSize: "var(--text-sm)", lineHeight: 1.6, color: "var(--text-primary)", fontWeight: 600 }}>
                    “{card.q}”
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Root Cause Callout Card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(16, 185, 129, 0.12) 100%)",
            border: "1px solid rgba(14, 165, 233, 0.3)",
            borderRadius: "var(--radius-xl)",
            padding: "2rem",
            textAlign: "center",
            maxWidth: "50rem",
            margin: "0 auto"
          }}>
            <div style={{ fontSize: "var(--text-xs)", fontWeight: 800, color: "var(--accent-teal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
              The Core Breakthrough
            </div>
            <h3 style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              তাহলে সমস্যা হয়তো English না জানা নয়, সঠিকভাবে English Practice না করা!
            </h3>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "42rem", margin: "0 auto 1.5rem auto" }}>
              সাঁতার শেখার বই মুখস্থ করে যেমন সাঁতারু হওয়া যায় না, তেমনি শুধু খাতা-কলমে গ্রামার পড়ে স্পিকিং আসে না। দরকার বৈজ্ঞানিক প্র্যাকটিস টেকনিক যা এই ২ ঘণ্টার সেশনে সরাসরি শেখানো হবে।
            </p>
            <a
              href={TELEGRAM_JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
              style={{
                padding: "0.75rem 1.6rem",
                fontSize: "var(--text-sm)",
                fontWeight: 700,
                borderRadius: "var(--radius-md)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              <Send size={16} />
              <span>Join English Club for Free</span>
            </a>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CURRICULUM MATRIX: মাত্র ২ ঘণ্টায় যা শিখবেন
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "4.5rem 0" }}>
        <div className="container">
          
          <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto 3.5rem auto" }}>
            <span className="badge badge-blue" style={{ fontSize: "var(--text-xs)", fontWeight: 800, marginBottom: "0.75rem", padding: "0.3rem 0.75rem" }}>
              <BookOpen size={13} style={{ marginRight: "0.35rem" }} />
              Comprehensive Roadmap
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
              মাত্র ২ ঘণ্টার লাইভ সেশনে যা শিখবেন
            </h2>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              প্রতিটি টপিক সরাসরি বাস্তব প্রয়োগ ও ড্রিলের মাধ্যমে বুঝিয়ে দেওয়া হবে, যাতে সেশন শেষে আপনি নিজেই আত্মবিশ্বাসের সাথে শুরু করতে পারেন।
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                no: "01",
                title: "English শেখার সঠিক পদ্ধতি",
                desc: "প্রথাগত মুখস্থবিদ্যা বাদ দিয়ে ন্যাচারাল ল্যাঙ্গুয়েজ একুইজিশন পদ্ধতিতে কীভাবে সাবলীল ইংরেজি আয়ত্ত করবেন।"
              },
              {
                no: "02",
                title: "সহজ Sentence Building টেকনিক",
                desc: "জটিল গ্রামার রুলস ছাড়াই দৈনন্দিন যেকোনো কথা সহজে ইংরেজিতে বাক্য তৈরি করার স্মার্ট ফ্রেমওয়ার্ক।"
              },
              {
                no: "03",
                title: "Listening + Speaking Practice ড্রিল",
                desc: "কীভাবে নেটিভদের কথা সহজে বুঝবেন এবং তাৎক্ষণিক উত্তর দেওয়ার স্পিচ রিফ্লেক্স তৈরি করবেন।"
              },
              {
                no: "04",
                title: "Grammar থেকে Real-Life English",
                desc: "বইয়ের ব্যাকরণকে দৈনন্দিন আলাপচারিতা, ইন্টারভিউ ও পেশাগত প্রয়োজনে ব্যবহারের ব্যবহারিক কৌশল।"
              },
              {
                no: "05",
                title: "Speaking Confidence তৈরির উপায়",
                desc: "ভয়, জড়তা ও তোতলামি দূর করে যেকোনো মানুষের সামনে সাবলীলভাবে কথা বলার মানসিক প্রস্তুতি।"
              },
              {
                no: "06",
                title: "নিজের Learning Routine তৈরি",
                desc: "কর্মব্যস্ত জীবনের ফাঁকে প্রতিদিন মাত্র ২০-৩০ মিনিট ব্যয় করে কীভাবে দীর্ঘমেয়াদে ফ্লুয়েন্সি ধরে রাখবেন।"
              }
            ].map((module) => (
              <div
                key={module.no}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.75rem 1.5rem",
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "flex-start"
                }}
              >
                <div style={{
                  fontSize: "1rem",
                  fontWeight: 900,
                  color: "var(--accent-blue)",
                  background: "rgba(14, 165, 233, 0.1)",
                  border: "1px solid rgba(14, 165, 233, 0.25)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.5rem 0.75rem",
                  lineHeight: 1
                }}>
                  {module.no}
                </div>
                <div>
                  <h4 style={{ fontSize: "var(--text-base)", fontWeight: 800, marginBottom: "0.4rem", color: "var(--text-primary)" }}>
                    {module.title}
                  </h4>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {module.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FREE RESOURCES PACK: যা যা সম্পূর্ণ ফ্রিতে উপহার পাবেন
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "4rem 0", background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          
          <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto 3rem auto" }}>
            <span className="badge badge-green" style={{ fontSize: "var(--text-xs)", fontWeight: 800, marginBottom: "0.75rem", padding: "0.3rem 0.75rem" }}>
              <Gift size={13} style={{ marginRight: "0.35rem" }} />
              Exclusive Bonuses
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
              বুটক্যাম্পে অংশগ্রহণকারীদের জন্য FREE Resources
            </h2>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              সেশনের পাশাপাশি আপনার নিয়মিত সেলফ-প্র্যাকটিসের জন্য দেওয়া হবে এই বিশেষ রিসোর্সগুলো:
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
            {[
              {
                title: "Daily English Practice Module",
                desc: "প্রতিদিনের প্র্যাকটিস চেকলিস্ট ও টাস্ক গাইড",
                icon: BookOpen,
                color: "#0ea5e9"
              },
              {
                title: "Self-Recorded Listening Audio",
                desc: "নেটিভ অ্যাকসেন্ট শোনার অডিও প্যাক",
                icon: Headphones,
                color: "#10b981"
              },
              {
                title: "Important Grammar Guide",
                desc: "কাজের ব্যাকরণগুলোর স্মার্ট রেফারেন্স চিটশিট",
                icon: ShieldCheck,
                color: "#8b5cf6"
              },
              {
                title: "Speaking Practice Prompts",
                desc: "বন্ধু বা আয়নার সামনে কথা বলার ২০+ বাস্তব টপিক",
                icon: MessageSquare,
                color: "#f59e0b"
              },
              {
                title: "Personal Learning Routine",
                desc: "নিজের ফ্রি সময় অনুযায়ী প্র্যাকটিস প্ল্যানার",
                icon: Calendar,
                color: "#ec4899"
              }
            ].map((res, idx) => {
              const Icon = res.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-lg)",
                    padding: "1.5rem 1.25rem",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: `${res.color}15`,
                    color: res.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem"
                  }}>
                    <Icon size={22} />
                  </div>
                  <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 800, marginBottom: "0.35rem", color: "var(--text-primary)" }}>
                    {res.title}
                  </h4>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                    {res.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mentor Profile Banner */}
          <div style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-xl)",
            padding: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            alignItems: "center"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span className="badge badge-blue" style={{ fontSize: "0.72rem", fontWeight: 700 }}>
                  Lead Session Instructor
                </span>
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                Ayesha Anika
              </h3>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--accent-teal)", fontWeight: 700, marginBottom: "1rem" }}>
                Senior English Communication Mentor • 4+ Years of Dedicated Mentorship
              </p>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                আয়েশা অনিকা বিগত ৪ বছর ধরে শত শত শিক্ষার্থীকে স্পোকেন ইংলিশের ভয় কাটিয়ে সাবলীলভাবে কথা বলতে সহায়তা করে আসছেন। তাঁর শেখানোর পদ্ধতি অত্যন্ত বন্ধুত্বপূর্ণ, ইন্টারঅ্যাক্টিভ ও ভীতিহীন পরিবেশ তৈরিতে বিশেষায়িত।
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--color-success)" }} /> 100% Practical Drills
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--color-success)" }} /> Hesitation Removal
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--color-success)" }} /> Live Q&A
                </span>
              </div>
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)",
              border: "1px solid rgba(14, 165, 233, 0.2)",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--accent-blue)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                Who Is This Bootcamp For?
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left", fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--accent-teal)", marginTop: "3px", flexShrink: 0 }} />
                  <span>ইংরেজি বোঝা ও বলার ক্ষেত্রে আত্মবিশ্বাসী হয়ে উঠতে চান</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--accent-teal)", marginTop: "3px", flexShrink: 0 }} />
                  <span>যারা ইংরেজি বুঝতে পারেন, কিন্তু নিজে বলতে পারেন না</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--accent-teal)", marginTop: "3px", flexShrink: 0 }} />
                  <span>সঠিক বাক্য তৈরি করতে গিয়ে আটকে যান বা ভুল করেন</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--accent-teal)", marginTop: "3px", flexShrink: 0 }} />
                  <span>Grammar-এর মৌলিক বিষয়গুলো পরিষ্কার করতে চান</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CONVERSION SECTION: টেলিগ্রাম গ্রুপে এখনই যুক্ত হোন
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", background: "var(--bg-primary)", position: "relative", overflow: "hidden" }}>
        
        {/* Ambient Glow */}
        <div style={{
          position: "absolute",
          bottom: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse at center, rgba(14, 165, 233, 0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
          zIndex: 0,
          pointerEvents: "none"
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "48rem" }}>
          
          <div style={{
            background: "linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(124, 58, 237, 0.12) 100%)",
            border: "1px solid var(--border-focus)",
            borderRadius: "var(--radius-xl)",
            padding: "3rem 2rem",
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.5)"
          }}>
            
            <span className="badge badge-green" style={{ fontSize: "var(--text-xs)", fontWeight: 800, padding: "0.35rem 0.85rem", marginBottom: "1.25rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <Sparkles size={14} />
              <span>FREE BOOTCAMP ADMISSIONS OPEN</span>
            </span>

            <h2 style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", fontWeight: 900, lineHeight: 1.3, marginBottom: "1rem" }}>
              “Fluent English একদিনে তৈরি হয় না।
              <br />
              <span className="gradient-text">কিন্তু সঠিকভাবে শুরু করার জন্য ১ দিনই যথেষ্ট।”</span>
            </h2>

            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem", maxWidth: "36rem", margin: "0 auto 2rem auto" }}>
              FREE Bootcamp-এ Join করতে এবং ক্লাসের লাইভ লিংক ও স্টাডি ম্যাটেরিয়ালস পেতে এখনই আমাদের অফিশিয়াল Telegram English Club-এ যোগ দিন।
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href={TELEGRAM_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  padding: "1rem 2.2rem",
                  fontSize: "var(--text-base)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                  boxShadow: "0 12px 30px -5px rgba(14, 165, 233, 0.5)",
                  border: "none",
                  color: "#ffffff"
                }}
              >
                <Send size={20} />
                <span>Join Our Telegram Group</span>
                <ArrowRight size={18} />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{
                  padding: "0.95rem 1.6rem",
                  fontSize: "var(--text-sm)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <MessageSquare size={18} style={{ color: "var(--color-success)" }} />
                <span>Ask on WhatsApp</span>
              </a>
            </div>

            <div style={{ marginTop: "1.75rem", fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", justifyContent: "center", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                <Calendar size={14} style={{ color: "var(--accent-blue)" }} /> ২৬ সেপ্টেম্বর, ২০২৬
              </span>
              <span>•</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                <Clock size={14} style={{ color: "var(--accent-teal)" }} /> রাত ৯:০০ টা থেকে ১১:০০ টা
              </span>
              <span>•</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                <Video size={14} style={{ color: "var(--accent-violet)" }} /> অনলাইন লাইভ সেশন
              </span>
            </div>

          </div>

          <div style={{ marginTop: "2rem", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
            ERAAO Academy • <span style={{ color: "var(--accent-blue)" }}>Learn Today. Build Tomorrow.</span>
          </div>

        </div>
      </section>

    </div>
  );
}
