import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GooeyMaterial } from "./components/GooeyMaterial";
import { motion as m3 } from "framer-motion-3d";
import Apart from "./components/Apart";
import { Loader, PresentationControls } from "@react-three/drei";
import { gsap } from "gsap";
import Overlay from "./components/Overlay";

const App = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Overlay />
        <Canvas>
          <Scene />
        </Canvas>
      </Suspense>
      <Loader />
    </>
  );
};

const Scene = () => {
  const $shader = useRef();
  const { viewport } = useThree();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    $shader.current.uniforms.uTime.value += delta;
  });

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      gsap.to($shader.current.uniforms.uMouse.value, 0.5, {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
        ease: "easeOut",
        duration: 0.1,
      });
    });

    gsap.to($shader.current.uniforms.uScale, {
      value: hovered ? 0.05 : 10,
      duration: 0.6,
      ease: "easeOut",
    });
  }, [hovered]);

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <m3.gooeyMaterial
          ref={$shader}
          depthWrite={false}
          depthTest={false}
          transparent={true}
          side={THREE.DoubleSide}
          key={GooeyMaterial.key}
        />
      </mesh>
      <PresentationControls
        config={{ mass: 2, tension: 100, friction: 30 }}
        snap={{ mass: 0.4, tension: 10, friction: 30 }}
        azimuth={[-1, 0.5]}
        polar={[0, Math.PI / 2]}
      >
        <Apart hovered={hovered} setHovered={setHovered} />
      </PresentationControls>
    </>
  );
};

export default App;
