import { z } from "zod";

export const ContactMethodSchema = z.enum(["phone", "whatsapp", "email"]);

export const PersonalInformationSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phoneNumber: z.string(),
});

export const ShippingAddressSchema = z.object({
  streetAddress: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.number(),
});

export const AdditionalInformationSchema = z.object({
  notes: z.string().max(500).optional(),
});

export const OrderSchema = z.object({
  personalInformation: PersonalInformationSchema,
  shippingAddress: ShippingAddressSchema,
  additionalInformation: AdditionalInformationSchema.optional(),
  preferredContactMethod: ContactMethodSchema,
  productId: z.string().nonempty(),
  quantity: z.number(),
});

export const PreferredContactMethodSchema = z.object({
  method: ContactMethodSchema,
});

export const getAllOrdersResponse = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      customer: z.string(),
      email: z.string().email(),
      phoneNumber: z.string(),
      address: z.string(),
      productName: z.string(),
      amount: z.number(),
      quantity: z.number(),
    })
  ),
});

export const getOrderDetailsByIdSchema = z.object({
  success: z.boolean(),
  customer: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  address: z.string(),
  preferredContactMethod: ContactMethodSchema,
  productName: z.string(),
  quantity: z.number(),
  amount: z.number(),
  createdAt: z.string(),
});
