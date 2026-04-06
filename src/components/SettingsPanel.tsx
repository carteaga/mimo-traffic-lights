import { MAX_DURATION, MIN_DURATION } from '../constants'
import type { DurationKey, TrafficLightConfig } from '../types'

type SettingsPanelProps = {
  config: TrafficLightConfig
  onDurationChange: (key: DurationKey, value: number) => void
  onResetDefaults: () => void
}

const FIELDS = [
  { key: 'redDuration', label: 'Rojo' },
  { key: 'yellowDuration', label: 'Amarillo' },
  { key: 'greenDuration', label: 'Verde' },
] as const

export function SettingsPanel({
  config,
  onDurationChange,
  onResetDefaults,
}: SettingsPanelProps) {
  return (
    <section className="panel settings-card" aria-labelledby="configuracion">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Configuracion</p>
          <h2 id="configuracion">Tiempos del semaforo</h2>
        </div>
        <button type="button" className="link-button" onClick={onResetDefaults}>
          Restaurar
        </button>
      </div>

      <div className="settings-grid">
        {FIELDS.map((field) => (
          <section key={field.key} className="field field--stepper">
            <span>{field.label}</span>
            <div className="duration-stepper" aria-label={`Tiempo ${field.label.toLowerCase()}`}>
              <button
                type="button"
                className="stepper-button"
                onClick={() =>
                  onDurationChange(field.key, Math.max(MIN_DURATION, config[field.key] - 1))
                }
                disabled={config[field.key] <= MIN_DURATION}
                aria-label={`Reducir tiempo ${field.label.toLowerCase()}`}
              >
                −
              </button>
              <span className="stepper-value">{config[field.key]}s</span>
              <button
                type="button"
                className="stepper-button"
                onClick={() =>
                  onDurationChange(field.key, Math.min(MAX_DURATION, config[field.key] + 1))
                }
                disabled={config[field.key] >= MAX_DURATION}
                aria-label={`Aumentar tiempo ${field.label.toLowerCase()}`}
              >
                +
              </button>
            </div>
          </section>
        ))}
      </div>
      <p className="field-help">
        Valores permitidos entre {MIN_DURATION} y {MAX_DURATION} segundos.
      </p>
    </section>
  )
}
