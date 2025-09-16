import { initServer } from "@ts-rest/express";
import { contract } from "../contract";
import { authRouter } from "./auth/auth.router";
import { productRouter } from "./product/product.router";
import { subCategoryRouter } from "../modules/subCategory/subCategory.router";
import { categoryRouter } from "./category/category.router";
import { userRouter } from "./users/user.router";
import { emailRouter } from "./email/email.router";
import { orderRouter } from "./order/order.router";

const s = initServer();

export const router = s.router(contract, {
  user:userRouter,
  auth: authRouter,
  product: productRouter,
  subCategory: subCategoryRouter,
  category: categoryRouter,
  email: emailRouter,
  order: orderRouter,
});
