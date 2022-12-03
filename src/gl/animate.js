import {
    zeros,
    identity, subset, index,
    multiply, add,
    complex, inv
} from 'mathjs';

function normalizeWavefunction(uniforms) {
    // Normalize spin components
    const spin = uniforms.spin.value;
    const amplitudes = uniforms.spinComponents.value;

    let total = 0;
    for (let i = 0; i < spin; i++) {
        const probability = amplitudes[i].lengthSq();
        total += probability;
    }
    total = Math.sqrt(total + 1e-3);

    for (let i = 0; i < spin; i++) {
        amplitudes[i].x /= total;
        amplitudes[i].y /= total;
    }
}

function expm(n, H) {
    // Crank-Nicolson approximation
    const I = identity(n);
    return multiply(
        inv(add(I, multiply(-0.5, H))),
        add(I, multiply(0.5, H))
    );
}

// Spin operators
function Sx(n, strength) {
    const H = zeros(n, n);
    const s = (n-1)/2;
    for (let a = 1; a < n; a++) {
        const v = strength * 0.5 * Math.sqrt(2*a*(s+1) - a*(a+1));
        H.subset(index(a-1, a), v);
        H.subset(index(a, a-1), v);
    }
    return H;
}

let cached_params = [undefined, undefined, undefined, undefined];
let cached_propagator = undefined;

function propagate(uniforms, dt) {
    const spin = uniforms.spin.value;
    const amplitudes = uniforms.spinComponents.value;

    const drive = uniforms.drive.value;
    const detuning = uniforms.detuning.value;
    const squeezing = uniforms.squeezing.value;

    let M = undefined;

    if (spin === cached_params[0]
        & drive === cached_params[1]
        & detuning === cached_params[2]
        & squeezing === cached_params[3]
    ) {
        M = cached_propagator;
    } else {
        console.log('Cache miss');
        const H = Sx(spin, drive);

        // Add dynamical phase and squeezing operators
        for (let i = 0; i < spin; i++) {
            const omega = i - (spin-1)/2;
            H.subset(index(i, i), detuning * omega + squeezing * omega**2); // Set diagonal entry
        }

        // Compute matrix exponential
        M = expm(spin, multiply(complex(0, -dt), H));
        cached_params = [spin, drive, detuning, squeezing];
        cached_propagator = M;
    }

    const initial = amplitudes.slice(0, spin).map(
        ({x, y}) => complex(x, y)
    );
    const output = multiply(M, initial);

    // Write final coefficients and normalize
    for (let i = 0; i < spin; i++) {
        const el = subset(output, index(i));
        amplitudes[i].x = el.re;
        amplitudes[i].y = el.im;
    }
    normalizeWavefunction(uniforms);
}

export default function animate(ctx, setUniforms) {
    const {renderer, scene, camera, controls, uniforms} = ctx;
    requestAnimationFrame(() => animate(ctx, setUniforms));
    if (ctx === null) {return;}

    // Render scene
    renderer.render(scene, camera);
    controls.update();

    const time = performance.now()
    if (ctx.lastTime !== undefined) {
//        const dt = 1e-3 * (time - ctx.lastTime);
        const dt = 1/30;
        propagate(uniforms, dt);
        setUniforms({...uniforms});
    }
    ctx.lastTime = time;
};
