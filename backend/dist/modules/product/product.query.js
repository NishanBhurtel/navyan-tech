"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productQueryHandler = void 0;
const product_repository_1 = __importDefault(require("../../repository/mangodb/product/product.repository"));
const getProductDetailsByID = async ({ req }) => {
    try {
        const { productID } = req.params;
        if (!productID) {
            return {
                status: 400,
                body: {
                    success: false,
                    error: "product id is required",
                },
            };
        }
        const product = await product_repository_1.default.getByID(productID);
        if (!product) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "product not found",
                },
            };
        }
        return {
            status: 200,
            body: {
                success: true,
                data: {
                    _id: product._id.toString(),
                    name: product.name,
                    images: product.images ?? [],
                    price: product.discountedPrice,
                    originalPrice: product.originalPrice,
                    discountedPrice: product.discountedPrice,
                    brand: product.brand ?? "",
                    isFeatured: product.isFeatured,
                    description: product.description ?? "",
                    categoryID: product.categoryID ?? "",
                    subCategoryID: product.subCategoryID ?? "",
                    stock: product.stock ?? 0,
                    technicalSpecification: product.technicalSpecification ?? undefined,
                    specifications: product.specifications ?? undefined,
                    createdAt: product.createdAt,
                },
            },
        };
    }
    catch (error) {
        console.error("Error in getProductDetailsByID:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Failed to get the product details",
            },
        };
    }
};
const getALLProduct = async ({ query }) => {
    try {
        const products = await product_repository_1.default.getAllProducts({
            searchQuery: query.search,
            filters: {
                brand: query.filter?.brand,
                categoryID: query.filter?.categoryID,
                maxPrice: query.filter?.maxPrice,
                minPrice: query.filter?.minPrice,
                subCategoryID: query.filter?.subCategoryID
            }
        });
        const formattedProducts = products.map((product) => ({
            _id: product._id.toString(),
            name: product.name,
            images: product.images ?? [],
            discountedPrice: product.discountedPrice,
            originalPrice: product.originalPrice,
            brand: product.brand ?? "",
            isFeatured: product.isFeatured,
            description: product.description ?? "",
            categoryID: product.categoryID,
            subCategoryID: product.subCategoryID,
            stock: product.stock ?? 0,
            specifications: product.specifications ?? [],
            technicalSpecification: product.technicalSpecification ?? undefined,
            createdAt: product.createdAt,
        }));
        return {
            status: 200,
            body: formattedProducts,
        };
    }
    catch (error) {
        return {
            status: 500,
            body: {
                success: false,
                error: "Failed to get all products",
            },
        };
    }
};
exports.productQueryHandler = {
    getProductDetailsByID,
    getALLProduct,
};
