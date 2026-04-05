import type { RemoteClientMessage } from '../types'

function getWindowOrigin() {
  if (typeof window === 'undefined') {
    return 'http://localhost:5173'
  }

  return window.location.origin
}

export function getRemoteApiBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_REMOTE_API_URL ?? 'http://localhost:8787'

  return configuredBaseUrl.replace(/\/+$/, '')
}

export function getRemoteControllerUrl(sessionId: string) {
  return `${getWindowOrigin()}/remote/${sessionId}`
}

export function getRemoteSocketUrl(sessionId: string, role: 'display' | 'controller') {
  const configuredBaseUrl = getRemoteApiBaseUrl()
  const socketBaseUrl = configuredBaseUrl.replace(/^http/, 'ws')

  return `${socketBaseUrl}/ws?sessionId=${encodeURIComponent(sessionId)}&role=${role}`
}

export async function createRemoteSession() {
  const response = await fetch(`${getRemoteApiBaseUrl()}/api/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('No se pudo crear la sesion remota.')
  }

  return (await response.json()) as { sessionId: string }
}

export async function checkRemoteBackendHealth() {
  try {
    const response = await fetch(`${getRemoteApiBaseUrl()}/health`, {
      method: 'GET',
    })

    return response.ok
  } catch {
    return false
  }
}

export function sendRemoteMessage(socket: WebSocket, message: RemoteClientMessage) {
  socket.send(JSON.stringify(message))
}
