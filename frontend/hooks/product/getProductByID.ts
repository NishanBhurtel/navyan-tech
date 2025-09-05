// hooks/useProductByID.ts
import { productApi } from '@/lib/api/product.api';
import { IProduct } from '@/lib/utils/types/product.type';
import { useQuery } from '@tanstack/react-query';

export function useProductByID(productId: string) {
  return useQuery<{data:IProduct,success:boolean}>({
    queryKey: ['product', productId],
    queryFn: () => productApi.getProductByIdApi(productId),
    enabled: !!productId, // only fetch if productId is truthy
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });
}
