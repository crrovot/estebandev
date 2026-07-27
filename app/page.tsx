"use client"

import { Hero } from "@/components/hero"
import { KeyFacts } from "@/components/key-facts"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { ProjectGrid } from "@/components/project-grid"
import { ContactSection, StackSection, TimelineSection } from "@/components/resume-details"
import { TrackProvider, useTrack } from "@/components/track-provider"

function Portfolio() {
  const { t } = useLanguage()
  const { track } = useTrack()
  const trackContent = t.tracks[track]

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-4 py-8 font-sans sm:px-6 sm:py-12">
      <Hero trackContent={trackContent} />
      <KeyFacts facts={trackContent.facts} />
      <ProjectGrid projects={trackContent.projects} />
      <StackSection trackContent={trackContent} />
      <TimelineSection />
      <ContactSection />
      <footer className="pb-4 font-mono text-xs text-foreground/40">
        {t.name} · {t.location} · {new Date().getFullYear()}
      </footer>
    </main>
  )
}

export default function PortfolioPage() {
  return (
    <TrackProvider>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </TrackProvider>
  )
}
