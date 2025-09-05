// lib/utils/validation.ts
import { z } from "zod";

// Simple validation - only name and description
export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long").trim(),
  description: z.string().max(500, "Description too long").trim(),
});

export const subcategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long").trim(),
  description: z.string().max(500, "Description too long").trim(),
  categoryId: z.number().int().positive("Valid category required"),
});

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  parentCategory: z.string(),
});

export type CategorySchema = z.infer<typeof categorySchema>;
export type SubcategorySchema = z.infer<typeof subcategorySchema>;
export type FormSchema = z.infer<typeof formSchema>;
