# AGENTS.md

## Product Source of Truth

Use the documents in [`docs/`](/home/land/projects/mimo-traffic-lights/docs) as the primary source of product intent:

- [`docs/product-spec.md`](/home/land/projects/mimo-traffic-lights/docs/product-spec.md)
- [`docs/ui-rules.md`](/home/land/projects/mimo-traffic-lights/docs/ui-rules.md)
- [`docs/acceptance-criteria.md`](/home/land/projects/mimo-traffic-lights/docs/acceptance-criteria.md)

If a future change updates product behavior, UI constraints, or delivery expectations, update those docs first or alongside the implementation.

## Repo-Specific Guidance

- The product must always be described as an educational simulation, never as an official traffic control device.
- Keep the project mobile-first.
- Preserve the semaforo as the main visual priority when space is constrained.
- Prefer simple, maintainable solutions over feature creep.
- Use `localStorage` safely and fall back to defaults if persisted data is invalid.
- Keep timer and playback behavior predictable and leak-free.

## Operational Notes for Agents

- `README.md` is for project overview, setup, and deployment, not for the full product spec.
- The frontend depends on a separate backend project for remote controller/display behavior.
- When implementing UI changes, verify them against both `docs/ui-rules.md` and `docs/acceptance-criteria.md`.
