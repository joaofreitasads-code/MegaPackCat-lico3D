import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LuminariasCarouselProps {
  images: string[];
}

export function LuminariasCarousel({ images }: LuminariasCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);

    const firstCard = el.firstElementChild as HTMLElement | null;
    if (firstCard) {
      const cardStep = firstCard.offsetWidth + 14;
      const idx = Math.round(el.scrollLeft / cardStep);
      setActiveIndex(Math.max(0, Math.min(images.length - 1, idx)));
    }
  }, [images.length]);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState]);

  const scrollByDirection = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 16 : 256;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    if (child) {
      el.scrollTo({ left: child.offsetLeft - 4, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-4">
      {/* Mobile counter & arrows */}
      <div className="flex items-center justify-between mb-3 px-2 sm:hidden">
        <span className="text-xs text-[#c9a84c] font-medium tracking-wide flex items-center gap-1.5">
          <span>👉</span> Deslize para ver ({activeIndex + 1}/{images.length})
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Anterior"
            disabled={!canPrev}
            onClick={() => scrollByDirection(-1)}
            className="w-8 h-8 rounded-full border border-[#c9a84c]/40 bg-[#1a1a1a] text-[#f0d78c] disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center active:scale-95 cursor-pointer shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Próximo"
            disabled={!canNext}
            onClick={() => scrollByDirection(1)}
            className="w-8 h-8 rounded-full border border-[#c9a84c]/40 bg-[#1a1a1a] text-[#f0d78c] disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center active:scale-95 cursor-pointer shadow-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop Left Arrow */}
      <button
        type="button"
        aria-label="Ver anterior"
        disabled={!canPrev}
        onClick={() => scrollByDirection(-1)}
        className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-[#c9a84c]/40 bg-[#0d0d0d]/90 text-[#f0d78c] hover:bg-[#c9a84c] hover:text-[#0d0d0d] disabled:opacity-20 disabled:pointer-events-none transition-all items-center justify-center shadow-xl backdrop-blur-md cursor-pointer active:scale-95"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Edge gradients */}
      <div className="hidden sm:block absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10 pointer-events-none" />
      <div className="hidden sm:block absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10 pointer-events-none" />

      {/* Horizontal snap scroller */}
      <div
        ref={scrollerRef}
        onScroll={updateScrollState}
        className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory py-2 px-1 sm:px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overscroll-x-contain touch-pan-x"
      >
        {images.map((src, idx) => (
          <div
            key={src}
            className="snap-start flex-shrink-0 w-[155px] sm:w-[220px] md:w-[240px] h-[210px] sm:h-[280px] md:h-[310px] rounded-[18px] sm:rounded-[20px] overflow-hidden border border-[#c9a84c]/25 bg-[#1a1a1a] shadow-lg shadow-black/70"
          >
            <img
              src={src}
              alt={`Luminária 3D ${idx + 1}`}
              loading="lazy"
              decoding="async"
              width={240}
              height={310}
              className="w-full h-full object-cover block select-none pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Desktop Right Arrow */}
      <button
        type="button"
        aria-label="Ver próximo"
        disabled={!canNext}
        onClick={() => scrollByDirection(1)}
        className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-[#c9a84c]/40 bg-[#0d0d0d]/90 text-[#f0d78c] hover:bg-[#c9a84c] hover:text-[#0d0d0d] disabled:opacity-20 disabled:pointer-events-none transition-all items-center justify-center shadow-xl backdrop-blur-md cursor-pointer active:scale-95"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Mobile Dots */}
      <div className="flex sm:hidden justify-center gap-1.5 mt-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Ver luminária ${idx + 1}`}
            onClick={() => scrollToIndex(idx)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              idx === activeIndex ? 'w-5 bg-[#c9a84c]' : 'w-1.5 bg-[#c9a84c]/25'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
