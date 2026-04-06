import { DEFAULT_CONFIG, QUICK_DURATION_PRESETS } from '../constants'
import type {
  DurationKey,
  TrafficLightConfig,
  TrafficLightState,
} from '../types'

export function cycleDurationPreset(
  config: TrafficLightConfig,
  key: DurationKey,
) {
  const presets = QUICK_DURATION_PRESETS[key] as readonly number[]
  const currentValue = config[key]
  const currentIndex = presets.indexOf(currentValue)

  if (currentIndex === -1) {
    return presets[0]
  }

  return presets[(currentIndex + 1) % presets.length]
}

export function isCurrentStateDurationKey(
  key: DurationKey,
  state: TrafficLightState,
) {
  return (
    (key === 'redDuration' && state === 'red') ||
    (key === 'yellowDuration' && state === 'yellow') ||
    (key === 'greenDuration' && state === 'green')
  )
}

export function getAudioStatusMessage(options: {
  isBlocked: boolean
  isReady: boolean
  isSoundEnabled: boolean
  isSupported: boolean
}) {
  const { isBlocked, isReady, isSoundEnabled, isSupported } = options

  if (!isSoundEnabled) {
    return 'El sonido esta desactivado.'
  }

  if (!isSupported) {
    return 'Tu navegador no soporta audio web.'
  }

  if (isReady) {
    return 'Audio listo.'
  }

  if (isBlocked) {
    return 'Toca la pantalla para habilitar el audio.'
  }

  return 'Toca la pantalla para habilitar el audio.'
}

export function getDefaultAppConfig(): TrafficLightConfig {
  return { ...DEFAULT_CONFIG, mode: 'automatic' }
}
