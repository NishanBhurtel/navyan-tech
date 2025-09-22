import { IProductQueryParams } from "@/hooks/product/getAllProducts";
import apiClient from "../api";
import {
  TCreateProductSchema,
  TGetProductByIDSchema,
  TUpdateProductSchema,
} from "../form-validation/product-validation";

// POST /products - Create new product
const createProductApi = async (productPayload: TCreateProductSchema) => {
  const response = await apiClient.post("/products", productPayload);
  return response.data;
};

// PUT /products/:id - Update product details
const updateProductApi = async (
  productId: string,
  updatePayload: TUpdateProductSchema
) => {
  const response = await apiClient.put(`/products/${productId}`, updatePayload);
  return response.data;
};

// GET /products - Get all products (with filters/sorting)
const getAllProductsApi = async ({ filter, search }: IProductQueryParams) => {
  const response = await apiClient.get("/products", {
    params: {
      search,
      ...(filter ?? {}), // spread filter fields into params
    },
  });

  return response.data;
};

// GET /products/:id - Get product details by ID
const getProductByIdApi = async (productId: TGetProductByIDSchema["_id"]) => {
  const response = await apiClient.get(`/products/details/${productId}`);
  return response.data;
};

// DELETE /products/:id - Delete product
export const deleteProductApi = async (productId: string) => {
  // If your backend expects the body as well, send it
  const response = await apiClient.delete(`/product/${productId}`, {
    data: { productId }, // include body if backend expects it
  });
  return response.data;
};

export const updateProductStatusApi = async (productId: string, isActive: boolean) => {
  const response = await apiClient.put(`/setProduct/${productId}`, {
    isActive
  });
  return response.data;
};

export const productApi = {
  createProductApi,
  updateProductApi,
  getAllProductsApi,
  getProductByIdApi,
  updateProductStatusApi,
  deleteProductApi,
};
