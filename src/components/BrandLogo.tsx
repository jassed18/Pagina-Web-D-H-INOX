import React, { useState } from 'react';
import { LOGO_BASE64 } from '../assets/logoBase64';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withSlogan?: boolean;
}

export default function BrandLogo({ className = '', size = 'md' }: BrandLogoProps) {
  const [imgSrc, setImgSrc] = useState<string>(LOGO_BASE64);
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'h-12 md:h-14',
    md: 'h-20 md:h-24',
    lg: 'h-32 md:h-40',
    xl: 'h-44 md:h-56',
  }[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {!hasError ? (
        <img
          src={imgSrc}
          alt="D&H INOX SAS - Calidad y Tecnología"
          className={`${sizeClasses} w-auto object-contain rounded-xl shadow-lg border border-slate-700/60 transition-transform duration-300 hover:scale-102`}
          referrerPolicy="no-referrer"
          onError={() => {
            if (imgSrc !== '/logo.jpg') {
              setImgSrc('/logo.jpg');
            } else {
              setHasError(true);
            }
          }}
        />
      ) : (
        <div className={`${sizeClasses} px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center`}>
          <span className="font-mono font-black text-white tracking-widest text-sm">D&H INOX SAS</span>
        </div>
      )}
    </div>
  );
}


