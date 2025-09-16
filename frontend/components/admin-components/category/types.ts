export interface SubCategory {
  _id: string;
  name: string;
  description?: string;
  parentCategoryId: string;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  subCategories?: SubCategory[];
  parentCategory?: string;
}

// Form data - simplified to only name and description
export interface FormData {
  name: string;
  description: string;
  parentCategory: string; // "0" for category, categoryId for subcategory
}

// API Request types
export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface CreateSubcategoryRequest {
  name: string;
  description?: string;
  parentCategoryId: string;
}

export interface UpdateCategoryRequest {
  name: string;
  description: string;
}

export interface UpdateSubcategoryRequest {
  name: string;
  description?: string;
}
