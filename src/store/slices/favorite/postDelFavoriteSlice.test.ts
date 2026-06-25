import { describe, it, expect, vi, beforeEach } from 'vitest';
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

describe('postDelFavoriteSlice', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns initial state', () => {
    expect(toggleFavoriteReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchPostFavorite', () => {
    it('returns id on success', async () => {
      vi.mocked(FavoriteApi.addFavorite).mockResolvedValue({ data: undefined });

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
      vi.mocked(FavoriteApi.removeFavorite).mockResolvedValue({ data: undefined });

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
    it('selectFavoriteStatus', () => {
      expect(selectFavoriteStatus({ postFavorite: { status: 'loading', error: null } })).toBe('loading');
    });

    it('selectFavoriteToggleError', () => {
      expect(selectFavoriteToggleError({ postFavorite: { status: 'idle', error: 'err' } })).toBe('err');
    });
  });
});
