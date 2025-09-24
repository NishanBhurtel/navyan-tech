// lib/api/apiClient.ts
import axios from "axios";
import { getSession } from "next-auth/react";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add interceptor to attach token
apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.user?.token) {
    config.headers["Authorization"] = `Bearer ${session.user.token}`;
  }

  return config;
});

export default apiClient;