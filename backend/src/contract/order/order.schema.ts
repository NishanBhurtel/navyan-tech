import { z } from "zod";

export const contactMethodSchema = z.enum(["phone", "whatsapp", "email"]);

export const personalInformationSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phoneNumber: z.string(),
});

export const shippingAddressSchema = z.object({
  streetAddress: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.number(),
});

export const additionalInformationSchema = z.object({
  notes: z.string().max(500).optional(),
});

export const createOrderSchema = z.object({
  personalInformation: personalInformationSchema,
  shippingAddress: shippingAddressSchema,
  additionalInformation: additionalInformationSchema.optional(),
  preferredContactMethod: contactMethodSchema,
  productID: z.string().min(1, "Product ID is required"),
  quantity: z.number().min(1, "Quantity is required"),
  totalPrice: z.number().min(1, "Total Price is required"),
});

export const preferredContactMethodSchema = z.object({
  method: contactMethodSchema,
});

export const getAllOrdersSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      customer: z.string(),
      email: z.string().email(),
      phoneNumber: z.string(),
      address: z.string(),
      amount: z.number(),
      quantity: z.number(),
      createdAt: z.string(),
      notes: z.string(),
    })
  ),
});
