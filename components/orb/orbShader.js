export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // 3D fbm noise (simplex-ish hash)
  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float n = mix(
      mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z
    );
    return n;
  }
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vNormal = normal;
    float amp = 0.08 + uScroll * 0.28;
    float n = fbm(position * 1.5 + uTime * 0.25);
    vec3 displaced = position + normal * (n - 0.5) * amp;
    vPosition = displaced;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uHue;
  varying vec3 vNormal;
  varying vec3 vPosition;

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    float angle = atan(vPosition.y, vPosition.x);
    float band = sin(angle * 3.0 + uTime * 0.4) * 0.5 + 0.5;
    float hue = mod(uHue + band * 0.18 + uScroll * 0.2, 1.0);
    vec3 col = hsv2rgb(vec3(hue, 0.75, 1.0));
    float rim = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.0);
    col += rim * 0.6;
    float fade = smoothstep(0.9, 0.0, length(vPosition) - 0.8);
    gl_FragColor = vec4(col * fade, 1.0);
  }
`;

export const uniforms = () => ({
  uTime:   { value: 0 },
  uScroll: { value: 0 },
  uHue:    { value: 0.7 },
});
