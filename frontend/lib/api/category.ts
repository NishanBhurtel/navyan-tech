// lib/api/categories.ts
import {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CreateSubcategoryRequest,
  UpdateSubcategoryRequest,
} from "../../components/admin-components/category/types";
import apiClient from "../api";

export const categoriesApi = {
  // Get all categories with subcategories
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get("/categories/details");
    return response.data;
  },

  // Create category - only name and description
  create: async (data: CreateCategoryRequest): Promise<Category> => {
    try {
      const response = await apiClient.post("/categories", data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create category"
      );
    }
  },

  update: async (
    categoryID: string,
    data: UpdateCategoryRequest
  ): Promise<Category> => {
    console.log("🚀 Update called");
    console.log("Category ID:", categoryID);
    console.log("Data being sent:", data);

    try {
      const response = await apiClient.put(
        `/categories/updatecategoryDetails/${categoryID}`,
        data
      );
      console.log("Response status:", response.status);
      console.log("Update result:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error response:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to update category"
      );
    }
  },

  // Delete category
  delete: async (categoryID: string): Promise<void> => {
    try {
      await apiClient.delete(`/categories/${categoryID}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  },
};

export const subcategoriesApi = {
  // Create subcategory - only name and description
  create: async (data: CreateSubcategoryRequest) => {
    try {
      const response = await apiClient.post("/subcategories", data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create subcategory"
      );
    }
  },

  // Get subcategories for a given category
  getByCategory: async () => {
    try {
      const response = await apiClient.get("/subcategories/details");
      return response.data; // should return array of subcategories
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch subcategories"
      );
    }
  },

  // Update subcategory - only name and description
  update: async (subcategoryID: string, data: UpdateSubcategoryRequest) => {
    try {
      const response = await apiClient.put(
        `/subcategories/updatesubcategoryDetails/${subcategoryID}`,
        data
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update subcategory"
      );
    }
  },

  // Delete subcategory
  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/subcategories/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete subcategory"
      );
    }
  },
};
