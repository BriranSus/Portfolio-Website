import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FLOOR_RX, getFloorHeight } from "../terrain/oceanTerrain";

const gltfLoader = new GLTFLoader();

export function loadGLTF(url: string): Promise<GLTF> {
  return new Promise<GLTF>((resolve, reject) =>
    gltfLoader.load(url, resolve, undefined, reject)
  );
}

export function scatterStatic(
  template: THREE.Object3D,
  count: number,
  area: { xMin: number; xMax: number; zMin: number; zMax: number },
  scaleRange: [number, number],
  group: THREE.Group,
  rand: () => number
) {
  for (let i = 0; i < count; i++) {
    const z = area.zMin + rand() * (area.zMax - area.zMin);
    const x = area.xMin + rand() * (area.xMax - area.xMin);
    const floorPt = getFloorHeight(x, z);

    const wrapper = new THREE.Group();
    wrapper.position.set(x, floorPt.y, floorPt.z);
    wrapper.rotation.x = FLOOR_RX + Math.PI / 2;

    const inst = template.clone(true);
    const s = scaleRange[0] + rand() * (scaleRange[1] - scaleRange[0]);
    inst.scale.setScalar(s);
    inst.rotation.y = rand() * Math.PI * 2;
    wrapper.add(inst);

    group.add(wrapper);
  }
}

export function disposeGroup(group: THREE.Group) {
  group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.geometry?.dispose();
      (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(
        (m) => m?.dispose()
      );
    }
  });
}
