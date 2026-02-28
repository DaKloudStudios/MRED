import React, { useRef, useState } from 'react';

interface PremiumCardProps {
    children: React.ReactNode;
    className?: string;
}

const PremiumCard: React.FC<PremiumCardProps> = ({ children, className = '' }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={`relative h-full rounded-[32px] overflow-hidden bg-black/40 backdrop-blur-2xl border border-white/5 transition-all duration-700 hover:-translate-y-2 hover:border-white/10 hover:shadow-[0_20px_40px_-20px_rgba(220,38,38,0.15)] group ${className}`}
        >
            {/* Top subtle border line animation */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-1000 ease-out z-20"></div>

            {/* Dynamic white spotlight that follows mouse */}
            <div
                className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                }}
            />

            {/* Deep red accent glow that follows mouse */}
            <div
                className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-700 group-hover:opacity-100 z-10 mix-blend-screen"
                style={{
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220,38,38,0.15), transparent 45%)`,
                }}
            />

            <div className="relative z-20 p-8 md:p-10 h-full flex flex-col justify-between pointer-events-none">
                {children}
            </div>
        </div>
    );
};

export default PremiumCard;
