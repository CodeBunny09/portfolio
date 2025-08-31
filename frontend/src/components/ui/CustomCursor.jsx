// src/components/ui/CustomCursor.jsx - Optimized for smooth movement
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Use refs for position to avoid unnecessary re-renders
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationId;
    
    const updateCursor = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (cursorRef.current) {
        const { x, y } = mousePosition.current;
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e) => {
      // Check if hovering over interactive elements
      const isInteractive = e.target.closest('a, button, [onclick]');
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Start animation loop
    animationId = requestAnimationFrame(animate);

    // Add event listeners
    document.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    />
  );
};

export default CustomCursor;