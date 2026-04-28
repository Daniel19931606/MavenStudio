import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Hero3D = () => {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // [OBSIDIAN-SILK-SHADER]
    const silkVertex = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const silkFragment = `
      uniform float time;
      uniform vec2 mouse;
      varying vec2 vUv;

      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        p.x *= 1.5;
        float val = 0.0;
        for(float i = 1.0; i < 5.0; i++) {
          p.x += 0.3 / i * sin(i * 1.2 * p.y + time * 0.12 + mouse.x * 1.2);
          p.y += 0.3 / i * cos(i * 1.2 * p.x + time * 0.12 + mouse.y * 1.2);
          val += sin(p.x * 1.5 + p.y * 1.5);
        }
        float sheen = pow(abs(val) * 0.18, 4.0);
        vec3 color = vec3(0.012, 0.012, 0.018) + vec3(0.35, 0.4, 0.5) * sheen;
        float d = length(vUv - 0.5);
        color *= smoothstep(1.2, 0.1, d);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const planeGeo = new THREE.PlaneGeometry(100, 100);
    const silkMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: silkVertex,
      fragmentShader: silkFragment,
      transparent: true
    });
    const backgroundMesh = new THREE.Mesh(planeGeo, silkMat);
    backgroundMesh.position.z = -20;
    scene.add(backgroundMesh);

    // [INTERACTIVE-PARTICLES-SHADER]
    const particlesVertex = `
      uniform float time;
      uniform vec2 mouse;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vOpacity;

      void main() {
        vColor = color;
        vec3 pos = position;
        
        // Mouse interaction logic
        vec2 m = mouse * 20.0; // Scale mouse to scene coords
        float dist = distance(pos.xy, m);
        float force = smoothstep(6.0, 0.0, dist);
        
        // Push away
        vec2 dir = normalize(pos.xy - m + 0.001);
        pos.xy += dir * force * 2.0;
        
        // Subtle float
        pos.x += sin(time * 0.5 + position.y) * 0.2;
        pos.y += cos(time * 0.5 + position.x) * 0.2;

        vOpacity = 0.4 + force * 0.6; // Light up near mouse

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = 40.0 * (1.0 / -mvPosition.z) * (1.0 + force * 0.5);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const particlesFragment = `
      varying vec3 vColor;
      varying float vOpacity;
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.1, d) * vOpacity;
        gl_FragColor = vec4(vColor, alpha);
      }
    `;

    const particlesCount = 6000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 40;
      if (i % 3 === 0) {
        colorArray[i] = 0.8 + Math.random() * 0.2;
        colorArray[i + 1] = 0.8 + Math.random() * 0.2;
        colorArray[i + 2] = 0.9 + Math.random() * 0.1;
      }
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: particlesVertex,
      fragmentShader: particlesFragment,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    const mouseLight = new THREE.PointLight(0x4488ff, 20, 25);
    scene.add(mouseLight);

    camera.position.z = 10;

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5);
      mouseY = (e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      silkMat.uniforms.time.value = time;
      silkMat.uniforms.mouse.value.set(mouseX, mouseY);

      particlesMat.uniforms.time.value = time;
      particlesMat.uniforms.mouse.value.set(mouseX * 1.5, -mouseY * 1.5); // Adjusted scale for particles

      mouseLight.position.set(mouseX * 15, -mouseY * 15, 5);
      particlesMesh.rotation.z = time * 0.005;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0 bg-black" />;
};

export default Hero3D;
