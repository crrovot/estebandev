"use client"

import { useLanguage } from "@/components/language-provider"
import { localeLabels, localeNames, locales } from "@/lib/i18n"

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t.a11y.language}
      className="flex items-center gap-1 rounded-full border border-foreground/20 p-1 font-mono text-xs"
    >
      {locales.map((code) => {
        const isActive = code === locale
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={isActive}
            aria-label={`${t.a11y.switchTo} ${localeNames[code]}`}
            className={`rounded-full px-2.5 py-1 leading-none transition-colors ${
              isActive
                ? "bg-foreground text-background"
                : "text-foreground/55 hover:text-foreground"
            }`}
          >
            {localeLabels[code]}
          </button>
        )
      })}
    </div>
  )
}
