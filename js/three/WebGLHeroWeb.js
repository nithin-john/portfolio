/**
 * NITHIN JOHNSON - HERO 3D SPIDER-WEB ARTIFACT
 * High-performance 3D WebGL / Three.js interactive centerpiece
 * with fallback Canvas 3D projective engine
 */

export class WebGLHeroWeb {
  constructor(canvasId = 'hero-webgl-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.container = this.canvas.parentElement;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollY = 0;
    this.time = 0;
    this.width = this.canvas.clientWidth || 400;
    this.height = this.canvas.clientHeight || 400;

    this.init();
  }

  init() {
    // Track mouse over hero container and window
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      this.mouse.targetX = (e.clientX - centerX) / (window.innerWidth / 2);
      this.mouse.targetY = (e.clientY - centerY) / (window.innerHeight / 2);
    });

    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
    }, { passive: true });

    window.addEventListener('resize', () => this.onResize());

    // Check if THREE.js is loaded in the global window
    if (window.THREE) {
      this.initThreeJS();
    } else {
      this.initCanvasFallback();
    }
  }

  onResize() {
    if (!this.canvas) return;
    const rect = this.container ? this.container.getBoundingClientRect() : { width: 400, height: 400 };
    this.width = rect.width;
    this.height = rect.height;

    if (this.renderer && this.camera) {
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } else if (this.ctx) {
      const dpr = Math.min(window.devicePixelRatio, 2);
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.scale(dpr, dpr);
    }
  }

  /* -----------------------------------------------------------
   * 1. FULL THREE.JS WEBGL RENDERER
   * --------------------------------------------------------- */
  initThreeJS() {
    const THREE = window.THREE;
    const dpr = Math.min(window.devicePixelRatio, 2);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 7;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(dpr);

    // Root Group for Mouse Rotation & Scroll Displacement
    this.webGroup = new THREE.Group();
    this.scene.add(this.webGroup);

    // 1. Outer Spider-Web Geodesic Sphere
    const outerGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x00D2FF,
      wireframe: true,
      wireframeLinewidth: 1.5,
      transparent: true,
      opacity: 0.55,
      roughness: 0.2,
      metalness: 0.8
    });
    this.outerMesh = new THREE.Mesh(outerGeo, outerMat);
    this.webGroup.add(this.outerMesh);

    // 2. Inner Spider-Sense Crimson Polyhedron
    const innerGeo = new THREE.DodecahedronGeometry(1.4, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xE10600,
      wireframe: true,
      wireframeLinewidth: 2,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0xE10600,
      emissiveIntensity: 0.35
    });
    this.innerMesh = new THREE.Mesh(innerGeo, innerMat);
    this.webGroup.add(this.innerMesh);

    // 3. Radial Web Strands (Connecting Nodes)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.25
    });

    const outerVertices = outerGeo.attributes.position;
    const strandGeo = new THREE.BufferGeometry();
    const strandPositions = [];

    for (let i = 0; i < outerVertices.count; i += 3) {
      strandPositions.push(0, 0, 0);
      strandPositions.push(
        outerVertices.getX(i),
        outerVertices.getY(i),
        outerVertices.getZ(i)
      );
    }

    strandGeo.setAttribute('position', new THREE.Float32BufferAttribute(strandPositions, 3));
    this.strands = new THREE.LineSegments(strandGeo, lineMat);
    this.webGroup.add(this.strands);

    // 4. Glowing Node Vertices (Points)
    const pointsMat = new THREE.PointsMaterial({
      color: 0x00D2FF,
      size: 0.08,
      transparent: true,
      opacity: 0.9
    });
    this.nodes = new THREE.Points(outerGeo, pointsMat);
    this.webGroup.add(this.nodes);

    // 5. Dual Spider-Man Lights
    const redLight = new THREE.PointLight(0xE10600, 3.5, 20);
    redLight.position.set(4, 3, 3);
    this.scene.add(redLight);

    const blueLight = new THREE.PointLight(0x00D2FF, 3.0, 20);
    blueLight.position.set(-4, -3, 3);
    this.scene.add(blueLight);

    const ambientLight = new THREE.AmbientLight(0x161A3A, 1.2);
    this.scene.add(ambientLight);

    this.renderThree();
  }

  renderThree() {
    this.time += 0.015;

    // Smooth Lerp Mouse Following
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.06;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.06;

    if (this.webGroup) {
      // Rotation dynamics
      this.webGroup.rotation.y = this.time * 0.3 + this.mouse.x * 0.75;
      this.webGroup.rotation.x = Math.sin(this.time * 0.5) * 0.2 + this.mouse.y * 0.5;

      // Subtle breathing scale
      const pulse = 1 + Math.sin(this.time * 1.5) * 0.04;
      this.innerMesh.scale.set(pulse, pulse, pulse);

      // Scroll-driven cinematic depth displacement
      const scrollFactor = Math.min(this.scrollY / 800, 1.5);
      this.webGroup.position.z = -scrollFactor * 3.5;
      this.webGroup.position.y = -scrollFactor * 1.5;
      this.webGroup.rotation.z = scrollFactor * 0.8;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }

    requestAnimationFrame(() => this.renderThree());
  }

  /* -----------------------------------------------------------
   * 2. STANDALONE 3D CANVAS PROJECTIVE ENGINE (FALLBACK)
   * --------------------------------------------------------- */
  initCanvasFallback() {
    this.ctx = this.canvas.getContext('2d');
    this.onResize();

    // Generate 3D Vertices for Polyhedral Spider-Web
    this.points = [];
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const scale = 110;

    // 12 vertices of an icosahedron in 3D
    const icosahedron = [
      [-1,  phi,  0], [ 1,  phi,  0], [-1, -phi,  0], [ 1, -phi,  0],
      [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
      [ phi,  0, -1], [ phi,  0,  1], [-phi,  0, -1], [-phi,  0,  1]
    ];

    this.points = icosahedron.map(([x, y, z]) => {
      const len = Math.sqrt(x*x + y*y + z*z);
      return { x: (x / len) * scale, y: (y / len) * scale, z: (z / len) * scale };
    });

    // 40 random orbiting spider-sense particle dust
    this.particles = [];
    for (let i = 0; i < 45; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phiRad = Math.acos(2.0 * v - 1.0);
      const r = 130 + Math.random() * 45;
      this.particles.push({
        x: r * Math.sin(phiRad) * Math.cos(theta),
        y: r * Math.sin(phiRad) * Math.sin(theta),
        z: r * Math.cos(phiRad),
        baseR: r,
        phase: Math.random() * Math.PI * 2
      });
    }

    this.renderCanvas();
  }

  renderCanvas() {
    this.time += 0.018;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    // Mouse lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.07;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.07;

    const rotX = this.time * 0.2 + this.mouse.y * 0.6;
    const rotY = this.time * 0.35 + this.mouse.x * 0.8;

    const cx = w / 2;
    const cy = h / 2;
    const fov = 340;

    // Scroll displacement
    const scrollOffset = Math.min(this.scrollY / 600, 1.2);
    const globalScale = Math.max(0.6, 1 - scrollOffset * 0.4);

    // Rotate and Project Function
    const project = (p) => {
      // Y Rotation
      let x1 = p.x * Math.cos(rotY) + p.z * Math.sin(rotY);
      let z1 = -p.x * Math.sin(rotY) + p.z * Math.cos(rotY);

      // X Rotation
      let y2 = p.y * Math.cos(rotX) - z1 * Math.sin(rotX);
      let z2 = p.y * Math.sin(rotX) + z1 * Math.cos(rotX);

      // Perspective Projection
      const zEff = z2 + 380 + (scrollOffset * 150);
      const scaleProj = (fov / zEff) * globalScale;

      return {
        x: cx + x1 * scaleProj,
        y: cy + y2 * scaleProj,
        z: z2,
        scale: scaleProj
      };
    };

    const projected = this.points.map(project);

    // Draw Radial Strands from Center
    ctx.lineWidth = 1;
    projected.forEach(pt => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(pt.x, pt.y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.stroke();
    });

    // Draw Connecting Web Facets (Polygon Mesh)
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const p1 = this.points[i];
        const p2 = this.points[j];
        const d = Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);

        if (d < 130) {
          const pr1 = projected[i];
          const pr2 = projected[j];
          ctx.beginPath();
          ctx.moveTo(pr1.x, pr1.y);
          ctx.lineTo(pr2.x, pr2.y);
          
          const depthAlpha = Math.max(0.1, (pr1.z + pr2.z + 180) / 360);
          ctx.strokeStyle = `rgba(0, 210, 255, ${0.4 * depthAlpha})`;
          ctx.stroke();
        }
      }
    }

    // Draw Inner Crimson Pulsing Core
    const pulse = 1 + Math.sin(this.time * 2.2) * 0.12;
    const corePoints = this.points.map(p => ({
      x: p.x * 0.45 * pulse,
      y: p.y * 0.45 * pulse,
      z: p.z * 0.45 * pulse
    })).map(project);

    for (let i = 0; i < corePoints.length; i++) {
      for (let j = i + 1; j < corePoints.length; j++) {
        const p1 = this.points[i];
        const p2 = this.points[j];
        if (Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z) < 130) {
          ctx.beginPath();
          ctx.moveTo(corePoints[i].x, corePoints[i].y);
          ctx.lineTo(corePoints[j].x, corePoints[j].y);
          ctx.strokeStyle = 'rgba(225, 6, 0, 0.7)';
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }
      }
    }

    // Draw Outer Vertices & Nodes
    projected.forEach(pt => {
      ctx.beginPath();
      const nodeR = Math.max(2, 4.5 * pt.scale);
      ctx.arc(pt.x, pt.y, nodeR, 0, Math.PI * 2);
      ctx.fillStyle = '#00D2FF';
      ctx.shadowColor = '#00D2FF';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw Floating Particles
    this.particles.forEach(p => {
      const pr = project(p);
      ctx.beginPath();
      ctx.arc(pr.x, pr.y, Math.max(1, 2 * pr.scale), 0, Math.PI * 2);
      ctx.fillStyle = Math.sin(p.phase + this.time) > 0 ? '#E10600' : '#00D2FF';
      ctx.fill();
    });

    requestAnimationFrame(() => this.renderCanvas());
  }
}
