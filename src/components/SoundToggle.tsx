type SoundToggleProps = {
  enabled: boolean
  onToggle: () => void
}

export function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  return (
    <button
      type="button"
      className={`toggle ${enabled ? 'toggle--on' : ''}`}
      onClick={onToggle}
      aria-pressed={enabled}
    >
      Sonido {enabled ? 'activado' : 'desactivado'}
    </button>
  )
}
