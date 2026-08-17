export const WATER_VERT = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElev;
  void main() {
    vUv = uv;
    vec3 p = position;
    float e = sin(p.x * 1.4 + uTime * 0.9) * 0.5
            + sin(p.y * 1.8 + uTime * 0.6) * 0.38
            + sin((p.x - p.y) * 0.9 + uTime * 1.2) * 0.22
            + sin((p.x * 0.4 + p.y * 0.7) + uTime * 0.4) * 0.15;
    p.z += e;
    vElev = e;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

export const WATER_FRAG = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElev;
  void main() {
    vec3 shallow = vec3(0.08, 0.38, 0.92);
    vec3 deep    = vec3(0.02, 0.14, 0.52);
    float t = smoothstep(-0.6, 0.6, vElev);
    vec3 col = mix(deep, shallow, t);
    float cx = sin(vUv.x * 22.0 + uTime * 0.5) * sin(vUv.y * 18.0 - uTime * 0.4);
    float cy = sin((vUv.x + vUv.y) * 16.0 + uTime * 0.7) * 0.5;
    float caustic = clamp((cx + cy + 2.0) * 0.25, 0.0, 1.0);
    col += shallow * caustic * 0.03;
    float alpha = 0.04 + t * 0.04 + caustic * 0.015;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;
