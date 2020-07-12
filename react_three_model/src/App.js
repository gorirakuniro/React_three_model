import React, { useRef, Suspense } from 'react'
import { Canvas, useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import './style.css';

const LoadModel = ({ position }) => {
  const mesh = useRef(null)
  const gltf = useLoader(GLTFLoader, "/wor.glb")
  useFrame(() => (mesh.current.rotation.y += 0.02))
  return (
    <primitive
      position={position}
      ref={mesh}
      object={gltf.scene} dispose={null} />
  )
}

const UseModel = () => {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.3} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 100, -20]} intensity={0.5} />
      <pointLight position={[0, 0, -20]} intensity={1.5} />

      <LoadModel position={[0, -2, -3]} />
    </Suspense>
  )
}

function App() {
  return (
    <Canvas
      className="canvas"
      camera={{ position: [-5, 2, 10], fov: 60 }}
    >
      <mesh>
        <UseModel />
      </mesh>
    </Canvas>
  );
}

export default App;
