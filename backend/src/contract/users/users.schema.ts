import { z } from "zod";

export const getAllUsersSchema = z.array(
  z.object({
    _id: z.string().min(1, "User ID is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email")
      .transform((val) => val.trim().toLowerCase()),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be exactly 10 digits")
      .max(10, "Phone number must be exactly 10 digits")
      .regex(/^(98|97)\d{8}$/, "Phone number must start with 98 or 97"),

    role: z.string().min(1, "Role is required"),
    createdAt: z.date(),
  })
);

export const getUserByIDSchema = z.object({
  _id: z.string().min(1, "User ID is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .transform((val) => val.trim().toLowerCase()),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^(98|97)\d{8}$/, "Phone number must start with 98 or 97"),

  createdAt: z.date(),
});

export const updateUserByIDSchema = z.object({
  _id: z.string().min(1, "User ID is reequired"),
  userName: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  }),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .transform((val) => val.trim().toLowerCase()),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^(98|97)\d{8}$/, "Phone number must start with 98 or 97"),
});

export const removeUserByID = z.object({
  _id: z.string().min(1, "User ID is required"),
});
