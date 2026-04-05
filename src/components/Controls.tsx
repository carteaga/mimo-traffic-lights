type ControlsProps = {
  disabled?: boolean
  isRunning: boolean
  onReset: () => void
  onTogglePlayback: () => void
}

export function Controls({
  disabled = false,
  isRunning,
  onReset,
  onTogglePlayback,
}: ControlsProps) {
  return (
    <section
      className="floating-controls"
      aria-label="Controles automáticos del semáforo"
    >
      <button
        type="button"
        className={`floating-control floating-control--primary ${isRunning ? 'floating-control--pause' : 'floating-control--play'}`}
        onClick={onTogglePlayback}
        disabled={disabled}
        aria-label={isRunning ? 'Pausar ciclo automático' : 'Iniciar ciclo automático'}
      >
        {isRunning ? '❚❚' : '▶'}
      </button>
      <button
        type="button"
        className="floating-control floating-control--stop"
        onClick={onReset}
        disabled={disabled}
        aria-label="Detener y reiniciar semáforo"
      >
        ■
      </button>
    </section>
  )
}
