# CareerForge AI — Design System

> **Version:** 1.0 (Draft)  
> **Last updated:** 2026-09-28  
> **Status:** Draft — will be finalized in Phase 2

---

## 1. Design Philosophy

**Keywords:** Clean, spacious, calm, confident, data-rich.  
**Inspiration:** Linear (clarity), Vercel dashboard (polish), Notion (navigation), Duolingo (progress feeling), Jobscan (data presentation).  
**Not:** cluttered, flashy, "student project looking."

---

## 2. Color Palette

### Primary — Deep Indigo/Violet
| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--primary-50` | `#EEF2FF` | — | Backgrounds, hover states |
| `--primary-100` | `#E0E7FF` | — | Light fills |
| `--primary-200` | `#C7D2FE` | — | Borders, subtle |
| `--primary-500` | `#6366F1` | `#818CF8` | Main interactive elements |
| `--primary-600` | `#4F46E5` | `#6366F1` | Buttons, links |
| `--primary-700` | `#4338CA` | `#4F46E5` | Pressed states |
| `--primary-900` | `#312E81` | — | Dark text accent |

### Accent — Teal
| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--accent-400` | `#2DD4BF` | `#5EEAD4` | Success, progress, highlights |
| `--accent-500` | `#14B8A6` | `#2DD4BF` | Accent buttons, badges |
| `--accent-600` | `#0D9488` | `#14B8A6` | Hover |

### Semantic
| Token | Color | Usage |
|---|---|---|
| `--success` | `#10B981` (emerald-500) | Passed, improved, complete |
| `--warning` | `#F59E0B` (amber-500) | Needs attention, partial |
| `--error` | `#EF4444` (red-500) | Failed, critical gap, errors |
| `--info` | `#3B82F6` (blue-500) | Informational |

### Neutrals
| Token | Light | Dark |
|---|---|---|
| `--bg-primary` | `#FFFFFF` | `#0F172A` (slate-900) |
| `--bg-secondary` | `#F8FAFC` (slate-50) | `#1E293B` (slate-800) |
| `--bg-tertiary` | `#F1F5F9` (slate-100) | `#334155` (slate-700) |
| `--text-primary` | `#0F172A` (slate-900) | `#F8FAFC` (slate-50) |
| `--text-secondary` | `#475569` (slate-600) | `#94A3B8` (slate-400) |
| `--text-muted` | `#94A3B8` (slate-400) | `#64748B` (slate-500) |
| `--border` | `#E2E8F0` (slate-200) | `#334155` (slate-700) |

---

## 3. Typography

### Font Family
- **UI / Body:** `Inter` (Google Fonts) — clean, modern, excellent readability
- **Display / Headings:** `Inter` with varied weights (or `Outfit` if a display feel is wanted)
- **Monospace (code):** `JetBrains Mono` or `Fira Code`

### Type Scale
| Name | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `display-lg` | 48px / 3rem | 700 | 1.1 | Landing hero |
| `display-sm` | 32px / 2rem | 700 | 1.2 | Page titles |
| `heading-lg` | 24px / 1.5rem | 600 | 1.3 | Section headings |
| `heading-sm` | 20px / 1.25rem | 600 | 1.4 | Card titles |
| `body-lg` | 16px / 1rem | 400 | 1.6 | Main body text |
| `body-sm` | 14px / 0.875rem | 400 | 1.5 | Secondary text, descriptions |
| `caption` | 12px / 0.75rem | 500 | 1.4 | Labels, badges, metadata |

---

## 4. Spacing

Based on a 4px grid:
| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Tight gaps |
| `--space-2` | 8px | Icon gaps, inline |
| `--space-3` | 12px | Small padding |
| `--space-4` | 16px | Standard padding |
| `--space-5` | 20px | Card padding |
| `--space-6` | 24px | Section gaps |
| `--space-8` | 32px | Large gaps |
| `--space-10` | 40px | Section spacing |
| `--space-12` | 48px | Page margins |
| `--space-16` | 64px | Major sections |

---

## 5. Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 6px | Small elements (badges, chips) |
| `--radius-md` | 8px | Inputs, buttons |
| `--radius-lg` | 12px | Cards, dialogs |
| `--radius-xl` | 16px | Large cards, panels |
| `--radius-full` | 9999px | Avatars, pills |

---

## 6. Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` | Cards |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-glow` | `0 0 20px rgba(99,102,241,0.15)` | Primary focus glow |

---

## 7. Motion / Animation

| Property | Value | Notes |
|---|---|---|
| **Duration (fast)** | 150ms | Hover states, toggles |
| **Duration (normal)** | 250ms | Page transitions, modals |
| **Duration (slow)** | 400ms | Complex animations |
| **Easing** | `cubic-bezier(0.4, 0, 0.2, 1)` | Default ease |
| **Spring** | Framer Motion spring | Bouncy elements |
| **Reduce motion** | `@media (prefers-reduced-motion: reduce)` → no animation | Accessibility |

### Micro-animations to implement:
- Button press scale (0.98)
- Card hover lift (translateY -2px + shadow)
- Score ring fill animation
- Progress bar smooth transition
- Skeleton loading shimmer
- Toast slide-in
- Page fade transitions
- Sidebar collapse/expand

---

## 8. Component Library

Using **shadcn/ui** as the base. Custom components built on top:

### Core shadcn/ui components:
Button, Input, Select, Dialog, Sheet, Tabs, Card, Badge, Toast, Tooltip, Dropdown Menu, Command (palette), Avatar, Progress, Skeleton, Separator, Switch, Checkbox, Radio Group, Label, Textarea, Accordion, Alert, Calendar, Popover, Scroll Area, Table

### Custom components to build:
| Component | Description |
|---|---|
| `ScoreRing` | Circular progress with score number, color-coded |
| `RadarChart` | Skill radar using Recharts |
| `GaugeChart` | Readiness gauge |
| `HeatmapGrid` | Skill gap heatmap |
| `TimelineView` | Roadmap timeline |
| `KanbanBoard` | Job tracker |
| `JourneyProgressBar` | Shows journey states horizontally |
| `DeltaBars` | Before/after comparison bars |
| `StreakCalendar` | GitHub-style activity grid |
| `EmptyState` | Friendly illustration + CTA |
| `ErrorState` | Error message + retry button |
| `SkeletonCard` | Loading placeholder |
| `SourceChip` | Shows source + confidence badge |
| `CommandPalette` | Ctrl+K search |

---

## 9. Layout

### App Shell
- **Sidebar:** Left, 240px expanded, 64px collapsed, collapsible
- **Top bar:** 56px height, breadcrumbs + command palette trigger + notifications + avatar
- **Main content:** max-width 1280px, centered, responsive padding
- **Journey Progress Bar:** Below top bar on journey pages, sticky

### Breakpoints
| Name | Min Width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

### Grid
- 12-column grid for layouts
- Gap: 16px (sm), 24px (md+)

---

## 10. Accessibility

- **WCAG AA** contrast ratios minimum
- Focus rings: 2px solid primary-500 with 2px offset
- All interactive elements have labels/ARIA
- Keyboard navigable (Tab, Enter, Escape, Arrow keys)
- Screen reader tested (at least NVDA on Windows)
- `prefers-reduced-motion` respected
- `prefers-color-scheme` for initial theme
- No color-only indicators (always pair with icon/text)

---

## 11. Iconography

- **Library:** Lucide React
- **Size:** 16px (inline), 20px (default), 24px (prominent)
- **Stroke:** 1.5px (matches Inter's weight)
- **Usage:** Always paired with text for actions; standalone only for universally understood icons (close, search, menu)

---

## 12. Microcopy Guidelines

- Encouraging, honest, plain language
- Show "why" behind every score
- Error messages: what happened + what to do
- Empty states: what this section does + CTA to get started
- AI outputs: always show confidence and source
- Never: "Error 500", "null", "undefined", technical jargon in user-facing text
