import React, { useState } from 'react';
import { css } from '@emotion/css';

import 'katex/dist/katex.min.css';

import ResponsiveCanvas from 'components/ResponsiveCanvas';
import Sidebar from 'components/Sidebar';

import handleInit from 'gl/initialize';
import handleResize from 'gl/resize';
import handleAnimationFrame from 'gl/animate';

function App() {
  const [uniforms, setUniforms] = useState({});

  return <div className={css`
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: row;

        @media (max-width: 1000px) {
             flex-direction: column;
        }
  `}>
        <Sidebar
            uniforms={uniforms}
            setUniforms={setUniforms}
        />
        <ResponsiveCanvas
            onInit={handleInit}
            onResize={handleResize}
            animate={handleAnimationFrame}

            setUniforms={setUniforms}
        />
  </div>;
}

export default App;
