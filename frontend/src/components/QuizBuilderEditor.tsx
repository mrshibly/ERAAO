"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, HelpCircle, AlertCircle } from "lucide-react";

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

interface QuizBuilderEditorProps {
  initialContent: string;
  onChange: (jsonString: string) => void;
}

export default function QuizBuilderEditor({ initialContent, onChange }: QuizBuilderEditorProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  // Parse initial JSON content into form state
  useEffect(() => {
    try {
      if (initialContent && initialContent.trim().startsWith("[")) {
        const parsed = JSON.parse(initialContent);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setQuestions(parsed);
          return;
        }
      } else if (initialContent && initialContent.trim().startsWith("{")) {
        const parsed = JSON.parse(initialContent);
        if (parsed.questions && Array.isArray(parsed.questions)) {
          setQuestions(parsed.questions);
          return;
        } else if (parsed.question) {
          setQuestions([parsed]);
          return;
        }
      }
    } catch {
      // If parsing fails, fall back to a default question
    }

    // Default starting blank form if empty or new
    setQuestions([
      {
        question: "",
        options: ["", "", "", ""],
        answer: 0,
        explanation: ""
      }
    ]);
  }, [initialContent]);

  // Sync back to JSON string when questions update
  const updateQuestions = (newQuestions: QuizQuestion[]) => {
    setQuestions(newQuestions);
    onChange(JSON.stringify(newQuestions, null, 2));
  };

  const handleAddQuestion = () => {
    const updated = [
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        answer: 0,
        explanation: ""
      }
    ];
    updateQuestions(updated);
  };

  const handleRemoveQuestion = (qIndex: number) => {
    if (questions.length === 1) {
      alert("A quiz must have at least one question.");
      return;
    }
    const updated = questions.filter((_, idx) => idx !== qIndex);
    updateQuestions(updated);
  };

  const handleQuestionTextChange = (qIndex: number, text: string) => {
    const updated = [...questions];
    updated[qIndex].question = text;
    updateQuestions(updated);
  };

  const handleExplanationChange = (qIndex: number, text: string) => {
    const updated = [...questions];
    updated[qIndex].explanation = text;
    updateQuestions(updated);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, text: string) => {
    const updated = [...questions];
    const opts = [...updated[qIndex].options];
    opts[oIndex] = text;
    updated[qIndex].options = opts;
    updateQuestions(updated);
  };

  const handleSelectCorrectAnswer = (qIndex: number, oIndex: number) => {
    const updated = [...questions];
    updated[qIndex].answer = oIndex;
    updateQuestions(updated);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ background: "rgba(139, 92, 246, 0.08)", border: "1px solid rgba(139, 92, 246, 0.2)", borderRadius: "var(--radius-md)", padding: "1rem", color: "var(--text-primary)", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <HelpCircle size={20} style={{ color: "var(--accent-violet)", flexShrink: 0 }} />
        <div>
          <strong>Visual Quiz Builder:</strong> Create multiple-choice questions easily. Click the green checkmark next to an option to set it as the correct answer.
        </div>
      </div>

      {/* Questions Cards List */}
      {questions.map((q, qIdx) => (
        <div
          key={qIdx}
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-sm)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--accent-violet)", textTransform: "uppercase" }}>
              Question #{qIdx + 1}
            </span>
            <button
              type="button"
              onClick={() => handleRemoveQuestion(qIdx)}
              style={{
                background: "rgba(239, 68, 68, 0.08)",
                color: "#ef4444",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                padding: "0.35rem 0.65rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem"
              }}
            >
              <Trash2 size={13} /> Remove Question
            </button>
          </div>

          {/* Question Input */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
              Question Prompt / Problem Statement
            </label>
            <input
              type="text"
              placeholder="e.g. What does SQL injection target?"
              value={q.question}
              onChange={(e) => handleQuestionTextChange(qIdx, e.target.value)}
              style={{
                width: "100%",
                padding: "0.65rem 0.85rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                fontSize: "0.9rem",
                fontWeight: 600
              }}
            />
          </div>

          {/* Options Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Answer Options & Correct Answer Selection:
            </label>

            {q.options.map((opt, oIdx) => {
              const isCorrect = q.answer === oIdx;
              return (
                <div
                  key={oIdx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "var(--radius-md)",
                    border: isCorrect ? "2px solid #10b981" : "1px solid var(--border-color)",
                    background: isCorrect ? "rgba(16, 185, 129, 0.06)" : "var(--bg-primary)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectCorrectAnswer(qIdx, oIdx)}
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      color: isCorrect ? "#10b981" : "var(--text-muted)",
                      padding: 0
                    }}
                    title={isCorrect ? "Correct Choice" : "Mark as Correct Answer"}
                  >
                    <CheckCircle2 size={22} style={{ strokeWidth: isCorrect ? 2.5 : 1.5 }} />
                  </button>

                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: isCorrect ? "#10b981" : "var(--text-secondary)", minWidth: "24px" }}>
                    {String.fromCharCode(65 + oIdx)}.
                  </span>

                  <input
                    type="text"
                    placeholder={`Option ${String.fromCharCode(65 + oIdx)} text...`}
                    value={opt}
                    onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
                    style={{
                      flex: 1,
                      padding: "0.45rem 0.65rem",
                      borderRadius: "6px",
                      border: "1px solid var(--border-color)",
                      background: "var(--bg-primary)",
                      color: "var(--text-primary)",
                      fontSize: "0.85rem"
                    }}
                  />

                  {isCorrect && (
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#10b981", textTransform: "uppercase" }}>
                      Correct Answer
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation Input */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
              Explanation / Solution Hint (Optional)
            </label>
            <input
              type="text"
              placeholder="Provide context explaining why this answer is correct..."
              value={q.explanation || ""}
              onChange={(e) => handleExplanationChange(qIdx, e.target.value)}
              style={{
                width: "100%",
                padding: "0.55rem 0.75rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                fontSize: "0.825rem"
              }}
            />
          </div>
        </div>
      ))}

      {/* Add Question Button */}
      <button
        type="button"
        onClick={handleAddQuestion}
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: "var(--radius-md)",
          background: "var(--bg-primary)",
          border: "2px dashed var(--accent-violet)",
          color: "var(--accent-violet)",
          fontWeight: 800,
          fontSize: "0.9rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem"
        }}
      >
        <Plus size={18} /> Add Another Question
      </button>
    </div>
  );
}
