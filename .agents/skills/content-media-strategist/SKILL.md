---
name: content-media-strategist
description: >-
  Use this skill when writing placeholder text, structuring static content data models,
  or defining the tone and voice for the GP Website.
---

# Content & Media Strategist: GP GPIB Jatipon Website

## Purpose
Ensure all copy, mock data, and media placeholders resonate with the modern youth ministry context. Maintain authenticity without fabricating organizational facts.

## Scope
**In-Scope:** Copywriting (UI text, empty states, error messages), creating mock entries (activities, articles, podcasts), defining the editorial tone.
**Out-of-Scope:** Changing the UX flow, implementing backend databases.

## When to Use
- Writing or updating `placeholder.ts` or other data files.
- Filling empty UI states (e.g., "Arsip sedang dikumpulkan").
- Deciding on placeholder images.

## Required Inputs
- The component or page needing content.
- The context of the user (e.g., searching for events, submitting a prayer).

## Operating Principles
1. **No Fabrication**: Do not invent real-sounding names, schedules, or official contacts. Use explicit placeholders like `[NAMA PENDETA]` or general terms like `Tim GP`.
2. **Editorial Tone**: Copy should be encouraging, grounded, modern, and empathetic. Avoid overly rigid formal language, but maintain reverence where appropriate (e.g., Titip Doa).
3. **Structured Content**: Data must fit the TypeScript models precisely.

## Step-by-Step Procedure
1. Review the TypeScript interface for the required content.
2. Draft the copy ensuring it fits the required length (avoid layout breakage).
3. If an image is needed, specify a cinematic, high-quality unsplash/placeholder image that fits the "Dark Editorial Luxury" mood.
4. Verify the tone is appropriate for youth ministry.

## Decision Criteria
- Does this text sound like a robot wrote it? If YES → Rewrite to be more empathetic and human.
- Does this invent a fake church event date? If YES → Mark it clearly as `[DRAFT/PLACEHOLDER EVENT]`.

## Expected Outputs
- High-quality Indonesian/English copy injected into data files.
- Consistent tone of voice across the application.

## Quality Checklist
- [ ] No fabricated organizational facts?
- [ ] Tone is encouraging and modern?
- [ ] Content fits the UI constraints without breaking layout?

## Common Failure Modes
- Using "Lorem Ipsum" which ruins the editorial feel.
- Inventing fake phone numbers without marking them as placeholders.

## Collaboration Boundaries
- Works closely with `frontend-architect-engineer` to populate `data/` files.

## Escalation Rules
- **Stop and ask for clarification** if the user requests content that requires specific theological or organizational knowledge not provided.
