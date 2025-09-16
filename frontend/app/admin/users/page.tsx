"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/user-components/ui/button";
import { Download, Mail } from "lucide-react";
import UsersTable from "@/components/admin-components/user/table";
import { useAllUsers } from "@/hooks/users/getAllUser";
import { User } from "../types";
import UserFilters from "@/components/admin-components/user/filter";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function UsersPage() {
  const { data: users = [], error, isLoading } = useAllUsers();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user: User) => {
    const q = searchTerm.toLowerCase();
    return (
      user.firstName?.toLowerCase().includes(q) ||
      user.lastName?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q) ||
      user.phoneNumber?.toLowerCase().includes(q)
    );
  });

  // ✅ Export function
  const handleExport = () => {
    if (filteredUsers.length === 0) return;

    // Prepare worksheet data
    const data = filteredUsers.map((user) => ({
      ID: user._id,
      First_Name: user.firstName,
      Last_Name: user.lastName,
      Email: user.email,
      Phone: user.phoneNumber,
      CreatedAt: user.createdAt
        ? new Date(user.createdAt).toLocaleString()
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    // Generate buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Save file
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Navyan Tech Web User Records_${new Date().toISOString()}.xlsx`);
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
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/email">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Link>
          </Button>
        </div>
      </div>

      <UserFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {isLoading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Failed to load users.</p>}

      {!isLoading && !error && <UsersTable users={filteredUsers} />}
    </div>
  );
}
