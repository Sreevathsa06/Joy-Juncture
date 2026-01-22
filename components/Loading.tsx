import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large' | number;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ size = 'medium', fullScreen = false }) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex items-center justify-center bg-white/30 dark:bg-black/30 backdrop-blur-md"
    : "flex items-center justify-center p-4";

  // Size mapping
  const sizeMap = {
    small: "h-8 w-8",
    medium: "h-16 w-16",
    large: "h-24 w-24"
  };
  // If `size` is a number, use inline styles; otherwise use Tailwind classes
  const isNumberSize = typeof size === 'number';
  const ringClass = isNumberSize ? 'rounded-full border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent opacity-80' : `${sizeMap[size]} rounded-full border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent opacity-80`;
  const ringStyle: React.CSSProperties | undefined = isNumberSize ? { width: size as number, height: size as number } : undefined;

  const innerDotSize = isNumberSize ? Math.max(6, Math.round((size as number) / 6)) : 12; // 12px corresponds roughly to h-3
  const innerDotStyle: React.CSSProperties | undefined = isNumberSize ? { width: innerDotSize, height: innerDotSize } : undefined;

  return (
    <div className={containerClasses}>
      <div className="relative flex items-center justify-center">
        {/* Outer Ring - Standard Purple */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className={ringClass}
          style={ringStyle}
        />

        {/* Inner Dot - Standard Yellow */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bg-yellow-500 rounded-full"
          style={innerDotStyle}
        />
      </div>
    </div>
  );
};

export default Loading;