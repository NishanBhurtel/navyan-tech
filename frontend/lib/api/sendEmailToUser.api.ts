// src/api/contact.ts
import apiClient from "../api";
import { TAdminEmailFormSchema } from "../form-validation/sendEmailToUser.validation";

// POST / contact - Create new order
const adminEmailFormApi = async (orderPayload: TAdminEmailFormSchema) => {
  const response = await apiClient.post("/email/send", orderPayload);
  return response.data;
};

export const adminEmailApi = {
  adminEmailFormApi
};