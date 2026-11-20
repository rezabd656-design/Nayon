import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FireworksCanvas,
  type FireworksCanvasHandle,
} from './components/FireworksCanvas';
import { HeartfeltIntro } from './components/HeartfeltIntro';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { StoryChapters } from './components/StoryChapters';
import { WishesGuestbook } from './components/WishesGuestbook';
import { PortraitLightbox } from './components/PortraitLightbox';
import type { FireworkPalette } from './utils/fireworksEngine';
import {
  createWishEntry,
  loadWishes,
  saveWishes,
  type WeddingWish,
} from './utils/wishesStore';

const COUPLE_PHOTO_PATH =
  '/assets/aistudio/b428451b-1f8c-48be-8645-2f5bbb1fbd6e_7ba4a054.jfif';

export default function App() {
  const fireworksRef = useRef<FireworksCanvasHandle | null>(null);

  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return true;
    }
    const params = new URLSearchParams(window.location.search);
    return params.get('autostart') !== '1';
  });

  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [palette, setPalette] = useState<FireworkPalette>('champagne-gold');
  const [burstCount, setBurstCount] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const [wishes, setWishes] = useState<WeddingWish[]>(() =>
    loadWishes(typeof window !== 'undefined' ? window.localStorage : null)
  );

  useEffect(() => {
    saveWishes(
      wishes,
      typeof window !== 'undefined' ? window.localStorage : null
    );
  }, [wishes]);

  const handleBurst = useCallback((count: number) => {
    setBurstCount((prev) => prev + count);
  }, []);

  const handleEnterCelebration = useCallback(() => {
    setShowIntro(false);
    fireworksRef.current?.launchFinale();
  }, []);

  const handleLaunchFinale = useCallback(() => {
    fireworksRef.current?.launchFinale();
  }, []);

  const handleLaunchBurst = useCallback(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    fireworksRef.current?.launchBurst(
      w * (0.25 + Math.random() * 0.5),
      h * (0.18 + Math.random() * 0.22)
    );
  }, []);

  const handleAddWish = useCallback(
    (name: string, relation: string, message: string) => {
      const entry = createWishEntry(name, relation, message);
      setWishes((prev) => [entry, ...prev]);
      fireworksRef.current?.launchFinale();
    },
    []
  );

  return (
    <div
      id="top"
      data-state={showIntro ? 'intro' : 'celebration'}
      className="relative min-h-screen overflow-x-hidden bg-[#090807] text-[#F5EFE6]"
    >
      {/* Full-Viewport Golden Fireworks Night Sky */}
      <FireworksCanvas
        ref={fireworksRef}
        autoPlay={autoPlay}
        palette={palette}
        intensity={showIntro ? 'intro' : 'celebration'}
        onBurst={handleBurst}
      />

      {/* Heartfelt Gold-Animated Opening Curtain */}
      {showIntro && <HeartfeltIntro onEnter={handleEnterCelebration} />}

      {/* Main Wedding Celebration Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <TopBar onLaunchFireworks={handleLaunchFinale} />

        <main className="flex-1">
          <HeroSection
            imageSrc={COUPLE_PHOTO_PATH}
            burstCount={burstCount}
            wishCount={wishes.length}
            palette={palette}
            onLaunchFinale={handleLaunchFinale}
            onOpenLightbox={() => setLightboxOpen(true)}
          />

          <StoryChapters
            autoPlay={autoPlay}
            palette={palette}
            onToggleAutoPlay={() => setAutoPlay((prev) => !prev)}
            onChangePalette={(next) => {
              setPalette(next);
              handleLaunchBurst();
            }}
            onLaunchSalvo={handleLaunchFinale}
            onReplayIntro={() => setShowIntro(true)}
          />

          <WishesGuestbook wishes={wishes} onAddWish={handleAddWish} />
        </main>

        <footer className="border-t border-[#D4AF37]/15 bg-[#090807]/85 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-[#C7BFA9] sm:flex-row">
            <p className="font-display text-base font-medium text-[#F5E4A8]">
              Nayon &amp; Nowsin · Forever Begins Tonight
            </p>
            <p>With heartfelt prayers &amp; golden skies</p>
          </div>
        </footer>
      </div>

      {/* Fullscreen Portrait Lightbox */}
      <PortraitLightbox
        isOpen={lightboxOpen}
        imageSrc={COUPLE_PHOTO_PATH}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
