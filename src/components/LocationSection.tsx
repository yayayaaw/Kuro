import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CafeCMSContent } from '../cms/types';

interface LocationProps {
  location: CafeCMSContent['location'];
}

export const LocationSection: React.FC<LocationProps> = ({ location }) => {
  return (
    <section id="lokasi" className="py-24 md:py-32 border-b border-[#161514]/10 bg-[#F7F5F0]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start text-left">
          
          {/* Col 1: Title & Info */}
          <div className="md:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#161514]/50 font-light block">
                Kunjungan
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#161514]">
                Lokasi & Jam Temu
              </h2>
              <p className="text-xs sm:text-sm text-[#161514]/70 leading-relaxed font-light">
                Terletak di kawasan rindang Senopati, mudah dijangkau untuk memulai pagi atau bersantai di pengujung hari.
              </p>
            </div>

            <div className="space-y-6 pt-2 border-t border-[#161514]/10 text-sm">
              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#161514]/50 block">
                  Alamat
                </span>
                <p className="text-[#161514] font-normal leading-relaxed">
                  {location.address}
                </p>
                <a
                  href={location.gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs tracking-wider uppercase text-[#161514] underline underline-offset-4 pt-1 hover:opacity-70 transition-opacity"
                >
                  Petunjuk Google Maps
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#161514]/50 block">
                  Jam Buka
                </span>
                <p className="text-[#161514] font-normal">
                  Senin – Jumat: <span className="font-medium">{location.weekdayHours} WIB</span>
                </p>
                <p className="text-[#161514] font-normal">
                  Sabtu – Minggu: <span className="font-medium">{location.weekendHours} WIB</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#161514]/50 block">
                  Kontak & Concierge
                </span>
                <p className="text-[#161514] font-normal">
                  WhatsApp: <a href={`https://wa.me/${location.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{location.phone}</a>
                </p>
                <p className="text-[#161514] font-normal">
                  Instagram: <a href={`https://instagram.com/${location.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{location.instagram}</a>
                </p>
              </div>
            </div>
          </div>

          {/* Col 2: Facility & Quiet Space Guidelines */}
          <div className="md:col-span-6 space-y-6">
            {/* Quiet Space Guidelines */}
            <div className="border border-[#161514]/10 p-8 space-y-4 bg-[#F4F2EC]">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#161514]/50 block font-medium">
                Fasilitas & Norma Ruang
              </span>
              <ul className="text-xs sm:text-sm text-[#161514]/80 space-y-3 font-light leading-relaxed">
                {location.facilities.map((fac, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#161514]/50 mt-2 shrink-0" />
                    <span>{fac}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
