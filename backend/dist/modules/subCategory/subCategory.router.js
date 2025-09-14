"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryRouter = void 0;
const express_1 = require("@ts-rest/express");
const subcategory_contract_1 = require("../../contract/subcategories/subcategory.contract");
const subCategory_mutation_1 = require("../subCategory/subCategory.mutation");
const subCategory_query_1 = require("./subCategory.query");
const s = (0, express_1.initServer)();
exports.subCategoryRouter = s.router(subcategory_contract_1.subCategoryContract, {
    createCategory: subCategory_mutation_1.subCategoryMutationHandler.createSubCategory,
    updateSubCategoryDetailsByID: subCategory_mutation_1.subCategoryMutationHandler.updateSubCategoryDetailsByID,
    removeSubCategoryByID: subCategory_mutation_1.subCategoryMutationHandler.removeSubCategoryByID,
    getSubCategoriesByCategoryID: subCategory_query_1.SubCategoryQueryHandler.getSubCategoriesByCategoryID,
});
