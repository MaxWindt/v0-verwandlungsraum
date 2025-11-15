"use client"

import { useLanguage } from "@/contexts/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PrivacyPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h1 className="text-4xl font-bold mb-8 text-orange-400">{t("privacy.title")}</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">{t("privacy.intro.title")}</h2>
              <p>{t("privacy.intro.text")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">{t("privacy.responsible.title")}</h2>
              <p>{t("privacy.responsible.name")}</p>
              <p>{t("privacy.responsible.address")}</p>
              <p>{t("privacy.responsible.email")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">{t("privacy.contactForm.title")}</h2>
              <p>{t("privacy.contactForm.text1")}</p>
              <p>{t("privacy.contactForm.text2")}</p>
              <p>{t("privacy.contactForm.text3")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">{t("privacy.cookies.title")}</h2>
              <p>{t("privacy.cookies.text1")}</p>
              <p>{t("privacy.cookies.text2")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">{t("privacy.rights.title")}</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("privacy.rights.right1")}</li>
                <li>{t("privacy.rights.right2")}</li>
                <li>{t("privacy.rights.right3")}</li>
                <li>{t("privacy.rights.right4")}</li>
                <li>{t("privacy.rights.right5")}</li>
                <li>{t("privacy.rights.right6")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">{t("privacy.security.title")}</h2>
              <p>{t("privacy.security.text")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">{t("privacy.changes.title")}</h2>
              <p>{t("privacy.changes.text")}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
