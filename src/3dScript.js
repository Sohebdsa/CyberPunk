import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"; //gltf loader import
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";

// gsap
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


export async function init3DScene() {
  //scene
  const scene = new THREE.Scene();
  //camera
  const camera = new THREE.PerspectiveCamera(
    25,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.z = 5;
  //objects
  let model;
  //gltf Loader
  const loader = new GLTFLoader();
  loader.load(
    "./DamagedHelmet.gltf",
    (gltf) => {
      model = gltf.scene;
      scene.add(model);
    },
    undefined,
    (err) => {
      console.log(err);
    },
  );

  //hdrloader
  const rgbeLoader = new RGBELoader();

  const envMap = await rgbeLoader.loadAsync("./pond_bridge_night_1k.hdr");
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.environment = envMap;
  // scene.background = envMap; // optional but nice

  //add in the scene
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //post processing
  const composer = new EffectComposer(renderer);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const shaderPass = new ShaderPass(RGBShiftShader);
  shaderPass.uniforms["amount"].value = 0.005;
  composer.addPass(shaderPass);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    composer.setSize(window.innerWidth, window.innerHeight);
  });

  gsap.registerPlugin(ScrollToPlugin);

  window.addEventListener("mousemove", (e) => {
    if (!model) return;

    const rotationX = (e.clientY / window.innerHeight - 0.5) * (Math.PI * 0.3);
    const rotationY = (e.clientX / window.innerWidth - 0.5) * (Math.PI * 0.3);

    gsap.to(model.rotation, {
      x: rotationX,
      y: rotationY,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  // window.addEventListener("mousemove", (e) => {
  //   if (!model) return;

  //   const rotationX = (e.clientY / window.innerHeight - 0.5) * (Math.PI * .30);
  //   const rotationY = (e.clientX / window.innerWidth - 0.5) * (Math.PI * .30);

  //   model.rotation.x = rotationX;
  //   model.rotation.y = rotationY;
  // });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // smooth motion
  controls.dampingFactor = 0.05;
  controls.enableZoom = true; // allow zooming
  controls.enablePan = true;
  //functions

  function animate() {
    window.requestAnimationFrame(animate);
    controls.update();
    composer.render();
  }
  animate();
}
