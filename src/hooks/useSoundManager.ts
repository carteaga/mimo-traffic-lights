import { useRef } from 'react'

import type { TrafficLightState } from '../types'

const FREQUENCIES: Record<TrafficLightState, number> = {
  red: 220,
  yellow: 440,
  green: 660,
}

export function useSoundManager() {
  const audioContextRef = useRef<AudioContext | null>(null)

  function getAudioContext() {
    if (typeof window === 'undefined') {
      return null
    }

    const AudioContextClass = window.AudioContext

    if (!AudioContextClass) {
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
      return
    }

    if (context.state === 'suspended') {
      await context.resume()
    }
  }

  async function playTone(state: TrafficLightState) {
    const context = getAudioContext()

    if (!context) {
      return
    }

    if (context.state === 'suspended') {
      await context.resume()
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

  return { playTone, primeAudio }
}
