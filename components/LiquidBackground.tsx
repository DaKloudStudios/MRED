import React from 'react';
import './LiquidBackground.css';

const LiquidBackground: React.FC = () => {
    return (
        <div className="liquid-bg-container pointer-events-none">
            {/* SVG Filter for the Gooey Liquid Effect */}
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="hidden-svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            {/* Bubbles and Base */}
            <div className="bubbles-container">
                {/* The bottom pool of liquid */}
                <div className="liquid-base"></div>
                <div className="liquid-base-2"></div>

                {/* Floating bubbles */}
                <div className="bubble b1"></div>
                <div className="bubble b2"></div>
                <div className="bubble b3"></div>
                <div className="bubble b4"></div>
                <div className="bubble b5"></div>
                <div className="bubble b6"></div>
                <div className="bubble b7"></div>
                <div className="bubble b8"></div>
                <div className="bubble b9"></div>
                <div className="bubble b10"></div>
            </div>

            {/* Deep overlay to make it look premium and blend with the dark theme */}
            <div className="liquid-overlay"></div>
        </div>
    );
};

export default LiquidBackground;
