"use client"

import { Dithering } from "@paper-design/shaders-react"
import { MapPin, Moon, Sun } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTrack } from "@/components/track-provider"
import type { Dictionary, Track } from "@/lib/i18n"

export function Hero({ trackContent }: { trackContent: Dictionary["tracks"][Track] }) {
  const { t } = useLanguage()
  const { isBackend, toggleTrack } = useTrack()

  return (
    <header className="relative overflow-hidden rounded-lg border border-foreground/15">
      {/* Shader backdrop, kept on the right so the copy stays readable */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-30 sm:w-2/3">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={isBackend ? "hsl(0, 0%, 0%)" : "hsl(0, 0%, 100%)"}
          colorFront={isBackend ? "hsl(320, 100%, 66%)" : "hsl(214, 95%, 42%)"}
          shape={isBackend ? "warp" : "sphere"}
          type="4x4"
          pxSize={3}
          scale={0.85}
          speed={0.12}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40"
      />

      <div className="relative flex flex-col gap-8 p-6 sm:p-10">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-sm text-foreground/70">{t.brand}</span>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={toggleTrack}
              aria-label={t.a11y.toggleTheme}
              className="flex items-center gap-2 rounded-full border border-foreground/20 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground/80 transition-colors hover:border-brand hover:text-brand"
            >
              {isBackend ? <Moon className="h-3.5 w-3.5" aria-hidden="true" /> : <Sun className="h-3.5 w-3.5" aria-hidden="true" />}
              {trackContent.label}
            </button>
          </div>
        </div>

        {/* Identity */}
        <div className="flex flex-col gap-4">
          <h1 className="text-balance font-mono text-2xl leading-tight sm:text-3xl">{t.name}</h1>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
            {t.role} <span className="text-foreground/40">{`// ${trackContent.label}`}</span>
          </p>
          <p className="max-w-2xl text-balance text-2xl font-semibold leading-tight sm:text-4xl">
            {trackContent.headline}
          </p>
          <p className="max-w-2xl text-pretty leading-relaxed text-foreground/75">{trackContent.tagline}</p>
        </div>

        {/* Stats */}
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {trackContent.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 border-l border-brand/50 pl-3">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-mono text-2xl leading-none text-foreground">{stat.value}</dd>
              <dd className="text-pretty text-xs leading-relaxed text-foreground/60">{stat.label}</dd>
            </div>
          ))}
        </dl>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-foreground/60">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {t.location}
          </span>
          <span>{t.ui.availability}</span>
          <span className="text-foreground/40">{t.ui.trackHint}</span>
        </div>
      </div>
    </header>
  )
}
