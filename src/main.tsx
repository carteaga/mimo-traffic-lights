import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App'
import RemoteControllerApp from './RemoteControllerApp'

function resolveRootComponent() {
  if (window.location.pathname.startsWith('/remote/')) {
    return <RemoteControllerApp />
  }

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {resolveRootComponent()}
  </StrictMode>,
)
