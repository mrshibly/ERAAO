import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Course Catalog",
  description: "Explore practitioner tracks in cybersecurity, AI models, and hands-on lab bootcamps."
};

export default function StudentCatalogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
