
import React, { useEffect } from 'react';
import { SERVICES } from '../constants.tsx';
import CurvedLoop from './CurvedLoop';
import PremiumCard from './PremiumCard';
import LiquidBackground from './LiquidBackground';

const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="w-full relative min-h-[80vh] overflow-hidden bg-black/60 shadow-2xl">
      <LiquidBackground />

      {/* Background typographic texture */}
      <div className="absolute top-20 right-0 pointer-events-none opacity-[0.03] text-[20vw] font-bold leading-none text-white select-none overflow-hidden whitespace-nowrap z-0">
        SERVICES
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-40 pb-24 relative z-10 w-full">
        {/* 1. Header Section */}
        <div className="mb-32 md:mb-40 relative z-10">
          <div className="flex flex-col gap-10 border-b border-white/10 pb-12">

            {/* Top Label */}
            <div className="flex items-center justify-between">
              <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-red-600 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-red-600"></span>
                Scope of Work
              </h2>
              <p className="hidden md:block max-w-md text-gray-400 text-sm font-light leading-relaxed text-right">
                Comprehensive construction solutions for commercial and luxury residential sectors across Nevada.
              </p>
            </div>

            {/* Interactive Curved Title */}
            <div className="w-full -ml-4 md:-ml-8 overflow-visible">
              <CurvedLoop
                marqueeText="Our Capabilities ✦"
                speed={3}
                curveAmount={60}
                direction="left"
                interactive={true}
                separatorImage="https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDLOGO/Mred%20logo%20v2.png"
              />
            </div>

            {/* Mobile-only description (visible below title on small screens) */}
            <p className="md:hidden text-gray-400 text-lg font-light leading-relaxed">
              Comprehensive construction solutions for commercial and luxury residential sectors across Nevada.
            </p>
          </div>
        </div>

        {/* 2 & 3. Services Categories */}
        <div className="flex flex-col gap-40 relative z-10">
          {SERVICES.map((cat, catIndex) => (
            <div key={cat.category} className="group/category">

              {/* Category Header */}
              <div className="flex items-baseline gap-6 mb-16">
                <span className="text-red-600 font-mono text-xl md:text-2xl">0{catIndex + 1}</span>
                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                  {cat.category}
                </h3>
              </div>

              {/* Services Grid with Premium Glassmorphic Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {cat.items.map((item, index) => (
                  <PremiumCard key={item.title}>
                    <div className="mb-12 flex justify-between items-start">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-hover:text-red-500 transition-colors duration-500">
                        0{index + 1}
                      </span>
                      <span className="text-zinc-600 group-hover:text-red-500 transition-all duration-500 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 font-light">
                        ↗
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xl lg:text-2xl font-light tracking-tight mb-4 text-zinc-100 group-hover:text-white transition-colors duration-500">
                        {item.title}
                      </h4>

                      <p className="text-zinc-400 font-light text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-500">
                        {item.description}
                      </p>
                    </div>
                  </PremiumCard>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Bottom Element */}
        <div className="mt-32 border-t border-white/5 pt-8 flex justify-between items-center text-[10px] uppercase tracking-widest text-zinc-700">
          <span>MRED Standards</span>
          <span>Est. 2011</span>
        </div>

      </div>
    </section>
  );
};

export default Services;
