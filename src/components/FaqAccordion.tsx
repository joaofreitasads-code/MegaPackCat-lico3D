import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3 text-left">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.question}
            className="bg-[#0d0d0d] rounded-xl border border-white/5 overflow-hidden transition-colors hover:border-[#c9a84c]/20"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(idx)}
              className="w-full p-5 list-none cursor-pointer flex justify-between items-center gap-4 text-left"
            >
              <span className="text-sm md:text-base font-medium text-white">
                {item.question}
              </span>
              <span
                className={`text-[#c9a84c] transition-transform duration-300 text-xl leading-none font-light select-none ${
                  isOpen ? 'rotate-45' : 'rotate-0'
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm md:text-base text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
