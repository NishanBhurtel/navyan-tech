import apiClient from "../api";
import {
  TGetAllOrderSchema,
  TGetOrderByIDSchema,
} from "../form-validation/order-validation";


interface  PersonalInformation  {
  firstName: string; // 2-50 chars
  lastName: string;  // 2-50 chars
  email: string;
  phoneNumber: string;
}
interface  ShippingAddress  {
  streetAddress: string;
  city: string;
  state: string;
  zip: number;
}

interface  AdditionalInformation  {
  notes: string;
}
  
export interface TCreateOrderPayload{

  personalInformation: PersonalInformation
  shippingAddress: ShippingAddress;
  additionalInformation?: AdditionalInformation;
  preferredContactMethod: "phone" | "whatsapp" | "email";
  productID: string;
  quantity: number;
  totalPrice: number;
}


// POST /orders - Create new order
const createOrderApi = async (orderPayload: TCreateOrderPayload) => {
  const response = await apiClient.post("/order", orderPayload);
  return response.data;
};

// GET /orders - Get all orders (with filters/sorting)
const getAllOrderApi = async (filters?: Partial<TGetAllOrderSchema>) => {
  const response = await apiClient.get("/orders/admin", { params: filters });
  return response.data;
};

// GET /orders/:id - Get order details by ID
const getOrderByIdApi = async (orderId: TGetOrderByIDSchema["_id"]) => {
  const response = await apiClient.get(`/order/admin/${orderId}`);
  return response.data;
};

export const orderApi = {
  createOrderApi,
  getOrderByIdApi,
  getAllOrderApi,
};
