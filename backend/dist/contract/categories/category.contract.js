"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryContract = void 0;
const core_1 = require("@ts-rest/core");
const zod_1 = __importDefault(require("zod"));
const common_schema_1 = require("../common.schema");
const category_schema_1 = require("./category.schema");
const c = (0, core_1.initContract)();
exports.categoryContract = c.router({
    createCategory: {
        method: "POST",
        path: "/categories/",
        body: category_schema_1.createCategorySchema,
        summary: "add a category",
        responses: {
            201: common_schema_1.successSchema.extend({
                categoryID: zod_1.default.string(),
            }),
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getAllCategory: {
        method: "GET",
        path: "/categories/details",
        summary: "get category details",
        responses: {
            200: category_schema_1.getAllCategorySchema,
            400: common_schema_1.errorSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    updateCategoryDetailsByID: {
        method: "PUT",
        path: "/categories/updatecategoryDetails/:categoryID",
        body: category_schema_1.updateCategoryDetailsSchema,
        summary: "Update category details",
        responses: {
            200: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            401: common_schema_1.errorSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    removeCategoryByID: {
        method: "DELETE",
        path: "/categories/:categoryID",
        body: category_schema_1.removeCategorySchema,
        summary: "Delete a category",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
});
