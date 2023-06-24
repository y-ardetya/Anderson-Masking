import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { GooeyMaterial } from "./components/GooeyMaterial";
import Asia from "./components/Asia";
import { motion as m3 } from "framer-motion-3d";

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
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    $shader.current.uniforms.uTime.value += delta;
    $shader.current.uniforms.uMouse.value.x =
      (state.pointer.x * viewport.width) / 2;
    $shader.current.uniforms.uMouse.value.y =
      (state.pointer.y * viewport.height) / 2;
  });

  return (
    <>
      <ambientLight />
      <m3.mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <m3.gooeyMaterial
          ref={$shader}
          depthWrite={false}
          depthTest={false}
          transparent={true}
          side={THREE.DoubleSide}
          key={GooeyMaterial.key}
          initial={{ uScale: 10 }}
          animate={active ? { uScale: 0.05 } : { uScale: 10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </m3.mesh>
      <mesh
        scale={0.5}
        onPointerEnter={() => setActive(true)}
        onPointerLeave={() => setActive(false)}
      >
        <sphereGeometry />
        <meshBasicMaterial color="mediumpurple" />
      </mesh>
      <Asia />
    </>
  );
};

export default App;
