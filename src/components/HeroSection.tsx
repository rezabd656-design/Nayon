import { useState } from 'react';
import { Expand, Sparkles, Heart } from 'lucide-react';
import type { FireworkPalette } from '../utils/fireworksEngine';

interface HeroSectionProps {
  imageSrc: string;
  burstCount: number;
  wishCount: number;
  palette: FireworkPalette;
  onLaunchFinale: () => void;
  onOpenLightbox: () => void;
}

const PALETTE_LABEL: Record<FireworkPalette, string> = {
  'champagne-gold': 'Champagne Gold',
  'rose-gold': 'Blush Rose & Gold',
  'grand-finale': 'Grand Finale',
};

export function HeroSection({
  imageSrc,
  burstCount,
  wishCount,
  palette,
  onLaunchFinale,
  onOpenLightbox,
}: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="portrait"
      className="relative mx-auto max-w-[1200px] px-6 pt-12 pb-16 sm:pt-16 sm:pb-20"
    >
      {/* Balanced 2-Column Editorial Hero Split */}
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Typographic Hierarchy & Heartfelt Dedication */}
        <div className="animate-fade-in-up flex flex-col justify-between border border-[#D4AF37]/20 bg-[#12100E]/76 p-8 sm:p-11 lg:col-span-6">
          <div>
            {/* Quiet Unboxed Editorial Metadata */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium tracking-[0.16em] text-[#D4AF37]">
              <span>Wedding Celebration</span>
              <span aria-hidden="true">·</span>
              <span>Forever Union</span>
            </div>

            {/* Monumental Display Headline */}
            <h1 className="font-display text-gold-shimmer mt-5 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl xl:text-[4.25rem]">
              Nayon &amp; Nowsin
            </h1>

            <p className="mt-3 font-display text-xl italic text-[#E8A0B0] sm:text-2xl">
              Written in gold, celebrated beneath the stars.
            </p>

            {/* Animated gold hairline divider */}
            <div className="gold-divider-sweep relative my-7 h-px w-full overflow-hidden bg-[#D4AF37]/25" />

            <div className="space-y-4 text-base leading-relaxed text-[#E7DEC8]/90">
              <p>
                Every glance holds a quiet promise, and every smile tells a story
                only the two of you know by heart. Surrounded by warm rose petals,
                golden chandeliers, and the prayers of everyone who loves you,
                your new chapter begins in grace.
              </p>
              <p className="text-sm leading-relaxed text-[#C7BFA9]">
                Click anywhere in the night sky to launch custom golden fireworks in
                honor of Nayon &amp; Nowsin, or trigger the Grand Finale below.
              </p>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onLaunchFinale}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap shrink-0 bg-gradient-to-r from-[#C89B2B] via-[#EBD286] to-[#C89B2B] px-6 py-3 text-sm font-semibold text-[#120F0A] shadow-[0_8px_28px_rgba(212,175,55,0.28)] transition-transform duration-150 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5E4A8]"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Launch Grand Finale</span>
            </button>

            <button
              type="button"
              onClick={onOpenLightbox}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap shrink-0 border border-[#D4AF37]/35 bg-[#191613] px-5 py-3 text-sm font-medium text-[#F5EFE6] transition-colors duration-150 hover:border-[#D4AF37] hover:text-[#F5E4A8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
            >
              <Expand className="h-4 w-4" aria-hidden="true" />
              <span>View Full Portrait</span>
            </button>
          </div>
        </div>

        {/* Right Column: Featured Wedding Photograph */}
        <div className="animate-fade-in-up-delayed relative flex flex-col border border-[#D4AF37]/30 bg-[#12100E]/88 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.65)] lg:col-span-6">
          {/* Decorative animated gold corner accents */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-[#D4AF37]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-[#D4AF37]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-[#D4AF37]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-[#D4AF37]"
          />

          <div className="relative min-h-[440px] flex-1 overflow-hidden bg-[#1A1612] sm:min-h-[540px] lg:min-h-[580px]">
            {!imageError ? (
              <img
                src={imageSrc}
                alt="Nayon in an ivory gold-embroidered sherwani and Nowsin in a rose-pink zari saree gazing warmly at each other on their floral wedding stage"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.015]"
              />
            ) : (
              <div className="flex h-full min-h-[440px] flex-col items-center justify-center bg-gradient-to-b from-[#1E1914] to-[#120F0C] p-8 text-center">
                <Heart className="mb-3 h-10 w-10 text-[#D4AF37]" aria-hidden="true" />
                <p className="font-display text-2xl font-semibold text-[#F5E4A8]">
                  Nayon &amp; Nowsin
                </p>
                <p className="mt-1 text-xs text-[#C7BFA9]">
                  Wedding Stage Portrait
                </p>
              </div>
            )}

            {/* Measured bottom contrast scrim */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#090807]/90 via-[#090807]/45 to-transparent p-6 pt-16">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-2xl font-semibold text-[#FFF6E0]">
                    The Wedding Portrait
                  </p>
                  <p className="mt-0.5 text-xs tracking-wide text-[#E7DEC8]/85">
                    Champagne Sherwani &amp; Rose Zari · Floral Stage
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenLightbox}
                  aria-label="Open full-screen wedding portrait"
                  className="pointer-events-auto inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap shrink-0 border border-[#D4AF37]/45 bg-[#090807]/75 px-3.5 py-2 text-xs font-medium text-[#F5E4A8] backdrop-blur-sm transition-colors duration-150 hover:bg-[#D4AF37] hover:text-[#120F0A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5E4A8]"
                >
                  <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Expand</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Celebration Strip Below Hero Split */}
      <div className="mt-8 grid grid-cols-2 border border-[#D4AF37]/20 bg-[#12100E]/76 md:grid-cols-4">
        <div className="border-b border-r border-[#D4AF37]/15 px-6 py-5 md:border-b-0">
          <p className="text-xs font-medium text-[#C7BFA9]">The Couple</p>
          <p className="font-display mt-1 text-xl font-semibold text-[#F5E4A8]">
            Nayon &amp; Nowsin
          </p>
        </div>

        <div className="border-b border-[#D4AF37]/15 px-6 py-5 md:border-r md:border-b-0">
          <p className="text-xs font-medium text-[#C7BFA9]">Sky Palette</p>
          <p className="font-display mt-1 text-xl font-semibold text-[#F5EFE6]">
            {PALETTE_LABEL[palette]}
          </p>
        </div>

        <div className="border-r border-[#D4AF37]/15 px-6 py-5">
          <p className="text-xs font-medium text-[#C7BFA9]">Fireworks Launched</p>
          <p
            data-testid="fireworks-count"
            className="font-display mt-1 text-2xl font-semibold tabular-nums text-[#F5E4A8]"
          >
            {burstCount}
          </p>
        </div>

        <div className="px-6 py-5">
          <p className="text-xs font-medium text-[#C7BFA9]">Blessings Shared</p>
          <p
            data-testid="wishes-count"
            className="font-display mt-1 text-2xl font-semibold tabular-nums text-[#E8A0B0]"
          >
            {wishCount}
          </p>
        </div>
      </div>
    </section>
  );
}
