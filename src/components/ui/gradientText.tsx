'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface GradientTextProps {
  text: string;
  fontSize?: string;
  className?: string;
}

export default function GradientText({
  text,
  fontSize = '95vh',
  className = '',
}: GradientTextProps) {
  return (
    <motion.h1
      className={`relative m-0 p-0 overflow-hidden font-bold ${className}`}
      style={{
        fontSize,
        fontFamily: 'sans-serif',
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1em, #9E2053 1em, orange 20%), repeating-linear-gradient(45deg, #111626, #111626 1em, pink 1em, #571B3D 20%)',
        
        backgroundSize: '400% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        filter: 'blur(20px)',
      }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 0%'],
      }}
      transition={{
        duration: 8,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    >
      {text}
    </motion.h1>
  );
}

