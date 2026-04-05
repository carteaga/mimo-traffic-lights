import { STATE_LABELS } from '../constants'
import type { TrafficLightState } from '../types'
import { TrafficLightLamp } from './TrafficLightLamp'

type TrafficLightProps = {
  currentState: TrafficLightState
  isTransitionImminent: boolean
}

export function TrafficLight({
  currentState,
  isTransitionImminent,
}: TrafficLightProps) {
  return (
    <section className="panel traffic-light-card" aria-label="Semaforo virtual">
      <div
        className="traffic-light-shell"
        role="img"
        aria-label={`Semaforo en ${STATE_LABELS[currentState].toLowerCase()}`}
      >
        <TrafficLightLamp
          color="red"
          isActive={currentState === 'red'}
          isBlinking={isTransitionImminent && currentState === 'red'}
        />
        <TrafficLightLamp
          color="yellow"
          isActive={currentState === 'yellow'}
          isBlinking={isTransitionImminent && currentState === 'yellow'}
        />
        <TrafficLightLamp
          color="green"
          isActive={currentState === 'green'}
          isBlinking={isTransitionImminent && currentState === 'green'}
        />
      </div>
    </section>
  )
}
