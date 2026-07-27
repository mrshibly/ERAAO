"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MessageSquareCode, X, Send, Sparkles, RefreshCw, Zap, ShieldCheck, BrainCircuit, Award, Phone } from "lucide-react";

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
      content: "Hello! I am the **ERAAO AI Assistant** — *Lighting the future.* ⚡\n\nHow can I help you today? Explore our AI Engineering, Cybersecurity Services, or Practitioner Bootcamps!"
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
            content: data.reply || "I am currently offline. Please try again in a moment."
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
          content: "I'm having trouble connecting to the network right now. You can explore our [Academy Bootcamps](/academy), [Security Services](/services), or [Book a Consultation](/book)."
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
        content: "Chat history cleared. How can I assist you with ERAAO's AI or Cybersecurity services?"
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
                    textUnderlineOffset: "2px"
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
                  textUnderlineOffset: "2px"
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
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 9999 }}>
      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div style={{
          width: "380px",
          maxHeight: "580px",
          height: "calc(100vh - 120px)",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 25px 60px -15px rgba(15, 23, 42, 0.3), 0 0 0 1px rgba(226, 232, 240, 0.8)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginBottom: "1rem",
          animation: "heroFadeIn 0.25s ease-out forwards"
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            color: "#ffffff",
            padding: "1.1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 12px rgba(14, 165, 233, 0.4)"
              }}>
                <Sparkles size={18} style={{ color: "#ffffff" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
                  ERAAO AI Assistant
                </div>
                <div style={{ fontSize: "0.72rem", color: "#38bdf8", fontWeight: 600 }}>
                  Lighting the future.
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                onClick={handleClearChat}
                title="Clear Chat"
                style={{
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  padding: "0.3rem",
                  borderRadius: "6px"
                }}
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                style={{
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  padding: "0.3rem",
                  borderRadius: "6px"
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div style={{
            flex: 1,
            padding: "1rem 1.25rem",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            background: "#f8fafc"
          }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  backgroundColor: msg.role === "user" ? "#0ea5e9" : "#ffffff",
                  color: msg.role === "user" ? "#ffffff" : "#0f172a",
                  padding: "0.85rem 1.1rem",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  boxShadow: msg.role === "user" ? "0 4px 12px rgba(14, 165, 233, 0.25)" : "0 2px 8px rgba(15, 23, 42, 0.06)",
                  border: msg.role === "user" ? "none" : "1px solid #e2e8f0",
                  fontSize: "0.9rem",
                  lineHeight: 1.55,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word"
                }}
              >
                {renderFormattedMessage(msg.content)}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div style={{
                alignSelf: "flex-start",
                backgroundColor: "#ffffff",
                padding: "0.75rem 1rem",
                borderRadius: "18px 18px 18px 4px",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>ERAAO AI is thinking</span>
                <span style={{ display: "inline-flex", gap: "3px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", animation: "float 1s infinite alternate" }} />
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7c3aed", animation: "float 1s infinite 0.2s alternate" }} />
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0d9488", animation: "float 1s infinite 0.4s alternate" }} />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Pills */}
          <div style={{
            padding: "0.6rem 1rem",
            background: "#ffffff",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            scrollbarWidth: "none"
          }}>
            {[
              { text: "What courses do you offer?", icon: Award },
              { text: "Book a Pentest Audit", icon: ShieldCheck },
              { text: "Schedule Consultation", icon: Phone }
            ].map((pill, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(pill.text)}
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#475569",
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  flexShrink: 0
                }}
              >
                <pill.icon size={12} style={{ color: "#0ea5e9" }} />
                <span>{pill.text}</span>
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div style={{
            padding: "0.75rem 1rem 1rem",
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
                placeholder="Ask about AI or Cybersecurity..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: "0.7rem 1rem",
                  fontSize: "0.88rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "12px",
                  outline: "none",
                  background: "#ffffff"
                }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: inputValue.trim() ? "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)" : "#e2e8f0",
                  color: "white",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: inputValue.trim() ? "pointer" : "not-allowed",
                  boxShadow: inputValue.trim() ? "0 4px 12px rgba(14, 165, 233, 0.3)" : "none"
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
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
          boxShadow: "0 10px 30px rgba(14, 165, 233, 0.4), 0 0 0 4px rgba(14, 165, 233, 0.15)",
          position: "relative",
          transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        }}
      >
        {isOpen ? (
          <X size={26} />
        ) : (
          <>
            <MessageSquareCode size={28} style={{ color: "#38bdf8" }} />
            {/* Live Indicator Dot */}
            <span style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              border: "2px solid #0f172a"
            }} />
          </>
        )}
      </button>
    </div>
  );
}
