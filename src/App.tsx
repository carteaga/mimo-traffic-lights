import './App.css'

import { AppFooter } from './components/AppFooter'
import { DashboardSidebar } from './components/DashboardSidebar'
import { HeroSection } from './components/HeroSection'
import { useTrafficLightApp } from './hooks/useTrafficLightApp'

function App() {
  const { actions, derived, state } = useTrafficLightApp()

  return (
    <main className={`app app--${state.currentState}`}>
      <HeroSection
        config={state.config}
        currentState={state.currentState}
        isRunning={state.isRunning}
        isSoundBlocked={state.audio.isBlocked}
        isTransitionImminent={state.isTransitionImminent}
        remoteSessionLocked={state.remoteSessionLocked}
        timeLeft={state.timeLeft}
        onCycleDuration={actions.handleCycleDuration}
        onReset={actions.handleReset}
        onTogglePlayback={actions.handleTogglePlayback}
        onToggleSound={actions.handleToggleSound}
      />
      <section className="dashboard">
        <DashboardSidebar
          audioStatusMessage={derived.audioStatusMessage}
          config={state.config}
          isDevSoundToolsEnabled={derived.isDevSoundToolsEnabled}
          onDurationChange={actions.handleDurationChange}
          onPlayTestTone={actions.handlePlayTestTone}
          onRemoteStateChange={actions.handleRemoteStateChange}
          onResetDefaults={actions.handleResetDefaults}
          onSessionLockChange={actions.handleSessionLockChange}
          onToggleSound={actions.handleToggleSound}
        />
      </section>
      <AppFooter />
    </main>
  )
}

export default App
