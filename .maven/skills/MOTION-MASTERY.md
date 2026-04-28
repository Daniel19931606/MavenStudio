# MOTION MASTERY: KINETIC SUPREMACY

## 1. KINETIC TYPOGRAPHY
- **Scrubbing:** Bind text properties (font-weight, letter-spacing, skew) to the scroll position using GSAP ScrollTrigger.
- **Split Text:** Animate lines, words, and characters independently to create "shattering" or "assembling" effects.

## 2. SECTION PINNING
- **Technique:** Use `pin: true` to hold sections in place while internal elements (images/videos) morph or scroll horizontally.
- **Overlap:** Next sections should "wipe" over the previous ones using high-index layering.

## 3. SPRING DYNAMICS (ADVANCED)
- **Tension:** 120, **Friction:** 14 (The "Aggressive Snap").
- **Tension:** 40, **Friction:** 20 (The "Deep Float").
- **Rule:** Use Aggressive Snap for UI interactions and Deep Float for background/ambient motion.

## 4. CURSOR INTERACTION
- **Magnetism:** 30px influence radius. 
- **Inversion:** Cursor should invert color when over high-contrast elements.
- **Trailer:** Add a delayed "ghost" trailer to the cursor for fluid motion trails.
