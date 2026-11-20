import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  createRocket,
  spawnBurstParticles,
  stepParticles,
  stepRocket,
  type FireworkPalette,
  type FireworkParticle,
  type FireworkRocket,
  type FireworkStyle,
} from '../utils/fireworksEngine';

export interface FireworksCanvasHandle {
  launchBurst: (targetX?: number, targetY?: number, style?: FireworkStyle) => void;
  launchFinale: () => void;
}

interface FireworksCanvasProps {
  autoPlay: boolean;
  palette: FireworkPalette;
  intensity?: 'intro' | 'celebration';
  onBurst?: (count: number) => void;
}

interface ShockwaveRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

interface StarPoint {
  xFrac: number;
  yFrac: number;
  size: number;
  baseAlpha: number;
  phase: number;
  speed: number;
}

function createStarfield(count: number): StarPoint[] {
  const stars: StarPoint[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      xFrac: Math.random(),
      yFrac: Math.random() * 0.78,
      size: 0.7 + Math.random() * 1.4,
      baseAlpha: 0.16 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 1.8,
    });
  }
  return stars;
}

export const FireworksCanvas = forwardRef<FireworksCanvasHandle, FireworksCanvasProps>(
  function FireworksCanvas({ autoPlay, palette, intensity = 'celebration', onBurst }, ref) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rocketsRef = useRef<FireworkRocket[]>([]);
    const particlesRef = useRef<FireworkParticle[]>([]);
    const ringsRef = useRef<ShockwaveRing[]>([]);
    const starsRef = useRef<StarPoint[]>(createStarfield(72));
    const paletteRef = useRef<FireworkPalette>(palette);
    const autoPlayRef = useRef<boolean>(autoPlay);
    const intensityRef = useRef<'intro' | 'celebration'>(intensity);
    const onBurstRef = useRef(onBurst);
    const finaleTimeoutsRef = useRef<number[]>([]);

    paletteRef.current = palette;
    autoPlayRef.current = autoPlay;
    intensityRef.current = intensity;
    onBurstRef.current = onBurst;

    const launchSingle = (
      targetX?: number,
      targetY?: number,
      style?: FireworkStyle,
      overridePalette?: FireworkPalette
    ) => {
      const width = window.innerWidth || 1280;
      const height = window.innerHeight || 800;
      // Cap total active rockets so rapid clicks stay silky smooth
      if (rocketsRef.current.length > 18) {
        return;
      }
      const rocket = createRocket(width, height, {
        targetX,
        targetY,
        style,
        palette: overridePalette ?? paletteRef.current,
      });
      rocketsRef.current.push(rocket);
    };

    const launchFinale = () => {
      const width = window.innerWidth || 1280;
      const height = window.innerHeight || 800;
      const offsets = [0.16, 0.3, 0.44, 0.56, 0.7, 0.84, 0.5];
      const styles: FireworkStyle[] = [
        'chrysanthemum',
        'willow',
        'peony',
        'ring',
        'chrysanthemum',
        'willow',
        'chrysanthemum',
      ];

      offsets.forEach((frac, idx) => {
        const timerId = window.setTimeout(() => {
          launchSingle(
            width * frac,
            height * (0.16 + (idx % 3) * 0.08),
            styles[idx],
            'grand-finale'
          );
        }, idx * 145);
        finaleTimeoutsRef.current.push(timerId);
      });
    };

    useImperativeHandle(ref, () => ({
      launchBurst: (x, y, style) => launchSingle(x, y, style),
      launchFinale,
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return;
      }

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      let width = window.innerWidth;
      let height = window.innerHeight;

      const resize = () => {
        const dpr = 1;
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      resize();
      window.addEventListener('resize', resize);

      // Launch initial celebratory welcome arc
      if (!prefersReducedMotion) {
        const t1 = window.setTimeout(() => launchSingle(width * 0.22, height * 0.22, 'willow'), 180);
        const t2 = window.setTimeout(() => launchSingle(width * 0.78, height * 0.2, 'chrysanthemum'), 460);
        const t3 = window.setTimeout(() => launchSingle(width * 0.5, height * 0.16, 'ring'), 780);
        finaleTimeoutsRef.current.push(t1, t2, t3);
      }

      // Click anywhere on open sky/background (not interactive controls) to launch a firework
      const handlePointerDown = (e: PointerEvent) => {
        const target = e.target as HTMLElement | null;
        if (
          target &&
          target.closest('button, a, input, textarea, select, label, [role="dialog"]')
        ) {
          return;
        }
        launchSingle(e.clientX, Math.min(e.clientY, height * 0.62));
      };
      window.addEventListener('pointerdown', handlePointerDown);

      let rafId = 0;
      let timeoutId = 0;
      let destroyed = false;
      let lastTime = performance.now();
      let autoLaunchTimer = 0;

      const scheduleNext = () => {
        if (destroyed || prefersReducedMotion) {
          return;
        }
        timeoutId = window.setTimeout(() => {
          if (!destroyed) {
            rafId = window.requestAnimationFrame(renderFrame);
          }
        }, 28);
      };

      const renderFrame = (now: number) => {
        if (destroyed) {
          return;
        }
        const elapsedMs = now - lastTime;
        const dt = Math.min(Math.max(elapsedMs / 1000, 0.016), 0.05);
        lastTime = now;

        // Soft obsidian trail fade so golden trails linger gracefully
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(9, 8, 7, 0.21)';
        ctx.fillRect(0, 0, width, height);

        // Subtle twinkling golden starfield
        const tSec = now * 0.001;
        for (let i = 0; i < starsRef.current.length; i++) {
          const s = starsRef.current[i];
          const alpha =
            s.baseAlpha * (0.65 + 0.35 * Math.sin(tSec * s.speed + s.phase));
          ctx.fillStyle = `rgba(247, 231, 180, ${alpha.toFixed(2)})`;
          ctx.fillRect(s.xFrac * width, s.yFrac * height, s.size, s.size);
        }

        // Auto-launch cadence
        if (autoPlayRef.current && !prefersReducedMotion) {
          autoLaunchTimer += dt;
          const interval = intensityRef.current === 'intro' ? 1.35 : 1.55;
          if (autoLaunchTimer >= interval) {
            autoLaunchTimer = 0;
            launchSingle();
          }
        }

        // Step & draw rising rockets
        const remainingRockets: FireworkRocket[] = [];
        let explodedThisFrame = 0;

        for (let i = 0; i < rocketsRef.current.length; i++) {
          const r = rocketsRef.current[i];
          const didExplode = stepRocket(r, dt);

          if (r.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(r.trail[0].x, r.trail[0].y);
            for (let j = 1; j < r.trail.length; j++) {
              ctx.lineTo(r.trail[j].x, r.trail[j].y);
            }
            ctx.strokeStyle = 'rgba(247, 231, 180, 0.72)';
            ctx.lineWidth = 2.2;
            ctx.stroke();
          }

          ctx.fillStyle = '#FFF9E2';
          ctx.fillRect(r.x - 2, r.y - 2, 4, 4);

          if (didExplode) {
            explodedThisFrame += 1;
            const burst = spawnBurstParticles(r.x, r.y, r.style, r.palette);
            if (particlesRef.current.length < 480) {
              particlesRef.current.push(...burst);
            }
            ringsRef.current.push({
              x: r.x,
              y: r.y,
              radius: 5,
              maxRadius: r.style === 'chrysanthemum' ? 88 : 64,
              alpha: 0.55,
              color: r.color,
            });
          } else {
            remainingRockets.push(r);
          }
        }
        rocketsRef.current = remainingRockets;

        if (explodedThisFrame > 0 && onBurstRef.current) {
          onBurstRef.current(explodedThisFrame);
        }

        // Draw expanding golden shockwave rings
        const nextRings: ShockwaveRing[] = [];
        for (let i = 0; i < ringsRef.current.length; i++) {
          const ring = ringsRef.current[i];
          ring.radius += (ring.maxRadius - ring.radius) * Math.min(dt * 8, 1);
          ring.alpha -= dt * 1.15;
          if (ring.alpha > 0.02) {
            ctx.strokeStyle = ring.color;
            ctx.globalAlpha = ring.alpha * 0.5;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
            ctx.stroke();
            nextRings.push(ring);
          }
        }
        ringsRef.current = nextRings;
        ctx.globalAlpha = 1;

        // Step & draw burst particles
        particlesRef.current = stepParticles(particlesRef.current, dt);
        for (let i = 0; i < particlesRef.current.length; i++) {
          const p = particlesRef.current[i];
          const twinkleMod = p.twinkle
            ? 0.58 + 0.42 * Math.sin(p.phase)
            : 1;
          const drawAlpha = Math.max(0, Math.min(1, p.alpha * twinkleMod));

          ctx.globalAlpha = drawAlpha * 0.85;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 1.15;
          ctx.beginPath();
          ctx.moveTo(p.prevX, p.prevY);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          ctx.globalAlpha = drawAlpha;
          ctx.fillStyle = '#FFF9E2';
          ctx.fillRect(p.x - p.size * 0.45, p.y - p.size * 0.45, p.size * 0.9, p.size * 0.9);
        }
        ctx.globalAlpha = 1;

        scheduleNext();
      };

      if (prefersReducedMotion) {
        renderFrame(performance.now());
      } else {
        rafId = window.requestAnimationFrame(renderFrame);
      }

      return () => {
        destroyed = true;
        window.clearTimeout(timeoutId);
        window.cancelAnimationFrame(rafId);
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointerdown', handlePointerDown);
        finaleTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
        finaleTimeoutsRef.current = [];
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        data-testid="fireworks-canvas"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />
    );
  }
);
