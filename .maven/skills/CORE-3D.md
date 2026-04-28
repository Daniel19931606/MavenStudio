# CORE-3D PROTOCOL: CINEMATIC WEBGL

## 1. RENDERING STANDARDS
- **Output:** Always use `SRGBColorSpace`.
- **Tone Mapping:** Mandatory `ACESFilmicToneMapping`.
- **Power:** Set `powerPreference: "high-performance"`.

## 2. LIGHTING MANIFESTO
- **NO AMBIENT ONLY:** Never rely solely on AmbientLight. Use `EnvironmentMap` (HDR) or `RectAreaLight` for metallic reflections.
- **Micro-Shadows:** Use `ContactShadows` for UI elements to give them weight.

## 3. SHADER AESTHETICS (GLSL)
- **Dithering:** Always add a small amount of noise/grain to fragment shaders to prevent color banding.
- **Organic Flow:** Use Fractal Brownian Motion (FBM) for background fluids.
- **Chromatic Aberration:** Subtle fringe at screen edges (0.01 - 0.02) to simulate high-end optics.

## 4. PERFORMANCE
- **DPR:** Cap device pixel ratio at 2.0 (`Math.min(window.devicePixelRatio, 2)`).
- **Dispose:** Always clean up geometries and materials on component unmount.
