// hooks/useAllProducts.ts
import { productApi } from "@/lib/api/product.api";
import { PaginatedResponse } from "@/lib/utils/types/common.type";
import { IProduct } from "@/lib/utils/types/product.type";
import { useQuery } from "@tanstack/react-query";

export interface IProductQueryParams {
  search?: string;
  filter?: {
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    categoryID?: string;
    subCategoryID?: string;
  };
}

export function useAllProducts({ search, filter }: IProductQueryParams) {
  return useQuery<PaginatedResponse<IProduct>>({
    queryKey: ["searchProducts", search, JSON.stringify(filter)], // ✅ stable key
    queryFn: () => productApi.getAllProductsApi({ search, filter }),
  });
}
