"use client"

import { useLanguage } from "@/contexts/language-context"

export default function Kunsttherapie() {
  const { t } = useLanguage()

  return (
    <section id="kunsttherapie" className="py-0">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto content-box my-px py-0">
          

          <div className="mb-12 sm:mb-20">
            <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed">
              <div className="mb-8 sm:mb-12">
                <h4 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-orange-400 text-center">{t("kunsttherapie.howItWorks")}</h4>
                <p className="mb-4 text-center">{t("kunsttherapie.howItWorksIntro")}</p>
                <ul className="space-y-3 max-w-3xl mx-auto">
                  
                  
                  
                </ul>
              </div>

              <div className="relative overflow-hidden p-4 sm:p-6 md:p-8 rounded-2xl bg-muted/30 my-0 py-px">
                <p className="text-center italic text-sm sm:text-base">{t("kunsttherapie.scientificNote")}</p>
              </div>

              
            </div>
          </div>

          <div>
            <div className="mb-6 sm:mb-8 flex justify-center">
              <img
                src="/images/pom-painting-example.jpg"
                alt="Beispiel eines personenorientierten Maltherapie-Bildes"
                className="rounded-2xl shadow-lg max-w-2xl w-full sm:w-10/12 md:w-8/12 lg:w-5/12"
              />
            </div>
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-2xl sm:text-3xl mb-4 sm:mb-6 text-orange-400">{t("kunsttherapie.pomTitle")}</h3>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-card/80 rounded-2xl"></div>
              <div className="relative z-10 my-0 p-4 sm:p-6 md:p-8 lg:p-10">
                <div className="mb-4 text-base sm:text-lg text-center">
                  {t("kunsttherapie.whyMethodIntro")
                    .split("\n")
                    .map((line, index) => (
                      <p key={index} className={index === 0 ? "italic" : ""}>
                        {line}
                      </p>
                    ))}
                </div>
                <div className="text-base sm:text-lg">
                  <p className="leading-relaxed">{t("kunsttherapie.methodDescription")}</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed">
              <div className="relative overflow-hidden p-4 sm:p-6 md:p-8 rounded-2xl">
                <div className="relative z-10">
                  <h4 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-center text-orange-400">{t("kunsttherapie.principlesTitle")}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <ul className="space-y-2">
                      <li>
                        <h5 className="font-semibold mb-1 text-lg sm:text-xl text-orange-400">
                          {t("kunsttherapie.principle1Title")}
                        </h5>
                        <p className="space-y-2">{t("kunsttherapie.principle1Text")}</p>
                      </li>
                      <li>
                        <h5 className="font-semibold mb-1 text-lg sm:text-xl text-orange-400">
                          {t("kunsttherapie.principle2Title")}
                        </h5>
                        <p className="space-y-2">{t("kunsttherapie.principle2Text")}</p>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li>
                        <h5 className="font-semibold mb-1 text-lg sm:text-xl text-orange-400">
                          {t("kunsttherapie.principle3Title")}
                        </h5>
                        <p className="space-y-2">{t("kunsttherapie.principle3Text")}</p>
                      </li>
                      <li>
                        <h5 className="font-semibold mb-1 text-lg sm:text-xl text-orange-400">
                          {t("kunsttherapie.principle4Title")}
                        </h5>
                        <p className="space-y-2">{t("kunsttherapie.principle4Text")}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
