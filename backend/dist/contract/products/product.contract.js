"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productContract = void 0;
const core_1 = require("@ts-rest/core");
const zod_1 = __importDefault(require("zod"));
const common_schema_1 = require("../common.schema");
const product_schema_1 = require("./product.schema");
const c = (0, core_1.initContract)();
exports.productContract = c.router({
    createProduct: {
        method: "POST",
        path: "/products/",
        body: product_schema_1.createProductSchema,
        summary: "add a product",
        responses: {
            201: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getProductDetailsByID: {
        method: "GET",
        path: "/products/details/:productID",
        pathParams: zod_1.default.object({
            productID: zod_1.default.string().min(1, "Product ID is required"),
        }),
        summary: "get product details",
        responses: {
            200: product_schema_1.getProductDetailsByID,
            400: common_schema_1.errorSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getAllProduct: {
        method: "GET",
        path: "/products",
        summary: "get all product details",
        query: zod_1.default.object({
            search: zod_1.default.string().optional(),
            filter: zod_1.default.object({
                brand: zod_1.default.string().optional(),
                minPrice: zod_1.default.coerce.number().optional(),
                maxPrice: zod_1.default.coerce.number().optional(),
                categoryID: zod_1.default.string().optional(),
                subCategoryID: zod_1.default.string().optional()
            }).optional()
        }),
        responses: {
            200: product_schema_1.getAllProductSchema,
            500: common_schema_1.errorSchema,
            404: common_schema_1.errorSchema,
        },
    },
    updateProductDetails: {
        method: "PUT",
        path: "/products/:productID",
        pathParams: zod_1.default.object({
            productID: zod_1.default.string().min(1, "Product ID is required"),
        }),
        body: product_schema_1.updateProductDetailsSchema,
        summary: "Update product details details",
        responses: {
            200: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            401: common_schema_1.errorSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    removeProduct: {
        method: "DELETE",
        path: "/product/:productID",
        body: zod_1.default.object({}),
        summary: "Delete a product",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
});
