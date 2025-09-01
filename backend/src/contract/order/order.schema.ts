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