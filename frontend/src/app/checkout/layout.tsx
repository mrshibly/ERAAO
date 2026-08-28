import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout & Track Enrollment",
  description: "Complete your enrollment in ERAAO Academy bootcamps and secure track access.",
  alternates: {
    canonical: "/checkout",
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
