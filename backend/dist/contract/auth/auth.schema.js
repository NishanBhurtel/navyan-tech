"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetailSchema = exports.loginSuccessSchema = exports.getProfileSchema = exports.resetPasswordAfterOtpSchema = exports.verifyForgotPasswordOtpSchema = exports.sendForgotPasswordOtpSchema = exports.changePasswordSchema = exports.resendOtpSchema = exports.verifyOtpSchema = exports.logout = exports.loginResponseSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerSchema = zod_1.default
    .object({
    firstName: zod_1.default.string().min(1, "First name is required"),
    lastName: zod_1.default.string().min(1, "Last name is required"),
    email: zod_1.default
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email")
        .transform((val) => val.trim().toLowerCase()),
    phoneNumber: zod_1.default
        .string()
        .min(10, "Phone number must be exactly 10 digits")
        .max(10, "Phone number must be exactly 10 digits")
        .regex(/^(98|97)\d{8}$/, "Phone number must start with 98 or 97"),
    password: zod_1.default
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: zod_1.default.string().min(6, "Minimum 6 characters"),
    termsAccepted: zod_1.default.boolean().refine((val) => val === true, {
        message: "You must accept the Terms and Privacy Policy",
    }),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.loginResponseSchema = zod_1.default.object({
    id: zod_1.default.string(),
    email: zod_1.default.string().email(),
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    token: zod_1.default.string(),
    role: zod_1.default.enum(["admin", "customer"]),
});
exports.logout = zod_1.default.object({});
exports.verifyOtpSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    otp: zod_1.default.string().length(6),
});
exports.resendOtpSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
});
exports.changePasswordSchema = zod_1.default.object({
    currentPassword: zod_1.default.string(),
    newPassword: zod_1.default.string().min(8),
    confirmNewPassword: zod_1.default.string().min(8),
});
exports.sendForgotPasswordOtpSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
});
exports.verifyForgotPasswordOtpSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    otp: zod_1.default.string().min(6),
});
exports.resetPasswordAfterOtpSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    newPassword: zod_1.default.string().min(8),
    confirmNewPassword: zod_1.default.string().min(8),
});
exports.getProfileSchema = zod_1.default.object({
    userId: zod_1.default.string(),
    email: zod_1.default.string().email(),
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    role: zod_1.default.enum(["admin", "customer"]),
    registeredAt: zod_1.default.date(),
});
exports.loginSuccessSchema = zod_1.default.object({
    success: zod_1.default.boolean(),
    message: zod_1.default.string(),
    user: zod_1.default.object({
        _id: zod_1.default.string(),
        firstName: zod_1.default.string(),
        lastName: zod_1.default.string(),
        role: zod_1.default.enum(["admin", "customer"]),
        email: zod_1.default.string().email(),
    }),
    accessToken: zod_1.default.string(),
    refreshToken: zod_1.default.string(),
});
exports.getUserDetailSchema = zod_1.default.object({
    success: zod_1.default.literal(true),
    user: zod_1.default.object({
        _id: zod_1.default.string(),
        userId: zod_1.default.string(),
        firstName: zod_1.default.string(),
        lastName: zod_1.default.string(),
        email: zod_1.default.string(),
        phoneNumber: zod_1.default.string(),
        createdAt: zod_1.default.string(),
        updatedAt: zod_1.default.string(),
    }),
});
