import { initContract } from "@ts-rest/core";

import z from "zod";
import { errorSchema, successSchema } from "../common.schema";
import {
  createSubCategorySchema,
  getAllSubCategorySchema,
  removeSubCategorySchema,
  updateSubCategoryDetailsSchema,
} from "./subcategory.schema";

const c = initContract();

export const subCategoryContract = c.router({
  createCategory: {
    method: "POST",
    path: "/subcategories/",
    body: createSubCategorySchema,
    summary: "add a subcategory",
    responses: {
      201: successSchema.extend({
        subcategoryID: z.string(),
      }),
      400: errorSchema,
      500: errorSchema,
    },
  },
  getSubCategoriesByCategoryID: {
    method: "GET",
    path: "/subcategories/details",
    summary: "get subcategory details",
    responses: {
      200: getAllSubCategorySchema,
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },
  updateSubCategoryDetailsByID: {
    method: "PUT",
    path: "/subcategories/updatesubcategoryDetails/:subcategoryID",
    pathParams: z.object({
      subcategoryID: z.string().min(1, "SubCategory ID is required"),
    }),
    body: updateSubCategoryDetailsSchema,
    summary: "Update subcategory details",
    responses: {
      200: successSchema,
      400: errorSchema,
      401: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },
  removeSubCategoryByID: {
    method: "DELETE",
    path: "/subcategories/:subcategoryID",
    body: removeSubCategorySchema,
    summary: "Delete a subcategory",
    responses: {
      200: successSchema,
      404: errorSchema,
      400: errorSchema,
      500: errorSchema,
    },
  },
});
