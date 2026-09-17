import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zero to Fluent: 1-Day Free English Bootcamp | ERAAO Academy",
  description:
    "মাত্র ২ ঘণ্টায় বুঝে নিন—কেন English পড়েও আপনি English Speaking-এ আটকে যাচ্ছেন! Join ERAAO Academy's 1-Day Free English Bootcamp on 26 Sep 2026 with Mentor Ayesha Anika.",
  keywords: [
    "Free English Bootcamp",
    "Zero to Fluent English",
    "Spoken English Bangladesh",
    "ERAAO Academy",
    "Ayesha Anika",
    "English Speaking Practice",
    "English Club Telegram",
    "ইংরেজি শেখা",
    "স্পোকেন ইংলিশ"
  ],
  openGraph: {
    title: "Zero to Fluent: 1-Day Free English Bootcamp | ERAAO Academy",
    description:
      "মাত্র ২ ঘণ্টায় বুঝে নিন—কেন English পড়েও আপনি English Speaking-এ আটকে যাচ্ছেন! 26 Sep 2026 • 09:00 PM (Live Online Session).",
    url: "https://eraao.com/academy/free-bootcamp",
    siteName: "ERAAO Academy",
    images: [
      {
        url: "/banners/zero-to-fluent-free-bootcamp.png",
        width: 1024,
        height: 537,
        alt: "Zero to Fluent Free English Bootcamp - ERAAO Academy",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero to Fluent: 1-Day Free English Bootcamp | ERAAO Academy",
    description:
      "মাত্র ২ ঘণ্টায় বুঝে নিন—কেন English পড়েও আপনি English Speaking-এ আটকে যাচ্ছেন! 26 Sep 2026 • 09:00 PM.",
    images: ["/banners/zero-to-fluent-free-bootcamp.png"],
  },
};

export default function FreeBootcampLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
