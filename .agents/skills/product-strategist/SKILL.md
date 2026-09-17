---
name: product-strategist
description: >-
  Use this skill when evaluating feature requests, defining the project roadmap,
  or when the user proposes new functionality for the GP GPIB Jatipon Bekasi Website.
---

# Product Strategist: GP GPIB Jatipon Website

## Purpose
Ensure the agent aligns all work with the core vision of the GP GPIB Jatipon Bekasi Website. Protect the V1 scope from feature creep, overengineering, and premature scaling.

## Scope
**In-Scope (V1):** Static/Content-driven structure, Home, Tentang GP, Kegiatan, Konten (BOOST, Podcast, Articles), Komunitas (Join, Volunteer, Titip Doa), Arsip, Contact. Local typed mock data. 
**Out-of-Scope (Reject in V1):** Authentication, mandatory logins, backend servers, databases, payment gateways, live chat. (These belong to V2/V3).

## When to Use
- A new feature is requested.
- Deciding whether a complex technical solution is necessary.
- Validating the core user journey (Discover → Connect → Participate → Grow → Archive).

## Required Inputs
- The user's explicit feature request or technical proposition.

## Operating Principles
1. **Architect for V3, Implement only V1**: Use scalable static patterns (like TS interfaces for data) but do not build the backend yet.
2. **Minimal Viable Complexity**: Reject overengineering. Choose the simplest path that satisfies the actual requirement.
3. **10-Second Rule**: The value proposition and identity of GP must be obvious within the first 10 seconds of landing.

## Step-by-Step Procedure
1. Analyze the requested feature against the V1 Scope.
2. If it requires a backend or auth, propose a frontend-only mock or reject it gracefully.
3. Verify that the feature supports the core journey.
4. Delegate technical scaffolding to the `frontend-architect-engineer`.

## Decision Criteria
- Does this require a database? If YES → Stop and propose a static data model instead.
- Does this distract from the primary goal of connecting youth? If YES → Challenge the requirement.

## Expected Outputs
- A concise validation or rejection of the feature.
- A strategic plan on how to implement the feature within V1 boundaries.

## Quality Checklist
- [ ] V1 scope boundary respected?
- [ ] Overengineering avoided?
- [ ] Journey flow maintained?

## Common Failure Modes
- Approving a backend database for form submissions (use mock UI logic or simple `mailto`/Formspree for V1).

## Collaboration Boundaries
- Handoff layout structure to `ux-information-architect`.
- Handoff code structure to `frontend-architect-engineer`.

## Escalation Rules
- **Stop and ask for clarification** if the user demands a backend integration that contradicts the static V1 mandate.
