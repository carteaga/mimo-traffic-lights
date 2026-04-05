import { useEffect, useMemo, useRef, useState } from 'react'

import type {
  RemoteConnectionStatus,
  RemoteClientMessage,
  RemoteServerMessage,
  RemoteSessionSnapshot,
  TrafficLightState,
} from '../types'
import {
  createRemoteSession,
  getRemoteControllerUrl,
  getRemoteSocketUrl,
  sendRemoteMessage,
} from '../utils/remote'

type UseRemoteDisplaySessionOptions = {
  onRemoteStateChange: (state: TrafficLightState) => void
}

export function useRemoteDisplaySession({
  onRemoteStateChange,
}: UseRemoteDisplaySessionOptions) {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [status, setStatus] = useState<RemoteConnectionStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [snapshot, setSnapshot] = useState<RemoteSessionSnapshot | null>(null)
  const socketRef = useRef<WebSocket | null>(null)
  const onRemoteStateChangeRef = useRef(onRemoteStateChange)
  const isClosingSessionRef = useRef(false)
  const reconnectTimeoutRef = useRef<number | null>(null)
  const reconnectAttemptsRef = useRef(0)
  const [connectionNonce, setConnectionNonce] = useState(0)

  const controllerUrl = useMemo(
    () => (sessionId ? getRemoteControllerUrl(sessionId) : null),
    [sessionId],
  )

  useEffect(() => {
    onRemoteStateChangeRef.current = onRemoteStateChange
  }, [onRemoteStateChange])

  useEffect(() => {
    if (!sessionId) {
      return
    }

    const socket = new WebSocket(getRemoteSocketUrl(sessionId, 'display'))
    socketRef.current = socket

    socket.addEventListener('open', () => {
      isClosingSessionRef.current = false
      reconnectAttemptsRef.current = 0
      if (reconnectTimeoutRef.current) {
        window.clearTimeout(reconnectTimeoutRef.current)
        reconnectTimeoutRef.current = null
      }
      setStatus('waiting')
    })

    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data) as RemoteServerMessage

      if (message.type === 'session_state') {
        setSnapshot({
          sessionId: message.sessionId,
          controllerConnected: message.controllerConnected,
          displayConnected: message.displayConnected,
        })
        setStatus(message.controllerConnected ? 'connected' : 'waiting')
        return
      }

      if (message.type === 'set_state') {
        onRemoteStateChangeRef.current(message.state)
        return
      }

      if (message.type === 'session_closed') {
        isClosingSessionRef.current = false
        if (reconnectTimeoutRef.current) {
          window.clearTimeout(reconnectTimeoutRef.current)
          reconnectTimeoutRef.current = null
        }
        setStatus('closed')
        setSessionId(null)
        setSnapshot(null)
        return
      }

      if (message.type === 'session_error') {
        setStatus('error')
        setError(message.message)
      }
    })

    socket.addEventListener('close', () => {
      socketRef.current = null
      if (isClosingSessionRef.current) {
        isClosingSessionRef.current = false
        setSessionId(null)
        setSnapshot(null)
        setStatus('idle')
        setError(null)
        return
      }

      setStatus((currentStatus) => {
        if (currentStatus === 'closed') {
          return 'closed'
        }

        return sessionId ? 'disconnected' : 'idle'
      })

      if (!sessionId) {
        return
      }

      reconnectAttemptsRef.current += 1
      const nextDelay = Math.min(250 * reconnectAttemptsRef.current, 1000)
      reconnectTimeoutRef.current = window.setTimeout(() => {
        setConnectionNonce((currentNonce) => currentNonce + 1)
      }, nextDelay)
    })

    return () => {
      if (reconnectTimeoutRef.current) {
        window.clearTimeout(reconnectTimeoutRef.current)
        reconnectTimeoutRef.current = null
      }
      socket.close()
      socketRef.current = null
    }
  }, [connectionNonce, sessionId])

  function send(message: RemoteClientMessage) {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      return false
    }

    sendRemoteMessage(socketRef.current, message)
    return true
  }

  async function startSession() {
    if (sessionId) {
      return
    }

    try {
      setStatus('creating')
      setError(null)
      const { sessionId: nextSessionId } = await createRemoteSession()
      reconnectAttemptsRef.current = 0
      setStatus('connecting')
      setSessionId(nextSessionId)
    } catch (createError) {
      setStatus('error')
      setError(
        createError instanceof Error
          ? createError.message
          : 'No se pudo crear la sesion remota.',
      )
    }
  }

  function closeSession() {
    if (reconnectTimeoutRef.current) {
      window.clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    const sentCloseMessage = send({ type: 'close_session' })

    if (!sentCloseMessage) {
      reconnectAttemptsRef.current = 0
      setSessionId(null)
      setSnapshot(null)
      setStatus('idle')
      setError(null)
      return
    }

    isClosingSessionRef.current = true
    reconnectAttemptsRef.current = 0
    socketRef.current = null
  }

  return {
    closeSession,
    controllerUrl,
    error,
    sessionId,
    snapshot,
    startSession,
    status,
  }
}
