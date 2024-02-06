import * as THREE from "../libraries_js/libs/three.module.js";
import { OrbitControls } from "../libraries_js/libs/OrbitControls.js";
import { OBJLoader } from "../libraries_js/libs/OBJLoader.js";
import { MTLLoader } from "../libraries_js/libs/MTLLoader.js";
import { FBXLoader } from "../libraries_js/libs/FBXLoader.js";
import { GLTFLoader } from "../libraries_js/libs/GLTFLoader.js";
import { GUI } from "../libraries_js/libs/dat.gui/build/dat.gui.module.js";

const sceneCanvas = document.getElementById("sceneCanvas");

const scene = new THREE.Scene();
console.log(sceneCanvas);
// console.log(scene);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);

const controls = new OrbitControls(camera, sceneCanvas);
controls.enableDamping = true;

// const mtrlLoader = new MTLLoader();
// mtrlLoader.load("../assets/obj/castle.mtl", (materials) => {
//   console.log(materials);
//   const fileLoader = new OBJLoader();
//   fileLoader.setMaterials(materials);
//   fileLoader.load(
//     `../assets/obj/castle.obj`,
//     (threeDFile) => {
//       scene.add(threeDFile);
//     },
//     () => {
//       console.log("progressing");
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// });

const fileLoader = new GLTFLoader();
fileLoader.load("../this_tree_is_growing/scene.gltf", (_3DFile) => {
  console.log(_3DFile.scene);
  scene.add(_3DFile.scene);
});

// const fileLoader = new FBXLoader();
// fileLoader.load("../assets/fbx/castle_01.fbx", (_3DFile) => {
//   console.log(_3DFile);
//   scene.add(_3DFile);
// });

const renderer = new THREE.WebGLRenderer({
  canvas: sceneCanvas,
  antialias: true,
});

const axis = new THREE.AxesHelper(1, 1, 1);
camera.position.set(3, 3, 3);

const sunlight = new THREE.DirectionalLight("white", 1.2);
const ambientLight = new THREE.AmbientLight("white", 1.6);

const guiDebug = new GUI();
guiDebug
  .add(sunlight, "intensity")
  .min(0)
  .max(5)
  .step(0.2)
  .name("sunlight intensity");
guiDebug
  .add(ambientLight, "intensity")
  .min(0)
  .max(5)
  .step(0.2)
  .name("world light intensity");

// const ground = new THREE.Mesh(
//   groundGeo,
//   new THREE.MeshBasicMaterial({ color: "brown" })
// );
// ground.rotation.x = -Math.PI / 2;

// guiDebug
//   .add(ground.rotation, "x")
//   .min(-2 * Math.PI)
//   .max(2 * Math.PI)
//   .step(Math.PI / 4)
//   .name("X axis rotation");

// guiDebug
//   .add(ground.rotation, "y")
//   .min(-2 * Math.PI)
//   .max(2 * Math.PI)
//   .step(Math.PI / 4)
//   .name("Y axis rotation");

// guiDebug
//   .add(ground.rotation, "z")
//   .min(-2 * Math.PI)
//   .max(2 * Math.PI)
//   .step(Math.PI / 4)
//   .name("Z axis rotation");

// guiDebug
//   .add(ground.scale, "x")
//   .min(-2 * Math.PI)
//   .max(2 * Math.PI)
//   .step(Math.PI / 4)
//   .name("X axis scale");

// guiDebug
//   .add(ground.scale, "y")
//   .min(-2 * Math.PI)
//   .max(2 * Math.PI)
//   .step(Math.PI / 4)
//   .name("Y axis scale");

scene.add(camera, axis, sunlight, ambientLight);
// renderer.setSize(window.innerWidth, window.innerHeight);

sceneCanvas.addEventListener("dblclick", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    sceneCanvas.requestFullscreen();
  }
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
