"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const header = document.querySelector<HTMLElement>(".header");
    const hero = document.querySelector<HTMLElement>(".hero");
    const context = canvas?.getContext("2d");
    if (!canvas || !header || !hero || !context) return;

    const preference = matchMedia("(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)");
    const points: { x: number; y: number; time: number }[] = [];
    const lifetime = 850;
    let frame = 0;

    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      points.length = 0;
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const sizeCanvas = () => {
      clear();
      const top = header.getBoundingClientRect().top;
      canvas.style.top = `${top + window.scrollY}px`;
      canvas.style.height = `${hero.getBoundingClientRect().bottom - top}px`;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    const resize = new ResizeObserver(sizeCanvas);
    resize.observe(header);
    resize.observe(hero);
    sizeCanvas();

    const paint = (time: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      while (points.length && time - points[0].time >= lifetime) points.shift();
      for (const { x, y, time: start } of points) {
        const age = Math.max(0, (time - start) / lifetime);
        const radius = 62 + age * 45;
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(154,202,83,${0.30 * (1 - age)})`);
        gradient.addColorStop(0.6, `rgba(117,178,127,${0.15 * (1 - age)})`);
        gradient.addColorStop(1, "rgba(117,178,127,0)");
        context.fillStyle = gradient;
        context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }
      frame = points.length ? requestAnimationFrame(paint) : 0;
    };

    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType === "touch") return;
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const previous = points[points.length - 1];
      if (previous && Math.hypot(x - previous.x, y - previous.y) < 7) return;
      points.push({ x, y, time: performance.now() });
      if (points.length > 36) points.shift();
      if (!frame) frame = requestAnimationFrame(paint);
    };

    header.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointermove", move, { passive: true });
    preference.addEventListener("change", clear);
    return () => {
      resize.disconnect();
      header.removeEventListener("pointermove", move);
      hero.removeEventListener("pointermove", move);
      preference.removeEventListener("change", clear);
      clear();
    };
  }, []);

  return <canvas ref={ref} className="cursor-glow" aria-hidden="true" />;
}
