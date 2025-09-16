import { initServer } from "@ts-rest/express";

import { categoryContract } from "../../contract/categories/category.contract";

import { categoryMutationHandler } from "./category.mutation";
import { categoryQueryHandler } from "./category.query";

const s = initServer();

export const categoryRouter = s.router(categoryContract, {
  createCategory: categoryMutationHandler.createCategory,
  updateCategoryDetailsByID: categoryMutationHandler.updateCategoryDetailsByID,
  removeCategoryByID: categoryMutationHandler.removeCategoryByID,
  getAllCategory: categoryQueryHandler.getAllCategoryMutation,
});
