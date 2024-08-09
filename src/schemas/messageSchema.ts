import { z } from "zod";

export const messageScehma = z.object({
  content: z.string().max(300, "keep your message under 300 characters."),
});
