export type FireworkStyle = 'peony' | 'chrysanthemum' | 'willow' | 'ring';
export type FireworkPalette = 'champagne-gold' | 'rose-gold' | 'grand-finale';

export interface FireworkRocket {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  style: FireworkStyle;
  palette: FireworkPalette;
  trail: Array<{ x: number; y: number }>;
  exploded: boolean;
  color: string;
}

export interface FireworkParticle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  gravity: number;
  drag: number;
  size: number;
  color: string;
  twinkle: boolean;
  phase: number;
}

const PALETTE_COLORS: Record<FireworkPalette, string[]> = {
  'champagne-gold': ['#F7E7B4', '#E6C25A', '#D4AF37', '#FFF6D6', '#C9972B'],
  'rose-gold': ['#F7E7B4', '#E8A0B0', '#F3C5D0', '#D4AF37', '#FFF4E6'],
  'grand-finale': ['#F7E7B4', '#D4AF37', '#E8A0B0', '#FFF8E1', '#F59E0B', '#F9C6D2'],
};

const STYLES: FireworkStyle[] = ['peony', 'chrysanthemum', 'willow', 'ring'];

let nextRocketId = 1;

export function pickPaletteColor(
  palette: FireworkPalette,
  rng: () => number = Math.random
): string {
  const colors = PALETTE_COLORS[palette];
  const index = Math.floor(rng() * colors.length) % colors.length;
  return colors[index];
}

export function pickStyle(rng: () => number = Math.random): FireworkStyle {
  const index = Math.floor(rng() * STYLES.length) % STYLES.length;
  return STYLES[index];
}

export function createRocket(
  width: number,
  height: number,
  options: {
    targetX?: number;
    targetY?: number;
    startX?: number;
    style?: FireworkStyle;
    palette?: FireworkPalette;
  } = {},
  rng: () => number = Math.random
): FireworkRocket {
  const safeW = Math.max(width, 320);
  const safeH = Math.max(height, 320);

  const targetX =
    options.targetX !== undefined
      ? options.targetX
      : safeW * (0.15 + rng() * 0.7);

  const targetY =
    options.targetY !== undefined
      ? Math.min(Math.max(options.targetY, safeH * 0.1), safeH * 0.58)
      : safeH * (0.14 + rng() * 0.34);

  const startX =
    options.startX !== undefined
      ? options.startX
      : targetX + (rng() - 0.5) * 90;

  const startY = safeH + 10;
  const palette = options.palette ?? 'champagne-gold';
  const style = options.style ?? pickStyle(rng);

  // Compute initial upward velocity for smooth apex arrival
  const gravity = 280; // px/s^2
  const distanceY = Math.max(startY - targetY, 120);
  const vy = -Math.sqrt(2 * gravity * distanceY);
  const flightTime = Math.abs(vy) / gravity;
  const vx = (targetX - startX) / Math.max(flightTime, 0.25);

  return {
    id: nextRocketId++,
    x: startX,
    y: startY,
    vx,
    vy,
    targetY,
    style,
    palette,
    trail: [{ x: startX, y: startY }],
    exploded: false,
    color: pickPaletteColor(palette, rng),
  };
}

export function stepRocket(rocket: FireworkRocket, dtSeconds: number): boolean {
  if (rocket.exploded) {
    return false;
  }

  const dt = Math.min(Math.max(dtSeconds, 0.001), 0.05);
  const gravity = 280;

  rocket.trail.push({ x: rocket.x, y: rocket.y });
  if (rocket.trail.length > 8) {
    rocket.trail.shift();
  }

  rocket.x += rocket.vx * dt;
  rocket.y += rocket.vy * dt;
  rocket.vy += gravity * dt;

  // Explode when reaching apex (vy >= -18) or crossing targetY
  if (rocket.vy >= -18 || rocket.y <= rocket.targetY) {
    rocket.exploded = true;
    return true;
  }

  return false;
}

export function spawnBurstParticles(
  x: number,
  y: number,
  style: FireworkStyle,
  palette: FireworkPalette,
  rng: () => number = Math.random
): FireworkParticle[] {
  const particles: FireworkParticle[] = [];
  const baseColor = pickPaletteColor(palette, rng);

  const count =
    style === 'willow'
      ? 48
      : style === 'chrysanthemum'
        ? 56
        : style === 'ring'
          ? 40
          : 44;

  for (let i = 0; i < count; i++) {
    const angle =
      style === 'ring'
        ? (i / count) * Math.PI * 2 + (rng() - 0.5) * 0.06
        : rng() * Math.PI * 2;

    let speed: number;
    if (style === 'ring') {
      speed = 190 + (rng() - 0.5) * 24;
    } else if (style === 'willow') {
      speed = 90 + rng() * 165;
    } else if (style === 'chrysanthemum') {
      speed = 110 + rng() * 210;
    } else {
      speed = 70 + Math.pow(rng(), 0.65) * 195;
    }

    const color =
      rng() < 0.55 ? baseColor : pickPaletteColor(palette, rng);

    particles.push({
      x,
      y,
      prevX: x,
      prevY: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      decay:
        style === 'willow'
          ? 0.28 + rng() * 0.16
          : 0.38 + rng() * 0.24,
      gravity: style === 'willow' ? 125 : 86,
      drag: style === 'willow' ? 0.962 : 0.948,
      size: style === 'chrysanthemum' ? 2.4 + rng() * 1.4 : 2.0 + rng() * 1.3,
      color,
      twinkle: style === 'willow' || rng() < 0.42,
      phase: rng() * Math.PI * 2,
    });
  }

  return particles;
}

export function stepParticles(
  particles: FireworkParticle[],
  dtSeconds: number
): FireworkParticle[] {
  const dt = Math.min(Math.max(dtSeconds, 0.001), 0.05);
  const frameDragFactor = dt * 60;
  const alive: FireworkParticle[] = [];

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.prevX = p.x;
    p.prevY = p.y;

    const drag = Math.pow(p.drag, frameDragFactor);
    p.vx *= drag;
    p.vy *= drag;
    p.vy += p.gravity * dt;

    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.alpha -= p.decay * dt;
    p.phase += dt * 14;

    if (p.alpha > 0.02) {
      alive.push(p);
    }
  }

  return alive;
}
