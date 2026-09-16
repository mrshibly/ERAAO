import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const backendUrl = process.env.BACKEND_URL || "https://eraao-backend.onrender.com";

  try {
    const res = await fetch(`${backendUrl}/api/v1/courses/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const course = await res.json();
      return {
        title: course.title ? `${course.title} — Syllabus & Enrollment` : "Bootcamp Syllabus — ERAAO",
        description: course.short_description || "Professional practitioner course syllabus and training at ERAAO Academy.",
        alternates: {
          canonical: `/academy/courses/${slug}`,
        },
        openGraph: {
          title: course.title,
          description: course.short_description,
          url: `https://www.eraao.com/academy/courses/${slug}`,
          images: course.thumbnail_url ? [{ url: course.thumbnail_url }] : undefined,
        },
      };
    }
  } catch {}

  return {
    title: "Course Syllabus Details",
    alternates: {
      canonical: `/academy/courses/${slug}`,
    },
  };
}

export default function CourseDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
