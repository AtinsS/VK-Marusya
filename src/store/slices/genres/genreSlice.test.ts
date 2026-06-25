import { describe, it, expect, vi, beforeEach } from 'vitest';
import genreReducer, {
  fetchGenres,
  initialState,
} from './genreSlice';

vi.mock('../../../api/movies.api', () => ({
  MoviesApi: { getGenres: vi.fn() },
}));

import { MoviesApi } from '../../../api/movies.api';

describe('genreSlice', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns initial state', () => {
    expect(genreReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchGenres', () => {
    it('deduplicates genres on success', async () => {
      vi.mocked(MoviesApi.getGenres).mockResolvedValue(['Action', 'Action', 'Comedy']);

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchGenres()(dispatch, getState, undefined);

      const fulfilledCall = dispatch.mock.calls.find(
        (call: unknown[]) => {
          const action = call[0] as { type?: string };
          return action?.type === fetchGenres.fulfilled.type;
        },
      );
      expect(fulfilledCall).toBeDefined();
      const action = fulfilledCall![0] as { payload: string[] };
      expect(action.payload).toEqual(['Action', 'Action', 'Comedy']);
    });

    it('sets error on failure', async () => {
      vi.mocked(MoviesApi.getGenres).mockRejectedValue(new Error('fail'));

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchGenres()(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: fetchGenres.rejected.type }),
      );
    });
  });

  it('handles fulfilled reducer with dedup', () => {
    const state = genreReducer(
      initialState,
      fetchGenres.fulfilled(['Action', 'Action', 'Comedy'], ''),
    );
    expect(state.genres).toEqual(['Action', 'Comedy']);
    expect(state.status).toBe('succeeded');
  });
});
