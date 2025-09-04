import { initServer } from "@ts-rest/express";

// import { categoryContract } from "../../contract/categories/category.contract";
import { orderContract } from "../../contract/order/order.contract";
import { orderMutationHandlers } from "./order.mutation";
import orderQueryHandlers from "./order.query";

// import { categoryMutationHandler } from "./category.mutation";
// import { categoryQueryHandler } from "./category.query";

const s = initServer();

export const orderRouter = s.router(orderContract, {
  createOrder: orderMutationHandlers.createOrder,
  getAllOrders: orderQueryHandlers.getAllOrders,
  getOrderDetailsById: orderQueryHandlers.getOrderDetailsById,
});
