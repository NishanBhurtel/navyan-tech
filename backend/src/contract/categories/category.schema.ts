import z from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Categoroy is required!"),
  description: z.string().min(1, "Description is required!"),
});

export const getAllCategorySchema = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
  })
);
export const updateCategoryDetailsSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "Categoroy is required!"),
  description: z.string().min(1, "Description is required!"),
});

export const removeCategorySchema = z.object({
  categoryID: z.string(),
});
