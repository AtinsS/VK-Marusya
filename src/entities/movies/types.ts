import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  releaseYear: z.number().int(),
  releaseDate: z.string(),
  genres: z.array(z.string()),
  plot: z.string(),
  runtime: z.number().int(),
  budget: z.string(),
  revenue: z.string(),
  homepage: z.string().url().or(z.literal("")),
  status: z.string(),
  posterUrl: z.string().url().or(z.literal("")),
  backdropUrl: z.string().url().or(z.literal("")),
  trailerUrl: z.string().url().or(z.literal("")),
  trailerYouTubeId: z.string(),
  tmdbRating: z.number().int(),
  searchL: z.string(),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.string(),
  production: z.string(),
  awardsSummary: z.string(),
});

export type Movie = z.infer<typeof MovieSchema>;
