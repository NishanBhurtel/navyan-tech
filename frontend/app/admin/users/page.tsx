"use client";

import Link from "next/link";
import { useState } from "react";
import { User, UserStatus } from "../types";
import { Button } from "@/components/user-components/ui/button";
import { Download, Mail } from "lucide-react";
import UserStats from "@/components/admin-components/user/statsGrid";
import UserFilters from "@/components/admin-components/user/filter";
import UsersTable from "@/components/admin-components/user/table";
import UserActionDialog from "@/components/admin-components/user/action";

// Mock user data
const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    role: "customer",
    status: "active",
    registeredAt: "2024-01-15",
    lastLogin: "2024-01-20",
    totalOrders: 5,
    totalSpent: 45000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 9876543211",
    role: "customer",
    status: "active",
    registeredAt: "2024-01-10",
    lastLogin: "2024-01-19",
    totalOrders: 12,
    totalSpent: 125000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+91 9876543212",
    role: "customer",
    status: "inactive",
    registeredAt: "2024-01-05",
    lastLogin: "2024-01-10",
    totalOrders: 2,
    totalSpent: 15000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+91 9876543213",
    role: "admin",
    status: "active",
    registeredAt: "2023-12-01",
    lastLogin: "2024-01-21",
    totalOrders: 0,
    totalSpent: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+91 9876543214",
    role: "customer",
    status: "banned",
    registeredAt: "2024-01-08",
    lastLogin: "2024-01-12",
    totalOrders: 1,
    totalSpent: 5000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const userStats: UserStatus = {
  total: 1247,
  active: 1156,
  inactive: 67,
  banned: 24,
  newThisMonth: 89,
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>("");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserAction = (user: User, action: string) => {
    setSelectedUser(user);
    setActionType(action);
    setIsUserDialogOpen(true);
  };

  const handleStatusChange = (userId: number, newStatus: User["status"]) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    setIsUserDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "banned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    return role === "admin"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-2">
            Manage user accounts and permissions
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            <Link href="/admin/email">Send Email</Link>
          </Button>
        </div>
      </div>

      <UserStats stats={userStats} />

      <UserFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <UsersTable
        users={filteredUsers}
        handleUserAction={handleUserAction}
        handleStatusChange={handleStatusChange}
        getRoleColor={getRoleColor}
        getStatusColor={getStatusColor}
      />

      <UserActionDialog
        open={isUserDialogOpen}
        onOpenChange={setIsUserDialogOpen}
        user={selectedUser}
        actionType={actionType}
        getRoleColor={getRoleColor}
        getStatusColor={getStatusColor}
      />
    </div>
  );
}
