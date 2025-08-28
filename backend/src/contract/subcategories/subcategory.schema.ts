import z from "zod";

export const createSubCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  parentCategoryId: z.string(),
});

// export const getAllSubCategorySchema = z.object({
//   _id: z.string(),
//   name: z.string(),
//   description: z.string(),
// });

export const getAllSubCategorySchema = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
  })
);

export const updateSubCategoryDetailsSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const removeSubCategorySchema = z.object({
  subcategoryID: z.string(),
});
