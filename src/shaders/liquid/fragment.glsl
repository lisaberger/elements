precision mediump float;
uniform vec3 uColor;
uniform vec3 uColor1;
varying vec2 vUv;
varying vec3 vposition;
varying float vdisplacement;

void main() {
    float mixStrength = (vdisplacement + 0.5) * 2.0; //default 0.25
    vec3 color = mix(uColor, uColor1, mixStrength);

    gl_FragColor = vec4(color, 1.0);
}
