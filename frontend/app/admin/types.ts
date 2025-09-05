// src/types.ts

export interface User {
  _id: string;
    firstName: string;
    lastName: string;
  email: string;
  phoneNumber: string;
  role: "customer" | "admin";
  registeredAt: string;
  createdAt: string;
  totalOrders: number;
}

export interface UserStatus {
  total: number
  active: number
  inactive: number
  banned: number
  newThisMonth: number
}

export interface UsersTableProps {
  users: User[]
}