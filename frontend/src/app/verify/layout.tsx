import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Certificate Verification",
  description: "Verify the authenticity of graduate credentials, course completions, and professional certifications issued by ERAAO Applied AI & Cybersecurity Academy.",
  alternates: {
    canonical: "/verify",
  },
  openGraph: {
    title: "Official Certificate Verification | ERAAO",
    description: "Verify the authenticity of graduate credentials, course completions, and professional certifications issued by ERAAO.",
    url: "https://www.eraao.com/verify",
  },
  twitter: {
    title: "Official Certificate Verification | ERAAO",
    description: "Verify the authenticity of graduate credentials, course completions, and professional certifications issued by ERAAO.",
  }
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
