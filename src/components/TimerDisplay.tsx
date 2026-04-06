type TimerDisplayProps = {
  timeLeft: number
}

export function TimerDisplay({ timeLeft }: TimerDisplayProps) {
  return (
    <div className="timer-chip" aria-live="polite">
      <div className="timer-value">{timeLeft}s</div>
    </div>
  )
}
