import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academy Catalog & Practitioner Tracks",
  description: "Explore curated cybersecurity and applied AI bootcamps with hands-on practice labs and official certification."
};

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
