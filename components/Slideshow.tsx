import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideshowProps {
    images: { src: string; alt: string }[];
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) return null;

    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (dir: number) => ({
            zIndex: 0,
            x: dir < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95,
        }),
    };

    return (
        <div className="relative w-full h-[70vh] max-w-[1200px] mx-auto overflow-hidden rounded-xl shadow-2xl group bg-zinc-900 border border-white/10">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.4 },
                        scale: { duration: 0.4 }
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

            {/* Navigation Buttons */}
            <button
                onClick={handlePrev}
                className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 hover:border-red-600 focus:opacity-100 z-10"
                aria-label="Previous image"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <button
                onClick={handleNext}
                className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 hover:border-red-600 focus:opacity-100 z-10"
                aria-label="Next image"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 right-6 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs tracking-widest font-medium z-10 flex items-center gap-2">
                <span className="text-red-500">{currentIndex + 1}</span>
                <span className="text-zinc-500">/</span>
                <span>{images.length}</span>
            </div>

            {/* Image Title / Alt */}
            <div className="absolute bottom-6 left-6 max-w-[70%] z-10">
                <h3 className="text-white text-sm md:text-base font-medium tracking-wide drop-shadow-md">
                    {images[currentIndex].alt}
                </h3>
            </div>
        </div>
    );
};

export default Slideshow;
