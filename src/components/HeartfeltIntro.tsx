import { useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeartfeltIntroProps {
  onEnter: () => void;
}

export function HeartfeltIntro({ onEnter }: HeartfeltIntroProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        onEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnter]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-couple-heading"
      data-testid="heartfelt-intro"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#090807]/58 px-6 py-10"
    >
      {/* Subtle warm radial glow behind crest */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,rgba(9,8,7,0.18)_55%,rgba(9,8,7,0.68)_100%)]"
      />

      <div className="animate-fade-in-up relative w-full max-w-2xl border border-[#D4AF37]/35 bg-[#12100E]/84 p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.75)] sm:p-12 md:p-14">
        {/* Inner golden hairline frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 border border-[#D4AF37]/15"
        />

        {/* Animated SVG corner gold filigree */}
        <svg
          aria-hidden="true"
          viewBox="0 0 80 80"
          className="pointer-events-none absolute top-3 left-3 h-12 w-12 text-[#D4AF37]"
          fill="none"
        >
          <path
            d="M4 76 V20 C4 10 10 4 20 4 H76"
            stroke="currentColor"
            strokeWidth="1.2"
            pathLength={1}
            className="animate-filigree"
          />
          <path
            d="M12 52 V22 C12 15 15 12 22 12 H52"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.65"
            pathLength={1}
            className="animate-filigree"
          />
        </svg>

        <svg
          aria-hidden="true"
          viewBox="0 0 80 80"
          className="pointer-events-none absolute top-3 right-3 h-12 w-12 -scale-x-100 text-[#D4AF37]"
          fill="none"
        >
          <path
            d="M4 76 V20 C4 10 10 4 20 4 H76"
            stroke="currentColor"
            strokeWidth="1.2"
            pathLength={1}
            className="animate-filigree"
          />
          <path
            d="M12 52 V22 C12 15 15 12 22 12 H52"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.65"
            pathLength={1}
            className="animate-filigree"
          />
        </svg>

        <svg
          aria-hidden="true"
          viewBox="0 0 80 80"
          className="pointer-events-none absolute bottom-3 left-3 h-12 w-12 -scale-y-100 text-[#D4AF37]"
          fill="none"
        >
          <path
            d="M4 76 V20 C4 10 10 4 20 4 H76"
            stroke="currentColor"
            strokeWidth="1.2"
            pathLength={1}
            className="animate-filigree"
          />
          <path
            d="M12 52 V22 C12 15 15 12 22 12 H52"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.65"
            pathLength={1}
            className="animate-filigree"
          />
        </svg>

        <svg
          aria-hidden="true"
          viewBox="0 0 80 80"
          className="pointer-events-none absolute right-3 bottom-3 h-12 w-12 scale-[-1] text-[#D4AF37]"
          fill="none"
        >
          <path
            d="M4 76 V20 C4 10 10 4 20 4 H76"
            stroke="currentColor"
            strokeWidth="1.2"
            pathLength={1}
            className="animate-filigree"
          />
          <path
            d="M12 52 V22 C12 15 15 12 22 12 H52"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.65"
            pathLength={1}
            className="animate-filigree"
          />
        </svg>

        {/* Central animated gold crest */}
        <div className="animate-crest-float relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 120 120"
            className="absolute inset-0 h-full w-full text-[#D4AF37]"
            fill="none"
          >
            <polygon
              points="60,6 98,22 114,60 98,98 60,114 22,98 6,60 22,22"
              stroke="currentColor"
              strokeWidth="1.1"
              pathLength={1}
              className="animate-filigree"
            />
            <circle
              cx="60"
              cy="60"
              r="42"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeOpacity="0.6"
              pathLength={1}
              className="animate-filigree"
            />
          </svg>
          <span className="font-display text-2xl font-semibold tracking-wider text-[#F5E4A8]">
            N <span className="text-[#E8A0B0]">&amp;</span> N
          </span>
        </div>

        {/* Quiet unboxed editorial kicker */}
        <p className="text-xs font-medium tracking-[0.22em] text-[#D4AF37]">
          A Heartfelt Wedding Tribute
        </p>

        {/* Gold-shimmering couple headline */}
        <h1
          id="intro-couple-heading"
          className="font-display text-gold-shimmer mt-3 text-balance text-5xl font-semibold tracking-tight sm:text-6xl"
        >
          Nayon &amp; Nowsin
        </h1>

        {/* Sweeping animated gold divider */}
        <div className="gold-divider-sweep relative mx-auto my-6 h-px w-48 overflow-hidden bg-[#D4AF37]/25" />

        {/* Heartfelt intro prose */}
        <p className="mx-auto max-w-lg text-base leading-relaxed text-[#E7DEC8]/90 sm:text-lg">
          Two hearts that found their quiet home in one another. Tonight, under
          a sky lit with golden sparks and cherished prayers, we celebrate the
          beginning of your forever.
        </p>

        <p className="mt-4 font-display text-lg italic text-[#E8A0B0]">
          দুটি হৃদয়ের পবিত্র বন্ধন · Forever Begins Tonight
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onEnter}
            className="group inline-flex min-h-[44px] items-center justify-center gap-2.5 whitespace-nowrap shrink-0 bg-gradient-to-r from-[#C89B2B] via-[#EBD286] to-[#C89B2B] px-7 py-3 text-sm font-semibold text-[#120F0A] shadow-[0_8px_30px_rgba(212,175,55,0.3)] transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5E4A8]"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>Enter Celebration</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={onEnter}
            className="min-h-[44px] whitespace-nowrap shrink-0 px-4 py-2 text-sm font-medium text-[#D5CBB8] underline decoration-[#D4AF37]/40 underline-offset-4 transition-colors duration-150 hover:text-[#F5E4A8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            Skip Intro
          </button>
        </div>
      </div>
    </div>
  );
}
