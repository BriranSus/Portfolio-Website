import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { WATER_VERT, WATER_FRAG } from "./shaders/waterShaders";
import { SEDIMENT_VERT, SEDIMENT_FRAG } from "./shaders/sedimentShaders";
import { BUBBLE_VERT, BUBBLE_FRAG } from "./shaders/bubbleShaders";
import { FLOOR_VERT, FLOOR_FRAG } from "./shaders/floorShaders";
import { FLOOR_RX, getTerrainElevation, getFloorHeight } from "./terrain/oceanTerrain";
import { createPRNG } from "./utils/prng";
import { loadGLTF, scatterStatic, disposeGroup } from "./utils/modelUtils";

export function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fn = () => {
      const scrollMax = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const sc = window.scrollY / scrollMax;
      scrollRef.current = sc;
      setScrollProgress(Math.min(1, Math.max(0, sc)));
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    let W = window.innerWidth,
      H = window.innerHeight;

    /* ── Renderer ─────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x0a2a6e, 1);

    /* ── Scene ───────────────────────────────────────────────── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a2a6e, 0.007);

    /* ── Camera ──────────────────────────────────────────────── */
    const camera = new THREE.PerspectiveCamera(70, W / H, 0.05, 500);
    camera.position.set(0, 4, 10);

    /* ── Lights ────────────────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0x1e4f8a, 1.5));
    const sunPt = new THREE.DirectionalLight(0x40e0d0, 2.5);
    sunPt.position.set(10, 30, 15);
    scene.add(sunPt);
    const deepPt = new THREE.PointLight(0x00f5c4, 1.2, 100);
    deepPt.position.set(-8, -12, -8);
    scene.add(deepPt);
    const midPt = new THREE.PointLight(0x3b82f6, 1.0, 80);
    midPt.position.set(6, -6, 4);
    scene.add(midPt);

    /* ── Water surface (seen from below) ─────────────────────── */
    const waterMat = new THREE.ShaderMaterial({
      vertexShader: WATER_VERT,
      fragmentShader: WATER_FRAG,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const waterGeo = new THREE.PlaneGeometry(80, 80, 80, 80);
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = 8;
    scene.add(waterMesh);

    /* ── Sediment particles ──────────────────────────────────── */
    const SED_COUNT = 50;
    const sedPos = new Float32Array(SED_COUNT * 3);
    const sedSizes = new Float32Array(SED_COUNT);
    const sedPhases = new Float32Array(SED_COUNT);
    for (let i = 0; i < SED_COUNT; i++) {
      sedPos[i * 3] = (Math.random() - 0.5) * 28;
      sedPos[i * 3 + 1] = (Math.random() - 0.5) * 30 - 5;
      sedPos[i * 3 + 2] = (Math.random() - 0.5) * 18;
      sedSizes[i] = 0.8 + Math.random() * 2.2;
      sedPhases[i] = Math.random() * Math.PI * 2;
    }
    const sedGeo = new THREE.BufferGeometry();
    sedGeo.setAttribute("position", new THREE.BufferAttribute(sedPos, 3));
    sedGeo.setAttribute("aSize", new THREE.BufferAttribute(sedSizes, 1));
    sedGeo.setAttribute("aPhase", new THREE.BufferAttribute(sedPhases, 1));
    const sedMat = new THREE.ShaderMaterial({
      vertexShader: SEDIMENT_VERT,
      fragmentShader: SEDIMENT_FRAG,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(sedGeo, sedMat));

    /* ── Rising bubbles ──────────────────────────────────────── */
    const BUB_COUNT = 5;
    const bubPos = new Float32Array(BUB_COUNT * 3);
    const bubSizes = new Float32Array(BUB_COUNT);
    const bubPhases = new Float32Array(BUB_COUNT);
    const bubSpeeds = new Float32Array(BUB_COUNT);
    for (let i = 0; i < BUB_COUNT; i++) {
      bubPos[i * 3] = (Math.random() - 0.5) * 26;
      bubPos[i * 3 + 1] = (Math.random() - 0.5) * 26 - 5;
      bubPos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      bubSizes[i] = 2 + Math.random() * 0.5; // Larger stylized sizes
      bubPhases[i] = Math.random() * Math.PI * 2;
      bubSpeeds[i] = 0.45 + Math.random() * 1.0;
    }
    const bubGeo = new THREE.BufferGeometry();
    bubGeo.setAttribute("position", new THREE.BufferAttribute(bubPos, 3));
    bubGeo.setAttribute("aSize", new THREE.BufferAttribute(bubSizes, 1));
    bubGeo.setAttribute("aPhase", new THREE.BufferAttribute(bubPhases, 1));
    bubGeo.setAttribute("aSpeed", new THREE.BufferAttribute(bubSpeeds, 1));
    const bubMat = new THREE.ShaderMaterial({
      vertexShader: BUBBLE_VERT,
      fragmentShader: BUBBLE_FRAG,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(bubGeo, bubMat));

    /* ── Ocean floor terrain ─────────────────────────────────── */
    const floorMat = new THREE.ShaderMaterial({
      vertexShader: FLOOR_VERT,
      fragmentShader: FLOOR_FRAG,
      uniforms: { uTime: { value: 0 } },
    });

    const floorGeo = new THREE.PlaneGeometry(300, 300, 100, 100);
    const posAttr = floorGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const px = posAttr.getX(i);
      const py = posAttr.getY(i);
      const elev = getTerrainElevation(px, py);
      posAttr.setZ(i, elev);
    }
    floorGeo.computeVertexNormals();

    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = FLOOR_RX;
    floorMesh.position.y = -26;
    scene.add(floorMesh);

    /* ── GLTF decorations — rocks, coral, kelp, fish ────────── */
    const rocksGroup = new THREE.Group();
    const coralGroup = new THREE.Group();
    const kelpGroup = new THREE.Group();
    const fishGroup = new THREE.Group();
    scene.add(rocksGroup, coralGroup, kelpGroup, fishGroup);

    const kelpTimeUniform = { value: 0 };
    const fishMixers: THREE.AnimationMixer[] = [];
    const fishData: {
      obj: THREE.Object3D;
      centerX: number;
      centerZ: number;
      baseY: number;
      radiusX: number;
      radiusZ: number;
      speed: number;
      phase: number;
    }[] = [];

    (async () => {
      try {
        const [rockGltf, coralGltf, kelpGltf, fishGltf, goldfishGltf] = await Promise.all([
          loadGLTF("/models/Rock by Quaternius - RtLRqYjfMs.glb"),
          loadGLTF("/models/Coral by Poly by Google - 4KUXdtDdgHR.glb"),
          loadGLTF("/models/Kelp by Poly by Google - 4cFllH6Iazk.glb"),
          loadGLTF("/models/Fish by Quaternius - BEcU9rjiAq.glb"),
          loadGLTF("/models/Goldfish by Poly by Google - 3GPUntjwqCa.glb"),
        ]);

        const randRock = createPRNG(101);
        const randCoral = createPRNG(202);
        const randKelp = createPRNG(303);
        const randFish = createPRNG(404);

        scatterStatic(
          rockGltf.scene,
          40,
          { xMin: -150, xMax: 150, zMin: -90, zMax: 45 },
          [4.5, 14.0],
          rocksGroup,
          randRock
        );

        scatterStatic(
          coralGltf.scene,
          45,
          { xMin: -120, xMax: 120, zMin: -80, zMax: 35 },
          [2.8, 7.0],
          coralGroup,
          randCoral
        );

        // Kelp — sway via onBeforeCompile, planted flush in floor patches with fixed seed
        const kelpTemplate = kelpGltf.scene;
        kelpTemplate.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
            mat.onBeforeCompile = (shader) => {
              shader.uniforms.uTime = kelpTimeUniform;
              shader.vertexShader = "uniform float uTime;\n" + shader.vertexShader;
              shader.vertexShader = shader.vertexShader.replace(
                "#include <begin_vertex>",
                `#include <begin_vertex>
                float phase = modelMatrix[3].x * 0.5 + modelMatrix[3].z * 0.7;
                float sway = sin(uTime * 1.1 + phase + position.y * 0.5) * 0.18 * clamp(position.y * 0.25, 0.0, 1.0);
                transformed.x += sway;
                transformed.z += sway * 0.4;`
              );
            };
            mesh.material = mat;
          }
        });

        for (let patch = 0; patch < 9; patch++) {
          const cx = -130 + randKelp() * 260;
          const cz = -70 + randKelp() * 110;
          const stalks = 6 + Math.floor(randKelp() * 6);
          for (let i = 0; i < stalks; i++) {
            const z = cz + (randKelp() - 0.5) * 10;
            const x = cx + (randKelp() - 0.5) * 10;
            const floorPt = getFloorHeight(x, z);
            const wrapper = new THREE.Group();
            wrapper.position.set(x, floorPt.y, floorPt.z);
            wrapper.rotation.x = FLOOR_RX + Math.PI / 2;

            const k = kelpTemplate.clone(true);
            k.rotation.y = randKelp() * Math.PI * 2;
            k.scale.setScalar(2.0 + randKelp() * 2.2);
            wrapper.add(k);
            kelpGroup.add(wrapper);
          }
        }

        // Fish school orbiting far deep in the background horizon with fixed seed
        const fishModels = [fishGltf, goldfishGltf];
        for (let i = 0; i < 36; i++) {
          const modelGltf = fishModels[i % fishModels.length];
          const fish = SkeletonUtils.clone(modelGltf.scene);
          fish.scale.setScalar(0.25 + randFish() * 0.35);
          fishGroup.add(fish);

          if (modelGltf.animations?.length) {
            const mixer = new THREE.AnimationMixer(fish);
            mixer.clipAction(modelGltf.animations[0]).play();
            fishMixers.push(mixer);
          }

          fishData.push({
            obj: fish,
            centerX: (randFish() - 0.5) * 200,
            centerZ: -180 - randFish() * 140, // pushed way back to z = -180 -> -320
            baseY: -16 - randFish() * 22,
            radiusX: 20 + randFish() * 30,
            radiusZ: 12 + randFish() * 22,
            speed: 0.08 + randFish() * 0.08,
            phase: randFish() * Math.PI * 2,
          });
        }
      } catch (err) {
        console.warn("GLTF models load error:", err);
      }
    })();

    /* ── Depth color targets ──────────────────────────────────── */
    const surfaceColor = new THREE.Color(0x0d3a9e);
    const deepColor = new THREE.Color(0x041640);
    const fogColor = new THREE.Color();
    const bgColor = new THREE.Color();

    /* ── Resize ──────────────────────────────────────────────── */
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    /* ── Animation loop ──────────────────────────────────────── */
    const clock = new THREE.Clock();
    let tAccum = 0;
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      tAccum += delta;
      const t = tAccum;
      const sc = scrollRef.current;
      const mx = mouseRef.current.x;

      waterMat.uniforms.uTime.value = t;
      sedMat.uniforms.uTime.value = t;
      bubMat.uniforms.uTime.value = t;
      floorMat.uniforms.uTime.value = t;
      kelpTimeUniform.value = t;

      fishMixers.forEach((m) => m.update(delta));
      fishData.forEach((f) => {
        const x = f.centerX + Math.cos(t * f.speed + f.phase) * f.radiusX;
        const z = f.centerZ + Math.sin(t * f.speed + f.phase) * f.radiusZ;
        const nx = f.centerX + Math.cos((t + 0.05) * f.speed + f.phase) * f.radiusX;
        const nz = f.centerZ + Math.sin((t + 0.05) * f.speed + f.phase) * f.radiusZ;
        f.obj.position.set(x, f.baseY + Math.sin(t * 0.4 + f.phase) * 0.6, z);
        f.obj.lookAt(nx, f.obj.position.y, nz);
      });

      const scEased = 0.25 + sc * 0.75;
      const bedrockColor = new THREE.Color(0x010816);

      if (sc > 0.55) {
        // Smooth fade to 100% solid deep dark navy blue-black as camera descends into seabed
        const sedimentFactor = Math.min(1, (sc - 0.55) / 0.35);
        bgColor.lerpColors(surfaceColor, deepColor, scEased).lerp(bedrockColor, sedimentFactor);
        fogColor.lerpColors(surfaceColor, deepColor, scEased).lerp(bedrockColor, sedimentFactor);
        (scene.fog as THREE.FogExp2).density = 0.007 + sedimentFactor * 0.035;
      } else {
        bgColor.lerpColors(surfaceColor, deepColor, scEased);
        fogColor.lerpColors(surfaceColor, deepColor, scEased);
        (scene.fog as THREE.FogExp2).density = 0.007;
      }

      renderer.setClearColor(bgColor, 1);
      (scene.fog as THREE.FogExp2).color.copy(fogColor);

      // Descend camera deeper down to -32m directly into seabed floor bedrock at Contact
      const tgY = 4 - sc * 36;
      const tgZ = 10 - sc * 4;
      const tgX = (mx - 0.5) * -3.5;
      camera.position.x += (tgX - camera.position.x) * 0.04;
      camera.position.y += (tgY - camera.position.y) * 0.04;
      camera.position.z += (tgZ - camera.position.z) * 0.04;

      // Look straight ahead level at the deep ocean horizon / subsea base
      camera.lookAt(camera.position.x * 0.3, camera.position.y, camera.position.z - 20);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      waterMat.dispose();
      sedMat.dispose();
      bubMat.dispose();
      floorMat.dispose();
      waterGeo.dispose();
      sedGeo.dispose();
      bubGeo.dispose();
      floorGeo.dispose();
      disposeGroup(rocksGroup);
      disposeGroup(coralGroup);
      disposeGroup(kelpGroup);
      disposeGroup(fishGroup);
    };
  }, []);

  return (
    <>
      {/* 3D WebGL Ocean Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: 0, background: "#0a2a6e" }}
      />
      {/* Animated Solid Navy-Black Overlay (Placed directly on top of 3D Canvas, below content & HUD) */}
      <div
        className="fixed inset-0 pointer-events-none bg-[#000611] transition-opacity duration-700 ease-out"
        style={{
          zIndex: 0,
          opacity: scrollProgress < 0.55 ? 0 : Math.min(1, (scrollProgress - 0.55) / 0.35),
        }}
      />
    </>
  );
}
