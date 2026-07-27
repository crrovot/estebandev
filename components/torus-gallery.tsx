"use client"

import { ArrowLeft, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import type { Locale } from "@/lib/i18n"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const copy: Record<Locale, {
  back: string
  kicker: string
  title: string
  intro: string
  gallery: string
  visit: string
  captions: string[]
}> = {
  es: {
    back: "Volver al portafolio",
    kicker: "Proyecto full stack",
    title: "Torus.cl",
    intro: "Producto operativo para centralizar el trabajo diario de talleres técnicos.",
    gallery: "Galería del producto",
    visit: "Visitar torus.cl",
    captions: ["Landing del producto", "Centro técnico", "Monitor de órdenes"],
  },
  en: {
    back: "Back to portfolio",
    kicker: "Full-stack project",
    title: "Torus.cl",
    intro: "An operational product that centralizes the daily work of technical repair shops.",
    gallery: "Product gallery",
    visit: "Visit torus.cl",
    captions: ["Product landing page", "Technical center", "Work-order monitor"],
  },
  pt: {
    back: "Voltar ao portfólio",
    kicker: "Projeto full stack",
    title: "Torus.cl",
    intro: "Produto operacional que centraliza o trabalho diário de assistências técnicas.",
    gallery: "Galeria do produto",
    visit: "Visitar torus.cl",
    captions: ["Landing do produto", "Centro técnico", "Monitor de ordens"],
  },
}

export function TorusGallery() {
  const { locale, t } = useLanguage()
  const text = copy[locale]
  const project = t.tracks.frontend.projects.find(({ id }) => id === "torus")
  const images = project?.images ?? []

  useEffect(() => {
    document.documentElement.classList.remove("dark")
  }, [])

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-8 font-sans sm:px-6 sm:py-12">
      <nav className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground/60 transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {text.back}
        </Link>
        <span className="font-mono text-xs text-foreground/40">esteban.dev</span>
      </nav>

      <header className="grid gap-6 border-b border-foreground/15 pb-10 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{text.kicker}</span>
          <h1 className="mt-3 text-balance font-mono text-5xl leading-none text-foreground sm:text-7xl">
            {text.title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/65">{text.intro}</p>
        </div>
        <a
          href="https://torus.cl"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-2 font-mono text-xs text-brand transition-colors hover:bg-brand hover:text-white"
        >
          {text.visit}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </header>

      <section aria-labelledby="gallery-heading" className="flex flex-col gap-5">
        <h2 id="gallery-heading" className="font-mono text-sm uppercase tracking-[0.2em] text-foreground/55">
          {text.gallery}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {images.map((image, index) => (
            <figure
              key={image.src}
              className={`group overflow-hidden rounded-xl border border-foreground/15 bg-surface ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="overflow-hidden border-b border-foreground/10 bg-foreground/[0.03]">
                <img
                  src={`${basePath}${image.src}`}
                  alt={image.alt}
                  className="h-auto w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
              <figcaption className="flex items-center gap-3 px-4 py-3 font-mono text-xs text-foreground/55">
                <span className="text-brand">0{index + 1}</span>
                {text.captions[index]}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="border-t border-foreground/15 py-6 font-mono text-xs text-foreground/40">
        {t.name} · {new Date().getFullYear()}
      </footer>
    </main>
  )
}
