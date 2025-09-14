import z from "zod";

export const emailSchema = z.object({
  subject: z.string(),
  text: z.string(),
});
