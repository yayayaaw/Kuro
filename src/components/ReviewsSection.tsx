import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Star, Plus, Check } from 'lucide-react';
import { ReviewItem } from '../types';

interface ReviewsProps {
  reviews: ReviewItem[];
  onAddReview?: (newReview: ReviewItem) => void;
}

export const ReviewsSection: React.FC<ReviewsProps> = ({ reviews, onAddReview }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // New review modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newFavorite, setNewFavorite] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);

    const cardWidth = 360 + 24;
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(index, reviews.length - 1));
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (container) container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [reviews.length]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 384;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-user-${Date.now()}`,
      author: newAuthor.trim(),
      role: newRole.trim() || 'Tamu Terverifikasi',
      rating: newRating,
      date: 'Baru saja',
      comment: newComment.trim(),
      favoriteItem: newFavorite.trim() || undefined,
    };

    if (onAddReview) {
      onAddReview(newRev);
    }

    setSubmittedSuccess(true);

    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsFormOpen(false);
      setNewAuthor('');
      setNewRole('');
      setNewComment('');
      setNewFavorite('');
      setNewRating(5);

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 1200);
  };

  return (
    <section id="ulasan" className="py-24 md:py-32 border-b border-[#161514]/10 bg-[#F7F5F0] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header & Slide Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 text-left">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-3">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#161514]/50 font-light block">
                Ulasan & Rating Pengunjung
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#161514]/40" />
              <span className="text-[11px] tracking-wider text-[#161514]/70 font-medium">
                ★ {(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1)} / 5.0 ({reviews.length} Ulasan)
              </span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#161514] tracking-tight">
              Kesan Dalam Keheningan
            </h2>
            
            <p className="text-xs sm:text-sm text-[#161514]/70 font-light leading-relaxed">
              Dengarkan refleksi para penikmat kopi, arsitek, dan penulis yang telah menjadikan ruang KURO sebagai tempat jeda dari kesibukan ibu kota.
            </p>
          </div>

          {/* Action Button & Carousel Arrow Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 border border-[#161514] text-[#161514] text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#161514] hover:text-[#F7F5F0] transition-colors duration-200 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tulis Ulasan</span>
            </button>

            {/* Left/Right Slide Arrows */}
            <div className="flex items-center space-x-1.5 pl-2 border-l border-[#161514]/15">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Geser kartu ke kiri"
                className={`p-2.5 border border-[#161514] transition-all duration-200 cursor-pointer ${
                  canScrollLeft
                    ? 'hover:bg-[#161514] hover:text-[#F7F5F0] text-[#161514]'
                    : 'opacity-25 cursor-not-allowed text-[#161514]'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Geser kartu ke kanan"
                className={`p-2.5 border border-[#161514] transition-all duration-200 cursor-pointer ${
                  canScrollRight
                    ? 'hover:bg-[#161514] hover:text-[#F7F5F0] text-[#161514]'
                    : 'opacity-25 cursor-not-allowed text-[#161514]'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Slider Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review, idx) => (
            <article
              key={review.id}
              className="w-[300px] sm:w-[380px] shrink-0 snap-start bg-[#F7F5F0] border border-[#161514]/15 p-8 flex flex-col justify-between space-y-6 text-left hover:border-[#161514] transition-all duration-300 relative group"
            >
              <div className="space-y-5">
                {/* Top Row: Stars + Date + Card Index */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-[#161514]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? 'fill-[#161514] text-[#161514]' : 'text-[#161514]/20'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] tracking-widest text-[#161514]/40 uppercase font-light">
                      {review.date}
                    </span>
                    <span className="text-[10px] tracking-wider text-[#161514]/30 font-serif">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <p className="font-serif text-sm sm:text-base text-[#161514] leading-relaxed italic font-light">
                  "{review.comment}"
                </p>

                {/* Favorite Item Mention */}
                {review.favoriteItem && (
                  <div className="pt-2 text-[11px] text-[#161514]/70 font-light">
                    <span className="uppercase tracking-wider text-[9px] text-[#161514]/45 block mb-0.5">
                      Pilihan Favorit
                    </span>
                    <span className="font-normal text-[#161514]">
                      {review.favoriteItem}
                    </span>
                  </div>
                )}
              </div>

              {/* Author & Status */}
              <div className="pt-4 border-t border-[#161514]/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold tracking-wide text-[#161514] uppercase">
                    {review.author}
                  </h3>
                  <p className="text-[11px] text-[#161514]/60 font-light mt-0.5">
                    {review.role}
                  </p>
                </div>
                <span className="text-[9px] tracking-wider uppercase px-2 py-0.5 border border-[#161514]/20 text-[#161514]/60">
                  Terverifikasi
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel Bottom Indicator */}
        <div className="flex items-center justify-between text-xs text-[#161514]/50 font-light pt-6 border-t border-[#161514]/10">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-[#161514]">{reviews.length}</span>
            <span>Ulasan Ditampilkan</span>
            <span className="text-[#161514]/30">•</span>
            <span className="text-[11px] text-[#161514]/60">
              Kartu #{String(currentIndex + 1).padStart(2, '0')} aktif
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline text-[11px] tracking-wider uppercase text-[#161514]/40">
              Gunakan tombol panah atau geser layar
            </span>
            <div className="flex space-x-1.5">
              {reviews.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 transition-all duration-300 ${
                    i === currentIndex ? 'w-6 bg-[#161514]' : 'w-2 bg-[#161514]/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Modal Tulis Ulasan Baru */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#161514]/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsFormOpen(false)}
          />

          <div className="relative bg-[#F7F5F0] border border-[#161514] w-full max-w-lg z-10 my-8 shadow-2xl">
            <div className="border-b border-[#161514]/10 px-6 py-5 flex items-center justify-between text-left">
              <div>
                <h3 className="font-serif text-xl font-normal text-[#161514]">
                  Tulis Ulasan & Rating
                </h3>
                <p className="text-[11px] tracking-wider uppercase text-[#161514]/50 font-light mt-0.5">
                  Bagikan Pengalaman Anda di KURO
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1 text-[#161514]/60 hover:text-[#161514] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {submittedSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-10 h-10 border border-[#161514] flex items-center justify-center mx-auto text-[#161514]">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-xl font-normal text-[#161514]">
                    Terima Kasih Atas Ulasan Anda
                  </h4>
                  <p className="text-xs text-[#161514]/70 max-w-xs mx-auto font-light">
                    Kartu ulasan Anda telah ditambahkan ke etalase pengalaman KURO.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4 text-left">
                  <div>
                    <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-[#161514]/70 mb-2">
                      Rating Bintang *
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 text-[#161514] hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating ? 'fill-[#161514] text-[#161514]' : 'text-[#161514]/30'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-medium text-[#161514] ml-2">
                        {newRating} dari 5 Bintang
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-[#161514]/70 mb-1.5">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Misal: Bagas Pratama"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-sm text-[#161514] focus:outline-none focus:border-[#161514]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-[#161514]/70 mb-1.5">
                        Profesi / Pekerjaan
                      </label>
                      <input
                        type="text"
                        placeholder="Misal: Graphic Designer"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-sm text-[#161514] focus:outline-none focus:border-[#161514]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-[#161514]/70 mb-1.5">
                      Menu Kopi / Pastry Favorit
                    </label>
                    <input
                      type="text"
                      placeholder="Misal: Ethiopia Guji Hambela / Pain au Chocolat"
                      value={newFavorite}
                      onChange={(e) => setNewFavorite(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:border-[#161514]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-[#161514]/70 mb-1.5">
                      Cerita & Komentar *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Ceritakan tentang rasa kopi, suasana ruang, atau pelayanan di KURO..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:border-[#161514] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#161514] text-[#F7F5F0] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#2A2724] transition-colors cursor-pointer"
                    >
                      Kirim & Tampilkan Ulasan
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
