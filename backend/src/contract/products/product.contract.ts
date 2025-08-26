import { initContract } from "@ts-rest/core";

import z from "zod";
import { errorSchema, successSchema } from "../common.schema";
import { createProductSchema, removeProductSchema, updateProductDetailsSchema, getProductDetailsByID } from "./product.schema";

const c = initContract();

export const productContract = c.router({
    createProductSchema: {
        method: "POST",
        path: "/products/",
        body: createProductSchema,
        summary: "add a product",
        responses: {
            201: successSchema.extend({
                productID: z.string(),
            }),
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
    updateProductDetailsSchema: {
        method: "PUT",
        path: "/products/updateProductDetails/:productID",
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
     removeProductSchema: {
            method: "DELETE",
            path: "/product/:productID",
            body: removeProductSchema,
            summary: "Delete a product",
            responses: {
                200: successSchema,
                404: errorSchema,
                400: errorSchema,
                500: errorSchema,
            },
        },
});
