import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UpdateCategoryRequest,
  UpdateSubcategoryRequest,
} from "../../components/admin-components/category/types";
import { toast } from "sonner";
import { categoriesApi, subcategoriesApi } from "@/lib/api/category";

// Query Keys
export const QUERY_KEYS = {
  categories: ["categories"] as const,
} as const;

// Fetch Categories Hook
export function useCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: categoriesApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    refetchOnWindowFocus: false,
  });
}

// Category Mutations Hook
export function useCategoryMutations() {
  const queryClient = useQueryClient();

  const createCategory = useMutation({
    mutationFn: categoriesApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories });
      toast.success(`Category "${data.name}" created successfully!`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to create category: ${error.message}`);
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryRequest }) =>
      categoriesApi.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories });
      toast.success(`Category "${data.name}" updated successfully!`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to update category: ${error.message}`);
    },
  });

  const deleteCategory = useMutation({
    mutationFn: categoriesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories });
      toast.success("Category deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete category: ${error.message}`);
    },
  });

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    isLoading:
      createCategory.isPending ||
      updateCategory.isPending ||
      deleteCategory.isPending,
  };
}

// Subcategory Mutations Hook
export function useSubcategoryMutations() {
  const queryClient = useQueryClient();

  const createSubcategory = useMutation({
    mutationFn: subcategoriesApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories });
      toast.success(`Subcategory "${data.name}" created successfully!`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to create subcategory: ${error.message}`);
    },
  });

  const updateSubcategory = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateSubcategoryRequest;
    }) => subcategoriesApi.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories });
      toast.success(`Subcategory "${data.name}" updated successfully!`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to update subcategory: ${error.message}`);
    },
  });

  const deleteSubcategory = useMutation({
    mutationFn: subcategoriesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories });
      toast.success("Subcategory deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete subcategory: ${error.message}`);
    },
  });

  return {
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
    isLoading:
      createSubcategory.isPending ||
      updateSubcategory.isPending ||
      deleteSubcategory.isPending,
  };
}
