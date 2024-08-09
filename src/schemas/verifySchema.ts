import { z } from "zod";

export const varifySchema = z.object({
  code: z.string().length(6, "code must be of 6 chrecters."),
});
