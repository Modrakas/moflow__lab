# ◈ MoFlow Lab - R&D Technical Residency 

A Self-directed technical residency sile. Built with modular vanilla JavaScript (ES6 modules), GSAP, a 7-1 SCSS architecture, and a Gulp + webpack build pipeline. Every experiment is a deliberate stress-test - a constraint set, a performance target, and a rule against abstraction until it's earned.

---

## Visual Identity & Aesthetic

MoFlow Lab is not a portfolio. It is an R&D archive. Every visual decision is a functional one - the palette, type hierarchy, and texture are designed to read like a living process monitor, not a designed website.

---

## The Palette -- Ember & Earth

The color system is built around thermal contrast: deep madder background absorb light; burnt orange signals cut through it; parchment test sits high-contrast without the clinical coldness of pure white.

| Token | Hex | Role |
|---|---|---|
| `$color-bg` | `#2C0E0E` | **Deep Madder** — page background. Warm-dark; absorbs aggressive typography without visual noise. |
|`$color-bg-elevated` | `#3D1414` | Raised surface for hover states and cards.|
|`$color-bg-surface` | `#4D1C1C` | Highest surface level - tooltips, active states. |
| `$color-accent` | `#FF7043` | **Burnt Ornage** — primary signal. CTAs, cursor dot, highlight on hover. Hot against the oxblood field. |
| `$-text` | `#F4EBD0` | **Parchment** - primary body text. Warm-white; avoids the sterile brightness of `#ffffff` on a red field. |
| `$color-text-muted`| `#9E8A6E` | Mid-tone ochre for metadata, labels, and secondary text. |
| `$color-text-dim` | `#5C4A38` | Near-invisible warm brown - index numbers, dividers, ghost text. |
|`$color-border`| `RGBA(244,235,208, 0.08)` | Parchment at 8% opacity - hairline dividers. |

### Signal Colors - Experiment Palette

Each experiment in the R&D Index has a unique signal color drawn from a five-stop accent paletts. These are the only hues allowed beyond Ember & Earth.

| Token | Hex | Name | Experiment |
|---|---|---|
| `$color-signal-01` | `#FF7043` | Burnt Orange | EXP-01 |
| `$color-signal-02` | `#D4E157` | Acid Lime | EXP-02 |
| `$color-signal-03` | `#26C6DA` | Steel Teal | EXP-03 |
| `$color-signal-04` | `#EC407A` | Electric Rose | EXP-04 |
| `$color-signal-05` | `#FFA726` | Amber Gold | EXP-05 |

---

### Typography Hierarchy

Two typefaces, two jobs. They never compete - they are calibrated to create maximum contrast between information tiers.

#### Impact Layer - Syne ExtraBold (800)

Used for: Hero headline, section titles (`R&D`, `Craft without compromise.`), project tieles.

Syne at `font-weight: 800` is aggressive at large sizes - the tight letter-spacing (`-0.04em`) and `line-height:0.9` create the stack headline density that makes the hero section read as architectural rather than decorative. At small sizes it would look wrong. It is never used below `2rem`.

```
clamp(3rem, 12vw, 7.5rem)		- hero headline
clamp(2rem, 5vw, 4rem)			- project titles (uppercase, -0.03em)
clamp(48px, fluid, 96px)		-section titles
```

### Data Layer - JetBrains Mono Light (300)

Used for: All lab metadata, index number, stack badges, nav links, marquee ticker, section labels, counter, status text, fotter copy.

The deliberate design decision is to keep system text *small* - `0.625rem` to `0.85rem`. The tiny mono agains the massive Syne creates the `editorial brutalism` contrast that defines the aesthetic. Increasing the mono size to match body text would destroy the hierarchy.

```
0.75rem			- labels, nav, counter, footer		(12px)
0.6875rem		- index numbers, stat labels			(11px)
0.625rem		- category tags										(10px)
0.5625rem		- stack badges										(9px) ← smallest readable tier
```

---

### the "Feel" - Editorial Brutalism

The aesthetic target is a researh archive that feels *alive*. Three elements produce this:

**Clean grids** Every section uses a strict grid. The work section grid (`64px | 1fr | auto`) pins index numbers to a hard left rail, project titles to a fluid center column, and action links to the far right - at every viewport. No float, no implicit  positioning.

**Agressive typography**  Syne at 96px headings against 11px mono lables creates a scale ratio of roughly 9:1. This is intentional. The ratio creates the vicual tension that makes the page feel designed rather than laid out.

**Living texture** The procedural noise-kernel (`NoiseGenerator.js`) draws a new random noise frame on every animation tick using canvas 2D `ImageData` API. Combined with `mix-blend-mode: overlay` in ss, it composites a grain texture over gradient thumbnails and hover states at the GPU level. There are no image assets - the texture is generated at runtime, making  it infinitely variable and viewport-responsive. The `[Noise-Kernel: Active]` badge in the work header is a UI reference to this live process.

---

## Project Structure

## Tech Stack

| Layer | Technology | Decision |
|---|---|---|
| Markup | HTML5, BEM, class naming | Flat `0-1-0` specificity throughout |
| Data | JSON (`data/projects.json`) | Content/structure separation; zero HTML edits to add experiments |
| Styles | SCSS (7-1 patter) → Gulp | `@use` only = scoped modules, no global namespace polution |
| Scripts | Vanilla JS ES6 modules → webpack | No framework overhead; direct DOM, deterministic RAF loops |
| Animation | GSAP 3 + ScrollTrigger (CDN) | Declared as webpack externals - not bundled, CDN-cached |

| Smooth Scroll | Lenis (CDN) + LenisLite fallback | Lenislite is inline = zero CDN dependency |
| Build | Gulp 4 + webpack-stream | Gulp: file transforms. webpack: module graph. Each does one job. |
| Fonts | Google Fonts - Syne + JetBrains Mono | Two faces, teo tiers, no overlap |

---

### Prerequisites

- Node.js `v18+`
- npm `v9+`
- A local server (required for `fetch()` - `file://` will throw a CORS error)

### Instalation

```bash
git clone https://github.com/Modrakas/moflow-lab.git
cd moflow-lab
npm install
```

Required packages (also in `package.json`):

```bash
npm install --save-dev gulp gulp-sass sass gulp-autoprefixer gulp-purgecss webpack-stream webpack @babel/core @babel/preset-env
```

---

## Development

### Start dev build (compile + watch)

```bash
npx gulp
```

Runs the default Gulp task:
1. Compiles `sass/index.scss` → `css/index.css` (autoprefixer, PurgeCSS applied)
2. Bundles `js/app.js	 + all modules →  `dist/main/min.js` via webpack + Babel
3. Watches `sass/**/*.SCSS` and `js/**/*.js for changes`

### One-off production build
```bash
npx gulp build
```

### Individual tasks

```bash
npx gulp styles
npx gulp scripts
npx watch
```

## JavaScript Architecture

`js/app.js` is the webpack entry point and orchistrates a strict async boot sequence.

```

```

## SCSS Architecture (7-1 Pattern)

Styles split across three layers, all using `@use` (never `@import`):
**`absracts/`**
**`base/`**
**`components/`**

## PurgeCSS Safelist

Dynamically toggled classes safelist in `gulpfile.js`;

| Class | Module | Reason |
|---|---|---|

## Adding a New Experiment

1. Open `data/projects.json`
2. Add a new object following the schema:

```jason
{
	...
}
```

3. the `color` fiels is what powers the `--project-signal-rgb` injection. Choose a color from the signal palette or define a new one. The mid-stop in `gradient` should be the signal color darkened to `55% to maintain gradient depth.

4. save. No HTML, JS, or SCSS changes required. Reload the dev server

---

## Page Selections

| Section | Anchor | Description |
|---|---|---|
| Header / Nav | - | Fixed, scroll-state background, TextScramble on nav links |
| Hero | `#hero` | Full-screen Syne headline, mouse parallax, footer bar |
|Marquee | - | Auto-scrolling JetBrains Mono tech ticker |
| Work | `#work` | Data-driven experiment list, signal hover system, mouse-follow preview |
| About | `#about` | R&D identity, animated stat counters, capabilities grid |
| Contact | `#contact` | Direct mailto CTA - `modrak@moflowlab.com` |
| Footer | - | Brand mark, tagline, social links |

--- 

## Build Process & Logic

The build is organized into four phases. Each phase has a hard dependency on the previous one - the order is not convention, it is constraint.

The overarching decision across all four phases: **no framework.** React, Vue, and Svelte all introduce a runtime abstractions layer between JavaScript and the DOM. For a performance target of 60fps on a Madder canvas - where motion, noise generation, and cursor tracking run simultaneously on every frame - that abstraction is a liability, not as asset. Framework lifecycle methods, virtual DOM diffing, and Scheduler overhead all compete with the RAF loop. Vanilla JS with direct DOM access is not a nostalgic choice, it is a performance constraint.

---

### Phase 1 - Environment & Tooling

***Gulp + webpack together, not either/or.** Gulp handles file-level transform (SCSS → CSS, autoprefixer, PurgeCSS). webpack handles module resolution and JS bundling. Each tool does what it was designed for.

**GSAP declared as a webpack `external`.** GSAP (~60KB) is loaded via CDN `<script>` in `index.html`. Declaring it external tells webpack : *"this global exists at runtime - do not bundle it."* Result: faster rebuilds, smaller output bundle, CDN-cached delivery. The same applies to Lenis and Scroll Trigger.

```js
//gulpfile.js - webpack cinfig
externals: {
	gsap:							'gsap',
	scrollTrigger:		'ScrollTrigger',
}
```

**`@use` over `@import` in every SCSS file.** `@import` is depreciated in Dart Sass because is populates the global namspace - any partial can accidentally reference any other partial's variables. `@use` creates a scoped module. All design tokens are accessed as `a.$color-accent`, not as globals.

**`abstracts/` emits zero CSS.** Variables and mixins produce no output themselves - only the components that consume then generate CSS rules. Adding a new token costs zero byts until something uses it.

--- 