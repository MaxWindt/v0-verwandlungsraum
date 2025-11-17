"use client"

import { useState, useEffect } from "react"
import { Link as ScrollLink } from "react-scroll"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "./language-switcher"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = [
    { name: t("navigation.start"), to: "hero" },
    { name: t("navigation.services"), to: "services" },
    { name: t("navigation.artTherapy"), to: "kunsttherapie" },
    { name: t("navigation.sessionInfo"), to: "session" },
    { name: t("navigation.about"), to: "about" },
    { name: t("navigation.contact"), to: "contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-cover bg-center bg-no-repeat ${
        scrolled ? "backdrop-blur-md border-b border-border" : ""
      }`}

    >
      <div className="container mx-auto px-4 sm:px-6 py-6 flex justify-between leading-7 tracking-widest items-center text-base w-full">
        <div className="flex-1 min-w-0">
          <div className="text-xl sm:text-2xl tracking-tight drop-shadow-lg font-extralight truncate" style={{ color: '#831843' }}>Rebecca Schwindt</div>
          <div className="font-medium tracking-wide uppercase text-xs sm:text-sm drop-shadow-md" style={{ color: '#831843' }}>
            Kunsttherapie Eberswalde
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8 items-center flex-shrink-0">
          {menuItems.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="font-medium hover:text-primary cursor-pointer transition-colors duration-300 relative group transform hover:scale-105 font-serif text-right drop-shadow-md  whitespace-nowrap"
              style={{ color: '#831843' }}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full rounded-full drop-shadow-sm"></span>
            </ScrollLink>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button and Language Switcher */}
        <div className="lg:hidden flex items-center gap-3 flex-shrink-0 ml-4">
          <LanguageSwitcher />
          <button
            className="text-foreground hover:text-primary transition-colors drop-shadow-md"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? t("navigation.closeMenu") : t("navigation.openMenu")}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 py-6 flex flex-col space-y-4">
            {menuItems.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="text-sm font-medium text-muted-foreground hover:text-primary py-2 cursor-pointer transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </ScrollLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
