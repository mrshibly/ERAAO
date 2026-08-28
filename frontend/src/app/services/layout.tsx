import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise AI & Cybersecurity Services",
  description: "Enterprise penetration testing, red teaming, LLM security auditing, and custom AI engineering services.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
