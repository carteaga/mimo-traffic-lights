import { Controls } from './Controls'
import { HeroHeader } from './HeroHeader'
import { QuickSettingsRail } from './QuickSettingsRail'
import { TrafficLight } from './TrafficLight'
import type {
  DurationKey,
  TrafficLightConfig,
  TrafficLightState,
} from '../types'

type HeroSectionProps = {
  config: TrafficLightConfig
  currentState: TrafficLightState
  isRunning: boolean
  isSoundBlocked: boolean
  isTransitionImminent: boolean
  remoteSessionLocked: boolean
  timeLeft: number
  onCycleDuration: (key: DurationKey) => void
  onReset: () => void
  onTogglePlayback: () => void
  onToggleSound: () => void
}

export function HeroSection({
  config,
  currentState,
  isRunning,
  isSoundBlocked,
  isTransitionImminent,
  remoteSessionLocked,
  timeLeft,
  onCycleDuration,
  onReset,
  onTogglePlayback,
  onToggleSound,
}: HeroSectionProps) {
  const heroHeader = (
    <HeroHeader currentState={currentState} timeLeft={timeLeft} />
  )

  const quickSettingsRail = (
    <QuickSettingsRail
      config={config}
      isSoundBlocked={isSoundBlocked}
      onCycleDuration={onCycleDuration}
      onToggleSound={onToggleSound}
    />
  )

  const playbackControls = (
    <Controls
      disabled={remoteSessionLocked}
      isRunning={isRunning}
      onReset={onReset}
      onTogglePlayback={onTogglePlayback}
    />
  )

  return (
    <section className="hero-panel" aria-labelledby="main-seo-title">
      <h1 id="main-seo-title" className="sr-only">
        Semaforo virtual educativo para celular
      </h1>
      <div className="hero-mobile-topbar">
        <div className="hero-mobile-header">
          {heroHeader}
        </div>
      </div>
      <div className="hero-desktop-header">
        {heroHeader}
      </div>
      <div className="hero-light-stage">
        <div className="hero-mobile-stage-shell">
          <div className="hero-mobile-rail hero-mobile-rail--left">
            {quickSettingsRail}
          </div>
          <div className="hero-mobile-stage-center">
            <TrafficLight
              currentState={currentState}
              isTransitionImminent={isTransitionImminent}
            />
          </div>
          <div className="hero-mobile-rail hero-mobile-rail--right">
            {playbackControls}
          </div>
        </div>
        <div className="hero-light-stack">
          <div className="hero-settings-overlay">
            {quickSettingsRail}
          </div>
          <TrafficLight
            currentState={currentState}
            isTransitionImminent={isTransitionImminent}
          />
          <div className="hero-controls-overlay">
            {playbackControls}
          </div>
        </div>
      </div>
    </section>
  )
}
