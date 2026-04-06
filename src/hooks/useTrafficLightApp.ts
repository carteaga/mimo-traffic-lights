import { useCallback, useState } from 'react'

import { DEFAULT_CONFIG, STORAGE_KEY } from '../constants'
import { useLocalStorage } from './useLocalStorage'
import { useSoundManager } from './useSoundManager'
import { useTrafficLightController } from './useTrafficLightController'
import { sanitizeConfig } from '../utils/config'
import {
  cycleDurationPreset,
  getAudioStatusMessage,
  getDefaultAppConfig,
  isCurrentStateDurationKey,
} from '../utils/trafficLightApp'
import { useAudioAutoPrime } from './useAudioAutoPrime'
import type {
  DurationKey,
  TrafficLightConfig,
  TrafficLightState,
} from '../types'

export function useTrafficLightApp() {
  const [remoteSessionLocked, setRemoteSessionLocked] = useState(false)
  const [storedConfig, setStoredConfig] = useLocalStorage(
    STORAGE_KEY,
    DEFAULT_CONFIG,
  )
  const config = sanitizeConfig(storedConfig)
  const {
    isBlocked,
    isReady,
    isSupported,
    playCountdownTone,
    playTestTone,
    playTone,
    primeAudio,
  } = useSoundManager()

  const handleCountdownTick = useCallback(() => {
    if (config.soundEnabled && isReady) {
      void playCountdownTone()
    }
  }, [config.soundEnabled, isReady, playCountdownTone])

  const handleStateChange = useCallback((state: TrafficLightState) => {
    if (config.soundEnabled && isReady) {
      void playTone(state)
    }
  }, [config.soundEnabled, isReady, playTone])

  const trafficLight = useTrafficLightController({
    config,
    onCountdownTick: handleCountdownTick,
    onStateChange: handleStateChange,
  })
  const {
    currentState,
    isRunning,
    isTransitionImminent,
    pause,
    reset,
    selectState,
    start,
    timeLeft,
  } = trafficLight

  useAudioAutoPrime({
    enabled: config.soundEnabled,
    isReady,
    isSupported,
    primeAudio,
  })

  const updateConfig = useCallback(
    (partial: Partial<TrafficLightConfig>) => {
      setStoredConfig((previousConfig) =>
        sanitizeConfig({ ...previousConfig, ...partial }),
      )
    },
    [setStoredConfig],
  )

  const runPrimedAction = useCallback(
    async (action: () => void) => {
      await primeAudio()
      action()
    },
    [primeAudio],
  )

  const handleDurationChange = useCallback(
    (key: DurationKey, value: number) => {
      updateConfig({ [key]: value } as Pick<TrafficLightConfig, DurationKey>)

      if (isCurrentStateDurationKey(key, currentState)) {
        selectState(currentState)
      }
    },
    [currentState, selectState, updateConfig],
  )

  const handleCycleDuration = useCallback(
    (key: DurationKey) => {
      handleDurationChange(key, cycleDurationPreset(config, key))
    },
    [config, handleDurationChange],
  )

  const handleToggleSound = useCallback(() => {
    void runPrimedAction(() =>
      updateConfig({ soundEnabled: !config.soundEnabled }),
    )
  }, [config.soundEnabled, runPrimedAction, updateConfig])

  const handleReset = useCallback(() => {
    void runPrimedAction(reset)
  }, [reset, runPrimedAction])

  const handleTogglePlayback = useCallback(() => {
    void runPrimedAction(() => {
      updateConfig({ mode: 'automatic' })

      if (remoteSessionLocked) {
        return
      }

      if (isRunning) {
        pause()
        return
      }

      start()
    })
  }, [isRunning, pause, remoteSessionLocked, runPrimedAction, start, updateConfig])

  const handleResetDefaults = useCallback(() => {
    setStoredConfig(getDefaultAppConfig())
    reset()
  }, [reset, setStoredConfig])

  const handleRemoteStateChange = useCallback(
    (state: TrafficLightState) => {
      pause()
      selectState(state)
    },
    [pause, selectState],
  )

  const handleSessionLockChange = useCallback((locked: boolean) => {
    setRemoteSessionLocked(locked)
  }, [])

  const handlePlayTestTone = useCallback(() => {
    void playTestTone()
  }, [playTestTone])

  return {
    state: {
      audio: {
        isBlocked,
        isReady,
        isSupported,
      },
      config,
      currentState,
      isRunning,
      isTransitionImminent,
      remoteSessionLocked,
      timeLeft,
    },
    derived: {
      audioStatusMessage: getAudioStatusMessage({
        isBlocked,
        isReady,
        isSoundEnabled: config.soundEnabled,
        isSupported,
      }),
      isDevSoundToolsEnabled: import.meta.env.DEV,
    },
    actions: {
      handleCycleDuration,
      handleDurationChange,
      handlePlayTestTone,
      handleRemoteStateChange,
      handleReset,
      handleResetDefaults,
      handleSessionLockChange,
      handleTogglePlayback,
      handleToggleSound,
    },
  }
}
