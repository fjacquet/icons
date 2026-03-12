---
name: release
description: Bump version, update CHANGELOG, commit, tag, push, and create GitHub release
disable-model-invocation: true
---

# Release Skill

Guides through a full release of the icons project.

## Steps

1. **Determine next version** — ask the user if not provided (semver: patch/minor/major from current)

2. **Update `package.json`** — bump `"version"` field

3. **Update `CHANGELOG.md`**:
   - Rename `## [Unreleased]` → `## [X.Y.Z] - YYYY-MM-DD` (today's date)
   - Add a new empty `## [Unreleased]` section at the top

4. **Commit**:

   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore: release vX.Y.Z"
   ```

5. **Tag**:

   ```bash
   git tag -a vX.Y.Z -m "vX.Y.Z"
   ```

6. **Push commit + tag**:

   ```bash
   git push && git push origin vX.Y.Z
   ```

7. **Create GitHub release**:
   ```bash
   gh release create vX.Y.Z --title "vX.Y.Z" --notes-from-tag
   ```
   Or use CHANGELOG content as release notes.

## Notes

- Always confirm version with user before making any changes
- The deploy workflow triggers automatically on push to master (app + docs)
- After pushing, CI will build and deploy to https://fjacquet.github.io/icons/
