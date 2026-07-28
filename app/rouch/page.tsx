import type { Metadata } from "next"
import { LanguageProvider } from "@/components/language-provider"
import { RouchGallery } from "@/components/rouch-gallery"

export const metadata: Metadata = {
  title: "Rouch.cl — Esteban Restrepo",
  description: "E-commerce, dirección visual y fotografía de producto para Rouch.cl.",
}

export default function RouchPage() {
  return (
    <LanguageProvider>
      <RouchGallery />
    </LanguageProvider>
  )
}
