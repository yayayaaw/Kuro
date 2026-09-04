/**
 * Utility for processing and optimizing image files selected from device gallery / camera.
 * Automatically resizes large camera photos to ensure fast load times and fit safely
 * within browser localStorage without exceeding storage limits.
 */
export async function optimizeImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1200,
  quality = 0.82
): Promise<{ dataUrl: string; originalSize: number; optimizedSize: number }> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File yang dipilih bukan format gambar yang didukung.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca file dari perangkat.'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Gagal memproses gambar yang dipilih.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional scale
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Browser tidak mendukung pengolahan gambar kanvas.'));
          return;
        }

        // Draw image with smooth bicubic scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to optimized JPEG data URL
        const dataUrl = canvas.toDataURL('image/jpeg', quality);

        // Calculate approximate byte size of base64 dataUrl
        const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
        const optimizedSize = Math.round((base64Length * 3) / 4);

        resolve({
          dataUrl,
          originalSize: file.size,
          optimizedSize,
        });
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Format bytes to readable string (e.g. 240 KB, 1.2 MB)
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
