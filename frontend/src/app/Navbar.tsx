"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User, LogOut, Layout, Menu, X, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [dropdownOpen]);

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.roles.includes("admin")) return "/dashboard/admin";
    if (user.roles.includes("instructor")) return "/dashboard/instructor";
    if (user.roles.includes("corporate_client")) return "/dashboard/client";
    return "/dashboard/student";
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

  return (
    <header className="header">
      <div className="nav">
        {/* Brand Logo with generous breathing room */}
        <div className="nav-brand-wrap">
          <Logo size={38} />
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle nav-mobile-btn"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links & Action Buttons */}
        <nav className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link href="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/academy" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Academy
              </Link>
            </li>
            <li>
              <Link href="/academy#learning-cycle" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Learning Cycle
              </Link>
            </li>
            <li>
              <Link href="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                <span>Services</span>
                <span className="nav-enterprise-pill">
                  Enterprise
                </span>
              </Link>
            </li>
          </ul>

          <div className="nav-actions">
            <Link 
              href="/academy" 
              className="btn btn-accent nav-btn-sm" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Browse Bootcamps</span>
              <ArrowRight size={14} />
            </Link>

            {user ? (
              <div className="nav-dropdown-wrap" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="nav-avatar-btn"
                  aria-label="User menu"
                  aria-expanded={dropdownOpen}
                >
                  {getInitials()}
                </button>

                {dropdownOpen && (
                  <div className="nav-dropdown">
                    <div className="nav-dropdown-header">
                      <div className="nav-dropdown-name">{user.full_name}</div>
                      <div className="nav-dropdown-email">{user.email}</div>
                    </div>
                    
                    <Link 
                      href={getDashboardLink()} 
                      onClick={() => { setDropdownOpen(false); setMobileMenuOpen(false); }}
                      className="dropdown-item"
                    >
                      <Layout size={16} />
                      <span>Workspace</span>
                    </Link>

                    <button 
                      onClick={() => { logout(); setDropdownOpen(false); setMobileMenuOpen(false); }}
                      className="dropdown-item dropdown-item-danger"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/login" 
                className="btn btn-primary nav-btn-sm" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={14} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
