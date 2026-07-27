import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  title: 'Esteban Restrepo — Backend & AI Engineer',
  description:
    'Portafolio de Esteban Restrepo Escobar, Ingeniero de Software backend y de IA en Santiago de Chile. Ruby on Rails, Python, AWS y agentes inteligentes.',
  generator: 'v0.app',
  icons: {
    icon: {
      url: `${basePath}/icon.svg`,
      type: 'image/svg+xml',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
