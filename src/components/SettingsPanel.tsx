import { MAX_DURATION, MIN_DURATION } from '../constants'
import type { TrafficLightConfig } from '../types'

type SettingsPanelProps = {
  config: TrafficLightConfig
  onDurationChange: (
    key: 'redDuration' | 'yellowDuration' | 'greenDuration',
    value: number,
  ) => void
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
          <label key={field.key} className="field">
            <span>{field.label}</span>
            <input
              type="number"
              min={MIN_DURATION}
              max={MAX_DURATION}
              inputMode="numeric"
              value={config[field.key]}
              onChange={(event) =>
                onDurationChange(field.key, Number(event.target.value))
              }
            />
          </label>
        ))}
      </div>
      <p className="field-help">
        Valores permitidos entre {MIN_DURATION} y {MAX_DURATION} segundos.
      </p>
    </section>
  )
}
