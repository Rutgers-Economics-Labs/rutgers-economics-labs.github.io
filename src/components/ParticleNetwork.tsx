"use client";
import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 140;
const MOUSE_REPEL_DISTANCE = 120;
const MOUSE_REPEL_STRENGTH = 0.4;
const PARTICLE_SPEED = 0.35;

export default function ParticleNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const el = canvas; // non-null alias for use inside closures
        const ctx = el.getContext("2d");
        if (!ctx) return;
        const gfx = ctx; // non-null alias for closures

        function resize() {
            el.width = el.offsetWidth;
            el.height = el.offsetHeight;
        }

        function initParticles() {
            particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
                x: Math.random() * el.width,
                y: Math.random() * el.height,
                vx: (Math.random() - 0.5) * PARTICLE_SPEED,
                vy: (Math.random() - 0.5) * PARTICLE_SPEED,
                radius: Math.random() * 1.5 + 0.8,
                opacity: Math.random() * 0.4 + 0.2,
            }));
        }

        function draw() {
            gfx.clearRect(0, 0, el.width, el.height);

            const mouse = mouseRef.current;
            const particles = particlesRef.current;

            // Update positions
            for (const p of particles) {
                // Mouse repulsion
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_REPEL_DISTANCE && dist > 0) {
                    const force = (MOUSE_REPEL_DISTANCE - dist) / MOUSE_REPEL_DISTANCE;
                    p.vx += (dx / dist) * force * MOUSE_REPEL_STRENGTH;
                    p.vy += (dy / dist) * force * MOUSE_REPEL_STRENGTH;
                }

                // Dampen velocity
                p.vx *= 0.98;
                p.vy *= 0.98;

                // Clamp speed
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > PARTICLE_SPEED * 3) {
                    p.vx = (p.vx / speed) * PARTICLE_SPEED * 3;
                    p.vy = (p.vy / speed) * PARTICLE_SPEED * 3;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = el.width;
                if (p.x > el.width) p.x = 0;
                if (p.y < 0) p.y = el.height;
                if (p.y > el.height) p.y = 0;
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DISTANCE) {
                        const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.25;
                        gfx.beginPath();
                        gfx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                        gfx.lineWidth = 0.8;
                        gfx.moveTo(particles[i].x, particles[i].y);
                        gfx.lineTo(particles[j].x, particles[j].y);
                        gfx.stroke();
                    }
                }
            }

            // Draw particles
            for (const p of particles) {
                gfx.beginPath();
                gfx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                gfx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                gfx.fill();
            }

            rafRef.current = requestAnimationFrame(draw);
        }

        function onMouseMove(e: MouseEvent) {
            const rect = el.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        }

        function onMouseLeave() {
            mouseRef.current = { x: -9999, y: -9999 };
        }

        resize();
        initParticles();
        draw();

        window.addEventListener("resize", () => { resize(); initParticles(); });
        el.addEventListener("mousemove", onMouseMove);
        el.addEventListener("mouseleave", onMouseLeave);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            el.removeEventListener("mousemove", onMouseMove);
            el.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
                pointerEvents: "auto",
            }}
        />
    );
}
