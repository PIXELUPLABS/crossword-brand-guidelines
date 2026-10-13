/* Crossword brand guidelines: content and data.
   Source of truth: crossword-brand-kit/DESIGN.md (tokens) and brand.md (rules and reasoning).
   Logo paths, DESIGN.md, brand.md and the token files are embedded by tools/build_generated.py. */
(function () {
"use strict";

window.META = {
  doc: "CW-2026-001",
  version: "Version 1.0",
  brand: "Crossword",
  legal: "Crossword, Inc. © 2026 · A CometChat Product",
  figmaFile: "https://www.figma.com/design/TiAeD9ICNjjC8N3zoUJExk/-For-Work--Crossword",
};

/* chapters and pages; page numbers are counted in order (dividers count as a page) */
window.CH = [
  { id: "home", n: "1", t: "Home", pages: [["1.1", "Overview"], ["1.2", "Contents"]] },
  { id: "logo", n: "2", t: "Logo", glyph: "chat", pages: [["2.1", "Logotype"], ["2.2", "Mark"], ["2.3", "Logo construction"], ["2.4", "Clearspace"], ["2.5", "Scalability"], ["2.6", "Incorrect usage"]] },
  { id: "colour", n: "3", t: "Colour", glyph: "chart", pages: [["3.1", "Brand palette"], ["3.2", "Neutrals & surfaces"], ["3.3", "Colour in use"], ["3.4", "Usage principles"]] },
  { id: "typography", n: "4", t: "Typography", glyph: "book", pages: [["4.1", "Primary typeface"], ["4.2", "Secondary typeface"], ["4.3", "Type-setting"], ["4.4", "Swash capital"], ["4.5", "Supporting & fallback fonts"]] },
  { id: "graphic-system", n: "5", t: "Graphic system", glyph: "quill", pages: [["5.1", "Ornaments & frames"], ["5.2", "Stamps & seals"], ["5.3", "Backgrounds & textures"], ["5.4", "Iconography"]] },
  { id: "components", n: "6", t: "Components", glyph: "gear", pages: [["6.1", "Stamp button"], ["6.2", "Eyebrow & section title"], ["6.3", "Navigation & links"], ["6.4", "Tabs"], ["6.5", "Cards & livery panels"], ["6.6", "Page frame & divider band"]] },
  { id: "motion", n: "7", t: "Motion", glyph: "chart", pages: [["7.1", "Principles & tokens"], ["7.2", "Interaction defaults"], ["7.3", "The envelope"]] },
  { id: "voice", n: "8", t: "Voice", glyph: "quill", pages: [["8.1", "How Crossword speaks"], ["8.2", "Words & mechanics"]] },
  { id: "in-action", n: "9", t: "Crossword in action", glyph: "chat", pages: [["9.1", "The website"]] },
  { id: "resources", n: "10", t: "Resources", glyph: "book", pages: [["10.1", "Design files"], ["10.2", "Downloads"], ["10.3", "Email templates"], ["10.4", "Email signature"], ["10.5", "Textures & patterns"], ["10.6", "Design tokens"], ["10.7", "For AI tools"], ["10.8", "Prompt starters"]] },
];

window.COLOURS = {
  brand: [
    ["Maroon", "#7D0034", "The brand colour · primary action", "primary"],
    ["Wine", "#6C2332", "Secondary · ornament outlines", "secondary"],
    ["Gold", "#E0BE60", "Trim · studs, rails, seals", "trim"],
    ["Gold Bright", "#F7C849", "Label on the maroon button", "trim-bright"],
    ["Forest", "#00331A", "Livery · footer, trust", "surface-forest"],
    ["Aubergine", "#462160", "Livery · feature panels", "surface-aubergine"],
  ],
  supporting: [
    ["Forest Deep", "#002916", "Card on forest"],
    ["Forest Light", "#004C27", "Stamps, portrait cards"],
    ["Night", "#0E0501", "Behind photo heroes"],
    ["Amber", "#FFB657", "Live indicator on dark"],
    ["Olive", "#9DA471", "Postage stamp only"],
    ["Error", "#9B1C1C", "Errors only, never brand"],
  ],
  surfaces: [
    ["Cream", "#FFF9EA", "The page", "neutral"],
    ["Sand", "#F3E9D4", "Active, cards, quotes", "surface-sand"],
    ["Parchment", "#FAEDD4", "Mock-up grounds", "surface-parchment"],
    ["Linen", "#EFE9DB", "Inputs, icon rings", "surface-linen"],
    ["Bone", "#E8DEC1", "Skeletons, no text", "surface-bone"],
    ["Ink", "#141414", "All text", "on-surface"],
  ],
  tones: [
    ["Ink Soft", "#33322F", "Nav, links"],
    ["Ink Muted", "#66645E", "Secondary text, floor"],
    ["Label Olive", "#766640", "Eyebrows"],
    ["On Dark", "#DFE3D2", "Text on forest"],
    ["On Dark Muted", "#869D88", "Legal on forest"],
    ["Rail", "#D2CBBA", "Page rails"],
    ["Engraved", "#B7AE9A", "Label frames"],
  ],
};

/* text/ground pairs for 3.4; ratios are computed live */
window.PAIRS = [
  ["#141414", "#FFF9EA", "Ink on cream"],
  ["#7D0034", "#FFF9EA", "Maroon on cream"],
  ["#66645E", "#FFF9EA", "Ink 60% on cream"],
  ["#F7C849", "#7D0034", "Gold Bright on maroon"],
  ["#E0BE60", "#7D0034", "Gold on maroon"],
  ["#E0BE60", "#00331A", "Gold on forest"],
  ["#FFF9EA", "#00331A", "Cream on forest"],
  ["#E0BE60", "#462160", "Gold on aubergine"],
  ["#869D88", "#00331A", "On-dark 60% on forest"],
  ["#E0BE60", "#FFF9EA", "Gold on cream"],
  ["#FFB657", "#FFF9EA", "Amber on cream"],
  ["#A19D94", "#FFF9EA", "Ink 40% on cream"],
];

/* type ladder: key, role, family stack, weight, size, line-height, tracking, case, sample, swash */
window.LADDER = [
  ["display", "Display", "Crimson Pro", 200, 70, "1.1", "-0.05em", "", "Your best hire, yet.", true],
  ["headline", "Headline", "Crimson Pro", 200, 60, "1.1", "-0.05em", "", "Every conversation", true],
  ["h4", "H4", "Crimson Pro", 300, 40, "1.1", "-0.04em", "", "We build your concierge"],
  ["h5", "H5 · Quote", "Crimson Pro", 300, 32, "1.2", "-0.04em", "", "By the third visit, it knew us"],
  ["title", "Title", "Crimson Pro", 400, 20, "1.1", "-0.04em", "", "Where interest becomes intent"],
  ["body-lg", "Body large", "Geist", 300, 24, "1.3", "-0.02em", "", "Remembers, recommends, resolves, reports."],
  ["body", "Body", "Geist", 400, 16, "1.5", "-0.02em", "", "Crossword turns a need into a confident purchase."],
  ["small", "Small", "Geist", 400, 14, "1.43", "-0.02em", "", "See exactly what a conversation was worth."],
  ["caption", "Caption", "Geist", 400, 12, "1.3", "-0.03em", "", "Crossword, Inc. © 2026"],
  ["ui-serif", "UI serif", "Crimson Pro", 500, 16, "1.375", "-0.03em", "uppercase", "Book a demo"],
  ["label", "Eyebrow", "Open Sans", 600, 12, "0.9", "0.12em", "uppercase", "Customer lifecycle"],
];
window.SUBSET = "ACEGNOSTWY";

window.TEXTURES = [
  ["damask-maroon", "Maroon damask", "damask-maroon-panel.webp", "Lifecycle and blog panels", "background:#7d0034 url('assets/tex/damask-maroon-panel.webp') center/cover"],
  ["damask-aubergine", "Aubergine damask, framed", "damask-aubergine-panel-framed.webp", "Shopper and handoff panels", "background:#462160 url('assets/tex/damask-aubergine-panel-framed.webp') center/cover"],
  ["damask-launch", "Aubergine damask, notched", "damask-launch-panel.webp", "Managed launch", "background:#462160 url('assets/tex/damask-launch-panel.webp') center/cover"],
  ["damask-tile", "Damask tile (greyscale)", "damask-tile-greyscale.webp", "Blend over a livery colour", "background:#7d0034 url('assets/tex/damask-tile-greyscale.webp') 0 0/180px;background-blend-mode:darken"],
  ["grain-tile", "Paper grain (greyscale)", "grain-tile-greyscale.webp", "Soft-light 40% on forest", "background:url('assets/tex/grain-tile-greyscale.webp') 0 0/173px,#00331a;background-blend-mode:soft-light"],
  ["trellis", "Divider trellis tile", "divider-trellis-tile.svg", "The divider band, 20%", "background:#fef8ea url('assets/patterns/divider-trellis-tile.svg') 0 0/55px 51px"],
];
window.TEX_FILES = [
  ["assets/tex/damask-maroon-panel.webp", "crossword-damask-maroon-panel.webp"],
  ["assets/tex/damask-aubergine-panel-framed.webp", "crossword-damask-aubergine-panel-framed.webp"],
  ["assets/tex/damask-launch-panel.webp", "crossword-damask-launch-panel.webp"],
  ["assets/tex/damask-tile-greyscale.webp", "crossword-damask-tile-greyscale.webp"],
  ["assets/tex/grain-tile-greyscale.webp", "crossword-grain-tile-greyscale.webp"],
  ["assets/tex/scrollwork-left.png", "crossword-scrollwork-left.png"],
  ["assets/tex/scrollwork-right.png", "crossword-scrollwork-right.png"],
  ["assets/tex/damask-ornament.webp", "crossword-damask-ornament.webp"],
];
window.PATTERN_FILES = [
  "divider-trellis-tile.svg", "divider-badge-frame.svg", "page-rail.svg", "rail-accent-gold.svg", "notched-frame.svg",
  "frame-notched-gilt.svg", "eyebrow-corner-curl.svg", "stamp-button-anatomy.svg", "stud-gold.svg", "stud-gold-sm.svg",
  "stud-gold-faint.svg", "stud-grey.svg", "stud-ring.svg", "panel-frame-ring-studs.svg", "portrait-frame-amber.svg",
  "quote-mark-gilded.svg", "footer-monogram-frame.svg",
];

window.STAMPS = [
  ["stamp-olive", "Postage stamp · olive", "assets/figma/stamp-olive.webp"],
  ["stamp-aubergine", "Postage stamp · aubergine", "assets/figma/stamp-aubergine.webp"],
  ["stamp-forest", "Postage stamp · forest", "assets/figma/stamp-forest.webp"],
  ["stamp-maroon", "Postage stamp · maroon", "assets/figma/stamp-maroon.webp"],
];
window.SEALS = [
  ["seal-forest", "Wax seal · forest", "assets/figma/seal-forest.webp"],
  ["seal-purple", "Wax seal · purple", "assets/figma/seal-purple.webp"],
  ["seal-gold", "Wax seal · gold", "assets/figma/seal-gold.webp"],
  ["seal-gold-site", "Wax seal · the envelope", "assets/stamps/wax-seal-gold.webp"],
];
window.SITE_STAMPS = [
  ["stamp-footer", "Footer stamp", "assets/stamps/stamp-footer.webp"],
  ["stamp-blog", "Blog stamp", "assets/stamps/stamp-blog.webp"],
  ["stamp-testimonials", "Testimonials stamp (placeholder glyph)", "assets/stamps/stamp-testimonials.webp"],
  ["stamp-launch", "Launch stamp (placeholder glyph)", "assets/stamps/stamp-launch.webp"],
];

window.SCREENS = [
  ["screen-hero", "Your best hire, yet.", "Hero · page A", 1440, 1497],
  ["screen-lifecycle", "Every conversation has a job to do", "Customer lifecycle", 1440, 1203],
  ["screen-shopper", "Give them a reason to choose you", "Shopper experience", 1440, 1122],
  ["screen-intelligence", "Every interaction makes the next one smarter", "Customer intelligence", 1440, 1562],
  ["screen-platform", "One reply, a dozen decisions", "Platform overview", 1440, 800],
  ["screen-insights", "Your best hire keeps notes", "Insights", 1440, 1113],
  ["screen-launch", "We build your concierge for you", "Managed launch", 1440, 1005],
  ["screen-trust", "Your data is safe with us", "Trust · forest livery", 1440, 800],
  ["screen-testimonials", "Trusted by brands who used to do this the hard way", "Testimonials", 1440, 912],
  ["screen-blog", "Notes from the concierge desk", "Blog", 1440, 939],
  ["screen-invitation", "The invitation", "Envelope & forest footer", 1440, 1566],
  ["screen-handoff", "Human handoff built for real support teams", "Aubergine livery", 1440, 800],
  ["screen-hero-dark", "Your best hire, yet.", "Hero B · photographic", 1440, 1511],
  ["screen-hero-c", "Your best hire, yet.", "Hero C · light variant", 1440, 1445],
  ["screen-hero-previous", "Your best hire, yet.", "Previous · the earlier dark hero", 1440, 857],
  ["screen-landing-full", "The landing page", "Page A, full length", 1440, 12639],
];

window.ICONS = ["arrow-right", "bell", "funnel", "plus", "users-three", "shopping-cart", "clock-counter-clockwise", "arrows-out-simple", "heart", "x", "caret-down"];

window.FIGMA_FILES = [
  ["Brand guidelines", "The 33-slide guideline this site mirrors: logo, colour, type, graphic system and the brand in action.", "https://www.figma.com/design/TiAeD9ICNjjC8N3zoUJExk/-For-Work--Crossword?node-id=2280-186"],
  ["Final designs", "The final website designs (Hero Tests): page A, page B, the hero variants and the human-handoff panel.", "https://www.figma.com/design/TiAeD9ICNjjC8N3zoUJExk/-For-Work--Crossword?node-id=2270-21063"],
  ["Logo, all variants", "Lockups, icons, framed icons, wax seals and postage stamps. The master artwork.", "https://www.figma.com/design/TiAeD9ICNjjC8N3zoUJExk/-For-Work--Crossword?node-id=2270-31448"],
  ["Component library", "Figma components and variables bound to DESIGN.md.", ""],
];

window.VOICE = [
  ["A concierge, not a bot", "Crossword is presented as a hire, a desk, a concierge. It notices, remembers and attends. It never boasts about the technology behind it.", "Your best hire, yet."],
  ["Short, then parallel", "Short declaratives, often in parallel triplets or quads. The rhythm carries the confidence, not the adjectives.", "Remembers, recommends, resolves, and reports."],
  ["One reframing turn per page", "A two-line turn that moves from the obvious claim to the real one. Used once, it lands. Used twice, it lectures.", "The goal isn’t to put Crossword in front of your customer. It’s to put intelligence behind every interaction."],
  ["Warm, never cute", "Hospitality warmth with a straight face. No exclamation marks, no emoji in headlines, no “Oops!”. When something goes wrong, the concierge says what happened and what to do.", "We couldn’t find that page. Let us take you back to the desk."],
];
window.TERMS = [
  ["concierge, desk, hire", "bot, chatbot, agent (in marketing)"],
  ["guest, shopper", "user (for the shopper)"],
  ["conversation", "chat session, ticket"],
  ["guardrails", "restrictions, filters"],
  ["hand off, handoff", "escalate (customer-facing)"],
  ["managed launch", "onboarding, implementation"],
  ["remembers, keeps notes, memory", "stores data, tracks"],
];
window.MECHANICS = [
  ["Headlines", "Sentence case, two lines, each line a complete phrase. One swash capital. No terminal period on two-line section heads; one-line statements take one."],
  ["Eyebrows", "Sentence case in the source (“Customer lifecycle”), set in uppercase by style."],
  ["Buttons & links", "Uppercase, verb first: BOOK A DEMO, LEARN MORE, EXPLORE PLATFORM, VIEW ALL, SIGN UP."],
  ["Footer headings", "In braces: { COMPANY }, { PLATFORM }."],
  ["Punctuation", "Oxford comma. Em dash (—), never a spaced hyphen. Curly apostrophes (’)."],
  ["Spelling", "d2c lowercase, AI in capitals, no-strings-attached hyphenated as a compound adjective."],
  ["Never", "magic, revolutionary, game-changing, supercharge, unleash, cutting-edge, seamless, robot, bot."],
];

/* starter emails: in Crossword's voice; not yet shipped product emails */
window.EMAIL_VARS = {
  sample: { first_name: "Maya", company_name: "Northwind Apparel", demo_date: "Thursday, 16 October at 11:00", calendar_url: "https://crossword.ai", dashboard_url: "https://crossword.ai", storefront_url: "northwind.com", conversations: "4,812", handoffs: "37", assisted_revenue: "$61,240", notes_url: "https://crossword.ai" },
};
window.EMAILS = [
  { id: "demo-booked", label: "Demo booked", subject: "Your Crossword demo is booked", pre: "We’ll see you at the desk.",
    eyebrow: "Demo confirmed", h: ["Your table", "is ready."],
    body: ["Hi {{first_name}},", "Thanks for booking time with us. On {{demo_date}} we’ll walk through how Crossword remembers, recommends, resolves and reports for {{company_name}}, within the guardrails you set.", "Bring a question your best in-store staff answer every day. We’ll show you Crossword answering it."],
    cta: ["Add to calendar", "{{calendar_url}}"] },
  { id: "pilot-live", label: "Pilot live", subject: "Your concierge is at the desk", pre: "{{company_name}}’s pilot went live today.",
    eyebrow: "Managed launch", h: ["Your concierge", "is at the desk."],
    body: ["Hi {{first_name}},", "{{company_name}}’s pilot went live today. Crossword is now answering shoppers on {{storefront_url}}, and every reply stays within the guardrails your team approved.", "We connected the systems, configured the experience and tested it. From here, we improve it with you."],
    cta: ["Open your dashboard", "{{dashboard_url}}"] },
  { id: "weekly-notes", label: "Weekly notes", subject: "This week at the desk", pre: "{{conversations}} conversations, {{handoffs}} handoffs.",
    eyebrow: "Concierge notes", h: ["This week", "at the desk."],
    stats: [["{{conversations}}", "Conversations"], ["{{handoffs}}", "Human handoffs"], ["{{assisted_revenue}}", "Assisted revenue"]],
    body: ["Hi {{first_name}},", "Here’s what your concierge noticed this week at {{company_name}}. The full notes include the questions shoppers asked most, and the ones it handed to your team."],
    cta: ["Read the full notes", "{{notes_url}}"] },
];
window.EMAIL_FILES = ["crossword-lockup-gold.png", "crossword-lockup-ink.png", "crossword-mark-maroon.png"];

window.PROMPTS = [
  ["A LinkedIn post", "Using the Crossword brand brief, write three LinkedIn posts announcing [news]. Speak as a seasoned concierge: warm, composed, short declaratives, one parallel triplet at most. Sentence case. No exclamation marks, no emoji, no “AI-powered”. Say concierge, not bot."],
  ["A slide deck outline", "Using the Crossword brand brief, outline a [10]-slide deck for [audience]. One idea per slide. Headlines in two lines, sentence case, each line a full phrase, with a note on which word takes the swash capital. Mark every unconfirmed figure in [brackets]."],
  ["A website section", "Follow DESIGN.md. Build a [section] in [Next.js and Tailwind]: cream page, a gold rail accent, an eyebrow, a two-line Crimson Pro ExtraLight headline opening with one Parisienne capital, Geist body, one StampButton (maroon, dashed gold border, four studs). Square corners. Put any product mock-up inside a livery panel."],
  ["A design review", "Review this [page, screenshot or component] against DESIGN.md. List every violation with the rule it breaks: rounded brand corners, gold text on cream, more than one livery panel per view, script beyond the first capital, missing focus states, text below 60% ink. Then list what to keep."],
  ["A product email", "Write a [type] email for Crossword merchants in the brand voice. Subject under 45 characters, a two-line headline, three short paragraphs, one uppercase call to action that starts with a verb. Use {{merge_tags}} for anything personal. No exclamation marks."],
  ["A photography brief", "Write a photography brief for [use] in Crossword’s style: hospitality interiors and front-of-house people, warm tungsten light, deep shadows, a single serene person in Crossword maroon. Never tech offices, screens as the hero, or AI-generated faces. Leave room at the bottom to fade to night (#0E0501) for type."],
];

window.REPO_SETUP = `# Wiring the Crossword system into the website repo

1. Copy DESIGN.md to the repo root. Add to AGENTS.md:
   "Read DESIGN.md before any UI change. DESIGN.md wins over brand.md."
2. In app/globals.css, replace the colour block inside @theme with tokens/theme.aliases.css.
   Then: parchment-deep → parchment, #fff9e9 / #fef8ea → cream, #040404 → ink.
3. Import tokens/motion.css after Tailwind. Give StampButton className="stamp-button"
   to get press feedback; the global :focus-visible rule covers every control.
4. Copy logo/favicon/icon.svg, favicon.ico and apple-icon.png into app/.
5. Keep lib/fonts.ts; retire Inter, DM Sans and Tangerine (brand.md §6.1).
6. Add to CI: npx -p @google/design.md designmd lint DESIGN.md
   Run designmd diff before merging token changes.
7. In Figma: import tokens.dtcg.json as a "Crossword / Brand" variable collection.`;
})();
