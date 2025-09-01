import apiClient from "../api";
import {
  TCreateOrderSchema,
  TDeleteOrderSchema,
  TGetAllOrderSchema,
  TGetOrderByIDSchema,
  TUpdateOrderSchema,
} from "../form-validation/order-validation";

// POST /orders - Create new order
const createOrderApi = async (orderPayload: TCreateOrderSchema) => {
  const response = await apiClient.post("/order", orderPayload);
  return response.data;
};

// PUT /orders/:id - Update order details
const updateOrderApi = async (
  orderId: string,
  updatePayload: TUpdateOrderSchema
) => {
  const response = await apiClient.put(`/order/updateOrderDetails/${orderId}`, updatePayload);
  return response.data;
};

// GET /orders - Get all orders (with filters/sorting)
const getAllOrderApi = async (filters?: Partial<TGetAllOrderSchema>) => {
  const response = await apiClient.get("/order", { params: filters });
  return response.data;
};

// GET /orders/:id - Get order details by ID
const getOrderByIdApi = async (orderId: TGetOrderByIDSchema["_id"]) => {
  const response = await apiClient.get(`/order/details/${orderId}`);
  return response.data;
};

// DELETE /orders/:id - Delete order
const deleteOrderApi = async (orderId: TDeleteOrderSchema["orderID"]) => {
  const response = await apiClient.delete(`/order/${orderId}`);
  return response.data;
};

export const orderApi = {
  createOrderApi,
  updateOrderApi,
  getOrderByIdApi,
  getAllOrderApi,
  deleteOrderApi,
};
