# Product Spec

## Product Overview

Mimo Traffic Lights is a mobile-first educational web application that simulates a traffic light for learning activities. The product is intended to help a student use a phone as a visual and audio reference for stop, prepare, and go states.

The product must never be presented as an official traffic control device. All product and UI copy must describe it as an educational simulation or pedagogical tool.

## MVP Goals

The MVP must provide:

- A vertical traffic light with red, yellow, and green states
- Configurable duration for each state
- Optional sound associated with state changes or active states
- Start, pause, and reset controls
- Manual and automatic operation
- Local persistence of user configuration
- A mobile-optimized experience

## Target Users

- Students using a phone as a learning aid
- Teachers or facilitators running educational activities
- Users who need a simple, visual, full-screen-like semaforo simulation

## Core User Flows

### Automatic cycle

1. Open the app on a mobile device.
2. Review the current state and countdown.
3. Start the cycle.
4. Observe automatic transitions according to saved durations.
5. Pause or reset as needed.

### Manual practice

1. Open the app.
2. Switch to manual mode.
3. Change the current traffic light state as needed.
4. Use the device as a classroom or practice aid.

### Configuration and persistence

1. Adjust red, yellow, and green durations.
2. Toggle sound on or off.
3. Leave and reopen the app.
4. See the saved settings restored from local storage.

## Functional Requirements

### Traffic light states

- The app must support `red`, `yellow`, and `green`.
- Only one state may be visually active at a time.
- The current state must be visually prominent.
- The current state label must be visible.
- A visible countdown must reflect the active state.

### Timing

- Users must be able to configure durations in seconds for red, yellow, and green.
- Duration values must be validated as reasonable numeric inputs.
- The automatic cycle must use the configured durations.
- Reset behavior must return the app to a consistent state.

### Controls

- The app must provide start, pause, and reset controls.
- The app must support manual and automatic modes.
- Controls must remain usable on mobile devices.

### Sound

- The app must allow sound to be enabled or disabled.
- Sound behavior must be stable on mobile browsers.
- Audio activation must respect autoplay restrictions and therefore depend on user interaction.

### Persistence

The following configuration must be persisted in `localStorage`:

- `redDuration`
- `yellowDuration`
- `greenDuration`
- `mode`
- `soundEnabled`

On load, the app must:

- Read saved configuration from local storage
- Apply valid saved values
- Fall back to defaults if storage fails or data is invalid

### PWA

- The app must provide a basic installable PWA setup.
- Installed behavior should be reasonable for the MVP.
- Offline support does not need to be advanced, but the project should keep the groundwork in place.

## Non-Functional Constraints

- The product is mobile-first.
- The traffic light must remain the primary visual element.
- Architecture should keep timer logic separate from UI concerns.
- State behavior must remain predictable.
- Timer effects must avoid memory leaks.
- Local storage access should be centralized and safe.
- The experience should feel lightweight and easy to operate with one hand on mobile.

## Optional / Non-MVP Features

These are desirable but not required for the MVP:

- Fullscreen mode
- Vibration
- Additional active-mode indicators
- Preset buttons for durations
- Restore defaults action
- High-contrast mode
- Enhanced install experience beyond the base PWA setup

## Non-Goals

- Acting as a real traffic control device
- Implying municipal, legal, or official traffic authority
- Solving advanced offline synchronization or complex distributed control in the MVP
- Adding features that do not improve the core educational semaforo simulation

## Domain Terms

- `TrafficLightState`: `red | yellow | green`
- `Mode`: `manual | automatic`
- `Countdown`: visible remaining seconds for the active state
- `Quick settings`: compact controls for frequently adjusted timing and sound settings
- `Remote controller`: controller/display behavior connected through the separate backend service

## Current Config Model

```json
{
  "redDuration": 10,
  "yellowDuration": 3,
  "greenDuration": 8,
  "mode": "automatic",
  "soundEnabled": true
}
```

## Current Defaults and Bounds

- Default red duration: `10`
- Default yellow duration: `3`
- Default green duration: `8`
- Minimum duration: `1`
- Maximum duration: `120`
- Current quick presets:
  - Red: `6, 8, 10, 12`
  - Yellow: `2, 3, 4`
  - Green: `5, 7, 9, 11`
