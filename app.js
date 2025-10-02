import * as THREE from 'three';

let scene, camera, renderer;
let dvdLogo, logoMaterial;
let xSpeed = 3;
let ySpeed = 2;
let bounceCount = 0;

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.OrthographicCamera(
        -400, 400, 400, -400, 0.1, 1000
    );
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 800);
    document.body.appendChild(renderer.domElement);

    // DVD Logo plane
    const geometry = new THREE.PlaneGeometry(100, 50);
    logoMaterial = new THREE.MeshBasicMaterial({ color: getRandomColor() });
    dvdLogo = new THREE.Mesh(geometry, logoMaterial);
    dvdLogo.position.set(0, 0, 0);
    scene.add(dvdLogo);
}

function animate() {
    requestAnimationFrame(animate);

    dvdLogo.position.x += xSpeed;
    dvdLogo.position.y += ySpeed;

    checkBounds();

    renderer.render(scene, camera);
}

function checkBounds() {
    const halfWidth = 50 * dvdLogo.scale.x;
    const halfHeight = 25 * dvdLogo.scale.y;

    // Check X bounds
    if (dvdLogo.position.x + halfWidth >= 400 || dvdLogo.position.x - halfWidth <= -400) {
        xSpeed *= -1;
        bounce();
    }

    // Check Y bounds
    if (dvdLogo.position.y + halfHeight >= 400 || dvdLogo.position.y - halfHeight <= -400) {
        ySpeed *= -1;
        bounce();
    }
}

function bounce() {
    bounceCount++;
    logoMaterial.color.set(getRandomColor());
    dvdLogo.scale.multiplyScalar(0.85);

    if (dvdLogo.scale.x < 0.05 || dvdLogo.scale.y < 0.05) {
        scene.remove(dvdLogo); // vanish after too small
    }
}

function getRandomColor() {
    return new THREE.Color(Math.random(), Math.random(), Math.random());
}
