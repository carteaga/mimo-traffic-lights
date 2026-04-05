import './App.css'

import { Controls } from './components/Controls'
import { SettingsPanel } from './components/SettingsPanel'
import { SoundToggle } from './components/SoundToggle'
import { TimerDisplay } from './components/TimerDisplay'
import { TrafficLight } from './components/TrafficLight'
import { DEFAULT_CONFIG, STORAGE_KEY } from './constants'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useSoundManager } from './hooks/useSoundManager'
import { useTrafficLightController } from './hooks/useTrafficLightController'
import type { Mode } from './types'
import { sanitizeConfig } from './utils/config'

function App() {
  const [storedConfig, setStoredConfig] = useLocalStorage(
    STORAGE_KEY,
    DEFAULT_CONFIG,
  )
  const config = sanitizeConfig(storedConfig)
  const { playTone, primeAudio } = useSoundManager()

  const { currentState, isRunning, pause, reset, selectState, start, timeLeft } =
    useTrafficLightController({
      config,
      onStateChange: (state) => {
        if (config.soundEnabled) {
          void playTone(state)
        }
      },
    })

  function updateConfig(partial: Partial<typeof config>) {
    setStoredConfig((previousConfig) =>
      sanitizeConfig({ ...previousConfig, ...partial }),
    )
  }

  async function handleAction(action: () => void) {
    await primeAudio()
    action()
  }

  function handleModeChange(mode: Mode) {
    pause()
    updateConfig({ mode })
  }

  function handleDurationChange(
    key: 'redDuration' | 'yellowDuration' | 'greenDuration',
    value: number,
  ) {
    updateConfig({ [key]: value } as Partial<typeof config>)

    const matchesCurrentState =
      (key === 'redDuration' && currentState === 'red') ||
      (key === 'yellowDuration' && currentState === 'yellow') ||
      (key === 'greenDuration' && currentState === 'green')

    if (matchesCurrentState) {
      selectState(currentState)
    }
  }

  return (
    <main className={`app app--${currentState}`}>
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Semaforo virtual educativo</p>
          <h1>Simulador visual y sonoro para practicas pedagogicas</h1>
          <p className="lead">
            Usa el telefono como referencia educativa para detenerse, prepararse
            y avanzar con tiempos configurables.
          </p>
        </div>

        <TrafficLight currentState={currentState} />
      </section>

      <section className="dashboard">
        <div className="dashboard-main">
          <TimerDisplay isRunning={isRunning} timeLeft={timeLeft} />
          <Controls
            currentState={currentState}
            isRunning={isRunning}
            mode={config.mode}
            onModeChange={handleModeChange}
            onPause={() => handleAction(pause)}
            onReset={() => handleAction(reset)}
            onSelectState={(state) => handleAction(() => selectState(state))}
            onStart={() => handleAction(start)}
          />
        </div>

        <aside className="dashboard-side">
          <SettingsPanel
            config={config}
            onDurationChange={handleDurationChange}
            onResetDefaults={() => {
              setStoredConfig(DEFAULT_CONFIG)
              reset()
            }}
          />
          <section className="panel sound-card">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Accesibilidad</p>
                <h2>Audio</h2>
              </div>
            </div>
            <SoundToggle
              enabled={config.soundEnabled}
              onToggle={() =>
                handleAction(() =>
                  updateConfig({ soundEnabled: !config.soundEnabled }),
                )
              }
            />
            <p className="field-help">
              El sonido se habilita tras una interaccion para respetar las
              restricciones del navegador.
            </p>
          </section>

          <section className="panel notice-card">
            <p className="eyebrow">Uso responsable</p>
            <p>
              Esta app es una simulacion educativa. No reemplaza senalizacion
              oficial ni tiene validez para control de transito real.
            </p>
          </section>
        </aside>
      </section>

      <footer className="footer">
        <p>Vibecodeado por Cristian</p>
        <a href="https://github.com/tu-usuario" target="_blank" rel="noreferrer">
          github.com/tu-usuario
        </a>
      </footer>
    </main>
  )
}

export default App
