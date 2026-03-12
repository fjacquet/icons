# Codebase Structure

## Current state (scaffold only)

```
src/
  App.js              # Default CRA template — to be replaced
  App.css
  App.test.js
  index.js
  index.css
  logo.svg
  reportWebVitals.js
  setupTests.js
public/
docs/
  prd.md              # Full product requirements
  constitution.md     # Engineering rules and conventions
.github/workflows/
  node.js.yml         # CI pipeline
```

## Target structure (from constitution.md)

```
src/
  components/         # One folder per component; co-locate .tsx + .test.tsx + .css
    IconGrid/
    IconPreview/
    common/           # Shared UI components
  hooks/              # Custom hooks: useIconFilter, useIconSelection, etc.
  lib/
    icons/
      catalog.ts      # Icon registry/manifest
      renderIcon.ts   # React component → pure SVG markup
    utils/
      download.ts     # Blob-based file download helper
      zip.ts          # JSZip batch export helper
  pages/
    Home/
      Home.tsx
```

## Key data flow

1. React app loads icon catalog (static import or generated manifest)
2. User searches/filters, selects icons, adjusts settings
3. `renderIcon.ts` serializes React icon component → SVG string
4. `download.ts` creates a Blob and triggers browser download
5. For batch: `zip.ts` bundles multiple SVGs via JSZip → single `.zip` download
6. Generated SVGs must be **pure SVG** — no React/JS runtime dependency
