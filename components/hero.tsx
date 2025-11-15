"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"
import { X } from "lucide-react"

export default function Hero() {
  const { t } = useLanguage()
  const [showBanner, setShowBanner] = useState(true)

  return (
    <section
      id="hero"
      className="min-h-screen pt-20 flex flex-col justify-center items-center relative overflow-hidden text-white"
    >
      {/* Background Image Container */}
      <div
        className="absolute inset-0 z-0 hidden"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src="/images/design-mode/neu%20header%20pastell%20kreide.jpg"
          alt={t("hero.backgroundAlt")}
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Overlay for text readability */}

      <div className="container mx-auto px-6 py-16 flex justify-center relative z-20">
        <div className="text-center relative text-black">
          {/* Subtle decorative elements */}
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-emerald-200/10 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute -top-4 -right-12 w-8 h-8 bg-emerald-200/10 rounded-full opacity-80 animate-pulse"></div>
          <div
            className="absolute -bottom-6 left-4 w-12 h-12 bg-emerald-300/10 rounded-full opacity-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          {showBanner && (
            <div className="mb-8 relative bg-card/80 rounded-2xl p-6 shadow-lg max-w-2xl mx-auto">
              <button
                onClick={() => setShowBanner(false)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={t("hero.promoClose")}
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-semibold mb-2 text-orange-400">{t("hero.promoTitle")}</h3>
              <p className="text-lg text-foreground">{t("hero.promoText")}</p>
            </div>
          )}

          <h1 className="font-serif font-bold mb-12 relative">
            <span className="bg-gradient-to-r from-emerald-200 via-emerald-50 to-emerald-200 bg-clip-text animate-fade-in-up bg-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-chart-4">
              {t("hero.title")}
            </span>
          </h1>

          <p className="mb-8 max-w-2xl mx-auto italic font-normal tracking-tighter leading-10 font-sans text-2xl text-chart-5">
            {t("hero.subtitle")}
          </p>

          <div className="flex justify-center gap-4 flex-wrap">{/* Additional content can be added here */}</div>
        </div>
      </div>
    </section>
  )
}
