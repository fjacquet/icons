
# Engineering Constitution

**Project:** `fjacquet/icons`  
**Scope:** React + TypeScript + GitHub Pages + MCP server (future)  

This document is the **constitution** for this project: it defines how we write code, how we keep it simple, and which practices are non‑negotiable.

Use it as:

- A **design checklist** before writing new code.
- A **review checklist** for PRs.
- A **baseline** for tooling (ESLint, Prettier, TypeScript config, CI).

---

## 1. Core Engineering Principles

### 1.1 KISS (Keep It Simple, Stupid)

- Prefer the **simplest thing that can possibly work**.
- Avoid clever abstractions and premature frameworks.
- If a piece of code needs a big comment to be understood, consider rewriting it.

**Checklist**

- Can this be expressed with a **plain function** instead of a class/custom abstraction?
- Is there a **single responsibility** for this component/hook/module?
- Would a new contributor understand this within a few minutes?

---

### 1.2 DRY (Don’t Repeat Yourself)

- Extract **shared logic** into:
  - Utility functions (e.g. `src/lib/`).
  - Custom hooks (e.g. `src/hooks/`).
  - Shared UI components (e.g. `src/components/common/`).
- Avoid copy‑pasting JSX/logic across components.

**Checklist**

- Have I written basically the same code in more than one place?
- Can a hook, helper, or configuration replace this duplication?

---

### 1.3 YAGNI (You Aren’t Gonna Need It)

- Don’t build features, layers, or abstractions **“just in case”**.
- MCP server, theming, multi‑library support, etc. should be **incremental phases**, not baked in everywhere from day one.

**Checklist**

- Is this code used **today**?
- If not, is there a clear issue/roadmap item that justifies it?

---

### 1.4 Functional First

Default to a **functional programming style**:

- **Pure functions** where possible (same input → same output, no side effects).
- **Immutability**:
  - Don’t mutate props, React state, or input arguments.
  - Use spread syntax / immutable updates.
- **Composition over inheritance**: small functions and components composed together.

**Checklist**

- Does this function rely on or mutate external state?
- Can this side effect be moved into a React effect (`useEffect`) or a higher‑level component?

---

## 2. React Principles

### 2.1 Components

- Use **function components only**. No class components.
- One file = one main component.
- Each component should have **one clear responsibility**.

**Component file pattern**

```tsx
// src/components/IconPreview/IconPreview.tsx

export interface IconPreviewProps {
  name: string;
  size: number;
  color: string;
  background?: string;
}

export const IconPreview: React.FC&lt;IconPreviewProps&gt; = ({ name, size, color, background }) =&gt; {
  // ...
};
```

---

### 2.2 Hooks

- Prefer **custom hooks** for shared behaviour:
  - State and effects around icons.
  - Keyboard shortcuts.
  - Local storage, etc.
- Hook naming: `useSomething`.

**Rules**

- Only call hooks:
  - At the **top level** of a component or other hook.
  - Never inside loops, conditions, or nested functions.
- Extract effectful logic into dedicated hooks rather than mixing it into UI rendering logic.

---

### 2.3 State Management

- Keep state **as local as possible**.
- Lift state up **only when**:
  - Multiple components need the same data.
  - You need to coordinate behaviour between siblings.
- Avoid adding a global state solution unless truly necessary.

**Checklist**

- Is this really global state, or can it live in a single component/tree?
- Can I replace this global state with props + callbacks?

---

### 2.4 JSX / Rendering

- Keep JSX **shallow and readable**:
  - Extract chunks of JSX into small components if they grow too large.
- Avoid inline arrow functions in JSX for hot paths (only if performance actually matters).
- Use semantic HTML and accessible patterns where reasonable.

---

## 3. TypeScript Guidelines

### 3.1 General Rules

- **No `any`** in production code. If you must:
  - Use `unknown` instead, then narrow.
  - Or add a **TODO** with a clear refactor plan.
- Prefer **explicit types** for:
  - Component props.
  - Public functions.
  - External APIs.

---

### 3.2 Interfaces vs Types

- **Interfaces** for object shapes that might be extended/implemented:
  - e.g. `IconDefinition`, `Theme`, configuration objects.
- **Type aliases** for unions, function signatures, and utility types:
  - e.g. `type IconName = 'storage' | 'network' | 'compute';`

**Example**

```ts
export interface IconDefinition {
  name: IconName;
  category: IconCategory;
  tags: string[];
}

export type IconName = string;
export type IconCategory = 'infrastructure' | 'app' | 'misc';
```

Be consistent within the project; don’t mix patterns arbitrarily.

---

### 3.3 Props and State Typing

- Always type component props explicitly:
  - `interface Props { ... }` or `type Props = { ... }`.
- Avoid `React.FC`’s implicit `children` unless the component actually renders `children`.

**Checklist**

- Are props and state shapes fully typed?
- Could this union type make the code clearer than multiple flags?

---

### 3.4 Strictness

- Aim for **strict TypeScript**:
  - `strict: true`
  - `noImplicitAny: true`
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
- Warnings in TS or ESLint **should be treated as errors** in CI.

---

## 4. Project Structure

Proposed structure:

```text
src/
  components/
    IconPreview/
      IconPreview.tsx
      IconPreview.test.tsx
      IconPreview.css
    IconGrid/
    ...
  hooks/
    useIconFilter.ts
    useIconSelection.ts
  lib/
    icons/
      catalog.ts
      renderIcon.ts
    utils/
      download.ts
      zip.ts
  pages/
    Home/
      Home.tsx
  mcp-server/          # (if/when MCP is added; separate TS project)
tests/
  ...
```

**Rules**

- Avoid “god folders” like `utils` or `helpers` with unrelated things thrown in.
- Co-locate tests next to the code they exercise or in a mirrored `tests/` tree, but be consistent.

---

## 5. Testing & Quality

### 5.1 Testing

- Prefer **small, focused tests**:
  - unit tests for core logic (e.g. `renderIcon`).
  - component tests for important UI flows.
- Tests should be:
  - Fast.
  - Deterministic.
  - Not tightly coupled to implementation details.

**Minimum**

- Core business logic (icon rendition, selection, filtering) must be covered by tests.
- For bugs:
  - Add a test that reproduces the bug.
  - Fix the bug.
  - Keep the test.

---

### 5.2 Linting & Formatting

- Use **ESLint** for:
  - React rules.
  - TypeScript rules.
  - Code quality (no unused vars, no implicit any, etc.).
- Use **Prettier** for consistent formatting.
- Configure **pre-commit hooks** (e.g. with Husky) to run:
  - `lint`
  - `format` (or ensure formatting is applied by your editor)

**Non-negotiable**

- CI fails if:
  - `npm run lint` fails.
  - `npm run test` fails.
  - `npm run build` fails.

---

### 5.3 Git & PRs

- Small, focused PRs.
- Commit messages:
  - `feat: ...`
  - `fix: ...`
  - `chore: ...`
  - `docs: ...`
  - `refactor: ...`

**PR checklist**

- [ ] Code follows this constitution (KISS, DRY, functional).
- [ ] Types are correct and no `any` was introduced.
- [ ] Lint, tests, and build all pass locally.
- [ ] Documentation and comments are updated as needed.

---

## 6. Documentation

- Keep README **up to date**:
  - Project purpose.
  - Getting started.
  - Scripts and commands.
  - Deployment (GitHub Pages).
- Keep CHANGELOG **up to date**:
- For more detailed engineering rules, refer to this **constitution**.
- For new patterns or decisions, prefer adding a small section here rather than scattering comments across the codebase.

---

## 7. React + TS Best Practices (Quick Reference)

- **Functional components only.**
- **Hooks for shared behaviour.**
- **Pure functions** for transformations.
- **Strong typing**, no unneeded `any`.
- **Short components** (aim for &lt; ~150 lines; extract if larger).
- **Single responsibility** per component/module.
- **No dead code**: delete, don’t comment out.
- **Prefer composition** over inheritance and deep prop threading (use context sparingly and intentionally).

---

## 8. How to Use This Constitution

Before merging a PR:

1. Read through this document once (it should be familiar).
2. Run `npm run lint`, `npm test`, and `npm run build`.
3. Manually check:
   - Is the solution **simple**?
   - Is logic **duplicated** elsewhere?
   - Are we building only what is actually needed?
   - Is the code **functional, typed, and testable**?

If the answer to any of these is “no”, fix the code or open a follow‑up issue before merging.

