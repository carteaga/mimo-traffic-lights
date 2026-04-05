import { useEffect } from 'react'

import './App.css'

import { STATE_LABELS } from './constants'
import { useRemoteControllerSession } from './hooks/useRemoteControllerSession'
import type { TrafficLightState } from './types'

const REMOTE_STATES: TrafficLightState[] = ['red', 'yellow', 'green']

function getSessionIdFromPath() {
  const match = window.location.pathname.match(/^\/remote\/([^/]+)/)
  return match?.[1] ?? ''
}

function RemoteControllerApp() {
  const sessionId = getSessionIdFromPath()
  const { canControl, error, setState, snapshot, status } =
    useRemoteControllerSession(sessionId)

  useEffect(() => {
    const previousTitle = document.title
    const existingRobots = document.querySelector('meta[name="robots"]')
    const previousRobotsContent = existingRobots?.getAttribute('content')
    let createdRobotsMeta: HTMLMetaElement | null = null

    document.title = 'Control remoto del semaforo'

    if (existingRobots) {
      existingRobots.setAttribute('content', 'noindex,nofollow')
    } else {
      createdRobotsMeta = document.createElement('meta')
      createdRobotsMeta.name = 'robots'
      createdRobotsMeta.content = 'noindex,nofollow'
      document.head.appendChild(createdRobotsMeta)
    }

    return () => {
      document.title = previousTitle

      if (existingRobots) {
        if (previousRobotsContent) {
          existingRobots.setAttribute('content', previousRobotsContent)
        } else {
          existingRobots.removeAttribute('content')
        }
      }

      createdRobotsMeta?.remove()
    }
  }, [])

  function getStatusCopy() {
    if (error) {
      return error
    }

    if (status === 'closed') {
      return 'La sesion fue cerrada.'
    }

    if (status === 'error') {
      return 'Ocurrio un error en la sesion remota.'
    }

    if (status === 'connecting') {
      return 'Conectando con la sesion...'
    }

    if (status === 'disconnected') {
      return 'Reconectando con el servidor remoto.'
    }

    if (!snapshot?.displayConnected) {
      return 'Esperando que la pantalla principal se conecte.'
    }

    return 'Conectado al display.'
  }

  return (
    <main className="remote-page">
      <section className="remote-controller-card panel">
        <p className="eyebrow">Control remoto</p>
        <h1>Controla el semaforo</h1>
        <p className="remote-status">{getStatusCopy()}</p>

        <div className="remote-state-grid" aria-label="Estados del semaforo">
          {REMOTE_STATES.map((state) => (
            <button
              key={state}
              type="button"
              className={`remote-state-button remote-state-button--${state}`}
              onClick={() => setState(state)}
              disabled={!canControl}
            >
              {STATE_LABELS[state]}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}

export default RemoteControllerApp
