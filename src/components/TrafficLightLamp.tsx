type TrafficLightLampProps = {
  color: 'red' | 'yellow' | 'green'
  isActive: boolean
  isBlinking: boolean
}

export function TrafficLightLamp({
  color,
  isActive,
  isBlinking,
}: TrafficLightLampProps) {
  return (
    <div
      className={`lamp lamp--${color} ${isActive ? 'lamp--active' : ''} ${isBlinking ? 'lamp--blinking' : ''}`}
      aria-hidden="true"
    />
  )
}
