import { initContract } from "@ts-rest/core";

import z from "zod";
import { errorSchema, successSchema } from "../common.schema";
import { createOrderSchema, deleteOrderByID, getAllOrderSchema, getOrderByIDSchema, updateOrderSchema } from "./order.schema";

const c = initContract();

export const orderContract = c.router({
  createOrder: {
    method: "POST",
    path: "/order/",
    body: createOrderSchema,
    summary: "add a order",
    responses: {
      201: successSchema,
      400: errorSchema,
      500: errorSchema,
    },
  },
  getOrderDetailsByID: {
    method: "GET",
    path: "/order/details/:orderID",
    pathParams: z.object({
      orderID: z.string().min(1, "Order ID is required"),
    }),
    summary: "get order details",
    responses: {
      200: getOrderByIDSchema,
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },
  getAllorder: {
    method: "GET",
    path: "/order/details",
    summary: "get all order details",
    responses: {
      200: getAllOrderSchema,
      500: errorSchema,
      404: errorSchema,
    },
  },
  updateOrderDetails: {
    method: "PUT",
    path: "/order/updateOrderDetails/:orderID",
    pathParams: z.object({
      orderID: z.string().min(1, "Order ID is required"),
    }),
    body: updateOrderSchema,
    summary: "Update order details details",
    responses: {
      200: successSchema,
      400: errorSchema,
      401: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },

  removeorder: {
    method: "DELETE",
    path: "/order/:orderID",
    body: deleteOrderByID,
    summary: "Delete a order",
    responses: {
      200: successSchema,
      404: errorSchema,
      400: errorSchema,
      500: errorSchema,
    },
  },
});
