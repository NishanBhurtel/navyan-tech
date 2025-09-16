"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserByID = exports.updateUserByIDSchema = exports.getUserByIDSchema = exports.getAllUsersSchema = void 0;
const zod_1 = require("zod");
exports.getAllUsersSchema = zod_1.z.array(zod_1.z.object({
    _id: zod_1.z.string().min(1, "User ID is required"),
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    email: zod_1.z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email")
        .transform((val) => val.trim().toLowerCase()),
    phoneNumber: zod_1.z
        .string()
        .min(10, "Phone number must be exactly 10 digits")
        .max(10, "Phone number must be exactly 10 digits")
        .regex(/^(98|97)\d{8}$/, "Phone number must start with 98 or 97"),
    role: zod_1.z.string().min(1, "Role is required"),
    createdAt: zod_1.z.date(),
}));
exports.getUserByIDSchema = zod_1.z.object({
    _id: zod_1.z.string().min(1, "User ID is required"),
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    email: zod_1.z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email")
        .transform((val) => val.trim().toLowerCase()),
    phoneNumber: zod_1.z
        .string()
        .min(10, "Phone number must be exactly 10 digits")
        .max(10, "Phone number must be exactly 10 digits")
        .regex(/^(98|97)\d{8}$/, "Phone number must start with 98 or 97"),
    createdAt: zod_1.z.date(),
});
exports.updateUserByIDSchema = zod_1.z.object({
    _id: zod_1.z.string().min(1, "User ID is reequired"),
    userName: zod_1.z.object({
        firstName: zod_1.z.string().min(1, "First name is required"),
        lastName: zod_1.z.string().min(1, "Last name is required"),
    }),
    email: zod_1.z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email")
        .transform((val) => val.trim().toLowerCase()),
    phoneNumber: zod_1.z
        .string()
        .min(10, "Phone number must be exactly 10 digits")
        .max(10, "Phone number must be exactly 10 digits")
        .regex(/^(98|97)\d{8}$/, "Phone number must start with 98 or 97"),
});
exports.removeUserByID = zod_1.z.object({
    _id: zod_1.z.string().min(1, "User ID is required"),
});
