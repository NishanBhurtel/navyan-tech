"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("@ts-rest/express");
const category_contract_1 = require("../../contract/categories/category.contract");
const category_mutation_1 = require("./category.mutation");
const category_query_1 = require("./category.query");
const s = (0, express_1.initServer)();
exports.categoryRouter = s.router(category_contract_1.categoryContract, {
    createCategory: category_mutation_1.categoryMutationHandler.createCategory,
    updateCategoryDetailsByID: category_mutation_1.categoryMutationHandler.updateCategoryDetailsByID,
    removeCategoryByID: category_mutation_1.categoryMutationHandler.removeCategoryByID,
    getAllCategory: category_query_1.categoryQueryHandler.getAllCategoryMutation,
});
