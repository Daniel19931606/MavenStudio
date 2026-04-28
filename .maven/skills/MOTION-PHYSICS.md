# MOTION-PHYSICS: THE LUXURY OF MOVEMENT

## 1. THE LUXURY CURVE
- **Primary Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (Expo.out). 
- **Character:** Sharp, explosive start with an extremely long, buttery deceleration.
- **Usage:** Page transitions, card reveals, text reveals.

## 2. INTERACTIVE MAGNETISM
- **Principle:** UI elements should "feel" the cursor's presence before contact.
- **Physics:** Use Magnetic Button logic (x/y translation = delta * 0.3).
- **Haptics:** Smooth reset to origin using `elastic.out(1, 0.3)`.

## 3. TEMPORAL STAGGERING
- **Rule:** Never reveal items simultaneously.
- **Value:** `stagger: 0.05s` to `0.1s`.
- **Direction:** Always animate from bottom to top or left to right to guide the eye.

## 4. SCROLL KINETICS
- **Engine:** Use `Lenis` for smooth scrolling.
- **Lerp:** Keep lerp between 0.05 and 0.1 for a heavy, mechanical feel.
- **Parallax:** Subtle (10-20%) for background elements to create depth.
