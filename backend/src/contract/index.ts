// contracts/comment.contract.ts
import { initContract } from "@ts-rest/core";
import { authContract } from "./auth/auth.contract";
import { productContract } from "./products/product.contract";
import { subCategoryContract } from "./subcategories/subcategory.contract";
import { categoryContract } from "./categories/category.contract";
import { emailContract } from "./email/email.contract";

const c = initContract();

export const contract = c.router({
  auth: authContract,
  product: productContract,
  category: categoryContract,
  subCategory: subCategoryContract,
  email: emailContract,
});
