import * as THREE from 'three';

// Create the scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Function to create a cube with specified parameters
function createCube(size, color, position) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(position.x, position.y, position.z);
    return cube;
}

// Create multiple cubes
const cubes = [
    createCube(1, 0x00ff00, { x: -2, y: 2, z: 0 }),
    createCube(1.5, 0xff0000, { x: 2, y: -2, z: 0 }),
    createCube(0.75, 0x0000ff, { x: -2, y: -2, z: 0 }),
    createCube(1.25, 0xffff00, { x: 2, y: 2, z: 0 }),
    createCube(1, 0xff00ff, { x: 0, y: 0, z: 0 }),
];

// Add the cubes to the scene
cubes.forEach(cube => scene.add(cube));

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
