// hooks/useAllOrders.ts
import { Inquiry } from "@/components/admin-components/order/order-inqueries";
import { orderApi } from "@/lib/api/order.api";
import { useQuery } from "@tanstack/react-query";

interface OrderApiResponse {
  success: boolean;
  data: {
    id: string;
    customer: string;
    email: string;
    phoneNumber: string;
    address: string;
    productName: string;
    amount: number;
    quantity: number;
    createdAt: string;
    notes: string;
    contactMethod: "phone" | "email" | "whatsapp";
  }[];
}

export function useAllOrders() {
  return useQuery<OrderApiResponse>({
    queryKey: ["orders"],
    queryFn: () => orderApi.getAllOrderApi(),
  });
}

