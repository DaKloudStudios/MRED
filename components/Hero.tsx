
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-8 md:gap-10 relative z-10 order-2 lg:order-1">
              
              {/* Headline Area */}
              <div className="tracking-tighter leading-[0.95]">
                  {/* First Line */}
                  <div className="block text-center md:text-left mb-2">
                      <VariableProximity
                          label="Built with Precision."
                          className="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-white text-center md:text-left"
                          fromFontVariationSettings="'wght' 700, 'opsz' 9"
                          toFontVariationSettings="'wght' 1000, 'opsz' 40"
                          containerRef={containerRef}
                          radius={100}
                          falloff="gaussian"
                      />
                  </div>
                  
                  {/* Second Line */}
                  <div className="block text-center md:text-left">
                      <VariableProximity
                          label="Driven by Integrity."
                          className="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-zinc-500"
                          fromFontVariationSettings="'wght' 700, 'opsz' 9"
                          toFontVariationSettings="'wght' 1000, 'opsz' 40"
                          containerRef={containerRef}
                          radius={100}
                          falloff="gaussian"
                      />
                  </div>
              </div>

              {/* Mission Statement & CTA */}
              <div className="flex flex-col gap-8 md:pl-2 items-center md:items-start">
                  <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed border-l-0 md:border-l-2 border-red-600 pl-0 md:pl-6 text-center md:text-left max-w-xl">
                    MRED LLC is a premier Las Vegas general contractor delivering excellence in commercial design-build and high-end residential construction.
                  </p>

                   <div className="flex justify-center md:justify-start">
                      <button 
                          onClick={() => onNavigate('work')}
                          className="group flex items-center gap-4 text-sm uppercase tracking-[0.25em] font-bold text-white hover:text-red-600 transition-colors"
                      >
                          View Projects
                          <span className="w-12 h-[1px] bg-white group-hover:w-20 group-hover:bg-red-600 transition-all duration-300"></span>
                      </button>
                   </div>
              </div>
          </div>

          {/* Right Column: Video Placeholder */}
          <div className="order-1 lg:order-2 w-full relative z-0">
               <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 relative group bg-black/40 backdrop-blur-sm shadow-2xl shadow-red-900/10">
                  {/* Background Placeholder Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black opacity-80"></div>
                  
                  {/* Placeholder UI */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600">
                      <div className="w-20 h-20 rounded-full border border-zinc-700 flex items-center justify-center mb-4 group-hover:border-red-600/50 group-hover:scale-105 transition-all duration-500">
                          <svg className="w-8 h-8 fill-current group-hover:text-red-600 transition-colors" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                          </svg>
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] font-medium">Reel Coming Soon</span>
                  </div>

                  {/* Tech Accents */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                      <div className="absolute top-4 left-4 w-2 h-2 bg-red-600/50"></div>
                      <div className="absolute top-4 right-4 w-2 h-2 border border-white/20"></div>
                      <div className="absolute bottom-4 left-4 w-2 h-2 border border-white/20"></div>
                      <div className="absolute bottom-4 right-4 text-[10px] text-zinc-600 font-mono">REC ●</div>
                  </div>
               </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
