import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);

        // Create subtle, slow-moving washes of light
        const orbs = Array.from({ length: 5 }).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.2, // Much slower
            vy: (Math.random() - 0.5) * 0.2,
            radius: Math.random() * 400 + 400, // Much larger (400-800px)
            baseRadius: Math.random() * 400 + 400,
            color: `hsla(${Math.random() * 10 + 355}, 70%, 20%, ${Math.random() * 0.04 + 0.01})`, // Very dim red/crimson
            pulseMod: Math.random() * 0.005,
            time: Math.random() * Math.PI * 2
        }));

        let animationFrameId: number;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Fill base dark background
            ctx.fillStyle = '#020005';
            ctx.fillRect(0, 0, width, height);

            orbs.forEach(orb => {
                orb.time += orb.pulseMod;
                orb.radius = orb.baseRadius + Math.sin(orb.time) * 50;

                orb.x += orb.vx;
                orb.y += orb.vy;

                if (orb.x - orb.radius > width) orb.x = -orb.radius;
                if (orb.x + orb.radius < 0) orb.x = width + orb.radius;
                if (orb.y - orb.radius > height) orb.y = -orb.radius;
                if (orb.y + orb.radius < 0) orb.y = height + orb.radius;

                const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
                gradient.addColorStop(0, orb.color);
                gradient.addColorStop(1, 'transparent');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // Subtle noise overlay could go here, but avoiding to keep it clean and fast

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full object-cover opacity-80 mix-blend-screen" />
            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-70"></div>
        </div>
    );
};

export default AnimatedBackground;
