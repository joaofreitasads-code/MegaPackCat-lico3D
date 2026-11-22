import { useRef, useState } from 'react';

interface TestimonialsCarouselProps {
  images: string[];
}

export function TestimonialsCarousel({ images }: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  };

  const next = () => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <>
      <div
        className="relative overflow-hidden rounded-2xl touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          id="depTrack"
          className="flex transition-transform duration-500 ease-out"
          style={{
            willChange: 'transform',
            transform: `translate3d(-${current * 100}%, 0px, 0px)`,
          }}
        >
          {images.map((src, idx) => (
            <div key={src} className="w-full flex-shrink-0 px-2">
              <img
                src={src}
                alt={`Depoimento ${idx + 1}`}
                loading="lazy"
                decoding="async"
                width={512}
                height={800}
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl shadow-black border border-[#c9a84c]/15 object-cover"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Anterior"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1a1a1a]/80 border border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d0d0d] transition-colors flex items-center justify-center cursor-pointer text-xl select-none"
        >
          ‹
        </button>

        <button
          type="button"
          aria-label="Próximo"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1a1a1a]/80 border border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d0d0d] transition-colors flex items-center justify-center cursor-pointer text-xl select-none"
        >
          ›
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6" id="depDots">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Ir para depoimento ${idx + 1}`}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === current ? 'w-8 bg-[#c9a84c]' : 'w-2 bg-[#c9a84c]/30'
            }`}
          />
        ))}
      </div>
    </>
  );
}
