uniform int spin;
uniform float time;
varying vec4 vPos;

uniform vec2 spinComponents[MAX_SIZE];
varying float spinCoefficients[MAX_SIZE];


vec3 viridis(float x) {
    float r = 0.9973 + x*(-3.8239 + x*(5.5036 + x*-2.4052));
    float g = 0.9075 + x*(-0.3298 + x*(-0.7395 + x*0.1673));
    float b = 0.1444 + x*(1.0508 + x*(-0.1345 + x*-0.7320));
    return vec3(r, g, b);
}

void main() {
    float phi = atan(vPos.x, vPos.z);
    float spin_f = 0.5 * float(spin-1);

    vec2 amplitude = vec2(0., 0.);
    for (int n = 0; n < MAX_SIZE; n++) {
        float omega = float(n) - spin_f;
        float phase = omega * (phi + time);
        amplitude += spinCoefficients[n] * mat2(
            cos(phase), sin(phase),
            -sin(phase), cos(phase)
        ) * spinComponents[n];
    };

    float value = dot(amplitude, amplitude);
    gl_FragColor = vec4(viridis(1. - value), 1.);
}
