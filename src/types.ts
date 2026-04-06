export type TrafficLightState = 'red' | 'yellow' | 'green'

export type Mode = 'manual' | 'automatic'

export type DurationKey = 'redDuration' | 'yellowDuration' | 'greenDuration'

export type TrafficLightConfig = {
  redDuration: number
  yellowDuration: number
  greenDuration: number
  mode: Mode
  soundEnabled: boolean
}

export type RemoteRole = 'display' | 'controller'

export type RemoteConnectionStatus =
  | 'idle'
  | 'creating'
  | 'connecting'
  | 'waiting'
  | 'connected'
  | 'disconnected'
  | 'closed'
  | 'error'

export type RemoteSessionSnapshot = {
  sessionId: string
  controllerConnected: boolean
  displayConnected: boolean
}

export type RemoteCommandMessage = {
  type: 'set_state'
  state: TrafficLightState
}

export type RemoteCloseMessage = {
  type: 'close_session'
}

export type RemoteClientMessage = RemoteCommandMessage | RemoteCloseMessage

export type RemoteStateMessage = {
  type: 'session_state'
  sessionId: string
  controllerConnected: boolean
  displayConnected: boolean
}

export type RemoteSessionClosedMessage = {
  type: 'session_closed'
}

export type RemoteErrorMessage = {
  type: 'session_error'
  message: string
}

export type RemoteDeliveryErrorMessage = {
  type: 'delivery_error'
  message: string
}

export type RemoteServerMessage =
  | RemoteCommandMessage
  | RemoteStateMessage
  | RemoteSessionClosedMessage
  | RemoteErrorMessage
  | RemoteDeliveryErrorMessage
