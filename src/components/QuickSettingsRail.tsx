import type { TrafficLightConfig } from '../types'

type QuickSettingsRailProps = {
  config: TrafficLightConfig
  isSoundBlocked: boolean
  onToggleSound: () => void
}

const QUICK_FIELDS = [
  { key: 'redDuration', label: 'Rojo', icon: '🔴' },
  { key: 'yellowDuration', label: 'Amarillo', icon: '🟡' },
  { key: 'greenDuration', label: 'Verde', icon: '🟢' },
] as const

export function QuickSettingsRail({
  config,
  isSoundBlocked,
  onToggleSound,
}: QuickSettingsRailProps) {
  return (
    <section className="quick-settings-rail" aria-label="Ajustes rápidos del semáforo">
      <div className="quick-settings-rail__group">
        <p className="quick-settings-rail__label" aria-hidden="true">
          ⏱
        </p>
        {QUICK_FIELDS.map((field) => (
          <div key={field.key} className="quick-setting-chip">
            <div className="quick-setting-chip__header">
              <span aria-hidden="true">{field.icon}</span>
              <span>{field.label.charAt(0)}</span>
            </div>
            <div className="quick-setting-chip__summary">{config[field.key]}s</div>
          </div>
        ))}
      </div>

      <div className="quick-settings-rail__group">
        <button
          type="button"
          className={`quick-sound-toggle ${config.soundEnabled ? 'quick-sound-toggle--on' : ''}`}
          onClick={onToggleSound}
          aria-pressed={config.soundEnabled}
          aria-label={config.soundEnabled ? 'Desactivar sonido' : 'Activar sonido'}
        >
          <span aria-hidden="true">{config.soundEnabled ? '🔊' : '🔇'}</span>
        </button>
        {isSoundBlocked && config.soundEnabled ? (
          <p className="quick-settings-rail__hint">Toca para activar audio</p>
        ) : null}
      </div>
    </section>
  )
}
