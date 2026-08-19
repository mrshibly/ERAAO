"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MessageSquareCode, X, Send, Sparkles, RefreshCw, ShieldCheck, Award, Phone, Bot } from "lucide-react";

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
      content: "Hello! I am your ERAAO Solutions Advisor.\n\nWhether you are looking for hands-on cybersecurity courses, custom AI software builds, or penetration testing for your business, feel free to ask me anything. How can I help you today?"
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
                    color: "var(--accent-blue)",
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
                  color: "var(--accent-blue)",
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
          backgroundColor: "var(--card-bg)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-xl)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginBottom: "1rem",
          animation: "fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          transformOrigin: "bottom right",
          border: "1px solid var(--border-color)"
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, var(--bg-dark) 0%, #1e293b 100%)",
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
                borderRadius: "var(--radius-md)",
                background: "var(--accent-blue-bg)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Sparkles size={20} style={{ color: "var(--accent-blue-light)" }} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 800, letterSpacing: "-0.01em", color: "#ffffff" }}>
                    ERAAO AI Assistant
                  </span>
                  <span style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-success)"
                  }} />
                </div>
                <div style={{ fontSize: "var(--text-xs)", color: "#94a3b8", fontWeight: 600 }}>
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
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "var(--transition-fast)"
                }}
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
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "var(--transition-fast)"
                }}
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
            background: "var(--bg-secondary)"
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
                    borderRadius: "var(--radius-sm)",
                    background: "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-violet) 100%)",
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
                    backgroundColor: msg.role === "user" ? "var(--accent-blue)" : "var(--card-bg)",
                    color: msg.role === "user" ? "#ffffff" : "var(--text-primary)",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "var(--shadow-sm)",
                    border: msg.role === "user" ? "none" : "1px solid var(--border-color)",
                    fontSize: "var(--text-sm)",
                    lineHeight: 1.5,
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
                  borderRadius: "var(--radius-sm)",
                  background: "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-violet) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <Bot size={16} style={{ color: "#ffffff" }} />
                </div>
                <div style={{
                  backgroundColor: "var(--card-bg)",
                  padding: "0.6rem 0.85rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", fontWeight: 600 }}>ERAAO AI is writing</span>
                  <span style={{ display: "inline-flex", gap: "4px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-blue)" }} />
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-violet)" }} />
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-teal)" }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Pills */}
          <div style={{
            padding: "0.65rem 1rem",
            background: "var(--card-bg)",
            borderTop: "1px solid var(--border-color)",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem 0.5rem",
            maxWidth: "100%"
          }}>
            {[
              { text: "Which course is right for me?", label: "Course Recommendations", icon: Award },
              { text: "How does penetration testing work?", label: "Security Testing", icon: ShieldCheck },
              { text: "Can I get a custom quote?", label: "Instant Quote", icon: MessageSquareCode },
              { text: "Schedule a consultation call", label: "Discovery Call", icon: Phone }
            ].map((pill, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(pill.text)}
                className="filter-pill"
                style={{
                  fontSize: "var(--text-xs)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem"
                }}
              >
                <pill.icon size={13} style={{ color: "var(--accent-blue)" }} />
                <span>{pill.label}</span>
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div style={{
            padding: "0.85rem 1rem 1rem",
            background: "var(--card-bg)",
            borderTop: "1px solid var(--border-color)"
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
                className="input-field"
                style={{ flex: 1 }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="btn btn-primary"
                style={{
                  width: "38px",
                  height: "38px",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "var(--radius-md)"
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-primary"
          style={{
            height: "56px",
            padding: "0 1.5rem",
            borderRadius: "var(--radius-full)",
            boxShadow: "var(--shadow-xl)",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontSize: "var(--text-sm)",
            fontWeight: 800
          }}
        >
          <MessageSquareCode size={22} />
          <span>Ask ERAAO AI</span>
        </button>
      )}
    </div>
  );
}
