import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Movie } from '../../../entities/movies/types';
import genreMoviesReducer, {
  fetchMoviesGrouped,
  initialState,
} from './genreMoviesSlice';

vi.mock('../../../api/movies.api', () => ({
  MoviesApi: { getGenres: vi.fn(), getByGenre: vi.fn() },
}));

import { MoviesApi } from '../../../api/movies.api';

describe('genreMoviesSlice', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns initial state', () => {
    expect(genreMoviesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchMoviesGrouped', () => {
    it('groups movies by genre', async () => {
      vi.mocked(MoviesApi.getGenres).mockResolvedValue(['Action', 'Comedy']);
      vi.mocked(MoviesApi.getByGenre).mockResolvedValue([]);

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchMoviesGrouped()(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: fetchMoviesGrouped.fulfilled.type }),
      );
    });

    it('sets error on failure', async () => {
      vi.mocked(MoviesApi.getGenres).mockRejectedValue(new Error('fail'));

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchMoviesGrouped()(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: fetchMoviesGrouped.rejected.type }),
      );
    });
  });

  it('handles fulfilled reducer', () => {
    const payload: Record<string, Movie[]> = { Action: [], Comedy: [] };
    const state = genreMoviesReducer(
      initialState,
      fetchMoviesGrouped.fulfilled(payload, ''),
    );
    expect(state.movies).toEqual(payload);
    expect(state.status).toBe('succeeded');
  });
});
