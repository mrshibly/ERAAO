"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Users, Trash2, CheckCircle, XCircle, Search } from "lucide-react";
import CustomModal from "@/components/CustomModal";

export default function AdminUsersPage() {
  const { token, user: currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "info" as "info" | "danger" | "confirm" | "success",
    title: "",
    message: "",
    confirmText: "Confirm",
    onConfirm: undefined as (() => void) | undefined
  });
  
  const [newUserForm, setNewUserForm] = useState({
    email: "", password: "", full_name: "", role: "instructor"
  });

  const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/v1/users?page=1&page_size=100", { headers });
      if (res.ok) {
        const body = await res.json();
        setUsers(body.items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/users", {
        method: "POST",
        headers,
        body: JSON.stringify({
          email: newUserForm.email,
          password: newUserForm.password,
          full_name: newUserForm.full_name,
          roles: [newUserForm.role]
        })
      });
      if (res.ok) {
        showMessage("User created successfully!");
        setNewUserForm({ email: "", password: "", full_name: "", role: "instructor" });
        fetchUsers();
      } else {
        const body = await res.json().catch(() => ({}));
        showMessage(body.detail || "Failed to create user.", "error");
      }
    } catch {
      showMessage("Error connecting to server.", "error");
    }
  };

  const handleUpdateRole = async (userId: string, selectedRole: string) => {
    try {
      const res = await fetch(`/api/v1/users/${userId}/role`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ roles: [selectedRole] })
      });
      if (res.ok) {
        showMessage("User role updated successfully.");
        fetchUsers();
      } else {
        showMessage("Failed to update role.", "error");
      }
    } catch {
      showMessage("Error updating role.", "error");
    }
  };

  const handleDeleteUser = (userId: string) => {
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Soft Delete User Account",
      message: "Are you sure you want to soft-delete this user account?",
      confirmText: "Delete Account",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/v1/users/${userId}`, { method: "DELETE", headers });
          if (res.ok) {
            showMessage("User account deleted successfully.");
            fetchUsers();
          } else {
            showMessage("Failed to delete user.", "error");
          }
        } catch {
          showMessage("Error connecting to server.", "error");
        }
      }
    });
  };

  const filtered = users.filter(u =>
    u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <Users size={24} style={{ color: "var(--accent-blue)" }} /> User Directory
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "var(--text-sm)" }}>Manage platform user profiles, role elevations, and manual teacher creation</p>
      </div>

      {message && (
        <div style={{
          background: message.type === "success" ? "var(--color-success-bg)" : "var(--color-error-bg)",
          color: message.type === "success" ? "var(--color-success)" : "var(--color-error)",
          padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
          border: `1px solid ${message.type === "success" ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
          marginBottom: "1.5rem", fontWeight: 600, fontSize: "var(--text-sm)"
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
        {/* User List */}
        <div className="card" style={{ gridColumn: "span 2", padding: "1.5rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--text-primary)" }}>Registered Users ({filtered.length})</h2>
            <div style={{ position: "relative", width: "100%", maxWidth: "240px" }}>
              <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text" placeholder="Search by name or email..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: "2.25rem" }}
              />
            </div>
          </div>

          {fetching ? (
            <div className="loading-container" style={{ padding: "3rem 0" }}>Loading user list...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state" style={{ padding: "3rem 0" }}>No users match the search parameters.</div>
          ) : (
            <div className="table-container">
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "var(--text-sm)" }}>
                <thead>
                  <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)", color: "var(--text-secondary)", fontWeight: 600 }}>
                    <th style={{ padding: "1rem" }}>Full Name</th>
                    <th style={{ padding: "1rem" }}>Email</th>
                    <th style={{ padding: "1rem" }}>Roles</th>
                    <th style={{ padding: "1rem" }}>States</th>
                    <th style={{ padding: "1rem" }}>Action Override</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>{u.full_name}</td>
                      <td style={{ padding: "1rem", fontFamily: "monospace" }}>{u.email}</td>
                      <td style={{ padding: "1rem" }}>
                        <select 
                          value={u.roles[0] || "student"} 
                          onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                          className="input-field"
                          style={{ padding: "0.3rem 0.6rem", fontSize: "var(--text-xs)", fontWeight: 600, width: "auto" }}
                        >
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="corporate_client">Corporate Client</option>
                          <option value="admin">Administrator</option>
                        </select>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ display: "flex", gap: "1rem" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: u.is_verified ? "var(--color-success)" : "var(--text-muted)", fontSize: "var(--text-xs)", fontWeight: 500 }}>
                            {u.is_verified ? <CheckCircle size={14} /> : <XCircle size={14} />}
                            <span>Verified</span>
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: u.is_active ? "var(--color-success)" : "var(--color-error)", fontSize: "var(--text-xs)", fontWeight: 500 }}>
                            {u.is_active ? <CheckCircle size={14} /> : <XCircle size={14} />}
                            <span>Active</span>
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        {u.id !== currentUser?.id ? (
                          <button 
                            onClick={() => handleDeleteUser(u.id)}
                            style={{ color: "var(--color-error)", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem", fontWeight: 600, fontSize: "var(--text-xs)" }}
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        ) : (
                          <span style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)" }}>Self (Current Actor)</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create User Form */}
        <div className="card" style={{ padding: "1.5rem", height: "fit-content" }}>
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>Add New User</h2>
          <form onSubmit={handleCreateUser} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text" required
                value={newUserForm.full_name}
                onChange={(e) => setNewUserForm({ ...newUserForm, full_name: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email" required
                value={newUserForm.email}
                onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password" required
                value={newUserForm.password}
                onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Assigned Role</label>
              <select
                value={newUserForm.role}
                onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                className="input-field"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="corporate_client">Corporate Client</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
              Create Account
            </button>
          </form>
        </div>
      </div>

      <CustomModal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        onConfirm={modalConfig.onConfirm}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
