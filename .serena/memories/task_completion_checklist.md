# Task Completion Checklist

Run these before considering a task done (from `docs/constitution.md`):

1. `npm run lint` — must pass (no ESLint errors)
2. `npm test -- --watchAll=false` — all tests must pass
3. `npm run build` — production build must succeed
4. Manual checks:
   - Is the solution **simple** (KISS)?
   - Is logic **duplicated** elsewhere (DRY)?
   - Are we building only what is actually needed (YAGNI)?
   - Is the code **functional, typed, and testable**?
   - No `any` introduced?
   - Props and state fully typed?
   - Components under ~150 lines?

## PR Checklist

- [ ] Code follows constitution (KISS, DRY, functional)
- [ ] No `any` introduced
- [ ] Lint, tests, and build pass locally
- [ ] Documentation updated if needed
