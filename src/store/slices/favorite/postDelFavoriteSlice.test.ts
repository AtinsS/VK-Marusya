import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AxiosResponse } from 'axios';
import type { RootState } from '../../../store/store';
import toggleFavoriteReducer, {
  fetchPostFavorite,
  fetchDelFavorite,
  resetFavoriteStatus,
  selectFavoriteStatus,
  selectFavoriteToggleError,
  initialState,
} from './postDelFavoriteSlice';

vi.mock('../../../api/favorites.api', () => ({
  FavoriteApi: {
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
  },
}));

import { FavoriteApi } from '../../../api/favorites.api';

function mockAxiosResponse(data: void): AxiosResponse<void> {
  return { data, status: 200, statusText: 'OK', headers: {}, config: {} };
}

describe('postDelFavoriteSlice', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns initial state', () => {
    expect(toggleFavoriteReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchPostFavorite', () => {
    it('returns id on success', async () => {
      vi.mocked(FavoriteApi.addFavorite).mockResolvedValue(mockAxiosResponse(undefined));

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchPostFavorite(42)(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: fetchPostFavorite.fulfilled.type, payload: 42 }),
      );
    });

    it('sets error on failure', async () => {
      vi.mocked(FavoriteApi.addFavorite).mockRejectedValue(new Error('fail'));

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchPostFavorite(42)(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: fetchPostFavorite.rejected.type }),
      );
    });
  });

  describe('fetchDelFavorite', () => {
    it('returns id on success', async () => {
      vi.mocked(FavoriteApi.removeFavorite).mockResolvedValue(mockAxiosResponse(undefined));

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchDelFavorite(42)(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: fetchDelFavorite.fulfilled.type, payload: 42 }),
      );
    });
  });

  describe('resetFavoriteStatus', () => {
    it('resets status and error', () => {
      const state = toggleFavoriteReducer(
        { status: 'failed', error: 'some error' },
        resetFavoriteStatus(),
      );
      expect(state.status).toBe('idle');
      expect(state.error).toBeNull();
    });
  });

  describe('selectors', () => {
    const state: RootState = {
      home: { randomMovie: null, topMovies: [], randomMovieStatus: 'idle', topMoviesStatus: 'idle', randomMovieError: null, topMoviesError: null },
      genre: { genres: [], status: 'idle', error: null },
      filmId: { movie: null, movieId: null, status: 'idle', error: null },
      genreMovies: { movies: {}, status: 'idle', error: null },
      auth: { user: null, isAuth: false, status: 'idle', error: null },
      favorite: { favorites: [], movies: {}, status: 'idle', error: null },
      postFavorite: { status: 'loading', error: null },
    };

    it('selectFavoriteStatus', () => {
      expect(selectFavoriteStatus(state)).toBe('loading');
    });

    it('selectFavoriteToggleError', () => {
      expect(selectFavoriteToggleError({ ...state, postFavorite: { status: 'idle', error: 'err' } })).toBe('err');
    });
  });
});
