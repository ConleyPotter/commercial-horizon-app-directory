import React from 'react';

interface UtilityIconProps {
  src: string;
  alt: string;
}

const UtilityIcon: React.FC<UtilityIconProps> = ({ src, alt }) => {
  return (
    <img 
      loading="lazy" 
      src={src} 
      alt={alt} 
      className="object-contain shrink-0 w-7 aspect-square"
    />
  );
};

export default UtilityIcon;