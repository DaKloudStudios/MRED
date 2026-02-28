
import React from 'react';
import './RadioNav.css';

interface RadioNavProps {
  items: { label: string; href: string; id: string }[];
  currentId: string;
  onItemClick: (id: string) => void;
  className?: string;
}

const RadioNav: React.FC<RadioNavProps> = ({
  items,
  currentId,
  onItemClick,
  className = ''
}) => {
  return (
    <div className={`radio-inputs ${className}`}>
      {items.map((item) => {
        const isActive = currentId === item.id;
        return (
          <label key={item.id} className="radio">
            <input
              type="radio"
              name="radio-nav"
              checked={isActive}
              onChange={() => onItemClick(item.id)}
            />
            <span 
              className="name" 
              onClick={(e) => {
                // Ensure anchor behavior if needed, or just handle via onChange
                // We prevent default to stop page jumps if href is hash
                if (item.href.startsWith('#')) e.preventDefault();
                onItemClick(item.id);
              }}
            >
              {item.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default RadioNav;
