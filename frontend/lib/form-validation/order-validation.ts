import { z } from "zod";

export const createOrderSchema = z.object({
  productID: z.string().min(1, "Product ID is required"),
  quantity: z.number().min(1, "Quantiry is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .transform((val) => val.trim().toLowerCase()),
  phone: z
    .string()
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^(98|97)\d{8}$/, "Phone number must start with 98 or 97"),
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
  ),
});

export const getAllOrderSchema = z.object({
  _id: z.string().min(1, "Order ID is required"),
  productID: z.string().min(1, "Product ID is required"),
  quantity: z.string().min(1, "Quantiry is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .transform((val) => val.trim().toLowerCase()),
  phone: z
    .string()
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^(98|97)\d{8}$/, "Phone number must start with 98 or 97"),
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
  ),
});

export const getOrderByIDSchema = z.object({
  productID: z.string().min(1, "Product ID is required"),
  quantity: z.string().min(1, "Quantiry is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .transform((val) => val.trim().toLowerCase()),
  phone: z
    .string()
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^(98|97)\d{8}$/, "Phone number must start with 98 or 97"),
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
  ),
});

export const updateOrderSchema = z.object({
  _id: z.string().min(1, "Order ID is required"),
  quantity: z.string().min(1, "Quantiry is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .transform((val) => val.trim().toLowerCase()),
  phone: z
    .string()
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^(98|97)\d{8}$/, "Phone number must start with 98 or 97"),
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
  ),
});


export const deleteOrderByID = z.object({
  orderID: z.string().min(1, "Order ID is required"),
});

export type TCreateOrderSchema = z.infer<typeof createOrderSchema>;
export type TUpdateOrderSchema = z.infer<typeof updateOrderSchema>;
export type TGetAllOrderSchema = z.infer<typeof getAllOrderSchema>;
export type TGetOrderByIDSchema = z.infer<typeof getOrderByIDSchema>;
export type TDeleteOrderSchema = z.infer<typeof deleteOrderByID>;
