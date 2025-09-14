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
            return await this.productModel.findById(id).populate(["categoryID", "subCategoryID"]);
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
    async getAllProducts({ searchQuery, filters, } = {}) {
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
            // --- Search Query ---
            if (searchQuery?.trim()) {
                const searchRegex = new RegExp(searchQuery, "i");
                query.$or = [
                    { name: searchRegex },
                    { description: searchRegex },
                    { brand: searchRegex },
                ];
            }
            // Fetch products with populated category and subcategory
            const products = await product_model_1.default.find(query)
                .sort({ createdAt: -1 })
                .populate("categoryID", "name") // Populate only 'name' field
                .populate("subCategoryID", "name")
                .exec();
            // If searchQuery exists, also match against populated fields (category/subcategory name)
            const filteredProducts = searchQuery?.trim()
                ? products.filter((product) => {
                    const regex = new RegExp(searchQuery, "i");
                    return (regex.test(product?.categoryID?.name ?? "") ||
                        regex.test(product?.subCategoryID?.name ?? "") ||
                        regex.test(product.name) ||
                        regex.test(product.description) ||
                        regex.test(product.brand));
                })
                : products;
            // Format and return
            return filteredProducts.map((product) => ({
                _id: product._id.toString(),
                name: product.name,
                images: product.images ?? [],
                discountedPrice: product.discountedPrice,
                originalPrice: product.originalPrice,
                brand: product.brand ?? "",
                isFeatured: product.isFeatured,
                description: product.description ?? "",
                categoryID: product.categoryID ?? {},
                subCategoryID: product.subCategoryID ?? {},
                stock: product.stock ?? 0,
                technicalSpecification: product.technicalSpecification ?? undefined,
                specifications: product.specifications ?? undefined,
                createdAt: product.createdAt,
            }));
        }
        catch (error) {
            console.error("Failed to get products:", error);
            throw new Error("Failed to get products");
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
