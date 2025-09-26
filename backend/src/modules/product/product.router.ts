import { initServer } from "@ts-rest/express";

import { productContract } from "../../contract/products/product.contract";

import { productMutationHandler } from "./product.mutation";
import { productQueryHandler } from "./product.query";
import { retrieveUserFromTokenMiddleware } from "../../middleware/retrieveUserFromToken.middleware";

const s = initServer();

export const productRouter = s.router(productContract, {
  createProduct: productMutationHandler.createProduct,
  updateProductDetails: productMutationHandler.updateProductDetails,
  removeProduct: productMutationHandler.removeProduct,
  getProductDetailsByID: productQueryHandler.getProductDetailsByID,
  getAllProduct: {
    middleware: [
      (req, res, next) => retrieveUserFromTokenMiddleware(req, res, next),
    ],
    handler: productQueryHandler.getALLProduct,
  },
  updateProductStatus: productMutationHandler.updateProductStatus,
});
