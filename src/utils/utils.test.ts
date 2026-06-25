import { describe, it, expect } from 'vitest';
import { formatRuntime, ratingColor, getErrorMessage } from './utils';

describe('formatRuntime', () => {
  it('formats minutes only', () => {
    expect(formatRuntime(45)).toBe('45 мин');
  });

  it('formats hours only', () => {
    expect(formatRuntime(120)).toBe('2 ч');
  });

  it('formats hours and minutes', () => {
    expect(formatRuntime(125)).toBe('2 ч 5 мин');
  });

  it('handles zero', () => {
    expect(formatRuntime(0)).toBe('0 мин');
  });
});

describe('ratingColor', () => {
  it('returns gray for undefined', () => {
    expect(ratingColor(undefined)).toBe('#777');
  });

  it('returns red for low ratings (<=5)', () => {
    expect(ratingColor(3)).toBe('#C82020');
  });

  it('returns gray for 6', () => {
    expect(ratingColor(6)).toBe('#777');
  });

  it('returns green for 7', () => {
    expect(ratingColor(7)).toBe('#308E21');
  });

  it('returns gold for high ratings (>7)', () => {
    expect(ratingColor(9)).toBe('#A59400');
  });
});

describe('getErrorMessage', () => {
  it('extracts error from axios response data', () => {
    const error = {
      isAxiosError: true,
      response: { data: { error: 'Invalid credentials' } },
    };
    expect(getErrorMessage(error, 'fallback')).toBe('Invalid credentials');
  });

  it('extracts message from axios response data', () => {
    const error = {
      isAxiosError: true,
      response: { data: { message: 'Something went wrong' } },
    };
    expect(getErrorMessage(error, 'fallback')).toBe('Something went wrong');
  });

  it('returns fallback for unknown error', () => {
    expect(getErrorMessage('random', 'fallback')).toBe('fallback');
  });

  it('extracts message from Error instance', () => {
    expect(getErrorMessage(new Error('test'), 'fallback')).toBe('test');
  });
});
