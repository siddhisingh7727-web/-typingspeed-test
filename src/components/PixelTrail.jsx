import React, { useCallback, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDimensions } from '../hooks/useDimensions';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PixelTrail({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
}) {
  const containerRef = useRef(null);
  const dimensions = useDimensions(containerRef);
  const trailId = useRef(uuidv4());

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);

      const pixelElement = document.getElementById(
        `${trailId.current}-pixel-${x}-${y}`
      );
      if (pixelElement) {
        const animatePixel = pixelElement.__animatePixel;
        if (animatePixel) animatePixel();
      }
    },
    [pixelSize]
  );

  const columns = useMemo(
    () => Math.ceil(dimensions.width / pixelSize),
    [dimensions.width, pixelSize]
  );
  const rows = useMemo(
    () => Math.ceil(dimensions.height / pixelSize),
    [dimensions.height, pixelSize]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 w-full h-full pointer-events-auto',
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId.current}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              className={pixelClassName}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const PixelDot = React.memo(
  ({ id, size, fadeDuration, delay, className }) => {
    const elRef = useRef(null);
    const timeoutRef = useRef(null);
    const isAnimatingRef = useRef(false);

    const animatePixel = useCallback(() => {
      if (!elRef.current) return;
      if (isAnimatingRef.current) {
        // Restart animation if already running
        clearTimeout(timeoutRef.current);
      }
      isAnimatingRef.current = true;

      const el = elRef.current;
      el.style.transition = 'none';
      el.style.opacity = '1';

      // Force reflow
      el.offsetHeight;

      el.style.transition = `opacity ${fadeDuration}ms ease-out ${delay}ms`;
      el.style.opacity = '0';

      timeoutRef.current = setTimeout(() => {
        isAnimatingRef.current = false;
      }, fadeDuration + delay);
    }, [fadeDuration, delay]);

    const ref = useCallback(
      (node) => {
        if (node) {
          elRef.current = node;
          node.__animatePixel = animatePixel;
        }
      },
      [animatePixel]
    );

    return (
      <div
        id={id}
        ref={ref}
        className={cn('cursor-pointer-none', className)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          opacity: 0,
        }}
      />
    );
  }
);

PixelDot.displayName = 'PixelDot';
