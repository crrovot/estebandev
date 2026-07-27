"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { Track } from "@/lib/i18n"

const STORAGE_KEY = "esteban-cv-track"

type TrackContextValue = {
  track: Track
  isBackend: boolean
  setTrack: (track: Track) => void
  toggleTrack: () => void
}

const TrackContext = createContext<TrackContextValue | null>(null)

/**
 * The visual theme doubles as a content switch:
 * dark  -> backend track
 * light -> frontend / product track
 */
export function TrackProvider({ children }: { children: React.ReactNode }) {
  const [track, setTrackState] = useState<Track>("backend")

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === "backend" || saved === "frontend") setTrackState(saved)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", track === "backend")
  }, [track])

  const setTrack = useCallback((next: Track) => {
    setTrackState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const toggleTrack = useCallback(() => {
    setTrackState((current) => {
      const next: Track = current === "backend" ? "frontend" : "backend"
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ track, isBackend: track === "backend", setTrack, toggleTrack }),
    [track, setTrack, toggleTrack],
  )

  return <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
}

export function useTrack() {
  const context = useContext(TrackContext)
  if (!context) throw new Error("useTrack must be used within a TrackProvider")
  return context
}
