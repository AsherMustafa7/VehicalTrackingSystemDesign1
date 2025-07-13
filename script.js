import Lenis from "https://esm.sh/@studio-freight/lenis";
import * as THREE from "https://esm.sh/three@0.136.0";
import { GLTFLoader } from "https://esm.sh/three@0.136.0/examples/jsm/loaders/GLTFLoader";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";
import { SplitText } from "https://esm.sh/gsap/SplitText";

import { RGBELoader } from "https://esm.sh/three@0.136.0/examples/jsm/loaders/RGBELoader.js";

const lenis = new Lenis({
  smooth: true,
  lerp: 0.08, // adjust for smoothness vs responsiveness
});

// Animate Lenis
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);






lenis.on("scroll", ScrollTrigger.update);

gsap.registerPlugin(ScrollTrigger, SplitText);




  const faqs = document.querySelectorAll(".faq-item");

  faqs.forEach(faq => {
    faq.addEventListener("click", () => {
      faqs.forEach(f => {
        if (f !== faq) f.classList.remove("open");
      });
      faq.classList.toggle("open");
    });
  });




// Variables for hero section (truck)
let scene, camera, renderer, truck2;

// Variables for intro section (device)
let scene2, camera2, renderer2, device;

// Initialize hero section first
function initHeroSection() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    150,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.1;

  renderer.setPixelRatio(1);

  const headlight = new THREE.SpotLight(0xffffff, 20, 30, Math.PI / 3, 0.5, 2);
  headlight.position.set(1, 3, 3);
  headlight.castShadow = true;
  scene.add(headlight);

  headlight.target.position.set(0, 1, 0);
  scene.add(headlight.target);

  const headlight2 = new THREE.SpotLight(0xffffff, 10, 30, Math.PI / 3.8, 0, 2);
  headlight2.position.set(2, 4, 0);
  headlight2.castShadow = true;
  scene.add(headlight2);

  headlight2.target.position.set(1, 2.5, -1);
  scene.add(headlight2.target);

  const headlight3 = new THREE.SpotLight(0xffffff, 10, 60, Math.PI / 4, 0.3, 2);
  headlight3.position.set(1, 5, -10);
  headlight3.castShadow = true;
  scene.add(headlight3);

  headlight3.target.position.set(0, 3, -5);
  scene.add(headlight3.target);

  const headlight4 = new THREE.SpotLight(0xffffff, 10, 60, Math.PI / 2, 0.3, 2);
  headlight4.position.set(-2, 4, -5);
  headlight4.castShadow = true;
  scene.add(headlight4);

  headlight4.target.position.set(-1, 3.1, -4.8);
  scene.add(headlight4.target);

  const headlight5 = new THREE.SpotLight(0xffffff, 10, 60, Math.PI / 2, 0.3, 2);
  headlight5.position.set(-2, 4, 2);
  headlight5.castShadow = true;
  scene.add(headlight5);

  headlight5.target.position.set(-2, 3, 1);
  scene.add(headlight5.target);

  document.querySelector(".truckcontainer").appendChild(renderer.domElement);

  const loader = new GLTFLoader();
  loader.load(
    "assets/finaltruck7.glb",
    function (gltf) {
      const truck = gltf.scene;
      truck2 = truck;
      truck.traverse(function (node) {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      const box = new THREE.Box3().setFromObject(truck);
      const center = box.getCenter(new THREE.Vector3());
      truck.position.set(0, 1, 0);
      truck.scale.set(0.5, 0.5, 0.5);
      const size = box.getSize(new THREE.Vector3());
      const trucksize = size;

      scene.add(truck);

      camera.position.set(
        0.7372252863155719,
        2.3346966419409427,
        2.447327932347618
      );
      camera.lookAt(
        -0.2969838296700505,
        1.3195754216292774,
        -0.019350889023476855
      );

      console.log("Truck position:", truck.position);
      console.log(camera.position);
    },
    undefined,
    function (error) {
      console.error("An error occurred while loading the GLTF model:", error);
    }
  );

  // Message element setup
  const messageContainer = document.createElement("div");
  messageContainer.style.position = "absolute";
  messageContainer.style.top = "20%";
  messageContainer.style.left = "50%";
  messageContainer.style.transform = "translateX(-50%)";
  messageContainer.style.fontSize = "2rem";
  messageContainer.style.color = "white";
  messageContainer.style.display = "none";
  messageContainer.style.zIndex = 1000;
  document.querySelector(".hero").appendChild(messageContainer);

  // Sound setup
  const lightOnSound = new Audio("assets/spotlight-91359 (mp3cut.net)2.mp3");

  function playLightOnSound() {
    lightOnSound.play().catch(() => {});
  }

  // Light & Camera scroll setup
  const lights = [headlight, headlight2, headlight3, headlight4, headlight5];
  const messages = [
    " Digital Transit,Paperless Future! ",
    " Stay Informed Stay Compliant Stay Ahead!",
    " Your Mines,One Smart Platform! Your Fleet",
    "Secure Every Move,Control Every Route!",
    "GPS Tracking",
  ];

  const cameraPositions = [
    {
      pos: [0.7372252863155719, 2.3346966419409427, 2.447327932347618],
      lookAt: [-0.2969838296700505, 1.3195754216292774, -0.019350889023476855],
    },
    {
      pos: [2.456737543733647, 2.169636906104708, -1.88748928690464],
      lookAt: [-0.34358664718077825, 1.1715051758418737, -1.2755482958984823],
    },
    {
      pos: [-0.10682520290880866, 2.7972547668082584, -6.299179968555618],
      lookAt: [0, 1, 0],
    },
    {
      pos: [-2.0082186489869027, 3.439775521584943, -4.183635255618101],
      lookAt: [-1.6068244920768135, 3.380673728713193, -4.120582750599064],
    },
    {
      pos: [-0.8855318336553848, 2.442777747839628, 2.7096202949202146],
      lookAt: [0, 0, 0],
    },
  ];

  // Dummy objects for GSAP tweening
  const camPos = {
    x: cameraPositions[0].pos[0],
    y: cameraPositions[0].pos[1],
    z: cameraPositions[0].pos[2],
  };
  const camLook = {
    x: cameraPositions[0].lookAt[0],
    y: cameraPositions[0].lookAt[1],
    z: cameraPositions[0].lookAt[2],
  };

  // Set initial lights off
  lights.forEach((light) => (light.intensity = 0));

  // Pause scroll helper
  function pauseScroll(duration = 500) {
    if (window.lenis && typeof window.lenis.stop === "function") {
      lenis.stop();
      setTimeout(() => {
        lenis.start();
      }, duration);
    }
  }

  let lastIndex = -1;

  // Hero section ScrollTrigger - positioned first
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "+=" + window.innerHeight * 10,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      const sectionIndex = Math.min(4, Math.floor(progress * 5));

      if (sectionIndex !== lastIndex) {
        pauseScroll(500); // optional

        // Camera position
        gsap.to(camPos, {
          x: cameraPositions[sectionIndex].pos[0],
          y: cameraPositions[sectionIndex].pos[1],
          z: cameraPositions[sectionIndex].pos[2],
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => camera.position.set(camPos.x, camPos.y, camPos.z),
        });

        // Camera lookAt
        gsap.to(camLook, {
          x: cameraPositions[sectionIndex].lookAt[0],
          y: cameraPositions[sectionIndex].lookAt[1],
          z: cameraPositions[sectionIndex].lookAt[2],
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => camera.lookAt(camLook.x, camLook.y, camLook.z),
        });

        // Lights: turn on only current, turn off others
        lights.forEach((light, idx) => {
          if (idx === sectionIndex) {
            gsap.to(light, {
              intensity: 10,
              duration: 0.8,
              ease: "power1.inOut",
              onStart: playLightOnSound,
            });
          } else {
            gsap.to(light, {
              intensity: 0,
              duration: 0.8,
              ease: "power1.inOut",
            });
          }
        });

        // Message display
        messageContainer.textContent = messages[sectionIndex];
        messageContainer.style.display = "block";

        gsap.fromTo(
          messageContainer,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );

        setTimeout(() => {
          gsap.to(messageContainer, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.in",
          });
        }, 2000);

        lastIndex = sectionIndex;
      }
    },
  });

  // Render loop for hero section
  function animateHero() {
    requestAnimationFrame(animateHero);
    renderer.render(scene, camera);
  }
  animateHero();
}

// Initialize intro section after hero
function initIntroSection() {
  scene2 = new THREE.Scene();
  camera2 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer2 = new THREE.WebGLRenderer({ alpha: true });
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.setPixelRatio(window.devicePixelRatio);

  document.querySelector(".devicecontainer").appendChild(renderer2.domElement);

  // Load device model
  const loader2 = new GLTFLoader();

  loader2.load(
    "assets/remote_control_device.glb",
    function (gltf) {
      device = gltf.scene;
      device.scale.set(0.4, 0.4, 0.4);

      device.rotation.set(Math.PI/2, Math.PI/2, 0);

      // Optional: center the model if it's not centered
      const box = new THREE.Box3().setFromObject(device);
      const center = box.getCenter(new THREE.Vector3());
      device.position.sub(center); // center the model around origin
      device.position.x -= 5.35;
      device.position.y += 2.3;
      console.log("Device position:", device.position);

      // Add lights to make the model visible
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene2.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      directionalLight.position.set(5, 10, 7);
      scene2.add(directionalLight);

      // Add the device to the scene
      scene2.add(device);

     ; 
      // Position camera
      camera2.position.set(0, 2, 5);
      camera2.lookAt(0, 0, 0);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error("An error happened while loading the GLTF model:", error);
    }
  );

  // Render loop for intro section
  function animateIntro() {
    requestAnimationFrame(animateIntro);

    if (device) {
      
      device.rotation.y += 0.01; 
      device.rotation.x += 0.02; 
      
    }

    renderer2.render(scene2, camera2);
  }
  animateIntro();
}



setTimeout(() => {
  initKeyOutcomeScrolling();
}, 500);


function initKeyOutcomeScrolling() {
  const keyOutcomeSection = document.querySelector(".Keyoutcome");
  const imgWrappers = document.querySelector(".imgwrapers");
  
  if (!keyOutcomeSection || !imgWrappers) return;

  // Get total width needed for horizontal scroll
  const divContainers = keyOutcomeSection.querySelectorAll(".divcontainer");
  let totalWidth = 0;
  
  divContainers.forEach((container, index) => {
    const rect = container.getBoundingClientRect();
    totalWidth += rect.width;
    if (index < divContainers.length - 1) {
      // Add gap between items (3% of viewport width as per CSS)
      totalWidth += window.innerWidth * 0.03;
    }
  });
  
  // Add padding
  totalWidth += window.innerWidth * 0.2; // 20% total padding (10% each side)
  
  // Calculate how much we need to scroll
  const scrollDistance = totalWidth - window.innerWidth;

  ScrollTrigger.create({
    trigger: keyOutcomeSection,
    start: "top top",
    end: () => `+=${scrollDistance}`,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      const translateX = -progress * scrollDistance;
      
      gsap.set(imgWrappers, {
        x: translateX
      });
    }
  });
}



// Initialize sections
initHeroSection();
initIntroSection();

// Handle window resize
window.addEventListener("resize", () => {
  // Update camera aspect ratio and renderer size for hero section
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Update camera aspect ratio and renderer size for intro section
  if (camera2 && renderer2) {
    camera2.aspect = window.innerWidth / window.innerHeight;
    camera2.updateProjectionMatrix();
    renderer2.setSize(window.innerWidth, window.innerHeight);
  }

  // Refresh ScrollTrigger
  ScrollTrigger.refresh();
});
