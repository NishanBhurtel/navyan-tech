import { z } from "zod";

export const getAllUsersSchema = z.object({
  _id: z.string().min(1, "User ID is reequired"),
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
});

export type TGetAllUsersSchema = z.infer<typeof getAllUsersSchema>;

export const getUserByIDSchema = z.object({
  _id: z.string().min(1, "User ID is reequired"),
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

export type TGetUserByIDSchema = z.infer<typeof getUserByIDSchema>;

export const updateUserByIDSchema = z.object({
  _id: z.string().min(1, "User ID is reequired"),
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
});

export type TUpdateUserByIDSchema = z.infer<typeof updateUserByIDSchema>;

export const deleteUserByID = z.object({
  _id: z.string().min(1, "User ID is required"),
});

export type TDeleteUserSchema = z.infer<typeof deleteUserByID>;
