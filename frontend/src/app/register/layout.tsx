import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Join ERAAO Academy to build job-ready skills in AI and cybersecurity.",
  alternates: {
    canonical: "/register",
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
