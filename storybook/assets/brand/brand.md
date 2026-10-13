# Crossword: Brand & Product Design Operating Document

> **Crossword, Inc.**, a CometChat product. "Crossword is the concierge desk for your brand."
> Version 0.2 · 12 Oct 2026 · Prepared by PixelUp Design. Rebased on the final designs (Figma › Hero Tests); v0.0.1 and the Sell wireframe are excluded as extras.
> Companion contract: [`DESIGN.md`](DESIGN.md) (lint: 0 errors, 0 warnings). Brand kit: this folder, described in [`README.md`](README.md).
> Tokens:
> - [`tokens/theme.css`](tokens/theme.css): semantic names, exported from DESIGN.md.
> - [`tokens/theme.aliases.css`](tokens/theme.aliases.css): keeps the repo's existing utility names (`maroon`, `cream`…).
> - [`tokens/tokens.dtcg.json`](tokens/tokens.dtcg.json): W3C format, for Figma variables.
> - [`tokens/motion.css`](tokens/motion.css): motion tokens and the focus rule.
> Visual companion: the **Crossword Brand Guidelines** section (`2280:186`) on the *Brand Guidelines 🟡* page of the Figma file `TiAeD9ICNjjC8N3zoUJExk`. It has 33 slides at 1920×1080 that mirror the Replay guideline structure: Cover, Overview, Contents, then 2 Logo, 3 Colour, 4 Typography, 5 Graphic System and 6 Crossword in Action.

---

## 0. How to read this

This document is an **audit first and a rulebook second**. The evidence comes from three places:

| Authority | Source | What it decides |
|---|---|---|
| **Intent** | Copy on the site and in Figma ("concierge desk", "best hire"), plus the Replay guideline structure we were asked to mirror | Personality and positioning |
| **Spec** | Figma › *Brand Guidelines 🟡* › **Hero Tests** (`2270:21063`), the **final designs**: page A (`2270:23798`), page B (`2270:27058`), Previous (`2270:21064`), hero C (`2270:30362`), Hero B (`2270:30944`) and the human-handoff panel (`2270:32217`). Plus **Logo All Variants** (`2270:31448`) for the logo | Naming, the logo, intended surfaces |
| **Usage** | Repo `monesh-pixelup/Crossword` @ `e2c8dc0` (9 Oct 2026, "added new sell page"): Next 16, Tailwind v4, GSAP | What actually ships |

Figma sets the names and code sets the usage. Where they disagree, §21 records the gap.

**Evidence tags** (every substantive claim carries one):

- **[O] Observed**: found directly in Figma or code, with a location.
- **[P] Pattern**: repeated enough to be a system. The count is given.
- **[I] Inferred**: the best reading of intent from several examples. Needs design-lead sign-off before it goes into tooling.
- **[R] Recommendation**: not yet true. Listed in the action plan (§23).

[O] and [P] rules can be enforced in review today. [I] rules need confirmation. [R] items are open decisions.

**Placeholder figures.** "300+ d2c brands in 120+ countries", "28% of Gen Z", "12.3% conversion", "76% of buyers", every testimonial (currently one placeholder quote repeated three times) and all blog content are **unconfirmed** until the client signs them off.

**When this file and DESIGN.md disagree, DESIGN.md wins.** Fix DESIGN.md first, then bring this document into line.

**Method note.** The skill's scripts ran on Python 3.12 and Node 24:

- `audit_tokens.py` scanned 73 files and found 77 distinct hex values. The report is in `tokens/code-token-audit.md`.
- `contrast.py` produced the matrix in `tokens/contrast-matrix.md`.
- `dedupe_assets.py` compared 200 images, which collapse to 127 distinct ones.
- `logo_kit.py` measured the logo construction.
- `preview_sheets.py` drew the previews.
- `@google/design.md` linted DESIGN.md (**0 errors, 0 warnings**) and exported `tokens/theme.css` and `tokens/tokens.dtcg.json`.

Two things to know about the setup:

- On Windows, `cairosvg` was replaced with a shim backed by `resvg-py`, since `libcairo` isn't available.
- Alpha-blended text colours (e.g. black/60 on cream) were measured separately against their real ground, because `contrast.py` takes flat hex values only.

The grep-based counts quoted in this document differ slightly from the script's. For example, the script counts 77 hex values (grep: 78) and 104 arbitrary colour utilities (grep: 126). That is because the grep included SVG attributes and comments. Both counts point to the same conclusion.

---

## 1. What makes Crossword feel like Crossword

Crossword sells an AI shopper assistant. It deliberately does not look like one. It borrows the visual world of a **grand hotel's front desk**: a service bell, gilt-edged stationery, wax seals, postage stamps, damask-lined panels, engraved labels and handwritten swash capitals. The idea is *your best in-store staff, at every touchpoint*, and the design argues that idea before the copy does.

The characteristics that recur across the system:

1. **The concierge bell.** A domed service bell (or cloche) sits on a baseline, with an inner ring and a small handle. It is the mark, the favicon, and the centre of every stamp and seal. [O] Figma `Logo All Variants` `2270:31448`; repo `modules/marketing/assets/crossword-mark.svg`.
2. **The swash capital.** Almost every headline opens with a Parisienne script capital at about 1.3× the line size, followed by Crimson Pro ExtraLight in two lines. It reads like a hand-addressed envelope. [P] 12 `SectionTitle` instances plus 6 hand-rolled headlines (hero, Insights, Trust, Sell hero, CTA, footer tagline).
3. **Warm paper, never white.** The page ground is cream `#fff9ea`, layered with sand and parchment. Pure white is reserved for product mock-ups and chat bubbles. [P] `body` background, 10 cream-family values.
4. **Jewel-toned "livery" panels.** Maroon, forest green and aubergine are used as full-bleed or inset panels. They are often lined with damask texture and always trimmed in gold. [O] Figma fills in the final frames: `#7d0034` ×206, `#462160` ×60 (plus six shades at ×42–57 each), and the forest family `#004c27`/`#014c28`/`#003d1f`/`#004623` at ×46–48 each. Repo: lifecycle, shopper and launch damask panels, the green footer and Trust band.
5. **Gold as trim, not as paint.** Gold `#e0be60` appears as studs, 0.5–1px rails, dashed button borders, seal and icon fills, and corner flourishes. It is almost never a large area. [P] `#e0be60` in 13+ SVG assets and 15 utility uses. Figma `#e0be60` ×252 in the final frames.
6. **Square corners with notches.** Brand chrome has 0 radius. Frames get **concave quarter-circle notches** at the corners, like a stamp or a ticket. [P] radius 0 on every brand component. Notched frames appear on the badge, upsell frame, footer frame, logo frame and Trust guides.
7. **Engraved hairlines.** 0.5px rails run the full page height 24px in from each edge. Gold rail accents mark each section's header, and 24px divider bands with a trellis tile and a stamp-badge sit between sections. [O] `site-shell.tsx:19-20`, `divider-band.tsx`.
8. **Stationery as interface.** CTAs are framed as *stamps* ("StampButton", with four gold studs and a dashed gilt border). The closing CTA is an envelope that opens on scroll. Testimonials carry guilloché postage stamps. [O] `stamp-button.tsx`, `cta-envelope.tsx`.
9. **Service-first voice.** The copy is about hires, desks, notes and the concierge. It uses short declaratives and parallel triplets ("remembers, recommends, resolves, and reports"). [P] see §16.

### The positioning guardrail

> **Crossword must never read as a generic AI chatbot or a SaaS dashboard, nor as a costume (a wedding invitation, a Victorian pastiche).** It is a modern service brand that uses hospitality craft as proof of care. [I]

This guardrail was inferred from the work. **The client should confirm it** (open decision D1). Every call in this document is measured against it:

- If something adds ornament, ask whether it signals *service and care* or just *old-fashioned*.
- If something removes ornament, ask whether it now looks like every other AI widget.

---

## 2. Design principles

Ordered by how often they decide a call.

### P1. The desk, not the bot
| | |
|---|---|
| **Meaning** | Crossword is presented as a *person at a desk*: a hire, a concierge. Not a technology. |
| **Visual expression** | Hospitality artefacts (bell, stamps, seals, envelopes, damask, the arched hallway photo) instead of sparkles, gradients, neural meshes or robot glyphs. |
| **Product expression** | Product mock-ups are always shown *inside* a branded frame or panel (chat on damask, composer on an arched-hall photo), never floating on a blank grid. |
| **Interaction expression** | Calm and attended: auto-advancing tabs that pause the moment you hover or focus. Things wait for the guest. |
| **Avoid** | AI clichés: ✨ sparkle-as-brand, purple–blue gradients, "magic" language, chat-bubble logos. *(The sparkle icon is allowed only inside mock-up UI.)* |

### P2. Paper first, then livery
| | |
|---|---|
| **Meaning** | Every composition starts on cream paper. Jewel panels are the exception that creates emphasis. |
| **Visual expression** | Cream page; sand or parchment cards; one jewel panel per viewport. |
| **Product expression** | The default product surface is light. Dark is a *featured* mode (photo heroes, footer, Trust). |
| **Interaction expression** | Active states shift to *sand* (a slightly darker paper), not to a brand colour. |
| **Avoid** | Pure white pages, two jewel panels side by side, dark mode as the default. |

### P3. Gold is the trim
| | |
|---|---|
| **Meaning** | Gold outlines, punctuates and seals. It never fills a page or carries body text on cream. |
| **Visual expression** | 0.5–1px gold rails, 3px studs, dashed gilt borders, gold glyphs with a hairline wine stroke. |
| **Product expression** | Gold marks the *active* or *premium* moment: the active rule on a tab, the seal on the envelope. |
| **Interaction expression** | Gold appears on reveal or active, not at rest. |
| **Avoid** | Gold text on cream (1.71:1, fails). Gold gradients or metallic bevels in UI. Using wax-seal gold photography as a flat colour. |

### P4. Square, with a notch
| | |
|---|---|
| **Meaning** | Geometry comes from stationery: cut paper, stamps, tickets. Corners are either sharp or *notched inward*, never rounded. |
| **Visual expression** | 0 radius on buttons, eyebrows, cards and panels. Concave notches on hero frames. Perforated edges on stamps. |
| **Product expression** | Mock-ups of *third-party* UI (the shopper's storefront, the chat widget) may be rounded, because they depict the customer's site, not Crossword. |
| **Interaction expression** | n/a |
| **Avoid** | Rounded brand buttons and pill eyebrows. Mixing rounded and notched corners on one frame. |

### P5. Written by hand, set in type
| | |
|---|---|
| **Meaning** | One handwritten gesture (the swash capital) per headline. Everything else is precise typography. |
| **Visual expression** | Parisienne initial plus Crimson Pro ExtraLight. Line 2 steps up to Light. |
| **Product expression** | Product UI uses Geist only. The script never appears inside functional UI. |
| **Interaction expression** | n/a |
| **Avoid** | Script for whole words or sentences. Two script faces in one view. Swash on body copy, buttons or labels. |

### P6. Composed, then scaled
| | |
|---|---|
| **Meaning** | Each section is a composed artboard, like a printed page, rather than a fluid grid. |
| **Visual expression** | Exact Figma compositions, scaled to the container (`fit-to-container`, `scale-to-container`). |
| **Product expression** | Use it for illustrations and mock-ups. **Do not** use it for readable text in real product UI ([R] §21). |
| **Interaction expression** | n/a |
| **Avoid** | Reflowing a mock-up composition into stacked cards. Scaling body copy with `zoom`. |

### P7. Quiet motion, one ceremony
| | |
|---|---|
| **Meaning** | Motion is unhurried and attentive. There is one theatrical moment, the envelope, and everything else is calm. |
| **Visual expression** | Ease-out fades and slides of 300–500ms. Progress rules that fill slowly (6s). |
| **Product expression** | Auto-rotation always pauses on hover, focus and off-screen. |
| **Interaction expression** | Immediate feedback on press. No bounce in UI. |
| **Avoid** | Springy UI, parallax everywhere, a second ceremony competing with the envelope. |

---

## 3. Brand personality → design behaviour

| Brand quality | Visual expression | UI expression | Interaction expression |
|---|---|---|---|
| **Attentive** (the concierge notices) | Studs and rails mark exactly where to look. Gold accents sit only on the active section's rail. [P] | Tabs show a progress rule; the active tab moves to sand. [O] `insight-tabs.tsx` | Rotation pauses on hover, focus or off-screen; the user sets the pace. [O] |
| **Gracious** (hospitality) | Swash capitals, cream paper, envelopes, seals. [P] | Generous section padding (120px desktop). [O] `--section-pad` | Slow, ease-out reveals. The envelope opens as you arrive. [O] |
| **Discreet** (knows its place) | Ornament sits at the edges (rails, frames, corners). The content area stays clean. [I] | Mock-ups carry the information; chrome stays thin (0.5px). [P] | No pop-ups or interruptions. Motion never covers content. [O] |
| **Trustworthy** (guardrails, security) | Green Trust band and certification badges; engraved, official-feeling details (guilloché, seals). [O] | Clear legal line: "Crossword, Inc. © 2026 \| A CometChat Product". [O] | *Missing:* visible focus states on about 20 controls ([R] §13). |
| **Effortless** ("we build it for you") | Managed-launch wheel and stamp pile: physical, tactile. [O] | Mock-ups show the end state, not configuration screens. [I] | One click to "BOOK A DEMO" from every viewport. [O] |

**Attributes the work never chose:** playful, techy, minimal, bold or loud. The brief language ("best hire", "concierge") does not ask for them, and nothing in the work expresses them. Don't introduce them.

---

## 4. Logo

### 4.1 The system
Figma › *Logo All Variants* (`2270:31448`) defines the official set. [O]

| Asset | Figma frame | Size | Grounds |
|---|---|---|---|
| **Lockup** (mark + wordmark) | `Crossword_Lockup_*` | 1000×300 | Black on transparent or white; White on transparent or black; **Gold on Burgundy** |
| **Icon** (mark only) | `Crossword_Icon_*` | 500×500 | Black / White / **Gold on Burgundy** |
| **Framed icon: scalloped stamp** | `A–D` | 500×500 | Gold on maroon, green or aubergine; white on black |
| **Framed icon: gilded notched square** | `L, M, N` | 500×500 | Gold on maroon, green or aubergine; white on black |
| **Wax seals** | `1–4` | 442×442 | Green, purple and gold wax with a debossed mark |
| **Postage stamps** | `A–D` (763) | 763×763 | Olive, aubergine, forest and maroon, with "///C" and "EST 2026" |

### 4.2 Mark: the concierge bell
- **Form.** A half-dome on a flat baseline, with an inner ring and two arc highlights, topped by a small handle (a bar with a V-shaped knob). It reads as a hotel **service bell / cloche**. [I] from the geometry in `crossword-mark.svg`; confirmed visually in Figma.
- **Meaning.** "Ring for service." The concierge is one tap away. [I]
- **Drawing.** The header mark's glyph spans 24.0 × 16.75 units inside a 40.54 square frame. Its width-to-height ratio is **≈1.43 : 1** (the dome is 24 wide and 12.5 tall, and the handle adds 4.2). [O] path bounds in `crossword-mark.svg`.
- **Two drawings exist.** The header glyph and the blog glyph (`blog/crossword-mark.svg`, 21.74 × 15.17) differ in the knob and inner curves. [O] debt §21.

### 4.3 Wordmark
- "Crossword" in **Crimson Pro**, set as live text in code (blog lockup: ExtraLight 21.48px). [O] `blog.tsx:53-58`.
- **No wordmark SVG exists in the repo.** Figma has the lockups. [O] Export outlined SVGs from the Figma lockups ([R] P0).

### 4.4 Construction & clear space
These are measured from the Figma master lockup `Crossword_Lockup_Black_TransparentBG` (`2270:31449`). [O]

| Measure | Master value | In X |
|---|---|---|
| **X** = height of the bell mark (handle to baseline) | 113.7 | **1X** |
| Mark width | 162.9 | 1.43X |
| Wordmark ("Crossword", outlined vector) height | 116.7 | ≈ 1.03X, so the mark and wordmark share a height |
| Gap from mark to wordmark | 46.4 | **0.4X** |
| Wordmark width | 627.1 | 5.5X |
| Lockup width | 836.4 | 7.35X |
| Padding in the official export frame (1000×300) | 81.8 horizontal / 91.6 vertical | ≈ 0.72X / 0.8X |
| Icon export (500×500): glyph 338.6×236.2 | margins 80.7 / 125.2 | glyph fills 68% of the frame width |

- **Clear space.** Keep a minimum of **0.5X** on all sides of the lockup [R]. The official export frames already use about 0.75X. [O]
- **Icon clear space.** Keep a minimum of 0.25 × glyph width. [R]
- The mark sits on the wordmark's baseline, and its handle rises to the wordmark's cap height. [O]
- **Cross-check with `logo_kit.py`**, which uses the mark's *width* as its unit (X<sub>w</sub> = 162.91). It measures the mark at 1.00 × 0.70 X<sub>w</sub> and the full lockup at **5.13 X<sub>w</sub>**. That equals 7.35 × the mark height, which matches the table above. [O]
- The script's default clear space, X<sub>w</sub>/4 = 40.7 units, is 0.36 × the mark height. The `*-clearspace.svg` files use it. The 0.5X rule above is the stricter minimum for layouts. [O]/[R]
- **Master and exports:**
  - `logo/master/crossword-lockup.svg` is the outlined master, exported from Figma `2270:31450`.
  - `logo/svg` and `logo/png` hold the signature, mark and wordmark in black, white, gold, cream, ink and maroon, plus clear-space variants, five avatars and `lockup-gold-on-maroon`.
  - `logo/favicon` holds `icon.svg`, `favicon.ico` (16/32/48), `apple-icon.png`, and 192px and 512px PNGs.

### 4.5 Minimum size
| Asset | Digital | Print |
|---|---|---|
| Lockup | 96px wide [R] | 25mm [R] |
| Icon | 16px (favicon) / 24px in UI [R] | 6mm [R] |
| Framed icon / stamp | 40px (header) [O] | 12mm [R] |

### 4.6 Colour
| Ground | Mark colour | Status |
|---|---|---|
| Cream / white | Ink `#141414` (or black) | [O] header mark, `crossword-mark.svg` |
| Dark photo / black / green | Cream `#fff9ea` (or white) | [O] `crossword-mark-light.svg` |
| Maroon `#7d0034` | Gold `#e0be60` | [O] Figma `Gold_BurgundyBG`, the signature pairing |
| Green / aubergine | Gold `#e0be60` | [O] Figma framed icons |
| Gold wax / photography | Debossed (tonal) | [O] seals |

### 4.7 Incorrect usage [R], drawn from the system's rules
1. Don't round the frame's corners or convert the notches to radii.
2. Don't set the wordmark in Parisienne or any script.
3. Don't put a gold mark on cream (1.71:1, invisible).
4. Don't recolour the bell in amber, gradients or metallic bevels in digital UI.
5. Don't put the mark inside a chat-bubble or sparkle container.
6. Don't stretch, rotate or add drop shadows (wax seals excepted, since they are photographic objects).
7. Don't combine stamp, seal and frame around one mark. Pick one container.
8. Don't place the lockup on damask without a solid plate behind it.

### 4.8 Product usage
- **Header.** A 40px framed mark (stamp silhouette at 20% opacity, notched square at 20% opacity, and a solid glyph). It is not paired with a wordmark. [O] `site-header.tsx:57-64`. The header has no wordmark at all, so the name "Crossword" never appears in the header. [I] Decide whether the lockup should be used there (open decision D3).
- **Footer.** A guilloché stamp image and a monogram "C" (Parisienne) that runs into the tagline. [O]
- **Favicon.** `app/favicon.ico` (48, 32 and 16px). There is no SVG or Apple icon, and no OG image. [O] The kit now includes a full set: a gold bell on maroon in `logo/favicon/`. Drop `icon.svg`, `favicon.ico` and `apple-icon.png` into `app/` (Next's file conventions) [R] P1. An OG image is still to be designed. [R]

---

## 5. Colour system

Figma has **no colour styles or variables for the brand**. The only local paint style is `ILL/Paint/Shell/Radial`, and the two variable collections (`ILL Colors`, `ILL Metrics`) belong to an illustration. [O] Code declares 11 `@theme` colours but uses **78 distinct hex values**, 126 of them as arbitrary utilities. [O]

Below is the system the evidence supports. Status: **Keep** (token exists and is used), **Add** (used as a system but not tokenised), **Merge** (a duplicate) or **Drop**.

### 5.1 Brand
| Token | Value | Purpose | Usage | Source | Status |
|---|---|---|---|---|---|
| `maroon` | `#7d0034` | The brand colour. Primary button ground, active progress, featured panel | Primary StampButton bg, Insights progress bar, maroon damask panel, gold-on-burgundy logo | `globals.css`; Figma ×206 | Keep [P] |
| `wine` | `#6c2332` | Deeper, browner red. Secondary button, user chat bubble, ornament outline | `wine` StampButton, the hairline stroke on gold icons and badges | `globals.css`; Figma ×35 | Keep [P] |
| `gold` | `#e0be60` | Trim: studs, rails, dashed borders, icon and seal fill | 13+ SVGs, rail accents, button borders | `globals.css`; Figma ×252 | Keep [P] |
| `gold-bright` | `#f7c849` | Label on the maroon primary button only | `primary` StampButton text | `globals.css` (1 use) | Keep (scoped) [O] |

### 5.2 Livery (jewel panels)
| Token | Value | Purpose | Usage | Source | Status |
|---|---|---|---|---|---|
| `forest` | `#00331a` | Dark ground for the footer, Trust and Upsell | Footer bg, Trust band, testimonial arrows | ×4 + SVGs; Figma green family ×300+ | **Add** [P] |
| `forest-deep` | `#002916` | Card on forest; active launch step | Trust card | ×2 | **Add** [P] |
| `forest-light` | `#004c27` | Testimonial portrait card; stamp ground | `cardColor` in testimonials | Figma ×46 | **Add** [O] |
| `aubergine` | `#462160` | Damask panel (shopper), human-handoff section, comparison heading | Shopper panel, "Thinking" | ×4; Figma ×60 (+6 shades) | **Add** [P] |

### 5.3 Surface (paper)
| Token | Value | Purpose | Usage | Source | Status |
|---|---|---|---|---|---|
| `cream` | `#fff9ea` | Page ground | `body`, `themeColor` | `globals.css` | Keep [P] |
| `cream-band` | `#fef8ea` | Divider-band ground, corner ornaments | DividerBand, memory-graph dots | ×3; Figma ×43 | Merge into `cream` [R] |
| `sand` | `#f3e9d4` | Active tab, card, quote and envelope paper | `bg-sand` ×8 | `globals.css`; Figma ×479 | Keep [P] |
| `parchment` | `#faedd4` | Mock-up panel ground | hero and shopper mock-ups | `globals.css` | Keep [O] |
| `parchment-deep` | `#faecd4` | identical to parchment (ΔG = 1) | chat panel | `globals.css` | **Merge → parchment** [O] |
| `linen` | `#efe9db` | Inputs, icon rings, chat input | chat input, insight ring | ×3; Figma ×184 | **Add** [P] |
| `bone` | `#e8dec1` | Skeleton blocks in the hero showcase; never carries text | 1 use in code | `globals.css`; Figma ×146 | Keep (scoped) [P] |
| `night` | `#0e0501` | Behind the photographic heroes | Sell hero | ×1 | **Add** [O] |

### 5.4 Content (text)
| Token | Value | Purpose | Contrast on cream | Status |
|---|---|---|---|---|
| `ink` | `#141414` | Body, UI, headings | 17.54 AAA | Keep [P] |
| `ink-heading` → `ink` | `#040404` | Serif headings and quotes | 19.52 | **Merge → ink** [R]. The difference is invisible (ΔL < 2%) |
| `ink-muted` | black @60% (`#66645e` on cream) | Secondary body | 5.63 AA | **Add** as a token [P] (`text-black/60` ×11) |
| `ink-soft` | black @80% (`#33322f`) | Nav, text links | 12.2 AAA | **Add** [P] (`#33322f` ×5 + `black/80` ×4) |
| `label-olive` | `#766640` | Eyebrow label on cream or sand | 5.34 AA | **Add** [O] |
| `on-dark` | `#dfe3d2` | Text on forest (footer) | 10.79 on forest | **Add** [P] |
| `on-dark-muted` | `#dfe3d2` @60% | Footer legal, headings | 4.83 AA on forest | **Add** [R]. Raise the current @47% and @36% (3.52 and 2.62) to this |

### 5.5 Border / line
| Token | Value | Purpose | Status |
|---|---|---|---|
| `rail` | `#d2cbba` | Page rails, divider-band stroke, stat dividers | **Add** [P] |
| `rule-engraved` | `#b7ae9a` | Eyebrow frame and corner curls | **Add** [O] |
| `rose-line` | `#cfb8bb` | Mock-up hairlines | Keep (mock-up only) [O] |
| `line` | black @10–25% | Header bottom line (20%), tab borders | **Add** as `line` = black/20 [P] |
| `gilt-line` | `#ffb657` @36% | Gilt frame on dark grounds (footer, upsell frame) | **Add** [P] |

### 5.6 Semantic
None exist yet. The marketing site has no form validation and no status UI. [O] When product surfaces arrive, use [R]:
`success #2f6b3f` (forest family), `warning #b7791f` (amber family), `error #9b1c1c` (red, distinct from maroon so errors never read as brand), `info #462160` (aubergine). **Never use maroon as error.**

### 5.7 Accent
| Token | Value | Purpose | Status |
|---|---|---|---|
| `amber` | `#ffb657` | Live or active indicator on dark (send-button ring, active insight icon, portrait frame) | **Add** [P] (×6 + SVGs) |
| `olive` | `#9da471` | Postage-stamp ground (Figma only) | Artwork only [O] |
| `star` | `#f2be33` | Rating stars in mock-ups | Mock-up only [O] |

### 5.8 Artwork (not UI tokens)
Damask maroon, aubergine and forest textures; wax-seal gold photography; guilloché stamps; paper grain. These are **raster assets**, never sampled into flat colours. [O] See §10.

### 5.9 Interactive states
| State | Rule | Source |
|---|---|---|
| Hover (StampButton) | `brightness(1.1)` over 200ms | [O] `stamp-button.tsx` |
| Hover (link / nav) | `ink-soft` → `ink` (or `cream/80` → `cream` on dark) | [P] |
| Active tab | Ground → `sand`; inactive content at 50% opacity | [P] `insight-tabs`, discovery tabs |
| Active indicator | 2px `maroon` rule (on light); 2px `gold` rule on sell triggers | [O]. Unify on maroon for light grounds and gold for dark [R] |
| Focus-visible | 2px `maroon` outline, offset 2 | [P] (8 element types). Missing on ~20 more ([R] P0). On maroon grounds use a `gold` outline [R] |
| Disabled | 40% opacity, default cursor | [O] carousel arrows |
| Pressed | **None exist** (0 `active:` utilities) | [R]: translateY 1px plus brightness 0.95 for 100ms |

### 5.10 Measured WCAG contrast
Computed from sRGB relative luminance; alpha values are blended against their actual ground.

| Foreground | Background | Ratio | Grade | Verdict |
|---|---|---|---|---|
| ink `#141414` | cream | 17.54 | AAA | ✅ body |
| ink | sand | 15.28 | AAA | ✅ |
| black/80 `#33322f` | cream | 12.20 | AAA | ✅ nav / links |
| black/60 `#66645e` | cream | 5.63 | AA | ✅ muted body (floor) |
| black/60 | sand | 5.43 | AA | ✅ |
| black/50 | cream | 3.95 | AA-large | ⚠️ large text only |
| black/40 / ink/40 | cream | 2.84 / 2.57 | fail | ❌ inactive tab labels (`text-ink/40`). Raise to /60 |
| eyebrow `#766640` | cream | 5.34 | AA | ✅ |
| `#646464` outline button | cream | 5.63 | AA | ✅ |
| maroon | cream | 10.40 | AAA | ✅ maroon text allowed |
| wine | cream | 10.39 | AAA | ✅ |
| aubergine | cream | 12.14 | AAA | ✅ |
| forest | cream | 13.43 | AAA | ✅ |
| **gold** | **cream** | **1.71** | fail | ❌ **never gold text on cream** |
| **amber** | **cream** | **1.65** | fail | ❌ |
| cream | maroon | 10.40 | AAA | ✅ |
| gold-bright | maroon | 6.93 | AA | ✅ primary button label |
| gold | maroon | 6.09 | AA | ✅ |
| gold | wine | 6.08 | AA | ✅ |
| gold | forest | 7.86 | AAA | ✅ |
| gold | aubergine | 7.11 | AAA | ✅ |
| cream | forest | 13.43 | AAA | ✅ |
| white/85 | forest | 10.52 | AAA | ✅ Trust title |
| `#dfe3d2` | forest | 10.79 | AAA | ✅ footer links |
| `#dfe3d2`@60 | forest | 4.83 | AA | ✅ legal line |
| `#dfe3d2`@47 | forest | 3.52 | AA-large | ⚠️ footer headings (14px), so fails as small text |
| `#dfe3d2`@36 | forest | 2.62 | fail | ❌ muted footer label "Sell" |
| amber | forest | 8.12 | AAA | ✅ |
| cream | night `#0e0501` | 19.21 | AAA | ✅ |
| cream/60 | night | 7.00 | AAA | ✅ Sell hero body |
| white/50 | night | 5.30 | AA | ✅ Sell eyebrow (on the photo itself this varies, so check) |
| white | wine | 10.91 | AAA | ✅ chat bubble |
| CTA heading `#b4ab9b` | sand | 1.89 | fail | ❌ the debossed CTA heading is decorative. The CTA needs a real accessible label or button ([R] P0) |
| rail `#d2cbba` / `#b7ae9a` | cream | 1.54 / 2.10 | n/a | Decorative lines only. Never use for text or meaningful UI boundaries |

### 5.11 Colours to consolidate
| Replace | With | Count |
|---|---|---|
| `#fff9e9`, `#fef8ea`, `#fef9ec`, `#fff8e8`, `#fef7e7`, `#fffdf8`, `#fbf3ea` | `cream` | 10 + 3 + 5 |
| `#faecd4` (parchment-deep), `rgba(250,236,212,…)` | `parchment` (+ `/50`) | 3 + 2 |
| `#040404`, `#121212`, `#171717`, `#161719`, `#000` (text) | `ink` | 12 + 3 + 2 + 2 + 4 |
| `#33322f`, `#353535`, `#383838`, `black/80` | `ink-soft` | ≈ 14 |
| `#5c5c5c`, `#606060`, `#646464`, `#64666c`, `#66645e`, `black/55–70` | `ink-muted` | ≈ 20 |
| `#d2cdc0`, `#dccbbc`, `#e6ded2`, `#eedcc2`, `#ddd`, `#ddd2b9b3` | `rail` or `line` | ≈ 14 |
| `#c89f57`, `#cab587`, `#d2b75c`, `#a19169` | `gold` (or `gold/60` tint) | 6 + SVGs |
| `#002916`/`#004c27` siblings in Figma (`#003d1f`, `#004623`, `#00391d`, `#004926`, `#014c28`, `#014d28`) | `forest`, `forest-deep`, `forest-light` | Figma ≈ 300 |
| `#3c1c53`, `#3f1e57`, `#3a1c50`, `#36213b`, `#462157`, `#391b4e`, `#462260`, `#4a2a5e`, `#5a2f73` | `aubergine` (+ `aubergine-deep #3a1c50` if a second step is needed) | Figma ≈ 250 |
| `rgba(224,190,96,.3/.4)`, `#e0be6042` | `gold/30`, `gold/40`, `gold/25` | 4 |
| `rgba(108,35,50,.45/.5)` | `wine/45` | 3 |

---

## 6. Typography

### 6.1 Families: one job each
| Role | Family | Weights in use | Job | Licence |
|---|---|---|---|---|
| **Display & voice** | **Crimson Pro** | 200 ExtraLight (display), 300 Light (second line, quotes), 400 / 500 (UI serif: nav, buttons, tab titles) | Headlines, quotes, nav, button labels, text links | SIL OFL (Google Fonts) ✅ |
| **Swash initial** | **Parisienne** | 400 | *Only* the first capital of a headline, and the footer monogram "C" | SIL OFL ✅. The repo ships a 3KB subset of **A C E G N O S T W Y** |
| **Text & UI** | **Geist** | 300, 400, 500, 600 | Body, microcopy, footer links, all product and mock-up UI | SIL OFL ✅ |
| **Label** | **Open Sans** SemiBold | 600 (400 in one-offs) | Eyebrow labels: 12px, uppercase, +12% tracking | SIL OFL ✅ |

[P] Crimson Pro is used 36 times in 24 files, Parisienne 14 times in 8, Geist is the body default, and Open Sans covers the eyebrows.

**Fonts to retire** [R]. Each has no job the core four can't do.

| Family | Where it is | Replace with |
|---|---|---|
| Tangerine 400/700 | Testimonials swash "T", lifecycle numbers "01–03", the author "signature" | Parisienne for the swash. Crimson Pro Light for numerals. The signature may stay as **artwork** (an SVG) |
| Inter 400 | `/sell` discovery tab labels (real UI), a role line, a mock-up label; ×71 in the final Figma frames, inside mock-ups | Geist |
| DM Sans | Mock-up prices and buttons; ×126 in the final Figma frames, all inside merchant mock-ups | Geist (mock-ups depict third-party sites, so DM Sans may stay **only** inside a mock-up that depicts a specific merchant) |
| Figma-only: Libre Franklin, Caveat, Great Vibes, Gambetta (3 uses each in the final frames) | Leftovers inside the final frames | Remove from production frames |

Licensing: every face in use is OFL. **No trial fonts found.** [O] (Gambetta, in the final Figma frames, is a Fontshare/ITF free licence. Verify it before any production use.)

### 6.2 The headline grammar (signature) [P]
```
[Swash capital: Parisienne 400, 1.30–1.37× line size, leading 1.18]
  + [rest of line 1: Crimson Pro 200, tracking −4% to −5%, leading 1.1]
[line 2: Crimson Pro 300 (or 200), same size and tracking]
```
- Sentence case. Each line is a complete phrase ("Every conversation / has a job to do").
- The swash letter must exist in the subset (A C E G N O S T W Y). **Add a letter to the subset before you write a headline that needs it.** [O] `lib/fonts.ts:16-27`
- An emphasis word may switch to `gold` *on dark grounds only* ("a reason **to buy**" on the Sell hero). [O]
- One swash per headline, one headline per section.
- **Implementation.** Set `line-height: 0` on the swash span so its 1.33em size doesn't inflate line 1. This replaces the per-heading `firstLineHeight` constants (63–83.2px) and most of the 8 SectionTitle variants. It was verified in `previews/specimen.html`, which was rendered with `verify_render.py` at 1440px and 390px. [R]

### 6.3 Scale (as used, desktop / ≤991 / ≤767 / ≤479) [O] `globals.css`
| Role | Family / weight | Size | Leading | Tracking |
|---|---|---|---|---|
| Display / hero h1 | Crimson 200 + Parisienne | 69–70 / 56 / 44–48 / 40–44 | 1.1 | −5% (−0.05em) |
| Section h2 | Crimson 200/300 + Parisienne 82 | 60 / 48 / 40 / 36 | 1.1 (0.9–1.18 variants) | −5% (−3px) |
| h4 | Crimson 300 | 40 / 34 / 30 / 28 | 1.1 | −4% |
| h5 (quote, card title) | Crimson 300 | 32 / 28 / 26 / 24 | 1.2 | −4% |
| h6 | Crimson 300 | 28 / 24 / 22 / 20 | 1.2 | −3% |
| Large body | Geist 300/400 | 24 / 22 / 20 / 20 | 1.3 | −2% |
| Tab / item title | Crimson 400 | 20 | 1.1 | −4% (−0.8px) |
| Body | Geist 400 | 16 | 1.5 (24px) | −2% (−0.32px) |
| UI serif (nav, buttons, links) | Crimson 500 (buttons) / 400 (nav) | 16 | 22px | −3% (−0.48px) |
| Small body | Geist 400 | 14 | 20px | −2% (−0.28px) |
| Microcopy / footer links | Geist 400 | 12 | 1.3 | −3% (−0.36px) |
| Eyebrow | Open Sans 600, UPPERCASE | 12 | 0.9 | +12% (1.44px) |
| Numerals (stats) | Crimson 200 | 70 (display) | 1.0 | −4% |

### 6.4 How hierarchy is made [P]
- **By family and size, not by weight.** Headlines get *lighter* as they get larger (200 at 60–70px). Weight only steps up for small serif UI (500 for button labels).
- **The swash marks the top of a hierarchy.** Only h1 and h2 get one.
- **Case marks function.** UPPERCASE is reserved for eyebrows, buttons and text-link labels. Everything else is sentence case.

### 6.5 Tracking rule (code implies it; 61 distinct values today) [I] → [R]
`body −2%` · `serif UI −3%` · `headings h4–h6 −4%` · `display −5%` · `eyebrow +12%`. Five values. Everything else maps to one of them.

### 6.6 Marketing vs product density
- **Marketing.** Large serif display, 120px section padding, one idea per viewport.
- **Product (future app or dashboard)** [R]. Geist for everything functional at 12/14/16; Crimson Pro 400 only for page titles (24–32) and empty-state headlines. **No swash in product UI** except the logged-in welcome moment.

---

## 7. Layout & spacing

### 7.1 Container [O] `globals.css`
| | Desktop | ≤991 | ≤767 | ≤479 |
|---|---|---|---|---|
| Side padding `--page-pad` | 80 | 48 | 24 | 20 |
| Page rail inset `--frame-inset` | 24 | 24 | 12 | 8 |
| Section padding `--section-pad` | 120 | 96 | 72 | 64 |
| Header → content gap `--space-xxlarge` | 80 | 64 | 48 | 48 |

- The Figma artboard is **1440px**, so content is 1280 at 1440. [O]
- **There is no max-width**: content keeps growing past 1440. [O] Add `max-width: 1280px` to `content-width` [R] P1.

### 7.2 Spacing scale as used [P]
Gap values by frequency: gap-8 (32) ×19, gap-6 (24) ×18, gap-3 (12) ×16, gap-2 (8) ×11, gap-section (80) ×10, gap-4 (16) ×10, gap-12 (48) ×9.

**Crossword rhythm: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 120.** [I] (46 arbitrary gaps and 72 arbitrary paddings exist; map them to this scale.)

- Eyebrow → headline: **24** (16 when centred). [P]
- Headline → body: **24–32**. [P]
- Body → CTA: **32**. [I]

### 7.3 Breakpoints [O]
Webflow-derived: **480 (xs) · 768 (md) · 992 (lg)**, plus `1200` (introduced on `/sell`, 17 uses) and `1440` (Trust, 3 uses). [O] Make 1200 a named token `xl` or remove it [R].

### 7.4 Section rhythm [P]
1. Divider band (24px, rail to rail) carrying a centred stamp badge
2. Eyebrow (+ gold rail accent on the left rail)
3. Swash headline, left or centred
4. Supporting paragraph in the right column (desktop: text left, body right) or below (centred)
5. A composed artboard: a mock-up on a livery panel
6. 120px, then the next divider band

### 7.5 Page frame [O]
Two 0.5px `rail` lines run the full page height at `--frame-inset` from each edge. Section headers place a 1px gold accent on the left rail. **This frame is a core ownable asset.** Every long-form page uses it. [I]

---

## 8. Shape language

| Element | Rule | Source |
|---|---|---|
| Radius | **0** for all brand chrome. Rounded corners appear only inside third-party mock-ups (chat widget 12.7, cards 18, pills full). | [P] 51/51 radii are in mock-ups |
| Frame corners | **Concave quarter-circle notch** (r ≈ 8% of the frame's short side; 50px on the footer frame) | [P] badge, upsell, footer, logo, Trust |
| Stamp edge | Perforated or scalloped (small repeating arcs) | [O] logo stamp, badge, Figma stamps |
| Hairlines | 0.5px, as an outline with negative offset (`hairline-[0.5px]`) so they take no layout space | [P] 17 uses. Standardise on this one technique [R] |
| Dashed borders | 1px dashed `gold` (primary buttons, arrows); 2/2 dash | [O] |
| Studs | Four 3px gold dots, about 2px inside each corner, alternating large and small diagonally | [O] StampButton |
| Engraved corner curl | 9×9: the edge overshoots 3px, then curls into a 1.7r arc (eyebrow) | [O] `eyebrow.tsx` |
| Dividers | 0.5px `rail`; dashed 2/2 `forest-light` on green | [O] |
| Inputs [R] | Square, 1px `line`, `linen` ground, 48px tall; focus is a 2px maroon outline | none exist yet |

**Why it reads this way.** The geometry is *cut paper and engraving*: square sheets, punched or notched corners, perforations, ruled lines. Rounding would turn it into app UI; sharp-with-a-notch keeps it stationery. [I]

---

## 9. Iconography

- **Base set.** **Phosphor, Regular weight** (outline paths). [P] Layer and file names match Phosphor: ArrowRight, CaretDown, Plus, Heart, X, clock-counter-clockwise, users-three, shopping-cart, funnel and others.
- **Sizes.** 12 · 16 · 20 · 24px. [R] Today there are odd Figma scalings (13.57, 12.17, 9.74). Snap them.
- **Colour.** `currentColor` [R]. Today colour is baked into each SVG, so the same glyph ships in several colours.
- **Ornamental ("gilded") icons.** Gold `#e0be60` fill with a **0.4–0.5px wine `#6c2332` hairline stroke**, used in divider badges (chat, chart, book, gear, quill), upsell features and quote marks. [P] This is the brand's signature icon treatment. Use it only at 24px and above, and only in decorative or feature contexts, never as a control.
- **Insight-tab icons.** 22px glyph inside an **octagonal (corner-cut) frame**. Active: maroon ground, amber glyph. [O]

**Rules for a new icon:**
1. Start from Phosphor Regular. If it doesn't exist there, draw it on a 16 or 24 grid with a 1.5px stroke, round caps and round joins.
2. UI icons use one colour only (`currentColor`).
3. Gilded treatment is for feature illustrations only, at ≥24px.
4. No sparkle, robot or brain glyphs outside mock-up UI (P1).

---

## 10. Imagery & graphic language

### 10.1 Core ownable assets (sacred) [I]
| Asset | Description | Where |
|---|---|---|
| Concierge bell mark | See §4 | everywhere |
| Swash-capital headline | See §6.2 | every section |
| Page rails + gold accents | 0.5px rails, gold section ticks | site shell |
| Divider band + stamp badge | 24px trellis band, notched badge with a gilded glyph | 5 sections |
| StampButton | Square, dashed gilt border, four studs | all CTAs |
| Postage stamps & wax seals | Guilloché stamps (3× WebGPU-shader exports), wax seals in green, purple and gold | footer, testimonials, blog, CTA, launch |
| The envelope | Cream envelope that opens to reveal a letter and a product photo, sealed with gold wax | final CTA |
| Damask-lined panels | Maroon, aubergine and forest damask texture behind product mock-ups | Lifecycle, Shopper, Launch, Blog |

### 10.2 Texture library [O]
This is the canonical set, built from `dedupe_assets.py` (200 images → 127 distinct; 45 groups contain duplicates). Kit names refer to `textures/`. [O]

| Kit file | Repo source | Type | Use | Duplicates to delete |
|---|---|---|---|---|
| `damask-maroon-panel.webp` | `lifecycle/panel-texture.webp` (2142×1951, 614KB) | Maroon damask | Maroon panels | `blog/feature-frame.webp` is visually identical at 64px (not byte-identical); check whether the blog can reuse it |
| `damask-aubergine-panel-framed.webp` | `shopper/panel-texture.webp` (3715×1695) | Aubergine damask, gilt frame baked in | Aubergine panels | n/a |
| `damask-launch-panel.webp` | `launch/panel-texture.webp` | Aubergine damask with notched corners | Launch stamp area | n/a |
| `damask-tile-greyscale.webp` | `blog/damask-tile.webp` (346²) | **Greyscale** tile; takes colour from the ground via `mix-blend-darken` | Blog cover | n/a |
| `grain-tile-greyscale.webp` | `footer/grain-tile.webp` (346²) | **Greyscale** paper grain, soft-light 40% | Forest grounds | `trust/grain-tile.webp` (byte-identical) |
| `stamps/*` | `footer`, `testimonials`, `blog`, `launch` stamps, `cta/seal.webp` | Guilloché stamps and the gold wax seal (3× shader exports) | Footer, testimonials, blog, launch, CTA | 5 envelope assets in `crossword-cta-envelope-demo/` (byte-identical) |
| `patterns/divider-trellis-tile.svg` | `shared/divider-tile.svg` | Trellis with medallions, 20% opacity | Divider band | n/a |

**Greyscale tiles** (Figma uses the same approach: the panel textures are grey images composited over a colour layer) must sit over a livery colour with a blend mode. They are never used as visible grey. [O]

**The testimonials and launch stamps carry placeholder glyphs** (a Shopify bag and a presentation board) in place of the bell. [O] Replace them with the bell, or with a deliberate per-section glyph. [R]

`public/images/**` (11MB, including a 4.8MB PNG) is **entirely unreferenced** and holds 26 duplicates of shipped assets. Delete it. [O] The three `/sell` storefront cards (`card-widget`, `card-placement`, `card-channels`) are **visually identical**: the same placeholder art exported three times. [O]

### 10.3 Photography [O] Figma final designs: Previous and Hero B
- **Subject.** Hospitality interiors (an arched hallway lined with garments, a reception desk, a concierge in a burgundy jacket). Warm tungsten light, deep shadows, rich browns.
- **Treatment.** Low key, warm. Faded to `night #0e0501` at the bottom for type. Product cut-outs on cream.
- **People.** One person, front of house, serene. No stock "laptop smiles". [I]
- **Never.** Cool-blue tech offices, screens-as-hero, AI-generated faces.

### 10.4 Treatment rules
1. Textures sit *under* content at full strength only inside a livery panel. Elsewhere they appear at ≤20% opacity. [P]
2. A mock-up on a damask panel always sits on a parchment card with a gold hairline. [P]
3. Stamps and seals are objects: they may tilt (±7°) and cast soft warm shadows. UI never tilts. [P] (portrait card 6.85°, product cards 7.13°)
4. Blend modes are allowed for ornament (luminosity, soft-light, darken), but never on text. [O]

### 10.5 Decorative experiments (not yet system) [O]
Hero scrollwork flourishes (`flourish-left/right.png`), the testimonials ornament, the platform node and wire diagram, the memory graph. Keep them page-specific until they repeat.

### 10.6 Future assets [R]
A seasonal stamp series (the "EST 2026" stamp invites editions), merchant-co-branded stamps, and a seal set for status (approved, handed off, launched).

---

## 11. Product design language

Components that exist today are documented as built. The rest is marked [R] for future product surfaces.

### 11.1 StampButton (primary CTA) [O] `components/ui/stamp-button`
- **Anatomy.** A `<Link>`: 1px border (dashed gold), padding 8×12, Crimson Pro 500 16/22 at −3%, UPPERCASE label, and four gold studs (larger top-left/bottom-left, smaller top-right/bottom-right).
- **Variants.**

  | Variant | Ground | Border | Label | Use |
  |---|---|---|---|---|
  | `primary` | maroon | gold dashed | gold-bright | Main CTA on cream |
  | `primary-soft` | maroon | gold dashed | gold | Header, mobile menu |
  | `wine` | wine | gold @30% dashed, faint studs | gold | On forest or photo |
  | `wine-gold` | wine | gold dashed | gold | Overlay header |
  | `outline` | transparent | `#b8b8b8` solid, grey studs | `#646464` | Secondary on cream |

- **States.** Hover `brightness(1.1)` 200ms. Focus is a 2px maroon outline at offset 2 (make it **gold on dark grounds** [R]). **Pressed** [R]: translateY(1px) + brightness(.95), 100ms. **Disabled** [R]: 40% opacity, studs grey. **`<button>` form** [R]: needed for forms.
- **Use it** for the one primary action per view. **Don't** use it for in-product actions (use a plain square Geist button [R]) or set the label in sentence case.

### 11.2 Text link [P] (copy-pasted ×6; componentise [R])
Crimson Pro 16/22, `ink-soft`, a 1px bottom border at `rgba(40,40,40,.3)`, a 12–16px arrow, UPPERCASE. Hover → `ink`. Needs a focus-visible style [R]. On dark: white/30 border, `#d9dddb` label.

### 11.3 Eyebrow [O] `components/ui/eyebrow`
A square label: 5.5×10.5 padding, 0.5px inset `rule-engraved` stroke, four engraved corner curls, Open Sans 600 12px +12% UPPERCASE, `label-olive`. Surfaces: cream (with a 1px soft drop shadow), sand, green (`#d6d1c6`, transparent). Static. **Use it for every section eyebrow, including the Sell hero** (currently hand-rolled [R]).

### 11.4 Section title [O] `shared/section-title.tsx`
The swash h2 (§6.2). It has 8 variants that differ only by Figma measurements. Collapse them to **3** [R]: `default` (left), `centered`, `on-dark`.

### 11.5 Navigation [O]
- **Header (default).** 72.5px tall with a 0.5px black/20 bottom line. 40px mark. Crimson nav 16 at −3%, black/80 → black. "SIGN UP" text link, then a `primary-soft` StampButton.
- **Header (overlay, photo heroes).** A floating `rgba(9,9,9,.71)` bar 25px from the top, 2px radius (the only brand radius; set it to 0 [R]), cream/80 links, `wine-gold` button.
- **Dropdowns.** Designed as carets only, **not built** (Sell ▾, Support ▾, Retain ▾, Insights ▾). [O] Spec [R]: a square sand panel with a 0.5px rail border, Crimson 20 item titles plus Geist 14 descriptions, a gold rule on the hovered item, 150ms fade + 4px drop.
- **Mobile menu.** Below 992px, a cream panel under the header. Escape closes it. **Needs** a focus trap, focus return, scroll lock and a 200ms fade [R].
- **Missing everywhere.** Focus-visible styles, `aria-current`, a skip link [R] P0.

### 11.6 Tabs (vertical, auto-advancing) [P] Insights, Lifecycle, Sell triggers, Sell discovery
- **Anatomy.** Square cells; 1px `#ddd` inset borders; a 20px Crimson title + 14px body; an optional octagonal icon.
- **States.** Active → `sand` ground; inactive content at 50% opacity; a 2px progress rule fills the top edge linearly over **6s**, then advances.
- **Behaviour.** Pauses off-screen, on hover and on keyboard focus. Arrow keys, Home and End. Roving tabindex. Under reduced motion the rule is full and nothing auto-advances. ✅
- **Inconsistency.** The progress rule is maroon on Insights and gold on Sell triggers; Discovery labels use Inter. Unify: **maroon on light, gold on dark, Geist labels** [R].

### 11.7 Carousels [O]
- **Testimonials.** Translate track 500ms ease-out; inactive slides at 40% opacity, clipped and `inert`; arrows are 32×38 forest squares with gold dashed borders. Missing: focus-visible, swipe, keyboard arrows [R].
- **Platform cards.** Native scroll-snap; arrows swap between active and disabled art. Missing: focus-visible on arrows; a hard-coded id [R].

### 11.8 Cards [P]
Square, `sand` or `parchment` ground, an optional 0.5px gold or rail hairline, studs at the corners for "official" cards. Mock-up cards (third-party UI) may be rounded.

### 11.9 Panels (livery) [P]
A full-content-width jewel panel with a damask texture, a gold inner frame (notched corners), and a parchment or cream mock-up card inset. One per viewport.

### 11.10 Chat window (mock-up) [O]
It depicts the Crossword widget on a merchant site:
- 12.7px radius, wine user bubbles with white text, ink assistant text
- Fanned product cards; an input pill with a wine send button and an amber ring
- Two tones: `parchment` or `ivory` (ivory adds a triple gold glow)

This is the **product's own UI language** and the seed of a future widget design system [I].

### 11.11 Metrics [O] Customer intelligence
A large Crimson 200 numeral (70px), a Geist 14 label, the source logo below, separated by 0.5px `rail` dividers.

### 11.12 Badges & trust marks [O]
Certification badges (ISO 27001, SOC 2 Type II, HIPAA, GDPR, CCPA) as 210² WebP plaques on forest. Divider-band stamp badge (74×75, notched, gilded glyph).

### 11.13 To design for product surfaces [R]
Inputs and selects (square, linen ground, 48px tall), modal (square sand sheet with a 0.5px rail, notched top corners, 24px padding, scrim `night/60`), toast (forest ground with cream text, slides up 8px), table (Geist 14 rows, 0.5px rail dividers, sand header), empty state (centred swash headline + Geist 16 + an outline StampButton), loading (skeletons in `bone`, no shimmer, 1.2s opacity pulse), error (the `error` token, never maroon), and data viz (maroon, forest, aubergine, gold and amber in that order, on cream).

---

## 12. Motion: the design-engineering lens

### 12.1 Motion personality
> **Unhurried and attentive.** Things arrive the way a concierge does: promptly and quietly, without fuss. There is one ceremony (the envelope) and everything else is service. [I]

### 12.2 Should this animate? (existing motion)
| Animation | Frequency | Job | Verdict |
|---|---|---|---|
| **CTA envelope** (GSAP ScrollTrigger scrub: seal press, flap opens, letter and photo rise) | Once per visit | Ceremony / explanation ("an invitation") | **Keep.** It is the signature. Gate the hover lift behind `(hover:hover)` [R] |
| Launch wheel (stamp drops onto a pile, 2.5s steps) | Ambient, in view | Explanation ("we do it for you") | Keep. Exemplary pause rules [O] |
| Memory graph (rAF engine, 5 beziers) | Ambient | Explanation | Keep. Simplify to the tokens below [R] |
| Insights / Lifecycle progress (6s linear) | Ambient | State (time remaining) | Keep |
| Lifecycle accordion (grid-rows 450ms) | Per click | State transition | Keep. Add reduced-motion [R]; shorten to 300ms |
| Testimonial track (500ms ease-out) | Per click | Spatial continuity | Keep |
| StampButton brightness (200ms) | Per hover | Feedback | Keep. Add a press state |
| Nav / link colour (150ms) | Per hover | Feedback | Keep |
| Blog card nudge (ease-out-quart) | Per hover | Delight | Keep (motion-safe ✅) |
| Hero flourish blend (static) | n/a | n/a | n/a |

Nothing is a candidate for removal. The system already shows restraint. The problem is **cohesion**: there is no shared token set, and 9 cubic-beziers appear for one personality. [O]

### 12.3 Default motion tokens [R] (derived from the existing values)
| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 100ms | Press |
| `--dur-fast` | 150ms | Colour and opacity hover |
| `--dur-base` | 200ms | Button feedback, focus |
| `--dur-moderate` | 300ms | Tab, accordion, menu |
| `--dur-slow` | 500ms | Carousel, panel enter |
| `--dur-ambient` | 6000ms | Auto-advance dwell |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | All enters and UI transitions (already in memory-graph `easeOut`) |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Things that move between two resting states (from `easeGraph`) |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exits (faster and plainer than enters) |
| `--ease-linear` | `linear` | Progress rules only |
| `--distance-sm` | 4px | Dropdown and toast offset |
| `--distance-md` | 8px | Card hover lift |
| `--distance-lg` | 24px | Section reveal (if ever added) |

**Ceremonies** (the envelope, the launch wheel) are exempt and documented individually. Springs and overshoot (`back.out`) are allowed **only** in those ceremonies (the seal press, the photo landing), never in UI. [I]

### 12.4 Physicality
- Dropdowns drop *from* their trigger (4px, fade). The mobile menu descends from the header. [R]
- Stamps fall onto a pile and squash on landing: physical, but contained in a ceremony. [O]
- Exits are faster (`--dur-fast`, `--ease-in`) than enters. [R]

### 12.5 Interruptibility
CSS transitions are used for interactive states ✅. The accordion animates `grid-template-rows` (not height) ✅. The carousel retargets mid-flight ✅. Auto-advancing tabs reset cleanly on user selection ✅. [O]

### 12.6 Performance
- No `transition: all` (0 uses) ✅.
- `left/top` are animated on testimonial art: switch them to `transform` [R].
- `filter: brightness()` on button hover is cheap at this size ✅.
- Blend modes on the hero flourish (`mix-blend-luminosity`) sit on the LCP element: watch the paint cost. [O]

### 12.7 Accessibility
- Reduced-motion handling exists in 11 files (6 via JS `matchMedia`, 6 via `motion-reduce:`/`motion-safe:` utilities, with one file in both) ✅. It is missing on the lifecycle accordion and the 300ms tab fades [R]. Reduced motion should **keep** opacity and colour changes and drop movement.
- All `hover:` utilities are gated by Tailwind v4's `(hover:hover)` ✅. The GSAP envelope hover isn't [R].
- **Focus-visible is missing on about 20 controls** [R] P0. The global rule lives in `tokens/motion.css`.

---

## 13. Invisible details

| Detail | Status | Note |
|---|---|---|
| Hairlines don't shift layout (outline technique) | **Right** | `hairline-*` utility [O] |
| Sub-pixel stroke technique is consistent | **Partial** | 4 techniques coexist [O] |
| Focus rings | **Partial** | 8 element types have them; ~20 controls do not; no skip link [O] |
| Focus ring on maroon buttons is visible | **Off** | Maroon outline on maroon fill, offset 2, on cream works, but the ring vanishes on maroon or wine panels [O]. Use gold on dark |
| Press feedback | **Missing** | 0 `active:` states [O] |
| Shadows soft and warm | **Right** | Low-opacity, warm-tinted (`rgba(24,8,36,…)`, wine inset glows) [P] |
| Border opacity consistent | **Partial** | black/10, /20, /25, `#ddd`, `rgba(40,40,40,.3)` all do the same job [O] |
| Optical alignment of swash capitals | **Right, but fragile** | Per-variant swash tracking (4.1, −4.1, 3.85px) [O] |
| Apostrophes and dashes | **Off** | Curly and straight apostrophes are mixed; a spaced hyphen " - " is used where an em dash is meant [O] |
| Touch false-positives | **Partial** | Envelope hover lift fires on tap [O] |
| Interrupted transitions | **Right** | CSS transitions retarget [O] |
| Text zoom | **Off** | Headings scale with `zoom`, which breaks user text-zoom expectations [O] |
| Ultra-wide screens | **Off** | No max width past 1440 [O] |
| Theme colour | **Right** | `themeColor #fff9ea` matches the page [O] |

---

## 14. Brand ↔ product bridge

| Brand DNA | Design principle | Product expression | Motion expression |
|---|---|---|---|
| The concierge desk | P1 The desk, not the bot | Chat widget framed in branded panels; human-handoff states | Calm reveals; nothing jumps at the guest |
| Hotel stationery | P4 Square, with a notch | StampButton, notched frames, eyebrows | The envelope ceremony; stamps that land |
| Gilt trim | P3 Gold is the trim | Active rules, studs, focus on dark | Gold appears on activation, not at rest |
| Handwritten welcome | P5 Written by hand, set in type | One swash per headline | n/a (type never animates letter by letter) |
| Warm paper | P2 Paper first, then livery | Cream ground; sand for active | Colour shifts paper → sand on select |
| "Keeps notes" (memory) | P1 + P7 | Memory graph, insight composer | Unhurried, auto-advancing, pauses for you |

**Test for any new idea: does it feel like the front desk of a good hotel, or like a chatbot?**

---

## 15. Marketing vs product

**Shared DNA (never varies).** The bell mark, cream ground, Crimson Pro + Geist, square-with-notch geometry, gold as trim, maroon as the brand colour, service-first voice.

**Marketing flexibility.** Swash headlines, damask livery panels, photography, stamps and seals, the envelope ceremony, composed and scaled artboards, decorative blend modes, ambient motion.

**Product discipline [R].** Geist-led UI; Crimson Pro only for page titles; no damask behind working UI; one accent (maroon) for primary actions; real reflowing layouts (no `zoom`); inputs, tables and modals per §11.13; motion only from tokens; AA contrast on every text pair.

---

## 16. Content & voice

### 16.1 Voice [P] (from the shipped copy)
- **Who's speaking.** A seasoned concierge: warm, composed, quietly confident. Crossword is *a hire*, *a desk*, *your concierge*. "Your best hire, yet." "Your best hire keeps notes." "We build your concierge for you."
- **Sentence structure.** Short declaratives, often in parallel triplets or quads: "remembers, recommends, resolves, and reports"; "signals, decisions, and outcomes"; "We connect the systems. We configure the experience. We test it. We launch it. We improve it."
- **Reframing turns.** "Because the goal isn't to put Crossword in front of your customer. / It's to put intelligence behind every interaction." Use one per page, no more.

### 16.2 Mechanics
| Rule | Status |
|---|---|
| Headlines in sentence case, two lines, each line a phrase | [P] ("A dozen decisions" has a stray capital: fix [R]) |
| Landing section headlines have **no** terminal period; hero and blog titles **do** | [O] /sell headlines have periods, which is inconsistent. **Decide:** no period on two-line section heads, a period on one-line statements [R] |
| Eyebrows in sentence case ("Customer lifecycle") | [P] ("Customer Testimonials" is title case: fix [R]) |
| Buttons and text links UPPERCASE: BOOK A DEMO, LEARN MORE, SIGN UP, VIEW ALL, EXPLORE PLATFORM | [P] |
| Footer group headings in braces: `{ COMPANY }`, `{ PLATFORM }` | [O] |
| Oxford comma | [P] |
| Em dash "—" (not " - ") | [R] (the hero and meta use " - ") |
| Curly apostrophes ’ everywhere | [R] (mixed today) |
| "d2c" lowercase; "AI" caps; "no-strings-attached" hyphenated as a compound adjective | [R] |

### 16.3 Terminology
| Use | Not |
|---|---|
| concierge, desk, hire, guest, shopper | bot, chatbot, agent (in marketing), user (for the shopper) |
| conversation | chat session, ticket |
| guardrails | restrictions, filters |
| hand off / handoff | escalate (in customer-facing copy) |
| managed launch | onboarding, implementation |
| remembers, notes, memory | stores data, tracks |

### 16.4 CTA language
Primary: **BOOK A DEMO**. Secondary: **LEARN MORE**, **EXPLORE PLATFORM**, **VIEW ALL**. Account: **SIGN UP**. Closing invitation: "Explore a no-strings-attached pilot with us today." Verbs first, no exclamation marks, no "Get started for free!". [P]

### 16.5 Errors & microcopy [R]
Speak like the concierge: "We couldn't find that page. Let us take you back to the desk." State what happened, then what to do, and never blame the guest. No "Oops!".

### 16.6 Words never used [I]
magic, revolutionary, game-changing, supercharge, unleash, cutting-edge, seamless, robot or bot (in marketing), emoji in headlines.

### 16.7 Copy debt [O]
"What insight do you want run?" is missing a "to". There is a double space in `platform.ts:25`, leading-space layout hacks ("  bigger cart", `"T "`), Lifecycle Support/Retain placeholder copy, and a single placeholder testimonial repeated three times.

---

## 17. Responsive behaviour

**Principles first:**
1. **The frame survives.** Rails move inward (24 → 12 → 8px) but never disappear. [O]
2. **The swash survives.** Headlines scale (60 → 36) but keep the swash and the two-line break. [O]
3. **Artboards scale, text reflows.** Mock-ups and illustrations scale with `fit-to-container`. Running text should reflow, not zoom [R].
4. **Ornament thins out.** Hero flourishes are desktop only; the divider band keeps its badge. [O]
5. **Density by capability.** Hover effects only on `(hover:hover)`. Auto-advance pauses for touch-and-hold as well as hover [R].

**Breakpoints second:** 480 · 768 · 992 (· 1200 for /sell) · max content 1280 [R].

| Element | ≥992 | 768–991 | <768 |
|---|---|---|---|
| Nav | Inline links + SIGN UP + StampButton | Mobile menu | Mobile menu |
| Section layout | Headline left, body right | Stacked | Stacked, centred eyebrows allowed |
| Livery panels | Full composition | Scaled | Scaled, 24px inset |
| Tabs | Vertical list + panel | Stacked list then panel | Horizontal-scroll list [R] |

---

## 18. Design tokens

The **canonical machine-readable version is the YAML front matter of [`DESIGN.md`](DESIGN.md).** This section explains the architecture.

```
primitive  →  semantic            →  component
#7d0034       colors.primary         button-primary.backgroundColor
#fff9ea       colors.neutral         page background
#e0be60       colors.trim            stud / rail / dashed border
#00331a       colors.surface-forest  footer, trust
```

| Group | Tokens | Tag |
|---|---|---|
| Brand | primary (maroon), secondary (wine), trim (gold), trim-bright | [P] |
| Livery | surface-forest, surface-forest-deep, surface-forest-light, surface-aubergine, surface-night | [P] / [O] |
| Paper | neutral (cream), surface-sand, surface-parchment, surface-linen, surface-bone | [P] |
| Content | on-surface (ink), on-surface-soft, on-surface-muted, on-surface-label, on-dark, on-dark-muted | [P] / [R] |
| Line | line-rail, line-engraved, line, line-gilt | [P] |
| Accent | accent-amber | [P] |
| Semantic | success, warning, error, info | [R] |
| Type | display, headline, h4–h6, body-lg, body, body-sm, caption, ui-serif, label | [P] |
| Space | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 120; page-pad; section-pad | [P] / [O] |
| Radius | none 0; mockup 12px (third-party UI only); full 9999 | [P] |
| Motion | `tokens/motion.css` (the format has no motion schema) | [R] |

Code today: 11 colour tokens, plus responsive `:root` variables for padding and type, and **no** radius, shadow, motion or z-index tokens. [O] Figma today: **no brand variables or styles at all.** [O]

---

## 19. Design decision framework

**Introducing a new colour?**
1. Is it already in §5 within ΔE ≈ 2? Use that one.
2. Is it a *surface*, *content*, *line* or *accent*? Name it by role, not hue.
3. Does it pass AA against every ground it will sit on? (Measure it.)
4. Will it appear in more than one place? If not, it's artwork, not a token.

**Introducing a new component?**
1. Can an existing one (StampButton, Eyebrow, tabs, card, panel) take a variant instead?
2. Is it square, or notched if it's a frame? Does it use 0.5px hairlines?
3. Are all states defined: hover, focus-visible, pressed, disabled, loading?
4. Is it marketing (ornament allowed) or product (discipline, §15)?

**Introducing a new animation?**
1. What is its job (feedback, continuity, state, explanation)? If it's "delight", is this a once-per-visit moment?
2. Does it use the motion tokens? Does it run on transform and opacity only?
3. Is it interruptible, and does it pause for hover, focus and off-screen?
4. What happens under reduced motion?

**Introducing a new asset (texture, stamp, illustration)?**
1. Is it hospitality craft (paper, engraving, wax, textile), not tech?
2. Does it respect "gold is the trim"?
3. Is it a reusable system asset (goes in the kit) or page artwork (stays in the page)?

**Breaking a rule?** Write down which principle wins and why, put it on the design-debt list, and review it in a month. A broken rule repeated three times becomes a new rule, or gets reverted.

---

## 20. Established / Emerging / Missing

| Established [O]/[P] | Emerging [I] | Missing [R] |
|---|---|---|
| Bell mark and the lockup set in Figma | Postage stamps and wax seals as a sub-brand system | Wordmark / lockup SVGs in the repo |
| Swash-capital headline grammar | Gilded icon treatment (gold + wine hairline) | Focus-visible on all controls; skip link |
| Cream, maroon, gold, wine palette | Forest and aubergine as livery colours | Tokens for forest, aubergine, amber, muted text, lines |
| Square + notched geometry | Octagonal icon frame | Pressed and disabled states |
| Page rails + divider bands | Chat-widget UI language | Motion token set |
| StampButton, Eyebrow, SectionTitle | Photographic dark hero (Sell, and the final designs' "Previous" and "Hero B") | Nav dropdowns; inputs, modals, tables, toasts |
| Responsive padding and type variables | `/sell` as a product-page template | Max content width |
| Reduced-motion on heavy animation | Envelope as the closing ritual on every page | Figma variables and text styles |

---

## 21. Current inconsistencies & design debt

| Current | Recommended | Why |
|---|---|---|
| 78 hex values; 126 arbitrary colour utilities | Tokens per §5; lint arbitrary colours | One palette, enforceable |
| `parchment` `#faedd4` and `parchment-deep` `#faecd4` | One `parchment` | They are the same colour (ΔG = 1) |
| `#040404` headings vs `ink #141414` | `ink` for all text | Invisible difference, two sources of truth |
| Forest, aubergine and amber untokenised | Add `forest*`, `aubergine`, `amber` | They are major surfaces |
| 7 font families (Inter, DM Sans, Tangerine, Open Sans one-offs) | 4: Crimson Pro, Parisienne, Geist, Open Sans (eyebrow only) | Less weight, one voice |
| 4 Figma-only fonts in the final frames (Libre Franklin, Caveat, Great Vibes, Gambetta) | Remove from production frames | Leftovers |
| 61 letter-spacing values | 5 (−2, −3, −4, −5, +12%) | Rule over measurement |
| 8 SectionTitle variants | 3 | Variants encode Figma measurements, not intent |
| Headings scaled with `zoom` | `clamp()` font sizes for text; keep zoom for artboards | Text zoom and accessibility |
| ~20 controls without focus-visible; no skip link | A global `:focus-visible` rule + skip link | WCAG 2.4.7 |
| Focus ring maroon on maroon | Gold ring on dark or maroon grounds | Visibility |
| No pressed state | `active:` translateY 1px + brightness .95 | Tactile feedback |
| 9 cubic-beziers, per-component timings | Motion tokens (§12.3) | One personality |
| Progress rule maroon (Insights) vs gold (Sell) | Maroon on light, gold on dark | Consistent meaning |
| Overlay header radius 2px | 0 | Square chrome |
| CTA section has no button or link | Add a real "BOOK A DEMO" StampButton under the envelope | The page's last action is missing |
| CTA heading `#b4ab9b` on sand (1.89:1) | Keep as decorative art; add an accessible heading or label | Contrast |
| Footer muted text at 36% and 47% (2.62 / 3.52) | ≥60% (`#dfe3d2`@60 = 4.83) | AA |
| Inactive tab labels `ink/40` (2.57) | `ink/60` | AA |
| No max width past 1440 | `max-width: 1280px` on `content-width` | Ultra-wide readability |
| Two different bell drawings (header vs blog) | One master glyph, exported from the Figma lockups | Logo integrity |
| Dark and light mark exports drift (0.001–0.01) | Generate both from one master | Consistency |
| No wordmark asset | Export lockups as outlined SVG | Brand integrity |
| Nav dropdowns not built; all hrefs `#` | Design and build per §11.5 | Navigation |
| `public/` 11MB unused; `crossword-cta-envelope-demo/` 1.7MB at the repo root | Delete; move the demo to `/docs` or out of the repo | Repo hygiene |
| `/sell` storefront cards are one placeholder image exported three times | Commission three distinct card renders | Each card currently illustrates a different feature with the same picture |
| Testimonials and launch stamps carry a Shopify bag and a presentation-board glyph | Use the bell, or a deliberate glyph per section | A third-party logo on a brand stamp |
| `on-surface-muted` and `on-surface-label` on `surface-bone` measure 4.41 and 4.18 | Never set text on bone (it's a skeleton surface) | `contrast.py` flagged it |
| Copy: mixed apostrophes, " - " as a dash, a stray title case | §16.2 rules | Polish |
| Figma: 0 colour styles, 0 text styles, no brand variables | Create a `Crossword / Brand` variable collection + text styles from DESIGN.md | Design-to-code parity |

---

## 22. Brand evolution (1–3 years)

- **Sacred.** The bell mark; the swash-capital headline; cream paper; maroon + gold; square-with-notch geometry; the envelope ritual.
- **Formalise now.** Forest and aubergine as livery colours; the stamp and seal system; the gilded icon style; the page frame; the motion tokens.
- **Can evolve.** Damask patterns (seasonal), photography subjects, the stamp editions ("EST 2026" → yearly), mock-up styling as the real widget evolves.
- **Territory to own.** *Hospitality-grade AI*: craft and service as the antidote to cold AI. Stamps and seals as the visual language of **guardrails and approval** (a "sealed" response = approved by your team).
- **Signature interactions.** The envelope opening; a stamp landing on the pile; the swash capital *writing itself in* on first view (a candidate, if reduced-motion-safe); a seal pressing to confirm an action in product.
- **Intentionally quiet.** Product UI, forms and tables. Their quietness makes the marketing ceremony land.
- **Over-designed today.** The number of one-off ornaments per section (flourishes, multiple frame styles). Trim to the canonical set.
- **Under-designed today.** States (focus, pressed, disabled, error), navigation dropdowns, and the product's own UI kit.

---

## 23. Prioritised action plan

### P0: Critical
| Area | Problem | Recommendation | Impact |
|---|---|---|---|
| Accessibility | ~20 controls without focus-visible; no skip link; mobile menu without focus management | Global `:focus-visible` (2px maroon, gold on dark) + skip link + menu focus trap and return | WCAG compliance; keyboard users |
| CTA | Closing CTA has no actual link or button | Add a StampButton "BOOK A DEMO" under the envelope | Conversion |
| Tokens | Forest, aubergine, amber, muted text and lines untokenised; parchment duplicate | Adopt DESIGN.md tokens; paste `tokens/theme.css` into `globals.css` | Every later change compounds |
| Logo | No wordmark asset; two bell drawings | Export outlined lockup and icon SVGs from Figma `2270:31448` as masters | Brand integrity |
| Contrast | Footer muted labels and inactive tab labels fail AA | Raise them to the `on-dark-muted` and `ink-muted` tokens | Legibility |

### P1: Consistency & scale
| Area | Problem | Recommendation | Impact |
|---|---|---|---|
| Type | 7 families; 61 tracking values; 8 title variants | Retire Inter, DM Sans and Tangerine; five tracking values; three SectionTitle variants | Load weight, consistency |
| Motion | No shared tokens | Add `tokens/motion.css`; migrate easings | One personality |
| Components | Text link copy-pasted ×6; eyebrow hand-rolled on /sell | `<TextLink>`; use `<Eyebrow>` everywhere | Reuse |
| Navigation | Dropdowns unbuilt | Design per §11.5 | IA |
| Layout | No max width | `max-width: 1280px` | Ultra-wide |
| Figma | No variables or styles | Create variables and text styles from DESIGN.md; bind the brand-guideline slides to them | Design ↔ code parity |
| Favicon / OG | `.ico` only | SVG favicon, apple-icon and an OG image from the Icon master | Share surfaces |

### P2: Refinement
| Area | Problem | Recommendation | Impact |
|---|---|---|---|
| States | No pressed or disabled | Add per §5.9 | Tactility |
| Text sizing | `zoom` on headings | `clamp()` for text | Accessibility |
| Repo | 11MB unused `public/`; demo folder | Delete or move | Hygiene |
| Copy | Mixed punctuation and casing | Apply §16.2 | Polish |
| Product kit | No inputs, modals, tables | Design per §11.13 before the first app screen | Readiness |

---

## 24. Source map

| System | Primary source | Secondary |
|---|---|---|
| Logo set | Figma `Logo All Variants` `2270:31448` (lockups `2270:31449–31529`, icons `2270:31549–31745`, framed `A–D`, `L–N`, seals `2270:31751–31772`, stamps `2270:31779–32106`) | `modules/marketing/assets/crossword-mark(-light).svg`; `blog/crossword-mark.svg`; `footer/monogram-frame.svg` |
| Colour | `app/globals.css:14-24` (+ grep counts) | Figma fill, font and radius tally over the final frames in Hero Tests (`2270:21063`: A, B, Previous, C, Hero B, `2270:32217`) |
| Typography | `lib/fonts.ts`; `app/globals.css:5-11, 47-94`; `shared/section-title.tsx`; `hero/hero.tsx` | Figma font tally (same frames) |
| Layout | `app/globals.css:38-160`; `site-shell.tsx` | Figma 1440 artboards |
| Shape / ornament | `stamp-button.tsx`, `eyebrow.tsx`, `divider-band.tsx`, `site-footer.tsx`, `assets/shared/*.svg` | Figma Logo frames |
| Components | `components/ui/*`, `modules/landing/components/*`, `modules/marketing/components/*` | n/a |
| Motion | `cta/cta-envelope.tsx`, `launch/launch-wheel.tsx`, `intel/memory-graph-engine.ts`, `insights/insight-tabs.tsx` | n/a |
| Imagery | `modules/landing/assets/**` (WebP/PNG) | Figma final designs, Hero Tests `2270:21063` |
| Voice | `modules/landing/config/*`, `modules/marketing/config/navigation.ts`, `app/layout.tsx` | Figma copy |
| Guideline structure | Figma `Replay Brand Guidelines` `2269:680` (31 slides, 6 chapters) | n/a |
| Positioning guardrail | Inferred [I] | **Needs client confirmation (D1)** |

### Open decisions for the client
- **D1.** Confirm the positioning guardrail (§1).
- **D2.** Is the forest-green footer and Trust band permanent livery, or a section-specific choice? (It is treated as livery here.)
- **D3.** Should the header show the full lockup (mark + "Crossword") instead of the framed mark alone?
- **D4.** Which hero direction ships: light ("Your best hire, yet." with a showcase: A, B and C) or dark photographic (Hero B)? "Previous" is the earlier dark version. It changes the default first impression.
- **D5.** Retire Tangerine (the second script) entirely, or keep it for numerals and signatures?
- **D6.** Sign off all placeholder figures, testimonials and blog content.
