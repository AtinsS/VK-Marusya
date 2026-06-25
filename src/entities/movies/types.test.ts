import { describe, it, expect } from 'vitest';
import { MovieSchema } from './types';

describe('MovieSchema', () => {
  const validMovie = {
    id: 1,
    title: 'Inception',
    originalTitle: 'Inception',
    language: 'en',
    releaseYear: 2010,
    releaseDate: '2010-07-16',
    genres: ['Action', 'Sci-Fi'],
    plot: 'A thief who steals corporate secrets through dream-sharing technology.',
    runtime: 148,
    budget: '$160,000,000',
    revenue: '$836,800,000',
    homepage: 'https://example.com',
    status: 'Released',
    posterUrl: 'https://example.com/poster.jpg',
    backdropUrl: 'https://example.com/backdrop.jpg',
    trailerUrl: 'https://example.com/trailer',
    trailerYouTubeId: 'YoHD9XEInc0',
    tmdbRating: 8,
    searchL: 'inception',
    keywords: ['dream', 'heist'],
    countriesOfOrigin: ['US'],
    languages: ['en'],
    cast: ['Leonardo DiCaprio'],
    director: 'Christopher Nolan',
    production: 'Warner Bros.',
    awardsSummary: 'Won 4 Oscars',
  };

  it('accepts valid movie', () => {
    expect(MovieSchema.safeParse(validMovie).success).toBe(true);
  });

  it('accepts empty URLs', () => {
    const movie = { ...validMovie, homepage: '', posterUrl: '', backdropUrl: '', trailerUrl: '' };
    expect(MovieSchema.safeParse(movie).success).toBe(true);
  });

  it('rejects movie with missing required field', () => {
    const { title, ...rest } = validMovie;
    expect(MovieSchema.safeParse(rest).success).toBe(false);
  });

  it('rejects non-integer id', () => {
    expect(MovieSchema.safeParse({ ...validMovie, id: 1.5 }).success).toBe(false);
  });
});
