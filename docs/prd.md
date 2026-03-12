# Product Requirements Document

**Project:** React Icons to SVG Exporter  
**Owner:** Frederic Jacquet  
**Repo:** `fjacquet/icons`

---

## 1. Overview

The **React Icons to SVG Exporter** is a small web tool that renders React-based icon components to **standalone SVG files** so they can be reused in **presentations** (PowerPoint, Keynote, Google Slides, etc.).

The app is built with **React** and is **published via GitHub Pages** for easy hosting and distribution.

---

## 2. Goals & Non‑Goals

### 2.1 Goals

- Provide a **simple UI** to browse available icons and export them as SVG files.
- Allow users to **customize basic properties** (size, color, background) before export.
- Support **single and bulk download** of icons as SVG and/or ZIP archive.
- Ensure **consistent, clean SVG output** suitable for use in presentation tools.
- Automate **build, lint, test, and deploy** to GitHub Pages through CI.
- Keep the implementation **small, maintainable, and contributor‑friendly**.

### 2.2 Non‑Goals

- Full-featured vector editor (no complex shape editing beyond simple properties).
- Managing user accounts or persistence beyond the browser (no backend).
- In-app slide editor or presentation builder — the focus is **export**, not editing slides.
- Supporting non-SVG formats (PNG export can be a future enhancement).

---

## 3. Users & Use Cases

### 3.1 Target Users

- **Developers / engineers** who already use React icon libraries and need to export icons for non-web contexts.
- **Solution architects / pre‑sales** who frequently build decks and need consistent iconography.
- **Designers** who want to quickly grab an SVG variant of an existing React icon.

### 3.2 Key Use Cases

1. **Quick single icon export**
   - User navigates to the app.
   - Searches or browses for an icon.
   - Adjusts color/size.
   - Downloads a single SVG file and drags it into a presentation.

2. **Batch export a set of icons**
   - User selects multiple icons (e.g., all “infrastructure” icons).
   - Applies shared styling (color, size).
   - Downloads a ZIP containing all selected SVGs.

3. **Consistent styling for a deck**
   - User defines a theme (primary color, default size).
   - Applies this theme to all exported icons for a specific deck.
   - Ensures consistent look & feel across slides.

---

## 4. Product Scope

### 4.1 MVP

- UI listing icons from a predefined React icon set (or multiple sets).
- Search/filter by icon name and/or category.
- Inline preview of selected icon.
- Basic styling controls:
  - **Size** (px)
  - **Color** (hex/RGB picker or presets)
  - **Background** (transparent vs solid, optional)
- Export actions:
  - Download **single SVG**.
  - Download **multiple SVGs as ZIP**.
- Static deployment via **GitHub Pages** (built from `main`).

### 4.2 Nice‑to‑Have (post‑MVP)

- Favorite / pinned icons (stored in localStorage).
- Theme presets (e.g., “Light”, “Dark”, “Dell‑blue”).
- Copy SVG to clipboard.
- PNG export (via client-side rasterization).
- Multi-library support (e.g., react-icons, custom icon packs).

---

## 5. Functional Requirements

### 5.1 Icon Catalog

- **FR-1:** The system **shall display** a grid/list of available icons with:
  - Icon preview
  - Icon name
  - Library/category (if applicable)
- **FR-2:** The user **shall be able to** search icons by name (case-insensitive).
- **FR-3:** The user **shall be able to** filter icons by category/library (if defined).

### 5.2 Icon Preview & Customization

- **FR-4:** When an icon is selected, a **preview panel** shall display a larger version.
- **FR-5:** The user **shall be able to** adjust:
  - Size (numeric input + slider or presets).
  - Color (color picker or fixed palette).
  - Background (transparent vs solid).
- **FR-6:** Changes in settings **shall update** the preview in real time.

### 5.3 Export

- **FR-7:** The user **shall be able to** download a **single icon** as a `.svg` file reflecting current settings.
- **FR-8:** The user **shall be able to** select **multiple icons** and export them as:
  - Individual `.svg` files
  - Optional `.zip` archive containing all SVGs
- **FR-9:** Generated SVG files **shall not depend** on React or JavaScript at runtime (pure SVG).

### 5.4 Project Configuration & Quality

- **FR-10:** The project **shall include** scripts in `package.json` for:
  - `build`
  - `test`
  - `lint`
  - `format` (if using Prettier)
- **FR-11:** The repository **shall include**:
  - `README.md` with usage, development setup, and deployment info.
  - `CONTRIBUTING.md` with contribution flow and checks to run.
  - `LICENSE` file.
- **FR-12:** The app **shall be** a static React site that can be built with `npm run build` (or equivalent) and deployed to GitHub Pages.

---

## 6. Non‑Functional Requirements

### 6.1 Performance

- **NFR-1:** Initial load time on GitHub Pages should be &lt; 3 seconds on a typical broadband connection.
- **NFR-2:** Icon rendering and property updates should feel instantaneous (&lt; 100ms) for typical icon sets (&lt; 1000 icons).

### 6.2 Compatibility

- **NFR-3:** Support current versions of major desktop browsers:
  - Chrome
  - Firefox
  - Edge
  - Safari
- **NFR-4:** SVG exports should render correctly in:
  - PowerPoint (Windows + macOS)
  - Keynote
  - Google Slides

### 6.3 Reliability

- **NFR-5:** CI should block merges to `main` if **build, tests, or lint** fail.
- **NFR-6:** CI + GitHub Pages deployment should complete in &lt; 5 minutes under normal conditions.

---

## 7. Architecture & Tech Stack

### 7.1 Technologies

- **Frontend:** React (Create React App, Vite, or similar).
- **Styling:** CSS/SCSS or CSS-in-JS (TBD).
- **Icons:** React icon components imported from:
  - A chosen library (`react-icons`, custom internal components, etc.).
- **Build & Deployment:**
  - Node.js/npm scripts.
  - GitHub Actions for CI and deployment.
  - GitHub Pages as hosting.

### 7.2 High‑Level Flow

1. User opens GitHub Pages URL.
2. React app loads icon catalog (static import or generated manifest).
3. User searches/selects icons and tweaks settings.
4. For export, React component is rendered to SVG markup and:
   - Blob is created client-side for download.
   - For batch, multiple SVGs are zipped (JS library) and offered as a single download.

---

## 8. CI/CD & Quality Gates

### 8.1 CI

- **CI-1:** On every **pull request** and **push to main**:
  - Install dependencies (with cache).
  - Run `npm run lint`.
  - Run `npm test` (or equivalent).
  - Run `npm run build`.
- **CI-2:** If any step fails, the workflow fails and prevents merge.

### 8.2 Security & Dependency Checks

- **CI-3:** Run a dependency security scan (e.g., `npm audit --production`, or GitHub-native `dependabot`).
- **CI-4:** Optionally enable GitHub **Code Scanning** / **Secret Scanning** for the repo.

### 8.3 Badges

- **CI-5:** README should display badges for:
  - Build status (GitHub Actions).
  - License.
  - (Optional) Test coverage.

---

## 9. UX & UI Requirements

- **UX-1:** Clean, minimal layout:
  - Left: icon grid and filters.
  - Right: preview & settings panel.
- **UX-2:** Icons should show name on hover and/or below the glyph.
- **UX-3:** Selected icons should be visually highlighted.
- **UX-4:** Export buttons (single and bulk) should be clearly labeled and always visible when there is a selection.
- **UX-5:** Show lightweight feedback:
  - Toast/snackbar on successful download.
  - Error indication if something goes wrong.

---

## 10. Metrics & Success Criteria

- **M-1:** Ability to export a **single icon** as SVG in &lt; 5 clicks from initial page load.
- **M-2:** Ability to export **N icons** (&lt;= 20) as a ZIP in &lt; 10 clicks.
- **M-3:** No CI‑breaking issues on `main` for a rolling 30‑day period.
- **M-4:** (If using analytics) Basic usage metrics:
  - Number of sessions.
  - Number of exports per session.

---

## 11. Risks & Open Questions

### 11.1 Risks

- Large icon sets may impact initial load or memory usage.
- Differences in how presentation tools interpret certain SVG features (e.g., filters, gradients).

### 11.2 Open Questions

- Which icon library/libraries will be the **initial focus**?
- Do we need **PNG export** for environments that don’t handle SVG well?
- Should we support **multi-color** icons with per-part customization or keep it simple (single fill color)?

---

## 12. Roadmap (High‑Level)

1. **MVP**
   - Basic React app with catalog, preview, customization, and SVG export.
   - Initial CI pipeline and deployment to GitHub Pages.
2. **Polish**
   - Better filters, UI improvements, favorites.
   - Documentation, badges, contribution guidelines.
3. **Extensions**
   - PNG export, theming, multi-library support, richer customization.
