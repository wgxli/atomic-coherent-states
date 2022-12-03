import * as THREE from 'three';

import vsResource from './shader/sphereVert.glsl';
import fsResource from './shader/sphereFrag.glsl';

const OrbitControls = require('three-orbit-controls')(THREE);

export default async function initialize() {
    console.log('Initializing WebGL');

    const canvas = document.getElementById('main');
    const gl = canvas.getContext('webgl');

    canvas.addEventListener('touchstart', (e) => e.preventDefault());

    // Initialize scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080808);
    const camera = new THREE.PerspectiveCamera(
        75, window.innerWidth/window.innerHeight, 0.1, 1000
    );
    const renderer = new THREE.WebGLRenderer({context: gl});

    // Initialize geometry
    const vertexShader = await (await fetch(vsResource)).text();
    const fragmentShader = await (await fetch(fsResource)).text();

    const MAX_SIZE = 14;
    const uniforms = {
        spin: {value: 13},
        spinComponents: {value: [...new Array(MAX_SIZE)].map(() => new THREE.Vector2(0, 0))},
        drive: {value: 0.5},
        detuning: {value: 0.5},
        squeezing: {value: 0},
    };
    uniforms.spinComponents.value[6].x = 1;
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.99, 32, 32),
        new THREE.ShaderMaterial({
            defines: {
                MAX_SIZE,
                M_PI: Math.PI,
            },
            uniforms,
            vertexShader,
            fragmentShader,
        })
    );
    scene.add(sphere);


    // Initialize Axes
    const points = [
        new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.5, 0, 0),
        new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1.5, 0),
        new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 1.5),
    ];
    const axes = new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({color: 0x808080}),
    );
    scene.add(axes);

    // Initialize controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.3;
    controls.minDistance = 1.5;
    controls.maxDistance = 5;

    camera.position.z = 3;

    return {
        gl, scene,
        camera, renderer, controls,
        sphere, uniforms,
    };
};
