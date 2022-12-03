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
        const magnitude = entry.length();

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

function Drive({uniforms, setUniform}) {
    const entries = [
        ['Detuning', 'detuning'],
        ['Drive Strength', 'drive'],
        ['Squeezing', 'squeezing'],
    ];
    if (uniforms.drive === undefined) {return null;}

    const output = [];
    for (let [label, key] of entries) {
        output.push(<div key={key} className={css`
            color: hsl(200, 10%, 30%);
            display: flex;
            flex-direction: row;
            align-items: center;
            
            @media (max-width: 1000px) {
                max-height: 24px;
            }

        `}>
            <span className={css`
                min-width: 120px;
                color: hsl(200, 10%, 15%);
                font-size: 12pt;
                white-space: nowrap;

                @media (max-width: 1000px) {
                    font-size: 11pt;
                }
            `}>
                 {label}
             </span>
             <Slider
                 min={-1} max={1} step={0.25}
                 marks
                 value={uniforms[key]?.value}
                 onChange={(e, v) => setUniform(key, v)}
                 valueLabelDisplay='auto'
             />
        </div>);
    }
    return <>{output}</>;
}

function ObservableEntry({name, value, err, unit}) {
    const numString = `${value.toFixed(3)} \\, \\pm \\, ${err.toFixed(3)}`;
    if (unit === undefined) {
        return <InlineMath>{`\\langle ${name}\\rangle = ${numString}`}</InlineMath>;
    }
    return <InlineMath>{`\\langle ${name}\\rangle = (${numString}) \\, ${unit}`}</InlineMath>;
}


function Observables({spin, amplitudes}) {
    let n = 0;
    for (let i = 0; i < spin; i++) {
        const prob = amplitudes[i].lengthSq();
        n += prob * i;
    }

    let n_err = 0;
    for (let i = 0; i < spin; i++) {
        const prob = amplitudes[i].lengthSq();
        n_err += prob * (i - n)**2;
    }
    n_err = Math.sqrt(n_err);

    return <div className={css`
        display: flex;
        flex-direction: column;
        
        justify-content: space-between;
        min-height: 60px;
    `}>
        <ObservableEntry name='S_z' value={n - (spin-1)/2} err={n_err} unit='\hbar'/>
    </div>
}




export default function Sidebar({uniforms, setUniforms}) {
    const spin = uniforms.spin?.value;
    const atoms = spin - 1;
    const amplitudes = uniforms.spinComponents?.value;

    function setUniform(name, value) {
        uniforms[name].value = value;
        setUniforms({...uniforms});
    }

    function setSpin(value) {
        setUniform('spin', Math.max(2, Math.min(MAX_SPIN, value)));
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
            padding: 22px;

            font-size: 14px;
        }
    `}>
        <div className={css`
            @media (max-width: 1000px) {
                margin-top: -8px;
                margin-bottom: -8px;
                display: flex;
                flex-direction: row;
                align-items: center;
            }
        `}>
            <span className={css`
                white-space: nowrap;
                min-width: 80px;
            `}>{atoms}{atoms > 1 ? ' atoms' : ' atom'}</span>
            <Slider
                value={atoms}
                onChange={(e, v) => setSpin(v+1)}
                step={1}
                min={1}
                max={MAX_SPIN-1}
                marks
            />
        </div>

        <Header>Spin Decomposition</Header>
        <InlineMath>{decomposition(atoms)}</InlineMath>

        <Header>Drive Fields</Header>
        <Drive uniforms={uniforms} setUniform={setUniform}/>

        <div className={css`
            @media (max-width: 1000px) {
                display: none;
            }
        `}>

            <Header>Stretched Representation Amplitudes</Header>
            <Observables spin={spin} amplitudes={amplitudes}/>
            <Amplitudes spin={spin} amplitudes={amplitudes} setAmplitude={setAmplitude}/>
        </div>
    </div>;
};
