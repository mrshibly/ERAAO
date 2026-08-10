import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Technical Blog",
  description: "Research articles, security advisory writeups, and AI engineering tutorials from ERAAO."
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
