# Style and Conventions

Source of truth: `docs/constitution.md`

## TypeScript
- Strict mode: `strict: true`, `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters`
- No `any` in production code — use `unknown` + narrowing instead
- **Interfaces** for object shapes that may be extended: `IconDefinition`, `Theme`, config objects
- **Type aliases** for unions, function signatures, utility types: `type IconName = string`
- Always type component props explicitly with `interface Props {}` or `type Props = {}`

## React
- **Function components only** — no class components
- One file = one main component
- Components capped at ~150 lines; extract if larger
- Custom hooks (`useSomething`) for shared behaviour (state, effects, localStorage, keyboard shortcuts)
- State kept as local as possible; lift only when siblings share it
- No global state library unless truly necessary

## Functional style
- Pure functions where possible (same input → same output, no side effects)
- Immutability: never mutate props, React state, or input arguments; use spread syntax
- Composition over inheritance

## General
- No dead code — delete, don't comment out
- KISS: simplest thing that works; avoid premature abstractions
- DRY: shared logic in `src/lib/` (utilities), `src/hooks/` (hooks), `src/components/common/` (UI)
- YAGNI: don't build for hypothetical future requirements

## Commit messages
- `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
