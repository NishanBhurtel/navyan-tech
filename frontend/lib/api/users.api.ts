// lib/api/users.api.ts
import apiClient from "../api";
import { 
  TDeleteUserSchema, 
  TGetAllUsersSchema, 
  TGetUserByIDSchema, 
  TUpdateUserByIDSchema 
} from "../form-validation/users-validation";

// GET /users
const getAllusersApi = async (filters?: Partial<TGetAllUsersSchema>) => {
  const response = await apiClient.get("/users", { params: filters });
  return response.data; // make sure backend returns an array of users
};

// GET /users/:id
const getuserByIdApi = async (userId: TGetUserByIDSchema["_id"]) => {
  const response = await apiClient.get(`/users/details/${userId}`);
  return response.data;
};

// PUT /users/:id
const updateuserApi = async (userId: string, updatePayload: TUpdateUserByIDSchema) => {
  const response = await apiClient.put(`/users/updateUsersDetails/${userId}`, updatePayload);
  return response.data;
};

// DELETE /users/:id  (fixed endpoint)
const deleteuserApi = async (userId: TDeleteUserSchema["_id"]) => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response.data;
};

export const userApi = {
  getAllusersApi,
  getuserByIdApi,
  updateuserApi,
  deleteuserApi,
};
