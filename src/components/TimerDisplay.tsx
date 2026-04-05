import type { TrafficLightState } from '../types'

type TimerDisplayProps = {
  currentState: TrafficLightState
  timeLeft: number
}

export function TimerDisplay({ timeLeft }: TimerDisplayProps) {
  return (
    <div className="timer-chip" aria-live="polite">
      <div className="timer-value">{timeLeft}s</div>
    </div>
  )
}
