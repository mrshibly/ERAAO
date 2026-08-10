import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Access your ERAAO student command center, course materials, and practice labs."
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
