import { initContract } from "@ts-rest/core";

import z from "zod";
import { errorSchema, successSchema } from "../common.schema";
import {
  createCategorySchema,
  getAllCategorySchema,
  removeCategorySchema,
  updateCategoryDetailsSchema,
} from "./category.schema";

const c = initContract();

export const categoryContract = c.router({
  createCategory: {
    method: "POST",
    path: "/categories/",
    body: createCategorySchema,
    summary: "add a category",
    responses: {
      201: successSchema.extend({
        categoryID: z.string(),
      }),
      400: errorSchema,
      500: errorSchema,
    },
  },
  getAllCategory: {
    method: "GET",
    path: "/categories/details",
    summary: "get category details",
    responses: {
      200: getAllCategorySchema,
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },
  updateCategoryDetailsByID: {
    method: "PUT",
    path: "/categories/updatecategoryDetails/:categoryID",
    body: z.object({
      name: z.string(),
      description: z.string(),
    }),
    summary: "Update category details",
    responses: {
      200: successSchema,
      400: errorSchema,
      401: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },
  removeCategoryByID: {
    method: "DELETE",
    path: "/categories/:categoryID",
    body: removeCategorySchema,
    summary: "Delete a category",
    responses: {
      200: successSchema,
      404: errorSchema,
      400: errorSchema,
      500: errorSchema,
    },
  },
});
