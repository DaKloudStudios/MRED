
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BackgroundEffects from './BackgroundEffects';
import { ViewType } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  return (
    <div className="selection:bg-red-600 selection:text-white min-h-screen flex flex-col bg-black relative overflow-hidden text-white">
      {/* Background Layer */}
      <BackgroundEffects currentView={currentView} />
      
      {/* Navigation Layer */}
      <Navbar currentView={currentView} onNavigate={onNavigate} />
      
      {/* Content Layer */}
      <main className="flex-grow relative z-10">
        <div key={currentView} className="animate-fadeIn">
          {children}
        </div>
      </main>
      
      {/* Footer Layer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default Layout;
