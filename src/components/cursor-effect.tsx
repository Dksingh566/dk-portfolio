
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

interface CursorEffectProps {
  color?: string;
}

export function CursorEffect({ color = '#4ADE80' }: CursorEffectProps) {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.tagName === 'BUTTON' || 
                         target.tagName === 'A' || 
                         !!target.closest('button') || 
                         !!target.closest('a') ||
                         window.getComputedStyle(target).cursor === 'pointer';
                         
      setIsPointer(isClickable);
      setIsVisible(true);
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);
  
  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      if (link instanceof HTMLElement) {
        link.style.cursor = 'none';
      }
    });
    
    return () => {
      document.body.style.cursor = '';
      links.forEach(link => {
        if (link instanceof HTMLElement) {
          link.style.cursor = '';
        }
      });
    };
  }, []);
  
  // Return null on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }
  
  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
          borderColor: isPointer ? color : 'rgba(255, 255, 255, 0.2)',
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
          mass: 0.5,
        }}
        style={{
          border: `1.5px solid ${isPointer ? color : 'rgba(255, 255, 255, 0.2)'}`,
          backgroundColor: isPointer ? 'transparent' : color,
        }}
      />
      
      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isClicking ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isPointer ? color : 'rgba(255, 255, 255, 0.8)',
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 400,
        }}
      />
    </>
  );
}

export default CursorEffect;
