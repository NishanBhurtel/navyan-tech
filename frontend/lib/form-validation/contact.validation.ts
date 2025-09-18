// src/types/contact.ts
import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required") // handles empty string
    .min(3, "First name must be at least 3 characters")
    .regex(/^[A-Za-z]+$/, "First name must contain only alphabets"),

  lastName: z
    .string()
    .min(1, "Last name is required") // handles empty string
    .min(3, "Last name must be at least 3 characters")
    .regex(/^[A-Za-z]+$/, "Last name must contain only alphabets"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .transform((val) => val.trim().toLowerCase()),
  phone: z
    .string()
    .min(1, "Phone number is required") // checks empty
    .regex(/^\d+$/, "Phone number must contain only digits") // only numbers
    .length(10, "Phone number must be exactly 10 digits") // exact 10 digits
    .regex(/^(97|98)\d{8}$/, "Phone number must start with 97 or 98"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  newsletter: z.boolean().optional().default(false),

});

export type TContactFormSchema = z.infer<typeof contactFormSchema>;
