import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withSlogan?: boolean;
}

export default function BrandLogo({ className = '', size = 'md' }: BrandLogoProps) {
  const sizeClasses = {
    sm: 'h-12 md:h-14',
    md: 'h-20 md:h-24',
    lg: 'h-32 md:h-40',
    xl: 'h-44 md:h-56',
  }[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <img
        src="/logo.jpg"
        alt="D&H INOX SAS - Calidad y Tecnología"
        className={`${sizeClasses} w-auto object-contain rounded-xl shadow-lg border border-slate-700/60 transition-transform duration-300 hover:scale-102`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}


