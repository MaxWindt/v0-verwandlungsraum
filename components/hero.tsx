"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="min-h-screen pt-20 flex flex-col justify-center items-center relative overflow-hidden text-white"
    >
      {/* Background Image Container */}
      <div
        className="absolute inset-0 z-0"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src="/images/design-mode/aa0e0673b774ef265c5fc05722ed8267.jpg"
          alt={t("hero.backgroundAlt")}
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Overlay for text readability */}

      <div className="container mx-auto px-4 sm:px-6 py-16 flex justify-center relative z-20">
        <div className="text-center relative text-black max-w-5xl w-full">
          {/* Subtle decorative elements */}
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-emerald-200/10 rounded-full opacity-60 animate-pulse hidden md:block"></div>
          <div className="absolute -top-4 -right-12 w-8 h-8 bg-emerald-200/10 rounded-full opacity-80 animate-pulse hidden md:block"></div>
          <div
            className="absolute -bottom-6 left-4 w-12 h-12 bg-emerald-300/10 rounded-full opacity-40 animate-pulse hidden md:block"
            style={{ animationDelay: "1s" }}
          ></div>

          <h1 className="font-forum text-5xl sm:text-7xl font-bold mb-8 sm:mb-12 relative">
            <span className="bg-gradient-to-r from-emerald-200 via-emerald-50 to-emerald-200 bg-clip-text animate-fade-in-up bg-white hero-title font-medium text-chart-4">
              {t("hero.title")}
            </span>
          </h1>

          <p className="mb-8 max-w-2xl mx-auto font-forum text-2xl sm:text-4xl text-chart-5">
            {t("hero.subtitle")}
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            {/* Additional content can be added here */}
          </div>
        </div>
      </div>
    </section>
  );
}
