import { z } from "zod";

export const createOrderFormSchema = z.object({
  productID: z.string().min(1, "Product ID is required"),
  quantity: z.number().min(1, "Quantiry is required"),
  totalPrice: z.number().min(1, "Required"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters")
    .regex(/^[A-Za-z]+$/, "First name must contain only alphabets"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(3, "Last name must be at least 3 characters")
    .regex(/^[A-Za-z]+$/, "Last name must contain only alphabets"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .transform((val) => val.trim().toLowerCase()),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^(97|98)\d{8}$/, "Phone number must start with 97 or 98"),
  address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  zip: z.string().min(1, "ZIP/Postal Code is required"),
  notes: z.string(),
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
    totalPrice: z.number().min(1, "Required"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters")
    .regex(/^[A-Za-z]+$/, "First name must contain only alphabets"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(3, "Last name must be at least 3 characters")
    .regex(/^[A-Za-z]+$/, "Last name must contain only alphabets"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .transform((val) => val.trim().toLowerCase()),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^(97|98)\d{8}$/, "Phone number must start with 97 or 98"),
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
  _id: z.string().min(1, "Order ID is required"),
  productID: z.string().min(1, "Product ID is required"),
  quantity: z.string().min(1, "Quantiry is required"),
    totalPrice: z.number().min(1, "Required"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters")
    .regex(/^[A-Za-z]+$/, "First name must contain only alphabets"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(3, "Last name must be at least 3 characters")
    .regex(/^[A-Za-z]+$/, "Last name must contain only alphabets"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .transform((val) => val.trim().toLowerCase()),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^(97|98)\d{8}$/, "Phone number must start with 97 or 98"),
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


export type TCreateOrderFormSchema = z.infer<typeof createOrderFormSchema>;
export type TGetAllOrderSchema = z.infer<typeof getAllOrderSchema>;
export type TGetOrderByIDSchema = z.infer<typeof getOrderByIDSchema>;
