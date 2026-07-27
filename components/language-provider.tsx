"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import {
  defaultLocale,
  detectLocale,
  dictionaries,
  isLocale,
  type Dictionary,
  type Locale,
} from "@/lib/i18n"

const STORAGE_KEY = "tina-cv-locale"

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  // On first mount, restore a saved preference or fall back to the browser language.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    const next = isLocale(saved) ? saved : detectLocale(navigator.languages ?? [navigator.language])
    setLocaleState(next)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = dictionaries[locale].metaTitle
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
