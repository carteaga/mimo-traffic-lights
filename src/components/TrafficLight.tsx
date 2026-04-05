import { STATE_DESCRIPTIONS, STATE_LABELS } from '../constants'
import type { TrafficLightState } from '../types'
import { TrafficLightLamp } from './TrafficLightLamp'

type TrafficLightProps = {
  currentState: TrafficLightState
}

export function TrafficLight({ currentState }: TrafficLightProps) {
  return (
    <section className="panel traffic-light-card" aria-labelledby="estado-actual">
      <div
        className="traffic-light-shell"
        role="img"
        aria-label={`Semaforo en ${STATE_LABELS[currentState].toLowerCase()}`}
      >
        <TrafficLightLamp color="red" isActive={currentState === 'red'} />
        <TrafficLightLamp color="yellow" isActive={currentState === 'yellow'} />
        <TrafficLightLamp color="green" isActive={currentState === 'green'} />
      </div>

      <div className="status-copy">
        <p className="eyebrow">Simulador educativo</p>
        <h1 id="estado-actual">Semaforo virtual</h1>
        <p className="status-label">{STATE_LABELS[currentState]}</p>
        <p className="status-description">{STATE_DESCRIPTIONS[currentState]}</p>
      </div>
    </section>
  )
}
