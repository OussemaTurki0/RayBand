gsap.registerPlugin(CustomEase, CustomWiggle);

// ----------------------
// ELEMENTS
// ----------------------
const dom = {
  face: document.querySelector(".face"),
  eyes: document.querySelectorAll(".eye"),
  innerFace: document.querySelector(".inner-face"),
  hairFront: document.querySelector(".hair-front"),
  hairBack: document.querySelector(".hair-back"),
  shadow: document.querySelectorAll(".shadow"),
  ears: document.querySelectorAll(".ear"),
  eyebrows: [
    document.querySelector(".eyebrow-left"),
    document.querySelector(".eyebrow-right")
  ]
};

// ----------------------
// TIMELINES
// ----------------------

// Main entrance animation
const meTl = gsap.timeline({
  delay: 1,
  onComplete: () => {
    blink.play();     // start blinking
    randomLook();     // start random eye/face movement
  }
});

// Set initial styles
gsap.set(".bg", { transformOrigin: "50% 50%" });
gsap.set(".ear-right", { transformOrigin: "0% 50%" });
gsap.set(".ear-left", { transformOrigin: "100% 50%" });
gsap.set(".me", { opacity: 1 });

// Entrance animation
meTl
  .from(".me", { duration: 1, yPercent: 100, ease: "elastic.out(0.5, 0.4)" }, 0.5)
  .from(".head, .hair, .shadow", { duration: 0.9, yPercent: 20, ease: "elastic.out(0.58, 0.25)" }, 0.6)
  .from(".ear-right", { duration: 1, rotate: 40, yPercent: 10, ease: "elastic.out(0.5, 0.2)" }, 0.7)
  .from(".ear-left", { duration: 1, rotate: -40, yPercent: 10, ease: "elastic.out(0.5, 0.2)" }, 0.7)
  .to(".glasses", { duration: 1, keyframes: [{ yPercent: -10 }, { yPercent: 0 }], ease: "elastic.out(0.5, 0.2)" }, 0.75)
  .from(".eyebrow-right, .eyebrow-left", { duration: 1, yPercent: 300, ease: "elastic.out(0.5, 0.2)" }, 0.7)
  .to(".eye-right, .eye-left", { duration: 0.01, opacity: 1 }, 0.85)
  .to(".eye-right-2, .eye-left-2", { duration: 0.01, opacity: 0 }, 0.85);

// Blinking animation
const blink = gsap.timeline({ repeat: -1, repeatDelay: 5, paused: true });
blink
  .to(".eye-right, .eye-left", { duration: 0.01, opacity: 0 }, 0)
  .to(".eye-right-2, .eye-left-2", { duration: 0.01, opacity: 1 }, 0)
  .to(".eye-right, .eye-left", { duration: 0.01, opacity: 1 }, 0.15)
  .to(".eye-right-2, .eye-left-2", { duration: 0.01, opacity: 0 }, 0.15);

// Custom wiggle for dizzy effect (optional)
CustomWiggle.create("myWiggle", { wiggles: 6, type: "ease-out" });
CustomWiggle.create("lessWiggle", { wiggles: 4, type: "ease-in-out" });

// ----------------------
// RANDOM LOOK FUNCTION
// ----------------------
function randomLook() {
  function move() {
    // Random offsets relative to screen width/height
    const x = (Math.random() - 0.5) * 40; // -10 to +10
    const y = (Math.random() - 0.5) * 40; // -10 to +10

    gsap.to(dom.face, { xPercent: x / 3, yPercent: y / 3, duration: 0.8, ease: "power1.inOut" });
    gsap.to(dom.eyes, { xPercent: x / 1.5, yPercent: y / 1.5, duration: 0.8, ease: "power1.inOut" });
    gsap.to(dom.innerFace, { xPercent: x / 6, yPercent: y / 6, duration: 0.8, ease: "power1.inOut" });
    gsap.to(dom.hairFront, { xPercent: x / 15, yPercent: y / 15, duration: 0.8, ease: "power1.inOut" });
    gsap.to([dom.hairBack, dom.shadow], { xPercent: -x / 20, yPercent: -y / 20, duration: 0.8, ease: "power1.inOut" });
    gsap.to(dom.ears, { xPercent: -x / 10, yPercent: -y / 10, duration: 0.8, ease: "power1.inOut" });
    gsap.to(dom.eyebrows, { yPercent: y * 2, duration: 0.8, ease: "power1.inOut" });

    // Call move again after a random delay (1–3s)
    setTimeout(move, Math.random() * 2000 + 1000);
  }

  move(); // start the loop
}

// ----------------------
// WINDOW RESIZE
// ----------------------
function updateWindowSize() {
  window.height = window.innerHeight;
  window.width = window.innerWidth;
}
updateWindowSize();
window.addEventListener("resize", updateWindowSize);
