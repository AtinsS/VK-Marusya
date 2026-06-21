import { z } from "zod";

export const FavoriteSchema = z.object({
  id: z.union([z.number().int(), z.string()]),
});

export type Favorite = z.infer<typeof FavoriteSchema>;
