import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';
import { ReservationFormData } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    guests: 2,
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `KURO-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingCode(code);
    setIsSubmitted(true);

    const message = encodeURIComponent(
      `Halo KURO Coffee,\n\n` +
      `Saya ingin reservasi meja:\n` +
      `• Kode: ${code}\n` +
      `• Nama: ${formData.name}\n` +
      `• WhatsApp: ${formData.phone}\n` +
      `• Tanggal: ${formData.date}\n` +
      `• Jam: ${formData.time} WIB\n` +
      `• Jumlah Tamu: ${formData.guests} Orang\n` +
      (formData.notes ? `• Catatan: ${formData.notes}\n` : '') +
      `\nMohon konfirmasi ketersediaan meja. Terima kasih!`
    );

    window.open(`https://wa.me/${CAFE_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dim backdrop */}
      <div
        className="fixed inset-0 bg-[#161514]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#F7F5F0] border border-[#161514] w-full max-w-lg z-10 my-8 shadow-xl">
        
        {/* Header */}
        <div className="border-b border-[#161514]/10 px-6 py-5 flex items-center justify-between text-left">
          <div>
            <h3 className="font-serif text-xl font-normal text-[#161514]">
              Reservasi Meja
            </h3>
            <p className="text-[11px] tracking-wider uppercase text-[#161514]/50 font-light mt-0.5">
              KURO Coffee Atelier
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#161514]/60 hover:text-[#161514] transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div>
                <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-[#161514]/70 mb-1.5">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-sm text-[#161514] focus:outline-none focus:border-[#161514]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-[#161514]/70 mb-1.5">
                  Nomor WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0812xxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-sm text-[#161514] focus:outline-none focus:border-[#161514]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-[#161514]/70 mb-1.5">
                    Tanggal *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-2.5 py-2 bg-transparent border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:border-[#161514]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-[#161514]/70 mb-1.5">
                    Jam *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-2 py-2 bg-transparent border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:border-[#161514]"
                  >
                    <option value="09:00">09:00 WIB</option>
                    <option value="11:00">11:00 WIB</option>
                    <option value="13:00">13:00 WIB</option>
                    <option value="15:00">15:00 WIB</option>
                    <option value="17:00">17:00 WIB</option>
                    <option value="19:00">19:00 WIB</option>
                    <option value="20:30">20:30 WIB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-[#161514]/70 mb-1.5">
                    Jumlah Tamu *
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full px-2 py-2 bg-transparent border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:border-[#161514]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} Orang
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-[#161514]/70 mb-1.5">
                  Catatan (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Misal: Area non-smoking / dekat stopkontak"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 bg-transparent border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:border-[#161514]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#161514] text-[#F7F5F0] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#2A2724] transition-colors cursor-pointer"
                >
                  Kirim Reservasi via WhatsApp
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-10 h-10 border border-[#161514] flex items-center justify-center mx-auto text-[#161514]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-normal text-[#161514]">
                Reservasi Diterima
              </h4>
              <p className="text-xs text-[#161514]/70 max-w-xs mx-auto font-light">
                Kode reservasi Anda: <strong className="font-medium text-[#161514]">{bookingCode}</strong>. Tim kami akan segera mengonfirmasi slot meja Anda.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 border border-[#161514] text-[#161514] text-xs tracking-wider uppercase hover:bg-[#161514] hover:text-[#F7F5F0] transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
