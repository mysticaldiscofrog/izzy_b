import * as THREE from 'three';

// Create the scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

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

// Generate colors similar to #612424
const colors = [
    0x612424, 0x7A3535, 0x913F3F, 0xB34F4F, 0xCC5F5F,
    0x994848, 0x7A3E3E, 0x664242, 0x8B5757, 0xA46262,
    0xB77474, 0xD68B8B
];

// Create multiple cubes
const cubes = [
    createCube(1, colors[0], { x: -4, y: 4, z: 0 }),
    createCube(1.2, colors[1], { x: 4, y: -4, z: 0 }),
    createCube(0.8, colors[2], { x: -4, y: -4, z: 0 }),
    createCube(1.5, colors[3], { x: 4, y: 4, z: 0 }),
    createCube(1, colors[4], { x: 0, y: 0, z: 0 }),
    createCube(1.3, colors[5], { x: -2, y: 2, z: -3 }),
    createCube(0.9, colors[6], { x: 2, y: -2, z: 3 }),
    createCube(1.4, colors[7], { x: -3, y: -2, z: 2 }),
    createCube(1.1, colors[8], { x: 3, y: 2, z: -2 }),
    createCube(0.7, colors[9], { x: -1, y: 3, z: -3 }),
    createCube(1.6, colors[10], { x: 1, y: -3, z: 3 }),
    createCube(1.25, colors[11], { x: -3, y: 1, z: 3 })
];

// Add the cubes to the scene
cubes.forEach(cube => scene.add(cube));

// Create a gradient background using a canvas
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');

// Create a gradient
const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, '#612424');
gradient.addColorStop(1, '#000000');

// Fill the canvas with the gradient
context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);

// Use the canvas as a texture
const backgroundTexture = new THREE.CanvasTexture(canvas);
scene.background = backgroundTexture;

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
    
    // Update the gradient background on resize
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#612424');
    gradient.addColorStop(1, '#000000');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    backgroundTexture.needsUpdate = true;
});
