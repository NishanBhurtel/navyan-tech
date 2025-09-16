"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("@ts-rest/express");
const product_contract_1 = require("../../contract/products/product.contract");
const product_mutation_1 = require("./product.mutation");
const product_query_1 = require("./product.query");
const s = (0, express_1.initServer)();
exports.productRouter = s.router(product_contract_1.productContract, {
    createProduct: product_mutation_1.productMutationHandler.createProduct,
    updateProductDetails: product_mutation_1.productMutationHandler.updateProductDetails,
    removeProduct: product_mutation_1.productMutationHandler.removeProduct,
    getProductDetailsByID: product_query_1.productQueryHandler.getProductDetailsByID,
    getAllProduct: product_query_1.productQueryHandler.getALLProduct,
});
