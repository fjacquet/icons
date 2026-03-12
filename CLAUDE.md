# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

**React Icons to SVG Exporter** — a static React app (hosted on GitHub Pages) that lets users browse icon components, customize them (size, color, background), and download them as standalone SVG files or ZIP archives for use in presentations (PowerPoint, Keynote, Google Slides).

**Current version: 1.0.0** — MVP fully implemented. Migrated from CRA to Vite. VitePress docs site at `/icons/docs/` deployed alongside the app.

## Commands

```bash
npm start          # Dev server at http://localhost:5173 (Vite)
npm test           # Run tests once (vitest --run)
npm run build      # Production build to build/
npm run lint       # ESLint, max-warnings=0
npm run docs:build # Build VitePress docs to build/docs/
npm run deploy     # Build app + docs, then publish to gh-pages branch
```

CI runs `npm ci && npm run build && npm run docs:build && npm test` on Node 24 on every push/PR to `master`.

## Architecture

```
src/
  components/        # One folder per component, co-locate .tsx + .test.tsx + .css
    IconCard/
    IconGrid/
    IconPreview/
    SearchBar/
    SettingsPanel/
  hooks/             # useIconFilter, useIconSelection (with tests)
  lib/
    icons/           # catalog.ts (icon registry), renderIcon.ts (React→SVG serialization)
    utils/           # download.ts (Blob download), zip.ts (fflate batch export)
  pages/
    Home/
  types/             # icons.ts — shared interfaces and type aliases
docs/
  .vitepress/        # VitePress config (base: /icons/docs/, outDir: ../build/docs)
  constitution.md
  prd.md
mcp-server/          # Separate TS project; list_icons, render_icon, render_icon_batch via stdio
```

Key data flow: React icon component → rendered to SVG markup client-side → Blob → file download. For batch export, multiple SVGs are zipped with **fflate** and offered as a single `.zip` download. Generated SVGs are **pure SVG** with no React/JS runtime dependency.

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
