import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Quantity must be positive")
  ),
  description: z.string(),
  originalPrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be positive")
  ),
  discountedPrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be positive")
  ),
  images: z.array(z.string()).nonempty("At least one image is required"),
  specifications: z.array(z.object({ key: z.string(), value: z.string() })),
  categoryID: z.string().min(1, "Category is required"),
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

export const getAllProductSchema = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
    images: z.array(z.string()),
    discountedPrice: z.number(),
    originalPrice: z.number(),
    brand: z.string(),
    isFeatured: z.boolean(),
    description: z.string(),
    categoryID: z.object({ _id: z.string(), name: z.string() }),
    subCategoryID: z.object({ _id: z.string(), name: z.string() }),
    stock: z.number(),
    createdAt: z.date(),
    technicalSpecification: z
      .object({
        performance: z.object({
          brand: z.string().optional(),
          series: z.string().optional(),
          cpu: z.string().optional(),
          graphics: z.string().optional(),
          display: z.string(),
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
    specifications: z.array(z.object({ key: z.string(), value: z.string() })),
  })
);

export const getProductDetailsByID = z.object({
  success: z.boolean(),
  data: z.object({
    _id: z.string(),
    name: z.string(),
    images: z.array(z.string()),
    discountedPrice: z.number(),
    originalPrice: z.number(),
    brand: z.string(),
    isFeatured: z.boolean(),
    description: z.string(),
    categoryID: z.string(),
    subCategoryID: z.string(),
    stock: z.number(),
    technicalSpecification: z
      .object({
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
    specifications: z.array(z.object({ key: z.string(), value: z.string() })),
  }),
});

export const updateProductDetailsSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  images: z.array(z.string()), // array of image URLs
  discountedPrice: z.number().positive("Price must be greater than 0"),
  originalPrice: z.number().positive("Original price must be greater than 0"),
  brand: z.string().min(1, "Brand is required"),
  description: z.string().optional(),
  categoryID: z.string().min(1, "Category is required"),
  subCategoryID: z.string().min(1, "Sub category is required"),
  stock: z.number().min(0),
  isFeatured: z.boolean().optional(),
  technicalSpecification: z.object({
    performance: z.object({
      series: z.string().optional(),
      cpu: z.string().optional(),
      graphics: z.string().optional(),
      display: z.string().optional(),
      operatingSystem: z.string().optional(),
      brand: z.string().optional(),
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
  specifications: z.array(z.object({ key: z.string(), value: z.string() })),
});

export const removeProductSchema = z.object({
  _id: z.string(),
});
