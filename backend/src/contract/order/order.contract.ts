import { initContract } from "@ts-rest/core";
import {
  getAllOrdersSchema,
  createOrderSchema,
} from "./order.schema";
import { errorSchema, successSchema } from "../common.schema";

const c = initContract();

export const orderContract = c.router({
  createOrder: {
    method: "POST",
    path: "/order",
    body: createOrderSchema,
    summary: "Create a order",
    responses: {
      200: successSchema,
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },

  getAllOrders: {
    method: "GET",
    path: "/orders/admin",
    responses: {
      200: getAllOrdersSchema,
      500: errorSchema,
      404: errorSchema,
      400: errorSchema,
    },
    summary: "Get all orders for admin",
  },
});
