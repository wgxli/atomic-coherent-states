import React from 'react';
import { css } from '@emotion/css';

import Slider from '@material-ui/core/Slider';

import { InlineMath } from 'react-katex';


const MAX_SPIN = 14;


function formatSpin(spin) {
    if (spin === undefined) {return;}

    if (spin % 2 === 0) {
        return (spin/2).toString();
    } else {
        return `${spin}/2`;
    }
}


function Header({children}) {
    return <h2 className={css`
        margin-top: 32px;

        font-size: 14px;
        color: hsl(200, 10%, 40%);
        font-weight: 500;
        letter-spacing: 0.09em;
        text-transform: uppercase;

        @media (max-width: 1000px) {
            font-size: 12px;
            margin-top: 16px;
        }
    `}>{children}</h2>;
}

function decomposition(n) {
    const terms = [];
    let binom = 1;
    for (let k = 0; k <= Math.floor(n/2); k++) {
        if (k > 3) {
            terms.push('\\cdots');
            break;
        }

        const exponent = binom * (n+1-2*k)/(n+1);
        if (exponent > 1) {
            terms.push(`\\mathbf{${n+1-2*k}}^{\\otimes${exponent}}`);
        } else {
            terms.push(`\\mathbf{${n+1-2*k}}`);
        }

        binom *= n+1-k;
        binom /= k+1;
    }
    return `\\mathbf{2}^{\\otimes ${n}} = ` + terms.join('\\oplus');
}


function Amplitudes({spin, amplitudes, setAmplitude}) {
    if (amplitudes === undefined) {return null;}
    const output = [];
    for (let [i, entry] of Object.entries(amplitudes)) {
        if (i > spin - 1) continue;
        const magnitude = Math.hypot(entry.x, entry.y);

        output.push(<div key={i} className={css`
            color: hsl(200, 10%, 30%);
            display: flex;
            flex-direction: row;
        `}>
             <span className={css`min-width: 64px;`}>
                <InlineMath>{`|${i}\\rangle`}</InlineMath>
             </span>
             <Slider
                min={0} max={1} step={0.001}
                value={magnitude}
                onChange={(e, v) => setAmplitude(i, v)}
             />
        </div>);
    }
    return <>{output}</>;
}

function normalizeWavefunction(uniforms) {
    // Normalize spin components
    const spin = uniforms.spin.value;
    const amplitudes = uniforms.spinComponents.value;

    if (amplitudes !== undefined) {
        let total = 0;
        for (let i = 0; i < spin; i++) {
            const probability = amplitudes[i].lengthSq();
            if (probability === 0) {amplitudes[i].x = 1e-3;}
            total += probability;
        }
        total = Math.sqrt(total + 1e-3);

        for (let i = 0; i < spin; i++) {
            amplitudes[i].x /= total;
            amplitudes[i].y /= total;
        }
    }
}


export default function Sidebar({uniforms, setUniforms}) {
    const spin = uniforms.spin?.value;
    const atoms = spin - 1;

    function setSpin(value) {
        uniforms.spin.value = Math.max(2, Math.min(MAX_SPIN, value));
        normalizeWavefunction(uniforms);
        setUniforms({...uniforms});
    }

    function setAmplitude(n, magnitude) {
        const obj = uniforms.spinComponents.value[n];
        const orig = obj.length();
        if (orig === 0) {
            obj.x = magnitude;
            obj.y = 0;
        } else {
            obj.x *= magnitude / orig;
            obj.y *= magnitude / orig;
        }
        normalizeWavefunction(uniforms);
        setUniforms({...uniforms});
    }



    return <div className={css`
        min-width: 400px;
        background-color: white;
        box-shadow: 1px 1px 4px hsla(200, 10%, 10%, 0.1);
        font-size: 18px;
        padding: 32px;

        @media (max-width: 1000px) {
            min-width: unset;
            height: 200px;
            padding: 20px;

            font-size: 14px;
        }
    `}>
        <span>{atoms}{atoms > 1 ? ' atoms' : ' atom'}</span>
        <Slider
            value={atoms}
            onChange={(e, v) => setSpin(v+1)}
            step={1}
            min={1}
            max={MAX_SPIN-1}
        />

        <Header>Spin Decomposition</Header>
        <InlineMath>{decomposition(atoms)}</InlineMath>

        <div className={css`
            @media (max-width: 1000px) {
                display: none;
            }
        `}>
            <Header>Stretched Representation Amplitudes</Header>
            <Amplitudes spin={spin} amplitudes={uniforms.spinComponents?.value} setAmplitude={setAmplitude}/>
        </div>
    </div>;
};
