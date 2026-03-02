import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';

export function init3DScene(canvas) {
  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 2;

  // Declare helmet variable
  let helmet;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  // Orbit Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Post-processing
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.5,  // strength
    0.4,  // radius
    0.85  // threshold
  );
  composer.addPass(bloomPass);

  const glitchPass = new GlitchPass();
  glitchPass.enabled = false;
  composer.addPass(glitchPass);

  const filmPass = new FilmPass(0.35, 0.025, 648, false);
  filmPass.enabled = false;
  composer.addPass(filmPass);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(-5, 5, 5);
  scene.add(pointLight);

  // Load HDRi background (EXR format)
  const hdriLoader = new RGBELoader();
  hdriLoader.load('/sunny_rose_garden_4k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // scene.background = texture;
    scene.environment = texture;
  });

  // Create loader instance
  const loader = new GLTFLoader();

  // Load model
  loader.load('/DamagedHelmet.glb', (gltf) => {
    helmet = gltf.scene;
    scene.add(helmet);
  });

  // Handle window resize
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    composer.render();
  }
  animate();

  // Return cleanup function and references for controls
  return {
    cleanup: () => {
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      composer.dispose();
    },
    scene,
    camera,
    renderer,
    composer,
    controls,
    lights: { ambientLight, directionalLight, pointLight },
    postProcessing: { bloomPass, glitchPass, filmPass },
    getHelmet: () => helmet
  };
}
