// contracts/comment.contract.ts
import { initContract } from "@ts-rest/core";
import { authContract } from "./auth/auth.contract";
import { productContract } from "./products/product.contract";
import { subCategoryContract } from "./subcategories/subcategory.contract";
import { categoryContract } from "./categories/category.contract";
import { usersContract } from "./users/users.contract";
import { emailContract } from "./email/email.contract";
import { orderContract } from "./order/order.contract";
import { contactContract } from "./contact/contact.contract";

const c = initContract();

export const contract = c.router({
  auth: authContract,
  user: usersContract,
  product: productContract,
  category: categoryContract,
  subCategory: subCategoryContract,
  email: emailContract,
  order: orderContract,
  contact: contactContract,
});
