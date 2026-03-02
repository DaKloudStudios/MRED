import React, { useEffect } from 'react';
import { PROJECTS } from '../constants.tsx';
import Slideshow from './Slideshow';
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
    <section className="pt-32 pb-20 flex flex-col gap-24 relative">

      {/* Main Portfolio Segment */}
      <div className="flex flex-col h-[100vh] relative">
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

        <div className="flex-grow flex items-center justify-center relative w-full h-[80vh]">
          <DomeGallery
            images={[
              ...galleryImages.filter(img => !img.src.includes('6336_fargo') && !img.src.includes('4475_plata')).slice(0, 12),
              ...galleryImages.filter(img => img.src.includes('4475_plata')).slice(0, 10)
            ]}
            fit={0.55}
            minRadius={400}
            maxRadius={700}
            grayscale={false}
            overlayBlurColor="rgba(0,0,0,0)"
            openedImageWidth="40vw"
            openedImageHeight="52vh"
          />
        </div>

        {/* Quick interaction info at bottom */}
        <div className="absolute bottom-8 left-0 w-full text-center z-20 pointer-events-none opacity-50">
          <p className="text-[10px] uppercase tracking-widest text-white">Swipe to rotate the sphere · MRED Experience</p>
        </div>
      </div>

      {/* 6336 Fargo Segment */}
      <div className="flex flex-col h-[100vh] relative">
        <div className="px-6 md:px-12 max-w-[1440px] mx-auto w-full z-20 pointer-events-none mb-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-red-600 mb-4">Featured Project</h2>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              6336 Fargo Transformation.
            </h1>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm font-light leading-relaxed">
              Witness the dramatic before and after of one of our most comprehensive residential projects.
            </p>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center relative w-full h-[80vh] px-4 md:px-12">
          <Slideshow
            images={galleryImages.filter(img => img.src.includes('6336_fargo/after'))}
          />
        </div>

      </div>

      {/* 4475 Plata Segment */}
      <div className="flex flex-col h-[100vh] relative">
        <div className="px-6 md:px-12 max-w-[1440px] mx-auto w-full z-20 pointer-events-none mb-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-red-600 mb-4">Featured Project</h2>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              4475 Plata Transformation.
            </h1>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm font-light leading-relaxed">
              Experience the exceptional craftsmanship and modern aesthetic applied to this residential overhaul.
            </p>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center relative w-full h-[80vh] px-4 md:px-12">
          <Slideshow
            images={galleryImages.filter(img => img.src.includes('4475_plata/after'))}
          />
        </div>

      </div>
    </section>
  );
};

export default Projects;
