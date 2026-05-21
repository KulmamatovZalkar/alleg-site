import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/layout/SmoothScroll";

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Аллег Ким — Международный консалтинг и бизнес-тур в Дубае",
  description:
    "Трансформация мышления и системный масштаб бизнеса. 25 лет в HORECA, 1000+ консультаций, клиенты в 5+ странах.",
  openGraph: {
    title: "Аллег Ким — Международный консалтинг",
    description:
      "Трансформация мышления и системный масштаб бизнеса. Бизнес-тур в Дубае.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
