"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { PhoneCall, User, LogOut, Layout, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click (VIS-5)
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      <div className="container nav">
        
        {/* Brand Logo */}
        <Logo size={30} />
        
        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle nav-mobile-btn"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links & Buttons */}
        <nav className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li><Link href="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link href="/academy" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Academy</Link></li>
            <li><Link href="/services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</Link></li>
            <li><Link href="/careers" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Careers</Link></li>
            <li><Link href="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
            <li><Link href="/blog" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Blog</Link></li>
          </ul>
          
          <div className="nav-actions">
            <Link href="/book" className="btn btn-outline nav-btn-sm" onClick={() => setMobileMenuOpen(false)}>
              <PhoneCall size={16} />
              <span>Consultation</span>
            </Link>

            {user ? (
              <div className="nav-dropdown-wrap" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="nav-avatar-btn"
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
              <Link href="/login" className="btn btn-primary nav-btn-sm" onClick={() => setMobileMenuOpen(false)}>
                <User size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
