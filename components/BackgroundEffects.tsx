
import React from 'react';
import { ViewType } from '../App';

interface BackgroundEffectsProps {
  currentView: ViewType;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ currentView }) => {
  // Hide ambient lighting on Services page for pure black background contrast
  const isServices = currentView === 'services';

  if (isServices) return null;

  return (
    <>
      <div className="ambient-dim-center"></div>
      <div className="ambient-dim-top"></div>
      <div className="ambient-dim-bottom"></div>
    </>
  );
};

export default BackgroundEffects;
