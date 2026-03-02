
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ViewType } from '../App.tsx';
import VariableProximity from './VariableProximity.tsx';

interface HeroProps {
    onNavigate: (view: ViewType) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
    const containerRef = useRef(null);

    return (
        <motion.section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center px-6 md:px-12 bg-transparent z-20 overflow-hidden pt-24 pb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-2 md:gap-6">

                {/* Logo Section - Centered on page */}
                <div className="flex justify-center items-center w-full perspective-1000">
                    <div style={{ perspective: '1000px' }}>
                        <motion.img
                            src="/images/Untitled-design-3.webp"
                            alt="MRED Logo"
                            className="w-32 md:w-48 lg:w-64 h-auto object-contain"
                            initial={{ x: 0, opacity: 1, rotateY: 0 }}
                            animate={{ rotateY: 360 }}
                            transition={{
                                rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
                                default: { duration: 0.5 }
                            }}
                            exit={{
                                x: -500,
                                opacity: 0,
                                rotate: -10,
                                scale: 0.9,
                                transition: { duration: 0.5, ease: [0.32, 0, 0.67, 0] }
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center mt-4 md:mt-8">

                    {/* Text Content */}
                    <div className="flex flex-col items-center gap-8 md:gap-12 relative z-10 w-full max-w-4xl mx-auto">

                        {/* Headline Area */}
                        <div className="tracking-tighter leading-[0.95] text-center w-full">
                            {/* First Line */}
                            <div className="block mb-2 w-full flex justify-center">
                                <VariableProximity
                                    label="Built with Precision."
                                    className="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-white text-center"
                                    fromFontVariationSettings="'wght' 700, 'opsz' 9"
                                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                                    containerRef={containerRef}
                                    radius={100}
                                    falloff="gaussian"
                                />
                            </div>

                            {/* Second Line */}
                            <div className="block w-full flex justify-center">
                                <VariableProximity
                                    label="Driven by Integrity."
                                    className="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-zinc-500 text-center"
                                    fromFontVariationSettings="'wght' 700, 'opsz' 9"
                                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                                    containerRef={containerRef}
                                    radius={100}
                                    falloff="gaussian"
                                />
                            </div>
                        </div>

                        {/* Mission Statement & CTA */}
                        <div className="flex flex-col gap-10 items-center mt-4 pt-8 border-t border-white/10 w-full">
                            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 font-light leading-relaxed text-center max-w-3xl">
                                MRED LLC is a premier Las Vegas general contractor delivering excellence in commercial design-build and high-end residential construction.
                            </p>

                            <div className="flex justify-center">
                                <button
                                    onClick={() => onNavigate('work')}
                                    className="group flex items-center gap-4 text-sm md:text-base uppercase tracking-[0.25em] font-bold text-white hover:text-red-600 transition-colors"
                                >
                                    View Projects
                                    <span className="w-12 md:w-16 h-[1px] bg-white group-hover:w-24 group-hover:bg-red-600 transition-all duration-300"></span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </motion.section>
    );
};

export default Hero;
