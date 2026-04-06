import { useEffect, useEffectEvent } from 'react'

type UseAudioAutoPrimeOptions = {
  enabled: boolean
  isReady: boolean
  isSupported: boolean
  primeAudio: () => Promise<'ready' | 'blocked' | 'unsupported'>
}

export function useAudioAutoPrime({
  enabled,
  isReady,
  isSupported,
  primeAudio,
}: UseAudioAutoPrimeOptions) {
  const handlePrimeAudio = useEffectEvent(async () => {
    await primeAudio()
  })

  useEffect(() => {
    if (!enabled || isReady || !isSupported) {
      return
    }

    let cancelled = false

    function cleanup() {
      window.removeEventListener('pointerdown', handleFirstGesture)
      window.removeEventListener('touchstart', handleFirstGesture)
      window.removeEventListener('keydown', handleFirstGesture)
    }

    function handleFirstGesture() {
      cleanup()

      if (cancelled) {
        return
      }

      void handlePrimeAudio()
    }

    window.addEventListener('pointerdown', handleFirstGesture, { passive: true })
    window.addEventListener('touchstart', handleFirstGesture, { passive: true })
    window.addEventListener('keydown', handleFirstGesture)

    return () => {
      cancelled = true
      cleanup()
    }
  }, [enabled, isReady, isSupported])
}
