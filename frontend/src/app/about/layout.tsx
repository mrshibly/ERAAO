import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Security & Engineering Team",
  description: "Learn about ERAAO — building qualified practitioners in AI development and offensive cybersecurity."
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
