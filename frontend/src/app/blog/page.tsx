"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Calendar, ArrowRight, Loader, Search, X, ChevronLeft, ChevronRight, Filter } from "lucide-react";

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
    <div style={{ padding: "4rem 0", background: "var(--bg-secondary)", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "58rem" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            display: "inline-block",
            background: "rgba(139, 92, 246, 0.08)",
            color: "var(--accent-violet)",
            padding: "0.35rem 1rem",
            borderRadius: "4px",
            fontSize: "0.8rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "1rem"
          }}>
            Technical Articles & Research
          </span>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Intelligence & Analysis</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginTop: "0.5rem", maxWidth: "36rem", margin: "0.5rem auto 0 auto" }}>
            Disclosures, tutorials, and security deep-dives authored by our engineers and threat researchers.
          </p>
        </div>

        {/* Controls Bar: Search & Category Filter */}
        <div style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem 1.5rem",
          marginBottom: "2.5rem",
          boxShadow: "var(--shadow-sm)",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center"
        }}>
          {/* Live Search Input */}
          <div style={{ flex: "1 1 260px", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search articles, vulnerabilities, or techniques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.7rem 2.5rem 0.7rem 2.75rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                fontSize: "0.9rem",
                outline: "none"
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
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
              style={{
                width: "100%",
                padding: "0.7rem 1rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                fontSize: "0.9rem",
                outline: "none",
                cursor: "pointer"
              }}
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
              style={{
                padding: "0.65rem 1rem",
                background: "none",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem"
              }}
            >
              <X size={14} /> Clear
            </button>
          )}

          {/* Results Summary */}
          <span style={{ marginLeft: "auto", fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: 600 }}>
            Showing {filteredPosts.length > 0 ? (page - 1) * pageSize + 1 : 0}-{Math.min(page * pageSize, total)} of {total} publications
          </span>
        </div>

        {/* List */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
            <Loader className="animate-spin text-accent" style={{ color: "var(--accent-blue)" }} size={32} />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "4rem 2rem", textAlign: "center" }}>
            <FileText size={42} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>No Articles Found</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              No publications matched your search criteria. Try modifying your search keywords or topic filter.
            </p>
            <button
              onClick={handleResetFilters}
              style={{
                background: "var(--accent-violet)",
                color: "white",
                padding: "0.6rem 1.25rem",
                borderRadius: "var(--radius-md)",
                fontWeight: 700,
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer"
              }}
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {filteredPosts.map((post) => (
              <article key={post.id} style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-lg)",
                padding: "2.5rem",
                boxShadow: "var(--shadow-sm)",
                transition: "var(--transition-all)"
              }} className="hover-lift">
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Calendar size={14} />
                    {new Date(post.published_at || post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                  <span>&bull;</span>
                  <span style={{ textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", color: "var(--accent-violet)" }}>
                    AI & Cybersecurity
                  </span>
                </div>

                <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                  <Link href={`/blog/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {post.title}
                  </Link>
                </h2>

                <p style={{ color: "var(--text-secondary)", fontSize: "1.025rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  {post.excerpt}
                </p>

                <Link href={`/blog/${post.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--accent-blue)", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
                  <span>Read full analysis</span>
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "3.5rem"
          }}>
            {/* Previous Page Button */}
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.65rem 1rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
                background: page === 1 ? "var(--bg-primary)" : "var(--card-bg)",
                color: page === 1 ? "var(--text-muted)" : "var(--text-primary)",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: page === 1 ? "not-allowed" : "pointer"
              }}
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = pageNum === page;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "var(--radius-md)",
                    border: isActive ? "1px solid var(--accent-violet)" : "1px solid var(--border-color)",
                    background: isActive ? "var(--accent-violet)" : "var(--card-bg)",
                    color: isActive ? "white" : "var(--text-primary)",
                    fontWeight: 800,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Page Button */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.65rem 1rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
                background: page === totalPages ? "var(--bg-primary)" : "var(--card-bg)",
                color: page === totalPages ? "var(--text-muted)" : "var(--text-primary)",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: page === totalPages ? "not-allowed" : "pointer"
              }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
