import type { Movie } from "../entities/movies/types";
import { api } from "./http-client";

export const MoviesApi = {
  getAll: () => api.get<Movie[]>("/movie"),
  getTop: () => api.get<Movie[]>("/movie/top10"),
  getGenres: () => api.get<string[]>("/movie/genres"),
  getById: (id: number) => api.get<Movie>(`/movie/${id}`),
  getRandom: () => api.get<Movie>("/movie/random"),
};
