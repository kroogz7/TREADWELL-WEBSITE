// 3D Globe Animation with Three.js

class FitnessGlobe {
    constructor(containerId) {
        // Get container element
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Container element not found');
            return;
        }

        // Setup parameters
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.sphere = null;
        this.stars = null;
        this.isRotating = true;
        this.rotationSpeed = 0.001;
        this.mouse = { x: 0, y: 0 };
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        this.images = ['rope.jpg', 'assets/images/lifting.jpg', 'assets/images/mirror flex.jpg'];
        this.imageIndex = 0;
        
        // Initialize
        this.init();
        this.animate();
    }
    
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Setup camera
        const aspectRatio = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
        this.camera.position.z = 5;
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        
        // Add drag indicator
        const dragIndicator = document.createElement('div');
        dragIndicator.className = 'drag-indicator';
        dragIndicator.textContent = 'Drag to rotate';
        this.container.appendChild(dragIndicator);
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        this.scene.add(directionalLight);
        
        // Create sphere with materials
        this.createSphere();
        
        // Add stars background
        this.createStars();
        
        // Add event listeners
        this.addEventListeners();
        
        // Initial render
        this.renderer.render(this.scene, this.camera);
    }
    
    createSphere() {
        const geometry = new THREE.SphereGeometry(2, 32, 32);
        const loader = new THREE.TextureLoader();
        
        // Debug loading of textures
        console.log("Loading textures from:", this.images);
        
        // Create a default material (fallback)
        const defaultMaterial = new THREE.MeshPhongMaterial({
            color: 0xc0a062,
            shininess: 30
        });
        
        // Create the sphere with default material first
        this.sphere = new THREE.Mesh(geometry, defaultMaterial);
        this.scene.add(this.sphere);
        
        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(2.05, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xc0a062, // Match accent color
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        this.sphere.add(glowMesh);
        
        // Add shadow below the sphere
        const shadowGeometry = new THREE.CircleGeometry(2, 32);
        const shadowMaterial = new THREE.MeshBasicMaterial({
            color: 0xc0a062,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide
        });
        const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
        shadow.position.y = -2.5;
        shadow.rotation.x = -Math.PI / 2;
        this.scene.add(shadow);
        
        // Try to load the first texture
        loader.load(
            this.images[0],
            // Success callback
            (texture) => {
                console.log("Texture loaded successfully:", this.images[0]);
                // Apply texture to sphere
                this.sphere.material = new THREE.MeshPhongMaterial({
                    map: texture,
                    shininess: 30
                });
            },
            // Progress callback
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // Error callback
            (error) => {
                console.error('Error loading texture:', error, this.images[0]);
            }
        );
    }
    
    createStars() {
        const geometry = new THREE.BufferGeometry();
        const count = 1000;
        
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
            // Position
            const x = (Math.random() - 0.5) * 50;
            const y = (Math.random() - 0.5) * 50;
            const z = (Math.random() - 0.5) * 50;
            
            // Keep stars away from the center (where sphere is)
            const distance = Math.sqrt(x * x + y * y + z * z);
            if (distance < 10) {
                i--;
                continue;
            }
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            
            // Color (slightly golden to match theme)
            colors[i * 3] = 0.9 + Math.random() * 0.1;
            colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
            colors[i * 3 + 2] = 0.6 + Math.random() * 0.4;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: THREE.VertexColors,
            transparent: true,
            opacity: 0.7
        });
        
        this.stars = new THREE.Points(geometry, material);
        this.scene.add(this.stars);
    }
    
    addEventListeners() {
        // Mouse and touch events
        this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        
        // Touch events for mobile
        this.container.addEventListener('touchstart', this.onTouchStart.bind(this));
        document.addEventListener('touchmove', this.onTouchMove.bind(this));
        document.addEventListener('touchend', this.onTouchEnd.bind(this));
        
        // Resize event
        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        // Mouse hover
        this.container.addEventListener('mouseenter', () => {
            // Slow down rotation on hover
            this.rotationSpeed = 0.0005;
            
            // Pulse effect for sphere glow
            const glowMesh = this.sphere.children[0];
            const tl = gsap.timeline({ repeat: -1, yoyo: true });
            tl.to(glowMesh.material, { opacity: 0.2, duration: 1.5, ease: "power2.inOut" });
        });
        
        this.container.addEventListener('mouseleave', () => {
            // Reset rotation speed
            this.rotationSpeed = 0.001;
            
            // Reset glow
            const glowMesh = this.sphere.children[0];
            gsap.to(glowMesh.material, { opacity: 0.1, duration: 0.5 });
        });
    }
    
    onMouseDown(event) {
        this.isDragging = true;
        this.isRotating = false;
        this.previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        event.preventDefault();
    }
    
    onMouseMove(event) {
        if (this.isDragging) {
            const deltaMove = {
                x: event.clientX - this.previousMousePosition.x,
                y: event.clientY - this.previousMousePosition.y
            };
            
            if (this.sphere) {
                this.sphere.rotation.y += deltaMove.x * 0.005;
                this.sphere.rotation.x += deltaMove.y * 0.005;
            }
            
            this.previousMousePosition = {
                x: event.clientX,
                y: event.clientY
            };
        }
    }
    
    onMouseUp(event) {
        this.isDragging = false;
        setTimeout(() => {
            this.isRotating = true;
        }, 1000);
    }
    
    onTouchStart(event) {
        if (event.touches.length === 1) {
            this.isDragging = true;
            this.isRotating = false;
            this.previousMousePosition = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        }
    }
    
    onTouchMove(event) {
        if (this.isDragging && event.touches.length === 1) {
            const deltaMove = {
                x: event.touches[0].clientX - this.previousMousePosition.x,
                y: event.touches[0].clientY - this.previousMousePosition.y
            };
            
            if (this.sphere) {
                this.sphere.rotation.y += deltaMove.x * 0.005;
                this.sphere.rotation.x += deltaMove.y * 0.005;
            }
            
            this.previousMousePosition = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        }
    }
    
    onTouchEnd(event) {
        this.isDragging = false;
        setTimeout(() => {
            this.isRotating = true;
        }, 1000);
    }
    
    onWindowResize() {
        // Update camera
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        
        // Update renderer
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    }
    
    render() {
        // Auto-rotate if not dragging
        if (this.isRotating && this.sphere) {
            this.sphere.rotation.y += this.rotationSpeed;
        }
        
        // Make stars twinkle slightly
        if (this.stars) {
            this.stars.rotation.y += 0.0001;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize globe when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        const message = 'Three.js is not loaded. Please include the Three.js library.';
        console.error(message);
        document.getElementById('globe-container')?.insertAdjacentHTML('beforeend', 
            `<div style="color: white; text-align: center; padding: 20px;">${message}</div>`);
        return;
    }
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded. Some animations may not work properly.');
    }
    
    // Initialize the globe
    const globe = new FitnessGlobe('globe-container');
}); 