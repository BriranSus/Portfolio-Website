export const BUBBLE_VERT = `
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  uniform float uTime;
  varying float vAlpha;
  varying float vPhase;
  varying float vSize;
  
  void main() {
    vPhase = aPhase;
    vec3 p = position;
    float riseAmt = 26.0;
    
    p.y = mod(p.y + uTime * aSpeed, riseAmt) - riseAmt * 0.5;
    p.x += sin(aPhase + uTime * 0.45) * 0.6 + cos(aPhase * 0.5 + uTime * 0.25) * 0.3;
    p.z += cos(aPhase * 1.2 + uTime * 0.35) * 0.5;
    
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * (340.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
    vSize = gl_PointSize;
    
    float depth = clamp((-p.y + 13.0) / 26.0, 0.0, 1.0);
    vAlpha = smoothstep(0.0, 0.15, depth) * smoothstep(1.0, 0.85, depth) * 0.40;
  }
`;

export const BUBBLE_FRAG = `
  uniform float uTime;
  varying float vAlpha;
  varying float vPhase;

  void main() {
    vec2 st = gl_PointCoord - vec2(0.5);
    
    float angle = atan(st.y, st.x);
    float dist = length(st);
    
    float wobble = sin(angle * 3.0 + uTime * 2.8 + vPhase * 4.0) * 0.022
                 + cos(angle * 5.0 - uTime * 1.9 + vPhase) * 0.014;
    float r = dist + wobble;

    if (r > 0.48) discard;

    float edgeMask = smoothstep(0.48, 0.43, r);
    float fresnelRim = smoothstep(0.22, 0.46, r) * smoothstep(0.48, 0.43, r);
    float crispBorder = smoothstep(0.47, 0.44, r) * smoothstep(0.41, 0.44, r);

    vec2 glintPos = st - vec2(-0.14, 0.15);
    float glintDist = length(glintPos);
    float mainGlint = smoothstep(0.12, 0.01, glintDist) * 0.50;
    
    float crescentCut = smoothstep(0.15, 0.02, glintDist) * smoothstep(0.01, 0.09, length(st - vec2(-0.07, 0.08)));
    mainGlint = max(mainGlint, crescentCut * 0.60);

    vec2 secGlintPos = st - vec2(0.14, -0.15);
    float secGlint = smoothstep(0.11, 0.01, length(secGlintPos)) * 0.20;

    float centerSheer = (1.0 - smoothstep(0.0, 0.44, r)) * 0.03;

    float totalAlpha = (fresnelRim * 0.35 + crispBorder * 0.40 + mainGlint + secGlint + centerSheer) * edgeMask * vAlpha;

    vec3 rimColor = mix(vec3(0.0, 0.96, 0.77), vec3(0.35, 0.82, 1.0), sin(angle + uTime * 1.2) * 0.5 + 0.5);
    vec3 glintColor = vec3(0.96, 1.0, 1.0);
    
    vec3 finalColor = mix(rimColor, glintColor, clamp(mainGlint * 1.2 + secGlint, 0.0, 1.0));

    if (totalAlpha < 0.005) discard;
    gl_FragColor = vec4(finalColor, totalAlpha);
  }
`;
