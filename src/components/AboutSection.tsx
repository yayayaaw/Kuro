import React from 'react';
import { CafeCMSContent } from '../cms/types';

interface AboutProps {
  philosophy: CafeCMSContent['philosophy'];
}

export const AboutSection: React.FC<AboutProps> = ({ philosophy }) => {
  return (
    <section id="tentang" className="py-24 md:py-32 border-b border-[#161514]/10 bg-[#F7F5F0]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left: Section Marker & Title */}
          <div className="md:col-span-4 space-y-3 text-left">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#161514]/50 font-light block">
              {philosophy.label}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#161514] leading-tight">
              {philosophy.title} <br />
              <span className="italic font-light">{philosophy.italicTitle}</span>
            </h2>
          </div>

          {/* Right: Narrative Text */}
          <div className="md:col-span-8 space-y-6 text-[#161514]/80 text-base leading-relaxed text-left font-light">
            <p>{philosophy.paragraph1}</p>
            <p>{philosophy.paragraph2}</p>

            {/* 3 Simple Editorial Numbers */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#161514]/10">
              <div className="space-y-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#161514] block">
                  {philosophy.stat1Number}
                </span>
                <span className="text-[11px] tracking-wider uppercase text-[#161514]/60">
                  {philosophy.stat1Label}
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#161514] block">
                  {philosophy.stat2Number}
                </span>
                <span className="text-[11px] tracking-wider uppercase text-[#161514]/60">
                  {philosophy.stat2Label}
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#161514] block">
                  {philosophy.stat3Number}
                </span>
                <span className="text-[11px] tracking-wider uppercase text-[#161514]/60">
                  {philosophy.stat3Label}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
