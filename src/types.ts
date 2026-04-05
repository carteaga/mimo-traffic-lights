export type TrafficLightState = 'red' | 'yellow' | 'green'

export type Mode = 'manual' | 'automatic'

export type TrafficLightConfig = {
  redDuration: number
  yellowDuration: number
  greenDuration: number
  mode: Mode
  soundEnabled: boolean
}
