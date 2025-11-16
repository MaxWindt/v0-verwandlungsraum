"use client"

import { Mail, Phone } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function Contact() {
  const { t } = useLanguage()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [messageType, setMessageType] = useState("") // "success" or "error"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage(t("contact.validationError"))
      setMessageType("error")
      return
    }

    setIsSubmitting(true)
    setSubmitMessage("")

    // Create custom subject using name
    const customSubject = `${formData.name} sent a message from website`

    const submitData = {
      access_key: "a1690abd-9417-4ab0-912c-a038ffe80264",
      name: formData.name,
      email: formData.email,
      subject: customSubject,
      message: formData.message,
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submitData),
      })

      const result = await response.json()

      if (response.status === 200) {
        setSubmitMessage(t("contact.successMessage"))
        setMessageType("success")
        resetForm()
      } else {
        setSubmitMessage(result.message || t("contact.errorMessage"))
        setMessageType("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitMessage(t("contact.errorRetry"))
      setMessageType("error")
    } finally {
      setIsSubmitting(false)
      // Hide message after 5 seconds
      setTimeout(() => {
        setSubmitMessage("")
        setMessageType("")
      }, 5000)
    }
  }

  return (
    <section id="contact" className="py-12 sm:py-24">
      <div className="container mx-auto">
        <div className="max-w-6xl px-4 sm:px-6 mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-amber-400">{t("contact.title")}</h2>
            <p className="text-base sm:text-lg text-muted-foreground"></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
            <div className="p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-border tracking-wider my-px bg-card/80 backdrop-blur-sm mx-0">
              <h3 className="text-foreground mb-6 sm:mb-8 text-base sm:text-lg font-bold font-serif text-center">
                {t("contact.formTitle")}
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 font-serif">
                      {t("contact.nameLabel")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-serif text-sm sm:text-base"
                      placeholder={t("contact.namePlaceholder")}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2 font-serif">
                      {t("contact.emailLabel")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-serif text-sm sm:text-base"
                      placeholder={t("contact.emailPlaceholder")}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2 font-serif">
                    {t("contact.messageLabel")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none font-serif text-sm sm:text-base"
                    placeholder={t("contact.messagePlaceholder")}
                  ></textarea>
                </div>

                {/* hCaptcha */}
                <div className="flex justify-center">
                  <div
                    className="h-captcha"
                    data-sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                    data-callback="hCaptchaCallback"
                    data-expired-callback="hCaptchaExpired"
                    data-error-callback="hCaptchaError"
                  ></div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full text-primary-foreground font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 bg-chart-5 text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("contact.sendingButton") : t("contact.sendButton")}
                </button>

                {/* Status Message */}
                {submitMessage && (
                  <div
                    className={`p-3 sm:p-4 rounded-lg text-center transition-all duration-300 text-sm sm:text-base ${
                      messageType === "success"
                        ? // replaced green colors with semantic success tokens
                          "bg-accent/20 text-accent-foreground border border-accent"
                        : // replaced red colors with semantic destructive tokens
                          "bg-destructive/20 text-destructive border border-destructive"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-border tracking-wider backdrop-blur-sm mx-0 my-px">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 text-center font-serif">
                {t("contact.infoTitle")}
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-full shadow-lg bg-chart-5 flex-shrink-0">
                    <Mail className="text-primary-foreground" size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground mb-1 font-serif text-sm sm:text-base">{t("contact.emailTitle")}</p>
                    <a
                      href="mailto:info@verwandlungsraum.de"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base break-all"
                    >
                      info@verwandlungsraum.de
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-full shadow-lg bg-chart-5 flex-shrink-0">
                    <Phone className="text-primary-foreground" size={18} />
                  </div>
                  <div className="font-serif">
                    <p className="font-medium text-foreground mb-1 font-serif text-sm sm:text-base">{t("contact.phoneTitle")}</p>
                    <a href="tel:+4915679101374" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">
                      +49 (0) 15679 101374
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-primary/20">
                <p className="text-muted-foreground font-medium font-serif whitespace-pre-line text-sm sm:text-base">
                  {t("contact.languageNote")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
