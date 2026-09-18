import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const backendUrl = process.env.BACKEND_URL || "https://eraao.onrender.com";

  try {
    const res = await fetch(`${backendUrl}/api/v1/blog/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const post = await res.json();
      return {
        title: post.title ? `${post.title} | ERAAO Research` : "Article | ERAAO",
        description: post.summary || post.content?.slice(0, 160) || "Research and insights from ERAAO.",
        alternates: {
          canonical: `/blog/${slug}`,
        },
        openGraph: {
          title: post.title,
          description: post.summary,
          url: `https://www.eraao.com/blog/${slug}`,
          images: post.cover_image ? [{ url: post.cover_image }] : undefined,
        },
      };
    }
  } catch {}

  return {
    title: "Article Details",
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
