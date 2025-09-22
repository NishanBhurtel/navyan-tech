// src/api/contact.ts
import apiClient from "../api";

interface TEmailToOrderedUser {
  streetAddress: string;
  email: string;
  subject: string;
  text: string;
}

// POST / contact - Create new order
const emailToOrderedUserApi = async (orderPayload: TEmailToOrderedUser) => {
  const response = await apiClient.post(
    "/api/emailToOrderedUser",
    orderPayload
  );
  return response.data;
};

export const emailApi = {
  emailToOrderedUserApi,
};
