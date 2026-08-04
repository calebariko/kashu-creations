import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleField() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.innerWidth < 768
    const PARTICLE_COUNT = isMobile ? 300 : 800

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = 2

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const phases = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3
      sizes[i] = 0.008 + Math.random() * 0.01
      phases[i] = Math.random() * Math.PI * 2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.015,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    let frameId
    let time = 0

    const animate = () => {
      time += 0.016
      const posAttr = geometry.attributes.position

      // approximate mouse position in world space at z=0
      const mouseWorld = new THREE.Vector3(mouse.x * 3.2, mouse.y * 2, 0)

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3
        let y = posAttr.array[ix + 1]
        let x = posAttr.array[ix]
        const z = posAttr.array[ix + 2]

        y += 0.001
        if (y > 3) y = -3

        x += Math.sin(time + phases[i]) * 0.0002

        const dx = x - mouseWorld.x
        const dy = y - mouseWorld.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 1.5 && dist > 0.0001) {
          const force = 0.003 / dist
          x += (dx / dist) * force
          y += (dy / dist) * force
        }

        posAttr.array[ix] = x
        posAttr.array[ix + 1] = y
        posAttr.array[ix + 2] = z
      }

      posAttr.needsUpdate = true
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    animate()

    const onResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
    />
  )
}
