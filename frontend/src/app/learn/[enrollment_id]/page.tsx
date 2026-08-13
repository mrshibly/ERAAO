"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import CustomModal from "@/components/CustomModal";
import { BookOpen, CheckSquare, Square, ChevronRight, ArrowLeft, PlayCircle, FileText, Award, HelpCircle, Download } from "lucide-react";

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const { token, loading } = useAuth();
  const enrollmentId = params.enrollment_id as string;

  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set());
  const [certificate, setCertificate] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<{ [qIdx: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "info" as "info" | "danger" | "confirm" | "success",
    title: "",
    message: ""
  });

  const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);

  // Reset quiz states when lesson changes
  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(false);
    setQuizScore(0);
  }, [activeLesson]);

  useEffect(() => {
    if (loading) return;
    if (!token) {
      router.push("/login");
      return;
    }

    const loadData = async () => {
      try {
        const res = await fetch(`/api/v1/enrollments/${enrollmentId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setCourse(data.course);
          const mods = data.course?.modules || [];
          setModules(mods);

          if (data.certificate) {
            setCertificate(data.certificate);
          }

          // Pick initial lesson
          if (mods.length > 0 && mods[0].lessons?.length > 0) {
            setActiveLesson(mods[0].lessons[0]);
          }

          // Load completed lesson IDs from backend response
          const doneSet = new Set<string>();
          if (Array.isArray(data.completed_lessons)) {
            data.completed_lessons.forEach((id: string) => doneSet.add(String(id)));
          } else if (Array.isArray(data.progress)) {
            data.progress.forEach((p: any) => {
              if (p.is_completed || p.status === "completed") doneSet.add(String(p.lesson_id || p));
            });
          }
          setCompletedLessonIds(doneSet);
        } else {
          const errData = await res.json().catch(() => ({}));
          setError(errData.detail || errData.message || "Enrollment not found or unauthorized.");
        }
      } catch (err) {
        console.error("Error loading enrollment:", err);
        setError("Error connecting to course server.");
      } finally {
        setFetching(false);
      }
    };

    loadData();
  }, [enrollmentId, token, loading, router]);

  const handleToggleComplete = async (lessonId: string) => {
    const isDone = completedLessonIds.has(lessonId);
    const newDoneState = !isDone;

    try {
      const res = await fetch(`/api/v1/enrollments/${enrollmentId}/progress`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          lesson_id: lessonId,
          status: newDoneState ? "completed" : "not_started"
        })
      });

      if (res.status === 401) {
        setModalConfig({
          isOpen: true,
          type: "danger",
          title: "Session Expired",
          message: "Your session has expired. Please log in again."
        });
        router.push("/login");
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setModalConfig({
          isOpen: true,
          type: "info",
          title: "Progress Update",
          message: body.detail || "Failed to update progress."
        });
        return;
      }

      setCompletedLessonIds((prev) => {
        const next = new Set(prev);
        if (newDoneState) {
          next.add(lessonId);
        } else {
          next.delete(lessonId);
        }
        return next;
      });

      // Auto advance to next lesson if completing
      if (newDoneState) {
        let allLessons: any[] = [];
        modules.forEach(m => {
          if (m.lessons) allLessons.push(...m.lessons);
        });
        const currentIdx = allLessons.findIndex(l => l.id === lessonId);
        if (currentIdx !== -1 && currentIdx < allLessons.length - 1) {
          setActiveLesson(allLessons[currentIdx + 1]);
        }
      }

    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  if (fetching) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <p>Loading course environment...</p>
      </div>
    );
  }

  if (error || (!fetching && !course)) {
    return (
      <div style={{ maxWidth: "550px", margin: "5rem auto", padding: "3rem 2rem", textAlign: "center", background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)" }}>
        <BookOpen size={42} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Enrollment Not Found</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
          {error || "The requested enrollment could not be found or you do not have permission to access it."}
        </p>
        <button
          onClick={() => router.push("/dashboard/student/courses")}
          style={{ background: "var(--accent-blue)", color: "white", padding: "0.65rem 1.35rem", borderRadius: "var(--radius-md)", fontWeight: 700, border: "none", cursor: "pointer" }}
        >
          Back to My Courses
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "calc(100vh - 64px)", overflow: "hidden", background: "var(--bg-secondary)" }}>
      
      {/* Left Sidebar: Modules & Lessons Navigation */}
      <div style={{ width: "320px", borderRight: "1px solid var(--border-color)", background: "white", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-color)" }}>
          <button onClick={() => router.push("/dashboard/student/courses")} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            <ArrowLeft size={14} /> Back to Courses
          </button>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {course?.title || "Course Player"}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.75rem" }}>
            <div style={{ flex: 1, height: "6px", background: "#e2e8f0", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", background: "var(--accent-emerald)", width: `${totalLessons ? Math.round((completedLessonIds.size / totalLessons) * 100) : 0}%`, transition: "width 0.3s ease" }} />
            </div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)" }}>
              {totalLessons ? Math.round((completedLessonIds.size / totalLessons) * 100) : 0}%
            </span>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 0" }}>
          {modules.map((mod: any, mIdx: number) => (
            <div key={mod.id || mIdx} style={{ marginBottom: "1rem" }}>
              <div style={{ padding: "0.5rem 1.5rem", fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Module {mIdx + 1}: {mod.title}
              </div>
              <div>
                {mod.lessons?.map((les: any) => {
                  const isActive = activeLesson?.id === les.id;
                  const isDone = completedLessonIds.has(les.id);
                  return (
                    <button
                      key={les.id}
                      onClick={() => setActiveLesson(les)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.75rem 1.25rem",
                        width: "100%",
                        border: "none",
                        background: isActive ? "rgba(14, 165, 233, 0.05)" : "transparent",
                        borderLeft: isActive ? "3px solid var(--accent-blue)" : "3px solid transparent",
                        cursor: "pointer",
                        textAlign: "left",
                        color: isActive ? "var(--accent-blue)" : "var(--text-primary)",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "85%" }}>
                        {(les.content_type || les.type) === "quiz" ? (
                          <HelpCircle size={16} style={{ color: "var(--accent-violet)" }} />
                        ) : (les.content_type || les.type) === "video" ? (
                          <PlayCircle size={16} />
                        ) : (
                          <FileText size={16} />
                        )}
                        <span style={{ fontSize: "0.875rem", fontWeight: isActive ? 600 : 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {les.title}
                        </span>
                      </div>
                      <span onClick={(e) => { e.stopPropagation(); handleToggleComplete(les.id); }} style={{ color: isDone ? "var(--accent-emerald)" : "var(--text-muted)" }}>
                        {isDone ? <CheckSquare size={16} /> : <Square size={16} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel: Main Lesson Content Area */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        
        {/* Graduation Banner when completed */}
        {totalLessons > 0 && completedLessonIds.size === totalLessons && (
          <div style={{
            background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))",
            color: "white",
            padding: "2rem 2.5rem",
            margin: "2rem auto 0 auto",
            maxWidth: "45rem",
            width: "calc(100% - 6rem)",
            borderRadius: "12px",
            boxShadow: "var(--shadow-md)"
          }}>
            <span style={{ fontSize: "0.7rem", background: "rgba(255,255,255,0.25)", color: "white", padding: "0.25rem 0.6rem", borderRadius: "20px", fontWeight: 700, textTransform: "uppercase" }}>
              Course Completed!
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.5rem" }}>Congratulations, Graduate! 🎓</h2>
            <p style={{ opacity: 0.9, fontSize: "0.95rem", marginTop: "0.35rem" }}>
              You have completed all syllabus requirements and earned your official certificate!
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
              {certificate?.verification_id && (
                <Link
                  href={`/verify/${certificate.verification_id}`}
                  style={{ background: "white", color: "#0f172a", padding: "0.6rem 1.25rem", borderRadius: "6px", fontSize: "0.9rem", fontWeight: 800, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                >
                  <Award size={18} style={{ color: "#0ea5e9" }} /> View & Verify Official Certificate
                </Link>
              )}
              {certificate?.pdf_url && (
                <a href={certificate.pdf_url} download target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,0.2)", color: "white", padding: "0.6rem 1.25rem", borderRadius: "6px", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "1px solid rgba(255,255,255,0.3)" }}>
                  <Download size={18} /> Download PDF
                </a>
              )}
            </div>
          </div>
        )}

        {activeLesson ? (
          <div style={{ padding: "3rem", maxWidth: "45rem", margin: "0 auto", width: "100%" }}>
            <div style={{ marginBottom: "2rem" }}>
              <span style={{ fontSize: "0.75rem", background: "rgba(14, 165, 233, 0.1)", color: "var(--accent-blue)", padding: "0.25rem 0.5rem", borderRadius: "4px", fontWeight: 700, textTransform: "uppercase" }}>
                Active Lesson
              </span>
              <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.5rem" }}>{activeLesson.title}</h1>
            </div>

            {/* QUIZ LESSON PLAYER */}
            {(activeLesson.content_type || activeLesson.type) === "quiz" ? (
              (() => {
                let quizQuestions: any[] = [];
                let parseError = false;
                try {
                  const raw = activeLesson.content_body || "[]";
                  const parsed = JSON.parse(raw);
                  if (Array.isArray(parsed)) {
                    quizQuestions = parsed;
                  } else if (parsed && parsed.questions && Array.isArray(parsed.questions)) {
                    quizQuestions = parsed.questions;
                  } else if (parsed && parsed.question) {
                    quizQuestions = [parsed];
                  }
                } catch {
                  parseError = true;
                }

                const handleSubmitQuiz = () => {
                  if (quizQuestions.length === 0) return;
                  let correctCount = 0;
                  quizQuestions.forEach((q: any, idx: number) => {
                    const targetAns = q.answer !== undefined ? q.answer : q.answer_index;
                    if (quizAnswers[idx] === targetAns) {
                      correctCount++;
                    }
                  });
                  const score = Math.round((correctCount / quizQuestions.length) * 100);
                  setQuizScore(score);
                  setQuizSubmitted(true);
                  const passed = score >= 70;
                  setQuizPassed(passed);

                  if (passed) {
                    if (!completedLessonIds.has(activeLesson.id)) {
                      handleToggleComplete(activeLesson.id);
                    }
                  }
                };

                return (
                  <div style={{ background: "white", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", padding: "2.5rem", boxShadow: "var(--shadow-sm)", marginBottom: "2rem" }}>
                    <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={{ fontWeight: 800, fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
                        <Award style={{ color: "var(--accent-violet)" }} size={22} /> Certification Knowledge Check
                      </h3>
                      <span style={{ fontSize: "0.8rem", background: "rgba(124, 58, 237, 0.1)", color: "var(--accent-violet)", padding: "0.25rem 0.6rem", borderRadius: "4px", fontWeight: 700 }}>
                        Passing Grade: 70%
                      </span>
                    </div>

                    {parseError || quizQuestions.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "2rem 0", color: "var(--text-secondary)" }}>
                        <HelpCircle size={40} style={{ margin: "0 auto 1rem auto", color: "var(--text-muted)", opacity: 0.5 }} />
                        <p style={{ fontWeight: 600 }}>Practice exam questions are not configured yet.</p>
                      </div>
                    ) : (
                      <div>
                        {!quizSubmitted ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                            {quizQuestions.map((q: any, qIdx: number) => (
                              <div key={qIdx} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                <h4 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>
                                  {qIdx + 1}. {q.question}
                                </h4>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                  {q.options?.map((opt: string, oIdx: number) => {
                                    const isChecked = quizAnswers[qIdx] === oIdx;
                                    return (
                                      <label
                                        key={oIdx}
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "0.75rem",
                                          padding: "0.75rem 1rem",
                                          border: isChecked ? "2px solid var(--accent-violet)" : "1px solid var(--border-color)",
                                          background: isChecked ? "rgba(124, 58, 237, 0.02)" : "transparent",
                                          borderRadius: "8px",
                                          cursor: "pointer",
                                          fontSize: "0.9rem",
                                          fontWeight: isChecked ? 600 : 500
                                        }}
                                      >
                                        <input
                                          type="radio"
                                          name={`question-${qIdx}`}
                                          checked={isChecked}
                                          onChange={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                                          style={{ accentColor: "var(--accent-violet)" }}
                                        />
                                        <span>{opt}</span>
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                            
                            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
                              <button
                                onClick={handleSubmitQuiz}
                                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                                style={{
                                  background: Object.keys(quizAnswers).length < quizQuestions.length ? "var(--text-muted)" : "var(--accent-violet)",
                                  color: "white", border: "none", padding: "0.6rem 1.5rem", borderRadius: "6px",
                                  fontWeight: 700, cursor: Object.keys(quizAnswers).length < quizQuestions.length ? "not-allowed" : "pointer"
                                }}
                              >
                                Submit Examination
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                            <div style={{
                              width: "5rem", height: "5rem", borderRadius: "50%",
                              background: quizPassed ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                              color: quizPassed ? "var(--accent-emerald)" : "#ef4444",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              margin: "0 auto 1.5rem auto"
                            }}>
                              <Award size={36} />
                            </div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                              {quizPassed ? "Exam Passed! 🎉" : "Exam Failed"}
                            </h3>
                            <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                              You scored <strong>{quizScore}%</strong> on this examination.
                            </p>

                            {quizPassed ? (
                              <div style={{ marginTop: "1.5rem" }}>
                                <p style={{ fontSize: "0.9rem", color: "var(--accent-emerald)", fontWeight: 600 }}>
                                  Lesson marked as completed! Continue to the next syllabus module.
                                </p>
                              </div>
                            ) : (
                              <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                                  A minimum score of <strong>70%</strong> is required to pass.
                                </p>
                                <button
                                  onClick={() => {
                                    setQuizAnswers({});
                                    setQuizSubmitted(false);
                                    setQuizPassed(false);
                                    setQuizScore(0);
                                  }}
                                  style={{
                                    background: "none", border: "1px solid var(--border-color)",
                                    padding: "0.5rem 1.25rem", borderRadius: "6px",
                                    fontWeight: 600, cursor: "pointer", color: "var(--text-primary)"
                                  }}
                                >
                                  Retake Examination
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <>
                {/* VIDEO OR MATERIAL PLAYER */}
                {(activeLesson.content_type || activeLesson.type) === "video" ? (
                  <div style={{ width: "100%", height: "24rem", borderRadius: "var(--radius-md)", background: "#0f172a", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2.5rem", boxShadow: "var(--shadow-md)" }}>
                    <PlayCircle size={64} style={{ color: "var(--accent-blue)", opacity: 0.9 }} />
                    <span style={{ fontSize: "0.9rem", color: "#94a3b8" }}>{activeLesson.content_url || "Secure Video Lecture"}</span>
                  </div>
                ) : (
                  <div style={{ width: "100%", height: "8rem", border: "1px dashed var(--border-color)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "white", marginBottom: "2.5rem" }}>
                    <FileText size={32} style={{ color: "var(--accent-teal)" }} />
                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-secondary)" }}>Downloadable Resource & Lab Document</span>
                  </div>
                )}

                <div style={{ background: "white", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", padding: "2rem", boxShadow: "var(--shadow-sm)" }}>
                  <h3 style={{ fontWeight: 700, marginBottom: "0.75rem" }}>Lesson Overview</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.975rem", lineHeight: 1.6 }}>
                    {activeLesson.content_body || activeLesson.content || "Welcome to this syllabus lecture. Please proceed with the curriculum outline and resources."}
                  </p>
                </div>

                <div style={{ marginTop: "3rem", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => handleToggleComplete(activeLesson.id)}
                    className="btn btn-primary"
                    style={{
                      backgroundColor: completedLessonIds.has(activeLesson.id) ? "var(--accent-emerald)" : "var(--text-primary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}
                  >
                    <CheckSquare size={18} />
                    <span>
                      {completedLessonIds.has(activeLesson.id) ? "Completed" : "Mark as Complete & Next"}
                    </span>
                  </button>
                </div>
              </>
            )}

          </div>
        ) : (
          <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
            <p>Select a lesson from the menu sidebar to begin learning.</p>
          </div>
        )}
      </div>

      <CustomModal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
}
