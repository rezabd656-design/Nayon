import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createRocket,
  stepRocket,
  spawnBurstParticles,
  stepParticles,
} from './fireworksEngine';

function makeSeededRng(seed = 42): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

test('createRocket initializes upward trajectory below viewport toward targetY', () => {
  const rng = makeSeededRng(10);
  const rocket = createRocket(1440, 900, { targetX: 720, targetY: 220 }, rng);
  assert.equal(rocket.exploded, false);
  assert.ok(rocket.y > 900);
  assert.ok(rocket.vy < 0);
  assert.equal(rocket.targetY, 220);
});

test('stepRocket advances upward and signals explosion at apex', () => {
  const rng = makeSeededRng(7);
  const rocket = createRocket(1200, 800, { targetX: 600, targetY: 200 }, rng);
  let explodedNow = false;

  for (let i = 0; i < 200; i++) {
    if (stepRocket(rocket, 0.016)) {
      explodedNow = true;
      break;
    }
  }

  assert.equal(explodedNow, true);
  assert.equal(rocket.exploded, true);
  assert.ok(rocket.y <= 260);
});

test('spawnBurstParticles creates style-accurate particle counts and velocities', () => {
  const rng = makeSeededRng(99);
  const willow = spawnBurstParticles(500, 250, 'willow', 'champagne-gold', rng);
  const ring = spawnBurstParticles(500, 250, 'ring', 'rose-gold', rng);

  assert.equal(willow.length, 48);
  assert.equal(ring.length, 40);
  assert.ok(willow.every((p) => p.alpha === 1 && p.x === 500 && p.y === 250));
});

test('stepParticles applies gravity, reduces alpha, and removes expired sparks', () => {
  const rng = makeSeededRng(12);
  let particles = spawnBurstParticles(400, 200, 'peony', 'grand-finale', rng);
  const initialCount = particles.length;

  // Simulate 0.5 seconds
  for (let i = 0; i < 30; i++) {
    particles = stepParticles(particles, 0.016);
  }
  assert.equal(particles.length, initialCount);
  assert.ok(particles.every((p) => p.alpha < 1));

  // Simulate another 3 seconds until all particles decay out
  for (let i = 0; i < 180; i++) {
    particles = stepParticles(particles, 0.02);
  }
  assert.equal(particles.length, 0);
});
