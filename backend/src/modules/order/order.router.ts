import { initServer } from "@ts-rest/express";

import { orderContract } from "../../contract/order/order.contract";
import { orderMutationHandlers } from "./order.mutation";
import orderQueryHandlers from "./order.query";


const s = initServer();

export const orderRouter = s.router(orderContract, {
  createOrder: orderMutationHandlers.createOrder,
  getAllOrders: orderQueryHandlers.getAllOrders,
});
