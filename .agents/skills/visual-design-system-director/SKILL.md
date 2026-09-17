---
name: visual-design-system-director
description: >-
  Use this skill when making styling decisions, modifying CSS/Tailwind configuration,
  or applying the 'Dark Editorial Luxury' aesthetic.
---

# Visual Design System Director: GP GPIB Jatipon Website

## Purpose
Enforce and maintain the "Dark Editorial Luxury" visual aesthetic. Ensure the UI feels premium, modern, and aligned with the GP brand (Benhur Blue-led).

## Scope
**In-Scope:** Tailwind classes, CSS variables, color palettes, typography, gradients, glassmorphism, micro-animations, spacing.
**Out-of-Scope:** Changing the structural layout sequence or business logic.

## When to Use
- Writing Tailwind classes for a component.
- Updating `index.css` or Tailwind configuration.
- Adjusting hover effects, shadows, and transitions.

## Required Inputs
- A structurally sound React component.
- The intent of the UI element (e.g., primary CTA, subtle background).

## Operating Principles
1. **Dark Editorial Luxury**: Deep navy surfaces (slate-950, slate-900). Not pure black.
2. **Benhur Blue-Led**: Use rich, royal blue (e.g., `blue-600` or `#2563EB`) as the primary accent.
3. **Restraint**: NO cyberpunk, NO neon, NO magenta/cyan defaults. Use elegant, subtle gradients and blur (glassmorphism).
4. **Cinematic & Editorial**: Generous line-height, beautiful serif pairings (Playfair Display) for headings, clean sans-serif (Inter/Plus Jakarta Sans) for body.

## Step-by-Step Procedure
1. Apply the deep navy background foundation to the container.
2. Set typography classes (font-serif for headings, text-text-muted for body).
3. Apply Benhur Blue to interactive elements (buttons, links, active states).
4. Add subtle glassmorphism (`backdrop-blur`, `bg-white/5`, `border-white/10`) to elevated cards/navbars.
5. Add smooth micro-animations (`transition-all duration-300`).

## Decision Criteria
- Does this look like a neon gaming site? If YES → Remove high-saturation glows; darken backgrounds to navy.
- Are colors clashing? If YES → Fall back to monochromatic navy + Benhur Blue accent.

## Expected Outputs
- Polished, visually stunning UI components using Tailwind CSS.
- Consistent application of design tokens.

## Quality Checklist
- [ ] Is the background deep navy, not pure black?
- [ ] Is Benhur Blue used appropriately for emphasis?
- [ ] Are hover states smooth (micro-animations)?
- [ ] Is typography editorial and legible?

## Common Failure Modes
- Defaulting to plain gray/black dark mode instead of navy.
- Overusing the blue accent, causing visual fatigue.

## Collaboration Boundaries
- Receives unstyled structure from `ux-information-architect`.
- Relies on `frontend-architect-engineer` to ensure CSS architecture is maintainable.

## Escalation Rules
- **Stop and ask for clarification** if the user requests colors that severely break the premium dark aesthetic (e.g., bright yellow backgrounds).
