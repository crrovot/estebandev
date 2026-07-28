"use client"

import { ArrowLeft, ArrowUpRight, Camera } from "lucide-react"
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
  photoCredit: string
  captions: string[]
}> = {
  es: {
    back: "Volver al portafolio",
    kicker: "E-commerce · Dirección visual",
    title: "Rouch.cl",
    intro: "Tienda de piercing y joyería donde desarrollo, identidad visual y fotografía de producto trabajan como una sola experiencia.",
    gallery: "Tienda & fotografía",
    visit: "Visitar rouch.cl",
    photoCredit: "Fotografía propia · Nikon D5600 · lente 105 mm",
    captions: ["Portada y dirección de arte", "Productos destacados", "Catálogo y filtros"],
  },
  en: {
    back: "Back to portfolio",
    kicker: "E-commerce · Visual direction",
    title: "Rouch.cl",
    intro: "A piercing and jewelry store where development, visual identity and product photography work as one experience.",
    gallery: "Store & photography",
    visit: "Visit rouch.cl",
    photoCredit: "Original photography · Nikon D5600 · 105 mm lens",
    captions: ["Home page and art direction", "Featured products", "Catalog and filters"],
  },
  pt: {
    back: "Voltar ao portfólio",
    kicker: "E-commerce · Direção visual",
    title: "Rouch.cl",
    intro: "Loja de piercing e joalheria onde desenvolvimento, identidade visual e fotografia de produto formam uma única experiência.",
    gallery: "Loja & fotografia",
    visit: "Visitar rouch.cl",
    photoCredit: "Fotografia própria · Nikon D5600 · lente 105 mm",
    captions: ["Página inicial e direção de arte", "Produtos em destaque", "Catálogo e filtros"],
  },
}

export function RouchGallery() {
  const { locale, t } = useLanguage()
  const text = copy[locale]
  const project = t.tracks.frontend.projects.find(({ id }) => id === "rouch")
  const images = project?.images ?? []

  useEffect(() => {
    document.documentElement.classList.remove("dark")
  }, [])

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-8 font-sans sm:px-6 sm:py-12">
      <nav className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground/60 transition-colors hover:text-[#d400c8]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {text.back}
        </Link>
        <span className="font-mono text-xs text-foreground/40">esteban.dev</span>
      </nav>

      <header className="grid gap-6 border-b border-foreground/15 pb-10 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d400c8]">{text.kicker}</span>
          <h1 className="mt-3 text-balance font-mono text-5xl leading-none text-foreground sm:text-7xl">
            {text.title}
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-foreground/65">{text.intro}</p>
        </div>
        <a
          href="https://rouch.cl"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d400c8]/35 bg-[#d400c8]/10 px-4 py-2 font-mono text-xs text-[#b000a6] transition-colors hover:bg-[#d400c8] hover:text-white"
        >
          {text.visit}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </header>

      <div className="flex items-center gap-3 rounded-xl border border-[#d400c8]/20 bg-[#120612] px-5 py-4 text-white">
        <Camera className="h-5 w-5 shrink-0 text-[#dfff00]" aria-hidden="true" />
        <p className="font-mono text-xs uppercase tracking-wider">{text.photoCredit}</p>
      </div>

      <section aria-labelledby="rouch-gallery-heading" className="flex flex-col gap-5">
        <h2 id="rouch-gallery-heading" className="font-mono text-sm uppercase tracking-[0.2em] text-foreground/55">
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
                <span className="text-[#d400c8]">0{index + 1}</span>
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
