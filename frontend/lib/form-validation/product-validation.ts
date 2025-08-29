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
  description: z.string().optional(),
  originalPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  discountPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
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
      warrenty: z.string().min(1, "Warranty is required"),
    }),
  }),
});



// ✅ Update Product
export const updateProductDetailsSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be a positive number").optional(),
  originalPrice: z
    .number()
    .min(0, "Original price must be a positive number")
    .optional(),
  brand: z.string().optional(),
  category: z.string().optional(),
  images: z.array(z.string()).optional(),
  badge: z.string().optional(),
  badgeColor: z.string().optional(),
  productInStock: z.boolean().optional(),
  stockAlert: z.number().min(0, "Stock alert must be 0 or greater").optional(),
  specifications: z.record(z.any()).optional(),
});

// ✅ Get All Products (with filters & sorting)
export const getAllProductDetailsSchema = z.object({
  userId: z.string().min(1, "User ID is required").optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  inStock: z.boolean().optional(),
  sortBy: z.enum(["createdAt", "name", "price"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

// ✅ Get Product By ID
export const getProductDetailsByID = z.object({
  productId: z.string().min(1, "Product ID is required"),
});

// ✅ Delete Product
export const deleteProductByID = z.object({
  productId: z.string().min(1, "Product ID is required"),
  reason: z.string().optional(), // optional: for audit logging
});

// ---- Type Inference ----
export type TCreateProductSchema = z.infer<typeof createProductSchema>;
export type TUpdateProductSchema = z.infer<typeof updateProductDetailsSchema>;
export type TGetAllProductSchema = z.infer<typeof getAllProductDetailsSchema>;
export type TGetProductByIDSchema = z.infer<typeof getProductDetailsByID>;
export type TDeleteProductSchema = z.infer<typeof deleteProductByID>;
