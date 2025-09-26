import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "@/lib/api/product.api";

export function useProductStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      productApi.updateProductStatusApi(id, isActive),

    onError: (error: any) => {
      console.error("Error updating product status", error);
    },
  });
}

