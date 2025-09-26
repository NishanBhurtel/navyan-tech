"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSuccessSchema = exports.createContactSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createContactSchema = zod_1.default.object({
    firstName: zod_1.default
        .string()
        .min(1, "First name is required") // handles empty string
        .min(3, "First name must be at least 3 characters")
        .regex(/^[A-Za-z]+$/, "First name must contain only alphabets"),
    lastName: zod_1.default
        .string()
        .min(1, "Last name is required") // handles empty string
        .min(3, "Last name must be at least 3 characters")
        .regex(/^[A-Za-z]+$/, "Last name must contain only alphabets"),
    email: zod_1.default
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email")
        .transform((val) => val.trim().toLowerCase()),
    phone: zod_1.default
        .string()
        .min(1, "Phone number is required") // checks empty
        .regex(/^\d+$/, "Phone number must contain only digits") // only numbers
        .length(10, "Phone number must be exactly 10 digits") // exact 10 digits
        .regex(/^(97|98)\d{8}$/, "Phone number must start with 97 or 98"),
    subject: zod_1.default.string().min(1, "Subject is required"),
    message: zod_1.default.string(),
    subscribeToNewsLatter: zod_1.default.boolean().optional().default(false),
});
exports.contactSuccessSchema = zod_1.default.object({
    success: zod_1.default.boolean(),
    message: zod_1.default.string(),
    id: zod_1.default.string(),
});
