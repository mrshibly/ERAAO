"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { FileText, Calendar, ArrowRight, Loader, Search, X, ChevronLeft, ChevronRight, Clock, Tag } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  category_id?: string;
  category?: { id: string; name: string };
  published_at?: string;
  created_at?: string;
}

interface Category {
  id: string;
  name: string;
}

export default function BlogListingPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [total, setTotal] = useState(0);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/v1/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch blog posts with pagination and filters
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.set("page", page.toString());
        queryParams.set("page_size", pageSize.toString());
        if (selectedCategory !== "all") queryParams.set("category_id", selectedCategory);

        const response = await fetch(`/api/v1/blog?${queryParams.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data.items || []);
          setTotal(data.total || 0);
        }
      } catch (err) {
        console.error("Error loading blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, pageSize, selectedCategory]);

  // Client-side search filtering
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter((post) => {
      const title = (post.title || "").toLowerCase();
      const excerpt = (post.excerpt || "").toLowerCase();
      return title.includes(q) || excerpt.includes(q);
    });
  }, [posts, searchQuery]);

  const totalPages = Math.ceil(total / pageSize) || 1;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPage(1);
  };

  const getReadingTime = (text?: string) => {
    if (!text) return "3 min read";
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  return (
    <div style={{ padding: "var(--spacing-section) 0", background: "var(--bg-secondary)", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "62rem" }}>
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge" style={{ background: "rgba(139, 92, 246, 0.1)", color: "var(--accent-violet)" }}>
            Technical Articles &amp; Research
          </span>
          <h1 className="section-title">Intelligence &amp; Analysis</h1>
          <p className="section-subtitle">
            Disclosures, tutorials, and security deep-dives authored by our engineers and threat researchers.
          </p>
        </div>

        {/* Search Bar & Category Pills */}
        <div style={{ marginBottom: "2.5rem" }}>
          
          {/* Live Search Input */}
          <div style={{ position: "relative", marginBottom: "1.25rem", maxWidth: "100%" }}>
            <Search size={18} style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search articles, CVE vulnerabilities, AI architectures, or techniques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: "3rem", paddingRight: "2.75rem", background: "var(--card-bg)" }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "4px" }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Pills (Scrollable on mobile) */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.5rem", WebkitOverflowScrolling: "touch" }}>
            <button
              onClick={() => { setSelectedCategory("all"); setPage(1); }}
              className="btn"
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-xs)",
                fontWeight: selectedCategory === "all" ? 700 : 500,
                background: selectedCategory === "all" ? "var(--accent-violet)" : "var(--card-bg)",
                color: selectedCategory === "all" ? "#ffffff" : "var(--text-secondary)",
                border: `1px solid ${selectedCategory === "all" ? "var(--accent-violet)" : "var(--border-color)"}`,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease"
              }}
            >
              All Topics
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setPage(1); }}
                  className="btn"
                  style={{
                    padding: "0.45rem 1rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "var(--text-xs)",
                    fontWeight: isSelected ? 700 : 500,
                    background: isSelected ? "var(--accent-violet)" : "var(--card-bg)",
                    color: isSelected ? "#ffffff" : "var(--text-secondary)",
                    border: `1px solid ${isSelected ? "var(--accent-violet)" : "var(--border-color)"}`,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease"
                  }}
                >
                  <Tag size={12} style={{ marginRight: "0.3rem", display: "inline" }} />
                  {cat.name}
                </button>
              );
            })}

            {(searchQuery || selectedCategory !== "all") && (
              <button
                onClick={handleResetFilters}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--accent-blue)",
                  cursor: "pointer",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  whiteSpace: "nowrap",
                  padding: "0 0.5rem"
                }}
              >
                <X size={14} /> Clear filters
              </button>
            )}
          </div>

        </div>

        {/* Results Counter */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>
            Showing {filteredPosts.length} publication{filteredPosts.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* List */}
        {loading ? (
          <div className="loading-container">
            <Loader className="animate-spin text-accent" style={{ color: "var(--accent-blue)" }} size={32} />
            <p>Loading publications...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="empty-state card" style={{ padding: "3.5rem 2rem", textAlign: "center" }}>
            <div className="empty-icon" style={{ margin: "0 auto 1rem auto" }}>
              <FileText size={32} />
            </div>
            <h3 className="empty-title">No Articles Found</h3>
            <p className="empty-text">
              No publications matched your search query. Try searching with different keywords or clearing topic filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn btn-accent"
              style={{ marginTop: "1rem" }}
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {filteredPosts.map((post) => (
              <article key={post.id} className="card hover-lift" style={{ padding: "2.25rem", background: "var(--card-bg)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--text-muted)", fontSize: "var(--text-xs)", marginBottom: "0.85rem", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Calendar size={14} />
                    {new Date(post.published_at || post.created_at || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                  <span>&bull;</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Clock size={14} />
                    {getReadingTime(post.excerpt || post.content)}
                  </span>
                  <span>&bull;</span>
                  <span className="badge badge-violet">
                    {post.category?.name || "AI & Cybersecurity"}
                  </span>
                </div>

                <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.3 }}>
                  <Link href={`/blog/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {post.title}
                  </Link>
                </h2>

                <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                  {post.excerpt || "Read full research article, methodologies, and technical deep-dives on the ERAAO platform."}
                </p>

                <Link href={`/blog/${post.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-blue)", fontWeight: 700, fontSize: "var(--text-sm)", textDecoration: "none" }}>
                  <span>Read full publication</span>
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="pagination" style={{ marginTop: "2.5rem" }}>
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="pagination-btn"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = pageNum === page;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`pagination-btn ${isActive ? "active" : ""}`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="pagination-btn"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
