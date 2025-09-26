"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productMutationHandler = exports.removeProduct = exports.updateProductDetails = exports.updateProductStatus = exports.createProduct = void 0;
const product_repository_1 = __importDefault(require("../../repository/mongodb/product/product.repository"));
const createProduct = async ({ req, res }) => {
    try {
        const { name, images, discountedPrice, originalPrice, brand, isFeatured, isActive, categoryID, subCategoryID, description, stock, specifications, technicalSpecification, } = req.body;
        const { performance: { series = "", cpu = "", graphics = "", display = "", operatingSystem = "", } = {}, memoryAndStorage: { mainMemory = "", storage = "", connectivity = "", camera = "", audio = "", battery = "", weight = "", warranty = "", } = {}, } = technicalSpecification || {};
        const newProduct = await product_repository_1.default.save({
            name,
            originalPrice,
            discountedPrice,
            stock,
            description: description,
            categoryID: categoryID,
            subCategoryID: subCategoryID,
            brand: brand,
            isFeatured: !!isFeatured,
            isActive: !!isActive,
            images: images,
            technicalSpecification: {
                performance: {
                    series,
                    cpu,
                    graphics,
                    display,
                    operatingSystem,
                },
                memoryAndStorage: {
                    mainMemory,
                    storage,
                    connectivity,
                    camera,
                    audio,
                    battery,
                    weight,
                    warranty,
                },
            },
            specifications: specifications || []
        });
        return {
            status: 201,
            body: {
                success: true,
                message: "Product created successfully",
                data: newProduct,
            },
        };
    }
    catch (error) {
        console.error("Error creating product:", error);
        return {
            status: 500,
            body: {
                success: false,
                message: "Failed to create product",
                error: error.message,
            },
        };
    }
};
exports.createProduct = createProduct;
const updateProductStatus = async ({ req }) => {
    try {
        const { productID } = req.params;
        const { isActive } = req.body;
        const productExist = await product_repository_1.default.getByID(productID);
        if (!productExist) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Product not found",
                },
            };
        }
        await product_repository_1.default.updateProduct(productID, { isActive });
        return {
            status: 200,
            body: {
                success: true,
                message: "Successfully updated product status",
            },
        };
    }
    catch (error) {
        return {
            status: 500,
            body: {
                success: false,
                message: "Failed to update product status",
                error: error.message,
            },
        };
    }
};
exports.updateProductStatus = updateProductStatus;
const updateProductDetails = async ({ req }) => {
    try {
        const { productID } = req.params;
        const { name, images, discountedPrice, originalPrice, brand, isFeatured, isActive, stock, description, categoryID, specifications, technicalSpecification, // ✅ expect nested object
         } = req.body;
        // ✅ safely destructure nested fields
        const { performance: { series = "", cpu = "", graphics = "", display = "", operatingSystem = "", } = {}, memoryAndStorage: { mainMemory = "", storage = "", connectivity = "", camera = "", audio = "", battery = "", weight = "", warranty = "", } = {}, } = technicalSpecification || {};
        const updatedProduct = await product_repository_1.default.updateProduct(productID, {
            name,
            originalPrice,
            discountedPrice,
            stock,
            description: description,
            brand,
            isFeatured,
            isActive,
            images: images,
            technicalSpecification: {
                performance: {
                    series,
                    cpu,
                    graphics,
                    display,
                    operatingSystem,
                },
                memoryAndStorage: {
                    mainMemory,
                    storage,
                    connectivity,
                    camera,
                    audio,
                    battery,
                    weight,
                    warranty,
                },
            },
            specifications: specifications,
            categoryID,
        });
        if (!updatedProduct) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Product not found",
                },
            };
        }
        return {
            status: 200,
            body: {
                success: true,
                message: "Successfully updated product details",
                data: updatedProduct,
            },
        };
    }
    catch (error) {
        return {
            status: 500,
            body: {
                success: false,
                message: "Failed to update product details",
                error: error.message,
            },
        };
    }
};
exports.updateProductDetails = updateProductDetails;
const removeProduct = async ({ req }) => {
    try {
        const { productID } = req.params;
        const deletedProduct = await product_repository_1.default.delete(productID);
        if (!deletedProduct) {
            return {
                status: 404,
                body: {
                    success: false,
                    message: "Product not found",
                    error: "Product with this ID does not exist",
                },
            };
        }
        return {
            status: 200,
            body: {
                success: true,
                message: "Product deleted successfully",
            },
        };
    }
    catch (error) {
        return {
            status: 500,
            body: {
                success: false,
                message: "Failed to delete product",
                error: error.message,
            },
        };
    }
};
exports.removeProduct = removeProduct;
exports.productMutationHandler = {
    createProduct: exports.createProduct,
    updateProductDetails: exports.updateProductDetails,
    removeProduct: exports.removeProduct,
    updateProductStatus: exports.updateProductStatus,
};
