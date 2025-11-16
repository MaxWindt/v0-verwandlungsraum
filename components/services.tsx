"use client"

import { Link as ScrollLink } from "react-scroll"
import { useLanguage } from "@/contexts/language-context"

export default function Services() {
  const { t } = useLanguage()

  return (
    <section id="services" className="py-0">
      <div className="container mx-auto">
        <div className="max-w-6xl content-box my-0 mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-4">{t("services.title")}</h2>

            <p className="text-base sm:text-lg max-w-2xl mx-auto mt-4 font-serif text-left">
              {t("services.description")}
              <br />
              <br />
              {t("services.description2")}
            </p>
          </div>

          <div className="text-center mb-8 mt-8 sm:mt-12">
            <h2 className="mb-4">{t("services.groupTitle")}</h2>

            <p className="text-base sm:text-lg max-w-3xl mx-auto mt-6 text-left">{t("services.groupDescription")}</p>
            <h3 className="text-2xl sm:text-3xl mt-8 sm:mt-12 mb-6 sm:mb-8">{t("services.currentOffers")}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
              <div className="card">
                <div className="mb-4 sm:mb-6 rounded-lg overflow-hidden">
                  <img
                    src="/images/design-mode/ChatGPT%20Image%202.%20Okt.%202025%2C%2015_52_48.png"
                    alt={t("services.workshop1.alt")}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                </div>
                <h4 className="text-xl sm:text-2xl mb-3 sm:mb-4">
                  {t("services.workshop1.title")}
                  <br />
                  {t("services.workshop1.subtitle")}
                </h4>
                <p className="mb-3 sm:mb-4 text-base sm:text-lg text-left">{t("services.workshop1.description")}</p>
                <ul className="list-disc list-inside space-y-2 text-base sm:text-lg mb-4">
                  <li>{t("services.workshop1.location")}</li>
                  <li>{t("services.workshop1.pricing")}</li>
                  <li>
                    {t("services.workshop1.contact")}{" "}
                    <ScrollLink
                      to="contact"
                      smooth={true}
                      duration={800}
                      offset={-80}
                      className="text-primary hover:text-primary/80 underline cursor-pointer font-medium"
                    >
                      {t("navigation.contact")}
                    </ScrollLink>
                  </li>
                </ul>
              </div>

              <div className="card text-base sm:text-lg">
                <div className="mb-4 sm:mb-6 rounded-lg overflow-hidden">
                  <img
                    src="/images/design-mode/neue%20Wege.png"
                    alt={t("services.workshop2.alt")}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                </div>
                <h4 className="text-xl sm:text-2xl mb-3 sm:mb-4">{t("services.workshop2.title")}</h4>
                <p className="mb-2 text-left">{t("services.workshop2.description")}</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>{t("services.workshop2.nextDate")}</li>
                  <li>
                    {t("services.workshop2.contact")}{" "}
                    <ScrollLink
                      to="contact"
                      smooth={true}
                      duration={800}
                      offset={-80}
                      className="text-primary hover:text-primary/80 underline cursor-pointer font-medium"
                    >
                      {t("navigation.contact")}
                    </ScrollLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
