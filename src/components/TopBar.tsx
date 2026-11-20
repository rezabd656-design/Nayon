import { Sparkles } from 'lucide-react';

interface TopBarProps {
  onLaunchFireworks: () => void;
}

export function TopBar({ onLaunchFireworks }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#D4AF37]/15 bg-[#090807]/94">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-xl font-semibold tracking-tight text-[#F5E4A8] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
        >
          Nayon &amp; Nowsin
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#D5CBB8]"
        >
          <a
            href="#portrait"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F5E4A8] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            Portrait
          </a>
          <a
            href="#story"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F5E4A8] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            Story
          </a>
          <a
            href="#celebration"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F5E4A8] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            Celebration
          </a>
          <a
            href="#blessings"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F5E4A8] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            Blessings
          </a>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onLaunchFireworks}
            className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap shrink-0 border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-4 py-2 text-xs font-semibold tracking-wide text-[#F5E4A8] transition-colors duration-150 hover:bg-[#D4AF37] hover:text-[#120F0A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5E4A8]"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Launch Fireworks</span>
          </button>
        </div>
      </div>
    </header>
  );
}
