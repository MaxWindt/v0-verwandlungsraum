"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{t("cookies.title")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("cookies.description")}{" "}
              <a href="/datenschutz" className="underline hover:text-primary">
                {t("cookies.privacyLink")}
              </a>
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button variant="outline" onClick={rejectCookies} className="whitespace-nowrap bg-transparent">
              {t("cookies.reject")}
            </Button>
            <Button onClick={acceptCookies} className="whitespace-nowrap">
              {t("cookies.accept")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
