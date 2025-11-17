"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const languages = [
    { code: "de" as const, name: "Deutsch", flag: "🇩🇪" },
    { code: "es" as const, name: "Español", flag: "🇪🇸" },
  ];

  // Get the next language (toggle behavior)
  const currentIndex = languages.findIndex((lang) => lang.code === locale);
  const nextLanguage = languages[(currentIndex + 1) % languages.length];

  const handleToggle = () => {
    setLocale(nextLanguage.code);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-card/80 backdrop-blur-sm border border-border hover:bg-card/90 transition-all duration-300 text-foreground drop-shadow-md"
      aria-label={`Switch to ${nextLanguage.name}`}
      title={`Switch to ${nextLanguage.name}`}
    >
      <Globe size={14} />
      <span className="text-base">{nextLanguage.flag}</span>
    </button>
  );
}
