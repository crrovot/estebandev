"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"

export function KeyFacts({ facts }: { facts: string[] }) {
  const { t, locale } = useLanguage()
  const [index, setIndex] = useState(0)

  // Reset when the language or the track changes the fact list.
  useEffect(() => {
    setIndex(0)
  }, [locale, facts])

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % facts.length)
    }, 5200)
    return () => window.clearInterval(id)
  }, [facts.length])

  return (
    <section aria-labelledby="facts-heading" className="flex flex-col gap-4">
      <h2 id="facts-heading" className="font-mono text-sm uppercase tracking-[0.2em] text-foreground/60">
        {t.sections.facts}
      </h2>

      <div className="relative min-h-24 rounded-lg border border-foreground/15 bg-surface p-5">
        <p
          key={`${locale}-${index}`}
          className="animate-in fade-in slide-in-from-bottom-2 text-pretty text-lg leading-relaxed duration-500 sm:text-xl"
        >
          <span className="text-brand" aria-hidden="true">
            {"// "}
          </span>
          {facts[index]}
        </p>

        <div className="mt-5 flex gap-1.5" role="tablist" aria-label={t.sections.facts}>
          {facts.map((fact, factIndex) => (
            <button
              key={fact}
              type="button"
              role="tab"
              aria-selected={factIndex === index}
              aria-label={`${factIndex + 1}`}
              onClick={() => setIndex(factIndex)}
              className={`h-1 rounded-full transition-all duration-300 ${
                factIndex === index ? "w-8 bg-brand" : "w-4 bg-foreground/25 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
