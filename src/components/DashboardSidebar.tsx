import { RemoteSessionPanel } from './RemoteSessionPanel'
import { SettingsPanel } from './SettingsPanel'
import { SoundToggle } from './SoundToggle'
import type {
  DurationKey,
  TrafficLightConfig,
  TrafficLightState,
} from '../types'

type DashboardSidebarProps = {
  audioStatusMessage: string
  config: TrafficLightConfig
  isDevSoundToolsEnabled: boolean
  onDurationChange: (key: DurationKey, value: number) => void
  onPlayTestTone: () => void
  onRemoteStateChange: (state: TrafficLightState) => void
  onResetDefaults: () => void
  onSessionLockChange: (locked: boolean) => void
  onToggleSound: () => void
}

export function DashboardSidebar({
  audioStatusMessage,
  config,
  isDevSoundToolsEnabled,
  onDurationChange,
  onPlayTestTone,
  onRemoteStateChange,
  onResetDefaults,
  onSessionLockChange,
  onToggleSound,
}: DashboardSidebarProps) {
  return (
    <aside className="dashboard-side">
      <section className="panel seo-copy" aria-labelledby="seo-overview-title">
        <p className="eyebrow">Semaforo virtual</p>
        <h2 id="seo-overview-title">Simulador de semaforo para celular</h2>
        <p>
          Este semaforo virtual educativo muestra las luces roja, amarilla y
          verde en formato vertical, con temporizador visible y sonido opcional
          para apoyar actividades pedagogicas.
        </p>
        <p>
          Funciona como simulacion educativa en telefono o navegador y permite
          practicar el cambio de estados del semaforo, ajustar tiempos y usar
          un modo automatico o manual segun la actividad.
        </p>
      </section>
      <RemoteSessionPanel
        onRemoteStateChange={onRemoteStateChange}
        onSessionLockChange={onSessionLockChange}
      />
      <SettingsPanel
        config={config}
        onDurationChange={onDurationChange}
        onResetDefaults={onResetDefaults}
      />
      <section className="panel sound-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Accesibilidad</p>
            <h2>Audio</h2>
          </div>
        </div>
        <SoundToggle enabled={config.soundEnabled} onToggle={onToggleSound} />
        {isDevSoundToolsEnabled ? (
          <button
            type="button"
            className="toggle sound-test-button"
            onClick={onPlayTestTone}
          >
            Probar sonido
          </button>
        ) : null}
        <p className="field-help">{audioStatusMessage}</p>
      </section>

      <section className="panel notice-card">
        <p className="eyebrow">Uso responsable</p>
        <h2>Simulacion educativa</h2>
        <p>
          Esta app es una simulacion educativa. No reemplaza senalizacion
          oficial ni tiene validez para control de transito real.
        </p>
      </section>
    </aside>
  )
}
