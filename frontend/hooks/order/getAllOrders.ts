// hooks/useAllOrders.ts
import { Inquiry } from "@/components/admin-components/order/order-inqueries";
import { orderApi } from "@/lib/api/order.api";
import { useQuery } from "@tanstack/react-query";

export function useAllOrders() {
  return useQuery<Inquiry[]>({
    queryKey: ["orders"], // 🔑 unique cache key
    queryFn: () => orderApi.getAllOrderApi(), // 💡 assumes this returns Promise<IOrder[]>
    staleTime: 1000 * 60 * 5, // ✅ optional: cache is fresh for 5 minutes
  });
}
