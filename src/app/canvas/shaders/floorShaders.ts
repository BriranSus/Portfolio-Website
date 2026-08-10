// Ocean floor — 3D terrain with highlands, lowlands, slope lighting & caustic shimmer
export const FLOOR_VERT = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vElev;
  void main() {
    vUv = uv;
    vNormal = normalMatrix * normal;
    vElev = position.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const FLOOR_FRAG = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vElev;
  void main() {
    vec3 deepVal   = vec3(0.008, 0.035, 0.14);
    vec3 highHills = vec3(0.04,  0.18,  0.42);
    
    vec3 lightDir = normalize(vec3(0.3, 0.9, 0.4));
    float light = clamp(dot(vNormal, lightDir), 0.15, 1.0);
    
    float t = smoothstep(-10.0, 12.0, vElev);
    vec3 base = mix(deepVal, highHills, t) * (0.35 + 0.65 * light);
    
    float c1 = sin(vUv.x * 16.0 + uTime * 0.28) * sin(vUv.y * 16.0 + uTime * 0.20);
    float c2 = sin((vUv.x + vUv.y) * 10.0 - uTime * 0.35) * 0.6;
    float caustic = clamp((c1 + c2 + 1.8) * 0.22, 0.0, 1.0);
    vec3 lightCol = vec3(0.0, 0.45, 0.68);
    
    gl_FragColor = vec4(base + lightCol * caustic * (0.12 + 0.18 * t), 1.0);
  }
`;
