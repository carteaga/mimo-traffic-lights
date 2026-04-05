import { DEFAULT_CONFIG, MAX_DURATION, MIN_DURATION } from '../constants'
import type { TrafficLightConfig, TrafficLightState } from '../types'

export function clampDuration(value: number) {
  if (!Number.isFinite(value)) {
    return MIN_DURATION
  }

  return Math.min(MAX_DURATION, Math.max(MIN_DURATION, Math.round(value)))
}

export function sanitizeConfig(input: unknown): TrafficLightConfig {
  if (!input || typeof input !== 'object') {
    return DEFAULT_CONFIG
  }

  const candidate = input as Partial<TrafficLightConfig>

  return {
    redDuration: clampDuration(candidate.redDuration ?? DEFAULT_CONFIG.redDuration),
    yellowDuration: clampDuration(
      candidate.yellowDuration ?? DEFAULT_CONFIG.yellowDuration,
    ),
    greenDuration: clampDuration(
      candidate.greenDuration ?? DEFAULT_CONFIG.greenDuration,
    ),
    mode:
      candidate.mode === 'manual' || candidate.mode === 'automatic'
        ? candidate.mode
        : DEFAULT_CONFIG.mode,
    soundEnabled:
      typeof candidate.soundEnabled === 'boolean'
        ? candidate.soundEnabled
        : DEFAULT_CONFIG.soundEnabled,
  }
}

export function getDurationForState(
  config: TrafficLightConfig,
  state: TrafficLightState,
) {
  switch (state) {
    case 'red':
      return config.redDuration
    case 'yellow':
      return config.yellowDuration
    case 'green':
      return config.greenDuration
  }
}
