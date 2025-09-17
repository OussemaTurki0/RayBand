// src/components/AnimatedAvatar/AnimatedAvatar.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase, CustomWiggle } from "gsap/all";
import "./AnimatedAvatar.css";

gsap.registerPlugin(CustomEase, CustomWiggle);

export default function AnimatedAvatar() {
  const avatarRef = useRef(null);

  useEffect(() => {
    const dom = {
      face: avatarRef.current.querySelector(".face"),
      eyes: avatarRef.current.querySelectorAll(".eye"),
      innerFace: avatarRef.current.querySelector(".inner-face"),
      hairFront: avatarRef.current.querySelector(".hair-front"),
      hairBack: avatarRef.current.querySelector(".hair-back"),
      shadow: avatarRef.current.querySelectorAll(".shadow"),
      ears: avatarRef.current.querySelectorAll(".ear"),
      eyebrows: [
        avatarRef.current.querySelector(".eyebrow-left"),
        avatarRef.current.querySelector(".eyebrow-right"),
      ],
    };

    // Main entrance animation
    const meTl = gsap.timeline({
      delay: 1,
      onComplete: () => {
        blink.play();
        randomLook();
      },
    });

    gsap.set(".bg", { transformOrigin: "50% 50%" });
    gsap.set(".ear-right", { transformOrigin: "0% 50%" });
    gsap.set(".ear-left", { transformOrigin: "100% 50%" });
    gsap.set(".me", { opacity: 1 });

    meTl
      .from(".me", { duration: 1, yPercent: 100, ease: "elastic.out(0.5, 0.4)" }, 0.5)
      .from(
        ".head, .hair, .shadow",
        { duration: 0.9, yPercent: 20, ease: "elastic.out(0.58, 0.25)" },
        0.6
      )
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

    // Custom wiggle
    CustomWiggle.create("myWiggle", { wiggles: 6, type: "ease-out" });
    CustomWiggle.create("lessWiggle", { wiggles: 4, type: "ease-in-out" });

    // Random look function
    function randomLook() {
      function move() {
        const x = (Math.random() - 0.5) * 40;
        const y = (Math.random() - 0.5) * 40;

        gsap.to(dom.face, { xPercent: x / 3, yPercent: y / 3, duration: 0.8, ease: "power1.inOut" });
        gsap.to(dom.eyes, { xPercent: x / 1.5, yPercent: y / 1.5, duration: 0.8, ease: "power1.inOut" });
        gsap.to(dom.innerFace, { xPercent: x / 6, yPercent: y / 6, duration: 0.8, ease: "power1.inOut" });
        gsap.to(dom.hairFront, { xPercent: x / 15, yPercent: y / 15, duration: 0.8, ease: "power1.inOut" });
        gsap.to([dom.hairBack, dom.shadow], { xPercent: -x / 20, yPercent: -y / 20, duration: 0.8, ease: "power1.inOut" });
        gsap.to(dom.ears, { xPercent: -x / 10, yPercent: -y / 10, duration: 0.8, ease: "power1.inOut" });
        gsap.to(dom.eyebrows, { yPercent: y * 2, duration: 0.8, ease: "power1.inOut" });

        setTimeout(move, Math.random() * 2000 + 1000);
      }
      move();
    }

    // Window resize
    function updateWindowSize() {
      window.height = window.innerHeight;
      window.width = window.innerWidth;
    }
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return (
    <div ref={avatarRef}>
      <svg viewBox="0 10 211.73 180" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <clipPath id="background-clip">
            <path
              d="M39 153.73s31.57 19.71 77.26 15.21 90.18-37.23 90.36-72.33-8.82-80.28-33.59-86.29C136.84-6.57 114.13-5.82 88-2.82S34.73 11.45 16.71 48.24C-1.5 66.64-4.88 125.2 39 153.73z"
              fill="none"
            />
          </clipPath>

          <linearGradient id="linear-gradient" x1="102.94" y1="154.47" x2="102.94" y2="36.93" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fff5cc" />
            <stop offset="0.01" stopColor="#faf0c8" />
            <stop offset="0.19" stopColor="#c2b599" />
            <stop offset="0.35" stopColor="#998977" />
            <stop offset="0.47" stopColor="#806f62" />
            <stop offset="0.54" stopColor="#77655a" />
            <stop offset="0.6" stopColor="#77655a" />
            <stop offset="1" stopColor="#77655a" />
          </linearGradient>
        </defs>

        {/* Paste all your SVG body elements here (paths, g, etc.) */}
        {/* Replace class -> className, stroke-linecap -> strokeLinecap, etc. */}
      </svg>
    </div>
  );
}
