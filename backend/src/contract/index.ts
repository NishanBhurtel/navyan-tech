// contracts/comment.contract.ts
import { initContract } from "@ts-rest/core";
import { authContract } from "./auth/auth.contract";
import { productContract } from "./products/product.contract";
import { subCategoryContract } from "./subcategories/subcategory.contract";
// import { commentContract } from "./comment/comment.contract";
// import { packageContract } from "./package/package.contract";
// import { fileContract } from "./file/file.contract";
// import { authContract } from "./auth/auth.contract";
// import { projectContract } from "./project/project.contract";
// import { publisherContract } from "./publisher/publisher.contract";
// import { paymentContract } from "./payment/payment.contract";
// import { notificationContract } from "./notification/notification.contract";

const c = initContract();

export const contract = c.router({
  auth: authContract,
  product: productContract,
  subCategory: subCategoryContract,
});
