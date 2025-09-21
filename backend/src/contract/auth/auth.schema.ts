import z from "zod";

export const registerSchema = z
  .object({
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

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(6, "Minimum 6 characters"),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms and Privacy Policy",
    }),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
    }
  );

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  token: z.string(),
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
