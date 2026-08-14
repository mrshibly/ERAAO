"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Calendar, ArrowRight, Loader, Search, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogListingPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
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

  // Client-side search filtering on current page or search query
  const filteredPosts = posts.filter((post) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const title = (post.title || "").toLowerCase();
    const excerpt = (post.excerpt || "").toLowerCase();
    return title.includes(q) || excerpt.includes(q);
  });

  const totalPages = Math.ceil(total / pageSize) || 1;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPage(1);
  };

  return (
    <div style={{ padding: "var(--spacing-section) 0", background: "var(--bg-secondary)", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "58rem" }}>
        
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

        {/* Controls Bar: Search & Category Filter */}
        <div className="controls-bar" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
          {/* Live Search Input */}
          <div style={{ flex: "1 1 260px", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search articles, vulnerabilities, or techniques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: "2.75rem", paddingRight: "2.5rem" }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Dropdown Filter */}
          <div style={{ flex: "0 1 200px" }}>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="input-field"
              style={{ cursor: "pointer" }}
            >
              <option value="all">All Topics</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          {(searchQuery || selectedCategory !== "all") && (
            <button
              onClick={handleResetFilters}
              className="btn btn-outline"
              style={{ padding: "0.6rem 1rem", fontSize: "var(--text-sm)" }}
            >
              <X size={14} /> <span>Clear</span>
            </button>
          )}

          {/* Results Summary */}
          <span className="results-counter" style={{ marginLeft: "auto" }}>
            Showing {filteredPosts.length > 0 ? (page - 1) * pageSize + 1 : 0}-{Math.min(page * pageSize, total)} of {total} publications
          </span>
        </div>

        {/* List */}
        {loading ? (
          <div className="loading-container">
            <Loader className="animate-spin text-accent" style={{ color: "var(--accent-blue)" }} size={32} />
            <p>Loading publications...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="empty-state card">
            <div className="empty-icon">
              <FileText size={28} />
            </div>
            <h3 className="empty-title">No Articles Found</h3>
            <p className="empty-text">
              No publications matched your search criteria. Try modifying your search keywords or topic filter.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn btn-accent"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {filteredPosts.map((post) => (
              <article key={post.id} className="card hover-lift" style={{ padding: "2.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-muted)", fontSize: "var(--text-xs)", marginBottom: "0.75rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Calendar size={14} />
                    {new Date(post.published_at || post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                  <span>&bull;</span>
                  <span className="badge badge-violet">
                    AI &amp; Cybersecurity
                  </span>
                </div>

                <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                  <Link href={`/blog/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {post.title}
                  </Link>
                </h2>

                <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-base)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  {post.excerpt}
                </p>

                <Link href={`/blog/${post.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--accent-blue)", fontWeight: 700, fontSize: "var(--text-sm)", textDecoration: "none" }}>
                  <span>Read full analysis</span>
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="pagination">
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
