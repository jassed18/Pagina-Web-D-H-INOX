import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withSlogan?: boolean;
}

export default function BrandLogo({ className = '', size = 'md', withSlogan = true }: BrandLogoProps) {
  // Determine dimensions
  const dims = {
    sm: { width: 140, height: 75 },
    md: { width: 240, height: 130 },
    lg: { width: 340, height: 180 },
    xl: { width: 440, height: 230 },
  }[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Premium Metallic SVG representation of the D&H INOX SAS logo */}
      <svg
        width={dims.width}
        height={dims.height}
        viewBox="0 0 500 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          {/* Chrome/Metallic Gradients */}
          <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EEEEEE" />
            <stop offset="25%" stopColor="#CCCCCC" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#999999" />
            <stop offset="100%" stopColor="#DDDDDD" />
          </linearGradient>

          {/* Electric Blue Gradient */}
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A2FF" />
            <stop offset="50%" stopColor="#0055FF" />
            <stop offset="100%" stopColor="#0022AA" />
          </linearGradient>

          {/* Dark Metallic Ring Gradient */}
          <linearGradient id="darkMetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#444444" />
            <stop offset="100%" stopColor="#111111" />
          </linearGradient>

          {/* Deep Red Gradient */}
          <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF3333" />
            <stop offset="50%" stopColor="#CC0000" />
            <stop offset="100%" stopColor="#880000" />
          </linearGradient>

          {/* Steel Stroke Gradient */}
          <linearGradient id="steelStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#666666" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
          </linearGradient>

          {/* Carbon Fiber Background Pattern */}
          <pattern id="carbonPattern" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#15171e" />
            <polygon points="0,0 3,0 0,3" fill="#1d202b" />
            <polygon points="3,3 6,3 3,6" fill="#1d202b" />
            <polygon points="3,0 6,0 6,3" fill="#252936" />
            <polygon points="0,3 3,3 0,6" fill="#252936" />
          </pattern>
          
          <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Elegant Carbon-Metallic Circular Plate (Matches the 3D vibe) */}
        <circle cx="250" cy="115" r="110" fill="url(#carbonPattern)" stroke="url(#steelStroke)" strokeWidth="4" />
        <circle cx="250" cy="115" r="102" fill="none" stroke="#0055FF" strokeWidth="1.5" strokeOpacity="0.6" />

        {/* Outer Glowing Arcs */}
        {/* Blue Arc (Top Left to Bottom Right) */}
        <path
          d="M 160,70 A 105,105 0 0,1 340,70"
          fill="none"
          stroke="url(#blueGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        <path
          d="M 160,70 A 105,105 0 0,1 340,70"
          fill="none"
          stroke="url(#chromeGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Silver Arc (Bottom Right to Top Left) */}
        <path
          d="M 340,160 A 105,105 0 0,1 160,160"
          fill="none"
          stroke="url(#chromeGrad)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 340,160 A 105,105 0 0,1 160,160"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Brand Text Elements - Recreating D&H INOX SAS */}
        
        {/* "D&H" Letters (Red with bold chrome stroke) */}
        <g id="DHGroup" transform="translate(145, 45)">
          {/* Shadow/Glow behind D&H */}
          <text
            x="0"
            y="40"
            fontFamily="Impact, sans-serif"
            fontSize="52"
            fontStyle="italic"
            fontWeight="bold"
            fill="#000000"
            opacity="0.8"
            dx="4"
            dy="4"
          >
            D&H
          </text>
          {/* Main D&H */}
          <text
            x="0"
            y="40"
            fontFamily="Impact, sans-serif"
            fontSize="52"
            fontStyle="italic"
            fontWeight="bold"
            fill="url(#redGrad)"
            stroke="url(#chromeGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          >
            D&H
          </text>
        </g>

        {/* "INOX" Main Letters (Large Chrome Steel Font) */}
        <g id="INOXGroup" transform="translate(90, 110)">
          {/* Heavy black backing for 3D extrusion */}
          <text
            x="0"
            y="50"
            fontFamily="'Arial Black', sans-serif"
            fontSize="78"
            fontWeight="900"
            fill="#080808"
            letterSpacing="-2"
          >
            INOX
          </text>
          <text
            x="2"
            y="47"
            fontFamily="'Arial Black', sans-serif"
            fontSize="78"
            fontWeight="900"
            fill="#222"
            letterSpacing="-2"
          >
            INOX
          </text>
          {/* Chrome Front Surface */}
          <text
            x="0"
            y="45"
            fontFamily="'Arial Black', sans-serif"
            fontSize="78"
            fontWeight="900"
            fill="url(#chromeGrad)"
            stroke="#111"
            strokeWidth="2"
            letterSpacing="-2"
          >
            INOX
          </text>
        </g>

        {/* "X" overlaps nicely with electric blue gradient on its right leg */}
        {/* We can highlight the X accent specifically like the brand logo */}
        <g id="X-Accent" transform="translate(325, 110)">
          <text
            x="0"
            y="45"
            fontFamily="'Arial Black', sans-serif"
            fontSize="78"
            fontWeight="900"
            fill="url(#blueGrad)"
            letterSpacing="-2"
            opacity="0.95"
          >
            X
          </text>
        </g>

        {/* "SAS." Text (Blue clean bold) */}
        <g id="SASGroup" transform="translate(340, 172)">
          <text
            x="0"
            y="20"
            fontFamily="'Montserrat', 'Arial Black', sans-serif"
            fontSize="26"
            fontWeight="900"
            fill="url(#blueGrad)"
            letterSpacing="1"
            stroke="#000000"
            strokeWidth="1"
          >
            SAS.
          </text>
        </g>
      </svg>

      {/* Slogan Container below the graphic */}
      {withSlogan && (
        <div className="mt-1 px-4 py-1.5 bg-gradient-to-r from-red-600 via-slate-800 to-blue-600 rounded-md border border-slate-700 shadow-inner flex items-center justify-center min-w-[220px]">
          <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-white font-bold uppercase whitespace-nowrap">
            Calidad y Tecnología
          </span>
        </div>
      )}
    </div>
  );
}
