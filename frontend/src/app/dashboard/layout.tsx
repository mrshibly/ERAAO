"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { Menu, Shield } from "lucide-react";
import DashboardSidebar from "./Sidebar";

import Logo from "@/components/Logo";
import BrandLoader from "@/components/BrandLoader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    const is_admin = user.roles.includes("admin");
    const is_instructor = user.roles.includes("instructor");

    if (pathname.startsWith("/dashboard/admin") && !is_admin) {
      if (is_instructor) {
        router.push("/dashboard/instructor");
      } else {
        router.push("/dashboard/student");
      }
    } else if (pathname.startsWith("/dashboard/instructor") && !is_instructor && !is_admin) {
      router.push("/dashboard/student");
    }
  }, [user, loading, router, pathname]);

  useEffect(() => {
    // Automatically close mobile menu drawer on route transition
    setMobileOpen(false);
  }, [pathname]);

  if (loading) {
    return <BrandLoader fullScreen message="Opening ERAAO Workspace..." />;
  }

  if (!user) return null;

  return (
    <div className="dashboard-container">
      {/* Mobile Top Header */}
      <div className="mobile-dashboard-header">
        <Logo size={26} />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)" }}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Drawer Overlay Backdrop */}
      <div 
        className={`mobile-sidebar-backdrop ${mobileOpen ? "open" : ""}`} 
        onClick={() => setMobileOpen(false)} 
        aria-label="Close menu"
      />

      {/* Sidebar Component */}
      <DashboardSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Wrapper */}
      <div className={`dashboard-content-wrapper ${collapsed ? "collapsed" : ""}`}>
        <main style={{ flex: 1, padding: "2rem 2.5rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
