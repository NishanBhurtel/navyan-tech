// src/types.ts

export interface User {
  id: number
  name: string
  email: string
  phone: string
  role: "customer" | "admin"
  status: "active" | "inactive" | "banned"
  registeredAt: string
  lastLogin: string
  totalOrders: number
  totalSpent: number
  avatar?: string
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
  handleUserAction: (user: User, action: string) => void
  handleStatusChange: (userId: number, newStatus: User["status"]) => void
  getRoleColor: (role: User["role"]) => string
  getStatusColor: (status: User["status"]) => string
}