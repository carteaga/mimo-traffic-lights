import { useRef, useState } from 'react'

import type { TrafficLightState } from '../types'

const FREQUENCIES: Record<TrafficLightState, number> = {
  red: 220,
  yellow: 440,
  green: 660,
}

export function useSoundManager() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const [isSupported, setIsSupported] = useState(
    typeof window !== 'undefined' && Boolean(window.AudioContext),
  )
  const [isReady, setIsReady] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)

  function getAudioContext() {
    if (typeof window === 'undefined') {
      setIsSupported(false)
      return null
    }

    const AudioContextClass = window.AudioContext

    if (!AudioContextClass) {
      setIsSupported(false)
      return null
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass()
    }

    return audioContextRef.current
  }

  async function primeAudio() {
    const context = getAudioContext()

    if (!context) {
      return 'unsupported' as const
    }

    try {
      if (context.state === 'suspended') {
        await context.resume()
      }
    } catch {
      setIsReady(false)
      setIsBlocked(true)
      return 'blocked' as const
    }

    const ready = context.state === 'running'
    setIsReady(ready)
    setIsBlocked(!ready)

    if (!ready) {
      return 'blocked' as const
    }

    return 'ready' as const
  }

  async function playTone(state: TrafficLightState) {
    const context = getAudioContext()

    if (!context) {
      return
    }

    if (context.state !== 'running') {
      const primeResult = await primeAudio()

      if (primeResult !== 'ready') {
        return
      }
    }

    const oscillator = context.createOscillator()
    const gainNode = context.createGain()
    const now = context.currentTime

    oscillator.type = state === 'yellow' ? 'triangle' : 'sine'
    oscillator.frequency.setValueAtTime(FREQUENCIES[state], now)

    gainNode.gain.setValueAtTime(0.0001, now)
    gainNode.gain.exponentialRampToValueAtTime(0.1, now + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.28)

    oscillator.connect(gainNode)
    gainNode.connect(context.destination)

    oscillator.start(now)
    oscillator.stop(now + 0.3)
  }

  async function playTestTone() {
    const primeResult = await primeAudio()

    if (primeResult !== 'ready') {
      return primeResult
    }

    await playTone('green')
    return 'ready' as const
  }

  return { isBlocked, isReady, isSupported, playTestTone, playTone, primeAudio }
}
