// hooks/useAllProducts.ts
import { User } from "@/app/admin/types";
import { userApi } from "@/lib/api/users.api";
import { useQuery } from "@tanstack/react-query";

export function useAllUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => userApi.getAllusersApi(), 
    staleTime: 1000 * 60 * 5,
  });
}
