import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_WISHES,
  validateWishInput,
  createWishEntry,
  loadWishes,
  saveWishes,
  type StorageLike,
} from './wishesStore';

function createMemoryStorage(): StorageLike {
  const map = new Map<string, string>();
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => {
      map.set(key, value);
    },
  };
}

test('validateWishInput rejects empty name and empty message without silent bypass', () => {
  const res = validateWishInput('   ', '');
  assert.equal(res.valid, false);
  assert.ok(res.errors.name);
  assert.ok(res.errors.message);
});

test('validateWishInput rejects overly short message and accepts valid wishes', () => {
  const shortMsg = validateWishInput('Rafi', 'Hi');
  assert.equal(shortMsg.valid, false);
  assert.equal(shortMsg.errors.name, undefined);
  assert.ok(shortMsg.errors.message);

  const valid = validateWishInput('Rafi Ahmed', 'Wishing Nayon and Nowsin lifelong happiness!');
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('createWishEntry trims values and defaults empty relation to Wedding Guest', () => {
  const fixedDate = new Date('2026-11-20T12:00:00Z');
  const entry = createWishEntry('  Zarin Tasnim  ', '', '  May your home always glow with peace. ', fixedDate);
  assert.equal(entry.name, 'Zarin Tasnim');
  assert.equal(entry.relation, 'Wedding Guest');
  assert.equal(entry.message, 'May your home always glow with peace.');
  assert.ok(entry.createdAt.includes('2026'));
});

test('saveWishes and loadWishes round-trip through storage and fall back cleanly', () => {
  const storage = createMemoryStorage();
  assert.equal(loadWishes(storage).length, INITIAL_WISHES.length);

  const custom = [
    createWishEntry('Tanvir', 'Cousin', 'Congratulations to both of you!'),
    ...INITIAL_WISHES,
  ];
  saveWishes(custom, storage);

  const loaded = loadWishes(storage);
  assert.equal(loaded.length, INITIAL_WISHES.length + 1);
  assert.equal(loaded[0].name, 'Tanvir');
});
