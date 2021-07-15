import * as THREE from "three";

export default function threeCanvas() {
  const scene = new THREE.Scene();

  const canvas = document.querySelector(".webgl");
  const dimensions = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(dimensions.width, dimensions.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const camera = new THREE.PerspectiveCamera(
    75,
    dimensions.width / dimensions.height,
    0.1,
    100
  );
  camera.position.add(new THREE.Vector3(0, 0, 5));
  scene.add(camera);

  window.onresize = function () {
    dimensions.width = window.innerWidth;
    dimensions.height = window.innerHeight;
    camera.aspect = dimensions.width / dimensions.height;
    camera.updateProjectionMatrix();
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  const sun = new THREE.DirectionalLight(0xffffee, 1.2);
  sun.position.add(new THREE.Vector3(1, 1, 1));
  scene.add(sun);

  const lamp = new THREE.PointLight(0xff7711, 0.2);
  lamp.position.add(new THREE.Vector3(-2, -0.5, 1));
  scene.add(lamp);

  const geometry = new THREE.TorusKnotBufferGeometry();
  const material = new THREE.MeshStandardMaterial();
  material.color = new THREE.Color(0x77ccdd);
  const shape = new THREE.Mesh(geometry, material);
  scene.add(shape);

  const clock = new THREE.Clock();

  function tick() {
    const delta = clock.getDelta();
    shape.rotateX(delta * 0.6);
    shape.rotateY(delta * 0.71);
    shape.rotateZ(delta * 0.4);
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  }

  tick();
}
