import React, { useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { CafeCMSContent } from '../cms/types';

interface NavbarProps {
  onOpenBooking: () => void;
  branding: CafeCMSContent['branding'];
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, branding }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Filosofi', href: '#tentang' },
    { label: 'Menu Kopi', href: '#menu' },
    { label: 'Ruang', href: '#ruang' },
    { label: 'Ulasan', href: '#ulasan' },
    { label: 'Lokasi & Jam', href: '#lokasi' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#161514]/10 transition-all">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex flex-col text-left group">
          <span className="font-serif text-2xl font-normal tracking-[0.25em] text-[#161514] uppercase">
            {branding.name}
          </span>
          <span className="text-[9px] tracking-[0.3em] text-[#161514]/60 uppercase font-light -mt-0.5">
            {branding.subName}
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.15em] uppercase text-[#161514]/70 hover:text-[#161514] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 border border-[#161514] text-[#161514] text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#161514] hover:text-[#F7F5F0] transition-all duration-300 cursor-pointer"
          >
            Reservasi Meja
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#161514] hover:opacity-70 transition-opacity"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F5F0] border-b border-[#161514]/10 px-6 py-6 space-y-5">
          <nav className="flex flex-col space-y-4 text-left">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-[0.15em] uppercase text-[#161514]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#161514]/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-[#161514] text-[#F7F5F0] text-xs font-medium tracking-[0.15em] uppercase"
            >
              Reservasi Meja
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
