import { useEffect, useRef, useState } from 'react'

import { STATE_SEQUENCE } from '../constants'
import { getDurationForState } from '../utils/config'
import type { TrafficLightConfig, TrafficLightState } from '../types'

type ControllerOptions = {
  config: TrafficLightConfig
  onCountdownTick?: (timeLeft: number, state: TrafficLightState) => void
  onStateChange?: (state: TrafficLightState) => void
}

function getNextState(currentState: TrafficLightState) {
  const currentIndex = STATE_SEQUENCE.indexOf(currentState)
  const nextIndex = (currentIndex + 1) % STATE_SEQUENCE.length

  return STATE_SEQUENCE[nextIndex]
}

export function useTrafficLightController({
  config,
  onCountdownTick,
  onStateChange,
}: ControllerOptions) {
  const [currentState, setCurrentState] = useState<TrafficLightState>('red')
  const [timeLeft, setTimeLeft] = useState(config.redDuration)
  const [isRunning, setIsRunning] = useState(false)
  const sequenceStateRef = useRef<TrafficLightState>('red')
  const previousEmittedStateRef = useRef<TrafficLightState>('red')
  const lastCountdownTickRef = useRef<number | null>(null)

  const isTransitionImminent = isRunning && timeLeft <= 3

  useEffect(() => {
    if (!isRunning || timeLeft > 3 || timeLeft < 1) {
      return
    }

    if (lastCountdownTickRef.current === timeLeft) {
      return
    }

    lastCountdownTickRef.current = timeLeft
    onCountdownTick?.(timeLeft, currentState)
  }, [currentState, isRunning, onCountdownTick, timeLeft])

  useEffect(() => {
    if (previousEmittedStateRef.current !== currentState) {
      previousEmittedStateRef.current = currentState
      lastCountdownTickRef.current = null
      onStateChange?.(currentState)
    }
  }, [currentState, onStateChange])

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const interval = window.setInterval(() => {
      setTimeLeft((previousTimeLeft) => {
        if (previousTimeLeft > 1) {
          return previousTimeLeft - 1
        }

        if (config.mode === 'automatic') {
          const nextState = getNextState(sequenceStateRef.current)
          sequenceStateRef.current = nextState
          setCurrentState(nextState)
          return getDurationForState(config, nextState)
        }

        setIsRunning(false)
        return getDurationForState(config, sequenceStateRef.current)
      })
    }, 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [config, isRunning])

  function start() {
    lastCountdownTickRef.current = null
    setTimeLeft((previousTimeLeft) => {
      if (previousTimeLeft < 1) {
        return getDurationForState(config, currentState)
      }

      return previousTimeLeft
    })

    setIsRunning(true)
  }

  function pause() {
    setIsRunning(false)
    lastCountdownTickRef.current = null
  }

  function reset() {
    setIsRunning(false)
    lastCountdownTickRef.current = null
    sequenceStateRef.current = 'red'
    setCurrentState('red')
    setTimeLeft(config.redDuration)
  }

  function selectState(state: TrafficLightState) {
    lastCountdownTickRef.current = null
    sequenceStateRef.current = state
    setCurrentState(state)
    setTimeLeft(getDurationForState(config, state))
    setIsRunning(false)
  }

  return {
    currentState,
    isTransitionImminent,
    isRunning,
    pause,
    reset,
    selectState,
    start,
    timeLeft,
  }
}
