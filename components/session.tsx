"use client"

import { useLanguage } from "@/contexts/language-context"

export default function Session() {
  const { t } = useLanguage()

  return (
    <section id="session" className="py-[0]">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto content-box">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-4">{t("session.title")}</h2>
            <div className="flex justify-center mb-6 sm:mb-8">
              <img
                src="/images/session-hero.jpg"
                alt={t("session.imageAlt")}
                className="rounded-lg shadow-lg max-w-md w-full"
              />
            </div>
          </div>

          <div className="relative mb-12 sm:mb-16">
            <div
              className="absolute inset-0 rounded-3xl "
              style={{
                backgroundImage: "url(/images/vibrant-watercolor-bg.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="relative bg-card/80 rounded-3xl p-4 sm:p-6 md:p-10 lg:p-12 shadow-lg">
              <div className="max-w-5xl mx-auto text-base sm:text-lg leading-relaxed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Left Column */}
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4">{t("session.pricesTitle")}</h3>
                      <p>{t("session.price1")}</p>
                      <p>{t("session.price2")}</p>
                      <p>{t("session.starterPackage")}</p>
                      <p>{t("session.priceNote")}</p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4">{t("session.billingTitle")}</h3>
                      <p>{t("session.billing1")}</p>
                      <p className="text-left">{t("session.billing2")}</p>
                      <p className="text-left">{t("session.billing3")}</p>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4">{t("session.disclaimerTitle")}</h3>
                      <p>{t("session.disclaimerText")}</p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4">{t("session.advantagesTitle")}</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>{t("session.advantage1")}</li>
                        <li>{t("session.advantage2")}</li>
                        <li>{t("session.advantage3")}</li>
                        <li>{t("session.advantage4")}</li>
                        
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4">{t("session.cancellationTitle")}</h3>
                      <p>{t("session.cancellation1")}</p>
                      <p className="text-left">{t("session.cancellation2")}</p>
                    </div>
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
