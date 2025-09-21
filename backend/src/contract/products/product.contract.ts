import { initContract } from "@ts-rest/core";

import z from "zod";
import { errorSchema, successSchema } from "../common.schema";
import {
  createProductSchema,
  removeProductSchema,
  updateProductDetailsSchema,
  getProductDetailsByID,
  getAllProductSchema,
} from "./product.schema";

const c = initContract();

export const productContract = c.router({
  createProduct: {
    method: "POST",
    path: "/products/",
    body: createProductSchema,
    summary: "add a product",
    responses: {
      201: successSchema,
      400: errorSchema,
      500: errorSchema,
    },
  },
  getProductDetailsByID: {
    method: "GET",
    path: "/products/details/:productID",
    pathParams: z.object({
      productID: z.string().min(1, "Product ID is required"),
    }),
    summary: "get product details",
    responses: {
      200: getProductDetailsByID,
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },
  getAllProduct: {
    method: "GET",
    path: "/products",
    summary: "get all product details",
    query:z.object({
      search:z.string().optional(),
      filter:z.object({
        brand:z.string().optional(),
        minPrice: z.coerce.number().optional(),
        maxPrice: z.coerce.number().optional(),
        categoryID:z.string().optional(),
        subCategoryID:z.string().optional(),
      }).optional(),
      limit:z.coerce.number().min(1).max(100).default(10).optional(),
      page:z.coerce.number().min(1).default(1).optional(),

    }),
    responses: {
      200: getAllProductSchema,
      500: errorSchema,
      404: errorSchema,
    },
  },
  updateProductDetails: {
    method: "PUT",
    path: "/products/:productID",
    pathParams: z.object({
      productID: z.string().min(1, "Product ID is required"),
    }),
    body: updateProductDetailsSchema,
    summary: "Update product details details",
    responses: {
      200: successSchema,
      400: errorSchema,
      401: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },

  removeProduct: {
    method: "DELETE",
    path: "/product/:productID",
    body: z.object({}),
    summary: "Delete a product",
    responses: {
      200: successSchema,
      404: errorSchema,
      400: errorSchema,
      500: errorSchema,
    },
  },
});
