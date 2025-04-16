import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import {
  ScrollControls,
  Scroll,
  Environment,
  OrbitControls,
  useGLTF,
  ContactShadows,
  useScroll,
} from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

function CameraDebugger() {
  const { camera } = useThree();

  useFrame(() => {
    console.log('📷 camera position:', camera.position);
    console.log('🎯 camera rotation:', camera.rotation);
  });

  return null;
}

function WavyPaint() {
  const meshRef = useRef();
  const colorMap = useLoader(TextureLoader, '/textures/Plastic017A_1K-JPG_Color.jpg');
  const normalMap = useLoader(TextureLoader, '/textures/Plastic017A_1K-JPG_NormalGL.jpg');

  useEffect(() => {
    [colorMap, normalMap].forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 4);
    });
  }, [colorMap, normalMap]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const wave = Math.sin((x + t) * 1.5) * 0.1 + Math.cos((y + t) * 1.5) * 0.1;
        pos.setZ(i, wave);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      scale={[1.5, 1.5, 1]}
      receiveShadow
    >
      <planeGeometry args={[20, 20, 128, 128]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        metalness={1}
        roughness={4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FallingFurniture({ onScrollComplete }) {
  const chairRef = useRef();
  const tableGroupRef = useRef();
  const shelfGroupRef = useRef();
  const rackGroupRef = useRef();
  const scroll = useScroll();
  const lastOffset = useRef(0);
  const hasTriggeredCallback = useRef(false);

  const { scene: chair } = useGLTF('/chair.glb');
  const { scene: table } = useGLTF('/table.glb');
  const { scene: shelf } = useGLTF('/shelf.glb');
  const { scene: rack } = useGLTF('/rack.glb');

  useEffect(() => {
    if (chairRef.current) {
      chairRef.current.position.set(6, 10, 0);
      chairRef.current.rotation.set(Math.PI, 0, Math.PI * 0.5);
    }

    if (tableGroupRef.current) {
      tableGroupRef.current.position.set(2, 10, 0);
      tableGroupRef.current.rotation.set(1, 5, 0);
    }

    if (shelfGroupRef.current) {
      shelfGroupRef.current.position.set(-5, 10, -5);
      shelfGroupRef.current.rotation.set(Math.PI * 0.25, Math.PI * 0.5, 0);
    }

    if (rackGroupRef.current) {
      rackGroupRef.current.position.set(-2, 10, 3);
      rackGroupRef.current.rotation.set(Math.PI * 0.15, Math.PI * 0.25, 0);
    }

    [chair, table, shelf, rack].forEach((obj) => {
      obj.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;
        }
      });
    });
  }, [chair, table, shelf, rack]);

  useFrame(() => {
    const offset = scroll.offset;

    if (typeof onScrollUpdate === 'function') {
      onScrollUpdate(offset);
    }

    if (Math.abs(offset - lastOffset.current) > 0.001) {
      chairRef.current.position.y = THREE.MathUtils.lerp(10, 0.3, offset);
      chairRef.current.rotation.x = (1 - offset) * Math.PI;
      chairRef.current.rotation.z = (1 - offset) * Math.PI * 0.5;

      tableGroupRef.current.position.y = THREE.MathUtils.lerp(10, 0.3, offset);
      tableGroupRef.current.rotation.y = THREE.MathUtils.lerp(5, 2, offset);
      tableGroupRef.current.rotation.x = THREE.MathUtils.lerp(1, -5, offset);

      shelfGroupRef.current.position.y = THREE.MathUtils.lerp(10, 0.3, offset);
      shelfGroupRef.current.rotation.y = (1 - offset) * Math.PI * 0.5;
      shelfGroupRef.current.rotation.x = (1 - offset) * Math.PI * 0.25;

      rackGroupRef.current.position.y = THREE.MathUtils.lerp(10, 0.3, offset);
      rackGroupRef.current.rotation.y = (1 - offset) * Math.PI * 0.25;
      rackGroupRef.current.rotation.x = (1 - offset) * Math.PI * 0.15;

      lastOffset.current = offset;

      if (
        offset > 0.95 &&
        !hasTriggeredCallback.current &&
        typeof onScrollComplete === 'function'
      ) {
        console.log('Scroll threshold reached, triggering callback');
        onScrollComplete();
        hasTriggeredCallback.current = true;
      }
    }
  });

  return (
    <>
      <primitive ref={chairRef} object={chair} position={[6, 0.3, 0]} scale={0.1} castShadow />
      <group ref={tableGroupRef} position={[2, 0.3, 0]}>
        <primitive object={table} scale={0.1} castShadow />
      </group>
      <group ref={shelfGroupRef} position={[-5, 0.3, -5]}>
        <primitive object={shelf} scale={3} castShadow />
      </group>
      <group ref={rackGroupRef} position={[-2, 0.3, 3]}>
        <primitive object={rack} scale={3} castShadow />
      </group>
    </>
  );
}

export default function FurnitureScene({ onScrollComplete, onScrollUpdate }) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        shadows
        camera={{ position: [2.54, 18.37, -2.29], fov: 25 }}
        gl={{
          physicallyCorrectLights: true,
          powerPreference: 'high-performance',
          antialias: true,
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <Environment preset="sunset" />
        {/* <CameraDebugger /> */}

        <Suspense fallback={null}>
        <ScrollControls pages={3} damping={0.1}>
  <FallingFurniture
    onScrollComplete={onScrollComplete}
    onScrollUpdate={onScrollUpdate}
  />
</ScrollControls>
          <WavyPaint />
        </Suspense>

        <ContactShadows
          position={[0, 0, 0]}
          opacity={0}
          scale={20}
          blur={1.5}
          far={10}
        />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
