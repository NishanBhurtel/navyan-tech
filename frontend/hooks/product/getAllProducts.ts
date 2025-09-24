// hooks/useAllProducts.ts
import { productApi } from "@/lib/api/product.api";
import { PaginatedResponse } from "@/lib/utils/types/common.type";
import { IProduct } from "@/lib/utils/types/product.type";
import { useQuery } from "@tanstack/react-query";

export interface IProductQueryParams {
  search?: string;
  filter?: {
    brand?: string;
    categoryID?: string;
    subCategoryID?: string;
    minPrice?: string;
    maxPrice?: string;
  };
  page?: number;  // ✅ add this
  limit?: number; // ✅ add this
}
export function useAllProducts({ page, limit, search, filter }: IProductQueryParams) {
  return useQuery<PaginatedResponse<IProduct>>({
    queryKey: ["searchProducts", page, limit, search, JSON.stringify(filter)], // ✅ stable key
    queryFn: () => productApi.getAllProductsApi({ page, limit, search, filter }),
  });
}

