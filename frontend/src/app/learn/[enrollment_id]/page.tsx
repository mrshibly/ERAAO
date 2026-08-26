"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import CustomModal from "@/components/CustomModal";
import {
  BookOpen, CheckSquare, Square, ArrowLeft, PlayCircle, FileText,
  Award, HelpCircle, Download, Menu, X, ChevronLeft, ChevronRight,
  Keyboard, Volume2, VolumeX, Maximize, CheckCircle2
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  content_type?: string;
  type?: string;
  content_url?: string;
  content_body?: string;
  content?: string;
  duration_minutes?: number;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const { token, loading } = useAuth();
  const enrollmentId = params.enrollment_id as string;

  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set());
  const [certificate, setCertificate] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mobile syllabus drawer
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);

  // Video player reference & auto-pause
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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

  const allLessons: Lesson[] = modules.flatMap(m => m.lessons || []);
  const totalLessons = allLessons.length;
  const currentLessonIndex = allLessons.findIndex(l => l.id === activeLesson?.id);
  const hasPrevious = currentLessonIndex > 0;
  const hasNext = currentLessonIndex !== -1 && currentLessonIndex < allLessons.length - 1;

  // Auto-pause video helper
  const pauseVideo = useCallback(() => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Reset quiz states & pause video when lesson changes
  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(false);
    setQuizScore(0);
    setIsPlaying(false);
  }, [activeLesson]);

  // Auto-pause video when opening mobile syllabus drawer
  useEffect(() => {
    if (mobileDrawerOpen) {
      pauseVideo();
    }
  }, [mobileDrawerOpen, pauseVideo]);

  // Load course & enrollment data
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
          const mods: Module[] = data.course?.modules || [];
          setModules(mods);

          if (data.certificate) {
            setCertificate(data.certificate);
          }

          // Pick initial lesson
          if (mods.length > 0 && mods[0].lessons?.length > 0) {
            setActiveLesson(mods[0].lessons[0]);
          }

          // Load completed lesson IDs
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

  // Keyboard navigation & media shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keystrokes when user is typing in text fields
      const activeTag = (document.activeElement?.tagName || "").toLowerCase();
      if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") {
        return;
      }

      if (e.key === "Escape") {
        setMobileDrawerOpen(false);
        setShortcutsModalOpen(false);
      } else if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setShortcutsModalOpen(prev => !prev);
      } else if (e.key === " " || e.key === "k" || e.key === "K") {
        // Toggle play / pause
        if (videoRef.current) {
          e.preventDefault();
          if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      } else if (e.key === "m" || e.key === "M") {
        // Toggle mute
        if (videoRef.current) {
          e.preventDefault();
          videoRef.current.muted = !videoRef.current.muted;
          setIsMuted(videoRef.current.muted);
        }
      } else if (e.key === "f" || e.key === "F") {
        // Fullscreen
        if (videoRef.current) {
          e.preventDefault();
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          } else {
            videoRef.current.requestFullscreen().catch(() => {});
          }
        }
      } else if (e.shiftKey && (e.key === "N" || e.key === "n")) {
        // Shift + N: Next lesson
        if (hasNext) {
          e.preventDefault();
          pauseVideo();
          setActiveLesson(allLessons[currentLessonIndex + 1]);
        }
      } else if (e.shiftKey && (e.key === "P" || e.key === "p")) {
        // Shift + P: Previous lesson
        if (hasPrevious) {
          e.preventDefault();
          pauseVideo();
          setActiveLesson(allLessons[currentLessonIndex - 1]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasNext, hasPrevious, currentLessonIndex, allLessons, pauseVideo]);

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

      // Auto-advance to next lesson if marking complete
      if (newDoneState && hasNext) {
        pauseVideo();
        setActiveLesson(allLessons[currentLessonIndex + 1]);
      }

    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  // Convert raw video URL (e.g. YouTube / Vimeo) to embed URL
  const getVideoEmbed = (url?: string) => {
    if (!url) return null;
    const u = url.trim();
    if (u.includes("youtube.com/watch?v=")) {
      const videoId = u.split("v=")[1]?.split("&")[0];
      return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1`;
    }
    if (u.includes("youtu.be/")) {
      const videoId = u.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1`;
    }
    if (u.includes("vimeo.com/")) {
      const videoId = u.split("vimeo.com/")[1]?.split("?")[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return null;
  };

  if (fetching) {
    return (
      <div className="loading-container" style={{ minHeight: "80vh" }}>
        <p>Loading interactive classroom...</p>
      </div>
    );
  }

  if (error || (!fetching && !course)) {
    return (
      <div className="empty-state card" style={{ maxWidth: "550px", margin: "5rem auto", padding: "3rem 2rem" }}>
        <BookOpen size={42} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
        <h2 className="empty-title">Enrollment Not Found</h2>
        <p className="empty-text">
          {error || "The requested enrollment could not be found or you do not have permission to access it."}
        </p>
        <button
          onClick={() => router.push("/dashboard/student/courses")}
          className="btn btn-primary"
          style={{ marginTop: "1rem" }}
        >
          Back to My Courses
        </button>
      </div>
    );
  }

  const completionPct = totalLessons ? Math.round((completedLessonIds.size / totalLessons) * 100) : 0;
  const embedUrl = getVideoEmbed(activeLesson?.content_url);
  const isDirectVideo = activeLesson?.content_url && (
    activeLesson.content_url.endsWith(".mp4") ||
    activeLesson.content_url.endsWith(".webm") ||
    activeLesson.content_url.endsWith(".m3u8")
  );

  return (
    <div className="learn-layout-container">
      
      {/* Mobile Top Bar */}
      <div className="learn-mobile-topbar">
        <button
          onClick={() => router.push("/dashboard/student/courses")}
          style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "var(--text-xs)", fontWeight: 600 }}
        >
          <ArrowLeft size={16} /> Courses
        </button>

        <button
          onClick={() => setMobileDrawerOpen(prev => !prev)}
          className="btn btn-outline"
          style={{ padding: "0.35rem 0.75rem", fontSize: "var(--text-xs)", display: "flex", alignItems: "center", gap: "0.4rem" }}
        >
          <Menu size={14} />
          <span>Syllabus ({completedLessonIds.size}/{totalLessons})</span>
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileDrawerOpen && (
        <div className="learn-sidebar-backdrop" onClick={() => setMobileDrawerOpen(false)} />
      )}

      {/* Left Sidebar: Modules & Lessons Navigation Drawer */}
      <div className={`learn-sidebar ${mobileDrawerOpen ? "open" : ""}`}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-color)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <button
              onClick={() => router.push("/dashboard/student/courses")}
              style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "var(--text-xs)", fontWeight: 600 }}
            >
              <ArrowLeft size={14} /> Back to Courses
            </button>
            
            {/* Mobile close button */}
            <button
              onClick={() => setMobileDrawerOpen(false)}
              className="mobile-toggle"
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
            >
              <X size={18} />
            </button>
          </div>

          <h2 style={{ fontSize: "var(--text-base)", fontWeight: 800, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {course?.title || "Course Player"}
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.75rem" }}>
            <div className="progress-bar" style={{ flex: 1, height: "6px" }}>
              <div className="progress-bar-fill" style={{ background: "var(--color-success)", width: `${completionPct}%` }} />
            </div>
            <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-secondary)" }}>
              {completionPct}%
            </span>
          </div>
        </div>

        {/* Lesson List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem 0" }}>
          {modules.map((mod: Module, mIdx: number) => (
            <div key={mod.id || mIdx} style={{ marginBottom: "1rem" }}>
              <div style={{ padding: "0.5rem 1.5rem", fontSize: "var(--text-xs)", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Module {mIdx + 1}: {mod.title}
              </div>
              <div>
                {mod.lessons?.map((les: Lesson) => {
                  const isActive = activeLesson?.id === les.id;
                  const isDone = completedLessonIds.has(les.id);
                  return (
                    <button
                      key={les.id}
                      onClick={() => {
                        pauseVideo();
                        setActiveLesson(les);
                        setMobileDrawerOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.75rem 1.25rem",
                        width: "100%",
                        border: "none",
                        background: isActive ? "var(--accent-blue-bg)" : "transparent",
                        borderLeft: isActive ? "3px solid var(--accent-blue)" : "3px solid transparent",
                        cursor: "pointer",
                        textAlign: "left",
                        color: isActive ? "var(--accent-blue)" : "var(--text-primary)",
                        transition: "var(--transition-fast)"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", width: "85%" }}>
                        {(les.content_type || les.type) === "quiz" ? (
                          <HelpCircle size={16} style={{ color: "var(--accent-violet)", flexShrink: 0 }} />
                        ) : (les.content_type || les.type) === "video" ? (
                          <PlayCircle size={16} style={{ color: "var(--accent-blue)", flexShrink: 0 }} />
                        ) : (
                          <FileText size={16} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                        )}
                        <span style={{ fontSize: "var(--text-sm)", fontWeight: isActive ? 600 : 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {les.title}
                        </span>
                      </div>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleComplete(les.id);
                        }}
                        style={{ color: isDone ? "var(--color-success)" : "var(--text-muted)", cursor: "pointer", padding: "4px" }}
                        title={isDone ? "Mark as not completed" : "Mark as completed"}
                      >
                        {isDone ? <CheckSquare size={16} /> : <Square size={16} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer with Keyboard Shortcut helper */}
        <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            onClick={() => setShortcutsModalOpen(true)}
            style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "var(--text-xs)" }}
          >
            <Keyboard size={14} /> Shortcuts (<kbd>?</kbd>)
          </button>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
            {completedLessonIds.size} of {totalLessons} done
          </span>
        </div>
      </div>

      {/* Right panel: Main Lesson Content Area */}
      <div className="learn-main-content">
        
        {/* Graduation Banner when completed */}
        {totalLessons > 0 && completedLessonIds.size === totalLessons && (
          <div style={{
            background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))",
            color: "white",
            padding: "2rem 2.5rem",
            margin: "1.5rem auto 0 auto",
            maxWidth: "52rem",
            width: "calc(100% - 2rem)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-md)"
          }}>
            <span className="badge" style={{ background: "rgba(255,255,255,0.25)", color: "white", marginBottom: "0.5rem" }}>
              Course Completed!
            </span>
            <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, marginTop: "0.5rem" }}>Congratulations on Completing the Bootcamp!</h2>
            <p style={{ opacity: 0.9, fontSize: "var(--text-sm)", marginTop: "0.35rem" }}>
              You have completed all curriculum requirements and earned your official certificate!
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
              {certificate?.verification_id && (
                <Link
                  href={`/verify/${certificate.verification_id}`}
                  className="btn btn-outline"
                  style={{ background: "white", color: "#0f172a", fontSize: "var(--text-sm)" }}
                >
                  <Award size={18} style={{ color: "var(--accent-blue)" }} /> View &amp; Verify Official Certificate
                </Link>
              )}
              {certificate?.pdf_url && (
                <a href={certificate.pdf_url} download target="_blank" rel="noreferrer" className="btn btn-outline" style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: "var(--text-sm)" }}>
                  <Download size={18} /> Download PDF
                </a>
              )}
            </div>
          </div>
        )}

        {activeLesson ? (
          <div className="learn-content-inner">
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span className="badge badge-blue">
                  Lesson {currentLessonIndex + 1} of {totalLessons}
                </span>
                {completedLessonIds.has(activeLesson.id) && (
                  <span className="badge badge-green" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                    <CheckCircle2 size={12} /> Completed
                  </span>
                )}
              </div>
              <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                {activeLesson.title}
              </h1>
            </div>

            {/* VIDEO PLAYER COMPONENT */}
            {(activeLesson.content_type || activeLesson.type) === "video" && (
              <div className="learn-video-wrapper">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    className="learn-video-element"
                    title={activeLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : isDirectVideo ? (
                  <video
                    ref={videoRef}
                    src={activeLesson.content_url}
                    controls
                    className="learn-video-element"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => {
                      if (!completedLessonIds.has(activeLesson.id)) {
                        handleToggleComplete(activeLesson.id);
                      }
                    }}
                  />
                ) : (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", color: "white" }}>
                    <PlayCircle size={64} style={{ color: "var(--accent-blue)", opacity: 0.9 }} />
                    <span style={{ fontSize: "var(--text-sm)", color: "#94a3b8" }}>
                      {activeLesson.content_url || "Secure Practitioner Video Lecture"}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* QUIZ LESSON PLAYER */}
            {(activeLesson.content_type || activeLesson.type) === "quiz" && (
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
                  <div className="card" style={{ padding: "2.5rem", boxShadow: "var(--shadow-sm)", marginBottom: "2rem" }}>
                    <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={{ fontWeight: 800, fontSize: "var(--text-lg)", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0, color: "var(--text-primary)" }}>
                        <Award style={{ color: "var(--accent-violet)" }} size={22} /> Certification Knowledge Check
                      </h3>
                      <span className="badge badge-violet">
                        Passing Grade: 70%
                      </span>
                    </div>

                    {parseError || quizQuestions.length === 0 ? (
                      <div className="empty-state">
                        <HelpCircle size={40} style={{ margin: "0 auto 1rem auto", color: "var(--text-muted)", opacity: 0.5 }} />
                        <p style={{ fontWeight: 600 }}>Practice exam questions are not configured yet.</p>
                      </div>
                    ) : (
                      <div>
                        {!quizSubmitted ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                            {quizQuestions.map((q: any, qIdx: number) => (
                              <div key={qIdx} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                <h4 style={{ fontWeight: 700, fontSize: "var(--text-base)", color: "var(--text-primary)" }}>
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
                                          background: isChecked ? "rgba(124, 58, 237, 0.04)" : "transparent",
                                          borderRadius: "var(--radius-md)",
                                          cursor: "pointer",
                                          fontSize: "var(--text-sm)",
                                          fontWeight: isChecked ? 600 : 500,
                                          color: "var(--text-primary)"
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
                                className="btn btn-accent"
                                style={{
                                  backgroundColor: Object.keys(quizAnswers).length < quizQuestions.length ? "var(--text-muted)" : "var(--accent-violet)",
                                  cursor: Object.keys(quizAnswers).length < quizQuestions.length ? "not-allowed" : "pointer"
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
                              background: quizPassed ? "var(--color-success-bg)" : "var(--color-error-bg)",
                              color: quizPassed ? "var(--color-success)" : "var(--color-error)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              margin: "0 auto 1.5rem auto"
                            }}>
                              <Award size={36} />
                            </div>
                            <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)" }}>
                              {quizPassed ? "Exam Passed Successfully" : "Exam Not Passed"}
                            </h3>
                            <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "var(--text-sm)" }}>
                              You scored <strong>{quizScore}%</strong> on this examination.
                            </p>

                            {quizPassed ? (
                              <div style={{ marginTop: "1.5rem" }}>
                                <p style={{ fontSize: "var(--text-sm)", color: "var(--color-success)", fontWeight: 600 }}>
                                  Lesson marked as completed! Continue to the next syllabus module.
                                </p>
                              </div>
                            ) : (
                              <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                                  A minimum score of <strong>70%</strong> is required to pass.
                                </p>
                                <button
                                  onClick={() => {
                                    setQuizAnswers({});
                                    setQuizSubmitted(false);
                                    setQuizPassed(false);
                                    setQuizScore(0);
                                  }}
                                  className="btn btn-outline"
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
            )}

            {/* DOCUMENT / READING MATERIAL */}
            {(activeLesson.content_type || activeLesson.type) !== "video" && (activeLesson.content_type || activeLesson.type) !== "quiz" && (
              <div style={{ width: "100%", height: "8rem", border: "1px dashed var(--border-color)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "var(--card-bg)", marginBottom: "2rem" }}>
                <FileText size={32} style={{ color: "var(--accent-teal)" }} />
                <div>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--text-primary)", display: "block" }}>
                    Interactive Lab Guide &amp; Resources
                  </span>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                    Read through the instructions below before executing commands in your practice terminal.
                  </span>
                </div>
              </div>
            )}

            {/* LESSON BODY / OVERVIEW */}
            <div className="card" style={{ padding: "2rem", boxShadow: "var(--shadow-sm)" }}>
              <h3 style={{ fontWeight: 700, marginBottom: "0.75rem", color: "var(--text-primary)" }}>Lesson Content</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {activeLesson.content_body || activeLesson.content || "Welcome to this syllabus lecture. Please proceed with the curriculum outline and resources."}
              </p>
            </div>

          </div>
        ) : (
          <div className="empty-state" style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
            <p>Select a lesson from the menu sidebar to begin learning.</p>
          </div>
        )}

        {/* STICKY BOTTOM NAVIGATION BAR */}
        {activeLesson && (
          <div className="learn-bottom-bar">
            <div>
              {hasPrevious ? (
                <button
                  onClick={() => {
                    pauseVideo();
                    setActiveLesson(allLessons[currentLessonIndex - 1]);
                  }}
                  className="btn btn-outline"
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", fontSize: "var(--text-sm)" }}
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}
            </div>

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <button
                onClick={() => handleToggleComplete(activeLesson.id)}
                className="btn btn-primary"
                style={{
                  backgroundColor: completedLessonIds.has(activeLesson.id) ? "var(--color-success)" : "var(--accent-blue)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1.25rem",
                  fontSize: "var(--text-sm)"
                }}
              >
                <CheckSquare size={16} />
                <span>
                  {completedLessonIds.has(activeLesson.id) ? "Completed" : "Complete & Next"}
                </span>
                {hasNext && <ChevronRight size={16} />}
              </button>
            </div>
          </div>
        )}

      </div>

      {/* KEYBOARD SHORTCUTS MODAL */}
      {shortcutsModalOpen && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(4px)", zIndex: 120, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
          onClick={() => setShortcutsModalOpen(false)}
        >
          <div
            className="card"
            style={{ maxWidth: "420px", width: "100%", padding: "2rem", boxShadow: "var(--shadow-xl)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
                <Keyboard size={20} style={{ color: "var(--accent-blue)" }} /> Player Shortcuts
              </h3>
              <button onClick={() => setShortcutsModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "var(--text-sm)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-color)" }}>
                <span>Play / Pause</span>
                <kbd style={{ background: "var(--bg-secondary)", padding: "0.15rem 0.5rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontWeight: 700 }}>Space / K</kbd>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-color)" }}>
                <span>Toggle Mute</span>
                <kbd style={{ background: "var(--bg-secondary)", padding: "0.15rem 0.5rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontWeight: 700 }}>M</kbd>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-color)" }}>
                <span>Toggle Fullscreen</span>
                <kbd style={{ background: "var(--bg-secondary)", padding: "0.15rem 0.5rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontWeight: 700 }}>F</kbd>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-color)" }}>
                <span>Next Lesson</span>
                <kbd style={{ background: "var(--bg-secondary)", padding: "0.15rem 0.5rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontWeight: 700 }}>Shift + N</kbd>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-color)" }}>
                <span>Previous Lesson</span>
                <kbd style={{ background: "var(--bg-secondary)", padding: "0.15rem 0.5rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontWeight: 700 }}>Shift + P</kbd>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Close Drawers</span>
                <kbd style={{ background: "var(--bg-secondary)", padding: "0.15rem 0.5rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontWeight: 700 }}>Esc</kbd>
              </div>
            </div>
          </div>
        </div>
      )}

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
