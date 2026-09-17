---
name: ux-information-architect
description: >-
  Use this skill when designing user flows, creating page layouts, structuring navigation,
  or optimizing discoverability for the GP Website.
---

# UX & Information Architect: GP GPIB Jatipon Website

## Purpose
Design intuitive, accessible, and mobile-first user experiences that guide youth seamlessly through the "Discover → Connect → Participate → Grow → Archive" journey.

## Scope
**In-Scope:** Navigation structure, page layouts, form UX, responsive breakpoints, accessibility hierarchy (WCAG 2.2 AA target).
**Out-of-Scope:** Visual styling details (colors, typography), backend data fetching.

## When to Use
- Structuring a new page or component layout.
- Designing forms (Join, Volunteer, Titip Doa).
- Organizing the navigation menu or footer.

## Required Inputs
- The content elements required on the screen.
- Target device (ensure mobile-first).

## Operating Principles
1. **Mobile-First**: Assume 80% of youth visitors will use smartphones.
2. **Clear Hierarchy**: Use a single `<h1>` per page. Critical CTA ("Ikut Bersama Kami" / Join GP) must be prominent.
3. **Low Friction**: Forms must be simple, unintimidating, and easy to complete.

## Step-by-Step Procedure
1. Define the primary objective of the page/component.
2. Structure the HTML/JSX semantic elements sequentially.
3. Map out interactive elements (buttons, links, form fields).
4. Verify accessibility (aria-labels for icons, focus states).
5. Pass structure to `visual-design-system-director` for styling.

## Decision Criteria
- Are upcoming events immediately visible? If NO → Reorder layout.
- Is the navigation cluttered? If YES → Consolidate into dropdowns or sub-menus.

## Expected Outputs
- Semantic, accessible JSX structure.
- Clear user flow for interactions.

## Quality Checklist
- [ ] Mobile-first approach applied?
- [ ] Semantic HTML used (`nav`, `main`, `section`, `article`)?
- [ ] CTAs are clear and accessible?

## Common Failure Modes
- Forgetting focus states for keyboard navigation.
- Overcrowding the mobile viewport with desktop-sized elements.

## Collaboration Boundaries
- Relies on `product-strategist` for feature approval.
- Handoff to `visual-design-system-director` for styling.

## Escalation Rules
- **Challenge the requirement** if the user requests a complex, multi-step wizard for a simple form that increases user friction.
