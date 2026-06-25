import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AxiosResponse } from 'axios';
import type { Favorite } from '../../../entities/favorites/types';
import type { Movie } from '../../../entities/movies/types';
import favoritesReducer, {
  fetchFavorites,
  initialState,
} from './getFavoritesSlice';

vi.mock('../../../api/favorites.api', () => ({
  FavoriteApi: { getFavorites: vi.fn() },
}));

vi.mock('../../../api/movies.api', () => ({
  MoviesApi: { getById: vi.fn() },
}));

import { FavoriteApi } from '../../../api/favorites.api';
import { MoviesApi } from '../../../api/movies.api';

const mockMovie: Movie = {
  id: 1,
  title: 'Test',
  originalTitle: 'Test',
  language: 'en',
  releaseYear: 2020,
  releaseDate: '2020-01-01',
  genres: [],
  plot: '',
  runtime: 90,
  budget: '',
  revenue: '',
  homepage: '',
  status: '',
  posterUrl: '',
  backdropUrl: '',
  trailerUrl: '',
  trailerYouTubeId: '',
  tmdbRating: 7,
  searchL: '',
  keywords: [],
  countriesOfOrigin: [],
  languages: [],
  cast: [],
  director: '',
  production: '',
  awardsSummary: '',
};

function mockAxiosResponse<T>(data: T): AxiosResponse<T> {
  return { data, status: 200, statusText: 'OK', headers: {}, config: {} };
}

describe('getFavoritesSlice', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns initial state', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchFavorites', () => {
    it('normalizes array response', async () => {
      vi.mocked(FavoriteApi.getFavorites).mockResolvedValue(mockAxiosResponse([1, 2]));
      vi.mocked(MoviesApi.getById).mockResolvedValue(mockMovie);

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchFavorites()(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: fetchFavorites.fulfilled.type,
        }),
      );
    });

    it('normalizes object with favorites field', async () => {
      vi.mocked(FavoriteApi.getFavorites).mockResolvedValue(
        mockAxiosResponse({ favorites: [1, 2] }),
      );
      vi.mocked(MoviesApi.getById).mockResolvedValue(mockMovie);

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchFavorites()(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: fetchFavorites.fulfilled.type,
        }),
      );
    });

    it('sets error on failure', async () => {
      vi.mocked(FavoriteApi.getFavorites).mockRejectedValue(new Error('fail'));

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchFavorites()(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: fetchFavorites.rejected.type }),
      );
    });
  });

  it('handles fulfilled reducer', () => {
    const payload = {
      favorites: [{ id: 1 }, { id: 2 }] as Favorite[],
      movies: { 1: mockMovie },
    };
    const state = favoritesReducer(
      initialState,
      fetchFavorites.fulfilled(payload, ''),
    );
    expect(state.favorites).toHaveLength(2);
    expect(state.movies[1]).toEqual(mockMovie);
    expect(state.status).toBe('succeeded');
  });
});
