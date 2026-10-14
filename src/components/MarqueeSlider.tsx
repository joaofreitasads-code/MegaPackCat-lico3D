import React from 'react';

interface MarqueeItem {
  id?: string | number;
  title: string;
  img: string;
}

interface MarqueeSliderProps {
  items: MarqueeItem[];
  style?: React.CSSProperties;
  reverse?: boolean;
  speedSeconds?: number;
}

export const MarqueeSlider: React.FC<MarqueeSliderProps> = ({
  items,
  style,
  reverse = false,
  speedSeconds = 35,
}) => {
  // Double items to ensure seamless infinite loop for -50% translate3d
  const displayItems = [...items, ...items];

  const animationName = reverse ? 'marqueeScrollRight' : 'marqueeScrollLeft';

  return (
    <div className="marquee" style={style}>
      <div
        className="mq-view overflow-x-hidden scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div
          className="mq-track"
          style={{
            animation: `${animationName} ${speedSeconds}s linear infinite`,
            animationPlayState: 'running',
            willChange: 'transform',
          }}
        >
          {displayItems.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="mq-item flex-shrink-0 select-none"
            >
              <img
                alt={item.title}
                loading={idx < 2 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                src={item.img}
                className="w-full h-full object-cover block select-none pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
