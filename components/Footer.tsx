
import React from 'react';
import { NAV_ITEMS, CONTACT_INFO } from '../constants.tsx';
import { ViewType } from '../App.tsx';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-6 px-6 md:px-12 max-w-[1440px] mx-auto border-t border-white/5 mt-auto relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
        <div className="md:col-span-4">
          <button 
            onClick={() => onNavigate('home')} 
            className="mb-3 outline-none text-white hover:opacity-80 transition-all text-left flex items-center gap-3"
          >
            <img 
              src="/images/Untitled-design-3.webp" 
              alt="MRED LLC Logo" 
              className="h-10 w-auto object-contain"
            />
            <span className="text-lg font-bold tracking-tighter text-white">
              M<span className="text-red-600">RE</span>D LLC
            </span>
          </button>
          <p className="text-[10px] text-gray-500 font-light max-w-xs leading-relaxed uppercase tracking-widest">
            Architectural precision and reliable execution across the state of Nevada. Since 2011.
          </p>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="text-[10px] uppercase tracking-widest text-red-600 font-bold mb-3">Directory</h4>
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.id} 
                onClick={() => onNavigate(item.id as ViewType)}
                className="text-[10px] text-gray-400 hover:text-white transition-colors text-left outline-none uppercase tracking-widest"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-[10px] uppercase tracking-widest text-red-600 font-bold mb-3">Connect</h4>
          <div className="flex flex-col gap-2">
             <a 
               href={CONTACT_INFO.facebook} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-[10px] text-gray-400 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2 group"
             >
                Facebook
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 -ml-1 group-hover:translate-x-1 duration-300">↗</span>
             </a>
             <a 
               href={CONTACT_INFO.googleBusiness} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-[10px] text-gray-400 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2 group"
             >
                Google Business
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 -ml-1 group-hover:translate-x-1 duration-300">↗</span>
             </a>
             <a 
               href={`mailto:${CONTACT_INFO.email}`} 
               className="text-[10px] text-gray-400 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2 group"
             >
                Email
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 -ml-1 group-hover:translate-x-1 duration-300">→</span>
             </a>
          </div>
        </div>

        <div className="md:col-span-3 md:text-right flex flex-col justify-between h-full">
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-red-600 font-bold mb-3">Location</h4>
            <div className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-widest mb-3">
              <p>{CONTACT_INFO.address.split(',')[0]}</p>
              <p>{CONTACT_INFO.address.split(',').slice(1).join(',')}</p>
            </div>
            <a 
                href={CONTACT_INFO.googleBusiness} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] uppercase tracking-widest font-bold text-white border-b border-red-600 pb-1 hover:text-red-600 transition-all inline-block"
            >
                View on Map
            </a>
          </div>
          
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700 font-bold mt-6 md:mt-0">
            &copy; {currentYear} MRED LLC.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
