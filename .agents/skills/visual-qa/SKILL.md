---
name: visual-qa-gp-jatipon
description: Reviews the rendered GP GPIB Jatipon youth ministry website for visual hierarchy, spacing, typography, responsiveness, accessibility, interaction quality, and premium editorial design. Use during the dedicated Visual QA phase after core pages are implemented.
---

# Visual QA — GP GPIB Jatipon

## Goal

Evaluate the actual rendered GP GPIB Jatipon website as a visitor would experience it.

Do not review source code only.

Use browser-based inspection and screenshots whenever available.

Focus on:
- Visual quality
- User comprehension
- Ministry-appropriate communication
- Responsive behavior
- Accessibility
- Navigation and interaction quality
- Consistency with the Light/Dark Editorial design direction

Do not introduce unnecessary visual complexity.

---

## Website Context

Website:
GP GPIB Jatipon — Youth Ministry

Primary purpose:
Create a public digital home for the youth ministry where visitors can:

Discover → Connect → Participate → Grow → Archive

Core pages:
- Home
- Tentang GP
- Kegiatan
- Konten
- Komunitas
- Arsip
- Contact

Design direction:
- Light/Dark Editorial
- Premium but restrained
- Calm and welcoming
- Modern youth ministry
- Clear information hierarchy
- Selective glass and blur
- Benhur Blue as the primary accent
- No excessive neon or gaming-style visuals

Important:
Do not treat provisional information as verified official information.

---

## First 5 Seconds

Verify that visitors immediately understand:

1. This is the GP GPIB Jatipon youth ministry website.
2. What the ministry or community offers.
3. What action visitors can take next.
4. The primary CTA is visible and understandable.
5. The page feels welcoming, trustworthy, and ministry-appropriate.

If this fails:
Prioritize improving the Home hero section before polishing minor details.

Check:
- Hero headline clarity
- Supporting copy readability
- CTA visibility
- Visual hierarchy
- Background contrast
- Mobile hero composition

Do not invent official ministry claims or historical information to improve the hero.

---

## Visual Hierarchy

Inspect:

- Headline dominance
- CTA visibility
- Section hierarchy
- Typography scale
- Font pairing
- Spacing consistency
- Whitespace
- Visual rhythm
- Content density
- Alignment
- Section transitions

Check whether visitors can scan the page quickly.

Prioritize:
1. Typography
2. Spacing
3. Hierarchy
4. Composition

Do not solve empty space by adding random visual effects.

---

## Premium Editorial Quality

Look for:

- Inconsistent spacing
- Excessive borders
- Excessive rounded corners
- Generic card layouts
- Weak typography
- Visual clutter
- Excessive glow
- Inconsistent shadows
- Unnecessary decoration
- Poor contrast
- Overuse of glassmorphism
- Excessive gradients
- Inconsistent icon styles

The design should feel:
- Intentional
- Calm
- Modern
- Human
- Trustworthy
- Appropriate for a youth ministry

Do not make every section visually intense.

---

## Ministry Communication Quality

Check:

- Copy is clear to first-time visitors.
- Language is welcoming and inclusive.
- CTAs are specific and understandable.
- Provisional content is visibly marked.
- Unverified facts are not presented as official.
- No fabricated history, leadership, dates, or ministry claims appear.
- Prayer-related content uses appropriate privacy wording.
- Content does not feel overly corporate or overly promotional.

Review the balance between:
- Ministry identity
- Community invitation
- Practical information
- Visual storytelling

---

## Maximalism Check

Concentrate visual emphasis around:

- Home hero
- Featured activities
- Selected content
- Community CTA
- Important editorial sections

Avoid applying maximalist treatment to every section.

If all sections contain:
- Heavy blur
- Large gradients
- Strong shadows
- Multiple decorative elements
- Excessive animation

Recommend reducing complexity.

---

## Responsive QA

Inspect the website at:

- Desktop
- Tablet
- Mobile
- Narrow mobile widths, approximately 320px

Check:

- Horizontal overflow
- Navigation behavior
- Mobile menu behavior
- Hero composition
- Typography scaling
- CTA button layout
- Card layouts
- Image cropping
- Grid transitions
- Section spacing
- Footer layout
- Long text wrapping
- Touch target sizes

Verify that:
- No content is clipped.
- Buttons do not overflow.
- Cards do not become excessively narrow.
- Navigation remains usable.
- Text remains readable.
- Important CTAs remain visible.

---

## Navigation and Interaction

Test:

- Navbar links
- Footer links
- Hero CTAs
- Activity cards
- Content cards
- Community links
- Back buttons
- Invalid slug handling
- NotFound behavior

Required route checks:

- `/`
- `/tentang-gp`
- `/kegiatan`
- `/kegiatan/:slug`
- `/konten`
- `/konten/kategori/:category`
- `/konten/baca/:slug`
- `/komunitas`
- `/komunitas/join`
- `/komunitas/volunteer`
- `/komunitas/titip-doa`
- `/arsip`
- `/arsip/:slug`
- `/contact`

Check:
- No dead links
- No incorrect route destinations
- No broken dynamic routes
- Invalid routes provide a clear fallback
- Links have understandable labels
- Keyboard navigation works where browser testing is available

---

## Accessibility

Inspect:

- Color contrast
- Semantic headings
- Meaningful link text
- Image alt text
- Keyboard navigation
- Visible focus states
- Form labels
- Error messages
- Button accessibility
- Reduced-motion behavior

Check that:
- Information is not communicated through color alone.
- Interactive elements are distinguishable.
- Text remains readable in both themes.
- Decorative images do not create unnecessary noise.
- Forms communicate validation errors clearly.

---

## Light and Dark Theme QA

Check both themes independently.

Inspect:

- Background contrast
- Surface contrast
- Text hierarchy
- Border visibility
- Card readability
- Button contrast
- Muted text readability
- Image and overlay behavior
- Focus states

Do not assume semantic tokens work correctly without visual inspection.

Check for:
- Hardcoded dark backgrounds
- Invisible borders
- Low-contrast muted text
- Excessive white opacity
- Inconsistent theme transitions

---

## Animation and Motion

Check:

- Animation smoothness
- Visual purpose
- Excessive motion
- Unexpected layout shifts
- Loading behavior
- Hover states
- Reduced-motion behavior

Animation should support:
- Orientation
- Feedback
- Hierarchy
- Navigation

Do not add animation merely to fill empty space.

Avoid:
- Excessive parallax
- Constant movement
- Distracting transitions
- Unnecessary animation on every card

---

## Content and Data Integrity

Check that:

- Mock data is used consistently.
- Placeholder content is clearly marked.
- Missing images have graceful fallbacks.
- Empty states are understandable.
- Dates and locations are formatted consistently.
- No unverified official claims are presented as facts.
- No backend or external API is implied when the feature is only simulated.

Do not modify factual content without confirmation.

---

## Output

Return the findings using the following structure:

### Critical Issues

Issues that materially damage:
- Usability
- Accessibility
- Navigation
- Content comprehension
- Visual quality
- Mobile experience

For each issue, include:
- Location
- Problem
- User impact
- Recommended fix

### High Impact Improvements

Changes that significantly improve:
- First impression
- Information hierarchy
- Conversion to community actions
- Readability
- Responsive experience
- Design consistency

Rank recommendations by impact.

### Minor Polish

Optional refinements such as:
- Small spacing adjustments
- Icon alignment
- Border consistency
- Typography refinements
- Subtle hover improvements

Do not recommend changes simply to make the design more complicated.

### Validation Summary

Include:

- Pages inspected
- Viewports tested
- Themes tested
- Routes tested
- Accessibility checks
- Interaction checks
- Screenshots reviewed
- Remaining limitations

### Final Assessment

Provide a factual readiness assessment:

- Blocked — critical issues remain
- Needs refinement — high-impact issues remain
- Ready for final validation — no significant issues found during the tested scope

Do not claim complete QA if browser inspection or screenshots were unavailable.
Clearly distinguish:
- Verified findings
- Code-based observations
- Untested areas
- Assumptions

---

## Important Rules

1. Review the rendered website, not source code alone.
2. Use screenshots and browser inspection whenever available.
3. Do not invent official ministry information.
4. Do not introduce unnecessary visual effects.
5. Prioritize typography, spacing, hierarchy, and composition.
6. Preserve the Light/Dark Editorial direction.
7. Report limitations honestly.
8. Do not begin unrelated feature development during Visual QA.
9. Do not add backend, CMS, authentication, or database functionality.
10. Focus on actionable improvements ranked by impact.