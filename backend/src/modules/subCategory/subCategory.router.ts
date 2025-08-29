import { initServer } from "@ts-rest/express";
import { subCategoryContract } from "../../contract/subcategories/subcategory.contract";

import { subCategoryMutationHandler } from "../subCategory/subCategory.mutation";
import { SubCategoryQueryHandler } from "./subCategory.query";

const s = initServer();

export const subCategoryRouter = s.router(subCategoryContract, {
  createCategory: subCategoryMutationHandler.createSubCategory,
  updateSubCategoryDetailsByID:
    subCategoryMutationHandler.updateSubCategoryDetailsByID,
  removeSubCategoryByID: subCategoryMutationHandler.removeSubCategoryByID,
  getSubCategoriesByCategoryID: SubCategoryQueryHandler.getAllSubCategory,
});
