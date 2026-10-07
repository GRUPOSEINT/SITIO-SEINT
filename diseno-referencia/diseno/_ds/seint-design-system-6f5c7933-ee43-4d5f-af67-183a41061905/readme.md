# SEINT — Design System

**SEINT SAS** (`seintsas.com`) is a Colombian **centro de formación e IPS** based in Bogotá (Carrera 69 No 24-65 sur). From the 2024 brand book: *"Brindamos servicios y soluciones corporativas enfocadas al cumplimiento de la normatividad vigente en materia de Seguridad y Salud en el Trabajo, desarrollando actividades de formación no formal para trabajo y desarrollo humano, en tareas de alto riesgo y otros programas de tipo ocupacional, desde una perspectiva de mejora continua."*

Tagline: **Su bienestar, nuestro compromiso.** The company presents itself as **Grupo Empresarial SEINT**. The institutional lockup — descriptor above the wordmark, tagline below it — is a supplied asset: `assets/logo-grupo-seint.png` (`<Logo variant="grupo" />`). **Never re-typeset the descriptor or the tagline**; use the artwork.

**Endoso apilado.** El aniversario se ordena **bajo** el lockup, en una sola línea, separado por la regla teal del sistema, que cruza el ancho completo del lockup: `17 AÑOS DE BIENESTAR`. Aguanta reducción sin perder legibilidad, así que es la forma institucional por defecto — avatar y encabezado de redes, señalética, carnés, sello en documentos. Sobre color, el "17" pasa a navy y la etiqueta a blanco. El componente `Lockup` lo construye con las proporciones medidas del arte; no lo recompongas a mano.

**Isotipo en degradado.** El arte institucional sobre blanco (`assets/logo-grupo-seint-degradado.png`, `<Logo variant="grupo" />`) lleva el isotipo con el degradado teal→navy suministrado, y el numeral del endoso es el arte `assets/endoso-17.png` — no tipografía. Sobre fondos de color el degradado no sobrevive, así que ahí van las monocromas y el "17" compuesto en Exo navy.

**Versiones monocromas.** El arte original viene sobre papel blanco. `assets/logo-grupo-seint-{white,navy,teal}.png` son ese mismo arte con el fondo recortado y la tinta repintada en un color de la paleta — sin redibujo, solo recorte y color. Úsalas para apoyar la marca directamente sobre un fondo de color: `grupo-white` sobre teal o navy, `grupo-navy` o `grupo-teal` sobre fondos claros teñidos. El arte a todo color (`grupo`) es solo para fondo blanco.

Anniversary endorsement: **17 años de bienestar**. ⚠️ The supplied artwork (`assets/logo-15-anos-*.png`, `Renovacion SEINT.pdf`) still reads **15 AÑOS** and carries no group descriptor. Until an updated file arrives, the anniversary is type-set in Exo next to the lockup (see the "Aniversario — 17 años" card); the 15 años PNGs are legacy.

## Two business units, two color leads

SEINT is a group with two service lines, and color is what tells them apart. This is a **rule of the system, applied through theme scopes** — not a second palette:

| Unidad | Tema | Predomina | Apoyo |
|---|---|---|---|
| Medicina ocupacional / salud ocupacional / laboratorio clínico (IPS) | `.theme-salud` | **Verde** (teal-500 / teal-400) | Navy como tinta y contraste |
| Centro de capacitación / SST / alto riesgo | `.theme-formacion` | **Azul** (navy-500) | Teal como acento puntual |

En redes esta regla es obligatoria: el color del carrusel lo decide el tema tratado, no la campaña. Y el contenido de todo post o carrusel va **centrado verticalmente** entre la marca y el pie, con el mismo margen arriba y abajo. La marca, en cambio, va siempre en la misma posición (arriba a la izquierda, bloque fijo) en todas las piezas de la secuencia.

**Orden histórico.** El grupo nació como **centro de capacitación** (azul) y el **centro médico ocupacional** (verde) abrió diez años después. Por eso el azul es el color corporativo de arranque: banners principales, portadas institucionales y todo lo que hable del grupo como tal van en azul; el verde entra cuando el tema es salud o medicina ocupacional.

Both units share the same four brand colors; only the lead changes. Neither hue ever disappears — the supporting one keeps carrying ink, rules and contrast, so the group still reads as one brand.

**How to use it.** Put `className="theme-salud"` or `className="theme-formacion"` on any wrapper — a section, a card, a whole page. Every component inside follows, because components read the brand-role aliases (`--accent`, `--on-accent`, `--brand-primary`, `--surface-brand`, `--surface-brand-soft`, `--rule-color`, `--text-accent`) and never the raw ramps. Defined in `tokens/themes.css`.

**Defaults.** With no theme class the system is corporate: teal accent on navy ink — the neutral lockup case (home, brand pages, stationery, the 15 años material).

**In practice.** Use `surface="brand"` on Card and `tone="brand"` on Badge when you want the container itself to follow the unit. Service cards in the website kit carry their unit's theme individually, so the grid reads green for exámenes and blue for alturas / confinados / SG-SST at a glance.

Two surfaces are represented here:
1. **Corporate / marketing site** — services, credentials, appointment booking. ⚠️ **Propuesta, not a recreation:** the brand book documents no website and none was supplied.
2. **Social media** — Instagram/LinkedIn 4:5 educational carousels on occupational health regulation.

Supporting surfaces documented but not rebuilt: **stationery** (hoja membrete) and **OOH**, both shown as reference cards.

## Sources given

| Source | What it gave us |
|---|---|
| `uploads/Renovacion SEINT.pdf` — "Brand guidelines 2024", 10 pages | Introduction copy, concept (*Evolución · Seguridad · Salud*), logo construction, typography (**Exo**), the four brand colors with RGB/CMYK, variables, social-media and OOH applications |
| `uploads/Logo 1–4.png`, `Isotipo 1–3.png`, `Logo_15_1–3.png`, `seint 15 años.jpg` | Full lockups (white / color / navy / gradient), isotipo alone, and the **15 años** anniversary lockup (superseded — now 17 años) |
| `uploads/Hoja membrete Saint.png` | Letterhead: isotipo watermark, curved gray footer, contact block |
| `uploads/01–08.png` | A complete 7-slide Instagram carousel — the live social template system |

No codebase, Figma file or website export was provided. Everything that is not directly in those files is marked as a derivation or an addition below.

## Index

- `styles.css` — the single entry point consumers link. Imports only.
- `tokens/` — `fonts.css`, `colors.css`, **`themes.css`** (temas por unidad de negocio), `typography.css`, `spacing.css`, `radius.css`, `elevation.css`, `motion.css`, `base.css`
- `guidelines/` — 22 specimen cards (Colors, Type, Spacing, Brand)
- `assets/` — logos, isotipos, 15 años lockups, letterhead, social reference frames
- `components/` — `brand/` (**Lockup**), `core/` (Button, IconButton, Badge, Card, SectionHeading, Logo), `forms/` (Input, Select, Checkbox), `feedback/` (Alert), `navigation/` (Tabs), `data/` (StatBlock), `media/` (Icon)
- `ui_kits/website/` — Inicio, Servicios, Agenda (navigable)
- `ui_kits/social/` — 4:5 carousel templates (Cover, Step, Checklist, Cta)
- `SKILL.md` — Agent Skills wrapper

## Visual foundations

**Colors.** Four fixed values (brand book p.6): teal **#00C2B6**, teal deep **#00A69C**, navy **#0D145C**, ink **#010B13**. Everything else in `tokens/colors.css` is a ramp derived from those. The system is strictly two-hue: teal and navy, on white or near-white; there is no third brand hue. Which of the two leads depends on the business unit — verde for salud/medicina ocupacional, azul for capacitación/SST (see "Two business units, two color leads" above). Warning, danger and info are **system colors, deliberately outside the brand palette** — they exist only for form states and inline messages, never for brand or layout color.

**Backgrounds.** Flat color, never photographic backdrops in the supplied material. Three grounds only: white, teal-500, navy-500. One gradient exists — teal → navy at ~120° — and it is reserved for the isotipo and the 15 años lockup, not for page backgrounds. The letterhead adds two quiet devices: a very low-contrast isotipo watermark (~4% ink) and a curved gray footer band. No textures, no patterns, no noise.

**Type.** **Exo** is the only typeface in the system (brand book p.5: *"sans serif geométrica contemporánea… remates redondeados"*, 9 weights, true italics). It carries display, headings and body — `--font-display` and `--font-core` both resolve to Exo. Body copy sits at 16–18px / 1.65; headlines run 700–800, tracking −0.01em, set tight at 1.04. Overlines are 12px uppercase at 0.18em with a 2px teal underline that stops short of the text — that underline is the single most recognizable typographic tic in the system.

**Layout.** Generous margins, one idea per screen. Social frames use a 96px margin on a 1080px canvas (~9%). Web content maxes at 1200px with 32–64px gutters. Vertical rhythm runs on the 4px scale, and sections breathe at 80–96px. Sticky elements: the site header, and the quote card on service pages.

**Shape.** Corners are soft but not pill-shaped except on controls: cards 16px, fields and small surfaces 10px, buttons and badges fully rounded (999px). The rounded pill echoes the logo's rounded stroke terminals. Rules are 3px teal; borders are 1px `gray-200` hairlines.

**Cards.** White, 1px hairline, 16px radius, small shadow, optional 3px teal top rule. On hover an interactive card lifts 2px and takes `--shadow-lg`. Soft (teal-50), teal and navy card surfaces exist for emphasis blocks.

**Shadows.** Navy-tinted and soft: `0 4px 14px rgba(13,20,92,.08)` at rest, `0 14px 40px rgba(13,20,92,.12)` raised. A teal glow (`0 10px 26px rgba(0,166,156,.24)`) is available for a hero CTA. No inner shadows anywhere.

**Transparency and blur.** Used once, deliberately: the sticky header is white at 92% with a 10px backdrop blur. Inverse badges are white at 16%, but **body copy on a colored ground is never alpha-muted** — white at full opacity only, and the ground itself steps down to `--surface-brand-strong` (teal-700 in green, navy-500 in blue) whenever it carries text below headline scale. White on teal-500 is only 3.03:1, which is why teal-500 grounds hold headlines and marks, not paragraphs. Scrims use ink at 55%. Never blur brand marks or headline type.

**Animation.** Restrained and functional. 120ms for color, 180ms as the default, 280ms for larger surface changes; easing `cubic-bezier(.2,.7,.3,1)`. Fades and short lifts only — no bounces, no spring, no parallax, no entrance animations on load.

**Hover / press.** Buttons darken by one ramp step on hover (teal-400 → teal-500; navy-500 → navy-400 for the navy fill, which lightens instead). Outline buttons invert to a navy fill. Ghost buttons pick up a teal-50 wash. Press shrinks to 98% — never a color-only press state. Links go teal-600 → navy-500 with a 3px-offset underline.

**Focus.** 3px `rgba(0,194,182,.45)` ring plus a teal border. Never removed.

**Imagery.** No photography was supplied. The brand book's applications are typographic and flat-color. If photography is introduced, keep it cool-toned and clinical — worksite, PPE, clinic — and always place type on a solid panel rather than directly on the image, since the system has no protection-gradient convention.

## Content fundamentals

**Language.** Colombian Spanish throughout, with the technical register of the SST sector. Regulations are cited by number and year, in the headline or the overline, never buried: "Res. 2346/2007", "Res. 4272 de 2021", "Decreto 1072 de 2015". Citing the norm *is* the credibility play.

**Person.** Second person singular, informal **tú** — "Guarda esto", "Escríbenos", "¿Estás pidiendo el examen correcto?". The company speaks as **nosotros** ("Brindamos servicios…"). Never *usted*, never first person singular.

**Structure.** Claim, then correction, then instruction. The carousel opens by naming a widespread mistake ("No todos los exámenes ocupacionales son iguales. Pedir el equivocado cuesta."), spends the middle enumerating (01, 02, 03), and closes with one concrete ask ("Guarda esto y compártelo con tu área de talento humano").

**Sentence shape.** Short. Frequently a fragment followed by the explanation: "Antes de empezar. Define si la persona es apta para ESE cargo según su riesgo." Emphasis comes from capitalizing a single word (ESE) or coloring it with `--on-brand-accent` inside a headline on a themed ground — navy inside a green headline, teal-300 inside a blue one. Always full-opacity ink, never a soft surface tint, and never bold runs or italics.

**Casing.** Sentence case for headlines and body. UPPERCASE only for overlines, badges, engagement labels ("ME GUSTA · COMENTA · COMPARTE · GUARDA") and the letterhead descriptor ("CENTRO DE FORMACIÓN E IPS").

**Punctuation.** Full Spanish punctuation, including opening marks (¿ ¡) and accents in uppercase (AÑOS). Middle dot as the separator in overlines. Colons in headlines to set up a list.

**Emoji.** None. Not in the brand book, not in the carousel, not on the letterhead. Do not introduce them.

**Vibe.** Clinical-but-approachable: an occupational-health specialist explaining a compliance requirement to an HR lead who is about to get it wrong. Confident, never alarmist; instructive, never scolding. It sells relief from a legal risk, not fear of it.

## Iconography

No icon library was supplied — the brand book contains no icon page, and the source PNGs contain only three glyphs: the phone, pin and envelope on the letterhead footer, plus the arrow-free contact rules.

- **Substitution (flagged):** **Lucide** at 2px stroke, loaded per-glyph from `unpkg.com/lucide-static@0.462.0` and masked to `currentColor` by the `Icon` component. It matches the letterhead glyphs closely — geometric, rounded caps, uniform stroke — but it is **not** SEINT's own set. Replace it if a real set exists.
- **House glyphs used:** `hard-hat`, `stethoscope`, `shield-check`, `file-check`, `calendar-check`, `phone`, `mail`, `map-pin`, `arrow-right`, `check`.
- **Negative isotipo.** The three original isotipo files are teal, navy and teal→navy gradient. `assets/isotipo-white.png` is the negative mark, **cropped from the supplied white lockup** (`Logo 1.png`) — same artwork, no redrawing. Use it as the corner mark on teal and navy grounds. Never invert a brand mark with a CSS filter.
- **Isotipo as icon.** The casco + estetoscopio mark is the brand's own pictogram and appears as a small corner mark on interior social slides. It is a signature, not a UI icon — never place it inline with text or inside a button.
- **Geometric bullets.** The carousel uses a teal square rotated 45° as its list bullet. Reuse that instead of a check glyph in editorial layouts.
- **Emoji and unicode:** never used as icons.

## Typography

Per the brand book, **Exo only**. It ships from Google Fonts (300–800 + italics), so there is no font substitution anywhere in this system. Display type is Exo 700/800; the condensed cut seen in some social artwork and in the "15 AÑOS" lockup is not part of the type system — that lockup is used as a supplied image asset, not reset in type.

## Intentional additions

Nothing in the sources defines a UI component inventory, so a standard primitive set was authored, sized to what the two surfaces actually need. Additions beyond the brand book:

- **Icon** — wrapper over the substituted Lucide set, so the substitution lives in one file.
- **System colors** (warning, danger, info) — required by the appointment form; kept out of the brand palette on purpose.
- **StatBlock** — derived from the "15 años" credibility device.

## Accessibility notes

White on teal-500 (#00A69C) clears 4.5:1 for body copy. Navy on teal-500 clears it comfortably. Navy on teal-400 (#00C2B6) is the pairing used for primary buttons and is safe at 16px semibold and above. Avoid teal-400 text on white (fails). `--text-accent` resolves to **teal-700** in the green theme so 12px overlines clear 4.5:1; teal-600 is for larger or decorative use. On a themed ground, overlines take `--on-brand-overline` (navy on green, teal-200 on blue) — never a fixed light tint, which drops to 1.95:1 on teal.
