import { initServer } from "@ts-rest/express";
import { contract } from "../contract";
import { authRouter } from "./auth/auth.router";
import { productRouter } from "./product/product.router";
import { subCategoryRouter } from "../modules/subCategory/subCategory.router";
import { categoryRouter } from "./category/category.router";

const s = initServer();

export const router = s.router(contract, {
  auth: authRouter,
  product: productRouter,
  subCategory: subCategoryRouter,
  category: categoryRouter,
});
