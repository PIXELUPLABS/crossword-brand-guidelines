# Crossword brand kit

This kit holds the design operating system for **Crossword**, the concierge desk for your brand. It was built from the latest Crossword Figma designs and the shipped staging site (`monesh-pixelup/Crossword` @ `e2c8dc0`).

The visual guideline lives in Figma: *Brand Guidelines 🟡* page › **Crossword Brand Guidelines** (`2280:186`) in file `TiAeD9ICNjjC8N3zoUJExk`.

## Contents

| Path | What it is |
|---|---|
| `DESIGN.md` | The machine-readable contract: YAML tokens plus rules. Load it into any agent or new designer first. Lint result: **0 errors, 0 warnings**. |
| `brand.md` | The long-form operating document: audit, principles, component and motion rules, debt and action plan. Every claim is tagged [O]/[P]/[I]/[R]. |
| `brand-audit.yaml` | The inputs and provenance record: sources, Figma node IDs, measurements, open decisions. |
| `logo/master/crossword-lockup.svg` | The outlined master, exported from Figma `2270:31450`. Every other logo file is derived from it. |
| `logo/svg`, `logo/png` | Signature, mark and wordmark in black, white, gold, cream, ink and maroon. Includes clear-space variants, avatars (cream, maroon, forest, aubergine, ink) and `lockup-gold-on-maroon`. |
| `logo/favicon` | `icon.svg`, `favicon.ico` (16/32/48), `apple-icon.png`, and 192px and 512px PNGs. |
| `textures/` | The canonical, de-duplicated set: maroon and aubergine damask panels, greyscale damask and grain tiles (blend them over livery), `stamps/` (guilloché stamps and the gold wax seal), `ornaments/`. |
| `patterns/` | Code-exact SVGs: divider trellis tile and badge frame, page rail, gold rail accent, studs, ring studs, notched frames, eyebrow corner curl, StampButton anatomy, gilded quote mark, footer monogram frame. |
| `tokens/theme.css` | Tailwind v4 `@theme` with semantic names, exported from DESIGN.md. |
| `tokens/theme.aliases.css` | The same values under the repo's existing utility names (`maroon`, `cream`, `sand`…), plus the new `forest`, `aubergine`, `amber`, `ink-muted`… For a drop-in migration. |
| `tokens/tokens.dtcg.json` | W3C design tokens, for Figma variables (Tokens Studio or a variables import). |
| `tokens/motion.css` | Motion tokens, the global `:focus-visible` rule, press feedback and reduced-motion behaviour. The format has no motion schema, so these live here. |
| `tokens/lint-report.json`, `contrast-matrix.md`, `code-token-audit.md` | Evidence: lint output, the WCAG matrix and the code token census. |
| `previews/` | Contact sheets: `logo-sheet.png`, `palette-sheet.png`, `texture-sheet.png`. |

## Wiring it into the repo

1. Copy `DESIGN.md` to the repo root. Reference it from `AGENTS.md` ("Read DESIGN.md before any UI change; DESIGN.md wins over brand.md").
2. In `app/globals.css`, replace the colour block inside `@theme` with `tokens/theme.aliases.css`. Then replace `parchment-deep` with `parchment`, `#fff9e9`/`#fef8ea` with `cream`, and `#040404` with `ink` (see brand.md §5.11).
3. Import `tokens/motion.css` after Tailwind. Add `className="stamp-button"` to StampButton to get press feedback. The global focus ring then covers the roughly 20 controls that currently lack one.
4. Copy `logo/favicon/icon.svg`, `favicon.ico` and `apple-icon.png` into `app/`. Next's file conventions pick them up.
5. Font variables stay as they are in `lib/fonts.ts`; `theme.aliases.css` maps the roles onto them. Retire Inter, DM Sans and Tangerine as brand.md §6.1 describes.
6. Add a lint step to CI: `npx -p @google/design.md designmd lint DESIGN.md`. Run `designmd diff` before merging token changes.
7. In Figma: import `tokens/tokens.dtcg.json` as a `Crossword / Brand` variable collection. Then bind the guideline slides and the final designs (Hero Tests) to it.

## Fonts and licensing

Crimson Pro, Parisienne, Geist and Open Sans are all **SIL Open Font License**: free for commercial use and already self-hosted via `next/font`. No trial or unlicensed fonts were found. Font files are not included in this kit; link them from source.

The final Figma frames also contain Gambetta (Fontshare/ITF free licence). It isn't part of the system. Verify the licence before any production use.

## What you can enforce now, and what is still open

- **Enforceable today ([O]/[P]):**
  - cream ground, maroon primary, gold as trim only
  - radius 0 on brand chrome
  - one swash capital per headline
  - Crimson Pro + Geist
  - text at or above `ink-muted` (5.63:1)
  - the measured logo construction
- **Needs design-lead sign-off ([I]):** the guardrail wording, forest as permanent livery, the 4·8·12·16·24·32·48·64·80·120 rhythm.
- **Open recommendations ([R]):** motion tokens, pressed and disabled states, nav dropdown spec, semantic colours, product-UI components (inputs, modals, tables).
- **Placeholder content (not signed off):**
  - "300+ d2c brands in 120+ countries"
  - the 28%, 12.3% and 76% stats
  - all testimonials (one quote repeated three times)
  - blog posts
  - `/sell` storefront card art (one image repeated three times)

## Open decisions for the client

- **D1.** Confirm the positioning guardrail: never a generic AI chatbot, never a costume.
- **D2.** Forest green: permanent livery, or only for the footer and Trust sections?
- **D3.** Should the header use the full lockup instead of the framed mark alone?
- **D4.** Which hero ships: light (A, B, C) or dark photographic (Hero B)?
- **D5.** Retire Tangerine entirely?
- **D6.** Sign off the placeholder figures, testimonials and blog copy.
