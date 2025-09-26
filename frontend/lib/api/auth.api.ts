import apiClient from "../api";
import {
  TLoginSchema,
  TRegisterSchema,
  TVerifyOtpSchema,
  TResendOtpSchema,
} from "../form-validation/auth-validation";

// POST /auth/register - Register new user
const registerApi = async (registerPayload: TRegisterSchema) => {
  const response = await apiClient.post("/auth/register", registerPayload);
  return response.data;
};

// POST /auth/login - Login user
const loginApi = async (loginPayload: TLoginSchema) => {
  console.log("loginPayload in auth api: ", loginPayload);
  const targetUrl = `${apiClient.defaults.baseURL}/auth/login`; // Adjust path if not /auth/login
  console.log("Calling login endpoint at:", targetUrl);
  const response = await apiClient.post("/auth/login", loginPayload);
  console.log("response from login api : ", response);
  return response.data;
};

// POST /auth/logout - Logout user
const logoutApi = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

// GET /auth/profile - Get logged in user profile
const getLoggedInUserApi = async () => {
  const response = await apiClient.get("/auth/profile");
  return response.data;
};

// POST /auth/verify-otp - Verify OTP
const verifyOtpApi = async (verifyOtpPayload: TVerifyOtpSchema) => {
  const response = await apiClient.post("/auth/verify-otp", verifyOtpPayload);
  return response.data;
};

// POST /auth/resend-otp - Resend OTP
const resendOtpApi = async (resendOtpPayload: TResendOtpSchema) => {
  const response = await apiClient.post("/auth/resend-otp", resendOtpPayload);
  return response.data;
};

export const authApi = {
  registerApi,
  loginApi,
  logoutApi,
  getLoggedInUserApi,
  verifyOtpApi,
  resendOtpApi,
};
