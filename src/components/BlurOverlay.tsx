import React from 'react';

interface BlurOverlayProps {
  children: React.ReactNode;
  isBlurred?: boolean;
  blurIntensity?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const BlurOverlay: React.FC<BlurOverlayProps> = ({
  children,
  isBlurred = true,
  blurIntensity = 'md',
  className = ''
}) => {
  const blurClasses = {
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg',
    xl: 'blur-xl'
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`transition-all duration-300 ${
          isBlurred ? `${blurClasses[blurIntensity]} pointer-events-none select-none` : ''
        }`}
      >
        {children}
      </div>
      
      {isBlurred && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none" />
      )}
    </div>
  );
};

export default BlurOverlay;