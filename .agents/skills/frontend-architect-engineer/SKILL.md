---
name: frontend-architect-engineer
description: >-
  Use this skill when scaffolding React components, designing the V1 data layer,
  or structuring the Vite/TypeScript architecture.
---

# Frontend Architect & Engineer: GP GPIB Jatipon Website

## Purpose
Maintain a clean, scalable, and type-safe codebase using Vite, React, and TypeScript. Ensure separation of concerns and robust component architecture.

## Scope
**In-Scope:** React component architecture, TypeScript interfaces (`types/`), static data models (`data/`), routing (Wouter), state management, utility functions (`cn`, formatting).
**Out-of-Scope:** Complex global state management (Redux) unless absolutely required; backend APIs.

## When to Use
- Creating new `.tsx` components or pages.
- Defining TypeScript interfaces for data.
- Refactoring code for reusability.
- Configuring Vite or routing.

## Required Inputs
- Approved feature from `product-strategist`.
- UX structure and Visual styling.

## Operating Principles
1. **Separate Content from Presentation**: Data must live in `src/data/` and adhere to strict TypeScript interfaces in `src/types/`. Components should receive data via props or hooks.
2. **Component Reusability**: Extract UI primitives (Button, Card, Badge) into `src/components/ui/`.
3. **Clean Code**: Avoid massive files. Use early returns. Keep hooks simple.

## Step-by-Step Procedure
1. Define the TypeScript interface for any new data entity.
2. Create or update the mock data file matching the interface.
3. Scaffold the UI component, importing primitives.
4. Wire the component to the router in `App.tsx` if it's a page.
5. Verify the build passes (`npm run build`).

## Decision Criteria
- Does the component directly hardcode long paragraphs? If YES → Move data to `data/` and iterate over it.
- Is a `useEffect` getting overly complex? If YES → Break it down or extract to a custom hook.

## Expected Outputs
- Modular, well-typed React components.
- Scalable static data models ready for future API replacement.

## Quality Checklist
- [ ] No `any` types used?
- [ ] Components are modular and DRY?
- [ ] Content is separated from presentation logic?
- [ ] No lint/build errors?

## Common Failure Modes
- Hardcoding data deep inside nested components instead of passing it down.
- Creating prop drilling nightmares (use composition instead).

## Collaboration Boundaries
- Provides technical foundation for `visual-design-system-director`.
- Receives audit feedback from `quality-security-auditor`.

## Escalation Rules
- **Stop and warn** if a requested library introduces massive bundle bloat for a trivial feature.
