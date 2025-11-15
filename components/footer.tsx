"use client"

import { Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl mb-6 text-orange-400">{t("footer.title")}</h3>
              <p className="leading-relaxed">{t("footer.subtitle")}</p>
            </div>

            <div>
              <h3 className="text-xl mb-6 text-orange-400">{t("footer.quickLinks")}</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#hero" className="hover:opacity-75 transition-opacity">
                    {t("footer.start")}
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:opacity-75 transition-opacity">
                    {t("footer.about")}
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:opacity-75 transition-opacity">
                    {t("footer.services")}
                  </a>
                </li>
                <li>
                  <a href="#session" className="hover:opacity-75 transition-opacity">
                    {t("footer.sessionInfo")}
                  </a>
                </li>
                <li>
                  <a href="#kunsttherapie" className="hover:opacity-75 transition-opacity">
                    {t("footer.artTherapy")}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:opacity-75 transition-opacity">
                    {t("footer.contact")}
                  </a>
                </li>
                <li>
                  <a href="/datenschutz" className="hover:opacity-75 transition-opacity">
                    {t("footer.privacy")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl mb-6 text-orange-400">{t("footer.imprintTitle")}</h3>
              <div className="space-y-1">
                <p>{t("footer.name")}</p>
                <p>{t("footer.profession")}</p>
                <p>{t("footer.address1")}</p>
                <p>{t("footer.address2")}</p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-primary/50 text-center">
            <p className="flex items-center justify-center gap-2 text-lg">
              {t("footer.copyright")} <Heart size={20} className="text-primary" />{" "}
              {t("footer.copyrightEnd").replace("{year}", new Date().getFullYear().toString())}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
