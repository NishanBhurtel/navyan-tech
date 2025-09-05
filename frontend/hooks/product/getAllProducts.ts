// hooks/useAllProducts.ts
import { productApi } from "@/lib/api/product.api";
import { IProduct } from "@/lib/utils/types/product.type";
import { useQuery } from "@tanstack/react-query";

export function useAllProducts() {
  return useQuery<IProduct[]>({
    queryKey: ["products"], // 🔑 unique cache key
    queryFn: () => productApi.getAllProductsApi(), // 💡 assumes this returns Promise<IProduct[]>
    staleTime: 1000 * 60 * 5, // ✅ optional: cache is fresh for 5 minutes
  });
}
