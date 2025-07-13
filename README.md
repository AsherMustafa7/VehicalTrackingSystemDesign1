For Preview : 
🚛✨ Scroll-Synced 3D Experience – Key Features
🚀 Integrated Lenis for smooth, inertia-based scrolling and synced it with GSAP ScrollTrigger for fluid scroll-driven animations.

💡 Set up multiple SpotLights targeting specific positions on the 3D model to simulate dramatic lighting changes as user scrolls.

📦 Loaded and displayed 3D .glb models (truck + remote device) using THREE.js and GLTFLoader, with shadow casting and tone mapping for realism.

🎥 Controlled camera position and target (lookAt) dynamically using GSAP tweening objects, updating them with scroll progress.

🧠 Created a ScrollTrigger scrub timeline to change camera angles, activate lights, and show messages at different scroll stages.

🔦 Synchronized spotlight animations and sound effects (.mp3) with camera movement using GSAP’s onStart callback.

📜 Displayed scroll-synced text messages with GSAP fade-in and fade-out based on scroll sections.

📱 Added responsive handling for all renderers and cameras using the resize event and updateProjectionMatrix() method.

🌀 Implemented rotating animation on the device model in the intro section using requestAnimationFrame loop.

🖼️ Built a horizontal scroll section (.Keyoutcome) by translating the inner wrapper based on calculated scroll width using GSAP.

📐 Dynamically calculated scroll distance by summing up widths of .divcontainer elements and viewport padding.

🧭 Used ScrollTrigger.pin to lock sections while animating content horizontally or vertically.

🛑 Created a pauseScroll() utility that temporarily halts scrolling when a new camera section begins for better visual flow.

🎛️ Setup and managed two separate THREE.js scenes (hero + intro) running in parallel, rendering independently.

✅ Wrapped all animation logic in clearly defined init functions (initHeroSection, initIntroSection, etc.) for better modularity and delayed execution.
