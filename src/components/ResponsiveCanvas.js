import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';

import { InlineMath } from 'react-katex';

import useWindowSize from 'hooks/windowResize';


export default function ResponsiveCanvas({onInit, onResize, animate, initUniforms}) {
    const {width, height} = useWindowSize('canvas-container');
    const [ctx, setCtx] = useState(null);

    useEffect(() => {
        (async function() {
            const ctx = await onInit();
            setCtx(ctx);
            initUniforms(ctx.uniforms);
            animate(ctx);
        })();
    }, [onInit, animate, initUniforms]);
    useEffect(() => {onResize(ctx, width, height);}, [onResize, ctx, width, height]);

    return <div id='canvas-container' className={css`
        flex-grow: 1;
        overflow: hidden;
        position: relative;
    `}>
        <div className={css`
            position: absolute;
            top: 32px;
            left: 32px;
            color: white;
            opacity: 0.8;
            z-index: 2;

            font-size: 24px;

            @media (max-width: 1000px) {
                font-size: 20px;
                top: 16px;
                left: 16px;
            }
        `}><InlineMath>Q(\theta, \phi) \propto |\langle\theta, \phi \, | \, \psi\rangle|^2</InlineMath></div>
        <canvas
        id='main'
        width={width} height={height}
        className={css`
            display: block;
        `}
    /></div>;
};
