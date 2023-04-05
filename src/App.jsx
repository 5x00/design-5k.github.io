import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import styled from 'styled-components';
import Model from './components/Model.jsx';
import * as THREE from "three";
import {
  EffectComposer,
  BrightnessContrast,
  Bloom,
  SMAA,
  SSAO  
} from "@react-three/postprocessing";
import { BlendFunction, Resizer, KernelSize } from 'postprocessing'

import './App.css'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

console.log("screen size : " + sizes.width + " / " + sizes.height);

function App() {
  return (
    <Wrapper className="App">
      <Canvas className="canvas" camera={{ position : [ 0, 1, 3 ], rotation : [ -0.08, 0, 0 ], fov: 13.7 }}>
      <Suspense fallback={null}>
        <EffectComposer multisampling={0} disableNormalPass={true}>
          <BrightnessContrast
            brightness={0.05} // brightness. min: -1, max: 1
            contrast={0.15} // contrast: min -1, max: 1
          />
          <Bloom
            intensity={0.4} // The bloom intensity.
            blurPass={undefined} // A blur pass.
            width={Resizer.AUTO_SIZE} // render width
            height={Resizer.AUTO_SIZE} // render height
            kernelSize={KernelSize.LARGE} // blur kernel size
            luminanceThreshold={0.8} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0.1} // smoothness of the luminance threshold. Range is [0, 1]
          />
          <SMAA />
          <SSAO
            blendFunction={BlendFunction.MULTIPLY} // blend mode
            samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
            rings={4} // amount of rings in the occlusion sampling pattern
            distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
            distanceFalloff={0.0} // distance falloff. min: 0, max: 1
            rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
            rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
            luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
            radius={20} // occlusion sampling radius
            scale={0.5} // scale of the ambient occlusion
            bias={0.5} // occlusion bias
          />
        </EffectComposer>
        </Suspense>
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model></Model>
        </Suspense>
      </Canvas>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  canvas {
    background: #000000;
    height: 1280px;
    position: relative;
  }
`;

export default App
