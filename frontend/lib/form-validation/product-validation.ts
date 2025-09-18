import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Quantity must be positive")
  ),
  description: z.string().optional(),
  originalPrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be positive")
  ),
  discountedPrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be positive")
  ),
  images: z
    .string()
    .array()
    .optional()
    .refine((files) => !files || files.length <= 4, {
      message: "You can upload a maximum of 4 images",
    })
    .refine(
      (files) =>
        !files || files.every((file) => /\.(jpe?g|png|webp)$/i.test(file)),
      {
        message: "Only .jpeg, .jpg, .png, or .webp files are allowed",
      }
    ),
  specifications: z
    .array(
      z.object({
        key: z.string().min(1, "Key is required"),
        value: z.string().min(1, "Value is required"),
      })
    )
    .optional(),
  categoryID: z.string().min(1, "Category ID is required"),
  subCategoryID: z.string().min(1, "SubCategory ID is required"),
  brand: z.string().min(1, "Brand is required"),
  isFeatured: z.boolean().optional(),
  technicalSpecification: z.object({
    performance: z.object({
      series: z.string().optional(),
      cpu: z.string().optional(),
      graphics: z.string().optional(),
      display: z.string().optional(),
      operatingSystem: z.string().optional(),
    }),
    memoryAndStorage: z.object({
      mainMemory: z.string().optional(),
      storage: z.string().optional(),
      connectivity: z.string().optional(),
      camera: z.string().optional(),
      audio: z.string().optional(),
      battery: z.string().optional(),
      weight: z.string().optional(),
      warranty: z.string().optional(),
    }),
  }),
});

// ✅ Update Product
export const updateProductDetailsSchema = z.object({
  _id: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Quantity must be positive")
  ),
  description: z.string().optional(),
  originalPrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be positive")
  ),
  discountedPrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be positive")
  ),
  images: z
    .string()
    .array()
    .optional()
    .refine((files) => !files || files.length <= 4, {
      message: "You can upload a maximum of 4 images",
    })
    .refine(
      (files) =>
        !files || files.every((file) => /\.(jpe?g|png|webp)$/i.test(file)),
      {
        message: "Only .jpeg, .jpg, .png, or .webp files are allowed",
      }
    ),
  specifications: z.array(z.object({ key: z.string(), value: z.string() })),
  categoryID: z.string().min(1, "Category is required"),
  subCategoryID: z.string().min(1, "Sub category is required"),
  brand: z.string().min(1, "Brand is required"),
  isFeatured: z.boolean().optional(),
  technicalSpecification: z.object({
    performance: z.object({
      series: z.string().optional(),
      cpu: z.string().optional(),
      graphics: z.string().optional(),
      display: z.string().optional(),
      operatingSystem: z.string().optional(),
    }),
    memoryAndStorage: z.object({
      mainMemory: z.string().optional(),
      storage: z.string().optional(),
      connectivity: z.string().optional(),
      camera: z.string().optional(),
      audio: z.string().optional(),
      battery: z.string().optional(),
      weight: z.string().optional(),
      warranty: z.string().optional(),
    }),
  }),
});

// ✅ Get All Products (with filters & sorting)
export const getAllProductDetailsSchema = z.object({
  _id: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Quantity must be positive")
  ),
  description: z.string().optional(),
  originalPrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be positive")
  ),
  discountedPrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be positive")
  ),
  images: z.array(z.string()).nonempty("At least one image is required"),
  specifications: z.record(z.string(), z.string()).optional(),
  categoryID: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  isFeatured: z.boolean().optional(),
  createdAt: z.string().min(1, "Date is required"),
  technicalSpecification: z.object({
    performance: z.object({
      series: z.string().optional(),
      cpu: z.string().optional(),
      graphics: z.string().optional(),
      display: z.string().optional(),
      operatingSystem: z.string().optional(),
    }),
    memoryAndStorage: z.object({
      mainMemory: z.string().optional(),
      storage: z.string().optional(),
      connectivity: z.string().optional(),
      camera: z.string().optional(),
      audio: z.string().optional(),
      battery: z.string().optional(),
      weight: z.string().optional(),
      warranty: z.string().optional(),
    }),
  }),
});

// ✅ Get Product By ID
export const getProductDetailsByID = z.object({
  _id: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Quantity must be positive")
  ),
  description: z.string().optional(),
  originalPrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be positive")
  ),
  discountedPrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be positive")
  ),
  images: z.array(z.string()).nonempty("At least one image is required"),
  specifications: z.record(z.string(), z.string()).optional(),
  categoryID: z.string().min(1, "Category is required"),
  subCategoryID: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  isFeatured: z.boolean().optional(),
  createdAt: z.string().min(1, "Date is required"),
  technicalSpecification: z.object({
    performance: z.object({
      series: z.string().optional(),
      cpu: z.string().optional(),
      graphics: z.string().optional(),
      display: z.string().optional(),
      operatingSystem: z.string().optional(),
    }),
    memoryAndStorage: z.object({
      mainMemory: z.string().optional(),
      storage: z.string().optional(),
      connectivity: z.string().optional(),
      camera: z.string().optional(),
      audio: z.string().optional(),
      battery: z.string().optional(),
      weight: z.string().optional(),
      warranty: z.string().optional(),
    }),
  }),
});

// ✅ Delete Product
export const deleteProductByID = z.object({
  productId: z.string().min(1, "Product ID is required"),
});

// ---- Type Inference ----
export type TCreateProductSchema = z.infer<typeof createProductSchema>;
export type TUpdateProductSchema = z.infer<typeof updateProductDetailsSchema>;
export type TGetAllProductSchema = z.infer<typeof getAllProductDetailsSchema>;
export type TGetProductByIDSchema = z.infer<typeof getProductDetailsByID>;
export type TDeleteProductSchema = z.infer<typeof deleteProductByID>;
