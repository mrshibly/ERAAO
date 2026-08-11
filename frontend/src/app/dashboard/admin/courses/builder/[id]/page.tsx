"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BrandLoader from "@/components/BrandLoader";
import CustomModal from "@/components/CustomModal";
import QuizBuilderEditor from "@/components/QuizBuilderEditor";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft, Plus, Trash2, Edit3, Save, Video, FileText, CheckSquare,
  HelpCircle, ChevronUp, ChevronDown, Eye, CheckCircle, AlertCircle,
  Layers, FileCode, Sparkles, BookOpen, Clock, FileCheck, Award
} from "lucide-react";

export default function CourseSyllabusBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.id;

  const router = useRouter();
  const { token, user, loading } = useAuth();

  const [course, setCourse] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [savingStatus, setSavingStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "info" as "info" | "danger" | "confirm" | "success",
    title: "",
    message: "",
    confirmText: "Confirm",
    onConfirm: undefined as (() => void) | undefined
  });

  // Active selection state
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // New module modal state inline
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [isAddingModule, setIsAddingModule] = useState(false);

  // Editor form state for selected lesson
  const [lessonForm, setLessonForm] = useState({
    id: "",
    title: "",
    content_type: "text",
    content_url: "",
    content_body: "",
    duration_minutes: 15,
    is_free_preview: false
  });

  const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const fetchCourseData = async () => {
    try {
      // 1. Fetch managed courses to get slug or direct details
      const res = await fetch(`/api/v1/courses/managed?page=1&page_size=100`, { headers });
      if (res.ok) {
        const body = await res.json();
        const found = (body.items || []).find((c: any) => c.id === courseId);
        if (found) {
          // Fetch full course details with modules by slug
          const detailsRes = await fetch(`/api/v1/courses/${found.slug}`, { headers });
          if (detailsRes.ok) {
            const data = await detailsRes.json();
            setCourse(data);
            if (data.modules && data.modules.length > 0 && !activeModuleId) {
              setActiveModuleId(data.modules[0].id);
              if (data.modules[0].lessons && data.modules[0].lessons.length > 0) {
                selectLesson(data.modules[0].lessons[0]);
              }
            }
          }
        }
      }
    } catch (err) {
      console.error("Error loading course for builder:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (token) fetchCourseData();
  }, [token, courseId]);

  const selectLesson = (lesson: any) => {
    setActiveLessonId(lesson.id);
    setLessonForm({
      id: lesson.id,
      title: lesson.title || "",
      content_type: lesson.content_type || "text",
      content_url: lesson.content_url || "",
      content_body: lesson.content_body || "",
      duration_minutes: lesson.duration_minutes || 15,
      is_free_preview: lesson.is_free_preview || false
    });
  };

  // Add Module
  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;

    setSavingStatus("Adding module...");
    try {
      const order = (course?.modules?.length || 0) + 1;
      const res = await fetch(`/api/v1/courses/${courseId}/modules`, {
        method: "POST",
        headers,
        body: JSON.stringify({ title: newModuleTitle, order })
      });

      if (res.ok) {
        setNewModuleTitle("");
        setIsAddingModule(false);
        showMessage("Module added successfully!");
        await fetchCourseData();
      } else {
        showMessage("Failed to add module.", "error");
      }
    } catch {
      showMessage("Error connecting to server.", "error");
    } finally {
      setSavingStatus(null);
    }
  };

  // Delete Module
  const handleDeleteModule = (moduleId: string) => {
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Delete Module Section",
      message: "Are you sure you want to delete this module section and all its contents?",
      confirmText: "Delete Section",
      onConfirm: async () => {
        setSavingStatus("Deleting module...");
        try {
          const res = await fetch(`/api/v1/courses/modules/${moduleId}`, { method: "DELETE", headers });
          if (res.ok) {
            showMessage("Module deleted.");
            await fetchCourseData();
          } else {
            showMessage("Failed to delete module.", "error");
          }
        } catch {
          showMessage("Error connecting to server.", "error");
        } finally {
          setSavingStatus(null);
        }
      }
    });
  };

  // Add Item to Module (Video, Material, Assignment, Quiz)
  const handleAddItem = async (moduleId: string, type: string) => {
    const targetModule = course?.modules?.find((m: any) => m.id === moduleId);
    const order = (targetModule?.lessons?.length || 0) + 1;

    let defaultTitle = "New Lesson";
    if (type === "video") defaultTitle = "Video Lecture";
    if (type === "material") defaultTitle = "Course Material & Notes";
    if (type === "assignment") defaultTitle = "Practical Assignment";
    if (type === "quiz") defaultTitle = "Knowledge Check Quiz";

    setSavingStatus("Adding item...");
    try {
      const res = await fetch(`/api/v1/courses/modules/${moduleId}/lessons`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: defaultTitle,
          order,
          content_type: type,
          content_body: "",
          content_url: "",
          is_free_preview: false
        })
      });

      if (res.ok) {
        const createdItem = await res.json();
        showMessage(`Added ${type} item!`);
        await fetchCourseData();
        selectLesson(createdItem);
      } else {
        showMessage("Failed to add content item.", "error");
      }
    } catch {
      showMessage("Error connecting to server.", "error");
    } finally {
      setSavingStatus(null);
    }
  };

  // Save Item Details
  const handleSaveLesson = async () => {
    if (!activeLessonId) return;

    setSavingStatus("Saving item...");
    try {
      const res = await fetch(`/api/v1/courses/lessons/${activeLessonId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          title: lessonForm.title,
          content_type: lessonForm.content_type,
          content_url: lessonForm.content_url !== undefined ? lessonForm.content_url : "",
          content_body: lessonForm.content_body !== undefined ? lessonForm.content_body : "",
          duration_minutes: lessonForm.duration_minutes || 0,
          is_free_preview: lessonForm.is_free_preview
        })
      });

      if (res.ok) {
        showMessage("Item updated successfully!");
        await fetchCourseData();
      } else {
        showMessage("Failed to update item.", "error");
      }
    } catch {
      showMessage("Error saving item.", "error");
    } finally {
      setSavingStatus(null);
    }
  };

  // Delete Item
  const handleDeleteLesson = (lessonId: string) => {
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Delete Content Item",
      message: "Are you sure you want to delete this content item?",
      confirmText: "Delete Item",
      onConfirm: async () => {
        setSavingStatus("Deleting item...");
        try {
          const res = await fetch(`/api/v1/courses/lessons/${lessonId}`, { method: "DELETE", headers });
          if (res.ok) {
            showMessage("Item deleted.");
            setActiveLessonId(null);
            await fetchCourseData();
          } else {
            showMessage("Failed to delete item.", "error");
          }
        } catch {
          showMessage("Error deleting item.", "error");
        } finally {
          setSavingStatus(null);
        }
      }
    });
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video size={16} style={{ color: "var(--accent-blue)" }} />;
      case "material":
        return <FileText size={16} style={{ color: "#10b981" }} />;
      case "assignment":
        return <CheckSquare size={16} style={{ color: "#f59e0b" }} />;
      case "quiz":
        return <HelpCircle size={16} style={{ color: "#8b5cf6" }} />;
      default:
        return <BookOpen size={16} style={{ color: "var(--text-secondary)" }} />;
    }
  };

  if (loading || fetching) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "75vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "36px", height: "36px", border: "3px solid rgba(14, 165, 233, 0.2)", borderTopColor: "var(--accent-blue)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem auto" }} />
          <p style={{ color: "var(--text-secondary)", fontWeight: 600 }}>Opening Syllabus Studio...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "90vh", paddingBottom: "3rem" }}>
      <style>{`
        .builder-header {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem 2rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .builder-workspace {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 1.5rem;
          minHeight: 700px;
        }
        @media (max-width: 1024px) {
          .builder-workspace { grid-template-columns: 1fr; }
        }
        .tree-panel {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
        }
        .editor-panel {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 2rem;
        }
        .tree-module-item {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
          overflow: hidden;
        }
        .tree-lesson-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.85rem;
          border-top: 1px solid var(--border-color);
          cursor: pointer;
          font-size: 0.85rem;
          transition: background 0.15s ease;
        }
        .tree-lesson-row:hover {
          background: rgba(14, 165, 233, 0.05);
        }
        .tree-lesson-row.active {
          background: rgba(14, 165, 233, 0.12);
          border-left: 3px solid var(--accent-blue);
          font-weight: 700;
        }
        .type-pill-btn {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 0.35rem 0.6rem;
          border-radius: 6px;
          fontSize: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: var(--text-primary);
          transition: all 0.2s ease;
        }
        .type-pill-btn:hover {
          border-color: var(--accent-blue);
          color: var(--accent-blue);
        }
      `}</style>

      {/* Top Header Bar */}
      <div className="builder-header anim-fade-up">
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <button
            onClick={() => router.push(user?.roles.includes("admin") ? "/dashboard/admin/courses" : "/dashboard/instructor/courses")}
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-md)",
              padding: "0.5rem 0.85rem",
              color: "var(--text-primary)",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem"
            }}
          >
            <ArrowLeft size={16} /> Back to Courses
          </button>

          <div style={{ height: "24px", width: "1px", background: "var(--border-color)" }} />

          <div>
            <div style={{ fontSize: "0.72rem", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Syllabus & Curriculum Studio
            </div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
              {course?.title || "Course Outline Builder"}
            </h1>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          {savingStatus && (
            <span style={{ fontSize: "0.8rem", color: "var(--accent-blue)", fontWeight: 600 }}>
              {savingStatus}
            </span>
          )}

          {message && (
            <div style={{
              padding: "0.4rem 0.85rem",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontWeight: 600,
              background: message.type === "error" ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)",
              color: message.type === "error" ? "#ef4444" : "#10b981",
              border: `1px solid ${message.type === "error" ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)"}`
            }}>
              {message.text}
            </div>
          )}

          <Link
            href={`/academy/courses/${course?.slug}`}
            target="_blank"
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
              padding: "0.55rem 1rem",
              borderRadius: "var(--radius-md)",
              fontWeight: 700,
              fontSize: "0.825rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem"
            }}
          >
            <Eye size={15} /> Preview Syllabus
          </Link>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="builder-workspace">

        {/* Left Column — Modules Tree */}
        <div className="tree-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Layers size={18} style={{ color: "var(--accent-blue)" }} /> Curriculum Tree
            </h2>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
              {course?.modules?.length || 0} Modules
            </span>
          </div>

          {/* Modules List */}
          <div style={{ flex: 1, overflowY: "auto", paddingRight: "0.25rem" }}>
            {(!course?.modules || course.modules.length === 0) ? (
              <div style={{ textAlign: "center", padding: "2rem 1rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                No modules created yet. Add your first section below!
              </div>
            ) : (
              course.modules.sort((a: any, b: any) => a.order - b.order).map((module: any, idx: number) => (
                <div key={module.id} className="tree-module-item">
                  {/* Module Header */}
                  <div style={{ padding: "0.75rem 0.85rem", background: "rgba(14, 165, 233, 0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "0.68rem", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase" }}>
                        Section {idx + 1}
                      </div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: "1.2" }}>
                        {module.title}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteModule(module.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(239, 68, 68, 0.7)", padding: "2px" }}
                      title="Delete Module"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Lessons list inside module */}
                  <div>
                    {(!module.lessons || module.lessons.length === 0) ? (
                      <div style={{ padding: "0.6rem 0.85rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        Empty section. Add items below!
                      </div>
                    ) : (
                      module.lessons.sort((a: any, b: any) => a.order - b.order).map((lesson: any) => (
                        <div
                          key={lesson.id}
                          onClick={() => selectLesson(lesson)}
                          className={`tree-lesson-row ${activeLessonId === lesson.id ? "active" : ""}`}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden" }}>
                            {getItemIcon(lesson.content_type)}
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {lesson.title}
                            </span>
                          </div>
                          <span style={{ fontSize: "0.68rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)" }}>
                            {lesson.content_type}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Quick Add Content Item Bar */}
                  <div style={{ padding: "0.5rem 0.85rem", background: "var(--card-bg)", borderTop: "1px solid var(--border-color)", display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", width: "100%", fontWeight: 600, marginBottom: "0.2rem" }}>
                      + Add Item:
                    </span>
                    <button onClick={() => handleAddItem(module.id, "video")} className="type-pill-btn" title="Add Video Lecture">
                      <Video size={12} /> Video
                    </button>
                    <button onClick={() => handleAddItem(module.id, "material")} className="type-pill-btn" title="Add Reading Material">
                      <FileText size={12} /> Material
                    </button>
                    <button onClick={() => handleAddItem(module.id, "assignment")} className="type-pill-btn" title="Add Practical Assignment">
                      <CheckSquare size={12} /> Task
                    </button>
                    <button onClick={() => handleAddItem(module.id, "quiz")} className="type-pill-btn" title="Add Knowledge Quiz">
                      <HelpCircle size={12} /> Quiz
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Module Section at bottom of tree */}
          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border-color)" }}>
            {isAddingModule ? (
              <form onSubmit={handleAddModule} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <input
                  type="text"
                  placeholder="Module Section Title..."
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid var(--border-color)",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    background: "var(--bg-primary)",
                    color: "var(--text-primary)"
                  }}
                  autoFocus
                />
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: "0.45rem",
                      borderRadius: "6px",
                      background: "var(--accent-blue)",
                      color: "white",
                      border: "none",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    Add Section
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingModule(false)}
                    style={{
                      padding: "0.45rem 0.75rem",
                      borderRadius: "6px",
                      background: "none",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsAddingModule(true)}
                style={{
                  width: "100%",
                  padding: "0.6rem",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-primary)",
                  border: "1px dashed var(--border-color)",
                  color: "var(--accent-blue)",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem"
                }}
              >
                <Plus size={16} /> Add Module Section
              </button>
            )}
          </div>
        </div>

        {/* Right Column — Item Content Editor Canvas */}
        <div className="editor-panel">
          {!activeLessonId ? (
            <div style={{ textAlign: "center", padding: "6rem 2rem", color: "var(--text-secondary)" }}>
              <BookOpen size={48} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>No Item Selected</h3>
              <p style={{ fontSize: "0.9rem", marginTop: "0.35rem", maxWidth: "420px", margin: "0.35rem auto 0 auto" }}>
                Select an item from the left curriculum tree, or click <strong>+ Add Item</strong> to create video lectures, course materials, assignments, or quizzes!
              </p>
            </div>
          ) : (
            <div>
              {/* Item Header & Type Selector */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--border-color)" }}>
                <div style={{ flex: 1, marginRight: "1rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.25rem" }}>
                    Item Type: {lessonForm.content_type}
                  </div>
                  <input
                    type="text"
                    value={lessonForm.title}
                    onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                    placeholder="Enter Item Title..."
                    style={{
                      width: "100%",
                      fontSize: "1.35rem",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      background: "transparent",
                      border: "none",
                      borderBottom: "2px solid var(--border-color)",
                      paddingBottom: "0.25rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <button
                    onClick={handleSaveLesson}
                    style={{
                      background: "var(--accent-blue)",
                      color: "white",
                      border: "none",
                      padding: "0.6rem 1.25rem",
                      borderRadius: "var(--radius-md)",
                      fontWeight: 800,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem"
                    }}
                  >
                    <Save size={16} /> Save Item
                  </button>
                  <button
                    onClick={() => handleDeleteLesson(activeLessonId)}
                    style={{
                      background: "rgba(239, 68, 68, 0.1)",
                      color: "#ef4444",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer"
                    }}
                    title="Delete Item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Type Switcher Tabs */}
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.75rem", flexWrap: "wrap" }}>
                {[
                  { id: "video", label: "📹 Video Lecture", icon: <Video size={14} /> },
                  { id: "material", label: "📄 Course Material", icon: <FileText size={14} /> },
                  { id: "assignment", label: "📝 Assignment / Task", icon: <CheckSquare size={14} /> },
                  { id: "quiz", label: "❓ Quiz Check", icon: <HelpCircle size={14} /> }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setLessonForm({ ...lessonForm, content_type: t.id })}
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "var(--radius-md)",
                      border: lessonForm.content_type === t.id ? "1px solid var(--accent-blue)" : "1px solid var(--border-color)",
                      background: lessonForm.content_type === t.id ? "rgba(14, 165, 233, 0.1)" : "var(--bg-primary)",
                      color: lessonForm.content_type === t.id ? "var(--accent-blue)" : "var(--text-secondary)",
                      fontWeight: lessonForm.content_type === t.id ? 700 : 500,
                      fontSize: "0.85rem",
                      cursor: "pointer"
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Type Specific Editors */}

              {/* 1. VIDEO LECTURE EDITOR */}
              {lessonForm.content_type === "video" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                      Video URL (Vimeo, YouTube, S3, or MP4 Direct Link)
                    </label>
                    <input
                      type="text"
                      placeholder="https://player.vimeo.com/video/..."
                      value={lessonForm.content_url}
                      onChange={(e) => setLessonForm({ ...lessonForm, content_url: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.65rem 0.85rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-primary)",
                        color: "var(--text-primary)",
                        fontSize: "0.875rem"
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                        Video Duration (Minutes)
                      </label>
                      <input
                        type="number"
                        value={lessonForm.duration_minutes}
                        onChange={(e) => setLessonForm({ ...lessonForm, duration_minutes: parseInt(e.target.value) || 0 })}
                        style={{
                          width: "100%",
                          padding: "0.65rem 0.85rem",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--border-color)",
                          background: "var(--bg-primary)",
                          color: "var(--text-primary)",
                          fontSize: "0.875rem"
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginTop: "1.5rem" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
                        <input
                          type="checkbox"
                          checked={lessonForm.is_free_preview}
                          onChange={(e) => setLessonForm({ ...lessonForm, is_free_preview: e.target.checked })}
                          style={{ width: "16px", height: "16px" }}
                        />
                        Allow Free Sample Preview
                      </label>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                      Lecture Notes & Transcripts
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Add lesson summary, code snippets, or key takeaways..."
                      value={lessonForm.content_body}
                      onChange={(e) => setLessonForm({ ...lessonForm, content_body: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-primary)",
                        color: "var(--text-primary)",
                        fontSize: "0.875rem",
                        resize: "vertical"
                      }}
                    />
                  </div>
                </div>
              )}

              {/* 2. COURSE MATERIAL & NOTES EDITOR */}
              {lessonForm.content_type === "material" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                      Downloadable Resource URL (PDF, GitHub, Drive Link)
                    </label>
                    <input
                      type="text"
                      placeholder="https://github.com/example/lab-materials.pdf"
                      value={lessonForm.content_url}
                      onChange={(e) => setLessonForm({ ...lessonForm, content_url: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.65rem 0.85rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-primary)",
                        color: "var(--text-primary)",
                        fontSize: "0.875rem"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                      Course Reading Material / Markdown Content
                    </label>
                    <textarea
                      rows={10}
                      placeholder="Enter detailed documentation, lab guides, or instructions..."
                      value={lessonForm.content_body}
                      onChange={(e) => setLessonForm({ ...lessonForm, content_body: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-primary)",
                        color: "var(--text-primary)",
                        fontSize: "0.875rem",
                        fontFamily: "monospace",
                        resize: "vertical"
                      }}
                    />
                  </div>
                </div>
              )}

              {/* 3. PRACTICAL ASSIGNMENT / TASK EDITOR */}
              {lessonForm.content_type === "assignment" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)", borderRadius: "var(--radius-md)", padding: "1rem", color: "var(--text-primary)", fontSize: "0.85rem" }}>
                    <strong>📝 Assignment Setup:</strong> Students will complete this task and submit their report or lab output link.
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                      Submission Link / External Lab Workspace (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="https://lab.academy.dev/workspace/..."
                      value={lessonForm.content_url}
                      onChange={(e) => setLessonForm({ ...lessonForm, content_url: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.65rem 0.85rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-primary)",
                        color: "var(--text-primary)",
                        fontSize: "0.875rem"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                      Assignment Instructions & Guidelines
                    </label>
                    <textarea
                      rows={8}
                      placeholder="Detail the task steps, required deliverables, and evaluation criteria..."
                      value={lessonForm.content_body}
                      onChange={(e) => setLessonForm({ ...lessonForm, content_body: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-primary)",
                        color: "var(--text-primary)",
                        fontSize: "0.875rem",
                        resize: "vertical"
                      }}
                    />
                  </div>
                </div>
              )}

              {/* 4. KNOWLEDGE CHECK QUIZ EDITOR */}
              {lessonForm.content_type === "quiz" && (
                <QuizBuilderEditor
                  initialContent={lessonForm.content_body}
                  onChange={(jsonString) => setLessonForm({ ...lessonForm, content_body: jsonString })}
                />
              )}
            </div>
          )}
        </div>

      </div>

      <CustomModal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        onConfirm={modalConfig.onConfirm}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
}
