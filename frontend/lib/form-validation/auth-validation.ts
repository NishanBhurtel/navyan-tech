import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required") // handles empty string
      .min(3, "First name must be at least 3 characters")
      .regex(/^[A-Za-z]+$/, "First name must contain only alphabets"),

    lastName: z
      .string()
      .min(1, "Last name is required") // handles empty string
      .min(3, "Last name must be at least 3 characters")
      .regex(/^[A-Za-z]+$/, "Last name must contain only alphabets"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email")
      .transform((val) => val.trim().toLowerCase()),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required") // checks empty
      .regex(/^\d+$/, "Phone number must contain only digits") // only numbers
      .length(10, "Phone number must be exactly 10 digits") // exact 10 digits
      .regex(/^(97|98)\d{8}$/, "Phone number must start with 97 or 98"),

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
      path: ["confirmPassword"],
    }
  );

export type TRegisterSchema = z.infer<typeof registerSchema>;

export const verifyOtpSchema = z.object({
  email: z.string().email("Enter a valid email"),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must be numeric"),
});

export type TVerifyOtpSchema = z.infer<typeof verifyOtpSchema>;

export const resendOtpSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export type TResendOtpSchema = z.infer<typeof resendOtpSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine(
    (data: { newPassword: string; confirmNewPassword: string }) =>
      data.newPassword === data.confirmNewPassword,
    {
      message: "New passwords do not match",
      path: ["confirmNewPassword"],
    }
  );

export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export const sendForgotPasswordOtpSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export type TSendForgotPasswordOtpSchema = z.infer<
  typeof sendForgotPasswordOtpSchema
>;

export const verifyForgotPasswordOtpSchema = z.object({
  email: z.string().email("Enter a valid email"),
  otp: z.string().min(6, "OTP must be at least 6 characters"),
});

export type TVerifyForgotPasswordOtpSchema = z.infer<
  typeof verifyForgotPasswordOtpSchema
>;

export const resetPasswordAfterOtpSchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine(
    (data: { newPassword: string; confirmNewPassword: string }) =>
      data.newPassword === data.confirmNewPassword,
    {
      message: "Passwords do not match",
      path: ["confirmNewPassword"],
    }
  );

export type TResetPasswordAfterOtpSchema = z.infer<
  typeof resetPasswordAfterOtpSchema
>;
