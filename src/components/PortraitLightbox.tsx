import { useEffect } from 'react';
import { X } from 'lucide-react';

interface PortraitLightboxProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}

export function PortraitLightbox({
  isOpen,
  imageSrc,
  onClose,
}: PortraitLightboxProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Portrait of Nayon and Nowsin"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#070605]/95 p-4 sm:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col border border-[#D4AF37]/30 bg-[#12100E] p-4 shadow-[0_32px_90px_rgba(0,0,0,0.85)] sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-[#D4AF37]/15 pb-3">
          <div>
            <p className="font-display text-xl font-semibold text-[#F5E4A8]">
              Nayon &amp; Nowsin
            </p>
            <p className="text-xs text-[#C7BFA9]">
              Wedding Stage Portrait · Golden Union
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close portrait viewer"
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center gap-1.5 whitespace-nowrap shrink-0 border border-[#D4AF37]/30 px-3 py-2 text-xs font-medium text-[#F5EFE6] transition-colors duration-150 hover:bg-[#D4AF37] hover:text-[#120F0A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5E4A8]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            <span>Close</span>
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#090807]">
          <img
            src={imageSrc}
            alt="Nayon and Nowsin smiling at each other on their floral wedding stage"
            referrerPolicy="no-referrer"
            className="max-h-[75vh] w-auto max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
