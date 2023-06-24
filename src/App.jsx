import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { GooeyMaterial } from "./components/GooeyMaterial";
import Asia from "./components/Asia";

const App = () => {
  return (
    <>
      <Canvas>
        <Scene />
      </Canvas>
    </>
  );
};

const Scene = () => {
  const $shader = useRef();
  const { viewport } = useThree();

  useFrame((state, delta) => {
    $shader.current.uniforms.uTime.value += delta;
    $shader.current.uniforms.uMouse.value.x =
      (state.pointer.x * viewport.width) / 3;
    $shader.current.uniforms.uMouse.value.y =
      (state.pointer.y * viewport.height) / 3;
  });

  return (
    <>
      <ambientLight />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <gooeyMaterial
          ref={$shader}
          depthWrite={false}
          depthTest={false}
          transparent={true}
          side={THREE.DoubleSide}
          key={GooeyMaterial.key}
        />
      </mesh>
      <color attach={"background"} args={["#fff"]} />
      <Asia />
    </>
  );
};

export default App;
