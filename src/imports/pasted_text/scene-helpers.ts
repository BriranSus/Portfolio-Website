/* ── Loader & helper ───────────────────────────────────────── */
    const gltfLoader = new GLTFLoader();
    const loadGLTF = (url: string) =>
      new Promise<any>((resolve, reject) => gltfLoader.load(url, resolve, undefined, reject));

    function scatterStatic(
      template: THREE.Object3D,
      count: number,
      area: { xMin: number; xMax: number; zMin: number; zMax: number },
      scaleRange: [number, number],
      yBase: number,
      group: THREE.Group
    ) {
      for (let i = 0; i < count; i++) {
        const inst = template.clone(true);
        const s = scaleRange[0] + Math.random() * (scaleRange[1] - scaleRange[0]);
        inst.scale.setScalar(s);
        inst.position.set(
          area.xMin + Math.random() * (area.xMax - area.xMin),
          yBase,
          area.zMin + Math.random() * (area.zMax - area.zMin)
        );
        inst.rotation.y = Math.random() * Math.PI * 2;
        group.add(inst);
      }
    }

    function disposeGroup(group: THREE.Group) {
      group.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.geometry?.dispose();
          (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((m) => m?.dispose());
        }
      });
    }

    const rocksGroup = new THREE.Group();
    const coralGroup = new THREE.Group();
    const kelpGroup  = new THREE.Group();
    const fishGroup  = new THREE.Group();
    scene.add(rocksGroup, coralGroup, kelpGroup, fishGroup);

    const kelpTimeUniform = { value: 0 };
    const fishMixers: THREE.AnimationMixer[] = [];
    const fishData: {
      obj: THREE.Object3D; centerX: number; centerZ: number; baseY: number;
      radiusX: number; radiusZ: number; speed: number; phase: number;
    }[] = [];

    (async () => {
      try {
        const [rockGltf, coralGltf, kelpGltf, fishGltf] = await Promise.all([
          loadGLTF('/models/rock_01.glb'),
          loadGLTF('/models/coral_01.glb'),
          loadGLTF('/models/kelp_01.glb'),
          loadGLTF('/models/fish_01.glb'),
        ]);

        /* Rocks — kecil sampai besar, tersebar di floor (floor kamu 300x120, sesuaikan area) */
        scatterStatic(rockGltf.scene, 25,
          { xMin: -140, xMax: 140, zMin: -55, zMax: 55 }, [1.5, 6], -26, rocksGroup);

        /* Coral — lebih rapat, ukuran lebih kecil */
        scatterStatic(coralGltf.scene, 30,
          { xMin: -100, xMax: 100, zMin: -40, zMax: 40 }, [0.8, 2.2], -26, coralGroup);

        /* Kelp forest — dikasih sway shader via onBeforeCompile, ditanam per-patch */
        const kelpTemplate = kelpGltf.scene;
        kelpTemplate.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
            mat.onBeforeCompile = (shader) => {
              shader.uniforms.uTime = kelpTimeUniform; // shared → update sekali per frame, semua kelp ikut
              shader.vertexShader = 'uniform float uTime;\n' + shader.vertexShader;
              shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                #include <begin_vertex>
                float phase = modelMatrix[3].x * 0.5 + modelMatrix[3].z * 0.7;
                float sway = sin(uTime * 1.1 + phase + position.y * 0.5) * 0.18 * clamp(position.y * 0.25, 0.0, 1.0);
                transformed.x += sway;
                transformed.z += sway * 0.4;
                `
              );
            };
            mesh.material = mat;
          }
        });
        for (let patch = 0; patch < 5; patch++) {
          const cx = -100 + Math.random() * 200;
          const cz = -35 + Math.random() * 70;
          const stalks = 6 + Math.floor(Math.random() * 6);
          for (let i = 0; i < stalks; i++) {
            const k = kelpTemplate.clone(true);
            k.position.set(cx + (Math.random() - 0.5) * 6, -26, cz + (Math.random() - 0.5) * 6);
            k.rotation.y = Math.random() * Math.PI * 2;
            k.scale.setScalar(0.8 + Math.random() * 0.6);
            kelpGroup.add(k);
          }
        }

        /* Fish — school kecil, berenang di kejauhan (Z jauh, animasi via mixer kalau ada) */
        for (let i = 0; i < 18; i++) {
          const fish = SkeletonUtils.clone(fishGltf.scene);
          fish.scale.setScalar(0.4 + Math.random() * 0.3);
          fishGroup.add(fish);

          if (fishGltf.animations?.length) {
            const mixer = new THREE.AnimationMixer(fish);
            mixer.clipAction(fishGltf.animations[0]).play();
            fishMixers.push(mixer);
          }

          fishData.push({
            obj: fish,
            centerX: (Math.random() - 0.5) * 60,
            centerZ: -30 - Math.random() * 40,   // negatif & jauh = "di kejauhan"
            baseY: -6 - Math.random() * 10,
            radiusX: 8 + Math.random() * 12,
            radiusZ: 6 + Math.random() * 10,
            speed: 0.15 + Math.random() * 0.15,
            phase: Math.random() * Math.PI * 2,
          });
        }
      } catch (err) {
        console.error('Gagal load model dekorasi:', err);
      }
    })();