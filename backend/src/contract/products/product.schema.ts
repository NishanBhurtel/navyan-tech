import z from "zod";

export const createProductSchema = z.object({
  name: z.string(),
  image: z.array(z.string()),
  discountedPrice: z.number(),
  originalPrice: z.number(),
  brand: z.string(),
  details: z.string(),
  categoryID: z.string(),
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
});

export const getAllProductSchema = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
    image: z.array(z.string()),
    discountedPrice: z.number(),
    originalPrice: z.number(),
    brand: z.string(),
    details: z.string(),
    categoryID: z.string(),
    stock: z.number(),

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

    specifications:z.array(z.object({key:z.string(), value: z.string()}))
  })
);

export const getProductDetailsByID = z.object({
  success: z.boolean(),

  data: z.object({
    _id: z.string(),
    name: z.string(),
    image: z.array(z.string()),
    discountedPrice: z.number(),
    originalPrice: z.number(),
    brand: z.string(),
    details: z.string(),
    categoryID: z.string(),
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
  image: z.array(z.string()), // array of image URLs
  discountedPrice: z.number().positive("Price must be greater than 0"),
  originalPrice: z.number().positive("Original price must be greater than 0"),
  brand: z.string().min(1, "Brand is required"),
  details: z.string().optional(),
  categoryID: z.string().min(1, "Category is required"),
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
  Id: z.string(),
});
