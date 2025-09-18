import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "@/lib/api/product.api";
import useToast from "@/lib/Toast";

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (id: string) => productApi.deleteProductApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("Product Deleted successfully", "bg-primary");
    },
    onError: (error: any) => {
      showToast("Failed to delete product", "bg-destructive");
    },
  });
}
