
import React, { useEffect } from 'react';
import { PROJECTS } from '../constants.tsx';
import DomeGallery from './DomeGallery';

const Projects: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = PROJECTS.map(p => ({
    src: p.imageUrl,
    alt: `${p.title} - ${p.location}`
  }));

  return (
    <section className="pt-32 pb-0 h-[125vh] flex flex-col overflow-hidden animate-fadeIn relative">
      <div className="px-6 md:px-12 max-w-[1440px] mx-auto w-full z-20 pointer-events-none mb-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-red-600 mb-4">Experiential Portfolio</h2>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            Explore our legacy.
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm font-light leading-relaxed">
            Interact with the project dome to discover the precision and detail that define MRED LLC. Drag to navigate and click to enlarge.
          </p>
        </div>
      </div>
      
      {/* 3D Gallery Container */}
      <div className="flex-grow relative z-10 w-full">
        <DomeGallery 
          images={galleryImages} 
          fit={0.55}
          minRadius={400}
          maxRadius={700}
          grayscale={true}
          overlayBlurColor="rgba(0,0,0,0)"
          openedImageWidth="40vw"
          openedImageHeight="52vh"
        />
      </div>

      {/* Quick interaction info at bottom */}
      <div className="absolute bottom-8 left-0 w-full text-center z-20 pointer-events-none opacity-50">
        <p className="text-[10px] uppercase tracking-widest text-white">Swipe to rotate the sphere · MRED Experience</p>
      </div>
    </section>
  );
};

export default Projects;
