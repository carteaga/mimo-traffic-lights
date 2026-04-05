type TimerDisplayProps = {
  isRunning: boolean
  timeLeft: number
}

export function TimerDisplay({ isRunning, timeLeft }: TimerDisplayProps) {
  return (
    <section className="panel timer-card" aria-live="polite">
      <p className="eyebrow">Contador</p>
      <div className="timer-value">{timeLeft}s</div>
      <p className="timer-hint">
        {isRunning
          ? 'Cuenta regresiva en curso.'
          : 'Listo para iniciar o cambiar de estado.'}
      </p>
    </section>
  )
}
