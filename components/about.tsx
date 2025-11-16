"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-[0]">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto content-box">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-4">{t("about.title")}</h2>
          </div>

          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg">
            {/* First paragraph - full width */}
            <p className="leading-relaxed font-medium">{t("about.intro")}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
              <div className="space-y-4 sm:space-y-6 text-left">
                <p className="leading-relaxed text-left">{t("about.paragraph1")}</p>
                <p className="leading-relaxed text-left">{t("about.paragraph2")}</p>
                <p className="leading-relaxed text-left">{t("about.paragraph3")}</p>
              </div>
              <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden hover-lift">
                <Image
                  src="/images/ueber-mich-portrait.jpeg"
                  alt={t("about.alt")}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
