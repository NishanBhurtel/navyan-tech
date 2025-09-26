"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../../../models/product.model"));
class ProductRepository {
    productModel;
    constructor() {
        this.productModel = product_model_1.default;
    }
    // ✅ Save new product
    async save(productData) {
        try {
            const product = new this.productModel({
                name: productData.name || "",
                price: productData.discountedPrice || 0,
                originalPrice: productData.originalPrice || 0,
                discountedPrice: productData.discountedPrice || 0,
                stock: productData.stock || 0,
                description: productData.description || "",
                brand: productData.brand || "",
                isFeatured: productData.isFeatured || false,
                isActive: productData.isActive || false,
                images: productData.images || [],
                technicalSpecification: {
                    performance: {
                        series: productData.technicalSpecification?.performance?.series || "",
                        cpu: productData.technicalSpecification?.performance?.cpu || "",
                        graphics: productData.technicalSpecification?.performance?.graphics || "",
                        display: productData.technicalSpecification?.performance?.display || "",
                        operatingSystem: productData.technicalSpecification?.performance
                            ?.operatingSystem || "",
                    },
                    memoryAndStorage: {
                        audio: productData.technicalSpecification?.memoryAndStorage?.audio || "",
                        mainMemory: productData.technicalSpecification?.memoryAndStorage
                            ?.mainMemory || "",
                        storage: productData.technicalSpecification?.memoryAndStorage?.storage ||
                            "",
                        connectivity: productData.technicalSpecification?.memoryAndStorage
                            ?.connectivity || "",
                        camera: productData.technicalSpecification?.memoryAndStorage?.camera ||
                            "",
                        battery: productData.technicalSpecification?.memoryAndStorage?.battery ||
                            "",
                        weight: productData.technicalSpecification?.memoryAndStorage?.weight ||
                            "",
                        warranty: productData.technicalSpecification?.memoryAndStorage?.warranty ||
                            "",
                    },
                },
                specifications: productData.specifications || {},
                categoryID: productData.categoryID || "",
                subCategoryID: productData.subCategoryID || "",
            });
            const savedProduct = await product.save();
            return {
                success: true,
                productID: savedProduct._id.toString(),
                message: "Product saved successfully",
                data: savedProduct,
            };
        }
        catch (error) {
            throw new Error(`${error.message || "Failed to save product in database"}`);
        }
    }
    // ✅ Get by ID
    async getByID(id) {
        try {
            return await this.productModel
                .findById(id)
                .populate(["categoryID", "subCategoryID"]);
        }
        catch (error) {
            throw new Error(`Error fetching product by ID: ${error}`);
        }
    }
    updateProduct = async (productId, productData) => {
        try {
            const updatedProduct = await this.productModel.findByIdAndUpdate(productId, { $set: productData }, { new: true, runValidators: true });
            return updatedProduct;
        }
        catch (error) {
            throw new Error("Error updating product: " + error.message);
        }
    };
    async getAllProducts({ searchQuery, filters, skip = 0, limit = 9, displayInactive = false, } = {}) {
        try {
            const query = {};
            // --- Price Filter ---
            if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
                query.discountedPrice = {};
                if (filters.minPrice !== undefined) {
                    query.discountedPrice.$gte = filters.minPrice;
                }
                if (filters.maxPrice !== undefined) {
                    query.discountedPrice.$lte = filters.maxPrice;
                }
            }
            // --- Brand Filter ---
            if (filters?.brand) {
                query.brand = { $regex: new RegExp(filters.brand, "i") };
            }
            // --- Category Filter ---
            if (filters?.categoryID) {
                query.categoryID = filters.categoryID;
            }
            // --- SubCategory Filter ---
            if (filters?.subCategoryID) {
                query.subCategoryID = filters.subCategoryID;
            }
            // --- Active Status Filter ---
            if (displayInactive) {
                query.isActive = { $in: [true, false] }; // show all
            }
            else {
                query.isActive = true; // only active products
            }
            // --- Search Query ---
            if (searchQuery?.trim()) {
                const searchRegex = new RegExp(searchQuery, "i");
                query.$or = [
                    { name: searchRegex },
                    { description: searchRegex },
                    { brand: searchRegex },
                ];
            }
            // --- Count total products for pagination ---
            const total = await product_model_1.default.countDocuments(query);
            // --- Fetch products with pagination ---
            const products = await product_model_1.default.find(query)
                .sort({ createdAt: -1 })
                .skip(skip) // ✅ apply skip
                .limit(limit) // ✅ apply limit
                .populate("categoryID", "name")
                .populate("subCategoryID", "name")
                .exec();
            // --- Format response ---
            const formattedProducts = products.map((product) => ({
                _id: product._id.toString(),
                name: product.name,
                images: product.images ?? [],
                discountedPrice: product.discountedPrice,
                originalPrice: product.originalPrice,
                brand: product.brand ?? "",
                isFeatured: product.isFeatured,
                isActive: product.isActive,
                description: product.description ?? "",
                categoryID: product.categoryID ?? {},
                subCategoryID: product.subCategoryID ?? {},
                stock: product.stock ?? 0,
                technicalSpecification: product.technicalSpecification ?? undefined,
                specifications: product.specifications ?? undefined,
                createdAt: product.createdAt,
            }));
            return { products: formattedProducts, total };
        }
        catch (error) {
            console.error("Failed to get products:", error);
            throw new Error("Failed to get products");
        }
    }
    async countProducts({ categoryID, countInActive = false, }) {
        try {
            const query = {};
            if (categoryID) {
                query.categoryID = categoryID;
            }
            if (!countInActive) {
                query.isActive = true;
            }
            return await product_model_1.default.countDocuments(query);
        }
        catch (error) {
            throw new Error(`Error counting products by category: ${error}`);
        }
    }
    // ✅ Delete product
    async delete(id) {
        try {
            return await this.productModel.findByIdAndDelete(id);
        }
        catch (error) {
            throw new Error(`Error deleting product: ${error}`);
        }
    }
    async getAll() {
        return this.productModel.find().populate("categoryID");
    }
}
exports.default = new ProductRepository();
