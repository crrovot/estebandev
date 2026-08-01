"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export interface OrbBounds {
  width: number
  height: number
}

export interface OrbMotionConfig {
  orbRadius?: number
  padding?: number
  speedFactor?: number
  dwellMin?: number
  dwellMax?: number
  stiffnessBase?: number
  dampingBase?: number
  disabled?: boolean
}

export interface OrbMotionReturn {
  x: number
  y: number
  stiffness: number
  damping: number
  teleport: (x: number, y: number) => void
  pause: () => void
  resume: () => void
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export function useOrbMotion(
  bounds: OrbBounds,
  config: OrbMotionConfig = {},
): OrbMotionReturn {
  const {
    orbRadius = 32,
    padding = 16,
    speedFactor = 0.62,
    dwellMin = 1200,
    dwellMax = 2800,
    stiffnessBase = 34,
    dampingBase = 7,
    disabled = false,
  } = config

  const safeInset = orbRadius + padding
  const [position, setPosition] = useState({ x: -500, y: -500 })
  const [spring, setSpring] = useState({
    stiffness: stiffnessBase,
    damping: dampingBase,
  })
  const initializedRef = useRef(false)
  const pausedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const positionRef = useRef(position)
  const boundsRef = useRef(bounds)
  const disabledRef = useRef(disabled)

  boundsRef.current = bounds
  disabledRef.current = disabled

  const clampToViewport = useCallback(
    (x: number, y: number) => {
      const { width, height } = boundsRef.current
      const maxX = Math.max(safeInset, width - safeInset)
      const maxY = Math.max(safeInset, height - safeInset)

      return {
        x: Math.min(Math.max(safeInset, x), maxX),
        y: Math.min(Math.max(safeInset, y), maxY),
      }
    },
    [safeInset],
  )

  const getTarget = useCallback(() => {
    const { width, height } = boundsRef.current
    const maxX = Math.max(safeInset, width - safeInset)
    const maxY = Math.max(safeInset, height - safeInset)

    return {
      x: randomBetween(safeInset, maxX),
      y: randomBetween(safeInset, maxY),
    }
  }, [safeInset])

  const moveTo = useCallback(
    (nextX: number, nextY: number) => {
      const next = clampToViewport(nextX, nextY)
      const distance = Math.hypot(
        next.x - positionRef.current.x,
        next.y - positionRef.current.y,
      )
      const speed = speedFactor * Math.log1p(Math.max(distance, 1))

      setSpring({
        stiffness: Math.max(8, stiffnessBase - speed * 0.5),
        damping: Math.max(3, dampingBase - speed * 0.09),
      })
      setPosition(next)
      positionRef.current = next
    },
    [clampToViewport, dampingBase, speedFactor, stiffnessBase],
  )

  const scheduleRef = useRef<() => void>(() => undefined)
  scheduleRef.current = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!initializedRef.current || pausedRef.current || disabledRef.current) return

    timerRef.current = setTimeout(() => {
      if (pausedRef.current || disabledRef.current) return
      const target = getTarget()
      moveTo(target.x, target.y)
      scheduleRef.current()
    }, randomBetween(dwellMin, dwellMax))
  }

  useEffect(() => {
    if (bounds.width === 0 || bounds.height === 0) return

    if (!initializedRef.current) {
      initializedRef.current = true
      const initial = disabled
        ? clampToViewport(bounds.width, bounds.height)
        : { x: bounds.width / 2, y: bounds.height / 2 }

      positionRef.current = initial
      setPosition(initial)
      if (!disabled) scheduleRef.current()
      return
    }

    const current = disabled
      ? clampToViewport(bounds.width, bounds.height)
      : clampToViewport(positionRef.current.x, positionRef.current.y)
    positionRef.current = current
    setPosition(current)
  }, [bounds.height, bounds.width, clampToViewport, disabled])

  useEffect(() => {
    if (disabled) {
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }

    if (initializedRef.current && !pausedRef.current) scheduleRef.current()
  }, [disabled])

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )

  const teleport = useCallback(
    (x: number, y: number) => {
      if (disabledRef.current) return
      if (timerRef.current) clearTimeout(timerRef.current)
      moveTo(x, y)
    },
    [moveTo],
  )

  const pause = useCallback(() => {
    pausedRef.current = true
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const resume = useCallback(() => {
    pausedRef.current = false
    scheduleRef.current()
  }, [])

  return {
    x: position.x,
    y: position.y,
    stiffness: spring.stiffness,
    damping: spring.damping,
    teleport,
    pause,
    resume,
  }
}
