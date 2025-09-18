// src/api/contact.ts
import apiClient from "../api";
import { TContactFormSchema } from "../form-validation/contact.validation";

// POST / contact - Create new order
const contactFormApi = async (orderPayload: TContactFormSchema) => {
  const response = await apiClient.post("/api/contact", orderPayload);
  return response.data;
};

export const contactApi = {
  contactFormApi
};

