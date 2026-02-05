"use client";

import { useLanguage } from "@/contexts/language-context";

export default function HpPsych() {
  const { t } = useLanguage();

  return (
    <section id="hp-psych" className="py-0">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto content-box my-px py-0">
          <div className="mb-12 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8">
                {t("hpPsych.title")}
              </h2>
            </div>
            
            <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto">
              <p className="text-center">{t("hpPsych.intro1")}</p>
              
              <p className="text-center">{t("hpPsych.intro2")}</p>
              
              <div className="mt-8">
                <p className="font-semibold mb-4">{t("hpPsych.topicsTitle")}</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>{t("hpPsych.topic1")}</li>
                  <li>{t("hpPsych.topic2")}</li>
                  <li>{t("hpPsych.topic3")}</li>
                  <li>{t("hpPsych.topic4")}</li>
                  <li>{t("hpPsych.topic5")}</li>
                  <li>{t("hpPsych.topic6")}</li>
                  <li>{t("hpPsych.topic7")}</li>
                </ul>
              </div>
              
              <div className="mt-8 space-y-4">
                <p className="italic">{t("hpPsych.qualificationNote")}</p>
                <p className="italic">{t("hpPsych.limitationsNote")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
