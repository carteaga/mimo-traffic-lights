import { useEffect, useRef, useState } from 'react'

import type {
  RemoteClientMessage,
  RemoteConnectionStatus,
  RemoteServerMessage,
  RemoteSessionSnapshot,
  TrafficLightState,
} from '../types'
import { getRemoteSocketUrl, sendRemoteMessage } from '../utils/remote'

export function useRemoteControllerSession(sessionId: string) {
  const [status, setStatus] = useState<RemoteConnectionStatus>('connecting')
  const [error, setError] = useState<string | null>(null)
  const [snapshot, setSnapshot] = useState<RemoteSessionSnapshot | null>(null)
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket(getRemoteSocketUrl(sessionId, 'controller'))
    socketRef.current = socket

    socket.addEventListener('open', () => {
      setStatus('connected')
      setError(null)
    })

    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data) as RemoteServerMessage

      if (message.type === 'session_state') {
        setSnapshot({
          sessionId: message.sessionId,
          controllerConnected: message.controllerConnected,
          displayConnected: message.displayConnected,
        })
        setError(null)
        return
      }

      if (message.type === 'session_error') {
        setStatus('error')
        setError(message.message)
        return
      }

      if (message.type === 'delivery_error') {
        setError(message.message)
        return
      }

      if (message.type === 'session_closed') {
        setSnapshot(null)
        setStatus('closed')
      }
    })

    socket.addEventListener('close', () => {
      socketRef.current = null
      setSnapshot(null)
      setStatus((currentStatus) =>
        currentStatus === 'error' || currentStatus === 'closed'
          ? currentStatus
          : 'disconnected',
      )
    })

    return () => {
      socket.close()
      socketRef.current = null
    }
  }, [sessionId])

  function send(message: RemoteClientMessage) {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      return
    }

    sendRemoteMessage(socketRef.current, message)
  }

  function setState(state: TrafficLightState) {
    send({
      type: 'set_state',
      state,
    })
  }

  const canControl =
    status === 'connected' &&
    Boolean(snapshot?.controllerConnected) &&
    Boolean(snapshot?.displayConnected)

  return {
    canControl,
    error,
    snapshot,
    setState,
    status,
  }
}
