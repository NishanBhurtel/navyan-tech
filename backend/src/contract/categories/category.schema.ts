import z from "zod";

export const createCategorySchema = z.object({
    name: z.string(),
    description: z.string(),
});

export const getAllCategorySchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
});

export const updateCategoryDetailsSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
});

export const removeCategorySchema = z.object({
    categoryID: z.string(),
});
