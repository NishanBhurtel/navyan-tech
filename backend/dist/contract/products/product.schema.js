"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProductSchema = exports.updateProductDetailsSchema = exports.getProductDetailsByID = exports.getAllProductSchema = exports.createProductSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createProductSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Product name is required"),
    stock: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().min(0, "Quantity must be positive")),
    description: zod_1.default.string(),
    originalPrice: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().min(0, "Price must be positive")),
    discountedPrice: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().min(0, "Price must be positive")),
    images: zod_1.default.array(zod_1.default.string()).nonempty("At least one image is required"),
    specifications: zod_1.default.array(zod_1.default.object({ key: zod_1.default.string(), value: zod_1.default.string() })),
    categoryID: zod_1.default.string().min(1, "Category is required"),
    subCategoryID: zod_1.default.string().min(1, "SubCategory ID is required"),
    brand: zod_1.default.string().min(1, "Brand is required"),
    isFeatured: zod_1.default.boolean().optional(),
    technicalSpecification: zod_1.default.object({
        performance: zod_1.default.object({
            series: zod_1.default.string().optional(),
            cpu: zod_1.default.string().optional(),
            graphics: zod_1.default.string().optional(),
            display: zod_1.default.string().optional(),
            operatingSystem: zod_1.default.string().optional(),
        }),
        memoryAndStorage: zod_1.default.object({
            mainMemory: zod_1.default.string().optional(),
            storage: zod_1.default.string().optional(),
            connectivity: zod_1.default.string().optional(),
            camera: zod_1.default.string().optional(),
            audio: zod_1.default.string().optional(),
            battery: zod_1.default.string().optional(),
            weight: zod_1.default.string().optional(),
            warranty: zod_1.default.string().optional(),
        }),
    }),
});
exports.getAllProductSchema = zod_1.default.array(zod_1.default.object({
    _id: zod_1.default.string(),
    name: zod_1.default.string(),
    images: zod_1.default.array(zod_1.default.string()),
    discountedPrice: zod_1.default.number(),
    originalPrice: zod_1.default.number(),
    brand: zod_1.default.string(),
    isFeatured: zod_1.default.boolean(),
    description: zod_1.default.string(),
    categoryID: zod_1.default.object({ _id: zod_1.default.string(), name: zod_1.default.string() }),
    subCategoryID: zod_1.default.object({ _id: zod_1.default.string(), name: zod_1.default.string() }),
    stock: zod_1.default.number(),
    createdAt: zod_1.default.date(),
    technicalSpecification: zod_1.default
        .object({
        performance: zod_1.default.object({
            brand: zod_1.default.string().optional(),
            series: zod_1.default.string().optional(),
            cpu: zod_1.default.string().optional(),
            graphics: zod_1.default.string().optional(),
            display: zod_1.default.string(),
            operatingSystem: zod_1.default.string().optional(),
        }),
        memoryAndStorage: zod_1.default.object({
            mainMemory: zod_1.default.string().optional(),
            storage: zod_1.default.string().optional(),
            connectivity: zod_1.default.string().optional(),
            camera: zod_1.default.string().optional(),
            audio: zod_1.default.string().optional(),
            battery: zod_1.default.string().optional(),
            weight: zod_1.default.string().optional(),
            warranty: zod_1.default.string().optional(),
        }),
    }),
    specifications: zod_1.default.array(zod_1.default.object({ key: zod_1.default.string(), value: zod_1.default.string() })),
}));
exports.getProductDetailsByID = zod_1.default.object({
    success: zod_1.default.boolean(),
    data: zod_1.default.object({
        _id: zod_1.default.string(),
        name: zod_1.default.string(),
        images: zod_1.default.array(zod_1.default.string()),
        discountedPrice: zod_1.default.number(),
        originalPrice: zod_1.default.number(),
        brand: zod_1.default.string(),
        isFeatured: zod_1.default.boolean(),
        description: zod_1.default.string(),
        categoryID: zod_1.default.string(),
        subCategoryID: zod_1.default.string(),
        stock: zod_1.default.number(),
        technicalSpecification: zod_1.default
            .object({
            performance: zod_1.default.object({
                series: zod_1.default.string().optional(),
                cpu: zod_1.default.string().optional(),
                graphics: zod_1.default.string().optional(),
                display: zod_1.default.string().optional(),
                operatingSystem: zod_1.default.string().optional(),
            }),
            memoryAndStorage: zod_1.default.object({
                mainMemory: zod_1.default.string().optional(),
                storage: zod_1.default.string().optional(),
                connectivity: zod_1.default.string().optional(),
                camera: zod_1.default.string().optional(),
                audio: zod_1.default.string().optional(),
                battery: zod_1.default.string().optional(),
                weight: zod_1.default.string().optional(),
                warranty: zod_1.default.string().optional(),
            }),
        }),
        specifications: zod_1.default.array(zod_1.default.object({ key: zod_1.default.string(), value: zod_1.default.string() })),
    }),
});
exports.updateProductDetailsSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Product name is required"),
    images: zod_1.default.array(zod_1.default.string()), // array of image URLs
    discountedPrice: zod_1.default.number().positive("Price must be greater than 0"),
    originalPrice: zod_1.default.number().positive("Original price must be greater than 0"),
    brand: zod_1.default.string().min(1, "Brand is required"),
    description: zod_1.default.string().optional(),
    categoryID: zod_1.default.string().min(1, "Category is required"),
    subCategoryID: zod_1.default.string().min(1, "Sub category is required"),
    stock: zod_1.default.number().min(0),
    isFeatured: zod_1.default.boolean().optional(),
    technicalSpecification: zod_1.default.object({
        performance: zod_1.default.object({
            series: zod_1.default.string().optional(),
            cpu: zod_1.default.string().optional(),
            graphics: zod_1.default.string().optional(),
            display: zod_1.default.string().optional(),
            operatingSystem: zod_1.default.string().optional(),
            brand: zod_1.default.string().optional(),
        }),
        memoryAndStorage: zod_1.default.object({
            mainMemory: zod_1.default.string().optional(),
            storage: zod_1.default.string().optional(),
            connectivity: zod_1.default.string().optional(),
            camera: zod_1.default.string().optional(),
            audio: zod_1.default.string().optional(),
            battery: zod_1.default.string().optional(),
            weight: zod_1.default.string().optional(),
            warranty: zod_1.default.string().optional(),
        }),
    }),
    specifications: zod_1.default.array(zod_1.default.object({ key: zod_1.default.string(), value: zod_1.default.string() })),
});
exports.removeProductSchema = zod_1.default.object({
    _id: zod_1.default.string(),
});
