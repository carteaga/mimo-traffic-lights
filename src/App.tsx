import './App.css'

import { Controls } from './components/Controls'
import { RemoteSessionPanel } from './components/RemoteSessionPanel'
import { SettingsPanel } from './components/SettingsPanel'
import { SoundToggle } from './components/SoundToggle'
import { TimerDisplay } from './components/TimerDisplay'
import { TrafficLight } from './components/TrafficLight'
import {
  DEFAULT_CONFIG,
  STATE_EMOJIS,
  STATE_LABELS,
  STORAGE_KEY,
} from './constants'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useSoundManager } from './hooks/useSoundManager'
import { useTrafficLightController } from './hooks/useTrafficLightController'
import { useCallback, useState } from 'react'
import { sanitizeConfig } from './utils/config'

function App() {
  const [remoteSessionLocked, setRemoteSessionLocked] = useState(false)
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

  const handleRemoteStateChange = useCallback(
    (state: 'red' | 'yellow' | 'green') => {
      pause()
      selectState(state)
    },
    [pause, selectState],
  )

  return (
    <main className={`app app--${currentState}`}>
      <section className="hero-panel" aria-labelledby="main-seo-title">
        <h1 id="main-seo-title" className="sr-only">
          Semaforo virtual educativo para celular
        </h1>
        <header className="hero-header">
          <div className={`hero-kicker hero-kicker--${currentState}`}>
            <span className="hero-kicker__emoji" aria-hidden="true">
              {STATE_EMOJIS[currentState]}
            </span>
            <span>{STATE_LABELS[currentState]}</span>
          </div>
          <TimerDisplay
            currentState={currentState}
            timeLeft={timeLeft}
          />
          <p className="hero-title">Simulador virtual</p>
        </header>
        <div className="hero-light-stage">
          <div className="hero-light-stack">
            <TrafficLight currentState={currentState} />
            <div className="hero-controls-overlay">
              <Controls
                disabled={remoteSessionLocked}
                isRunning={isRunning}
                onReset={() => handleAction(reset)}
                onTogglePlayback={() =>
                  handleAction(() => {
                    updateConfig({ mode: 'automatic' })
                    if (remoteSessionLocked) {
                      return
                    }
                    if (isRunning) {
                      pause()
                      return
                    }
                    start()
                  })
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard">
        <aside className="dashboard-side">
          <section className="panel seo-copy" aria-labelledby="seo-overview-title">
            <p className="eyebrow">Semaforo virtual</p>
            <h2 id="seo-overview-title">Simulador de semaforo para celular</h2>
            <p>
              Este semaforo virtual educativo muestra las luces roja, amarilla y
              verde en formato vertical, con temporizador visible y sonido
              opcional para apoyar actividades pedagogicas.
            </p>
            <p>
              Funciona como simulacion educativa en telefono o navegador y
              permite practicar el cambio de estados del semaforo, ajustar
              tiempos y usar un modo automatico o manual segun la actividad.
            </p>
          </section>
          <RemoteSessionPanel
            onRemoteStateChange={handleRemoteStateChange}
            onSessionLockChange={setRemoteSessionLocked}
          />
          <SettingsPanel
            config={config}
            onDurationChange={handleDurationChange}
            onResetDefaults={() => {
              setStoredConfig({ ...DEFAULT_CONFIG, mode: 'automatic' })
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
            <h2>Simulacion educativa</h2>
            <p>
              Esta app es una simulacion educativa. No reemplaza senalizacion
              oficial ni tiene validez para control de transito real.
            </p>
          </section>
        </aside>
      </section>

      <footer className="footer">
        <p>Vibecodeado por Cristian</p>
        <a href="https://github.com/carteaga/" target="_blank" rel="noreferrer">
          github.com/carteaga
        </a>
      </footer>
    </main>
  )
}

export default App
