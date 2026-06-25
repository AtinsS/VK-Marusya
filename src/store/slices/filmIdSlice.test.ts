import { describe, it, expect, vi, beforeEach } from 'vitest';
import filmIdReducer, {
  fetchMovieById,
  selectFilmById,
  selectFilmByIdStatus,
  selectFilmByIdError,
  initialState,
} from './filmIdSlice';

vi.mock('../../api/movies.api', () => ({
  MoviesApi: { getById: vi.fn() },
}));

import { MoviesApi } from '../../api/movies.api';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  originalTitle: 'Test Movie',
  language: 'en',
  releaseYear: 2020,
  releaseDate: '2020-01-01',
  genres: [],
  plot: '',
  runtime: 90,
  budget: '',
  revenue: '',
  homepage: '',
  status: 'Released',
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

describe('filmIdSlice', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns initial state', () => {
    expect(filmIdReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchMovieById', () => {
    it('sets movie on success', async () => {
      vi.mocked(MoviesApi.getById).mockResolvedValue(mockMovie);

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchMovieById(1)(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: fetchMovieById.fulfilled.type,
          payload: mockMovie,
        }),
      );
    });

    it('sets error on failure', async () => {
      vi.mocked(MoviesApi.getById).mockRejectedValue(new Error('fail'));

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchMovieById(999)(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: fetchMovieById.rejected.type }),
      );
    });
  });

  it('handles pending reducer', () => {
    const state = filmIdReducer(
      initialState,
      fetchMovieById.pending('', 1),
    );
    expect(state.status).toBe('loading');
    expect(state.movieId).toBe(1);
    expect(state.movie).toBeNull();
  });

  it('handles fulfilled reducer', () => {
    const state = filmIdReducer(
      { ...initialState, status: 'loading' },
      fetchMovieById.fulfilled(mockMovie, '', 1),
    );
    expect(state.status).toBe('succeeded');
    expect(state.movie).toEqual(mockMovie);
  });

  it('handles rejected reducer', () => {
    const state = filmIdReducer(
      { ...initialState, status: 'loading' },
      fetchMovieById.rejected(new Error('fail'), '', undefined, 'Network error'),
    );
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Network error');
  });

  describe('selectors', () => {
    const state = {
      filmId: { ...initialState, movie: mockMovie, status: 'succeeded' as const },
    };

    it('selectFilmById', () => expect(selectFilmById(state)).toEqual(mockMovie));
    it('selectFilmByIdStatus', () => expect(selectFilmByIdStatus(state)).toBe('succeeded'));
    it('selectFilmByIdError', () => expect(selectFilmByIdError(state)).toBeNull());
  });
});
