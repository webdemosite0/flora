import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

/**
 * A coffee bean built by creasing a sphere: the classic groove is a gaussian
 * indentation along the long axis on both faces.
 */
function useBeanGeometry() {
  return useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 128, 96)
    const pos = geo.attributes.position as THREE.BufferAttribute
    const v = new THREE.Vector3()

    const rx = 0.8
    const ry = 1.25
    const rz = 0.62

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      v.set(v.x * rx, v.y * ry, v.z * rz)

      // Groove: strongest at x = 0, fading toward the tips of the bean.
      const across = Math.exp(-((v.x / 0.2) ** 2))
      const along = Math.max(0, 1 - (v.y / ry) ** 2)
      const depth = 0.5 * across * (0.35 + 0.65 * along)
      v.z -= Math.sign(v.z || 1) * depth * rz

      // Slight taper so the ends are not perfectly round.
      const taper = 1 - 0.12 * (v.y / ry) ** 2
      v.x *= taper

      pos.setXYZ(i, v.x, v.y, v.z)
    }

    pos.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])
}

function Bean({ spin }: { spin: boolean }) {
  const geometry = useBeanGeometry()
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((_, dt) => {
    if (spin && mesh.current) mesh.current.rotation.y += dt * 0.28
  })

  return (
    <mesh ref={mesh} geometry={geometry} rotation={[0.18, 0.5, 0.12]} castShadow>
      <meshStandardMaterial color="#5A3A25" roughness={0.62} metalness={0.06} />
    </mesh>
  )
}

/** The key light tracks the pointer, so moving the mouse re-lights the bean. */
function PointerLight() {
  const light = useRef<THREE.PointLight>(null)
  const { viewport } = useThree()

  useFrame(({ pointer }) => {
    if (!light.current) return
    light.current.position.x += (pointer.x * viewport.width * 0.9 - light.current.position.x) * 0.08
    light.current.position.y += (pointer.y * viewport.height * 0.9 - light.current.position.y) * 0.08
  })

  return <pointLight ref={light} position={[2, 2, 4]} intensity={38} color="#FFE9CE" distance={22} />
}

export default function BeanScene({ interactive }: { interactive: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <ambientLight intensity={0.55} color="#F6EFE4" />
      <directionalLight position={[-3, 4, 2]} intensity={1.6} color="#FFF3E2" />
      <directionalLight position={[3, -2, -3]} intensity={0.5} color="#B4633F" />
      <PointerLight />
      <Bean spin={!interactive} />
      <OrbitControls
        enablePan={false}
        enableZoom={interactive}
        minDistance={2.8}
        maxDistance={7}
        rotateSpeed={0.7}
        dampingFactor={0.08}
        enableDamping
      />
    </Canvas>
  )
}
