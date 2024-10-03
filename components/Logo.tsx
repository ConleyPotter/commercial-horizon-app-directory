import React from 'react';
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width, height }) => {
  return (

    <Image
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4fba7f6780ba8da3eb349a9edd7519aa8cf6dd641c19b08b3f4d45bbc72255b?placeholderIfAbsent=true&apiKey=be7259c883834a85b6dffb65814e79a1"
      alt="Company Logo"
      className="object-contain self-stretch my-auto aspect-[4] min-w-[240px] w-[280px]"
      width={width || 280}
      height={height || 70}
    />
  );
};

export default Logo;