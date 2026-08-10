// Sediment — tiny suspended particles drifting in current
export const SEDIMENT_VERT = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.x += sin(aPhase        + uTime * 0.18) * 0.35;
    p.y += cos(aPhase * 1.3  + uTime * 0.12) * 0.22;
    p.z += sin(aPhase * 0.7  + uTime * 0.20) * 0.28;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * (180.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
    vAlpha = 0.25 + 0.18 * sin(aPhase + uTime * 0.35);
  }
`;

export const SEDIMENT_FRAG = `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float a = smoothstep(0.5, 0.05, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(0.65, 0.88, 1.0, a);
  }
`;
