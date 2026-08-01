"use client"

import type { FormEvent, PointerEvent as ReactPointerEvent } from "react"
import { useEffect, useRef, useState } from "react"
import { Dithering } from "@paper-design/shaders-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { LoaderCircle, Send, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useTrack } from "@/components/track-provider"
import { useOrbMotion } from "@/hooks/use-orb-motion"

const API_URL = "https://esteban-portfolio-ai.estebanrestrepoe.workers.dev/ask"
const ORB_SIZE = 64
const ORB_PATTERN_IDLE_SPEED = 0.28
const ORB_PATTERN_ACTIVE_SPEED = 0.75
const GLOW_INTENSITY = 0.9
const PANEL_MAX_WIDTH = 304
const VIEWPORT_GAP = 12

type Message = {
  role: "user" | "assistant"
  content: string
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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max))
}

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener("resize", update, { passive: true })
    return () => window.removeEventListener("resize", update)
  }, [])

  return size
}

export function PortfolioAssistantBubble() {
  const { locale } = useLanguage()
  const { isBackend } = useTrack()
  const copy = translations[locale]
  const viewport = useWindowSize()
  const prefersReducedMotion = useReducedMotion() ?? false
  const { x, y, stiffness, damping, teleport, pause, resume } = useOrbMotion(viewport, {
    orbRadius: ORB_SIZE / 2,
    padding: 16,
    disabled: prefersReducedMotion,
  })

  const [showGreeting, setShowGreeting] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [panelHeight, setPanelHeight] = useState(260)

  const didDragRef = useRef(false)
  const suppressClickRef = useRef(false)
  const draggingRef = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const panelRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const greetingTimer = window.setTimeout(() => setShowGreeting(false), 4200)
    return () => window.clearTimeout(greetingTimer)
  }, [])

  useEffect(() => {
    if (isChatOpen || isHovered || isDragging) pause()
    else resume()
  }, [isChatOpen, isDragging, isHovered, pause, resume])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  }, [isLoading, messages, prefersReducedMotion])

  useEffect(() => {
    if (!isChatOpen) return
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 260)
    return () => window.clearTimeout(focusTimer)
  }, [isChatOpen])

  useEffect(() => {
    const panel = panelRef.current
    if (!isChatOpen || !panel) return

    const updateHeight = () => setPanelHeight(panel.getBoundingClientRect().height)
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(panel)
    return () => observer.disconnect()
  }, [isChatOpen])

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

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return
    didDragRef.current = false
    draggingRef.current = true
    dragStartRef.current = { x: event.clientX, y: event.clientY }
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerEnter = (event: ReactPointerEvent<HTMLButtonElement>) => {
    setIsHovered(true)
    if (prefersReducedMotion || draggingRef.current) return

    const bounds = event.currentTarget.getBoundingClientRect()
    teleport(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!draggingRef.current || prefersReducedMotion) return

    const distance = Math.hypot(
      event.clientX - dragStartRef.current.x,
      event.clientY - dragStartRef.current.y,
    )
    if (distance > 5) didDragRef.current = true
    if (didDragRef.current) teleport(event.clientX, event.clientY)
  }

  const finishPointerInteraction = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const wasDragged = didDragRef.current
    draggingRef.current = false
    setIsDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    if (wasDragged) {
      window.setTimeout(() => {
        didDragRef.current = false
      }, 0)
    }
  }

  const cancelPointerInteraction = (event: ReactPointerEvent<HTMLButtonElement>) => {
    didDragRef.current = true
    finishPointerInteraction(event)
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const shouldToggle = !didDragRef.current
    finishPointerInteraction(event)

    if (shouldToggle) {
      suppressClickRef.current = true
      toggleChat()
      window.setTimeout(() => {
        suppressClickRef.current = false
      }, 0)
    }
  }

  const handleOrbClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    if (didDragRef.current) {
      didDragRef.current = false
      return
    }
    toggleChat()
  }

  if (viewport.width === 0 || viewport.height === 0) return null

  const springTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness, damping, mass: 1 }
  const glowBlur = Math.round(36 + GLOW_INTENSITY * 52)
  const glowOpacity = 0.28 + GLOW_INTENSITY * 0.52
  const orbColor = isBackend ? 320 : 210
  const orbSecondaryColor = isBackend ? 282 : 185
  const patternFront = isBackend ? "hsl(320, 100%, 66%)" : "hsl(214, 95%, 42%)"
  const patternBack = isBackend ? "hsl(235, 32%, 7%)" : "hsl(205, 60%, 90%)"
  const patternActive = isHovered || isChatOpen
  const ambientGlowStrength = isBackend ? 0.03 : 1
  const directGlowAlpha = isBackend ? 0.03 : 0.24
  const dropGlowAlpha = isBackend ? 0.03 : 0.32
  const orbLeft = x - ORB_SIZE / 2
  const orbTop = y - ORB_SIZE / 2
  const orbScale = prefersReducedMotion
    ? 1
    : isChatOpen
      ? 1.12
      : isHovered
        ? 1.08
        : isDragging
          ? 1.04
          : 1

  const panelWidth = Math.min(PANEL_MAX_WIDTH, viewport.width - VIEWPORT_GAP * 2)
  const panelLeft = clamp(
    x - panelWidth / 2,
    VIEWPORT_GAP,
    viewport.width - panelWidth - VIEWPORT_GAP,
  )
  const panelAbove = y - ORB_SIZE / 2 - panelHeight - 16
  const panelBelow = y + ORB_SIZE / 2 + 16
  const panelTop = clamp(
    panelAbove >= VIEWPORT_GAP ? panelAbove : panelBelow,
    VIEWPORT_GAP,
    viewport.height - panelHeight - VIEWPORT_GAP,
  )
  const greetingWidth = Math.min(210, viewport.width - VIEWPORT_GAP * 2)
  const greetingLeft = clamp(
    x - greetingWidth / 2,
    VIEWPORT_GAP,
    viewport.width - greetingWidth - VIEWPORT_GAP,
  )
  const greetingTop = y > 88 ? y - ORB_SIZE / 2 - 48 : y + ORB_SIZE / 2 + 10

  return (
    <>
      <motion.div
        aria-hidden="true"
        animate={{
          x: x - ORB_SIZE * 1.35,
          y: y - ORB_SIZE * 1.35,
          opacity: (prefersReducedMotion ? 0.35 : 1) * ambientGlowStrength,
        }}
        transition={springTransition}
        className="pointer-events-none fixed left-0 top-0 z-[9996] rounded-full will-change-transform"
        style={{
          width: ORB_SIZE * 2.7,
          height: ORB_SIZE * 2.7,
          background: `radial-gradient(circle, hsl(${orbColor} 80% 65% / ${glowOpacity}) 0%, transparent 68%)`,
          filter: `blur(${glowBlur}px)`,
        }}
      />

      <motion.div
        aria-hidden="true"
        animate={{
          x: x - ORB_SIZE + ORB_SIZE * 0.14,
          y: y - ORB_SIZE - ORB_SIZE * 0.12,
          opacity: (prefersReducedMotion ? 0.3 : 1) * ambientGlowStrength,
        }}
        transition={springTransition}
        className="pointer-events-none fixed left-0 top-0 z-[9996] rounded-full will-change-transform"
        style={{
          width: ORB_SIZE * 2,
          height: ORB_SIZE * 2,
          background: `radial-gradient(circle, hsl(${orbSecondaryColor} 85% 72% / ${glowOpacity * 0.6}) 0%, transparent 62%)`,
          filter: `blur(${Math.round(glowBlur * 0.55)}px)`,
        }}
      />

      <AnimatePresence>
        {showGreeting && !isChatOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
            aria-live="polite"
            className="pointer-events-none fixed z-[9998] overflow-hidden whitespace-nowrap rounded-xl border border-white/10 bg-background/25 px-3 py-2 text-center text-sm font-medium text-foreground shadow-[0_16px_50px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[28px] backdrop-saturate-150"
            style={{
              left: greetingLeft,
              top: greetingTop,
              width: greetingWidth,
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-br from-white/[0.14] via-transparent to-brand/10" />
            <span
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgb(255 255 255 / 0.75) 0.5px, transparent 0.7px)",
                backgroundSize: "3px 3px",
              }}
            />
            <span className="relative">
              {copy.greeting} <span aria-hidden="true">👋</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div
              aria-hidden="true"
              className="fixed inset-0 z-[9997] cursor-default bg-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
            />

            <motion.section
              ref={panelRef}
              id="portfolio-assistant-panel"
              role="dialog"
              aria-label={copy.eyebrow}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 8 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 340, damping: 28 }
              }
              className="fixed z-[9998] overflow-hidden rounded-[1.35rem] border border-white/[0.12] bg-background/30 text-foreground shadow-[0_22px_70px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-[30px] backdrop-saturate-150"
              style={{
                left: panelLeft,
                top: panelTop,
                width: panelWidth,
                maxHeight: `calc(100vh - ${VIEWPORT_GAP * 2}px)`,
                WebkitBackdropFilter: "blur(30px) saturate(165%)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(145deg, rgb(255 255 255 / 0.14), transparent 38%), radial-gradient(circle at 90% 100%, hsl(${orbColor} 85% 62% / 0.14), transparent 55%)`,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgb(255 255 255 / 0.8) 0.55px, transparent 0.75px)",
                  backgroundSize: "3px 3px",
                  maskImage: "linear-gradient(to bottom right, black, transparent 85%)",
                  WebkitMaskImage: "linear-gradient(to bottom right, black, transparent 85%)",
                }}
              />

              <div className="relative p-4">
                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  className="absolute right-2.5 top-2.5 rounded-full p-1 text-foreground/40 transition hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  aria-label={copy.close}
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>

                <p className="pr-7 font-mono text-[9px] font-semibold tracking-[0.16em] text-blue-500 dark:text-cyan-300">
                  {copy.eyebrow}
                </p>

                {messages.length === 0 ? (
                  <>
                    <h2 className="mt-2 pr-4 text-[15px] font-semibold leading-snug">
                      {copy.question}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {copy.suggestions.map((suggestion) => (
                        <button
                          key={suggestion.label}
                          type="button"
                          onClick={() => void askQuestion(suggestion.question)}
                          className="rounded-full border border-white/10 bg-background/20 px-2.5 py-1 font-mono text-[10px] text-foreground/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-lg transition hover:border-brand/35 hover:bg-brand/15 hover:text-foreground"
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
                            ? "ml-8 rounded-xl rounded-br-sm border border-brand/25 bg-brand/20 px-3 py-2 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-lg"
                            : "mr-5 rounded-xl rounded-bl-sm border border-white/10 bg-background/20 px-3 py-2 text-foreground/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-lg"
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

                <form
                  onSubmit={handleSubmit}
                  className="mt-3 flex items-center gap-2 rounded-full border border-white/10 bg-background/20 p-1 pl-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
                >
                  <input
                    ref={inputRef}
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
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-brand/35 text-foreground shadow-[0_5px_18px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-lg transition hover:bg-brand/50 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={copy.send}
                  >
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </form>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={isChatOpen ? copy.close : copy.open}
        aria-expanded={isChatOpen}
        aria-controls="portfolio-assistant-panel"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.62 }}
        animate={{ x: orbLeft, y: orbTop, opacity: 1, scale: orbScale }}
        transition={{
          ...springTransition,
          scale: prefersReducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 280, damping: 22 },
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={cancelPointerInteraction}
        onClick={handleOrbClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={() => setIsHovered(false)}
        className="fixed left-0 top-0 z-[9999] select-none rounded-full bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{
          width: ORB_SIZE,
          height: ORB_SIZE,
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none",
          willChange: "transform",
          background: `
            radial-gradient(ellipse 55% 40% at 36% 28%, hsl(${orbColor} 90% 92% / 0.26), transparent 60%),
            radial-gradient(ellipse 80% 80% at 50% 50%, hsl(${orbColor} 55% 55% / 0.13), transparent 75%)
          `,
          backdropFilter: "blur(22px) saturate(200%)",
          WebkitBackdropFilter: "blur(22px) saturate(200%)",
          boxShadow: `
            0 0 ${Math.round(glowBlur / 2)}px ${Math.round(glowBlur / 5)}px hsl(${orbColor} 80% 65% / ${directGlowAlpha}),
            0 8px 40px 0 hsl(${orbColor} 50% 30% / ${dropGlowAlpha})
          `,
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span
            className="absolute -inset-[12%] transition-opacity duration-500"
            style={{
              opacity: patternActive ? 0.88 : 0.68,
              filter: "saturate(1.35) contrast(1.08)",
              mixBlendMode: isBackend ? "screen" : "multiply",
            }}
          >
            <Dithering
              style={{ height: "100%", width: "100%" }}
              colorBack={patternBack}
              colorFront={patternFront}
              shape={isBackend ? "warp" : "sphere"}
              type="4x4"
              pxSize={1.35}
              scale={0.72}
              speed={
                prefersReducedMotion
                  ? 0
                  : patternActive
                    ? ORB_PATTERN_ACTIVE_SPEED
                    : ORB_PATTERN_IDLE_SPEED
              }
            />
          </span>
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_48%_42%,transparent_24%,rgba(3,8,20,0.16)_58%,rgba(1,4,12,0.58)_100%)]" />
        </span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse 46% 30% at 38% 25%, hsl(0 0% 100% / 0.64), transparent 54%)",
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(ellipse 62% 36% at 50% 90%, hsl(${orbColor} 70% 68% / 0.22), transparent 65%)`,
          }}
        />
        {isChatOpen && !prefersReducedMotion && (
          <motion.span
            aria-hidden="true"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            className="pointer-events-none absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,transparent_48%,rgba(103,232,249,0.16)_68%,transparent_74%)] blur-[2px]"
          />
        )}
      </motion.button>
    </>
  )
}
