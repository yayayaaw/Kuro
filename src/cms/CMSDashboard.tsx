import React, { useState } from 'react';
import { loadCMSContent, saveCMSContent, resetCMSContent } from './storage';
import { CafeCMSContent } from './types';
import { MenuItem, CafeSpace, ReviewItem } from '../types';
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Image as ImageIcon,
  Coffee,
  Layers,
  Star,
  Compass,
  FileText,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Eye,
  Upload,
} from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { optimizeImageFile } from './imageUtils';

export const CMSDashboard: React.FC = () => {
  const [content, setContent] = useState<CafeCMSContent>(() => loadCMSContent());
  const [activeTab, setActiveTab] = useState<
    'branding' | 'hero' | 'philosophy' | 'menu' | 'spaces' | 'reviews' | 'location'
  >('branding');
  const [saveAlert, setSaveAlert] = useState<string | null>(null);

  // New Menu Item draft
  const [newMenu, setNewMenu] = useState<Partial<MenuItem>>({
    name: '',
    category: 'espresso',
    price: '40K',
    description: '',
    notes: [],
  });
  const [menuNotesInput, setMenuNotesInput] = useState('');

  // New Space draft
  const [newSpace, setNewSpace] = useState<Partial<CafeSpace>>({
    title: '',
    caption: '',
    image: '',
  });

  // New Review draft
  const [newReview, setNewReview] = useState<Partial<ReviewItem>>({
    author: '',
    role: '',
    rating: 5,
    date: 'Baru saja',
    comment: '',
    favoriteItem: '',
  });

  const notifySave = (msg: string) => {
    setSaveAlert(msg);
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleSaveAll = () => {
    saveCMSContent(content);
    notifySave('Seluruh perubahan CMS berhasil disimpan & aktif!');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Kembalikan semua konten ke pengaturan awal KURO?')) {
      const def = resetCMSContent();
      setContent(def);
      notifySave('Konten dikembalikan ke setelan awal.');
    }
  };

  // Menu Handlers
  const handleAddMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenu.name || !newMenu.price || !newMenu.description) return;
    const item: MenuItem = {
      id: `m-${Date.now()}`,
      name: newMenu.name,
      category: (newMenu.category as MenuItem['category']) || 'espresso',
      price: newMenu.price,
      description: newMenu.description,
      notes: menuNotesInput
        ? menuNotesInput.split(',').map((n) => n.trim()).filter(Boolean)
        : [],
    };
    const updatedMenu = [...content.menu, item];
    const updated = { ...content, menu: updatedMenu };
    setContent(updated);
    saveCMSContent(updated);
    setNewMenu({ name: '', category: 'espresso', price: '40K', description: '', notes: [] });
    setMenuNotesInput('');
    notifySave('Menu baru berhasil ditambahkan!');
  };

  const handleDeleteMenu = (id: string) => {
    const updatedMenu = content.menu.filter((m) => m.id !== id);
    const updated = { ...content, menu: updatedMenu };
    setContent(updated);
    saveCMSContent(updated);
    notifySave('Menu berhasil dihapus.');
  };

  // Space Handlers
  const handleAddSpace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpace.title?.trim() || !newSpace.caption?.trim()) {
      notifySave('Harap isi judul dan keterangan sudut ruang.');
      return;
    }
    if (!newSpace.image) {
      notifySave('Harap pilih foto ruangan (unggah dari galeri atau masukkan URL).');
      return;
    }
    const space: CafeSpace = {
      id: `sp-${Date.now()}`,
      title: newSpace.title.trim(),
      caption: newSpace.caption.trim(),
      image: newSpace.image,
    };
    const updatedSpaces = [...content.spaces, space];
    const updated = { ...content, spaces: updatedSpaces };
    setContent(updated);
    saveCMSContent(updated);
    setNewSpace({ title: '', caption: '', image: '' });
    notifySave('Foto ruang baru berhasil ditambahkan!');
  };

  const handleDeleteSpace = (id: string) => {
    const updatedSpaces = content.spaces.filter((s) => s.id !== id);
    const updated = { ...content, spaces: updatedSpaces };
    setContent(updated);
    saveCMSContent(updated);
    notifySave('Foto ruang berhasil dihapus.');
  };

  const handleReplaceSpaceImage = async (id: string, file: File) => {
    try {
      const result = await optimizeImageFile(file);
      const updatedSpaces = content.spaces.map((s) =>
        s.id === id ? { ...s, image: result.dataUrl } : s
      );
      const updated = { ...content, spaces: updatedSpaces };
      setContent(updated);
      saveCMSContent(updated);
      notifySave('Foto ruang berhasil diperbarui dari galeri perangkat!');
    } catch {
      notifySave('Gagal memproses foto dari galeri.');
    }
  };

  // Review Handlers
  const handleDeleteReview = (id: string) => {
    const updatedReviews = content.reviews.filter((r) => r.id !== id);
    const updated = { ...content, reviews: updatedReviews };
    setContent(updated);
    saveCMSContent(updated);
    notifySave('Ulasan berhasil dihapus.');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) return;
    const review: ReviewItem = {
      id: `rev-cms-${Date.now()}`,
      author: newReview.author,
      role: newReview.role || 'Tamu Terverifikasi',
      rating: newReview.rating || 5,
      date: newReview.date || 'Baru saja',
      comment: newReview.comment,
      favoriteItem: newReview.favoriteItem || undefined,
    };
    const updatedReviews = [review, ...content.reviews];
    const updated = { ...content, reviews: updatedReviews };
    setContent(updated);
    saveCMSContent(updated);
    setNewReview({ author: '', role: '', rating: 5, date: 'Baru saja', comment: '', favoriteItem: '' });
    notifySave('Ulasan baru berhasil ditambahkan!');
  };

  const tabs = [
    { id: 'branding', label: 'Nama & Header', icon: FileText },
    { id: 'hero', label: 'Foto & Teks Hero', icon: ImageIcon },
    { id: 'philosophy', label: 'Filosofi & Stat', icon: Compass },
    { id: 'menu', label: `Daftar Menu (${content.menu.length})`, icon: Coffee },
    { id: 'spaces', label: `Foto Ruang (${content.spaces.length})`, icon: Layers },
    { id: 'reviews', label: `Ulasan (${content.reviews.length})`, icon: Star },
    { id: 'location', label: 'Lokasi & Jam', icon: ExternalLink },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F4F2EC] text-[#161514] font-sans flex flex-col">
      {/* Top Banner CMS */}
      <header className="bg-[#161514] text-[#F7F5F0] border-b border-[#2A2724] px-6 py-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-sm bg-[#F7F5F0] text-[#161514] flex items-center justify-center font-serif font-bold text-sm">
            K
          </div>
          <div>
            <h1 className="font-serif text-lg tracking-[0.15em] uppercase font-normal text-[#F7F5F0]">
              KURO Studio — CMS Admin
            </h1>
            <p className="text-[10px] tracking-wider text-[#F7F5F0]/60 uppercase font-light">
              Manajemen Teks, Foto, Menu, Ulasan, dan Tata Letak Web
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {saveAlert && (
            <div className="hidden sm:flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 border border-emerald-500/30">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{saveAlert}</span>
            </div>
          )}

          <a
            href="/"
            className="flex items-center space-x-1.5 px-3 py-2 border border-[#F7F5F0]/30 text-[#F7F5F0] text-xs uppercase tracking-wider hover:bg-[#F7F5F0]/10 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pratinjau Web Utama</span>
          </a>

          <button
            onClick={handleResetDefaults}
            className="px-3 py-2 border border-[#F7F5F0]/20 text-[#F7F5F0]/70 text-xs uppercase tracking-wider hover:text-[#F7F5F0] hover:border-[#F7F5F0]/50 transition-colors cursor-pointer"
            title="Reset ke Default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleSaveAll}
            className="flex items-center space-x-1.5 px-5 py-2 bg-[#F7F5F0] text-[#161514] text-xs font-semibold tracking-wider uppercase hover:bg-[#E5E1D8] transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Semua</span>
          </button>
        </div>
      </header>

      {/* Main CMS Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Navigation */}
        <aside className="md:col-span-3 bg-[#F7F5F0] border border-[#161514]/15 p-3 space-y-1 text-left sticky top-24">
          <div className="px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-[#161514]/50 font-medium">
            Menu Navigasi CMS
          </div>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 text-xs tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#161514] text-[#F7F5F0] font-medium'
                    : 'text-[#161514]/75 hover:bg-[#161514]/5 text-left'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-[#161514]/10 px-3 text-[11px] text-[#161514]/60 font-light leading-relaxed">
            <p>
              Perubahan disimpan secara persisten di penyimpanan peramban (localStorage) dan otomatis memperbarui tampilan web utama.
            </p>
          </div>
        </aside>

        {/* Right Content Editor Area */}
        <main className="md:col-span-9 bg-[#F7F5F0] border border-[#161514]/15 p-6 sm:p-8 text-left space-y-8">
          
          {/* TAB 1: BRANDING & HEADER */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-normal text-[#161514]">
                  Identitas Brand & Header
                </h2>
                <p className="text-xs text-[#161514]/60 font-light mt-1">
                  Atur nama kafe, sub-judul, dan teks pengumuman editorial di bagian atas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[#161514]/10">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                    Nama Kafe di Header
                  </label>
                  <input
                    type="text"
                    value={content.branding.name}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        branding: { ...content.branding, name: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-sm focus:outline-none focus:border-[#161514]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                    Sub-Judul (Di Bawah Nama)
                  </label>
                  <input
                    type="text"
                    value={content.branding.subName}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        branding: { ...content.branding, subName: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-sm focus:outline-none focus:border-[#161514]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                  Label Editorial Atas (Hero Top Tagline)
                </label>
                <input
                  type="text"
                  value={content.branding.announcement}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      branding: { ...content.branding, announcement: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-sm focus:outline-none focus:border-[#161514]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                  Headline Tagline (Footer)
                </label>
                <input
                  type="text"
                  value={content.branding.headline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      branding: { ...content.branding, headline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-sm focus:outline-none focus:border-[#161514]"
                />
              </div>
            </div>
          )}

          {/* TAB 2: HERO & FOTO UTAMA */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-normal text-[#161514]">
                  Bagian Hero & Foto Utama Kafe
                </h2>
                <p className="text-xs text-[#161514]/60 font-light mt-1">
                  Atur judul besar penyambutan, deskripsi suasana, serta URL foto interior utama.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#161514]/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                      Judul Baris 1
                    </label>
                    <input
                      type="text"
                      value={content.hero.headline}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, headline: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-sm focus:outline-none focus:border-[#161514]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                      Judul Baris 2 (Italic)
                    </label>
                    <input
                      type="text"
                      value={content.hero.italicPart}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, italicPart: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-sm focus:outline-none focus:border-[#161514]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                    Paragraf Deskripsi Hero
                  </label>
                  <textarea
                    rows={3}
                    value={content.hero.description}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, description: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-xs leading-relaxed focus:outline-none focus:border-[#161514] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <ImageUploader
                    id="cms-hero-image-uploader"
                    label="Foto Utama Hero Kafe"
                    value={content.hero.image}
                    onChange={(newUrl) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, image: newUrl },
                      })
                    }
                    aspectRatio="video"
                    helperText="Pilih foto dari galeri/kamera perangkat (akan otomatis dioptimalkan) atau gunakan tautan URL web."
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#161514]/60 mb-1">
                      Keterangan Kiri Bawah
                    </label>
                    <input
                      type="text"
                      value={content.hero.captionLeft}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, captionLeft: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 bg-transparent border border-[#161514]/20 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#161514]/60 mb-1">
                      Keterangan Tengah Bawah
                    </label>
                    <input
                      type="text"
                      value={content.hero.captionCenter}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, captionCenter: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 bg-transparent border border-[#161514]/20 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#161514]/60 mb-1">
                      Keterangan Kanan Bawah
                    </label>
                    <input
                      type="text"
                      value={content.hero.captionRight}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, captionRight: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 bg-transparent border border-[#161514]/20 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FILOSOFI & STAT */}
          {activeTab === 'philosophy' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-normal text-[#161514]">
                  Filosofi Kafe & Statistik Kunci
                </h2>
                <p className="text-xs text-[#161514]/60 font-light mt-1">
                  Atur kalimat cerita di balik kafe serta 3 metrik statistik keunggulan rasa kopi.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#161514]/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                      Judul Filosofi
                    </label>
                    <input
                      type="text"
                      value={content.philosophy.title}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          philosophy: { ...content.philosophy, title: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-sm focus:outline-none focus:border-[#161514]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                      Lanjutan Judul (Italic)
                    </label>
                    <input
                      type="text"
                      value={content.philosophy.italicTitle}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          philosophy: { ...content.philosophy, italicTitle: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-sm focus:outline-none focus:border-[#161514]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                    Paragraf Narasi 1
                  </label>
                  <textarea
                    rows={3}
                    value={content.philosophy.paragraph1}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        philosophy: { ...content.philosophy, paragraph1: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-xs leading-relaxed focus:outline-none focus:border-[#161514] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                    Paragraf Narasi 2
                  </label>
                  <textarea
                    rows={3}
                    value={content.philosophy.paragraph2}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        philosophy: { ...content.philosophy, paragraph2: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-xs leading-relaxed focus:outline-none focus:border-[#161514] resize-none"
                  />
                </div>

                {/* 3 Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#161514]/10">
                  <div className="p-3 border border-[#161514]/15 space-y-2">
                    <span className="text-[10px] tracking-wider uppercase text-[#161514]/60">Metrik 1</span>
                    <input
                      type="text"
                      placeholder="85+"
                      value={content.philosophy.stat1Number}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          philosophy: { ...content.philosophy, stat1Number: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 bg-transparent border border-[#161514]/20 text-sm font-serif"
                    />
                    <input
                      type="text"
                      placeholder="SCA Cup Score"
                      value={content.philosophy.stat1Label}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          philosophy: { ...content.philosophy, stat1Label: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 bg-transparent border border-[#161514]/20 text-[11px]"
                    />
                  </div>

                  <div className="p-3 border border-[#161514]/15 space-y-2">
                    <span className="text-[10px] tracking-wider uppercase text-[#161514]/60">Metrik 2</span>
                    <input
                      type="text"
                      placeholder="100%"
                      value={content.philosophy.stat2Number}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          philosophy: { ...content.philosophy, stat2Number: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 bg-transparent border border-[#161514]/20 text-sm font-serif"
                    />
                    <input
                      type="text"
                      placeholder="Arabica Single Origin"
                      value={content.philosophy.stat2Label}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          philosophy: { ...content.philosophy, stat2Label: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 bg-transparent border border-[#161514]/20 text-[11px]"
                    />
                  </div>

                  <div className="p-3 border border-[#161514]/15 space-y-2">
                    <span className="text-[10px] tracking-wider uppercase text-[#161514]/60">Metrik 3</span>
                    <input
                      type="text"
                      placeholder="12h"
                      value={content.philosophy.stat3Number}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          philosophy: { ...content.philosophy, stat3Number: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 bg-transparent border border-[#161514]/20 text-sm font-serif"
                    />
                    <input
                      type="text"
                      placeholder="Cold Slow Drip"
                      value={content.philosophy.stat3Label}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          philosophy: { ...content.philosophy, stat3Label: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 bg-transparent border border-[#161514]/20 text-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MENU KOPI & PASTRY */}
          {activeTab === 'menu' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-normal text-[#161514]">
                  Kelola Daftar Menu Kopi & Pastry
                </h2>
                <p className="text-xs text-[#161514]/60 font-light mt-1">
                  Tambah minuman atau makanan baru, ubah harga, dan hapus menu lama dengan sekali klik.
                </p>
              </div>

              {/* Form Tambah Menu Baru */}
              <form onSubmit={handleAddMenu} className="p-5 border border-[#161514] space-y-4 bg-[#F4F2EC]">
                <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#161514]">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Item Menu Baru</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#161514]/70 mb-1">
                      Nama Menu *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Misal: Iced Japanese Drip"
                      value={newMenu.name}
                      onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
                      className="w-full px-3 py-2 bg-transparent border border-[#161514]/25 text-xs focus:outline-none focus:border-[#161514]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#161514]/70 mb-1">
                      Kategori *
                    </label>
                    <select
                      value={newMenu.category}
                      onChange={(e) =>
                        setNewMenu({ ...newMenu, category: e.target.value as MenuItem['category'] })
                      }
                      className="w-full px-3 py-2 bg-transparent border border-[#161514]/25 text-xs focus:outline-none focus:border-[#161514]"
                    >
                      <option value="espresso">Espresso & Milk</option>
                      <option value="filter">Filter Slow Bar</option>
                      <option value="signature">Signature</option>
                      <option value="pastry">Artisan Pastry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#161514]/70 mb-1">
                      Harga *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Misal: 48K"
                      value={newMenu.price}
                      onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
                      className="w-full px-3 py-2 bg-transparent border border-[#161514]/25 text-xs focus:outline-none focus:border-[#161514]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#161514]/70 mb-1">
                    Deskripsi Rasa / Bahan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Biji kopi pilihan dengan profil rasa jeruk mandarin..."
                    value={newMenu.description}
                    onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
                    className="w-full px-3 py-2 bg-transparent border border-[#161514]/25 text-xs focus:outline-none focus:border-[#161514]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#161514]/70 mb-1">
                    Tasting Notes (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    placeholder="Mandarin Orange, Floral Jasmine, Honey"
                    value={menuNotesInput}
                    onChange={(e) => setMenuNotesInput(e.target.value)}
                    className="w-full px-3 py-2 bg-transparent border border-[#161514]/25 text-xs focus:outline-none focus:border-[#161514]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#161514] text-[#F7F5F0] text-xs uppercase tracking-wider font-medium hover:bg-[#2A2724] cursor-pointer"
                >
                  Tambahkan Ke Menu Web
                </button>
              </form>

              {/* List Menu Items Existing */}
              <div className="space-y-3">
                <div className="text-[11px] uppercase tracking-wider text-[#161514]/60 font-medium">
                  Daftar Menu Aktif ({content.menu.length} item)
                </div>

                <div className="divide-y divide-[#161514]/10 border border-[#161514]/15">
                  {content.menu.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#161514]/5 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-serif text-base font-normal text-[#161514]">
                            {item.name}
                          </span>
                          <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 border border-[#161514]/20 text-[#161514]/60">
                            {item.category}
                          </span>
                          <span className="font-medium text-xs text-[#161514]">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-xs text-[#161514]/70 font-light line-clamp-1">
                          {item.description}
                        </p>
                        {item.notes && item.notes.length > 0 && (
                          <div className="text-[10px] text-[#161514]/50">
                            Notes: {item.notes.join(' • ')}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteMenu(item.id)}
                        className="p-2 text-rose-700 hover:bg-rose-100/50 self-start sm:self-center transition-colors cursor-pointer"
                        title="Hapus Menu Ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FOTO RUANG & ATELIER */}
          {activeTab === 'spaces' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-normal text-[#161514]">
                  Kelola Foto Ruang & Atelier
                </h2>
                <p className="text-xs text-[#161514]/60 font-light mt-1">
                  Tambahkan foto sudut kafe, meja slow bar, atau lounge beserta deskripsi singkatnya.
                </p>
              </div>

              {/* Form Tambah Ruang Baru */}
              <form onSubmit={handleAddSpace} className="p-5 border border-[#161514] space-y-4 bg-[#F4F2EC]">
                <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#161514]">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Foto Ruangan Baru</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#161514]/70 mb-1">
                      Nama Sudut / Ruang *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Misal: The Courtyard Garden"
                      value={newSpace.title}
                      onChange={(e) => setNewSpace({ ...newSpace, title: e.target.value })}
                      className="w-full px-3 py-2 bg-transparent border border-[#161514]/25 text-xs focus:outline-none focus:border-[#161514]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#161514]/70 mb-1">
                      Keterangan Deskripsi Singkat *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Area semi-terbuka dengan tanaman palem dan hembusan angin sejuk."
                      value={newSpace.caption}
                      onChange={(e) => setNewSpace({ ...newSpace, caption: e.target.value })}
                      className="w-full px-3 py-2 bg-transparent border border-[#161514]/25 text-xs focus:outline-none focus:border-[#161514]"
                    />
                  </div>
                </div>

                {/* Gallery or URL Image Uploader */}
                <ImageUploader
                  id="cms-new-space-uploader"
                  label="Pilih Foto Ruang (Galeri Perangkat atau Tautan Web) *"
                  value={newSpace.image || ''}
                  onChange={(img) => setNewSpace({ ...newSpace, image: img })}
                  aspectRatio="wide"
                  helperText="Unggah foto langsung dari galeri ponsel/laptop (otomatis dikompresi) atau gunakan tautan URL."
                />

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#161514] text-[#F7F5F0] text-xs uppercase tracking-wider font-medium hover:bg-[#2A2724] cursor-pointer"
                >
                  Tambahkan Foto Ruangan
                </button>
              </form>

              {/* Grid Ruang Aktif */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.spaces.map((space) => (
                  <div
                    key={space.id}
                    className="border border-[#161514]/20 p-3 space-y-2 bg-[#F7F5F0] relative group"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#161514]/5 border border-[#161514]/10 relative">
                      <img
                        src={space.image}
                        alt={space.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {/* Ganti dari Galeri Perangkat quick button */}
                      <label
                        className="absolute bottom-2 right-2 px-2.5 py-1.5 bg-[#161514]/85 text-[#F7F5F0] text-[10px] uppercase tracking-wider font-medium hover:bg-[#161514] transition-colors cursor-pointer flex items-center space-x-1.5 shadow"
                        title="Ganti Foto Ini Langsung dari Galeri Perangkat"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Ganti dari Galeri</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleReplaceSpaceImage(space.id, file);
                            e.target.value = '';
                          }}
                        />
                      </label>
                    </div>
                    <div className="flex items-start justify-between gap-2 pt-1">
                      <div>
                        <h4 className="font-serif text-sm font-normal text-[#161514]">
                          {space.title}
                        </h4>
                        <p className="text-[11px] text-[#161514]/65 font-light leading-relaxed">
                          {space.caption}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteSpace(space.id)}
                        className="p-1.5 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer shrink-0"
                        title="Hapus Foto Ruang"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ULASAN & RATING PENGUNJUNG */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-normal text-[#161514]">
                  Kelola Ulasan & Rating Pengunjung
                </h2>
                <p className="text-xs text-[#161514]/60 font-light mt-1">
                  Lihat total ulasan, tambah testimoni baru, atau hapus ulasan yang tidak diinginkan dari slider web utama.
                </p>
              </div>

              {/* Review Stats summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border border-[#161514]/15 bg-[#F4F2EC]">
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#161514]/60 block">
                    Total Ulasan
                  </span>
                  <span className="font-serif text-2xl text-[#161514]">
                    {content.reviews.length} Ulasan
                  </span>
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#161514]/60 block">
                    Rating Rata-Rata
                  </span>
                  <span className="font-serif text-2xl text-[#161514]">
                    {(
                      content.reviews.reduce((acc, r) => acc + r.rating, 0) /
                      (content.reviews.length || 1)
                    ).toFixed(1)}{' '}
                    ★
                  </span>
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#161514]/60 block">
                    Status Slider
                  </span>
                  <span className="text-xs font-medium text-[#161514]">
                    Aktif (Geser Kanan/Kiri)
                  </span>
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#161514]/60 block">
                    Penyimpanan
                  </span>
                  <span className="text-xs text-[#161514]/70">
                    Lokal & Otomatis Sinkron
                  </span>
                </div>
              </div>

              {/* Form Tambah Ulasan Manual */}
              <form onSubmit={handleAddReview} className="p-5 border border-[#161514] space-y-4 bg-[#F4F2EC]">
                <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#161514]">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Ulasan Baru</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#161514]/70 mb-1">
                      Nama Pengunjung *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Misal: Sarah Wijaya"
                      value={newReview.author}
                      onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                      className="w-full px-3 py-2 bg-transparent border border-[#161514]/25 text-xs focus:outline-none focus:border-[#161514]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#161514]/70 mb-1">
                      Profesi / Peran
                    </label>
                    <input
                      type="text"
                      placeholder="Misal: Coffee Enthusiast"
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                      className="w-full px-3 py-2 bg-transparent border border-[#161514]/25 text-xs focus:outline-none focus:border-[#161514]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#161514]/70 mb-1">
                      Rating Bintang (1 - 5)
                    </label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-transparent border border-[#161514]/25 text-xs focus:outline-none focus:border-[#161514]"
                    >
                      <option value={5}>5 Bintang (Sempurna)</option>
                      <option value={4}>4 Bintang (Sangat Bagus)</option>
                      <option value={3}>3 Bintang (Cukup)</option>
                      <option value={2}>2 Bintang</option>
                      <option value={1}>1 Bintang</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#161514]/70 mb-1">
                      Menu Favorit Pengunjung
                    </label>
                    <input
                      type="text"
                      placeholder="Misal: Ethiopia Guji Hambela V60"
                      value={newReview.favoriteItem}
                      onChange={(e) => setNewReview({ ...newReview, favoriteItem: e.target.value })}
                      className="w-full px-3 py-2 bg-transparent border border-[#161514]/25 text-xs focus:outline-none focus:border-[#161514]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#161514]/70 mb-1">
                      Waktu Ulasan
                    </label>
                    <input
                      type="text"
                      placeholder="Misal: 2 hari lalu"
                      value={newReview.date}
                      onChange={(e) => setNewReview({ ...newReview, date: e.target.value })}
                      className="w-full px-3 py-2 bg-transparent border border-[#161514]/25 text-xs focus:outline-none focus:border-[#161514]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#161514]/70 mb-1">
                    Isi Komentar / Pengalaman *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Cerita pengunjung tentang suasana atau rasa kopi..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3 py-2 bg-transparent border border-[#161514]/25 text-xs focus:outline-none focus:border-[#161514] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#161514] text-[#F7F5F0] text-xs uppercase tracking-wider font-medium hover:bg-[#2A2724] cursor-pointer"
                >
                  Tambahkan Ulasan ke Web
                </button>
              </form>

              {/* List All Reviews with Delete button */}
              <div className="space-y-3">
                <div className="text-[11px] uppercase tracking-wider text-[#161514]/60 font-medium">
                  Daftar Semua Ulasan di Slider ({content.reviews.length})
                </div>

                <div className="space-y-3">
                  {content.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="border border-[#161514]/15 p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-[#F7F5F0] hover:border-[#161514]/50 transition-colors"
                    >
                      <div className="space-y-2 text-left">
                        <div className="flex items-center space-x-2">
                          <div className="flex text-[#161514]">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-[#161514]" />
                            ))}
                          </div>
                          <span className="text-xs font-semibold uppercase text-[#161514]">
                            {rev.author}
                          </span>
                          <span className="text-[11px] text-[#161514]/50">
                            • {rev.role}
                          </span>
                          <span className="text-[10px] text-[#161514]/40">
                            ({rev.date})
                          </span>
                        </div>

                        <p className="font-serif text-xs sm:text-sm text-[#161514]/85 italic font-light leading-relaxed">
                          "{rev.comment}"
                        </p>

                        {rev.favoriteItem && (
                          <div className="text-[10px] text-[#161514]/60">
                            Favorit: <span className="font-medium text-[#161514]">{rev.favoriteItem}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        className="px-3 py-1.5 border border-rose-300 text-rose-700 text-[11px] uppercase tracking-wider hover:bg-rose-50 flex items-center space-x-1.5 self-start sm:self-center cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: LOKASI & JAM OPERASIONAL */}
          {activeTab === 'location' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-normal text-[#161514]">
                  Informasi Kunjungan, Alamat & Kontak
                </h2>
                <p className="text-xs text-[#161514]/60 font-light mt-1">
                  Atur jam buka, alamat, nomor WhatsApp pemesanan, dan fasilitas kafe.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#161514]/10">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                    Alamat Lengkap
                  </label>
                  <input
                    type="text"
                    value={content.location.address}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        location: { ...content.location, address: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-xs focus:outline-none focus:border-[#161514]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                    Tautan Google Maps URL
                  </label>
                  <input
                    type="text"
                    value={content.location.gmapsUrl}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        location: { ...content.location, gmapsUrl: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-xs focus:outline-none focus:border-[#161514]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                      Jam Operasional Hari Kerja (Senin – Jumat)
                    </label>
                    <input
                      type="text"
                      value={content.location.weekdayHours}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          location: { ...content.location, weekdayHours: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-xs focus:outline-none focus:border-[#161514]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                      Jam Operasional Akhir Pekan (Sabtu – Minggu)
                    </label>
                    <input
                      type="text"
                      value={content.location.weekendHours}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          location: { ...content.location, weekendHours: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-xs focus:outline-none focus:border-[#161514]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                      Nomor Telepon Tampilan
                    </label>
                    <input
                      type="text"
                      value={content.location.phone}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          location: { ...content.location, phone: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-xs focus:outline-none focus:border-[#161514]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                      Format WhatsApp (Tanpa tanda + / -)
                    </label>
                    <input
                      type="text"
                      value={content.location.whatsappNumber}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          location: { ...content.location, whatsappNumber: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-xs focus:outline-none focus:border-[#161514]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/70 mb-1.5">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      value={content.location.instagram}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          location: { ...content.location, instagram: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-xs focus:outline-none focus:border-[#161514]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action bar inside editor */}
          <div className="pt-6 border-t border-[#161514]/10 flex items-center justify-between">
            <span className="text-xs text-[#161514]/50 font-light">
              Perubahan otomatis disimpan ke state aktif. Klik "Simpan Semua" untuk konfirmasi akhir.
            </span>
            <button
              onClick={handleSaveAll}
              className="flex items-center space-x-2 px-6 py-3 bg-[#161514] text-[#F7F5F0] text-xs uppercase tracking-wider font-semibold hover:bg-[#2A2724] cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Semua Perubahan</span>
            </button>
          </div>

        </main>
      </div>
    </div>
  );
};
