# Changelog

## [Unreleased]

## [1.0.3] - 2026-09-13

### Security

- Bumped root `vitest`/`@vitest/coverage-v8`/`@vitest/ui` to 4.1.11, resolving
  **GHSA-82fw-gwwq-j7x9** (a stale transitive `@vitest/mocker`).
- Bumped the `mcp-server/` `hono` override to 4.13.7, resolving **GHSA-crvj-82cr-hjcx**,
  **GHSA-g6gw-c38x-mqfc**, **GHSA-gqvv-2mrq-wpjv**.
- Refreshed the lockfile for a `fast-uri` and `qs` advisory wave published after the prior
  green scan: `fast-uri` >= 3.1.6 (**GHSA-5jgf-p345-68v8**, **GHSA-f65p-4m7j-42xc**,
  **GHSA-fph4-wmhf-6fwf**, **GHSA-jqff-g426-hqxp**) and `qs` >= 6.16.0
  (**GHSA-4mjr-xmp4-gh2g**, **GHSA-x5fp-wj9c-mxmx**). All transitive, lockfile-only.
- Extended the `osv-scanner.toml` waivers for three vitepress/vite transitives
  (**GHSA-4w7w-66w2-5vf9**, **GHSA-fx2h-pf6j-xcff**, **GHSA-v6wh-96g9-6wx3**) to 2026-11-12.
  **Note:** `npm ls vite` shows every consumer, including vitepress's nested
  `@vitejs/plugin-vue`, deduped to `vite@8.2.1`, and `osv-scanner` itself reports all three as
  unused ignores — these three waivers currently match nothing and are candidates for removal
  in a follow-up.

### Changed

- Bumped `web-vitals` to 6, `@testing-library/jest-dom` to 7, and `@testing-library/user-event`
  to 14. `reportWebVitals.ts` moved off the removed v2 `get*` functions to `on*`
  (`getFID` -> `onINP`); the reporter itself is currently inert (`reportWebVitals()` is called
  with no handler). `user-event` has no references outside `node_modules` and looks like an
  unused devDependency inherited from create-react-app — flagged as a removal candidate, not
  removed here.

## [1.0.0] - 2026-03-12

### Added

- VitePress documentation site deployed alongside the app at `/icons/docs/`
- TypeScript migration (strict mode)
- Icon catalog with 10 react-icons libraries (Font Awesome 6, Material Design, Feather, Bootstrap, Lucide, Remix, VS Code, Simple Icons, Tabler, Heroicons)
- Icon grid with search and library filter
- Real-time icon preview with size, color, and background customization
- Single SVG export (pure SVG, no React runtime)
- Bulk export as ZIP archive (fflate)
- GitHub Pages deployment via gh-pages
- CI pipeline (format check, tests, build, audit)
- Husky pre-commit hooks (lint-staged)
- Dark mode support via `prefers-color-scheme` media query (all colors use CSS custom properties)
- MCP server (`mcp-server/`) exposing `list_icons`, `render_icon`, `render_icon_batch` tools via stdio transport
- README badges (CI, Deploy, License) and `.editorconfig`
