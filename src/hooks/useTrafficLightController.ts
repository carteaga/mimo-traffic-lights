import { useEffect, useRef, useState } from 'react'

import { STATE_SEQUENCE } from '../constants'
import { getDurationForState } from '../utils/config'
import type { TrafficLightConfig, TrafficLightState } from '../types'

type ControllerOptions = {
  config: TrafficLightConfig
  onStateChange?: (state: TrafficLightState) => void
}

function getNextState(currentState: TrafficLightState) {
  const currentIndex = STATE_SEQUENCE.indexOf(currentState)
  const nextIndex = (currentIndex + 1) % STATE_SEQUENCE.length

  return STATE_SEQUENCE[nextIndex]
}

export function useTrafficLightController({
  config,
  onStateChange,
}: ControllerOptions) {
  const [currentState, setCurrentState] = useState<TrafficLightState>('red')
  const [timeLeft, setTimeLeft] = useState(config.redDuration)
  const [isRunning, setIsRunning] = useState(false)
  const lastStateRef = useRef<TrafficLightState>('red')

  useEffect(() => {
    if (lastStateRef.current !== currentState) {
      lastStateRef.current = currentState
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
          const nextState = getNextState(lastStateRef.current)
          lastStateRef.current = nextState
          setCurrentState(nextState)
          return getDurationForState(config, nextState)
        }

        setIsRunning(false)
        return getDurationForState(config, lastStateRef.current)
      })
    }, 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [config, isRunning])

  function start() {
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
  }

  function reset() {
    setIsRunning(false)
    lastStateRef.current = 'red'
    setCurrentState('red')
    setTimeLeft(config.redDuration)
  }

  function selectState(state: TrafficLightState) {
    lastStateRef.current = state
    setCurrentState(state)
    setTimeLeft(getDurationForState(config, state))
    setIsRunning(false)
  }

  return {
    currentState,
    isRunning,
    pause,
    reset,
    selectState,
    start,
    timeLeft,
  }
}
