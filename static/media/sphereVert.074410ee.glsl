uniform int spin;
varying float spinCoefficients[MAX_SIZE];
varying vec4 vPos;

void main() {
    // Get position in absolute space
    vPos = modelMatrix * vec4(position, 1.0);

    float spin_f = 0.5 * float(spin-1);

    // Compute coefficients of coherent state in the spin basis.
    float z = vPos.y;
    float pow_2 = pow(2., -spin_f);

    int binom = 1;
    for (int n = 0; n < MAX_SIZE; n++) {
        float n_f = float(n);
        float beta = 0.5 * n_f;
        float alpha = max(spin_f - beta, 0.0);

        spinCoefficients[n] = pow_2 * sqrt(float(binom)) * pow(1.-z, alpha) * pow(1.+z, beta);

        binom *= spin-1 - n;
        binom /= n+1;
    }

    gl_Position = projectionMatrix * viewMatrix * vPos;
}
