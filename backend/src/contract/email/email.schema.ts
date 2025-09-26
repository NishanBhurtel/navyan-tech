import z from "zod";

export const emailSchema = z.object({
  subject: z.string(),
  text: z.string(),
});
export const emailSchemaToSpecificUser = z.object({
  email: z.string().email(),
  subject: z.string(),
  text: z.string(),
  html: z.string().optional(),
});
