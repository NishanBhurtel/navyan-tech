// lib/api/categories.ts
import {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CreateSubcategoryRequest,
  UpdateSubcategoryRequest,
} from "../../components/admin-components/category/types";

const API_BASE_URL = "http://localhost:5000";

// Simple API functions - only name and description
export const categoriesApi = {
  // Get all categories with subcategories
  getAll: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/categories/details`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  },

  // Create category - only name and description
  create: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create category");
    }
    return response.json();
  },

  update: async (
    categoryID: string,
    data: UpdateCategoryRequest
  ): Promise<Category> => {
    console.log("🚀 Update called");
    console.log("Category ID:", categoryID);
    console.log("Data being sent:", data);

    const response = await fetch(
      `${API_BASE_URL}/categories/updatecategoryDetails/${categoryID}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    console.log("Response status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error("Error response:", error);
      throw new Error(error.message || "Failed to update category");
    }

    const result = await response.json();
    console.log("Update result:", result);
    return result;
  },
  // Delete category
  delete: async (categoryID: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryID}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete category");
    }
  },
};

export const subcategoriesApi = {
  // Create subcategory - only name and description
  create: async (data: CreateSubcategoryRequest) => {
    const response = await fetch(`${API_BASE_URL}/subcategories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create subcategory");
    }
    return response.json();
  },
  // Get subcategories for a given category
  getByCategory: async () => {
    const response = await fetch(`${API_BASE_URL}/subcategories/details`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch subcategories");
    }
    return response.json(); // should return array of subcategories
  },

  // Update subcategory - only name and description
  update: async (subcategoryID: string, data: UpdateSubcategoryRequest) => {
    const response = await fetch(
      `${API_BASE_URL}/subcategories/updatesubcategoryDetails/${subcategoryID}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update subcategory");
    }
    return response.json();
  },

  // Delete subcategory
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/subcategories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete subcategory");
    }
  },
};
