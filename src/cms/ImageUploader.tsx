import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { optimizeImageFile, formatBytes } from './imageUtils';

interface ImageUploaderProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (newValue: string) => void;
  aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
  helperText?: string;
  placeholderText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  label = 'Foto / Gambar',
  value,
  onChange,
  aspectRatio = 'wide',
  helperText = 'Pilih foto langsung dari galeri / kamera perangkat Anda atau masukkan tautan web.',
  placeholderText = 'https://...',
}) => {
  const [mode, setMode] = useState<'device' | 'url'>('device');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setStatusMessage({ type: 'error', text: 'Pilih file berformat gambar (JPG, PNG, WEBP).' });
      return;
    }

    try {
      setIsProcessing(true);
      setStatusMessage(null);
      const result = await optimizeImageFile(file);
      onChange(result.dataUrl);
      setStatusMessage({
        type: 'success',
        text: `Foto galeri berhasil dimuat (${formatBytes(result.originalSize)} → ${formatBytes(result.optimizedSize)})`,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memproses file foto.';
      setStatusMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
    // reset input so the same file can be re-selected if needed
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const isBase64 = value.startsWith('data:image/');

  const aspectClass =
    aspectRatio === 'video'
      ? 'aspect-[16/9]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'wide'
      ? 'aspect-[16/10]'
      : 'aspect-auto max-h-72';

  return (
    <div className="space-y-3" id={id}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-[11px] font-medium uppercase tracking-wider text-[#161514]/75">
          {label}
        </label>
        
        {/* Source Mode Selector: Device Gallery vs Web URL */}
        <div className="flex items-center space-x-1 border border-[#161514]/20 bg-[#F4F2EC] p-0.5 text-[10px] tracking-wider uppercase font-medium">
          <button
            type="button"
            id={`${id || 'img'}-tab-device`}
            onClick={() => setMode('device')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 transition-colors cursor-pointer ${
              mode === 'device'
                ? 'bg-[#161514] text-[#F7F5F0]'
                : 'text-[#161514]/70 hover:text-[#161514]'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Galeri Perangkat</span>
          </button>
          <button
            type="button"
            id={`${id || 'img'}-tab-url`}
            onClick={() => setMode('url')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 transition-colors cursor-pointer ${
              mode === 'url'
                ? 'bg-[#161514] text-[#F7F5F0]'
                : 'text-[#161514]/70 hover:text-[#161514]'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Tautan URL</span>
          </button>
        </div>
      </div>

      {helperText && (
        <p className="text-[11px] text-[#161514]/60 font-light leading-relaxed">
          {helperText}
        </p>
      )}

      {/* Mode 1: Device Gallery Picker & Drag-Drop */}
      {mode === 'device' && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center space-y-2.5 ${
            isDragging
              ? 'border-[#161514] bg-[#161514]/10'
              : 'border-[#161514]/25 hover:border-[#161514]/60 bg-[#F7F5F0]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
            onChange={handleFileChange}
            className="hidden"
            id={`${id || 'img'}-file-input`}
          />

          <div className="w-10 h-10 rounded-full border border-[#161514]/20 flex items-center justify-center text-[#161514]/70 bg-white">
            {isProcessing ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </div>

          <div className="space-y-1">
            <div className="text-xs font-medium text-[#161514]">
              {isProcessing ? (
                'Mengompres & memproses foto...'
              ) : (
                <>
                  <span className="underline font-semibold">Klik untuk memilih foto dari galeri</span> atau seret file ke sini
                </>
              )}
            </div>
            <p className="text-[10px] text-[#161514]/50 tracking-wide uppercase">
              Mendukung JPG, PNG, WEBP (Otomatis dioptimalkan)
            </p>
          </div>
        </div>
      )}

      {/* Mode 2: Direct URL Input */}
      {mode === 'url' && (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={value.startsWith('data:') ? '' : value}
                placeholder={placeholderText}
                onChange={(e) => {
                  onChange(e.target.value);
                  setStatusMessage(null);
                }}
                className="w-full pl-8 pr-3.5 py-2.5 bg-transparent border border-[#161514]/20 text-xs focus:outline-none focus:border-[#161514]"
                id={`${id || 'img'}-url-input`}
              />
              <LinkIcon className="w-3.5 h-3.5 text-[#161514]/40 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-2.5 border border-[#161514]/20 text-xs text-rose-700 hover:bg-rose-50"
                title="Hapus URL"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {value.startsWith('data:') && (
            <p className="text-[10px] text-[#161514]/60 italic">
              Saat ini foto menggunakan upload dari galeri perangkat. Masukkan URL baru di atas jika ingin menggantinya dengan link web.
            </p>
          )}
        </div>
      )}

      {/* Status Notifications */}
      {statusMessage && (
        <div
          className={`flex items-center space-x-2 text-xs p-2.5 border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-rose-50 text-rose-800 border-rose-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Image Preview & Quick Actions */}
      {value && (
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#161514]/60">
            <span className="flex items-center space-x-1">
              <ImageIcon className="w-3 h-3" />
              <span>Pratinjau Foto ({isBase64 ? 'Dari Galeri Perangkat' : 'Tautan Web'})</span>
            </span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="hover:underline text-[#161514] font-medium cursor-pointer"
              >
                Ganti dari Galeri
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setStatusMessage(null);
                }}
                className="text-rose-700 hover:underline cursor-pointer"
              >
                Hapus Foto
              </button>
            </div>
          </div>

          <div
            className={`w-full max-w-xl ${aspectClass} border border-[#161514]/20 overflow-hidden bg-[#161514]/5 relative group`}
          >
            <img
              src={value}
              alt="Pratinjau Unggahan"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={() => {
                setStatusMessage({
                  type: 'error',
                  text: 'Gambar tidak dapat dimuat. Pastikan file valid atau URL masih aktif.',
                });
              }}
            />
            
            {/* Hover overlay with action */}
            <div className="absolute inset-0 bg-[#161514]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 p-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-[#F7F5F0] text-[#161514] text-xs uppercase tracking-wider font-medium shadow hover:bg-white cursor-pointer"
              >
                Ganti Foto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
