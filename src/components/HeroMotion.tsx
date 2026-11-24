"use client";

import { useEffect, useRef } from "react";

export default function HeroMotion() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.closest<HTMLElement>(".hero");
    const cannon = hero?.querySelector(".hero-logo");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !hero || !cannon) return;

    const preference = matchMedia("(prefers-reduced-motion: no-preference)");
    function listen() {
      if (!preference.matches || !canvas || !ctx || !hero || !cannon) return;
      const surface = canvas;
      const context = ctx;
      const cannonImage = cannon;
      const lifetime = 850;
      const points: { x: number; y: number; time: number; angle: number }[] = [];
      const notes: { x: number; y: number; time: number; vx: number; vy: number; spin: number; scale: number }[] = [];
      const noteLifetime = 1050;
      const stamp = document.createElement("canvas");
      stamp.width = 80;
      stamp.height = 44;
      const ink = stamp.getContext("2d");
      if (!ink) return;
      ink.fillStyle = "#0b2f1d";
      ink.fillRect(0, 0, 80, 44);
      ink.fillStyle = "#c7e59a";
      ink.fillRect(3, 3, 74, 38);
      ink.strokeStyle = "#477850";
      ink.lineWidth = 2;
      ink.strokeRect(8, 8, 64, 28);
      ink.beginPath();
      ink.ellipse(40, 22, 14, 17, 0, 0, Math.PI * 2);
      ink.fill();
      ink.stroke();
      ink.fillStyle = "#0b2f1d";
      ink.font = "bold 24px sans-serif";
      ink.textAlign = "center";
      ink.fillText("€", 40, 31);
      let frame = 0;
      let previous: { x: number; y: number } | undefined;

      function resize() {
        surface.width = surface.clientWidth;
        surface.height = surface.clientHeight;
      }
      function paint(time: number) {
        context.clearRect(0, 0, surface.width, surface.height);
        while (points.length && time - points[0].time >= lifetime) points.shift();
        for (const point of points) {
          const age = Math.max(0, (time - point.time) / lifetime);
          const radius = 62 + age * 45;
          const x = point.x + Math.cos(point.angle + age * 3) * age * 22;
          const y = point.y + Math.sin(point.angle + age * 3) * age * 22;
          const wash = context.createRadialGradient(x, y, 0, x, y, radius);
          wash.addColorStop(0, `rgba(154,202,83,${0.30 * (1 - age)})`);
          wash.addColorStop(0.6, `rgba(117,178,127,${0.15 * (1 - age)})`);
          wash.addColorStop(1, "rgba(117,178,127,0)");
          context.fillStyle = wash;
          context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
        }
        while (notes.length && time - notes[0].time >= noteLifetime) notes.shift();
        for (const note of notes) {
          const age = Math.max(0, (time - note.time) / noteLifetime);
          context.save();
          context.translate(note.x + note.vx * age, note.y + note.vy * age);
          context.rotate(note.spin * (0.15 + age));
          context.scale(note.scale, note.scale * (0.35 + 0.65 * Math.abs(Math.cos(age * 7 + note.spin))));
          context.globalAlpha = Math.min(1, (1 - age) * 2);
          context.drawImage(stamp, -20, -11, 40, 22);
          context.restore();
        }
        frame = points.length || notes.length ? requestAnimationFrame(paint) : 0;
      }
      function fire() {
        const artwork = cannonImage.getBoundingClientRect();
        if (document.hidden || !artwork.width || !artwork.height ||
            artwork.bottom <= 0 || artwork.top >= window.innerHeight) return;

        const bounds = surface.getBoundingClientRect();
        // The front of the muzzle is at 67% across and 32% down the artwork.
        const x = artwork.left - bounds.left + artwork.width * 0.67;
        const y = artwork.top - bounds.top + artwork.height * 0.32;
        const now = performance.now();
        for (let i = 0; i < 20; i++) {
          const angle = -0.85 + Math.random() * 0.65;
          const speed = 120 + Math.random() * 180;
          notes.push({
            x, y, time: now,
            vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            spin: (Math.random() - 0.5) * 4,
            scale: (0.65 + Math.random() * 0.45) * Math.min(1, artwork.width / 400),
          });
        }
        if (!frame) frame = requestAnimationFrame(paint);
      }
      function move(event: PointerEvent) {
        if (!hero || event.pointerType === "touch") return;
        const rect = hero.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const dx = x - (previous?.x ?? x);
        const dy = y - (previous?.y ?? y);
        if (!previous || Math.hypot(dx, dy) >= 7) {
          points.push({ x, y, angle: Math.atan2(dy, dx), time: performance.now() });
          if (points.length > 36) points.shift();
          previous = { x, y };
        }
        hero.style.setProperty("--hero-x", `${(x / rect.width - 0.5) * 18}px`);
        hero.style.setProperty("--hero-y", `${(y / rect.height - 0.5) * 14}px`);
        if (!frame) frame = requestAnimationFrame(paint);
      }
      function leave() {
        previous = undefined;
        hero?.style.removeProperty("--hero-x");
        hero?.style.removeProperty("--hero-y");
      }
      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(surface);
      hero.addEventListener("pointermove", move, { passive: true });
      hero.addEventListener("pointerleave", leave);
      const firingTimer = window.setInterval(fire, 1900);
      fire();
      return () => {
        observer.disconnect();
        hero.removeEventListener("pointermove", move);
        hero.removeEventListener("pointerleave", leave);
        window.clearInterval(firingTimer);
        cancelAnimationFrame(frame);
        context.clearRect(0, 0, surface.width, surface.height);
        leave();
      };
    }
    let stop = listen();
    function refresh() { stop?.(); stop = listen(); }
    preference.addEventListener("change", refresh);
    return () => { preference.removeEventListener("change", refresh); stop?.(); };
  }, []);

  return <canvas ref={ref} className="hero-motion" aria-hidden="true" />;
}
