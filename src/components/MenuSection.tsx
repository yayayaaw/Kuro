import React, { useState } from 'react';
import { MenuItem } from '../types';

interface MenuProps {
  items: MenuItem[];
}

export const MenuSection: React.FC<MenuProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<MenuItem['category']>('espresso');

  const categories: { id: MenuItem['category']; label: string }[] = [
    { id: 'espresso', label: 'Espresso & Milk' },
    { id: 'filter', label: 'Filter Slow Bar' },
    { id: 'signature', label: 'Signature' },
    { id: 'pastry', label: 'Artisan Pastry' },
  ];

  const filteredItems = items.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 md:py-32 border-b border-[#161514]/10 bg-[#F7F5F0]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#161514]/50 font-light block">
            Kurasi Rasa
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#161514]">
            Daftar Menu Pilihan
          </h2>
          <p className="text-xs sm:text-sm text-[#161514]/65 max-w-md mx-auto font-light">
            Setiap cangkir diracik segar berdasarkan pesanan menggunakan biji kopi musiman berkualitas tinggi.
          </p>
        </div>

        {/* Minimal Category Tabs */}
        <div className="flex items-center justify-center space-x-6 sm:space-x-10 border-b border-[#161514]/10 pb-4 mb-12 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs tracking-[0.2em] uppercase transition-all duration-200 pb-2 cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'text-[#161514] font-semibold border-b-2 border-[#161514]'
                  : 'text-[#161514]/50 hover:text-[#161514]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Clean Editorial Menu Items List */}
        <div className="space-y-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="group border-b border-[#161514]/10 pb-6 text-left"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-[#161514]">
                    {item.name}
                  </h3>
                  <span className="font-serif text-base sm:text-lg text-[#161514] font-medium tracking-tight">
                    {item.price}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#161514]/70 font-light mt-1.5 leading-relaxed">
                  {item.description}
                </p>

                {item.notes && item.notes.length > 0 && (
                  <div className="flex items-center space-x-3 mt-2 text-[10px] tracking-wider uppercase text-[#161514]/50">
                    <span>Notes:</span>
                    <span>{item.notes.join(' • ')}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-[#161514]/50 font-light">
              Belum ada item untuk kategori ini.
            </div>
          )}
        </div>

        <div className="mt-12 text-center text-xs text-[#161514]/50 font-light">
          *Pilihan susu alternatif (Oat Milk / Almond Milk) tersedia berdasarkan permintaan (+10K).
        </div>

      </div>
    </section>
  );
};
