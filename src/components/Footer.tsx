import React from 'react';
import { CafeCMSContent } from '../cms/types';

interface FooterProps {
  branding: CafeCMSContent['branding'];
}

export const Footer: React.FC<FooterProps> = ({ branding }) => {
  return (
    <footer className="bg-[#F7F5F0] text-[#161514] py-16 border-t border-[#161514]/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-8 pb-12 border-b border-[#161514]/10">
          <div className="space-y-2 text-left">
            <span className="font-serif text-2xl font-normal tracking-[0.25em] uppercase">
              {branding.name}
            </span>
            <p className="text-xs text-[#161514]/60 font-light max-w-sm">
              {branding.headline}
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs tracking-[0.15em] uppercase text-[#161514]/70">
            <a href="#tentang" className="hover:text-[#161514] transition-colors">Filosofi</a>
            <a href="#menu" className="hover:text-[#161514] transition-colors">Menu Kopi</a>
            <a href="#ruang" className="hover:text-[#161514] transition-colors">Ruang</a>
            <a href="#ulasan" className="hover:text-[#161514] transition-colors">Ulasan</a>
            <a href="#lokasi" className="hover:text-[#161514] transition-colors">Lokasi</a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#161514]/50 font-light gap-4">
          <p>© {new Date().getFullYear()} {branding.name} Coffee Atelier. Senopati, Jakarta Selatan.</p>
          <p>Dua fokus murni: Ketelitian rasa dan keheningan ruang.</p>
        </div>

      </div>
    </footer>
  );
};
