
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

export type ViewType = 'home' | 'work' | 'services' | 'about' | 'contact';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');

  const navigateTo = (targetView: ViewType) => {
    setView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout currentView={view} onNavigate={navigateTo}>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {view === 'home' && <Hero key="home" onNavigate={navigateTo} />}
        {view === 'work' && <Projects key="work" />}
        {view === 'services' && <Services key="services" />}
        {view === 'about' && <Intro key="about" />}
        {view === 'contact' && <Contact key="contact" />}
      </AnimatePresence>
    </Layout>
  );
};

export default App;
