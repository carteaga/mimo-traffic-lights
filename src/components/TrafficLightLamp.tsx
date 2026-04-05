type TrafficLightLampProps = {
  color: 'red' | 'yellow' | 'green'
  isActive: boolean
}

export function TrafficLightLamp({
  color,
  isActive,
}: TrafficLightLampProps) {
  return (
    <div
      className={`lamp lamp--${color} ${isActive ? 'lamp--active' : ''}`}
      aria-hidden="true"
    />
  )
}
