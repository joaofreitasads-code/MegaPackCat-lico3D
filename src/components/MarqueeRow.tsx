import { useEffect, useRef, useState } from 'react';

interface MarqueeRowProps {
  images: string[];
  direction?: 'left' | 'right';
  className?: string;
  speed?: 'normal' | 'fast';
}

export function MarqueeRow({
  images,
  direction = 'left',
  className = '',
  speed = 'normal',
}: MarqueeRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const items = [...images, ...images];
  const animationClass =
    direction === 'right' ? 'animate-marquee-right' : 'animate-marquee-left';

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '150px 0px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative w-full max-w-[1140px] mx-auto my-2 sm:my-3 overflow-hidden rounded-2xl select-none [contain:paint_layout] ${className}`}
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '1140px 240px',
      }}
    >
      <div className="absolute inset-y-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-[#141216] via-[#141216]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-[#141216] via-[#141216]/80 to-transparent z-10 pointer-events-none" />

      <div
        className={`${animationClass} gap-2.5 sm:gap-4 py-1.5`}
        style={{
          animationPlayState: isVisible && !isPaused ? 'running' : 'paused',
          animationDuration: speed === 'fast' ? '24s' : undefined,
          willChange: isVisible ? 'transform' : 'auto',
        }}
      >
        {items.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="flex-shrink-0 w-[140px] sm:w-[210px] md:w-[240px] h-[185px] sm:h-[270px] md:h-[310px] rounded-[16px] sm:rounded-[20px] overflow-hidden border border-[#c9a84c]/25 bg-[#1a1a1a] shadow-md shadow-black/60"
          >
            <img
              src={src}
              alt={`Modelo STL Católico ${idx + 1}`}
              loading="lazy"
              decoding="async"
              width={240}
              height={310}
              className="w-full h-full object-cover block pointer-events-none select-none transition-opacity duration-300"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
