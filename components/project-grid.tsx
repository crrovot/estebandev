"use client"

import { Dithering } from "@paper-design/shaders-react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useTrack } from "@/components/track-provider"
import type { Project } from "@/lib/i18n"

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage()
  const { isBackend } = useTrack()
  const [isActive, setIsActive] = useState(false)

  const card = (
    <article
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      tabIndex={project.href ? undefined : 0}
      className="group relative flex h-80 flex-col overflow-hidden rounded-lg border border-foreground/15 bg-surface outline-none transition-colors duration-300 hover:border-brand focus-visible:border-brand"
    >
      {/* Animated shader thumbnail */}
      <div className="pointer-events-none absolute inset-0 opacity-55 transition-opacity duration-500 group-hover:opacity-20 group-focus-visible:opacity-20">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={isBackend ? "hsl(0, 0%, 6%)" : "hsl(0, 0%, 97%)"}
          colorFront={isBackend ? "hsl(320, 100%, 66%)" : "hsl(214, 95%, 42%)"}
          shape={project.shape}
          type="4x4"
          pxSize={2}
          scale={0.9}
          speed={isActive ? 0.35 : 0.08}
        />
      </div>

      {/* Legibility scrim under the resting copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-surface via-surface/90 to-transparent"
      />

      {/* Resting state */}
      <div className="relative flex h-full flex-col justify-end gap-2 p-5">
        <span className="w-fit rounded-full border border-foreground/25 bg-background/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground/70 backdrop-blur-sm">
          {project.kicker}
        </span>
        <h3 className="text-pretty font-mono text-base leading-snug text-foreground">{project.title}</h3>
        <p className="text-pretty text-sm leading-relaxed text-foreground/70">{project.summary}</p>
      </div>

      {/* Hover preview */}
      <div
        aria-hidden={!isActive}
        className="absolute inset-0 flex translate-y-3 flex-col gap-3 overflow-y-auto bg-background/95 p-5 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-pretty font-mono text-base leading-snug text-foreground">{project.title}</h3>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
        </div>

        <p className="text-pretty text-[13px] leading-relaxed text-foreground/80">{project.preview}</p>

        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">{t.ui.impact}</span>
          <ul className="flex flex-col gap-1">
            {project.metrics.map((metric) => (
              <li key={metric} className="flex gap-2 text-[13px] leading-relaxed text-foreground/80">
                <span className="text-brand" aria-hidden="true">
                  /
                </span>
                {metric}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-brand/15 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-brand"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  )

  if (!project.href) return card

  return (
    <Link
      href={project.href}
      aria-label={`${project.title} — ${project.summary}`}
      className="block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {card}
    </Link>
  )
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const { t } = useLanguage()

  return (
    <section aria-labelledby="work-heading" className="flex flex-col gap-6">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="work-heading" className="font-mono text-sm uppercase tracking-[0.2em] text-foreground/60">
          {t.sections.work}
        </h2>
        <p className="font-mono text-xs text-foreground/45">{t.ui.hoverHint}</p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
