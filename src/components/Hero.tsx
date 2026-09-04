import React from 'react';
import { CafeCMSContent } from '../cms/types';

interface HeroProps {
  onOpenBooking: () => void;
  hero: CafeCMSContent['hero'];
  announcement: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, hero, announcement }) => {
  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 border-b border-[#161514]/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Top Editorial Label */}
        {announcement && announcement.trim() !== '' && (
          <div className="text-center mb-8">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#161514]/60 font-light block">
              {announcement}
            </span>
          </div>
        )}

        {/* Grand Headline */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#161514] tracking-tight leading-[1.12]">
            {hero.headline} <br />
            <span className="italic font-light">{hero.italicPart}</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#161514]/70 leading-relaxed font-normal">
            {hero.description}
          </p>

          {/* Simple Clean Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#menu"
              className="px-7 py-3 bg-[#161514] text-[#F7F5F0] text-xs tracking-[0.15em] uppercase hover:bg-[#2A2724] transition-colors duration-200"
            >
              Lihat Menu Kopi
            </a>
            <button
              onClick={onOpenBooking}
              className="px-7 py-3 border border-[#161514] text-[#161514] text-xs tracking-[0.15em] uppercase hover:bg-[#161514] hover:text-[#F7F5F0] transition-colors duration-200 cursor-pointer"
            >
              Reservasi Meja
            </button>
          </div>
        </div>

        {/* Large Architectural Photography Frame */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="relative aspect-[16/9] overflow-hidden bg-[#161514]/5 border border-[#161514]/10">
            <img
              src={hero.image}
              alt="Interior Minimalis Kuro Cafe"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale-[10%] contrast-[1.02]"
            />
          </div>

          {/* Subtitle Under Image */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-xs text-[#161514]/60">
            <span>{hero.captionLeft}</span>
            <span>{hero.captionCenter}</span>
            <span>{hero.captionRight}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
