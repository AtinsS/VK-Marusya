import { describe, it, expect, vi, beforeEach } from 'vitest';
import homeReducer, {
  fetchRandomMovie,
  fetchTopMovies,
  selectRandomMovie,
  selectTopMovies,
  initialState,
} from './homeSlice';

vi.mock('../../api/movies.api', () => ({
  MoviesApi: {
    getRandom: vi.fn(),
    getTop: vi.fn(),
  },
}));

import { MoviesApi } from '../../api/movies.api';

const mockMovie = {
  id: 1,
  title: 'Inception',
  originalTitle: 'Inception',
  language: 'en',
  releaseYear: 2010,
  releaseDate: '2010-07-16',
  genres: ['Action'],
  plot: 'A dream within a dream',
  runtime: 148,
  budget: '$160M',
  revenue: '$836M',
  homepage: '',
  status: 'Released',
  posterUrl: '',
  backdropUrl: '',
  trailerUrl: '',
  trailerYouTubeId: 'abc',
  tmdbRating: 8,
  searchL: 'inception',
  keywords: [],
  countriesOfOrigin: [],
  languages: [],
  cast: [],
  director: 'Nolan',
  production: 'WB',
  awardsSummary: '',
};

describe('homeSlice', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns initial state', () => {
    expect(homeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchRandomMovie', () => {
    it('sets movie on success', async () => {
      vi.mocked(MoviesApi.getRandom).mockResolvedValue(mockMovie);

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchRandomMovie()(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: fetchRandomMovie.fulfilled.type, payload: mockMovie }),
      );
    });

    it('sets error on failure', async () => {
      vi.mocked(MoviesApi.getRandom).mockRejectedValue(new Error('fail'));

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchRandomMovie()(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: fetchRandomMovie.rejected.type }),
      );
    });
  });

  describe('fetchTopMovies', () => {
    it('sets movies on success', async () => {
      vi.mocked(MoviesApi.getTop).mockResolvedValue([mockMovie]);

      const dispatch = vi.fn();
      const getState = vi.fn();
      await fetchTopMovies()(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: fetchTopMovies.fulfilled.type }),
      );
    });
  });

  describe('selectors', () => {
    const state = {
      home: {
        ...initialState,
        randomMovie: mockMovie,
        topMovies: [mockMovie],
      },
    };

    it('selectRandomMovie', () => expect(selectRandomMovie(state)).toEqual(mockMovie));
    it('selectTopMovies', () => expect(selectTopMovies(state)).toEqual([mockMovie]));
  });
});
