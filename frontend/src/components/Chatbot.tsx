"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MessageSquareCode, X, Send, Sparkles, RefreshCw, Zap, ShieldCheck, BrainCircuit, Award, Phone, Bot, CornerDownLeft } from "lucide-react";
import Logo from "@/components/Logo";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content: "Welcome to the ERAAO AI Assistant.\n\nHow may I help you today? Ask about our Practical Training Bootcamps, Enterprise Security Audits, or Custom AI Software."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!textToSend) setInputValue("");
    setIsLoading(true);

    try {
      // Prepare payload for backend API
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));
      
      const response = await fetch("/api/v1/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          context_url: typeof window !== "undefined" ? window.location.pathname : "/"
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.reply || "Service is currently unavailable. Please try again shortly."
          }
        ]);
      } else {
        throw new Error("API error");
      }
    } catch {
      // Local graceful fallback response
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Unable to connect to network service. You may browse our [Academy Bootcamps](/academy), [Security Services](/services), or [Book a Consultation](/book)."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: "assistant",
        content: "Chat session cleared. How may I assist you?"
      }
    ]);
  };

  // Helper to parse markdown-style links [text](/url) into clickable React elements
  const renderFormattedMessage = (content: string) => {
    const parts = content.split(/(\[[^\]]+\]\([^)]+\))/g);
    return (
      <span>
        {parts.map((part, idx) => {
          const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          if (match) {
            const linkText = match[1];
            const linkUrl = match[2];
            const isInternal = linkUrl.startsWith("/");
            if (isInternal) {
              return (
                <Link
                  key={idx}
                  href={linkUrl}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: "#0284c7",
                    fontWeight: 700,
                    textDecoration: "underline",
                    textUnderlineOffset: "3px"
                  }}
                >
                  {linkText}
                </Link>
              );
            }
            return (
              <a
                key={idx}
                href={linkUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#0284c7",
                  fontWeight: 700,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px"
                }}
              >
                {linkText}
              </a>
            );
          }
          // Process bold formatting **text**
          const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
          return (
            <span key={idx}>
              {boldParts.map((bPart, bIdx) => {
                if (bPart.startsWith("**") && bPart.endsWith("**")) {
                  return <strong key={bIdx} style={{ fontWeight: 800 }}>{bPart.slice(2, -2)}</strong>;
                }
                return bPart;
              })}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div style={{ position: "fixed", bottom: "1.75rem", right: "1.75rem", zIndex: 9999 }}>
      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div style={{
          width: "390px",
          maxHeight: "600px",
          height: "calc(100vh - 110px)",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          boxShadow: "0 20px 50px -10px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(14, 165, 233, 0.15)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginBottom: "1rem",
          animation: "fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          transformOrigin: "bottom right"
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            color: "#ffffff",
            padding: "1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                background: "rgba(14, 165, 233, 0.15)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 15px rgba(14, 165, 233, 0.2)"
              }}>
                <Sparkles size={20} style={{ color: "#38bdf8" }} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ fontSize: "0.95rem", fontWeight: 800, letterSpacing: "-0.01em", color: "#ffffff" }}>
                    ERAAO AI Assistant
                  </span>
                  <span style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "#10b981",
                    boxShadow: "0 0 8px #10b981"
                  }} />
                </div>
                <div style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 600 }}>
                  Online • Fast Response
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <button
                onClick={handleClearChat}
                title="Clear Chat"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "none",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.18)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)")}
              >
                <RefreshCw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "none",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.18)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)")}
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div style={{
            flex: 1,
            padding: "1.1rem 1.25rem",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
            background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)"
          }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "88%",
                  display: "flex",
                  gap: "0.6rem",
                  flexDirection: msg.role === "user" ? "row-reverse" : "row"
                }}
              >
                {msg.role === "assistant" && (
                  <div style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px"
                  }}>
                    <Bot size={16} style={{ color: "#ffffff" }} />
                  </div>
                )}
                <div
                  style={{
                    backgroundColor: msg.role === "user" ? "#0ea5e9" : "#ffffff",
                    color: msg.role === "user" ? "#ffffff" : "#0f172a",
                    padding: "0.85rem 1.15rem",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    boxShadow: msg.role === "user" 
                      ? "0 4px 14px rgba(14, 165, 233, 0.25)" 
                      : "0 2px 10px rgba(15, 23, 42, 0.05)",
                    border: msg.role === "user" ? "none" : "1px solid #e2e8f0",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word"
                  }}
                >
                  {renderFormattedMessage(msg.content)}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div style={{
                alignSelf: "flex-start",
                display: "flex",
                gap: "0.6rem",
                alignItems: "center"
              }}>
                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <Bot size={16} style={{ color: "#ffffff" }} />
                </div>
                <div style={{
                  backgroundColor: "#ffffff",
                  padding: "0.7rem 1rem",
                  borderRadius: "18px 18px 18px 4px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>ERAAO AI is writing</span>
                  <span style={{ display: "inline-flex", gap: "4px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", animation: "float 0.8s infinite alternate" }} />
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7c3aed", animation: "float 0.8s infinite 0.25s alternate" }} />
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0d9488", animation: "float 0.8s infinite 0.5s alternate" }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Pills */}
          <div style={{
            padding: "0.65rem 1rem",
            background: "#ffffff",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem 0.5rem",
            maxWidth: "100%"
          }}>
            {[
              { text: "Courses", icon: Award },
              { text: "Security Audit", icon: ShieldCheck },
              { text: "Book Consultation", icon: Phone }
            ].map((pill, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(pill.text)}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#0f172a",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#0ea5e9";
                  e.currentTarget.style.color = "#0ea5e9";
                  e.currentTarget.style.background = "rgba(14, 165, 233, 0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.color = "#0f172a";
                  e.currentTarget.style.background = "#f8fafc";
                }}
              >
                <pill.icon size={13} style={{ color: "#0ea5e9" }} />
                <span>{pill.text}</span>
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div style={{
            padding: "0.85rem 1rem 1rem",
            background: "#ffffff",
            borderTop: "1px solid #e2e8f0"
          }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="text"
                placeholder="Ask ERAAO AI anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: "0.75rem 1.1rem",
                  fontSize: "0.88rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "14px",
                  outline: "none",
                  background: "#f8fafc",
                  color: "#0f172a"
                }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "14px",
                  background: inputValue.trim() ? "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)" : "#e2e8f0",
                  color: "white",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: inputValue.trim() ? "pointer" : "not-allowed",
                  boxShadow: inputValue.trim() ? "0 4px 14px rgba(14, 165, 233, 0.35)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button with Hover Tooltip */}
      <div style={{ position: "relative", display: "inline-block" }}>
        {!isOpen && (
          <div className="anim-fade-in" style={{
            position: "absolute",
            right: "72px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#0f172a",
            color: "#ffffff",
            padding: "0.45rem 0.9rem",
            borderRadius: "12px",
            fontSize: "0.82rem",
            fontWeight: 700,
            whiteSpace: "nowrap",
            boxShadow: "0 10px 25px rgba(15, 23, 42, 0.2)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            pointerEvents: "none"
          }}>
            <Sparkles size={14} style={{ color: "#38bdf8" }} />
            <span>AI Assistant</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AI Assistant Chat"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            border: "2px solid #38bdf8",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 12px 32px rgba(14, 165, 233, 0.4), 0 0 0 4px rgba(14, 165, 233, 0.15)",
            position: "relative",
            transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), boxShadow 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.boxShadow = "0 16px 40px rgba(14, 165, 233, 0.5), 0 0 0 6px rgba(14, 165, 233, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(14, 165, 233, 0.4), 0 0 0 4px rgba(14, 165, 233, 0.15)";
          }}
        >
          {isOpen ? (
            <X size={26} />
          ) : (
            <>
              <Sparkles size={26} style={{ color: "#38bdf8" }} />
              {/* Pulse Indicator */}
              <span style={{
                position: "absolute",
                top: "3px",
                right: "3px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
                border: "2px solid #0f172a",
                boxShadow: "0 0 8px #10b981"
              }} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
