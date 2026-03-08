# Zeno Design System — Token Reference for Tailwind CSS v4.1

This document describes **color roles** and **typography** in the Zeno Design System so you can extract them as Tailwind v4.1 CSS variables.

---

## 1. Color semantics

| Role | Hex | Usage |
|------|-----|--------|
| **Primary** | `#111827` | Main brand/dark; headings, primary text, key UI (e.g. primary button fill) |
| **Secondary** (text) | `#6B7280` | Secondary text, subtitles, descriptions |
| **Tertiary** (text) | `#9CA3AF` | Tertiary text, captions, placeholders, muted labels |
| **Accent** | `#3B82F6` | Links, focus, interactive highlights, accent UI |
| **Success** | `#10B981` | Success states, positive feedback |
| **Warning** | `#F59E0B` | Warnings, caution |
| **Danger** | `#EF4444` | Errors, destructive actions |
| **Border** | `#E5E7EB` | Borders, dividers, card strokes |
| **Background** | `#F5F5F7` | Page/app background |
| **Card** | `#FFFFFF` | Card/surface background (often with border) |
| **Muted** (surface) | `#F3F4F6` | Muted surfaces (alternate to card) |
| **Muted** (swatch) | `#9CA3AF` | Same as tertiary; used as a color swatch in the palette |
| **Transparent** | `#00000000` | Transparent stroke/placeholder |

**Summary for Tailwind:**

- **Primary** = main dark (text + primary UI).
- **Secondary** = secondary text (`#6B7280`).
- **Tertiary** = tertiary text / muted (`#9CA3AF`).
- **Accent** = blue for links/accents (`#3B82F6`).
- Semantic: Success, Warning, Danger as above.
- Surfaces: Background, Card, Muted surface; Border as above.

---

## 2. Typography

### Font family

- **Family:** `Manrope` (single font family in the DS).

### Roles and specs

| Role | Size | Weight | Use |
|------|------|--------|-----|
| **Display** | 36px | 700 | Large numbers, hero text |
| **Title** | 16px | 600 | Section titles, card titles |
| **Subtitle** | 14px | normal | Secondary headings |
| **Body** | 13–14px | normal | Default body (spec 13px; samples use 14px for nav/labels) |
| **Caption** | 11px | normal | Supporting labels, table headers, small copy |

### Type scale (all sizes used)

- **Sizes (px):** 10, 11, 12, 13, 14, 15, 16, 18, 28, 36  
- **Weights:** normal (400), 500, 600, 700  

### Tailwind-oriented naming

- `font-display`: 36px / 700  
- `font-title`: 16px / 600  
- `font-subtitle`: 14px / 400  
- `font-body`: 13px or 14px / 400  
- `font-caption`: 11px / 400  

---

## 3. Layout tokens (for completeness)

- **Spacing:** 4, 8, 10, 12, 16, 20, 24, 32 (px).  
- **Radius:** 4, 6, 8, 10, 12, 16, 80 (px).  
- **Border:** 1px, color `#E5E7EB`.  

---

## 4. Suggested Tailwind v4.1 variable names

Map the above like this when you extract to Tailwind v4.1:

**Colors:**

- `--color-primary` → `#111827`
- `--color-secondary` → `#6B7280`
- `--color-tertiary` → `#9CA3AF`
- `--color-accent` → `#3B82F6`
- `--color-success` → `#10B981`
- `--color-warning` → `#F59E0B`
- `--color-danger` → `#EF4444`
- `--color-border` → `#E5E7EB`
- `--color-background` → `#F5F5F7`
- `--color-card` → `#FFFFFF`
- `--color-muted` → `#F3F4F6` (surface) or `#9CA3AF` (text/muted swatch)

**Typography:**

- `--font-family-sans` (or `--font-zeno`) → `Manrope`
- `--font-size-display` → 36px
- `--font-size-title` → 16px
- `--font-size-subtitle` → 14px
- `--font-size-body` → 13px or 14px
- `--font-size-caption` → 11px
- `--font-weight-normal` → 400
- `--font-weight-medium` → 500
- `--font-weight-semibold` → 600
- `--font-weight-bold` → 700  

Use this file as the single source of truth when you extract the DS into Tailwind v4.1 variables.
