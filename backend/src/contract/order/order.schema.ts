import { z } from "zod";

export const createOrderSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number too long"),
  address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  zip: z.string().min(1, "ZIP/Postal Code is required"),
  notes: z.string().optional(),
 preferredContact: z.preprocess(
  (val) => (val === "" ? undefined : val),
  z.enum(["phone", "whatsapp", "email"], {
    required_error: "Please select a contact method",
  })
)

});

export const getAllOrderSchema = z.object({
  _id: z.string().min(1, "Order ID is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number too long"),
  address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  zip: z.string().min(1, "ZIP/Postal Code is required"),
  notes: z.string().optional(),
 preferredContact: z.preprocess(
  (val) => (val === "" ? undefined : val),
  z.enum(["phone", "whatsapp", "email"], {
    required_error: "Please select a contact method",
  })
)

});

export const getOrderByIDSchema = z.object({
  _id: z.string().min(1, "Order ID is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number too long"),
  address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  zip: z.string().min(1, "ZIP/Postal Code is required"),
  notes: z.string().optional(),
 preferredContact: z.preprocess(
  (val) => (val === "" ? undefined : val),
  z.enum(["phone", "whatsapp", "email"], {
    required_error: "Please select a contact method",
  })
)

});

export const updateOrderSchema = z.object({
  _id: z.string().min(1, "Order ID is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number too long"),
  address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  zip: z.string().min(1, "ZIP/Postal Code is required"),
  notes: z.string().optional(),
 preferredContact: z.preprocess(
  (val) => (val === "" ? undefined : val),
  z.enum(["phone", "whatsapp", "email"], {
    required_error: "Please select a contact method",
  })
)

});

export const orderFormSchema = z.object({
  _id: z.string().min(1, "Order ID is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number too long"),
  address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  zip: z.string().min(1, "ZIP/Postal Code is required"),
  notes: z.string().optional(),
 preferredContact: z.preprocess(
  (val) => (val === "" ? undefined : val),
  z.enum(["phone", "whatsapp", "email"], {
    required_error: "Please select a contact method",
  })
)

});

export const deleteOrderByID = z.object({
  orderID: z.string().min(1, "Order ID is required"),
});
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
