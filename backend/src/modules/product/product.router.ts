import { initServer } from "@ts-rest/express";

import { productContract } from "../../contract/products/product.contract";

import { productMutationHandler } from "./product.mutation";
import { productQueryHandler } from "./product.query";

const s = initServer();

export const productRouter = s.router(productContract, {
  createProduct: productMutationHandler.createProduct,
  updateProductDetails: productMutationHandler.updateProductDetails,
  removeProduct: productMutationHandler.removeProduct,
  getProductDetailsByID: productQueryHandler.getProductDetailsByID,
  getAllProduct: productQueryHandler.getALLProduct,
});
