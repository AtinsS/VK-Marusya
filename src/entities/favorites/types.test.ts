import { describe, it, expect } from 'vitest';
import { FavoriteSchema } from './types';

describe('FavoriteSchema', () => {
  it('accepts numeric id', () => {
    expect(FavoriteSchema.safeParse({ id: 42 }).success).toBe(true);
  });

  it('accepts string id', () => {
    expect(FavoriteSchema.safeParse({ id: '42' }).success).toBe(true);
  });

  it('rejects float id', () => {
    expect(FavoriteSchema.safeParse({ id: 1.5 }).success).toBe(false);
  });

  it('rejects missing id', () => {
    expect(FavoriteSchema.safeParse({}).success).toBe(false);
  });
});
