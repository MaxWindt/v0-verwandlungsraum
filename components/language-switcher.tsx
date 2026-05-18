"use client";

import { Fragment } from "react";
import { useLanguage } from "@/contexts/language-context";
import type { Locale } from "@/lib/translations";

const languages: { code: Locale; label: string; name: string }[] = [
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
];

const switchLabelPrefix: Record<Locale, string> = {
  de: "Sprache wechseln zu",
  en: "Switch language to",
  es: "Cambiar idioma a",
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language selection">
      {languages.map((lang, i) => (
        <Fragment key={lang.code}>
          <button
            onClick={() => setLocale(lang.code)}
            className={`text-xs font-medium px-1.5 py-0.5 rounded transition-colors duration-200 ${
              locale === lang.code
                ? "text-primary font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label={`${switchLabelPrefix[locale]} ${lang.name}`}
            aria-pressed={locale === lang.code}
          >
            {lang.label}
          </button>
          {i < languages.length - 1 && (
            <span className="text-muted-foreground/50 text-xs">|</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
