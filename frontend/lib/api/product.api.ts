import apiClient from "../api";
import {
  TCreateProductSchema,
  TDeleteProductSchema,
  TGetAllProductSchema,
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
const getAllProductsApi = async (filters?: Partial<TGetAllProductSchema>) => {
  const response = await apiClient.get("/products", { params: filters });
  return response.data;
};

// GET /products/:id - Get product details by ID
const getProductByIdApi = async (
  productId: TGetProductByIDSchema["productId"]
) => {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data;
};

// DELETE /products/:id - Delete product
const deleteProductApi = async (
  productId: TDeleteProductSchema["productId"]
) => {
  const response = await apiClient.delete(`/products/${productId}`);
  return response.data;
};

export const productApi = {
  createProductApi,
  updateProductApi,
  getAllProductsApi,
  getProductByIdApi,
  deleteProductApi,
};
