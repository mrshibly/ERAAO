import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Playfair_Display, Great_Vibes, Cinzel } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import ConditionalWrapper from "./ConditionalWrapper";
import Navbar from "./Navbar";
import Footer from "./Footer";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eraao.com"),
  title: {
    default: "ERAAO — Applied AI & Cybersecurity Academy",
    template: "%s | ERAAO"
  },
  description: "ERAAO — Applied AI & Offensive Cybersecurity Academy & Enterprise Engineering Services in Bangladesh.",
  keywords: [
    "Cybersecurity Bangladesh",
    "AI Development Dhaka",
    "Penetration Testing",
    "Offensive Security Bootcamps",
    "LLM Architecture",
    "Ethical Hacking Course",
    "Eraao",
    "Lighting the future"
  ],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  openGraph: {
    title: "Eraao — Lighting the future.",
    description: "Lighting the future. Enterprise AI Development, Defensive & Offensive Cybersecurity Services, and Professional Practitioner Academy.",
    url: "https://eraao.com",
    siteName: "Eraao",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Eraao — Lighting the future.",
    description: "Lighting the future. Enterprise AI Development, Defensive & Offensive Cybersecurity Services, and Professional Practitioner Academy."
  },
  verification: {
    google: "0KgnlJEXvcjNUrVF4Q4ni8_sfxzf0Hzxgu1ew5H1FNw"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} ${greatVibes.variable} ${cinzel.variable}`}>
      <body suppressHydrationWarning>
        <JsonLd />
        <AuthProvider>
          <ConditionalWrapper
            navbar={<Navbar />}
            footer={<Footer />}
          >
            {children}
          </ConditionalWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
