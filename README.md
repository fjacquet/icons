# React Icons to SVG Exporter

Browse icons from popular React icon libraries, customize them, and download standalone SVG files ready to drag into PowerPoint, Keynote, or Google Slides.

**Live app:** https://fjacquet.github.io/icons

## Getting started

```bash
git clone https://github.com/fjacquet/icons.git
cd icons
npm install
npm start        # http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server |
| `npm test` | Tests (watch mode) |
| `npm test -- --watchAll=false` | Tests (single run) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (write) |
| `npm run format:check` | Prettier (check) |
| `npm run deploy` | Deploy to GitHub Pages |

## Icon libraries included

Font Awesome 6 · Material Design · Feather · Bootstrap · Lucide · Remix · VS Code · Simple Icons · Tabler · Heroicons

## Deployment

The app is a static React build hosted on GitHub Pages. CI runs on every push to `master` — build, format check, tests, and a security audit must all pass. The deploy workflow publishes to the `gh-pages` branch automatically.
