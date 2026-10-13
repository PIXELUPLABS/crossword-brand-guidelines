# Crossword brand guidelines: the storybook

The Crossword brand guidelines as a static site, built by PIXELUP. It mirrors the structure of the Replay brand storybook and is dressed in Crossword's own design language:

- cream paper and page rails
- swash headlines
- divider bands with stamp badges
- stamp buttons
- a forest footer

## What's inside

| Chapter | Pages |
|---|---|
| 1 Home | Cover, Overview, Contents |
| 2 Logo | Logotype, Mark, Construction, Clearspace, Scalability, Incorrect usage. Every logo download is generated in the browser from the outlined Figma master. |
| 3 Colour | Brand palette, Neutrals & surfaces, Colour in use, Usage principles. Click a swatch to copy it as HEX, RGB or HSL; contrast ratios are computed live. |
| 4 Typography | Crimson Pro, Geist, the type ladder (copy the CSS for any role), a live swash-capital tester that warns when a letter is missing from the shipped subset, and fallbacks |
| 5 Graphic system | Ornaments & frames, Stamps & seals, Backgrounds & textures, Iconography |
| 6 Components | The website's stamp button, eyebrow and section title, navigation and links, auto-advancing tabs, livery panels and the page frame, live with their states |
| 7 Motion | The motion tokens (click a row to see each curve), interaction defaults, and the envelope ceremony ported from the site, with play and scrub controls |
| 8 Voice | How Crossword speaks, terminology, and the copy mechanics read from the shipped site |
| 9 Crossword in action | The final website designs from Figma (Hero Tests): every section of page A, the handoff panel and the three hero directions, with a lightbox |
| 10 Resources | Design files, Downloads (ZIPs built in the browser), Email templates, the Email signature builder, Textures & patterns, Design tokens, For AI tools, Prompt starters |

## Files

| Path | What it is |
|---|---|
| `index.html` | The site shell. |
| `artifact.html` | The same page without its document wrapper, for publishing as a claude.ai Artifact. Rebuild it with `python tools/build_artifact.py`. |
| `assets/css/site.css` | All styles. Tokens come from `DESIGN.md`; brand colours never change with the theme (auto, light or dark). |
| `assets/js/data.js` | Content: chapters, palette, type ladder, contrast pairs, voice, email templates, prompts. |
| `assets/js/app.js` | The router, the chapter renderers and all the interactions. |
| `assets/js/generated.js` | Embedded logo paths, `DESIGN.md`, `brand.md`, tokens and badge glyphs, so the site also works offline. Rebuild it with `python tools/build_generated.py` after editing the kit. |
| `assets/brand/` | `DESIGN.md`, `brand.md` and the token files from the brand kit. |
| `assets/figma/` | Website screens (WebP previews, thumbnails, and full-resolution PNGs in `full/`), postage stamps and wax seals, all rendered from Figma. |
| `assets/tex`, `stamps`, `patterns`, `envelope`, `photo`, `icons`, `logo` | Production assets copied from the brand kit and the website repo. |
| `email/` | Images the email templates and signature load. |
| `og.jpg` | The link preview (the Figma cover slide). |
| `vercel.json` | Caching and `noindex` headers. |

There is no build step for deploying: the folder is served as it is. Fonts load from Google Fonts. JSZip and GSAP load from cdnjs.

## Running locally

```bash
python -m http.server 8765
```

Then open http://127.0.0.1:8765. The pages render from `file://` too, but downloads and **Save** buttons need a web address.

## Deploying

Live: https://crossword-brand-guidelines.vercel.app. This is the Vercel project `crossword-brand-guidelines` in the **pixelup's projects** team, and this folder is linked to it.

```bash
vercel deploy --prod
```

Run it from this folder. `.vercelignore` keeps `tools/`, `.env*` and `.vercel` out of the upload.

## Email images

Templates and the signature load their images from `email/` on whatever address hosts this site. Before sending real email, copy `email/` to the Crossword website and point `IMG_BASE` in `assets/js/app.js` at it.

## Licensing

Crimson Pro, Parisienne, Geist, Geist Mono and Open Sans are all under the SIL Open Font License. No licensed or trial fonts are embedded.

The email templates are starter proposals, not shipped product emails. Every figure marked as a placeholder in `brand.md` is still unconfirmed.
