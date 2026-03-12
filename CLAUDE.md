# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

**React Icons to SVG Exporter** — a static React app (hosted on GitHub Pages) that lets users browse icon components, customize them (size, color, background), and download them as standalone SVG files or ZIP archives for use in presentations (PowerPoint, Keynote, Google Slides).

The app is currently a fresh Create React App scaffold. The MVP features described in `docs/prd.md` are not yet implemented.

## Commands

```bash
npm start          # Dev server at http://localhost:3000
npm test           # Run tests (interactive watch mode)
npm test -- --watchAll=false  # Run tests once (CI mode)
npm run build      # Production build to build/
npm run lint       # Lint (once added to package.json)
```

CI runs `npm ci && npm run build && npm test` across Node 18.x, 20.x, 22.x on every push/PR to `master`.

## Planned Architecture

The project must be migrated to TypeScript. Target structure per `docs/constitution.md`:

```
src/
  components/        # One folder per component, co-locate .tsx + .test.tsx + .css
    IconGrid/
    IconPreview/
    ...
  hooks/             # Custom hooks: useIconFilter, useIconSelection, etc.
  lib/
    icons/           # catalog.ts (icon registry), renderIcon.ts (React→SVG serialization)
    utils/           # download.ts (Blob download), zip.ts (JSZip batch export)
  pages/
    Home/
```

Key data flow: React icon component → rendered to SVG markup client-side → Blob → file download. For batch export, multiple SVGs are zipped with a JS library (JSZip or similar) and offered as a single `.zip` download. Generated SVGs must be **pure SVG** with no React/JS runtime dependency.

## Engineering Rules (from `docs/constitution.md`)

- **Function components only** — no class components.
- **TypeScript strict mode**: `strict: true`, `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters`. No `any` in production code.
- **Interfaces** for object shapes (`IconDefinition`, `Theme`); **type aliases** for unions and function signatures.
- State kept as local as possible; lift only when siblings share it. No global state library unless truly necessary.
- Components capped at ~150 lines; extract if larger.
- No dead code — delete, don't comment out.
- **Commit message convention**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.

## Testing Approach

- Unit tests for core logic: `renderIcon`, icon filtering, selection, download utilities.
- Component tests for important UI flows using `@testing-library/react`.
- Tests co-located with their source files (`ComponentName.test.tsx`).
- For bugs: write a failing test first, then fix.
