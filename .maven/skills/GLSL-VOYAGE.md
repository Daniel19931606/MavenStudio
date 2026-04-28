# GLSL VOYAGE: ADVANCED VISUAL DISTORTION

## 1. LENS MORPHING
- **Distortion:** Implement radial lens distortion in the fragment shader to create a "fisheye" feel at the screen corners.
- **Aberration:** Dynamic RGB Shift based on distance from the center.

## 2. ANALOG TEXTURE
- **Grain Persistence:** Use a persistent noise seed that shifts slightly with `u_time` but maintains structural integrity.
- **Dithering:** High-frequency Bayer dithering for smooth gradients in dark tones.

## 3. LIGHTING COMPLEXITY
- **Specular Highlights:** Calculate light reflection using `dot(normal, viewDirection)` to create metallic "shimmer" on the noise waves.
- **Refraction:** Simulate light passing through the "void" using coordinate offsetting.

## 4. SHADER INTEGRATION
- **Post-FX:** Always wrap the scene in a post-processing pass (even if emulated in a single shader) to unify UI and Background.
