
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // 1. Movement Logic
    const moveCursor = (e: MouseEvent) => {
      // Reveal cursor on first move
      if (!isVisible) setIsVisible(true);
      
      if (cursorRef.current) {
        // We use translate3d for performance.
        // The CSS margins (-15px) handle the centering relative to this point.
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    // 2. Click Logic
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setClicks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((click) => click.id !== id));
      }, 600);
    };

    // 3. Hover Detection Logic
    // We use event delegation on the document to detect hovering interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target or its parents are interactive
      const isInteractive = 
        target.matches('a, button, input, textarea, select, [role="button"]') ||
        target.closest('a, button, input, textarea, select, [role="button"]');
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleClick);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleClick);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isVisible]);

  // Don't render on server or if not visible yet (prevents top-left glitch)
  // We use opacity in CSS to fade it in, but here we can just return null if needed.
  
  const cursorContent = (
    <>
      {/* The Logo Cursor */}
      <div 
        ref={cursorRef} 
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div className="custom-cursor-inner">
          <img 
            src="/images/Untitled-design-3.webp" 
            alt="cursor" 
          />
        </div>
      </div>

      {/* The Pulsation Rings */}
      {clicks.map((click) => (
        <div
          key={click.id}
          className="cursor-pulse"
          style={{ left: click.x, top: click.y }}
        />
      ))}
    </>
  );

  // Render directly to body to ensure z-index beats all app containers
  return createPortal(cursorContent, document.body);
};

export default CustomCursor;
