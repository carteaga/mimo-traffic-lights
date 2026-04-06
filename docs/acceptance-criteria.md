# Acceptance Criteria

## Scope

These criteria define what counts as acceptable delivery for the MVP and related UI work. Unless explicitly stated otherwise, each item is expected to pass on mobile browsers first and remain reasonable on larger screens.

## Traffic Light States

- Given the app is loaded, when the main scene is visible, then the user can clearly identify red, yellow, and green lamps in vertical order.
- Given any state is active, when the semaforo is rendered, then only one state is visually highlighted at a time.
- Given a state is active, when the header and main scene are visible, then the current state label is visible.
- Given the current state changes, when the UI updates, then the visible active lamp and state label remain consistent.

## Countdown

- Given the app is running, when the active state is shown, then a visible countdown is displayed.
- Given the countdown is visible, when the layout changes across supported device sizes, then the countdown remains legible and visually centered within its header area.
- Given the active state changes, when the countdown resets, then the displayed value matches the new state's configured duration.

## Timing Controls

- Given the user changes red, yellow, or green duration, when the value is valid, then the app stores and uses the updated value.
- Given a duration value is outside the allowed bounds, when the app processes it, then the effective value remains within the supported range.
- Given the app is in automatic mode, when the cycle advances, then each state lasts according to the configured durations.

## Playback and Mode Controls

- Given the app is idle, when the user presses start, then the automatic cycle begins.
- Given the cycle is running, when the user presses pause, then the countdown and state progression stop predictably.
- Given the user presses reset, when reset completes, then the app returns to a consistent state.
- Given the user switches between manual and automatic modes, when the mode changes, then the visible UI and control behavior remain coherent.

## Sound

- Given sound is enabled and the browser has been primed by user interaction, when the state changes or countdown behavior requests audio, then sound plays successfully.
- Given sound is disabled, when the cycle runs, then no sound should be emitted.
- Given the browser blocks autoplay before user interaction, when the app is first loaded, then the product must not break and should wait for user activation.

## Persistence

- Given the user has changed durations, mode, or sound settings, when the app reloads, then valid saved values are restored from `localStorage`.
- Given saved data is missing or invalid, when the app loads, then defaults are applied safely.

## Mobile UX

- Given the app is used on a phone-sized screen, when the main scene is displayed, then the semaforo remains the primary visual element.
- Given controls and quick settings share limited space with the semaforo, when the viewport becomes constrained, then controls may compact or overlap but the semaforo must remain clearly readable.
- Given a touch device, when the user interacts with primary controls, then controls remain large enough to use reliably.
- Given a one-hand mobile usage context, when the user operates the hero section, then the main actions remain reachable without deep menus.

## Responsive Scenarios

- Given a large desktop viewport, when the hero renders, then the semaforo is fully visible and not hidden by its surrounding layout.
- Given a mid-width mobile viewport, when the hero renders, then rails and controls adapt without abrupt visual breakage.
- Given a narrow mobile viewport, when horizontal space is tight, then overlap behavior must preserve semaforo clarity before preserving extra spacing.
- Given a low-height mobile viewport, when vertical space is tight, then header spacing and rail density may compact before the semaforo loses its primary readable state.
- Given representative constrained sizes such as narrow mobile and low-height mobile, when the layout is reviewed, then the active lamp remains visually dominant.

## PWA Basics

- Given a compatible device and browser, when the app is deployed, then the app exposes a valid installable PWA baseline.
- Given the installed app is launched, when the app opens, then it still behaves as the same educational semaforo experience.

## Communication Safety

- Given any user-facing product copy, when it describes the app, then it must present the product as an educational simulation or pedagogical tool.
- Given any UI, documentation, or shipping text, when it references traffic control, then it must not imply official approval, legal authority, or street-use validity.

## Regression Checklist

- The active lamp remains visually dominant.
- The state label and countdown remain consistent.
- Start, pause, reset, and sound controls still work.
- Stored config still loads correctly.
- Mobile layouts remain usable.
- Desktop layouts do not hide the semaforo.

## Explicit Exclusions

The following are not required for MVP acceptance:

- Advanced offline behavior
- Vibration support
- High-contrast mode
- Fullscreen integration beyond basic browser/PWA behavior
- Complex remote orchestration beyond the current backend-supported flow
