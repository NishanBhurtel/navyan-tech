// hooks/useAllProducts.ts
import { productApi } from "@/lib/api/product.api";
import { IProduct } from "@/lib/utils/types/product.type";
import { useQuery } from "@tanstack/react-query";

export interface IProductQueryParams  {
  search?: string;
  filter?: {
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    categoryID?: string;
    subCategoryID?: string;
  };
};
export function useAllProducts({
 search,
 filter
}: IProductQueryParams) {
  return useQuery<IProduct[]>({
    queryKey: ["getProductsByAdmin",search,filter], // 🔑 unique cache key
    queryFn: () => productApi.getAllProductsApi({search,filter}), // 💡 assumes this returns Promise<IProduct[]>
    staleTime: 1000 * 60 * 5, // ✅ optional: cache is fresh for 5 minutes
  });
}
