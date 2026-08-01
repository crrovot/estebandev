"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { LoaderCircle, Send, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const BUBBLE_SIZE = 48
const EDGE_GAP = 12
const SPEED = 38
const API_URL = "https://esteban-portfolio-ai.estebanrestrepoe.workers.dev/ask"

type Placement =
  | "bottom-left"
  | "bottom-right"
  | "left-top"
  | "left-bottom"
  | "top-left"
  | "top-right"
  | "right-top"
  | "right-bottom"

type Message = {
  role: "user" | "assistant"
  content: string
}

const panelPosition: Record<Placement, string> = {
  "bottom-left": "bottom-full left-0 mb-3",
  "bottom-right": "bottom-full right-0 mb-3",
  "left-top": "left-full top-0 ml-3",
  "left-bottom": "left-full bottom-0 ml-3",
  "top-left": "top-full left-0 mt-3",
  "top-right": "top-full right-0 mt-3",
  "right-top": "right-full top-0 mr-3",
  "right-bottom": "right-full bottom-0 mr-3",
}

const translations = {
  es: {
    eyebrow: "ASISTENTE DE ESTEBAN",
    greeting: "¡Hola! ¿Cómo estás?",
    question: "¿Qué te gustaría saber de Esteban?",
    placeholder: "Escribe tu pregunta...",
    close: "Cerrar asistente",
    open: "Abrir asistente de Esteban",
    send: "Enviar pregunta",
    error: "No pude responder en este momento. Inténtalo nuevamente.",
    suggestions: [
      { label: "Experiencia", question: "¿Cuál es la experiencia de Esteban?" },
      { label: "Proyectos", question: "¿Qué proyectos ha desarrollado Esteban?" },
      { label: "Tecnologías", question: "¿Con qué tecnologías trabaja Esteban?" },
    ],
  },
  en: {
    eyebrow: "ESTEBAN'S ASSISTANT",
    greeting: "Hi! How are you?",
    question: "What would you like to know about Esteban?",
    placeholder: "Type your question...",
    close: "Close assistant",
    open: "Open Esteban's assistant",
    send: "Send question",
    error: "I could not answer right now. Please try again.",
    suggestions: [
      { label: "Experience", question: "What experience does Esteban have?" },
      { label: "Projects", question: "What projects has Esteban built?" },
      { label: "Technologies", question: "What technologies does Esteban work with?" },
    ],
  },
  pt: {
    eyebrow: "ASSISTENTE DO ESTEBAN",
    greeting: "Olá! Como você está?",
    question: "O que você gostaria de saber sobre o Esteban?",
    placeholder: "Digite sua pergunta...",
    close: "Fechar assistente",
    open: "Abrir assistente do Esteban",
    send: "Enviar pergunta",
    error: "Não consegui responder agora. Tente novamente.",
    suggestions: [
      { label: "Experiência", question: "Qual é a experiência do Esteban?" },
      { label: "Projetos", question: "Quais projetos o Esteban desenvolveu?" },
      { label: "Tecnologias", question: "Com quais tecnologias o Esteban trabalha?" },
    ],
  },
} as const

export function PortfolioAssistantBubble() {
  const { locale } = useLanguage()
  const copy = translations[locale]
  const bubbleRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(true)
  const chatOpenRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showGreeting, setShowGreeting] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [placement, setPlacement] = useState<Placement>("bottom-right")

  useEffect(() => {
    chatOpenRef.current = isChatOpen
    pausedRef.current = showGreeting || isChatOpen || isHovered
  }, [showGreeting, isChatOpen, isHovered])

  useEffect(() => {
    const greetingTimer = window.setTimeout(() => setShowGreeting(false), 4200)
    return () => window.clearTimeout(greetingTimer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  useEffect(() => {
    const bubble = bubbleRef.current
    if (!bubble) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let animationFrame = 0
    let distance = 0
    let previousTime = performance.now()
    let currentPlacement: Placement = "bottom-right"

    const placeBubble = (nextPlacement: Placement, x: number, y: number) => {
      bubble.style.transform = `translate3d(${x}px, ${y}px, 0)`

      if (nextPlacement !== currentPlacement) {
        currentPlacement = nextPlacement
        setPlacement(nextPlacement)
      }
    }

    const getBounds = () => {
      const minX = EDGE_GAP
      const minY = EDGE_GAP
      const maxX = Math.max(minX, window.innerWidth - BUBBLE_SIZE - EDGE_GAP)
      const maxY = Math.max(minY, window.innerHeight - BUBBLE_SIZE - EDGE_GAP)

      return {
        minX,
        minY,
        maxX,
        maxY,
        horizontal: maxX - minX,
        vertical: maxY - minY,
      }
    }

    const updatePosition = () => {
      const bounds = getBounds()

      if (chatOpenRef.current || reduceMotion.matches) {
        placeBubble("bottom-right", bounds.maxX, bounds.maxY)
        return
      }

      const perimeter = 2 * (bounds.horizontal + bounds.vertical)
      if (perimeter <= 0) return

      let pathDistance = distance % perimeter

      if (pathDistance <= bounds.horizontal) {
        const x = bounds.maxX - pathDistance
        placeBubble(x < window.innerWidth / 2 ? "bottom-left" : "bottom-right", x, bounds.maxY)
        return
      }

      pathDistance -= bounds.horizontal

      if (pathDistance <= bounds.vertical) {
        const y = bounds.maxY - pathDistance
        placeBubble(y < window.innerHeight / 2 ? "left-top" : "left-bottom", bounds.minX, y)
        return
      }

      pathDistance -= bounds.vertical

      if (pathDistance <= bounds.horizontal) {
        const x = bounds.minX + pathDistance
        placeBubble(x < window.innerWidth / 2 ? "top-left" : "top-right", x, bounds.minY)
        return
      }

      pathDistance -= bounds.horizontal
      const y = bounds.minY + pathDistance
      placeBubble(y < window.innerHeight / 2 ? "right-top" : "right-bottom", bounds.maxX, y)
    }

    const animate = (time: number) => {
      const elapsedSeconds = Math.min((time - previousTime) / 1000, 0.1)
      previousTime = time

      if (!pausedRef.current && !reduceMotion.matches) {
        distance += SPEED * elapsedSeconds
      }

      updatePosition()
      animationFrame = window.requestAnimationFrame(animate)
    }

    const handleViewportChange = () => updatePosition()

    updatePosition()
    animationFrame = window.requestAnimationFrame(animate)
    reduceMotion.addEventListener("change", handleViewportChange)
    window.addEventListener("resize", handleViewportChange)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      reduceMotion.removeEventListener("change", handleViewportChange)
      window.removeEventListener("resize", handleViewportChange)
    }
  }, [])

  const askQuestion = async (question: string) => {
    const cleanQuestion = question.trim()
    if (!cleanQuestion || isLoading) return

    setMessages((current) => [...current, { role: "user", content: cleanQuestion }])
    setInput("")
    setIsLoading(true)

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: cleanQuestion }),
        signal: controller.signal,
      })

      const data = (await response.json()) as { answer?: string; error?: string }
      if (!response.ok || !data.answer) throw new Error(data.error || "Invalid response")

      setMessages((current) => [...current, { role: "assistant", content: data.answer! }])
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: copy.error }])
    } finally {
      window.clearTimeout(timeout)
      setIsLoading(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void askQuestion(input)
  }

  const toggleChat = () => {
    setShowGreeting(false)
    setIsChatOpen((open) => !open)
  }

  return (
    <div
      ref={bubbleRef}
      className="fixed left-0 top-0 z-50 h-12 w-12 will-change-transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={() => setIsHovered(false)}
    >
      {showGreeting && !isChatOpen && (
        <div
          className={`absolute whitespace-nowrap rounded-xl border border-white/20 bg-background/55 px-3 py-2 text-sm font-medium text-foreground shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl ${panelPosition[placement]}`}
          aria-live="polite"
        >
          {copy.greeting} <span aria-hidden="true">👋</span>
        </div>
      )}

      {isChatOpen && (
        <section
          className={`absolute w-[min(19rem,calc(100vw-5rem))] overflow-hidden rounded-[1.35rem] border border-white/20 bg-background/60 text-foreground shadow-[0_18px_60px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-2xl ${panelPosition[placement]}`}
          aria-label={copy.eyebrow}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-red-500/10" />

          <div className="relative p-4">
            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              className="absolute right-2.5 top-2.5 rounded-full p-1 text-foreground/40 transition hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label={copy.close}
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <p className="pr-7 font-mono text-[9px] font-semibold tracking-[0.16em] text-red-500">
              {copy.eyebrow}
            </p>

            {messages.length === 0 ? (
              <>
                <h2 className="mt-2 pr-4 text-[15px] font-semibold leading-snug">{copy.question}</h2>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {copy.suggestions.map((suggestion) => (
                    <button
                      key={suggestion.label}
                      type="button"
                      onClick={() => void askQuestion(suggestion.question)}
                      className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-2.5 py-1 font-mono text-[10px] text-foreground/70 transition hover:border-red-500/45 hover:bg-red-500/10 hover:text-foreground"
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="mt-3 max-h-44 space-y-2 overflow-y-auto pr-1 text-xs leading-relaxed">
                {messages.map((message, index) => (
                  <p
                    key={`${message.role}-${index}`}
                    className={
                      message.role === "user"
                        ? "ml-8 rounded-xl rounded-br-sm bg-red-600 px-3 py-2 text-white"
                        : "mr-5 rounded-xl rounded-bl-sm border border-foreground/10 bg-foreground/[0.05] px-3 py-2 text-foreground/75"
                    }
                  >
                    {message.content}
                  </p>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-foreground/45">
                    <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    <span>...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/10 p-1 pl-3 shadow-inner dark:bg-black/20">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={300}
                placeholder={copy.placeholder}
                className="min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-foreground/35"
                aria-label={copy.placeholder}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_4px_14px_rgba(220,38,38,0.35)] transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={copy.send}
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </form>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={toggleChat}
        className="group relative h-12 w-12 overflow-hidden border border-white/35 bg-white/[0.08] shadow-[0_10px_30px_rgba(220,38,38,0.28),inset_0_1px_1px_rgba(255,255,255,0.45)] backdrop-blur-xl transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{ borderRadius: "52% 48% 46% 54% / 49% 53% 47% 51%" }}
        aria-label={copy.open}
        aria-expanded={isChatOpen}
      >
        <span className="absolute inset-[2px] rounded-[inherit] bg-gradient-to-br from-white/45 via-red-400/35 to-red-700/75" />
        <span className="absolute left-2 top-1.5 h-2.5 w-5 -rotate-[24deg] rounded-full bg-white/45 blur-[1px]" />
        <span className="absolute bottom-1 left-1/2 h-3 w-8 -translate-x-1/2 rounded-full bg-red-950/25 blur-sm" />

        <span className="absolute left-[13px] top-[17px] h-2.5 w-2 rounded-full bg-red-950/85 shadow-inner transition-transform group-hover:scale-y-90">
          <span className="absolute left-[2px] top-[1px] h-1 w-1 rounded-full bg-white/90" />
        </span>
        <span className="absolute right-[13px] top-[17px] h-2.5 w-2 rounded-full bg-red-950/85 shadow-inner transition-transform group-hover:scale-y-90">
          <span className="absolute left-[2px] top-[1px] h-1 w-1 rounded-full bg-white/90" />
        </span>
        <span className="absolute bottom-[10px] left-1/2 h-2 w-3 -translate-x-1/2 rounded-b-full border-b-2 border-red-950/80" />
        <span className="sr-only">{copy.open}</span>
      </button>
    </div>
  )
}
