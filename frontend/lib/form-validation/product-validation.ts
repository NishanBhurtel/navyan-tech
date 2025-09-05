import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  stock: z.preprocess((val) => Number(val), z.number().min(0, "Quantity must be positive")),
  description: z.string().optional(),
  originalPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  discountedPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  images: z.array(z.string()).nonempty("At least one image is required"),
  specifications:z.array(z.object({key:z.string(), value:z.string()})),
  categoryID: z.string().min(1, "Category ID is required"),
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
  }),
});

// ✅ Update Product
export const updateProductDetailsSchema = z.object({
  _id: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  stock: z.preprocess((val) => Number(val), z.number().min(0, "Quantity must be positive")),
  description: z.string().optional(),
  originalPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  discountedPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  images: z.array(z.string()).nonempty("At least one image is required"),
  specifications: z.record(z.string(), z.string()).optional(),
  categoryID: z.string().min(1, "Category is required"),
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
  }),
});

// ✅ Get All Products (with filters & sorting)
export const getAllProductDetailsSchema = z.object({
    _id: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  stock: z.preprocess((val) => Number(val), z.number().min(0, "Quantity must be positive")),
  description: z.string().optional(),
  originalPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  discountedPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  images: z.array(z.string()).nonempty("At least one image is required"),
  specifications: z.record(z.string(), z.string()).optional(),
  categoryID: z.string().min(1, "Category is required"),
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
  }),
});

// ✅ Get Product By ID
export const getProductDetailsByID = z.object({
     _id: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  stock: z.preprocess((val) => Number(val), z.number().min(0, "Quantity must be positive")),
  description: z.string().optional(),
  originalPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  discountedPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  images: z.array(z.string()).nonempty("At least one image is required"),
  specifications: z.record(z.string(), z.string()).optional(),
  categoryID: z.string().min(1, "Category is required"),
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
