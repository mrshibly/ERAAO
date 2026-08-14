"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Home, BookOpen, User, Users, FolderKanban,
  Award, ShieldAlert, LogOut, ChevronDown,
  X, Briefcase, Calendar, ChevronLeft, ChevronRight, PhoneCall,
  Settings, FileText, HelpCircle, Compass
} from "lucide-react";

import Logo from "@/components/Logo";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavCategory {
  title: string;
  items: NavItem[];
}

interface DashboardSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (mobileOpen: boolean) => void;
}

export default function DashboardSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const getInitialWorkspace = () => {
    if (pathname.startsWith("/dashboard/admin")) return "admin";
    if (pathname.startsWith("/dashboard/instructor")) return "instructor";
    if (pathname.startsWith("/dashboard/client")) return "client";
    return "student";
  };

  const [activeWorkspace, setActiveWorkspace] = useState(getInitialWorkspace());

  useEffect(() => {
    setActiveWorkspace(getInitialWorkspace());
  }, [pathname]);

  const handleWorkspaceChange = (workspace: string) => {
    setActiveWorkspace(workspace);
    setMobileOpen(false);
    if (workspace === "admin") {
      router.push("/dashboard/admin");
    } else if (workspace === "instructor") {
      router.push("/dashboard/instructor");
    } else if (workspace === "client") {
      router.push("/dashboard/client");
    } else {
      router.push("/dashboard/student");
    }
  };

  const getInitials = () => {
    if (!user || !user.full_name) return "U";
    return user.full_name
      .split(" ")
      .map((n: string) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const adminCategories: NavCategory[] = [
    {
      title: "Main",
      items: [
        { label: "Overview", href: "/dashboard/admin", icon: <Home size={18} /> },
        { label: "Users", href: "/dashboard/admin/users", icon: <Users size={18} /> },
        { label: "Support Tickets", href: "/dashboard/admin/tickets", icon: <ShieldAlert size={18} /> }
      ]
    },
    {
      title: "Courses & Certificates",
      items: [
        { label: "Courses", href: "/dashboard/admin/courses", icon: <BookOpen size={18} /> },
        { label: "Cohorts", href: "/dashboard/admin/cohorts", icon: <FolderKanban size={18} /> },
        { label: "Certificates", href: "/dashboard/admin/certificates", icon: <Award size={18} /> }
      ]
    },
    {
      title: "Content & Services",
      items: [
        { label: "Blog", href: "/dashboard/admin/blog", icon: <FileText size={18} /> },
        { label: "Careers", href: "/dashboard/admin/careers", icon: <Briefcase size={18} /> },
        { label: "Services", href: "/dashboard/admin/services", icon: <Settings size={18} /> },
        { label: "Bookings", href: "/dashboard/admin/bookings", icon: <Calendar size={18} /> },
        { label: "Messages", href: "/dashboard/admin/contacts", icon: <PhoneCall size={18} /> }
      ]
    }
  ];

  const instructorCategories: NavCategory[] = [
    {
      title: "Instructor Mode",
      items: [
        { label: "Overview", href: "/dashboard/instructor", icon: <Home size={18} /> },
        { label: "My Courses", href: "/dashboard/instructor/courses", icon: <BookOpen size={18} /> },
        { label: "Articles", href: "/dashboard/instructor/blog", icon: <FileText size={18} /> }
      ]
    }
  ];

  const studentCategories: NavCategory[] = [
    {
      title: "My Learning",
      items: [
        { label: "Dashboard", href: "/dashboard/student", icon: <Home size={18} /> },
        { label: "My Courses", href: "/dashboard/student/courses", icon: <BookOpen size={18} /> },
        { label: "My Certificates", href: "/dashboard/student/certificates", icon: <Award size={18} /> }
      ]
    },
    {
      title: "Explore & Support",
      items: [
        { label: "Find Courses", href: "/dashboard/student/catalog", icon: <Compass size={18} /> },
        { label: "Get Help", href: "/dashboard/student/tickets", icon: <HelpCircle size={18} /> },
        { label: "My Profile", href: "/dashboard/profile", icon: <User size={18} /> }
      ]
    }
  ];

  const categories = activeWorkspace === "admin"
    ? adminCategories
    : activeWorkspace === "instructor"
    ? instructorCategories
    : studentCategories;

  return (
    <aside className={`dashboard-sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
      {/* Sidebar Top Header with Logo */}
      <div className="dashboard-sidebar-header">
        {collapsed ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <Logo size={28} withText={false} href={null} />
            <button
              onClick={() => setCollapsed(false)}
              className="sidebar-expand-btn desktop-only-table"
              title="Expand Sidebar"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <Logo size={32} withText={true} textColor="var(--text-primary)" href={null} />
            <button
              onClick={() => setCollapsed(true)}
              className="sidebar-toggle-btn desktop-only-table"
              title="Collapse Sidebar"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        )}
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="nav-mobile-btn"
            title="Close Drawer"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="dashboard-sidebar-content">
        {categories.map((cat, index) => (
          <div key={index} className="dashboard-sidebar-group">
            {!collapsed && <div className="dashboard-sidebar-group-title">{cat.title}</div>}
            {cat.items.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`dashboard-sidebar-item ${isActive ? "active" : ""}`}
                  title={collapsed ? item.label : undefined}
                >
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Sidebar Footer — User Profile Card */}
      <div className="dashboard-sidebar-footer">
        {user && user.roles.length > 1 && !collapsed && (
          <div className="sidebar-workspace-select-wrapper">
            <select
              value={activeWorkspace}
              onChange={(e) => handleWorkspaceChange(e.target.value)}
              className="sidebar-workspace-select"
            >
              {user.roles.includes("admin") && <option value="admin">Admin Mode</option>}
              {(user.roles.includes("instructor") || user.roles.includes("admin")) && (
                <option value="instructor">Instructor Mode</option>
              )}
              <option value="student">Student Mode</option>
            </select>
            <ChevronDown size={12} className="sidebar-workspace-chevron" />
          </div>
        )}

        <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: collapsed ? "center" : "flex-start" }}>
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="sidebar-user-btn"
          >
            <div className="sidebar-user-avatar">
              {getInitials()}
            </div>
            {!collapsed && (
              <div style={{ textAlign: "left", overflow: "hidden", width: "100%" }}>
                <div className="nav-dropdown-name">
                  {user?.full_name}
                </div>
                <div className="nav-dropdown-email">
                  {user?.email}
                </div>
              </div>
            )}
          </button>

          {userDropdownOpen && (
            <div className={`sidebar-user-dropdown ${collapsed ? "collapsed-pos" : ""}`}>
              <Link
                href="/dashboard/profile"
                onClick={() => setUserDropdownOpen(false)}
                className="dropdown-item"
              >
                <User size={14} /> <span>Profile Settings</span>
              </Link>
              <button
                onClick={() => { logout(); setUserDropdownOpen(false); }}
                className="dropdown-item dropdown-item-danger"
              >
                <LogOut size={14} /> <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
