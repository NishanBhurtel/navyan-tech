"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryContract = void 0;
const core_1 = require("@ts-rest/core");
const zod_1 = __importDefault(require("zod"));
const common_schema_1 = require("../common.schema");
const subcategory_schema_1 = require("./subcategory.schema");
const c = (0, core_1.initContract)();
exports.subCategoryContract = c.router({
    createCategory: {
        method: "POST",
        path: "/subcategories/",
        body: subcategory_schema_1.createSubCategorySchema,
        summary: "add a subcategory",
        responses: {
            201: common_schema_1.successSchema.extend({
                subcategoryID: zod_1.default.string(),
            }),
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getSubCategoriesByCategoryID: {
        method: "GET",
        path: "/subcategories/:categoryID",
        summary: "get subcategories from categoryID ",
        responses: {
            200: subcategory_schema_1.getAllSubCategorySchema,
            400: common_schema_1.errorSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    updateSubCategoryDetailsByID: {
        method: "PUT",
        path: "/subcategories/updatesubcategoryDetails/:subcategoryID",
        pathParams: zod_1.default.object({
            subcategoryID: zod_1.default.string().min(1, "SubCategory ID is required"),
        }),
        body: subcategory_schema_1.updateSubCategoryDetailsSchema,
        summary: "Update subcategory details",
        responses: {
            200: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            401: common_schema_1.errorSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    removeSubCategoryByID: {
        method: "DELETE",
        path: "/subcategories/:subcategoryID",
        body: zod_1.default.object({}),
        summary: "Delete a subcategory",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
});
