"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Award } from "lucide-react";

export default function InstructorDashboard() {
  const router = useRouter();
  const { user, token, loading } = useAuth();
  
  const [data, setData] = useState<any>({ total_courses: 0, courses: [] });
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user || (!user.roles?.includes("instructor") && !user.roles?.includes("admin"))) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { "Authorization": `Bearer ${token}` };
        const res = await fetch("/api/v1/dashboard/instructor/overview", { headers });
        if (res.ok) {
          setData(await res.json());
        }
      } catch (err) {
        console.error("Error fetching instructor data:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [user, token, loading, router]);

  if (loading || fetching) {
    return (
      <div className="loading-container" style={{ padding: "8rem 0" }}>
        Loading instructor workspace...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "80vh" }}>
      {/* Banner */}
      <div className="card" style={{ padding: "2rem", marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-violet)" }}>
          <Award size={20} />
          <span style={{ fontWeight: 600, fontSize: "var(--text-xs)", textTransform: "uppercase" }}>Instructor Workspace</span>
        </div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-primary)" }}>Welcome, {user?.full_name}</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)" }}>Manage your course curricula, syllabus lectures, and view student progress stats.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>
        {/* Stats overview */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="stat-card">
            <div className="stat-label">Courses Published</div>
            <div className="stat-value">{data.total_courses}</div>
          </div>
          
          <div className="card" style={{ padding: "1.75rem" }}>
            <h4 style={{ fontWeight: 700, fontSize: "var(--text-base)", marginBottom: "1rem", color: "var(--text-primary)" }}>Academic Guidelines</h4>
            <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
              <li>Course drafts must be approved by security admins before going live.</li>
              <li>Ensure all code snippets compile and lab challenges are functional.</li>
              <li>Support ticket requests must be answered within 24 hours.</li>
            </ul>
          </div>
        </div>

        {/* Course list */}
        <div style={{ gridColumn: "span 2" }}>
          <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
            <BookOpen size={22} style={{ color: "var(--accent-violet)" }} />
            Direct Curricula Under Direction
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {data.courses.length === 0 ? (
              <div className="empty-state card" style={{ padding: "4rem 2rem" }}>
                <p className="empty-text">No active courses assigned to you.</p>
              </div>
            ) : (
              data.courses.map((course: any) => (
                <div key={course.course_id} className="card" style={{ padding: "1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                  <div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span className="badge badge-violet">
                        Status: {course.status?.toUpperCase()}
                      </span>
                    </div>
                    <h4 style={{ fontWeight: 700, fontSize: "var(--text-base)", marginTop: "0.5rem", color: "var(--text-primary)" }}>{course.title}</h4>
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                      Enrolled Students: <strong style={{ color: "var(--text-primary)" }}>{course.enrolled_students} Practitioners</strong>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
