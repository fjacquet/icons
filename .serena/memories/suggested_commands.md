# Suggested Commands

## Development

```bash
npm start                          # Dev server at http://localhost:3000
npm test                           # Tests in interactive watch mode
npm test -- --watchAll=false       # Tests once (CI mode / non-interactive)
npm run build                      # Production build → build/
npm run lint                       # Lint (once added to package.json)
```

## Git utilities (Darwin)

```bash
git status
git log --oneline -10
git diff
grep -r "pattern" src/
find src/ -name "*.tsx"
ls -la src/components/
```

## CI Pipeline

GitHub Actions runs on every push/PR to master:

1. `npm ci`
2. `npm run build`
3. `npm test`
   across Node 18.x, 20.x, 22.x.
