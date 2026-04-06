# UI Rules

## UX Principles

- Mobile-first is the primary layout rule.
- The semaforo is always the main visual priority.
- Controls must support fast one-hand use on a phone.
- The interface must remain simple and immediate.
- Accessibility and readability are required, not optional polish.

## Layout Rules

- The traffic light must be shown vertically.
- The active lamp must dominate visually over inactive lamps.
- The main scene should stay close to full-screen or near full-screen on mobile.
- Large controls must remain reachable without deep navigation.
- The hero must prioritize the semaforo before decorative framing or secondary chrome.
- Header, controls, and quick settings may adapt, compress, or overlap before the semaforo loses visual priority.

## Responsive Behavior

- Mobile layouts should be designed first, then expanded for larger screens.
- Desktop can reserve more lateral space for controls, but must preserve the semaforo as the focal point.
- When horizontal space becomes constrained:
  - controls should compact first,
  - quick settings should compact second,
  - side rails may float over the outer semaforo shell if needed,
  - overlays may overlap the stage if needed,
  - the semaforo should be the last element to lose usable visual space.
- When vertical space becomes constrained:
  - header spacing should tighten,
  - rail controls should become denser,
  - overlap is acceptable if it preserves semaforo visibility.
- Responsive behavior should feel progressive rather than jumpy whenever possible.

## Semaforo Visibility Rules

- The semaforo shell must remain readable as a single object.
- No layout change should make the active lamp ambiguous.
- Controls may partially overlap the stage only if the active semaforo remains clearly visible.
- Decorative container edges must not become visually more important than the traffic light itself.

## Control Rules

- Interactive targets should be at least `44x44px` where possible.
- Start, pause, reset, sound toggle, and mode controls must remain usable on touch screens.
- Floating controls may use transparency and blur, but must remain visually distinct from the semaforo.
- Compact states for controls are allowed on narrow or short devices.

## Accessibility and Readability

- Maintain strong contrast between foreground and background.
- Keep labels readable at mobile sizes.
- Do not rely on color alone if text or state labels can reinforce meaning.
- Sound must be optional.
- Copy and UI structure should avoid cognitive overload.

## Copy and Communication Rules

- Use wording consistent with an educational simulation.
- Do not imply that the app is approved, certified, legal for street use, or functionally equivalent to real traffic infrastructure.
- Avoid municipal or official-sounding claims.
- The tone should be clear, functional, and instructional rather than promotional.

## Visual Priority Under Constrained Space

When space is tight, apply this priority order:

1. Keep the semaforo readable and dominant.
2. Preserve critical controls.
3. Preserve quick settings if they do not materially damage semaforo clarity.
4. Reduce decorative framing, extra spacing, and non-essential visual affordances first.

## Implementation Guardrails

- Separate timer/control logic from presentational layout logic.
- Avoid spreading layout-specific state across many components if CSS can solve the adaptation.
- Prefer behavior-level responsiveness over many hardcoded edge-case layouts unless a specific device class truly requires a rescue rule.
