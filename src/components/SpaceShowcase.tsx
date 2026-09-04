import React from 'react';
import { CafeSpace } from '../types';

interface SpaceProps {
  spaces: CafeSpace[];
}

export const SpaceShowcase: React.FC<SpaceProps> = ({ spaces }) => {
  return (
    <section id="ruang" className="py-24 md:py-32 border-b border-[#161514]/10 bg-[#F7F5F0]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left space-y-3 mb-16">
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#161514]/50 font-light block">
            Tata Ruang
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#161514]">
            Kenyamanan dalam Kesederhanaan
          </h2>
          <p className="text-xs sm:text-sm text-[#161514]/70 leading-relaxed font-light">
            Ruang terbuka bernuansa alami dengan proporsi meja berjarak lapang, kursi ergonomis, dan sirkulasi udara bersih untuk fokus maksimal.
          </p>
        </div>

        {/* Dynamic Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spaces.map((space) => (
            <div key={space.id} className="group text-left space-y-4">
              <div className="aspect-[4/3] overflow-hidden bg-[#161514]/5 border border-[#161514]/10">
                <img
                  src={space.image}
                  alt={space.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-lg font-normal text-[#161514]">
                  {space.title}
                </h3>
                <p className="text-xs text-[#161514]/70 font-light leading-relaxed">
                  {space.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
