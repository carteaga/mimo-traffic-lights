import type { TrafficLightConfig, TrafficLightState } from './types'

export const STORAGE_KEY = 'mimo-traffic-light-config'

export const DEFAULT_CONFIG: TrafficLightConfig = {
  redDuration: 10,
  yellowDuration: 3,
  greenDuration: 8,
  mode: 'automatic',
  soundEnabled: true,
}

export const STATE_LABELS: Record<TrafficLightState, string> = {
  red: 'Rojo',
  yellow: 'Amarillo',
  green: 'Verde',
}

export const STATE_EMOJIS: Record<TrafficLightState, string> = {
  red: '🚦',
  yellow: '🚦',
  green: '🚦',
}

export const STATE_DESCRIPTIONS: Record<TrafficLightState, string> = {
  red: 'Detente',
  yellow: 'Preparate',
  green: 'Avanza',
}

export const STATE_SEQUENCE: TrafficLightState[] = ['red', 'green', 'yellow']

export const MIN_DURATION = 1
export const MAX_DURATION = 120

export const QUICK_DURATION_PRESETS = {
  redDuration: [6, 8, 10, 12],
  yellowDuration: [2, 3, 4],
  greenDuration: [5, 7, 9, 11],
} as const
