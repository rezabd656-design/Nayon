export interface WeddingWish {
  id: string;
  name: string;
  relation: string;
  message: string;
  createdAt: string;
}

export interface WishValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    message?: string;
  };
}

export const WISHES_STORAGE_KEY = 'nayon_nowsin_wedding_wishes_v1';

export const INITIAL_WISHES: WeddingWish[] = [
  {
    id: 'seed-1',
    name: 'Tahmid & Farhana Rahman',
    relation: 'Family · Dhaka',
    message:
      'May Allah bless Nayon and Nowsin with endless warmth, quiet mornings full of laughter, and a lifetime anchored in mercy and love.',
    createdAt: 'November 20, 2026',
  },
  {
    id: 'seed-2',
    name: 'Nadia Karim',
    relation: 'Bride’s Sister',
    message:
      'Seeing the way you two look at each other tonight is pure magic. Wishing our dearest Nowsin and Nayon bhaiya every joy under the stars.',
    createdAt: 'November 20, 2026',
  },
  {
    id: 'seed-3',
    name: 'Arif & Samira Chowdhury',
    relation: 'Close Friends',
    message:
      'From the very first chapter to your golden wedding night, your kindness shines through. Shubho Bibaho to an unforgettable couple.',
    createdAt: 'November 20, 2026',
  },
];

export function validateWishInput(
  name: string,
  message: string
): WishValidationResult {
  const trimmedName = name.trim();
  const trimmedMessage = message.trim();
  const errors: { name?: string; message?: string } = {};

  if (!trimmedName) {
    errors.name = 'Please share your name so the couple knows who sent this blessing.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please write a heartfelt wish or blessing for Nayon & Nowsin.';
  } else if (trimmedMessage.length < 6) {
    errors.message = 'Please write at least a short sentence for your blessing.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createWishEntry(
  name: string,
  relation: string,
  message: string,
  date: Date = new Date()
): WeddingWish {
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    id: `wish-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: name.trim(),
    relation: relation.trim() || 'Wedding Guest',
    message: message.trim(),
    createdAt: formattedDate,
  };
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export function loadWishes(storage?: StorageLike | null): WeddingWish[] {
  if (!storage) {
    return INITIAL_WISHES;
  }
  try {
    const raw = storage.getItem(WISHES_STORAGE_KEY);
    if (!raw) {
      return INITIAL_WISHES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Ignore storage read errors and fall back to seed wishes
  }
  return INITIAL_WISHES;
}

export function saveWishes(
  wishes: WeddingWish[],
  storage?: StorageLike | null
): void {
  if (!storage) {
    return;
  }
  try {
    storage.setItem(WISHES_STORAGE_KEY, JSON.stringify(wishes));
  } catch {
    // Ignore storage quota errors
  }
}
