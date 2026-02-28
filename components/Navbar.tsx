
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NAV_ITEMS, CONTACT_INFO } from '../constants.tsx';
import { ViewType } from '../App.tsx';
import RadioNav from './RadioNav';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetView = id as ViewType;
    setMobileMenuOpen(false);
    setTimeout(() => onNavigate(targetView), 300);
  };

  // Filter out 'contact' for the Nav, keep it for the button
  const navItems = NAV_ITEMS.filter(item => item.id !== 'contact');
  const contactItem = NAV_ITEMS.find(item => item.id === 'contact');

  // Helper to determine nav styles
  const isCompact = isScrolled || currentView !== 'home';
  const navClasses = `fixed top-0 left-0 w-full z-[900] transition-all duration-500 ${
    isCompact 
      ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10 shadow-lg' 
      : 'bg-transparent py-6 md:py-8'
  }`;

  return (
    <>
      <nav className={navClasses}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center relative">
          {/* Logo Area */}
          <div className="flex items-center relative z-50">
            <button 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} 
              className="flex items-center gap-3 transition-opacity hover:opacity-80 cursor-pointer outline-none focus:outline-none bg-transparent border-none p-0"
            >
              <img 
                src="/images/Untitled-design-3.webp" 
                alt="MRED LLC Logo" 
                className="h-14 md:h-16 w-auto object-contain"
              />
              <span className="text-xl md:text-2xl font-bold tracking-tighter text-white">
                M<span className="text-red-600">RE</span>D LLC
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-12 items-center relative z-50">
            {/* New Radio Animation Nav for Main Links */}
            <RadioNav 
              items={navItems} 
              currentId={currentView}
              onItemClick={(id) => onNavigate(id as ViewType)}
            />

            {/* CTA Button */}
            {contactItem && (
               <a 
                  href={contactItem.href}
                  onClick={(e) => handleNavClick(e, contactItem.id)}
                  className="btn-cta ml-4"
               >
                  {contactItem.label}
               </a>
            )}
          </div>

          {/* Mobile Menu Toggle (Hamburger) */}
          <button 
              className={`md:hidden group relative z-50 p-2 -mr-2 text-white outline-none cursor-pointer transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
          >
              <div className="flex flex-col gap-1.5 items-end pointer-events-none">
                  <span className="w-8 h-[2px] bg-white group-hover:bg-red-600 transition-colors"></span>
                  <span className="w-6 h-[2px] bg-white group-hover:bg-red-600 transition-colors"></span>
                  <span className="w-4 h-[2px] bg-white group-hover:bg-red-600 transition-colors"></span>
              </div>
          </button>
        </div>
      </nav>

      {/* Mobile Side Drawer & Backdrop - Rendered via Portal to escape parent stacking contexts/clipping */}
      {createPortal(
        <div className={`fixed inset-0 z-[1000] md:hidden ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {/* Backdrop */}
            <div 
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
                    mobileMenuOpen ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Drawer */}
            <div 
                className={`absolute top-0 right-0 h-full w-[85%] max-w-[400px] bg-white border-l border-zinc-200 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col ${
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Drawer Header */}
                <div className="p-6 flex justify-between items-center border-b border-zinc-100 shrink-0">
                    <span className="text-xs font-bold tracking-[0.2em] text-red-600 uppercase">Navigation</span>
                    <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 text-black hover:text-red-600 transition-colors cursor-pointer"
                    >
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                         </svg>
                    </button>
                </div>

                {/* Drawer Links */}
                <div className="flex-grow flex flex-col justify-center px-8 gap-8 overflow-y-auto">
                    {NAV_ITEMS.map((item, index) => (
                        <a
                            key={item.id}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.id)}
                            className={`text-3xl font-bold uppercase tracking-tighter transition-all duration-500 transform flex items-center gap-4 group cursor-pointer ${
                                mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                            }`}
                            style={{ transitionDelay: `${index * 50 + 100}ms` }}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full bg-black transition-transform duration-300 ${currentView === item.id ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}></span>
                            <span className={`${currentView === item.id ? 'text-red-800' : 'text-red-600 hover:text-red-800 transition-colors'}`}>
                                {item.label}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Drawer Footer */}
                <div className="p-8 border-t border-zinc-100 bg-zinc-50 shrink-0">
                     <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-4">Contact Us</p>
                     <a href={`tel:${CONTACT_INFO.phone}`} className="block text-xl text-black font-light mb-1 hover:text-red-600 transition-colors">{CONTACT_INFO.phone}</a>
                     <a href={`mailto:${CONTACT_INFO.email}`} className="block text-sm text-zinc-500 hover:text-black transition-colors">{CONTACT_INFO.email}</a>
                     
                     <div className="mt-6 pt-6 border-t border-zinc-200 flex gap-4">
                        <a href={CONTACT_INFO.facebook} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-red-600 text-xs uppercase tracking-wider transition-colors">Facebook</a>
                        <a href={CONTACT_INFO.googleBusiness} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-red-600 text-xs uppercase tracking-wider transition-colors">Google</a>
                     </div>
                </div>
            </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Navbar;
