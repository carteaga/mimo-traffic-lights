import { useEffect, useState } from 'react'

import type { RemoteConnectionStatus, TrafficLightState } from '../types'
import { useRemoteDisplaySession } from '../hooks/useRemoteDisplaySession'
import { checkRemoteBackendHealth } from '../utils/remote'

type RemoteSessionPanelProps = {
  onRemoteStateChange: (state: TrafficLightState) => void
  onSessionLockChange: (locked: boolean) => void
}

const STATUS_COPY: Record<RemoteConnectionStatus, string> = {
  idle: 'Crea una sesion para controlar el semaforo desde otro telefono.',
  creating: 'Preparando sesion remota...',
  connecting: 'Conectando pantalla a la sesion...',
  waiting: 'Sesión activa. Esperando que otro usuario escanee el QR.',
  connected: 'Controlador conectado. El display obedece al control remoto.',
  disconnected: 'La sesion se desconecto. Puedes crear una nueva.',
  closed: 'La sesion remota fue cerrada.',
  error: 'Ocurrio un error al abrir la sesion remota.',
}

export function RemoteSessionPanel({
  onRemoteStateChange,
  onSessionLockChange,
}: RemoteSessionPanelProps) {
  const [qrSrc, setQrSrc] = useState<string | null>(null)
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean | null>(null)
  const { closeSession, controllerUrl, error, snapshot, startSession, status } =
    useRemoteDisplaySession({ onRemoteStateChange })

  useEffect(() => {
    let cancelled = false

    async function loadBackendHealth() {
      const isHealthy = await checkRemoteBackendHealth()

      if (cancelled) {
        return
      }

      setIsBackendAvailable(isHealthy)
    }

    void loadBackendHealth()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (isBackendAvailable === false) {
      onSessionLockChange(false)
      return
    }

    onSessionLockChange(Boolean(controllerUrl))

    return () => {
      onSessionLockChange(false)
    }
  }, [controllerUrl, isBackendAvailable, onSessionLockChange])

  useEffect(() => {
    async function generateQrCode() {
      if (!controllerUrl) {
        setQrSrc(null)
        return
      }

      const QRCode = await import('qrcode')
      const nextQrSrc = await QRCode.toDataURL(controllerUrl, {
        margin: 1,
        width: 240,
      })
      setQrSrc(nextQrSrc)
    }

    void generateQrCode()
  }, [controllerUrl])

  if (isBackendAvailable !== true) {
    return null
  }

  return (
    <section className="panel remote-session-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Control remoto</p>
          <h2>Sesion por QR</h2>
        </div>
        {controllerUrl ? (
          <button type="button" className="link-button" onClick={closeSession}>
            Cerrar
          </button>
        ) : null}
      </div>

      {!controllerUrl ? (
        <button
          type="button"
          className="toggle remote-session-button"
          onClick={() => {
            onRemoteStateChange('red')
            void startSession()
          }}
        >
          Activar control remoto
        </button>
      ) : null}

      <p className="field-help">{error ?? STATUS_COPY[status]}</p>

      {qrSrc ? (
        <div className="remote-session-qr">
          <img src={qrSrc} alt="Codigo QR para controlar el semaforo" />
          <p className="field-help">
            Escanea este QR para abrir el control remoto en otro dispositivo.
          </p>
        </div>
      ) : null}

      {controllerUrl ? (
        <div className="remote-session-meta">
          <p>Sesion: {snapshot?.sessionId ?? 'creando...'}</p>
          <p>
            Controller:{' '}
            {snapshot?.controllerConnected ? 'conectado' : 'esperando conexion'}
          </p>
        </div>
      ) : null}
    </section>
  )
}
