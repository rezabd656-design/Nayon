import { RotateCcw, Sparkles, Pause, Play } from 'lucide-react';
import type { FireworkPalette } from '../utils/fireworksEngine';

interface StoryChaptersProps {
  autoPlay: boolean;
  palette: FireworkPalette;
  onToggleAutoPlay: () => void;
  onChangePalette: (palette: FireworkPalette) => void;
  onLaunchSalvo: () => void;
  onReplayIntro: () => void;
}

const CHAPTERS = [
  {
    index: '01',
    title: 'The Quiet Spark',
    subtitle: 'Where Two Paths Met',
    prose:
      'Long before the chandeliers were lit and the floral arch stood in bloom, there was a gentle understanding—two souls recognizing kindness, patience, and laughter in each other.',
  },
  {
    index: '02',
    title: 'The Sacred Promise',
    subtitle: 'Hand in Hand',
    prose:
      'Draped in champagne gold and rose zari, Nayon and Nowsin step forward together. Not merely sharing a single evening of splendor, but building a sanctuary of mercy, trust, and lifelong companionship.',
  },
  {
    index: '03',
    title: 'Under Golden Skies',
    subtitle: 'Forever Illuminated',
    prose:
      'May every year ahead carry the warmth of this wedding night—bright with gratitude, anchored in faith, and crowned with moments as radiant as golden fireworks.',
  },
];

const PALETTES: Array<{ id: FireworkPalette; label: string }> = [
  { id: 'champagne-gold', label: 'Champagne Gold' },
  { id: 'rose-gold', label: 'Rose & Gold' },
  { id: 'grand-finale', label: 'Grand Finale' },
];

export function StoryChapters({
  autoPlay,
  palette,
  onToggleAutoPlay,
  onChangePalette,
  onLaunchSalvo,
  onReplayIntro,
}: StoryChaptersProps) {
  return (
    <>
      {/* Editorial Story Chapters */}
      <section
        id="story"
        className="mx-auto max-w-[1200px] px-6 py-14 sm:py-18"
      >
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#D4AF37]/20 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-[#D4AF37]">
              Our Tribute
            </p>
            <h2 className="font-display mt-2 text-balance text-3xl font-semibold text-[#F5EFE6] sm:text-4xl">
              Three Chapters of Love &amp; Grace
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#C7BFA9]">
            A keepsake written in honor of Nayon &amp; Nowsin on the night two
            families and two hearts became one.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CHAPTERS.map((chapter) => (
            <article
              key={chapter.index}
              className="flex flex-col justify-between border border-[#D4AF37]/20 bg-[#12100E]/82 p-7 bg-[#12100E]/90 transition-colors duration-200 hover:border-[#D4AF37]/45"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#D4AF37]">
                  <span className="tabular-nums">{chapter.index}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#C7BFA9]">{chapter.subtitle}</span>
                </div>
                <h3 className="font-display mt-3 text-2xl font-semibold text-[#F5E4A8]">
                  {chapter.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#E7DEC8]/85">
                  {chapter.prose}
                </p>
              </div>
              <div className="mt-7 h-px w-12 bg-[#D4AF37]/35" />
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Fireworks Celebration Controls */}
      <section
        id="celebration"
        className="mx-auto max-w-[1200px] px-6 py-10 sm:py-14"
      >
        <div className="border border-[#D4AF37]/25 bg-[#12100E]/92 p-7 sm:p-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="text-xs font-medium tracking-[0.2em] text-[#D4AF37]">
                Interactive Night Sky
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold text-[#F5EFE6]">
                Golden Fireworks Celebration
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#C7BFA9]">
                Choose a celestial palette, pause or resume the automatic sky
                show, or tap anywhere on the dark backdrop to send a firework
                soaring for Nayon &amp; Nowsin.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onToggleAutoPlay}
                aria-pressed={autoPlay}
                className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap shrink-0 border border-[#D4AF37]/35 bg-[#191613] px-4 py-2.5 text-sm font-medium text-[#F5EFE6] transition-colors duration-150 hover:border-[#D4AF37] hover:text-[#F5E4A8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
              >
                {autoPlay ? (
                  <>
                    <Pause className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
                    <span>Pause Auto Sky</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
                    <span>Resume Auto Sky</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onLaunchSalvo}
                className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap shrink-0 bg-gradient-to-r from-[#C89B2B] via-[#EBD286] to-[#C89B2B] px-5 py-2.5 text-sm font-semibold text-[#120F0A] transition-transform duration-150 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5E4A8]"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Ignite Salvo</span>
              </button>

              <button
                type="button"
                onClick={onReplayIntro}
                className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap shrink-0 border border-[#D4AF37]/25 px-4 py-2.5 text-sm font-medium text-[#D5CBB8] transition-colors duration-150 hover:border-[#D4AF37]/60 hover:text-[#F5E4A8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>Replay Intro</span>
              </button>
            </div>
          </div>

          {/* Segmented Palette Filter Bar */}
          <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-[#D4AF37]/15 pt-6">
            <span className="text-xs font-medium text-[#C7BFA9]">
              Sky Palette:
            </span>
            <div
              role="group"
              aria-label="Fireworks color palette"
              className="inline-flex flex-wrap items-center gap-1.5 bg-[#090807]/80 p-1 border border-[#D4AF37]/20"
            >
              {PALETTES.map((item) => {
                const isActive = palette === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChangePalette(item.id)}
                    aria-pressed={isActive}
                    className={`min-h-[36px] whitespace-nowrap shrink-0 px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5E4A8] ${
                      isActive
                        ? 'bg-[#D4AF37] text-[#120F0A]'
                        : 'text-[#D5CBB8] hover:text-[#F5E4A8]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
