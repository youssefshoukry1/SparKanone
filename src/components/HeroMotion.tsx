"use client";

import { useEffect, useRef } from "react";

export default function HeroMotion() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.closest("section");
    const ctx = canvas?.getContext("2d");
    if (!hero || !canvas || !ctx) return;

    const preference = matchMedia("(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)");
    function listen() {
      if (!preference.matches || !hero || !canvas || !ctx) return;
      const surface = canvas;
      const context = ctx;
      const section = hero;
      const lifetime = 850;
      const points: { x: number; y: number; time: number; angle: number }[] = [];
      const notes: { x: number; y: number; time: number; vx: number; vy: number; spin: number; scale: number }[] = [];
      let lastEmission = -Infinity;
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
        surface.width = Math.round(section.clientWidth);
        surface.height = Math.round(section.clientHeight);
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
          context.translate(note.x + note.vx * age, note.y + note.vy * age + 96 * age * age);
          context.rotate(note.spin * (0.15 + age));
          context.scale(note.scale, note.scale * (0.35 + 0.65 * Math.abs(Math.cos(age * 7 + note.spin))));
          context.globalAlpha = Math.min(1, (1 - age) * 2);
          context.drawImage(stamp, -20, -11, 40, 22);
          context.restore();
        }
        frame = points.length || notes.length ? requestAnimationFrame(paint) : 0;
      }
      function move(event: PointerEvent) {
        if (event.pointerType === "touch") return;
        const rect = section.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const dx = x - (previous?.x ?? x);
        const dy = y - (previous?.y ?? y);
        const now = performance.now();
        const pause = now - lastEmission;
        if (pause >= 38) {
          const count = pause > 220 ? 12 : 3;
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 45 + Math.random() * 100;
            notes.push({
              x: x + Math.cos(angle) * 12, y: y + Math.sin(angle) * 12, time: now,
              vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 55,
              spin: (Math.random() - 0.5) * 4, scale: 0.65 + Math.random() * 0.5,
            });
          }
          if (notes.length > 72) notes.splice(0, notes.length - 72);
          lastEmission = now;
        }
        if (!previous || Math.hypot(dx, dy) >= 7) {
          points.push({ x, y, angle: Math.atan2(dy, dx), time: performance.now() });
          if (points.length > 36) points.shift();
          previous = { x, y };
        }
        section.style.setProperty("--hero-x", `${(x / rect.width - 0.5) * 18}px`);
        section.style.setProperty("--hero-y", `${(y / rect.height - 0.5) * 14}px`);
        if (!frame) frame = requestAnimationFrame(paint);
      }
      function leave() {
        previous = undefined;
        lastEmission = -Infinity;
        section.style.removeProperty("--hero-x");
        section.style.removeProperty("--hero-y");
      }
      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(section);
      section.addEventListener("pointermove", move);
      section.addEventListener("pointerleave", leave);
      return () => {
        observer.disconnect();
        section.removeEventListener("pointermove", move);
        section.removeEventListener("pointerleave", leave);
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
