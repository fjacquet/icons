# Changelog

## [Unreleased]

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
