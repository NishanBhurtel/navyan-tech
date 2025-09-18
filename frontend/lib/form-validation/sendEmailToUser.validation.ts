import { z } from "zod";

export const adminEmailSchema = z.object({
  subject: z.string().min(1, "Subject line is required"),
  text: z.string().min(1, "Email content is required"),
});

export type TAdminEmailFormSchema = z.infer<typeof adminEmailSchema>;