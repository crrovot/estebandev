import type { Metadata } from "next"
import { LanguageProvider } from "@/components/language-provider"
import { TorusGallery } from "@/components/torus-gallery"

export const metadata: Metadata = {
  title: "Torus.cl — Esteban Restrepo",
  description: "Galería del proyecto full stack Torus.cl.",
}

export default function TorusPage() {
  return (
    <LanguageProvider>
      <TorusGallery />
    </LanguageProvider>
  )
}
