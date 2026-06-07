import { z } from "zod";

export const FavoriteSchema = z.object({
  id: z.number().int(),
});

export type Favorite = z.infer<typeof FavoriteSchema>;
