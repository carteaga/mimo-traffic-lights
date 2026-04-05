import { STATE_LABELS } from '../constants'
import type { Mode, TrafficLightState } from '../types'

type ControlsProps = {
  currentState: TrafficLightState
  isRunning: boolean
  mode: Mode
  onModeChange: (mode: Mode) => void
  onPause: () => void
  onReset: () => void
  onSelectState: (state: TrafficLightState) => void
  onStart: () => void
}

export function Controls({
  currentState,
  isRunning,
  mode,
  onModeChange,
  onPause,
  onReset,
  onSelectState,
  onStart,
}: ControlsProps) {
  return (
    <section className="panel controls-card">
      <div className="mode-switch" role="tablist" aria-label="Modo de operacion">
        <button
          type="button"
          className={mode === 'automatic' ? 'mode-chip mode-chip--active' : 'mode-chip'}
          onClick={() => onModeChange('automatic')}
          role="tab"
          aria-selected={mode === 'automatic'}
        >
          Automatico
        </button>
        <button
          type="button"
          className={mode === 'manual' ? 'mode-chip mode-chip--active' : 'mode-chip'}
          onClick={() => onModeChange('manual')}
          role="tab"
          aria-selected={mode === 'manual'}
        >
          Manual
        </button>
      </div>

      <div className="primary-actions">
        <button
          type="button"
          className="action-button action-button--start"
          onClick={onStart}
        >
          Iniciar
        </button>
        <button
          type="button"
          className="action-button"
          onClick={onPause}
          disabled={!isRunning}
        >
          Pausar
        </button>
        <button type="button" className="action-button" onClick={onReset}>
          Reiniciar
        </button>
      </div>

      <div className="manual-grid" aria-label="Seleccion manual de luz">
        {(['red', 'yellow', 'green'] as const).map((state) => (
          <button
            key={state}
            type="button"
            className={
              currentState === state
                ? 'manual-button manual-button--active'
                : 'manual-button'
            }
            onClick={() => onSelectState(state)}
          >
            {STATE_LABELS[state]}
          </button>
        ))}
      </div>
    </section>
  )
}
