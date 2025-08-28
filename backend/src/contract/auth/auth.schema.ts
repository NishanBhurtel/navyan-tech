import z from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(["admin", "customer"]),
  email: z.string().email(),
  phoneNumber: z.number(),
  // uid: z.string().min(1),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginResponseSchema = z.object({
  uid: z.string(),
  _id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(["admin", "customer"]),
});

export const logout = z.object({});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export const resendOtpSchema = z.object({
  email: z.string().email(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8),
  confirmNewPassword: z.string().min(8),
});

export const sendForgotPasswordOtpSchema = z.object({
  email: z.string().email(),
});

export const verifyForgotPasswordOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6),
});

export const resetPasswordAfterOtpSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(8),
  confirmNewPassword: z.string().min(8),
});

export const getProfileSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(["admin", "customer"]),
  registeredAt: z.date(),
});

export const loginSuccessSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  user: z.object({
    _id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.enum(["admin", "customer"]),
    email: z.string().email(),
  }),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const updateUserDetailsSchema = z.object({
  userId: z.string(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().min(7).optional(),
});

export const getUserDetailSchema = z.object({
  success: z.literal(true),
  user: z.object({
    _id: z.string(),
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});
