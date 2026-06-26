import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/layout/SmoothScroll";

// Один шрифт на весь сайт — Montserrat.
// Заголовки используют тот же шрифт в light (300) с увеличенным letter-spacing.
const sans = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Аллег Ким — Ресторатор и бизнес-тренер. Консалтинг и бизнес-тур в Дубае",
  description:
    "Развитие ресторанного бизнеса как системы. Действующий ресторатор и сертифицированный тренер STI Dubai, основатель холдинга «Ассорти Проджект» (Koreana, Alchik).",
  themeColor: "#0B0813",
  openGraph: {
    title: "Аллег Ким — Ресторатор и бизнес-тренер",
    description:
      "Развитие ресторанного бизнеса как системы. Консалтинг и бизнес-тур в Дубае.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={sans.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
