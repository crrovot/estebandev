"use client"

import { Dithering } from "@paper-design/shaders-react"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useTrack } from "@/components/track-provider"
import type { Project } from "@/lib/i18n"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

function FeaturedProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage()

  return (
    <article className="overflow-hidden rounded-xl border border-foreground/15 bg-surface lg:col-span-3">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-fit rounded-full bg-brand/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brand">
              {project.kicker}
            </span>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-foreground/60 transition-colors hover:text-brand"
              >
                torus.cl
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-balance font-mono text-2xl leading-tight text-foreground sm:text-3xl">
              {project.title}
            </h3>
            <p className="text-pretty text-base leading-relaxed text-foreground/75">{project.summary}</p>
            <p className="text-pretty text-sm leading-relaxed text-foreground/65">{project.preview}</p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">{t.ui.impact}</span>
            <ul className="grid gap-2">
              {project.metrics.map((metric) => (
                <li key={metric} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
                  <span className="text-brand" aria-hidden="true">/</span>
                  {metric}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-brand/25 bg-brand/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-brand"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-px bg-foreground/10 sm:grid-cols-2">
          {project.images?.map((image, index) => (
            <figure
              key={image.src}
              className={`overflow-hidden bg-background ${index === 0 ? "sm:col-span-2" : ""}`}
            >
              <img
                src={`${basePath}${image.src}`}
                alt={image.alt}
                className="h-full min-h-48 w-full object-cover object-top transition-transform duration-500 hover:scale-[1.015]"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </figure>
          ))}
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage()
  const { isBackend } = useTrack()
  const [isActive, setIsActive] = useState(false)

  return (
    <article
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      tabIndex={0}
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
          project.images?.length
            ? <FeaturedProjectCard key={project.id} project={project} />
            : <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
