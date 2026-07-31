import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  OrthographicCamera,
  Points,
  PointsMaterial,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'

export interface BlueprintSceneHandle {
  destroy: () => void
}

const VIEW_H = 48
const RIPPLE_SEGMENTS = 48
const MAX_RIPPLES = 8
const RIPPLE_SPAWN_GAP_MS = 90
const RIPPLE_MIN_MOVE = 14
const RIPPLE_DURATION = 1.35
const RIPPLE_MAX_RADIUS = 7.5

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function buildSparseGrid(size: number, step: number, color: number, opacity: number): LineSegments {
  const half = size / 2
  const positions: number[] = []

  for (let t = -half; t <= half + 0.001; t += step) {
    positions.push(-half, t, 0, half, t, 0)
    positions.push(t, -half, 0, t, half, 0)
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  return new LineSegments(
    geometry,
    new LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
    }),
  )
}

function buildConstruction(color: number): Group {
  const group = new Group()
  const material = new LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
  })

  const positions: number[] = []
  const axis = 22
  positions.push(-axis, 0, 0, axis, 0, 0)
  positions.push(0, -axis, 0, 0, axis, 0)

  const tick = 0.55
  for (const t of [-12, -6, 6, 12]) {
    positions.push(t, -tick, 0, t, tick, 0)
    positions.push(-tick, t, 0, tick, t, 0)
  }

  const r = 14
  const n = 64
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2
    const a1 = ((i + 1) / n) * Math.PI * 2
    positions.push(Math.cos(a0) * r, Math.sin(a0) * r, 0, Math.cos(a1) * r, Math.sin(a1) * r, 0)
  }

  // Inner construction circle + diagonal rays (CAD motif)
  const r2 = 7
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2
    const a1 = ((i + 1) / n) * Math.PI * 2
    positions.push(Math.cos(a0) * r2, Math.sin(a0) * r2, 0, Math.cos(a1) * r2, Math.sin(a1) * r2, 0)
  }
  for (const a of [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4]) {
    positions.push(0, 0, 0, Math.cos(a) * r, Math.sin(a) * r, 0)
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  group.add(new LineSegments(geometry, material))
  return group
}

function createCircleGeometry(radius: number, segments: number): BufferGeometry {
  const positions = new Float32Array(segments * 2 * 3)
  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * Math.PI * 2
    const a1 = ((i + 1) / segments) * Math.PI * 2
    const o = i * 6
    positions[o] = Math.cos(a0) * radius
    positions[o + 1] = Math.sin(a0) * radius
    positions[o + 2] = 0
    positions[o + 3] = Math.cos(a1) * radius
    positions[o + 4] = Math.sin(a1) * radius
    positions[o + 5] = 0
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  return geometry
}

function setCircleRadius(geometry: BufferGeometry, radius: number, segments: number): void {
  const attr = geometry.getAttribute('position')
  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * Math.PI * 2
    const a1 = ((i + 1) / segments) * Math.PI * 2
    const o = i * 2
    attr.setXYZ(o, Math.cos(a0) * radius, Math.sin(a0) * radius, 0)
    attr.setXYZ(o + 1, Math.cos(a1) * radius, Math.sin(a1) * radius, 0)
  }
  attr.needsUpdate = true
}

interface Ripple {
  mesh: LineSegments
  born: number
  x: number
  y: number
}

export function createBlueprintScene(canvas: HTMLCanvasElement): BlueprintSceneHandle {
  const reduced = prefersReducedMotion()
  const scene = new Scene()
  scene.background = new Color(0x0b0f14)

  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
  camera.position.z = 10

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'low-power',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

  const field = new Group()
  scene.add(field)

  const grid = buildSparseGrid(120, 8, 0x3a4658, 0.09)
  field.add(grid)

  const construction = buildConstruction(0x3ddcff)
  construction.position.set(10, -2, 0)
  field.add(construction)
  const constructionMat = (construction.children[0] as LineSegments).material as LineBasicMaterial

  // Vertex markers on construction motif
  const markerPositions: number[] = [0, 0, 0, 14, 0, 0, -14, 0, 0, 0, 14, 0, 0, -14, 0]
  for (const a of [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4]) {
    markerPositions.push(Math.cos(a) * 14, Math.sin(a) * 14, 0)
  }
  const markerGeo = new BufferGeometry()
  markerGeo.setAttribute('position', new Float32BufferAttribute(markerPositions, 3))
  const markers = new Points(
    markerGeo,
    new PointsMaterial({
      color: 0x3ddcff,
      size: 0.35,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
    }),
  )
  construction.add(markers)
  const markerMat = markers.material as PointsMaterial

  const ripplesRoot = new Group()
  scene.add(ripplesRoot)

  const ripples: Ripple[] = []
  const ripplePool: LineSegments[] = []

  const cursorRing = new LineSegments(
    createCircleGeometry(1.2, RIPPLE_SEGMENTS),
    new LineBasicMaterial({
      color: 0x3ddcff,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    }),
  )
  scene.add(cursorRing)
  const cursorMat = cursorRing.material as LineBasicMaterial

  let raf = 0
  let running = true
  let t0 = performance.now()
  let lastSpawn = 0
  let lastClientX = -1
  let lastClientY = -1
  let pointerActive = false
  const pointerWorld = new Vector3()
  const targetPointer = new Vector3()

  const screenToWorld = (clientX: number, clientY: number, out: Vector3) => {
    const ndcX = (clientX / window.innerWidth) * 2 - 1
    const ndcY = -(clientY / window.innerHeight) * 2 + 1
    out.set(ndcX, ndcY, 0).unproject(camera)
    // Ripples live in scene space (not drifting with field)
    out.z = 0
  }

  const acquireRippleMesh = (): LineSegments => {
    const pooled = ripplePool.pop()
    if (pooled) {
      pooled.visible = true
      return pooled
    }
    return new LineSegments(
      createCircleGeometry(0.4, RIPPLE_SEGMENTS),
      new LineBasicMaterial({
        color: 0x3ddcff,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
      }),
    )
  }

  const releaseRipple = (ripple: Ripple) => {
    ripple.mesh.visible = false
    ripplesRoot.remove(ripple.mesh)
    ripplePool.push(ripple.mesh)
  }

  const spawnRipple = (x: number, y: number, now: number) => {
    if (ripples.length >= MAX_RIPPLES) {
      const oldest = ripples.shift()
      if (oldest) releaseRipple(oldest)
    }
    const mesh = acquireRippleMesh()
    mesh.position.set(x, y, 0)
    setCircleRadius(mesh.geometry, 0.35, RIPPLE_SEGMENTS)
    ;(mesh.material as LineBasicMaterial).opacity = 0.3
    ripplesRoot.add(mesh)
    ripples.push({ mesh, born: now, x, y })
  }

  const resize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    renderer.setSize(width, height, false)
    const aspect = width / height
    const viewW = VIEW_H * aspect
    camera.left = -viewW / 2
    camera.right = viewW / 2
    camera.top = VIEW_H / 2
    camera.bottom = -VIEW_H / 2
    camera.updateProjectionMatrix()
  }

  const onPointerMove = (event: PointerEvent) => {
    if (reduced) return
    pointerActive = true
    screenToWorld(event.clientX, event.clientY, targetPointer)

    const now = performance.now()
    const dx = lastClientX < 0 ? RIPPLE_MIN_MOVE : event.clientX - lastClientX
    const dy = lastClientY < 0 ? 0 : event.clientY - lastClientY
    const dist = Math.hypot(dx, dy)

    if (dist >= RIPPLE_MIN_MOVE && now - lastSpawn >= RIPPLE_SPAWN_GAP_MS) {
      spawnRipple(targetPointer.x, targetPointer.y, now * 0.001)
      lastSpawn = now
      lastClientX = event.clientX
      lastClientY = event.clientY
    } else if (lastClientX < 0) {
      lastClientX = event.clientX
      lastClientY = event.clientY
    }
  }

  const onPointerLeave = () => {
    pointerActive = false
  }

  const renderFrame = (now: number) => {
    const elapsed = (now - t0) * 0.001
    const t = now * 0.001

    if (!reduced) {
      field.position.x = Math.sin(elapsed * 0.04) * 1.8
      field.position.y = Math.cos(elapsed * 0.03) * 1.2
      construction.rotation.z = Math.sin(elapsed * 0.05) * 0.04
      constructionMat.opacity = 0.12 + Math.sin(elapsed * 0.35) * 0.05
      markerMat.opacity = 0.35 + Math.sin(elapsed * 1.4) * 0.25
      markerMat.size = 0.28 + Math.sin(elapsed * 1.8) * 0.08
      ;(grid.material as LineBasicMaterial).opacity = 0.07 + Math.sin(elapsed * 0.2) * 0.025

      // Soft cursor ring follows pointer
      pointerWorld.lerp(targetPointer, 0.18)
      cursorRing.position.copy(pointerWorld)
      const breath = 1.15 + Math.sin(elapsed * 2.2) * 0.1
      setCircleRadius(cursorRing.geometry, breath, RIPPLE_SEGMENTS)
      cursorMat.opacity = pointerActive ? 0.28 : Math.max(0, cursorMat.opacity - 0.02)

      // Expand & fade ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i]
        const age = t - ripple.born
        const u = age / RIPPLE_DURATION
        if (u >= 1) {
          releaseRipple(ripple)
          ripples.splice(i, 1)
          continue
        }
        const ease = 1 - (1 - u) * (1 - u)
        const radius = 0.4 + ease * RIPPLE_MAX_RADIUS
        setCircleRadius(ripple.mesh.geometry, radius, RIPPLE_SEGMENTS)
        ;(ripple.mesh.material as LineBasicMaterial).opacity = (1 - u) * 0.28
      }
    }

    renderer.render(scene, camera)
  }

  const loop = (now: number) => {
    if (!running) return
    renderFrame(now)
    raf = requestAnimationFrame(loop)
  }

  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf)
    } else if (!reduced && running) {
      t0 = performance.now()
      raf = requestAnimationFrame(loop)
    }
  }

  resize()
  renderFrame(performance.now())
  if (!reduced) {
    raf = requestAnimationFrame(loop)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onPointerLeave)
  }

  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', onVisibility)

  return {
    destroy: () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('mouseleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      scene.traverse((obj) => {
        if (obj instanceof LineSegments || obj instanceof Points) {
          obj.geometry.dispose()
          const mat = obj.material
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
          else mat.dispose()
        }
      })
      for (const mesh of ripplePool) {
        mesh.geometry.dispose()
        ;(mesh.material as LineBasicMaterial).dispose()
      }
      renderer.dispose()
    },
  }
}
