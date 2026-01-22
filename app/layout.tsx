import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

import { LanguageProvider } from "@/contexts/language-context";
import CookieBanner from "@/components/cookie-banner";

import { Forum } from "next/font/google";

const forum = Forum({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-forum",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Verwandlungsraum | Kunsttherapie",
  description:
    "Kunsttherapie dein Raum, indem transformation und tiefe Prozesse stattfindne können.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={forum.variable}>
      <body>
        <LanguageProvider>
          {children}
          <CookieBanner />
        </LanguageProvider>
        <Script
          src="https://js.hcaptcha.com/1/api.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
