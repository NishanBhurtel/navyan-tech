import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  stock: z.preprocess((val) => Number(val), z.number().min(0, "Quantity must be positive")),
  description: z.string(),
  originalPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  discountedPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  images: z.array(z.string()).nonempty("At least one image is required"),
  specifications:z.array(z.object({key:z.string(), value:z.string()})),
  categoryID: z.string().min(1, "Category is required"),
  subCategoryID: z.string().min(1, "SubCategory ID is required"),
  brand: z.string().min(1, "Brand is required"),
  technicalSpecification: z.object({
    performance: z.object({
      series: z.string().min(1, "Series is required"),
      cpu: z.string().min(1, "CPU is required"),
      graphics: z.string().min(1, "Graphics is required"),
      display: z.string().min(1, "Display is required"),
      operatingSystem: z.string().min(1, "Operating System is required"),
    }),
    memoryAndStorage: z.object({
      mainMemory: z.string().min(1, "Main Memory is required"),
      storage: z.string().min(1, "Storage is required"),
      connectivity: z.string().min(1, "Connectivity is required"),
      camera: z.string().min(1, "Camera is required"),
      audio: z.string().min(1, "Audio is required"),
      battery: z.string().min(1, "Battery is required"),
      weight: z.string().min(1, "Weight is required"),
      warranty: z.string().min(1, "Warranty is required"),
    }),
  })
});

export const getAllProductSchema = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
    images: z.array(z.string()),
    discountedPrice: z.number(),
    originalPrice: z.number(),
    brand: z.string(),
    description: z.string(),
    categoryID:z.object({_id:z.string(), name:z.string()}),
    subCategoryID:z.object({_id:z.string(), name:z.string()}),
    stock: z.number(),
    createdAt: z.date(),
    technicalSpecification: z
      .object({
        performance: z.object({
          brand: z.string(),
          series: z.string(),
          cpu: z.string(),
          graphics: z.string(),
          display: z.string(),
          operatingSystem: z.string(),
        }),
        memoryAndStorage: z.object({
          mainMemory: z.string(),
          storage: z.string(),
          connectivity: z.string(),
          camera: z.string(),
          audio: z.string(),
          battery: z.string(),
          weight: z.string(),
          warranty: z.string(),
        }),
      })
      .optional(),
    specifications:z.array(z.object({key:z.string(), value: z.string()})),
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
    description: z.string(),
    categoryID: z.string(),
    subCategoryID: z.string(),
    stock: z.number(),
    technicalSpecification: z
      .object({
        performance: z.object({
          series: z.string(),
          cpu: z.string(),
          graphics: z.string(),
          display: z.string(),
          operatingSystem: z.string(),
        }),
        memoryAndStorage: z.object({
          mainMemory: z.string(),
          storage: z.string(),
          connectivity: z.string(),
          camera: z.string(),
          audio: z.string(),
          battery: z.string(),
          weight: z.string(),
          warranty: z.string(),
        }),
      })
      .optional(),
    specifications: z.array(z.object({key:z.string(), value: z.string()}))
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
  specifications: z.array(z.object({key:z.string(), value: z.string()}))
});

export const removeProductSchema = z.object({
  _id: z.string(),
});
