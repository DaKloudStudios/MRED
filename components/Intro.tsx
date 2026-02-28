
import React, { useEffect } from 'react';
import ElectricBorder from './ElectricBorder';
import RotatingText from './RotatingText';

const Intro: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="pt-40 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto min-h-[80vh] relative overflow-hidden">
      
      {/* Background typographic texture */}
      <div className="absolute top-20 right-0 pointer-events-none opacity-[0.03] text-[20vw] font-bold leading-none text-white select-none overflow-hidden whitespace-nowrap z-0">
        ABOUT
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
        {/* Left Column - Sticky Title/Concept */}
        <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-40 lg:-translate-x-6 xl:-translate-x-10 transition-transform duration-500">
                <h1 className="text-6xl md:text-8xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-white mb-8 text-center lg:text-left">
                    Precision.<br/>
                    Integrity.<br/>
                    <div className="text-red-600 inline-block align-top">
                        <RotatingText 
                            texts={['Execution.', 'Excellence.', 'Experience.', 'Efficiency.', 'Expertise.', 'Engineering.', 'Evolution.']} 
                            mainClassName="overflow-hidden pb-1 sm:pb-2 md:pb-4 justify-center lg:justify-start rounded-lg h-[1.1em]"
                            staggerFrom="last"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            rotationInterval={3500}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        />
                    </div>
                </h1>
            </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-7 flex flex-col gap-20 pt-10 lg:pt-0">
            {/* Main Statement */}
            <div className="pl-0 md:pl-4 text-center lg:text-left">
                 <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                    Architectural integrity meets clinical execution.
                 </h3>
                 <p className="text-gray-500 font-light text-lg leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                    We bridge the gap between complex engineering and refined design, delivering spaces that function as beautifully as they are built. MRED LLC isn't just about pouring concrete; it's about upholding a standard of excellence that defines the Las Vegas skyline.
                 </p>
            </div>

            {/* Values Grid - Styled like Services Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                 {/* Item 1 */}
                 <ElectricBorder 
                    color="#dc2626"
                    speed={0.5}
                    chaos={0.15}
                    borderRadius={0} 
                    className="h-full"
                 >
                    <div className="bg-black p-10 group hover:bg-zinc-900 transition-colors duration-500 relative overflow-hidden h-full border border-white/5 text-left">
                        {/* Hover Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        
                        <div className="flex justify-between items-start mb-8">
                            <h4 className="text-red-600 font-bold uppercase tracking-widest text-xs">01</h4>
                            <span className="text-red-600 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">↘</span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-600 transition-colors">Quality Controlled</h3>
                        <p className="text-gray-500 font-light text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                            Every phase of construction is managed with rigorous attention to detail. We maintain strict site standards to ensure longevity and safety.
                        </p>
                        
                        {/* Subtle Red Glow on Hover */}
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-600/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                 </ElectricBorder>
                 
                 {/* Item 2 */}
                 <ElectricBorder 
                    color="#dc2626"
                    speed={0.5}
                    chaos={0.15}
                    borderRadius={0} 
                    className="h-full"
                 >
                    <div className="bg-black p-10 group hover:bg-zinc-900 transition-colors duration-500 relative overflow-hidden h-full border border-white/5 text-left">
                        {/* Hover Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>

                        <div className="flex justify-between items-start mb-8">
                            <h4 className="text-red-600 font-bold uppercase tracking-widest text-xs">02</h4>
                            <span className="text-red-600 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">↘</span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-600 transition-colors">Reliable Delivery</h3>
                        <p className="text-gray-500 font-light text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                            Construction is about logistics as much as it is about building. Our project managers ensure that every milestone is met without compromising on craftsmanship.
                        </p>

                        {/* Subtle Red Glow on Hover */}
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-600/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                 </ElectricBorder>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-12 md:gap-16 border-t border-white/10 pt-12 justify-center lg:justify-start">
                <div className="text-center lg:text-left">
                    <span className="block text-6xl md:text-8xl font-bold text-white mb-2">15+</span>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500">Years Experience</span>
                </div>
                 <div className="text-center lg:text-left">
                    <span className="block text-6xl md:text-8xl font-bold text-white mb-2">100%</span>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500">Client Satisfaction</span>
                </div>
                <div className="text-center lg:text-left">
                    <span className="block text-6xl md:text-8xl font-bold text-white mb-2">500+</span>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500">Projects</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
