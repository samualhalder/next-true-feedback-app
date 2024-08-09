import { z } from "zod";

export const signInScehma = z.object({
  email: z.string(),
  passsword: z.string(),
});
