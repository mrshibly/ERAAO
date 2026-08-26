import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Great_Vibes, Cinzel } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import ConditionalWrapper from "./ConditionalWrapper";
import Navbar from "./Navbar";
import Footer from "./Footer";
import JsonLd from "@/components/JsonLd";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
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

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["700", "800"],
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
    google: "g0ynYG72e6ijY_9IRQvui0F4K5VFQU5PMTM_XXJeCQA"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} ${greatVibes.variable} ${cinzel.variable}`}>
      <body suppressHydrationWarning>
        <JsonLd />
        <ServiceWorkerRegister />
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
