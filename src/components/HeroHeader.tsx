import { STATE_EMOJIS, STATE_LABELS } from '../constants'
import { TimerDisplay } from './TimerDisplay'
import type { TrafficLightState } from '../types'

type HeroHeaderProps = {
  currentState: TrafficLightState
  timeLeft: number
}

export function HeroHeader({ currentState, timeLeft }: HeroHeaderProps) {
  return (
    <header className="hero-header">
      <div className={`hero-kicker hero-kicker--${currentState}`}>
        <span className="hero-kicker__emoji" aria-hidden="true">
          {STATE_EMOJIS[currentState]}
        </span>
        <span>{STATE_LABELS[currentState]}</span>
      </div>
      <TimerDisplay timeLeft={timeLeft} />
      <p className="hero-title">Simulador virtual</p>
    </header>
  )
}
