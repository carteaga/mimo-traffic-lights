type ControlsProps = {
  isRunning: boolean
  onReset: () => void
  onTogglePlayback: () => void
}

export function Controls({
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
        aria-label={isRunning ? 'Pausar ciclo automático' : 'Iniciar ciclo automático'}
      >
        {isRunning ? '❚❚' : '▶'}
      </button>
      <button
        type="button"
        className="floating-control floating-control--stop"
        onClick={onReset}
        aria-label="Detener y reiniciar semáforo"
      >
        ■
      </button>
    </section>
  )
}
