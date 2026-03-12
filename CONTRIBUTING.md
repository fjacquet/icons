# Contributing

## Before opening a PR

1. Fork the repo and create a branch from `master`
2. Run the full quality suite locally:
   ```bash
   npm run format:check
   npm test -- --watchAll=false
   npm run build
   ```
3. All three must pass — CI will enforce this

## Commit message convention

```
feat: add PNG export
fix: correct xmlns in SVG output
chore: bump react-icons to 5.x
docs: update README badges
refactor: extract useIconSettings hook
```

## Code guidelines

See [docs/constitution.md](docs/constitution.md) for the full engineering rules (TypeScript strict, functional components, KISS/DRY/YAGNI).

Key points:
- Function components only, no class components
- No `any` — use `unknown` + narrowing if needed
- Components ≤ ~150 lines
- Tests co-located with source (`Component.test.tsx`)
- No dead code — delete, don't comment out
