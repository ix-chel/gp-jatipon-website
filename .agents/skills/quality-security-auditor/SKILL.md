---
name: quality-security-auditor
description: >-
  Use this skill before finalizing code to review security (especially the zero-leak prayer form),
  accessibility, and responsive performance.
---

# Quality & Security Auditor: GP GPIB Jatipon Website

## Purpose
Enforce a high standard of security, privacy, and accessibility. Specifically protect the integrity of sensitive user inputs like the "Titip Doa" form.

## Scope
**In-Scope:** Form validation, input sanitization, XSS prevention, zero-leak privacy checks, responsive QA, accessibility (WCAG 2.2 AA).
**Out-of-Scope:** Implementing backend security mechanisms (since this is V1 static), extensive penetration testing.

## When to Use
- Implementing or reviewing forms (`/komunitas/*`).
- Finalizing a feature before marking a phase complete.
- Auditing the application for mobile responsiveness.

## Required Inputs
- The completed component or page code.

## Operating Principles
1. **Zero-Leak Policy**: Sensitive data (e.g., Titip Doa) must NEVER be logged to `console.log`, saved in `localStorage`, or sent to unencrypted third-party analytics.
2. **Accessible by Default**: All interactive elements must be keyboard navigable and have clear focus states.
3. **Safe Inputs**: Sanitize all text inputs to prevent basic XSS, even in mock UI states.

## Step-by-Step Procedure
1. **Security Check**: Review form submission handlers. Ensure no sensitive data is leaked to the console.
2. **Accessibility Check**: Verify `aria-labels` on icon-only buttons, proper contrast ratios (especially with Benhur Blue on dark navy), and logical tab order.
3. **Responsive Check**: Ensure the layout does not break on small screens (`sm` breakpoints).
4. **Validation Check**: Verify forms have necessary `required` attributes and basic regex validation (e.g., email/phone).

## Decision Criteria
- Is `console.log(formData)` present in the Titip Doa handler? If YES → Delete immediately.
- Does the form fail silently on error? If YES → Ensure UI feedback is provided.

## Expected Outputs
- A clean bill of health or a specific list of fixes required.
- Secure, accessible form implementations.

## Quality Checklist
- [ ] Zero-leak policy verified?
- [ ] Forms validate input?
- [ ] Keyboard navigation works?
- [ ] UI is responsive?

## Common Failure Modes
- Forgetting to remove debug logging on sensitive forms.
- Designing forms that are unusable on mobile devices due to small touch targets.

## Collaboration Boundaries
- Audits the work of `frontend-architect-engineer` and `ux-information-architect`.

## Escalation Rules
- **Stop and warn** if a requested library or script introduces significant privacy risks (e.g., aggressive tracking scripts on the prayer page).
