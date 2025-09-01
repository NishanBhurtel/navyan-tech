import { z } from "zod";

// Define valid categories and subcategories
const categories = {
  Laptops: ["Gaming Laptops", "MacBook", "Ultrabooks", "Business Laptops"],
  Computers: ["Gaming Desktop", "Mini PC", "All-in-One", "Workstations"],
  Components: ["Processors", "Graphics Cards", "Motherboards", "RAM", "Storage"],
  Accessories: ["Keyboards", "Mice", "Monitors", "Speakers"],
};

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  stock: z.preprocess((val) => Number(val), z.number().min(0, "Quantity must be positive")),
  details: z.string().optional(),
  originalPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  discountedPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  images: z.array(z.string()).nonempty("At least one image is required"),
  specifications:z.array(z.object({key:z.string(), value:z.string()})),
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
      warrenty: z.string().min(1, "Warranty is required"),
    }),
  }),
});

// ✅ Update Product
export const updateProductDetailsSchema = z.object({
  _id: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  stock: z.preprocess((val) => Number(val), z.number().min(0, "Quantity must be positive")),
  details: z.string().optional(),
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
   _id:z.string(),
    name: z.string(),
    image: z.array(z.string()),
    discountedPrice: z.number(),
    originalPrice: z.number(),
    details: z.string(),
    categoryID: z.string(),
    stock: z.number(),
    category: z.string().optional(),
    brand: z.string().optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    sortBy: z.enum(["createdAt", "name", "price"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),

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
});

// ✅ Get Product By ID
export const getProductDetailsByID = z.object({
   _id:z.string(),
    name: z.string(),
    image: z.array(z.string()),
    discountedPrice: z.number(),
    originalPrice: z.number(),
    details: z.string(),
    categoryID: z.string(),
    productInStock: z.boolean(),
    stock: z.number(),
    category: z.string().optional(),
    brand: z.string().optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    sortBy: z.enum(["createdAt", "name", "price"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),

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
