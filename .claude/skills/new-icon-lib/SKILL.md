---
name: new-icon-lib
description: Checklist and steps to integrate a new React icon library into the icons project
disable-model-invocation: true
---

# New Icon Library Integration

Use this skill when adding a new icon library to the project.

## Checklist

### 1. Install the package

```bash
npm install <library-package-name>
```

### 2. Update `src/types/icons.ts`

- Add the new library ID to the `IconLibraryId` union type

### 3. Update `src/lib/icons/catalog.ts`

- Import icon components from the new library
- Add entries to `ICON_CATALOG` with correct `libraryId`, `name`, `category`, and `tags`
- Add the library ID to the library filter list

### 4. Verify rendering

```bash
npm start
# Filter by the new library, check icons render in the grid and preview panel
```

### 5. Run tests

```bash
npm test
# Ensure catalog and renderIcon tests still pass
```

### 6. Update `README.md`

- Add the library name to the "Icon Libraries" section

### 7. Update `CHANGELOG.md`

- Add under `## [Unreleased]` → `### Added`

## Notes

- Icons must be React components that accept standard SVG props (size, color)
- Check that the library exports named components (not default-only)
- Existing libraries: react-icons (10 sets), aws-react-icons, @threeveloper/azure-react-icons
